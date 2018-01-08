define('zxl/map', [
    'leaflet',
    'proj4',
    'leaflet/proj4leaflet',
    //'leaflet/esri',
    'leaflet/arcgis/esri-leaflet-src',
    'leaflet/L.Control.MousePosition',
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

                var xx = 5;
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
            //
            L.control.scale().addTo(map);

            if (this._baseLayer) {
                this._baseLayer.addTo(this.map);
            }

            //
            L.control.mousePosition({
                lngFirst: true
            }).addTo(map);
        }
    });
    return L.Zxl.Map;
});