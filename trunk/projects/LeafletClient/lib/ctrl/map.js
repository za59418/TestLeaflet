define('zxl/map', [
    'leaflet',
    'proj4',
    'leaflet/esri',
    'leaflet/proj4leaflet',
    'jquery',
    'zxl',
    'zxl/base',
    'toolbar'
], function (L) {
    L.Zxl.Map = L.Zxl.Base.extend({
        map: null,
        _baseLayerId: 'baseLayer',//底图ID
        _baseLayer: null,//底图
        initialize: function (options) {
            this.id = options.id;

            var crs = null;
            if (options.baseLayer.type == "tile") {
                crs = new L.Proj.CRS(options.baseCrs.code, options.baseCrs.defs, {
                    origin: options.baseLayer.origin,
                    resolutions: options.baseLayer.resolutions
                });

                this._baseLayer = new L.esri.Layers.TiledMapLayer(options.baseLayer.url, {
                    id: this._baseLayerId,
                    img: options.baseLayer.img,
                    maxZoom: options.maxZoom,
                    tileSize: options.tileSize,
                    continuousWorld: true
                });
            }
            else {
                crs = L.CRS.EPSG2379;
                this._baseLayer = L.esri.dynamicMapLayer(options.baseLayer.url, {
                    id: this._baseLayerId,
                    img: options.baseLayer.img,
                    continuousWorld: true
                });
            }

            var minPoint = crs.projection.unproject(L.point(options.baseLayer.fullExtent[0], options.baseLayer.fullExtent[1]));
            var maxPoint = crs.projection.unproject(L.point(options.baseLayer.fullExtent[2], options.baseLayer.fullExtent[3]));
            var bounds = L.latLngBounds(minPoint, maxPoint);
            var centerPoint = bounds.getCenter();

            var mapOptions = {
                crs: crs,
                continuousWorld: true
            };

            this.map = L.map('map', mapOptions);
            this.map.setView(centerPoint, 1);

            if (this._baseLayer) {
                this._baseLayer.addTo(this.map);
            }
            //
            L.control.scale().addTo(this.map);

            this.map.whenReady(function () {
                this._getInitExtent();
            }, this);

            //视图
            this._viewHistory = [{ center: centerPoint, zoom: options.zoom }];
            this._currIndex = 0;
            this.map.on("moveend", this._updateHistory, this);
        },
        _getInitExtent: function () {
            this.center = this.map.getCenter();
            this.zoom = this.map.getZoom();
        },
        _updateHistory: function(){
            var newView = { center: this.map.getCenter(), zoom: this.map.getZoom() };
            var insertIndex = this._currIndex + 1;
            this._viewHistory.splice(insertIndex, this._updateHistory.length, newView);
            this._currIndex++;
        },
        zoomToFullExtent: function () {
            this.map.setView(this.center, this.zoom);
        },
        goBack: function () {
            if (this._currIndex != 0) {
                this.map.off("moveend", this._updateHistory, this);
                this.map.once("moveend", function () { this.map.on("moveend", this._updateHistory, this); }, this);
                this._currIndex--;
                var view = this._viewHistory[this._currIndex];
                this.map.setView(view.center, view.zoom);
            }
        },
        goForward: function () {
            if (this._currIndex != this._viewHistory.length - 1) {
                this.map.off('moveend', this._updateHistory, this);
                this.map.once('moveend', function () { this.map.on('moveend', this._updateHistory, this); }, this);
                this._currIndex++;
                var view = this._viewHistory[this._currIndex];
                if (view) this.map.setView(view.center, view.zoom);
            }
        }
    });
    return L.Zxl.Map;
});