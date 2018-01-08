define('toolbar', [
    'leaflet',
    'zxl',
    'jquery'
], function (L) {
    L.Zxl.Toolbar = L.Control.extend({
        id: 'toolbar',
        ihtml: '<div id="toolbar" class="toolbar-content"></div>',
        initialize: function () {

            this.id = "toolbar";
            this.body = $("#toppanel");
            var _this = this;
            if ($("#toolbar").length == 0) {
                this.body.append(this.ihtml);
                this._loadTools();
            }
            //工具栏上的按钮事件
            $("#toolbar").unbind();
            $('#toolbar').on('click', 'a', { obj: this }, this.handle);

        },
        _loadTools: function () {
            var content = $("#toolbar");
            var html = [];

            var bar = '<div class="toolbar-bar onlyIcon">'
                + '<a class="toolbar-a-style" id="menu_fullExtent" title="全图">'
                    + '<span class="icon-full-figure"></span>'
                    + '<span></span>'
                + '</a>'
              + '</div>';
            html.push(bar);

            content.append(html.join(''));
        },
        handle: function (e) {
            e.stopPropagation();

            var id = e.currentTarget.id;
            

            if (id != "") {
                id = id.split('_')[1];
                switch(id)
                {
                    case "fullExtent":

                        break;
                    default:
                        break;
                }
                //L.dci.app.menu.excuteTool(id);
            } else {
                var name = $(e.currentTarget).children("span:eq(1)").html();
                //var eleObj = $(e.currentTarget);
            }

        },
        getId: function()
        {
            alert(this.id);
        }
    });

    return L.Zxl.Toolbar;
});