define("zxl/pool", [
    "leaflet",
    "zxl",
    "zxl/base"
], function (L) {
    L.Zxl.Pool = L.Zxl.Base.extend({
        pool: [],
        initialize: function () { },
        add: function(obj, id){
            if (id == undefined) {
                id = obj.id;
            }
            if (id == null)
            {
                return null;
            }
            if (this.has(id)) {
                return null;
            }
            this.pool.push({ "obj": obj, "key": id });
        },
        get: function (key) {
            for (var i = 0; i < this.pool.length; i++) {
                if (this.pool[i].key == key) {
                    return this.pool[i].obj;
                }
            }
            return null;
        },
        has: function (key) {
            for (var i = 0; i < this.pool.length; i++) {
                if (this.pool[i].key == key) {
                    return true;
                }
            }
            return false;
        }
    });
    return L.Zxl.Pool;    
});