/* see also http://gogo3s.com/demo/OL/baidu.htm */

OpenLayers.Layer.Baidu = OpenLayers.Class(OpenLayers.Layer.TMS, {
    scaler: 1,

    initialize: function (name, map_type, options) {
        var tempoptions = OpenLayers.Util.extend({
            tileOrigin: new OpenLayers.LonLat(0, 28000),
            maxResolution: 262144
        }, options);

        OpenLayers.Layer.TMS.prototype.initialize.apply(this, [name, "", tempoptions]);

        this.extension = 'png';
        this.transitionEffect = "resize";
        this.buffer = 0;
        this.map_type = map_type;
        if (options) {
            if (options.scaler) this.scaler = options.scaler;
            if (options.debug) this.debug = options.debug;
        }
    },

    getURL: function (bounds) {
        // zoom in baidu is off by one
        var z = this.map.getZoom() - 0;
        var res = this.map.getResolution();

        var x = Math.round((bounds.left - this.tileOrigin.lon) / (res * this.tileSize.w));
        var y = Math.round((bounds.bottom - this.tileOrigin.lat) / (res * this.tileSize.h));
        if (this.maxExtent.intersectsBounds(bounds) && z >= 1 && z <= 20) {
            var url_func = this.map_types[this.map_type];
            if (!url_func) {
                if (this.debug) {
                    this.debug("Undefined baidu map type: " + this.map_type);
                }
                return "";
            }

            return url_func(this, x, y, z);
        } else {
            return ""; //"./none.png";
        }
    },

    clone: function (obj) {
        if (obj == null) {
            obj = new OpenLayers.Layer.Baidu(this.name, this.url, this.options);
        }
        obj = OpenLayers.Layer.TMS.prototype.clone.apply(this, [obj]);
        return obj;
    },

    random_server: function (list) {
        if (!list) {
            list = ["1", "2", "3", "4"];
        }

        var random = list[parseInt(Math.random() * list.length)];
        return random;
    },

    map_types: {
        "standard": function (that, x, y, z) {
            var url = "http://online" + that.random_server() + ".map.bdimg.com/tile/?qt=tile&styles=pl";
            url += "&x=" + x + "&y=" + y + "&z=" + z;
            url += "&scaler=" + that.scaler;
            return url;
        },
        "labels": function (that, x, y, z) {
            var url = "http://online" + that.random_server() + ".map.bdimg.com/tile/?qt=tile&styles=sl";
            url += "&x=" + x + "&y=" + y + "&z=" + z;
            url += "&scaler=" + that.scaler;
            return url;
        },
        "satellite": function (that, x, y, z) {
            var url = "http://shangetu" + that.random_server() + ".map.bdimg.com/it/?u=";
            url += "x=" + x + ";y=" + y + ";z=" + z;
            url += ";v=009;type=sate&fm=46";
            return url;
        }
    },

    CLASS_NAME: "OpenLayers.Layer.Baidu"
});
