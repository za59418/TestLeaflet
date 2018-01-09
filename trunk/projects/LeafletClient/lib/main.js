var Default_Paths = {
    "leaflet": "../lib/leaflet/leaflet",
    "leaflet/esri": "../lib/leaflet/arcgis/esri-leaflet",
    "proj4": "../lib/leaflet/proj4",
    "leaflet/proj4leaflet": "../lib/leaflet/proj4leaflet",
    "css": "../lib/requirejs/css.min",
    "jquery": "../lib/jquery-1.11.1.min",
    "zxl": "../lib/ctrl/namespace",
    "zxl/base": "../lib/ctrl/base",
    "zxl/map": "../lib/ctrl/map",
    "toolbar": "../lib/ctrl/toolbar"
};

var Default_Shims = {
    "leaflet": { deps: ['css!../lib/leaflet/leaflet.css'] },
    "toolbar": { deps: ['css!../lib/ctrl/layout.toolbar.css'] },
    //"leaflet/L.Control.MousePosition": { deps: ['css!../lib/leaflet/L.Control.MousePosition.css'] }
};

require.config({

    paths: Default_Paths,
    shim: Default_Shims
});

require([
    'leaflet',
    'leaflet/esri',
    'proj4',
    'leaflet/proj4leaflet',
    'jquery',
    'zxl',
    'zxl/base',
    'zxl/map',
    'toolbar'
], function () {
    var t = new L.Zxl.Toolbar();
    t.initialize();

    var options = {
        id: 'main',
        maxZoom: 8,
        tileSize: 256,
        baseCrs: {
            code:'EPSG:2379', 
            defs: '+proj=tmerc +lat_0=0 +datum=GRS80 +lon_0=108.0 +k=1 +x_0= 500000.0 +y_0=0 +a=6378140 +rf=298.257 +units=m +no_defs '
        },
        baseLayer: {
            type: "tile",
            img: "images/controls/grouplayer/map.png",
            url: "http://localhost:6080/arcgis/rest/services/JY/BJDT/MapServer",
            origin: [-5123200.0, 1.00021E7],
            fullExtent: [-4428.000305175783, 2898.3146268100763, 59286.173645019575, 45472.57319057277],
            resolutions: [
                66.1459656252646,
                33.0729828126323,
                16.9333672000677,
                8.46668360003387,
                4.23334180001693,
                2.11667090000847,
                1.05833545000423,
                0.529167725002117,
                0.264583862501058,
                0.132291931250529,
                0.0661459656252646
            ]
        }
    };
    
    var map = new L.Zxl.Map(options);
    map.initialize();

    //var centerPoint = null;
    //var crs = new L.Proj.CRS('EPSG:2379', '+proj=tmerc +lat_0=0 +datum=GRS80 +lon_0=108.0 +k=1 +x_0= 500000.0 +y_0=0 +a=6378140 +rf=298.257 +units=m +no_defs ',
    //    {
    //        origin: [-5123200.0, 1.00021E7],  // 将刚刚的 Origin 复制到这里
    //        resolutions: [                 // 所有的分辨率复制到这里
    //            66.1459656252646,
    //            33.0729828126323,
    //            16.9333672000677,
    //            8.46668360003387,
    //            4.23334180001693,
    //            2.11667090000847,
    //            1.05833545000423,
    //            0.529167725002117,
    //            0.264583862501058,
    //            0.132291931250529,
    //            0.0661459656252646
    //        ]
    //    });

    //var minPoint = crs.projection.unproject(L.point(-4428.000305175783, 2898.3146268100763));
    //var maxPoint = crs.projection.unproject(L.point(59286.173645019575, 45472.57319057277));
    //var bounds = L.latLngBounds(minPoint, maxPoint);
    //centerPoint = bounds.getCenter();
    //var mapOptions = {
    //    crs: crs,
    //    continuousWorld: true
    //};


    //var map = L.map('map', mapOptions);
    //map.setView(centerPoint, 1);
    //L.control.scale().addTo(map);

    //var titlelayer = L.esri.tiledMapLayer({
    //    url: 'http://localhost:6080/arcgis/rest/services/JY/BJDT/MapServer',
    //    id: 'baseLayer',
    //    maxZoom: 8,
    //    minZoom: 0,
    //    tileSize: 256,
    //    continuousWorld: true
    //}).addTo(map);

    //L.control.mousePosition({
    //    lngFirst: true
    //}).addTo(map);

});