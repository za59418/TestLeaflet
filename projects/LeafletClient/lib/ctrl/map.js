define('zxl/map', [
    'leaflet',
    'proj4',
    'leaflet/proj4leaflet',
    'leaflet/arcgis/esri-leaflet-src',
    'leaflet/L.Control.MousePosition',
    'jquery',
    'zxl',
    'zxl/base',
    'toolbar'
], function () {
    L.Zxl.Map = L.Zxl.Base.extends({
        map: null,
        _baseLayerId: 'baseLayer',//底图ID
        _baseLayer: null,//底图
        initialize: function (options) {
            this.id = options.id;

            var crs = null;
            if (options.baseLayer.type == "tile") {
                crs = new L.Proj.CRS(options.baseCrs.code, options.baseCrs.defs, {
                    origion: options.baseLayer.origion,
                    resolutions: options.baseLayer.resolutions
                });
                this._baseLayer = L.esri.layers.TiledMapLayer(options.baseLayer.url, {
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


        }
    });
    return L.Zxl.Map;
});