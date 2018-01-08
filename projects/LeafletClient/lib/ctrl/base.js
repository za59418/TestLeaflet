define("zxl/base", [
    'leaflet',
    'zxl'
], function (L) {
    L.Zxl.Base = L.Class.extends({
        id: null,
        initialize: function(){},
        getType: function(){
            return typeof this;
        }
    });
    return L.Zxl.Base;
});