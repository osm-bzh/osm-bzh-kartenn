/*
 * Copyright (c) 2012-2016 Wolfram Schneider, http://bbbike.org
 * Copyright (c) 2011 Geofabrik GmbH, https://geofabrik.de
 *
 * BSD 2-clause license ("Simplified BSD License" or "FreeBSD License")
 * see ./COPYRIGHT.txt
 *
 */

/* run JavaScript code in strict mode, HTML5 */
"use strict";


// MapCompare config
var mc = {
    // Berlin downtown
    pos: {
        "lng": -2.96,
        "lat": 48.03,
        "zoom": 8
    },

    // debug
    debug: 0,

    // 0: none, 1: one line, 2: all message
    // number of maps, by default 2 maps are displayed in a table
    // up to 8 are supported
    NumberOfMaps: 3,

    // if set to zero, display all maps
    NumberOfMapsMax: 0,
    // always show N maps links
    NumberOfMapsLinks: 8,
    // open a 3rd row for more than N maps
    row3: 10,
    // open a 4rd row for more than N maps
    row4: 21,
    // open a 5rd row for more than N maps
    row5: 32,

    // pre-selected maps in columns
    mt: ['mapnik', 'osmbr', 'osmfr'],
    // 'soviet-military'],
    // preferences expire after N days
    preferences_expire: 180,
    // map sorting options
    sort: {
        name: 1,
        // by map name
        type: 0,
        // by map type
        bbbike: 1,
        // 0: none, 1: bbbike first
        osm: 1 // 0: none, 1: osm first/second
    },

    sort_overlay: {
        name: 1,
        opacity: 1
    },

    // with social links in footer
    social: true,

    // display mapname on map in full screen mode
    mapname_fullscreen: true,

    // responsive design is configured in css/mobile.css 
    responsive: {
        enabled: true,
        NumberOfMaps: 2,
        maxHeight: 690
    },

    // transparent overlay maps
    overlay: {
        enabled: true,
        type: "slider",
        /* select | slider */

        value: 70,
        /* in percent */
        select_step: 10,
        slider_step: 5,

        // pre-selected overlay
        mt_overlay: ['none']
    },

    search: {
        type: 'nominatim',
        max_zoom: 16,
        show_marker: true,
        viewbox: true,
        limit: 25,
        marker_permalink: true,
        user_agent: "mc.bbbike.org",
        paging: 5
    },

    numZoomLevels: 20
};


/*
   configure profiles

   can be used as short URLs: /mc/?profile=nokia


 */
var profile = {
    here: {
        mt: ['nokia-map', 'nokia-satellite', 'nokia-hybrid', 'nokia-terrain', 'nokia-public_transit', 'nokia-traffic']
    },
    google: {
        mt: ['google-map', 'google-map-mapmaker', 'google-physical', 'google-bicycle-map', 'google-satellite', 'google-hybrid', 'google-hybrid-mapmaker', 'google-weather-sat', 'google-traffic-map', 'google-transit-map', 'google-layers-physical', 'google-panoramio-physical']
    },
    apple: {
        mt: ['apple-map', 'apple-hybrid', 'apple-satellite', 'apple-iphoto']
    },
    satellite: {
        mt: ['google-satellite', 'bing-satellite', 'mapquest-satellite', 'nokia-satellite', 'apple-satellite', 'mapbox-satellite', 'yandex-satellite', 'baidu-satellite']
    },
    mapnik: {
        mt: ['mapnik', 'mapnik-german', 'osm-no-labels', 'mapnik-bw']
    },
    transit: {
        mt: ['transport', 'nokia-public_transit', 'google-transit-map', 'transport-dark', 'pioneer', 'public_transport', 'public_transport_lines', 'openrailwaymap-standard', 'openrailwaymap-maxspeed', 'openmap-public-transport']
    },
    bing: {
        mt: ['bing-map', 'bing-satellite', 'bing-hybrid']
    },
    osm: {
        mt: ['mapnik', 'mapnik-german', 'mapnik-bw', 'toner', 'watercolor', 'cyclemap', 'osm-no-labels', 'transport', 'public_transport', 'hike_bike', 'wanderreitkarte', 'mapquest-map', 'skobbler']
    },
    cycle: {
        mt: ['bbbike-german', 'bbbike-smoothness', 'cyclemap', 'adfc-radwege', 'hike_bike']
    },
    bbbike: {
        mt: ['bbbike', 'bbbike-german', 'bbbike-bbbike', 'bbbike-smoothness', 'bbbike-handicap', 'bbbike-cycle-routes', 'bbbike-cycleway', 'bbbike-green', 'bbbike-unlit', 'bbbike-unknown'],
        // 'google-map', 'hike_bike'],
    },
    topo: {
        mt: ['google-physical', 'google-layers-physical', 'esri-topo', 'esri', 'nokia-terrain', 'cyclemap', 'landscape', 'wanderreitkarte', 'maptoolkit-topo', 'opentopomap', 'komoot', 'opensnowmap', 'mapbox-terrain', 'outdoors'] // 'soviet-military',
    },
    berlin: {
        mt: ['bbbike-german', 'bbbike-smoothness', 'google-map', 'bvg', 'transport', 'nokia-public_transit', 'lgb-webatlas', 'lgb-topo-10', 'lgb-history-1902', 'lgb-history-1767', 'pharus', 'yandex-map']
    },
    germany: {
        mt: ['mapnik-german', 'lyrk-retina', 'google-map', 'transport', 'nokia-public_transit', 'bing-map'],
        zoom: 5
    },
    openmapsurfer: {
        mt: ['osm-roads', 'osm-roads-greyscale', 'osm-semitransparent', 'aster-gdem-srtm-hillshade', 'aster-gdem-contour-lines', 'osm-administrative-boundaries']
    },
    esri: {
        mt: ['esri', 'esri-topo', 'esri-gray', 'esri-satellite', 'esri-physical', 'esri-shaded-relief', 'esri-terrain-base', 'esri-boundaries-places', 'esri-reference-overlay', 'esri-transportation', 'esri-natgeo', 'esri-ocean']
    },
    boundaries: {
        center: {
            lon: 13.38885,
            lat: 52.51703
        },
        zoom: 12,
        mt: ['osm-administrative-boundaries', 'esri-boundaries-places']
    },
    falk: {
        mt: ['falk-osm', 'falk-base']
    },
    mapbox: {
        mt: ['mapbox-satellite', 'mapbox-transportation', 'mapbox-terrain', 'mapbox-runkeepers']
    },
    geofabrik: {
        mt: ['geofabrik-standard', 'geofabrik-german', 'geofabrik-topo']
    },
    ito: {
        mt: ['max-speed', 'ito-lit', 'ito-surface']
    },
    retina: {
        mt: ['lyrk-retina', 'google-map', 'mapbox-transportation', 'mapbox-terrain', 'mapquest-map', 'cyclemap', 'transport', 'toner-retina', 'openrailwaymap-standard', 'skobbler-day']
    },
    skobbler: {
        mt: ['skobbler', 'skobbler-day', 'skobbler-lite', 'skobbler-outdoor', 'skobbler-night']
    },
    waymarkedtrails: {
        mt: ['waymarkedtrails-hiking', 'waymarkedtrails-cycling', 'waymarkedtrails-mtb', 'waymarkedtrails-skating']
    },
    mapquest: {
        mt: ['mapquest-map', 'mapquest-hybrid', 'mapquest-satellite', 'mapquest-dark', 'mapquest-light']
    },
    russian: {
        center: {
            lon: 30.315363,
            lat: 59.937851
        },
        mt: ['sputnik-map', 'yandex-map', 'yandex-satellite', 'yandex-hybrid', 'chepetsk-map', 'kosmosnimki-map', 'kosmosnimki-night']
    },
    yandex: {
        center: {
            lon: 30.315363,
            lat: 59.937851
        },
        mt: ['yandex-map', 'yandex-satellite', 'yandex-hybrid']
    },
    bw: {
        mt: ['toner-retina', 'toner', 'osm-roads-greyscale', 'mapnik-bw']
    },
    hillshading: {
        center: {
            lon: 15.739597,
            lat: 50.736021
        },
        mt: ['hillshading', 'aster-gdem-srtm-hillshade'],
    },
    extract: {
        mt: ['mapnik', 'google-map', 'nokia-map', 'mapbox-hybrid'],
    },
    night: {
        mt: ['transport-dark', 'osm-lights']
    },
    thunderforest: {
        mt: ['cyclemap', 'landscape', 'transport', 'outdoors', 'transport-dark', 'pioneer'] // 'atlas'
    },
    'uni-heidelberg': {
        mt: ['osm-roads', 'osm-roads-greyscale', 'osm-semitransparent', 'aster-gdem-srtm-hillshade', 'aster-gdem-contour-lines', 'osm-administrative-boundaries', 'osm-lights']
    },
    baidu: {
        center: {
            lon: 116.384411,
            lat: 39.960350
        },
        mt: ['baidu-map', 'baidu-satellite', 'baidu-labels']
    },
    'lgb': {
        mt: ['lgb-webatlas', 'lgb-topo-10', 'lgb-topo-50', 'lgb-history-1902', 'lgb-history-1767', 'lgb-satellite-color', 'lgb-satellite-grey', 'lgb-satellite-infrared', 'lgb-plz', 'lgb-administrative-boundaries']
    },
    'geoiq': {
        mt: ['geoiq-terrain', 'geoiq-acetate-base', 'geoiq-acetate-hillshading', 'geoiq-acetate-fg']
    },
    'viamichelin': {
        mt: ['viamichelin-map', 'viamichelin-light', 'viamichelin-hybrid']
    },
    'switzerland': {
        mt: ['osm-ch-standard', 'osm-ch-swiss', 'mapnik', 'mapnik-german', 'google-map', 'nokia-map'],
        center: {
            lon: 7.451451,
            lat: 46.948271
        },

    },
    'sweden': {
        mt: ['osm-se-hydda-full', 'osm-se-hydda-base', 'osm-se-standard', 'osm-se-hydda-roads', 'google-map', 'nokia-map'],
        center: {
            lon: 18.071093,
            lat: 59.325117
        },

    },
    'norway': {
        mt: ['mapnik', 'visitnorway-standard', 'google-map', 'nokia-map'],
        center: {
            lon: 10.746621,
            lat: 59.912859
        },

    },
    'waze': {
        mt: ['waze-us', 'waze-world']
    },
    'kompass': {
        mt: ['kompass-touristik', 'kompass-winter-touristik', 'kompass-summer', 'kompass-winter']
    },
    'basemap': {
        mt: ['basemap-standard', 'basemap-retina', 'basemap-grey', 'basemap-sat'],
        center: {
            lon: 16.372504,
            lat: 48.208354
        },
    },
    'austria': {
        mt: ['basemap-retina', 'basemap-grey', 'basemap-sat', 'mapnik-german', 'google-map', 'nokia-map'],
        center: {
            lon: 16.372504,
            lat: 48.208354
        },
    },

/* wikimedia: {
        mt:  [ 'wikimedia-osm-intl', 'wikimedia-nolabels', 'wikimedia-atlas', 'wikimedia-relief', 'wikimedia-sat', 'wikimedia-plain']
    }, */

    commercial: {
        mt: ['google-map', 'bing-map', 'nokia-map', 'apple-map', 'esri', 'mapquest-map']
    }
};

// MapCompare admin console /console.html
var mc_console = {
    maxTileServer: 3,

    // enable/disable configuration section
    pref_numberOfMaps: true,
    pref_centerOfMaps: true,
    pref_tileserver: true,
    pref_orderOfMaps: true,

    // cookie names
    cookie: {
        "tileserver": "mc_tileserver_",
        "numberOfMaps": "mc_number_of_maps",
        "orderOfMaps": "mc_order_of_maps",
        "centerOfMaps": "mc_center_of_maps",
        "check": "mc_cookie_check"
    }
};


// global variables shared by functions
var state = {
    non_map_tags: ["tools-top", "tools-titlebar", "bottom", "m0", "m1", "m2", "debug"],
    // hide in full screen mode
    fullscreen: false,
    fullscreen_type: 1,

    console: false,
    // in console mode
    percent: mc.overlay.value,

    layertypes: [],
    over_layertypes: [],
    layertypes_hash: {},
    over_layertypes_hash: {},
    maps: [],
    layers: [],
    over_layers: [],
    over_layers_obj: [],
    markersLayer: [],
    marker: [],
    moving: false,
    movestarted: false,
    proj4326: false,

    nonBaseLayer: [],
    marker_message: "",
    zoom: 0,

    control: {},
    // ref to controls
    //
    _ie: false // IE bugs
};

// only "map" variable keeps global
var map;

/*
   main
*/
$(document).ready(function () {
    // hide spinning wheel after all JS libs are loaded
    $('#tools-pageload').hide();

    return mc.console ? initConsole() : initMapCompare();
});


function initMapCompare() {
    initResponsiveDesign();
    initSocial();

    OpenLayers.Util.onImageLoadError = function () {
        this.src = 'img/404.png';
    }

    var mt = mc.mt;
    var mt_overlay = mc.overlay.mt_overlay;

    var proj4326 = new OpenLayers.Projection('EPSG:4326');
    state.proj4326 = proj4326;

    var projmerc = new OpenLayers.Projection('EPSG:900913');

    // var NumberOfMaps = mc.NumberOfMaps;
    var NumberOfMaps = getNumberOfMaps();

    var pos = getMapCenter();
    var lon = pos.lng;
    var lat = pos.lat;
    var zoom = pos.zoom;

    var x = null;
    var y = null;
    var marker = "";

    // parse arguments from hash tag in URL, e.g. #map=18/52.58592/13.36120
    parseHashtag(function (obj) {
        if (obj) {
            lat = obj.lat;
            lon = obj.lng;
            zoom = obj.zoom;
        }
    });

    parseParams(function (param, v) {
        var obj;

        switch (param) {

        case 'type':
            mt[0] = v;
            break;
        case 'mt0':
            mt[0] = v;
            break;
        case 'mt1':
            mt[1] = v;
            break;
        case 'mt2':
            mt[2] = v;
            break;
        case 'mt3':
            mt[3] = v;
            break;
        case 'mt4':
            mt[4] = v;
            break;
        case 'mt5':
            mt[5] = v;
            break;
        case 'mt6':
            mt[6] = v;
            break;
        case 'mt7':
            mt[7] = v;
            break;
        case 'mt8':
            mt[8] = v;
            break;
        case 'mt9':
            mt[9] = v;
            break;
        case 'mt10':
            mt[10] = v;
            break;
        case 'mt11':
            mt[11] = v;
            break;
        case 'mt12':
            mt[12] = v;
            break;
        case 'mt13':
            mt[13] = v;
            break;
        case 'mt14':
            mt[14] = v;
            break;

            // overlay maps
        case 'mt-1':
            mt_overlay[0] = v;
            break;
        case 'mt-1p':
            state.percent = v;
            break;

        case 'lon':
        case 'mlon':
            lon = Number(v);
            break;

        case 'lat':
        case 'mlat':
            lat = Number(v);
            break;

            /* old google maps: ll=lat,lon */
        case 'll':
            obj = getMapCenter('@' + v + ',15z'); // new google URL style
            lat = obj.lat;
            lon = obj.lng;
            break;

        case 'profile':
            if (profile[v]) {
                NumberOfMaps = profile[v].NumberOfMaps ? profile[v].NumberOfMaps : profile[v].mt.length;
                debug("Use profile " + v + ", with " + NumberOfMaps + " maps");
                mc.mt = profile[v].mt;

                if (profile[v].center) {
                    lon = profile[v].center.lon;
                    lat = profile[v].center.lat;
                    debug("Reset center to lon,lat: " + lon + "," + lat);
                }

                if (profile[v].zoom) {
                    zoom = profile[v].zoom;
                }
            }
            break;

        case 'url':
            pos = tile2lnglat(v);
            if (pos) {
                lon = pos.lng;
                lat = pos.lat;
                zoom = pos.zoom;
            } else {
                debug("cannot decode url parameter");
            }
            break;

        case 'zoom':
        case 'z':
            zoom = parseInt(v);
            break;

        case 'x':
            x = parseInt(v);
            break;
        case 'y':
            y = parseInt(v);
            break;

        case 'num':
        case 'number':
            NumberOfMaps = parseInt(v);
            break;

        case 'debug':
            mc.debug = parseInt(v) || 0;
            break;

        case 'fullscreen':
            if (parseInt(v) > 0) setTimeout(function () {
                toggleFullScreen(parseInt(v));
            }, 300);
            break;

        case 'marker':
            marker = decodeURIComponent(v);
            break;

        }
    });

    initKeyPress();
    initYandex();
    initToolserver();
    initLayerTypes();
    initLayerTypesUserDefined();
    valide_profile();

    var layertypes = state.layertypes;

    if (NumberOfMaps > layertypes.length) NumberOfMaps = layertypes.length;
    if (mc.NumberOfMapsMax > layertypes.length || !mc.NumberOfMapsMax) mc.NumberOfMapsMax = layertypes.length;
    if (!NumberOfMaps || NumberOfMaps < 1 || NumberOfMaps > mc.NumberOfMapsMax) NumberOfMaps = 2;

    mc.NumberOfMaps = NumberOfMaps;
    MapOrderHtml(NumberOfMaps);

    $(window).resize(function () {
        setMapHeight(NumberOfMaps);
        if ($("div#search-results").length > 0) {
            set_search_width();
        }
    });

    pos = createMapPosition(lon, lat, x, y, zoom);

    // OpenLayers.ImgPath = OpenLayers._getScriptLocation() + '../../img/theme/geofabrik/img/';
    OpenLayers.ImgPath = 'img/theme/geofabrik/img/';

    initColumnWidth(NumberOfMaps);
    var mapnames = sortMapLayersSelected(mc.mt);

    for (var n = 0; n < NumberOfMaps; n++) {
        // selected map type in menu
        var mapname = mapnames[n];

        initColumn(n);
        initSelectOptions(n, mapname);

        var _map = new OpenLayers.Map('map' + n, {
            theme: null,
            numZoomLevels: mc.numZoomLevels,
            controls: [],
            projection: projmerc,
            displayProjection: state.proj4326
        });

        _map.addControl(new OpenLayers.Control.Navigation());
        _map.addControl(new OpenLayers.Control.MousePosition({
            prefix: "lng,lat: ",
            separator: ",",
            div: $('#customMousePosition').get(0)
        }));

        // controls for first map top left
        if (n == 0) {
            _map.addControl(new OpenLayers.Control.PanZoomBar());
            _map.addControl(new OpenLayers.Control.ScaleLine({
                geodesic: true
            }));
            state.control.keyboard = new OpenLayers.Control.KeyboardDefaults();
            _map.addControl(state.control.keyboard);
        }

        state.maps[n] = _map;
        newLayer(n, mapname);


        setStartPos(n, pos.getLonLat(), pos.zoom);
        initMarker(n);

        _map.events.register('movestart', n, moveStart);
        _map.events.register('moveend', n, moveEnd);
        _map.events.register('mousemove', n, mouseMove);
        _map.events.register('mouseover', n, mouseOver);
        _map.events.register('mouseout', n, mouseOut);

        // move mapname on top of map
        if (mc.mapname_fullscreen) {
            $(_map.viewPortDiv).append($("div#mapname" + n));
        }
    }

    // hide the second column if only one map should be displayed
    if (NumberOfMaps == 1) {
        initColumn(1, "none");
    }

    map = state.maps[0];

    // overlay
    initSelectOptionsOverlay(-1, mt_overlay[0]);
    if (mc.overlay.type == "select") {
        initSelectOptionsTransparent(-2, state.percent);
    } else {
        initSliderTransparent();
    }

    // $('#customMousePosition').hide();
    updatePermalink();
    updateNumberOfMapsLink(mc.NumberOfMapsMax, NumberOfMaps, mc.NumberOfMapsLinks);

    // paranoid
    $(window).load(function () {
        debug("window.load done");
        setMapHeight(NumberOfMaps);
    });

    if (lon && lat && marker) {
        set_popup({
            lon: lon,
            lat: lat,
            message: marker
        });
        state.marker_message = marker;
    }

    state.zoom = zoom;
}

function initResponsiveDesign() {
    if (mc.responsive.enabled) {
        // $('head').append('<link rel="stylesheet" href="css/mobile.css" type="text/css" />')
    }
}

function parseHashtag(handler) {
    var url = location.href;
    var obj;

    // OpenStreetMap: #map=18/52.58592/13.36120
    if (url.indexOf("#map=") != -1) {
        obj = getMapCenter(url.substring(url.indexOf("#map=")));
    }

    // Google Maps (admin console): @52.375326,13.2926094,13z
    else if (url.indexOf("@") != -1) {
        obj = getMapCenter(url.substring(url.indexOf("@")));
    }

    // need a hash tag before @, because this is a static page!
    else if (url.indexOf("#@") != -1) {
        obj = getMapCenter(url.substring(url.indexOf("#@") + 1));
    }

    // tools.geofabrik.de: #18/52.58592/13.36120 => 13.36120,52.58592,18
    else if (url.indexOf("#") != -1) {
        obj = getMapCenter(url.substring(url.indexOf("#")));
    }


    handler(obj);
}

/*
  here are dragons!
  code copied from js/OpenLayers-2.11/OpenLayers.js: OpenLayers.Control.KeyboardDefaults

  see also: http://www.mediaevent.de/javascript/Extras-Javascript-Keycodes.html
*/
function initKeyPress() {
    // move all maps left/right/top/down

    function moveMap(direction, option) {
        for (var i = 0; i < state.maps.length; i++) {
            // google maps don't support animate flag
            var animate = state.layers[i].type.match(/^google-/) ? false : true;
            debug(state.layers[i].type + " " + animate);

            // state.layers[i].layers[1].pan(direction, option, { animate: animate });
            state.maps[i].pan(direction, option, {
                animate: animate
            });
        }
    };

    OpenLayers.Control.KeyboardDefaults.prototype.defaultKeyPress = function (evt) {
        debug("key press: " + evt.keyCode);

        switch (evt.keyCode) {

            // move the map left/right/top/bottom
        case OpenLayers.Event.KEY_LEFT:
        case 72:
            moveMap(-this.slideFactor, 0);
            break;
        case OpenLayers.Event.KEY_RIGHT:
        case 76:
            moveMap(this.slideFactor, 0);
            break;
        case OpenLayers.Event.KEY_UP:
        case 75:
            moveMap(0, -this.slideFactor);
            break;
        case OpenLayers.Event.KEY_DOWN:
        case 74:
            moveMap(0, this.slideFactor);
            break;

        case 33:
            var size = map.getSize();
            map.pan(0, -0.75 * size.h);
            break;
        case 34:
            var size = map.getSize();
            map.pan(0, 0.75 * size.h);
            break;
        case 35:
            var size = map.getSize();
            map.pan(0.75 * size.w, 0);
            break;
        case 36:
            var size = map.getSize();
            map.pan(-0.75 * size.w, 0);
            break;

            // '+', '=''
        case 43:
        case 61:
        case 187:
        case 107:
        case 171:
            // Firefox 15.x
            map.zoomIn();
            break;

            // '-'
        case 45:
        case 109:
        case 189:
        case 95:
        case 173:
            // Firefox 15.x or later, see https://github.com/openlayers/openlayers/issues/605
            map.zoomOut();
            break;

            // Map Compare
        case 70:
            // f
        case 27:
            // ESC
            // 'f': toggle fullscreen, without map name if shift or ctrl are pressed
            // are active (e.g. to switch to fullscreen browser window)
            if (evt.shiftKey || evt.altKey) {
                toggleFullScreen(2);
            } else if (evt.ctrlKey) {
                toggleFullScreen(3);
            } else {
                toggleFullScreen(1);
            }
            break;

        case 71:
            // 'g'
            locateMe();
            break;

        case 48:
            // '0' max zoom in
            for (var i = 0; i < 17; i++) {
                if (map.getZoom() < i) map.zoomIn();
            }
            break;

            // number of maps: 1..9
        case 49:
            window.location.href = getPermalink(1);
            break;
        case 50:
            window.location.href = getPermalink(2);
            break;
        case 51:
            window.location.href = getPermalink(3);
            break;
        case 52:
            window.location.href = getPermalink(4);
            break;
        case 53:
            // 5: 15 maps, 3 rows
            window.location.href = getPermalink(15);
            break;
        case 54:
            window.location.href = getPermalink(6);
            break;
        case 55:
            // 7: 24 maps, 4 rows
            window.location.href = getPermalink(24);
            break;
        case 56:
            window.location.href = getPermalink(8);
            break;
        case 57:
            // 9: all maps
            window.location.href = getPermalink(state.layertypes.length);
            break;

        case 67:
            // 'c'
            window.location.href = "console.html";
            break
        case 80:
            // 'p' - create permalink
            // window.location.href = updatePermalink();
            click_share_link();
            break
        case 191:
            // '/' (alias '?')
            $("#tools-helptrigger").trigger({
                type: 'click',
                which: 191
            });
            // window.location.href = "help.html";
            break
        case 83:
            // 's'
            $("#tools-searchtrigger").trigger({
                type: 'click',
                which: 83
            });
            // window.location.href = "search.html";
            break

/* default:
            debug("unknown key press: " + evt.keyCode);
            break;
        */

        }

        return evt.keyCode;
    };
};


/* sort maps, pre-selected first */

function sortMapLayersSelected(selectedMaps) {
    var layertypes = state.layertypes;
    var cache = {};
    var list = [];

    // these maps are first
    for (var i = 0; i < selectedMaps.length; i++) {
        cache[selectedMaps[i]] = 1;
        list.push(selectedMaps[i]);
    }

    // then the rest
    for (var i = 0; i < layertypes.length; i++) {
        var name = layertypes[i].type;
        if (!cache[name]) {
            list.push(name);
        }
    }

    return list;
}

// reorder maps by name

function reorderMaps(type, config) {
    var maplist = state[type];
    if (!config.name && !config.type) return;

    function sortByName(a, b) {
        return a.name == b.name ? 0 : a.name > b.name ? 1 : -1
    };

    function sortByType(a, b) {
        return a.type == b.type ? 0 : a.type > b.type ? 1 : -1
    };

    // special sorting of map names

    function namePref(maps) {
        var list = [];
        var cache = {};
        var hash = {};

        for (var i = 0; i < state.nonBaseLayer.length; i++)
        hash[state.nonBaseLayer[i]] = 1;

        for (var i = 0; i < maps.length; i++) {
            if (!cache[i] && config.opacity && hash[maps[i]] && hash[maps[i].type]) {
                // alert("fooA " + maps[i].type);
                list.push(maps[i]);
                cache[i] = 1;
            }
        }

        // BBBike maps first
        for (var i = 0; i < maps.length; i++) {
            if (!cache[i] && config.bbbike && maps[i].name.match(/^BBBike/i)) {
                list.push(maps[i]);
                cache[i] = 1;
            }
        }

        // OSM maps second
        for (var i = 0; i < maps.length; i++) {
            if (!cache[i] && config.osm && maps[i].name.match(/^OSM/i)) {
                list.push(maps[i]);
                cache[i] = 1;
            }
        }

        // rest
        for (var i = 0; i < maps.length; i++) {
            if (!cache[i]) list.push(maps[i]);
        }

        return list;
    };

    if (config.name) {
        maplist = namePref(maplist.sort(sortByName));
    } else if (config.type) {
        maplist = maplist.sort(sortByType);
    } else {
        // nothing
    }

    state[type] = maplist;
}

function setMapHeight(NumberOfMaps) {
    var fullscreen = state.fullscreen;
    var height = $(window).height();
    var head = $('#head0').outerHeight(true); // first map description height
    if (fullscreen) {
        height -= $('#tools-copyright').outerHeight(true); // always visible
    } else {
        height += -$('#tools-top').outerHeight(true) - $('#tools-titlebar').outerHeight(true) - $('#bottom').outerHeight(true) - $('#tools-copyright').outerHeight(true);
    }

    // split screen if more than 3 maps are displayed
    var h;
    var rows = 1;
    if (NumberOfMaps <= 3) {;
    } else if (NumberOfMaps <= mc.row3) {
        rows = 2;
    } else if (NumberOfMaps <= mc.row4) {
        rows = 3;
    } else if (NumberOfMaps <= mc.row5) {
        rows = 4;
    } else {
        rows = 5;
    }

    h = height / rows;
    if (!fullscreen) {
        h -= head;
    }
    $('.map').height(Math.floor(h));

    // development: validate map size height
    var rest;
    if (!fullscreen) {
        rest = $('#tools-top').outerHeight(true) + $('#tools-titlebar').outerHeight(true) + $('#bottom').outerHeight(true) + $('#tools-copyright').outerHeight(true) + rows * ($('#map0').outerHeight() + $('#head0.switch').outerHeight(true));
    } else {
        rest = $('#tools-copyright').outerHeight(true) + rows * ($('#map0').outerHeight());
    }
    debug("height: " + $(window).height() + " rest: " + rest + " diff: " + ($(window).height() - rest) + " map: " + $('#map0').height());
}

function initToolserver() {
    // create the custom layer for toolserver.org
    OpenLayers.Layer.OSM.Toolserver = OpenLayers.Class(OpenLayers.Layer.OSM, {
        initialize: function (name, path, options) {
            // var url = switch_url("http://{switch:a,b,c}.tiles.wmflabs.org/" + path + "/${z}/${x}/${y}.png");
            var url = switch_url("https://tiles.wmflabs.org/" + path + "/${z}/${x}/${y}.png");

            options = OpenLayers.Util.extend({
                tileOptions: {
                    crossOriginKeyword: null
                },
                sphericalMercator: true,
                numZoomLevels: 19
            }, options);
            OpenLayers.Layer.OSM.prototype.initialize.apply(this, [name, url, options]);
        },

        CLASS_NAME: "OpenLayers.Layer.OSM.Toolserver"
    });
}

function initLayerTypes() {
    var BingApiKey = "AjkRC9uldL9KVU3pa6N59e7fjpNdCzKTtMqFhdafSEQlcNGPLVEm3b3mukoZCLWr";

    var YandexBounds = state.YandexBounds;
    var proj4326 = state.proj4326;


    var layer_options = {
        tileOptions: {
            crossOriginKeyword: null
        },
        sphericalMercator: true,
        // buffer: 0,
        transitionEffect: "resize",
        numZoomLevels: 19
    };


    function google_layertypes() {
        return [

        new LayerType('google-map', 'Google Map', function () {
            return new OpenLayers.Layer.Google('Google (Map)', {
                type: google.maps.MapTypeId.ROADMAP
            });
        }),

        new LayerType('google-map-mapmaker', 'Google Map MapMaker', function () {
            var _map = new OpenLayers.Layer.Google('Google (Map)', {
                type: google.maps.MapTypeId.ROADMAP
            });

            /* XXX: it needs to be called some milliseconds later */
            setTimeout(function () {
                _map.mapObject.setOptions({
                    mapMaker: true
                });
            }, 0);
            return _map;
        }),

        new LayerType('google-satellite', 'Google Satellite', function () {
            return new OpenLayers.Layer.Google('Google (Satellite)', {
                type: google.maps.MapTypeId.SATELLITE
            });
        }),

        new LayerType('google-hybrid', 'Google Hybrid', function () {
            return new OpenLayers.Layer.Google('Google (Hybrid)', {
                type: google.maps.MapTypeId.HYBRID
            });
        }),

        new LayerType('google-hybrid-mapmaker', 'Google Hybrid MapMaker', function () {
            var _map = new OpenLayers.Layer.Google('Google (Map)', {
                type: google.maps.MapTypeId.HYBRID
            });

            /* XXX: it needs to be called some milliseconds later */
            setTimeout(function () {
                _map.mapObject.setOptions({
                    mapMaker: true
                });
            }, 0);
            return _map;
        }),

        new LayerType('google-physical', 'Google Physical', function () {
            return new OpenLayers.Layer.Google('Google (Physical)', {
                type: google.maps.MapTypeId.TERRAIN
            });
        }),

        new LayerType('google-bicycle-map', 'Google Bicycle (Map)', function () {
            var g = new OpenLayers.Layer.Google('Google (Bicycle)', {
                type: google.maps.MapTypeId.ROADMAP
            });

            setTimeout(function () {
                new google.maps.BicyclingLayer().setMap(g.mapObject);
            }, 0);
            return g;
        }),

        new LayerType('google-traffic-map', 'Google Traffic (Map)', function () {
            var g = new OpenLayers.Layer.Google('Google (Traffic)', {
                type: google.maps.MapTypeId.ROADMAP
            });

            setTimeout(function () {
                new google.maps.TrafficLayer().setMap(g.mapObject);
            }, 0);
            return g;
        }),

        new LayerType('google-panoramio-physical', 'Google Panoramio (Physical)', function () {
            var g = new OpenLayers.Layer.Google('Google (Panoramio)', {
                type: google.maps.MapTypeId.TERRAIN
            });

            setTimeout(function () {
                new google.maps.panoramio.PanoramioLayer().setMap(g.mapObject);
            }, 0);
            return g;
        }),

        new LayerType('google-weather-sat', 'Google Weather (Sat)', function () {
            var g = new OpenLayers.Layer.Google('Google (Weather)', {
                type: google.maps.MapTypeId.SATELLITE
            });

            setTimeout(function () {
                new google.maps.weather.WeatherLayer().setMap(g.mapObject);
            }, 0);
            return g;
        }),

        new LayerType('google-transit-map', 'Google Transit (Map)', function () {
            var myLatlng = new google.maps.LatLng(51.501904, -0.115871);

            var g = new OpenLayers.Layer.Google('Google (Transit)', {
                center: myLatlng,
                zoom: 13,
                type: google.maps.MapTypeId.ROADMAP
            });

            setTimeout(function () {
                new google.maps.TransitLayer().setMap(g.mapObject);
            }, 0);
            return g;
        }),

        new LayerType('google-layers-physical', 'Google Layers (Physical)', function () {
            var myLatlng = new google.maps.LatLng(51.501904, -0.115871);

            var g = new OpenLayers.Layer.Google('Google (Transit)', {
                center: myLatlng,
                zoom: 13,
                type: google.maps.MapTypeId.TERRAIN
            });

            setTimeout(function () {
                new google.maps.BicyclingLayer().setMap(g.mapObject);
                new google.maps.TransitLayer().setMap(g.mapObject);
                new google.maps.weather.WeatherLayer().setMap(g.mapObject);
                new google.maps.TrafficLayer().setMap(g.mapObject);
            }, 0);
            return g;
        })];
    }; // google layers


    state.layertypes = [

    /* BBBike.de base layers */
    new LayerType('bbbike', 'BBBike Mapnik', function () {
        return new OpenLayers.Layer.OSM('BBBike Mapnik', switch_url('http://{switch:a,b,c}.tile.bbbike.org/osm/mapnik/${z}/${x}/${y}.png'), layer_options);
    }),

    new LayerType('bbbike-german', 'BBBike Mapnik (de)', function () {
        return new OpenLayers.Layer.OSM('BBBike Mapnik (de)', switch_url('http://{switch:a,b,c}.tile.bbbike.org/osm/mapnik-german/${z}/${x}/${y}.png'), layer_options);
    }),

    new LayerType('bbbike-bbbike', 'BBBike bbbike', function () {
        return new OpenLayers.Layer.OSM('BBBike Smoothness', switch_url('http://{switch:a,b,c,d}.tile.bbbike.org/osm/bbbike/${z}/${x}/${y}.png'), layer_options);
    }),

    /* BBBike.de overlay layers */
    new LayerType('bbbike-smoothness', 'BBBike Smoothness', function () {
        return new OpenLayers.Layer.OSM('BBBike Smoothness', switch_url('http://{switch:a,b,c,d}.tile.bbbike.org/osm/bbbike-smoothness/${z}/${x}/${y}.png'), layer_options);
    }),

    new LayerType('bbbike-handicap', 'BBBike handicap', function () {
        return new OpenLayers.Layer.OSM('BBBike handicap', switch_url('http://{switch:a,b,c,d}.tile.bbbike.org/osm/bbbike-handicap/${z}/${x}/${y}.png'), layer_options);
    }),

    new LayerType('bbbike-cycle-routes', 'BBBike cycle routes', function () {
        return new OpenLayers.Layer.OSM('BBBike cycle-routes', switch_url('http://{switch:a,b,c,d}.tile.bbbike.org/osm/bbbike-cycle-routes/${z}/${x}/${y}.png'), layer_options);
    }),

    new LayerType('bbbike-cycleway', 'BBBike cycleway', function () {
        return new OpenLayers.Layer.OSM('BBBike cycleway', switch_url('http://{switch:a,b,c,d}.tile.bbbike.org/osm/bbbike-cycleway/${z}/${x}/${y}.png'), layer_options);
    }),

    new LayerType('bbbike-green', 'BBBike green', function () {
        return new OpenLayers.Layer.OSM('BBBike green', switch_url('http://{switch:a,b,c,d}.tile.bbbike.org/osm/bbbike-green/${z}/${x}/${y}.png'), layer_options);
    }),

    new LayerType('bbbike-unlit', 'BBBike unlit', function () {
        return new OpenLayers.Layer.OSM('BBBike unlit', switch_url('http://{switch:a,b,c,d}.tile.bbbike.org/osm/bbbike-unlit/${z}/${x}/${y}.png'), layer_options);
    }),

    new LayerType('bbbike-unknown', 'BBBike unknown', function () {
        return new OpenLayers.Layer.OSM('BBBike unknown', switch_url('http://{switch:a,b,c,d}.tile.bbbike.org/osm/bbbike-unknown/${z}/${x}/${y}.png'), layer_options);
    }),

    new LayerType('mapnik', 'OSM Mapnik', function () {
        return new OpenLayers.Layer.OSM.Mapnik("OSM Mapnik");
    }),

    new LayerType('mapnik-german', 'OSM Mapnik (de)', function () {
        return new OpenLayers.Layer.OSM('OSM Mapnik (de)', switch_url('http://{switch:a,b,c,d}.tile.openstreetmap.de/tiles/osmde/${z}/${x}/${y}.png'), {
            tileOptions: {
                crossOriginKeyword: null
            },
            sphericalMercator: true,
            transitionEffect: "resize",
            numZoomLevels: 20
        });
    }),

    new LayerType('geofabrik-standard', 'Geofabrik Standard (OSM)', function () {
        return new OpenLayers.Layer.OSM('Geofabrik Standard (OSM)', switch_url("https://{switch:a,b,c}.tile.geofabrik.de/549e80f319af070f8ea8d0f149a149c2/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('geofabrik-german', 'Geofabrik German (OSM)', function () {
        return new OpenLayers.Layer.OSM('Geofabrik German (OSM)', switch_url("https://{switch:a,b,c}.tile.geofabrik.de/23228979966ae9040ceb0597251e12a2/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('geofabrik-topo', 'Geofabrik Topo (OSM)', function () {
        return new OpenLayers.Layer.OSM('Geofabrik Topo (OSM)', switch_url("https://{switch:a,b,c}.tile.geofabrik.de/15173cf79060ee4a66573954f6017ab0/${z}/${x}/${y}.png"), layer_options);
    }),


    new LayerType('mapnik-bw', 'OSM Mapnik b/w', function () {
        return new OpenLayers.Layer.OSM.Toolserver("OSM Mapnik b/w", 'bw-mapnik');
    }),

    new LayerType('toner', 'OSM Toner', function () {
        return new OpenLayers.Layer.OSM('OSM Toner', switch_url("http://{switch:a,b}.tile.stamen.com/toner/${z}/${x}/${y}.png"), {
            sphericalMercator: true,
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 20
        });
    }),

    new LayerType('toner-retina', 'OSM Toner Retina', function () {
        return new OpenLayers.Layer.OSM('OSM Toner', switch_url("http://{switch:a,b}.tile.stamen.com/toner/${z}/${x}/${y}@2x.png"), {
            sphericalMercator: true,
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 20
        });
    }),

    new LayerType('watercolor', 'OSM Watercolor', function () {
        return new OpenLayers.Layer.OSM('OSM Watercolor', switch_url("http://{switch:a,b,c,d}.tile.stamen.com/watercolor/${z}/${x}/${y}.png"), {
            tileOptions: {
                crossOriginKeyword: null
            },
            sphericalMercator: true,
            numZoomLevels: 18
        });
    }),

    new LayerType('maptoolkit-topo', 'Maptookit Topo (OSM)', function () {
        return new OpenLayers.Layer.OSM('Maptookit Topo (OSM)', switch_url('https://tile{switch:1,2,3,4}.maptoolkit.net/terrain/${z}/${x}/${y}.png'), {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 18
        });
    }),

    new LayerType('opentopomap', 'OSM OpenTopoMap', function () {
        return new OpenLayers.Layer.OSM('OSM OpenTopoMap', switch_url('http://{switch:a,b,c}.tile.opentopomap.org/tiles/${z}/${x}/${y}.png'), {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 16
        });
    }),

    new LayerType('osmfr', 'OSM FR', function () {
        return new OpenLayers.Layer.OSM('OSM FR', switch_url('http://{switch:a,b,c}.tile.openstreetmap.fr/osmfr/${z}/${x}/${y}.png'), layer_options);
    }),

    new LayerType('osmfr-hot', 'OSM FR hot', function () {
        return new OpenLayers.Layer.OSM('OSM FR hot', switch_url('http://{switch:a,b,c}.tile.openstreetmap.fr/hot/${z}/${x}/${y}.png'), layer_options);
    }),

    new LayerType('osmfr-openriverboatmap', 'OSM FR openriverboatmap', function () {
        return new OpenLayers.Layer.OSM('OSM FR hot', switch_url('http://{switch:a,b,c}.tile.openstreetmap.fr/openriverboatmap/${z}/${x}/${y}.png'), layer_options);
    }),
    new LayerType('osmbr', 'OSM BR', function () {
        return new OpenLayers.Layer.OSM('OSM BR', switch_url('https://tile.openstreetmap.bzh/br/${z}/${x}/${y}.png'), layer_options);
    }),
    new LayerType('osmbrteol', 'OSM BR teol', function () {
        return new OpenLayers.Layer.OSM('OSM BR teol', switch_url('https://teol.openstreetmap.bzh/br/${z}/${x}/${y}.png'), layer_options);
    }),
    new LayerType('osmbrlocal', 'OSM BR local', function () {
        return new OpenLayers.Layer.OSM('OSM BR local', switch_url('http://tile.openstreetmap.local/br/${z}/${x}/${y}.png'), layer_options);
    }),
    // wikimedia.org
/* XXX: protected by referer
    new LayerType('wikimedia-osm-intl', 'Wikimedia OSM', function () {
        return new OpenLayers.Layer.OSM('Wikimedia OSM', 'https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}.png', layer_options);
    }),

    new LayerType('wikimedia-nolabels', 'Wikimedia no Labels', function () {
        return new OpenLayers.Layer.OSM('Wikimedia no Labels', 'https://maps.wikimedia.org/osm/${z}/${x}/${y}.png', layer_options);
    }),


    // XXX: projection
    new LayerType('wikimedia-atlas', 'Wikimedia Atlas', function () {
        return new OpenLayers.Layer.OSM('Wikimedia Atlas', 'https://wma.wmflabs.org/tiles/mapnik/${z}/tile_${y}_${x}.png', layer_options);
    }),

    new LayerType('wikimedia-relief', 'Wikimedia Relief', function () {
        return new OpenLayers.Layer.OSM('Wikimedia Relief', 'https://wma.wmflabs.org/tiles/relief/${z}/tile_${y}_${x}.png', layer_options);
    }),

    new LayerType('wikimedia-sat', 'Wikimedia Satellite', function () {
        return new OpenLayers.Layer.OSM('Wikimedia Satellite', 'https://wma.wmflabs.org/tiles/sat/${z}/tile_${y}_${x}.png', layer_options);
    }),

        new LayerType('wikimedia-plain', 'Wikimedia Coastline', function () {
        return new OpenLayers.Layer.OSM('Wikimedia Coastline', 'https://wma.wmflabs.org/tiles/plain/${z}/tile_${y}_${x}.png', layer_options);
    }),
    */


    new LayerType('osm-roads', 'OSM Roads', function () {
        return new OpenLayers.Layer.OSM('OSM Roads', ["http://korona.geog.uni-heidelberg.de/tiles/roads/x=${x}&y=${y}&z=${z} "], layer_options);
    }),

    new LayerType('osm-roads-greyscale', 'OSM Roads Grayscale', function () {
        return new OpenLayers.Layer.OSM('OSM Roads Grayscale', ["http://korona.geog.uni-heidelberg.de/tiles/roadsg/x=${x}&y=${y}&z=${z} "], layer_options);
    }),

    new LayerType('osm-semitransparent', 'OSM Semitransparent', function () {
        return new OpenLayers.Layer.OSM('OSM Semitransparent', ["http://korona.geog.uni-heidelberg.de/tiles/hybrid/x=${x}&y=${y}&z=${z} "], layer_options);
    }),

    new LayerType('aster-gdem-srtm-hillshade', 'ASTER GDEM & SRTM', function () {
        return new OpenLayers.Layer.OSM('ASTER GDEM & SRTM', ["http://korona.geog.uni-heidelberg.de/tiles/asterh/x=${x}&y=${y}&z=${z} "], layer_options);
    }),

    new LayerType('aster-gdem-contour-lines', 'ASTER GDEM contour lines', function () {
        return new OpenLayers.Layer.OSM('ASTER GDEM contour lines', ["http://korona.geog.uni-heidelberg.de/tiles/asterc/x=${x}&y=${y}&z=${z} "], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 18
        })
    }),

    new LayerType('osm-administrative-boundaries', 'OSM Admin. Boundaries', function () {
        return new OpenLayers.Layer.OSM('OSM Admin. Boundaries', ["http://korona.geog.uni-heidelberg.de/tiles/adminb/x=${x}&y=${y}&z=${z} "], {
            tileOptions: {
                crossOriginKeyword: null
            },
            sphericalMercator: true,
            numZoomLevels: 16
        })
    }),

    new LayerType('osm-lights', 'OSM Lights', function () {
        return new OpenLayers.Layer.OSM('OSM Lights', ["http://korona.geog.uni-heidelberg.de:8005/tms_lt.ashx?x=${x}&y=${y}&z=${z} "], layer_options);
    }),

    new LayerType('bvg', "BVG", function () {
        return new OpenLayers.Layer.TMS("BVG", "", {
            href: "https://mobil.bvg.de/tiles/base/",
            getURL: bvg_getTileURL,
            numZoomLevels: 17
        });
    }),

    new LayerType('pharus', "Pharus", function () {
        return new OpenLayers.Layer.OSM('Pharus', ["http://gtile.deinplan.de/zzz/${z}/${x}/${y}.png"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            sphericalMercator: true,
            numZoomLevels: 18
        })
    }),

    new LayerType('falk-osm', 'Falk OSM', function () {
        return new OpenLayers.Layer.OSM('Falk OSM', ["http://ec2.cdn.ecmaps.de/WmsGateway.ashx.jpg?TileX=${x}&TileY=${y}&ZoomLevel=${z}&Experience=falk&MapStyle=Falk%20OSM"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 17
        })
    }),

    new LayerType('falk-base', 'Falk Original', function () {
        return new OpenLayers.Layer.OSM('Falk Original', ["http://ec2.cdn.ecmaps.de/WmsGateway.ashx.jpg?TileX=${x}&TileY=${y}&ZoomLevel=${z}&Experience=falk&MapStyle=Falk%20Base"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 17
        })
    }),

    new LayerType('kompass-touristik', 'Kompass Touristik', function () {
        return new OpenLayers.Layer.OSM('Falk Original', ["http://ec2.cdn.ecmaps.de/WmsGateway.ashx.jpg?TileX=${x}&TileY=${y}&ZoomLevel=${z}&Experience=kompass&MapStyle=KOMPASS%20Touristik"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 17
        })
    }),

    new LayerType('kompass-winter-touristik', 'Kompass Winter Touristik', function () {
        return new OpenLayers.Layer.OSM('Kompass Winter Touristik', ["http://ec2.cdn.ecmaps.de/WmsGateway.ashx.jpg?TileX=${x}&TileY=${y}&ZoomLevel=${z}&Experience=kompass&MapStyle=Winter%20Touristik"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 17
        });
    }),

    new LayerType('kompass-summer', 'Kompass Summer', function () {
        return new OpenLayers.Layer.OSM('Kompass Summer', ["http://ec2.cdn.ecmaps.de/WmsGateway.ashx.jpg?TileX=${x}&TileY=${y}&ZoomLevel=${z}&Experience=kompass&MapStyle=su"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 17
        });
    }),

    new LayerType('kompass-winter', 'Kompass Winter', function () {
        return new OpenLayers.Layer.OSM('Kompass Winter', ["http://ec2.cdn.ecmaps.de/WmsGateway.ashx.jpg?TileX=${x}&TileY=${y}&ZoomLevel=${z}&Experience=kompass&MapStyle=wi"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 17
        });
    }),


    new LayerType('waze-us', 'Waze (US)', function () {
        return new OpenLayers.Layer.OSM('Waze (US)', switch_url("https://livemap-tiles{switch:1,2,3,4}.waze.com/tiles/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('waze-world', 'Waze (World)', function () {
        return new OpenLayers.Layer.OSM('Waze (World)', switch_url("https://worldtiles{switch:1,2,3,4}.waze.com/tiles/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('osm-no-labels', 'OSM no labels', function () {
        return new OpenLayers.Layer.OSM.Toolserver("OSM no labels", 'osm-no-labels');
    }),

    new LayerType('osm-ch-standard', 'OSM CH standard', function () {
        return new OpenLayers.Layer.OSM('OSM CH standard', ["https://tile.osm.ch/switzerland/${z}/${x}/${y}.png"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 22
        })
    }),

    new LayerType('osm-ch-swiss', 'OSM CH swiss', function () {
        return new OpenLayers.Layer.OSM('OSM CH swiss', ["https://tile.osm.ch/osm-swiss-style/${z}/${x}/${y}.png"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 22
        })
    }),


    new LayerType('osm-se-hydda-full', 'OSM SE hydda full', function () {
        return new OpenLayers.Layer.OSM('OSM SE hydda full', switch_url('http://{switch:a,b,c}.tile.openstreetmap.se/hydda/full/${z}/${x}/${y}.png'), layer_options);
    }),

    new LayerType('osm-se-hydda-base', 'OSM SE hydda base', function () {
        return new OpenLayers.Layer.OSM('OSM SE hydda base', switch_url('http://{switch:a,b,c}.tile.openstreetmap.se/hydda/base/${z}/${x}/${y}.png'), layer_options);
    }),

    new LayerType('osm-se-hydda-roads', 'OSM SE hydda roads', function () {
        return new OpenLayers.Layer.OSM('OSM SE hydda roads', switch_url('http://{switch:a,b,c}.tile.openstreetmap.se/hydda/roads_and_labels/${z}/${x}/${y}.png'), layer_options);
    }),

    new LayerType('osm-se-standard', 'OSM SE standard', function () {
        return new OpenLayers.Layer.OSM('OSM SE hydda standard', switch_url('http://{switch:a,b,c}.tile.openstreetmap.se/osm/${z}/${x}/${y}.png'), layer_options);
    }),

    new LayerType('visitnorway-standard', 'Visitnorway', function () {
        return new OpenLayers.Layer.OSM('Visitnorway', switch_url('http://services.geodataonline.no/arcgis/rest/services/Geocache_WMAS_WGS84/GeocacheBasis/MapServer/tile/${z}/${y}/${x}'), layer_options);
    }),


    new LayerType('landscape', 'OSM Landscape', function () {
        return new OpenLayers.Layer.OSM('OSM Landscape', switch_url("https://{switch:a,b,c}.tile.thunderforest.com/landscape/${z}/${x}/${y}@2x.png"), layer_options);
    }),

    new LayerType('transport', 'OSM Transport', function () {
        return new OpenLayers.Layer.OSM('OSM Transport', switch_url("https://{switch:a,b,c}.tile.thunderforest.com/transport/${z}/${x}/${y}@2x.png"), layer_options);
    }),

    new LayerType('openmap-public-transport', 'OpenMap Public Transport', function () {
        return new OpenLayers.Layer.OSM('OpenMap Public Transport', "http://pt.openmap.lt/${z}/${x}/${y}.png", layer_options);
    }),


/* openlayers buildin
    new LayerType('cyclemap', 'OSM CycleMap', function () {
        return new OpenLayers.Layer.OSM.CycleMap('OSM CycleMap');
    }), */

    new LayerType('cyclemap', 'OSM Cycle', function () {
        return new OpenLayers.Layer.OSM('OSM Transport', switch_url("https://{switch:a,b,c}.tile.thunderforest.com/cycle/${z}/${x}/${y}@2x.png"), layer_options);
    }), /**/

    new LayerType('outdoors', 'OSM Outdoors', function () {
        return new OpenLayers.Layer.OSM('OSM Outdoors', switch_url("https://{switch:a,b,c}.tile.thunderforest.com/outdoors/${z}/${x}/${y}@2x.png"), layer_options);
    }),

    new LayerType('transport-dark', 'OSM Transport Dark', function () {
        return new OpenLayers.Layer.OSM('OSM Transport Dark', switch_url("https://{switch:a,b,c}.tile.thunderforest.com/transport-dark/${z}/${x}/${y}@2x.png"), layer_options);
    }),

    new LayerType('pioneer', 'OSM Pioneer railroad', function () {
        return new OpenLayers.Layer.OSM('OSM Pioneer railroad', switch_url("https://{switch:a,b,c}.tile.thunderforest.com/pioneer/${z}/${x}/${y}@2x.png"), layer_options);
    }),


/* not available yet
    new LayerType('atlas', 'OSM Atlas', function () {
        return new OpenLayers.Layer.OSM('OSM Atlas', switch_url("https://{switch:a,b,c}.tile.thunderforest.com/atlas/${z}/${x}/${y}@2x.png"), layer_options);
    }),
    */

    new LayerType('public_transport', 'OSM Public Transport', function () {
        return new OpenLayers.Layer.OSM("OSM OEPNV", ["http://tile.memomaps.de/tilegen/${z}/${x}/${y}.png"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 18
        })
    }),

    new LayerType('public_transport_lines', 'OSM Publ. Transp. L.', function () {
        return new OpenLayers.Layer.OSM("OSM PTL", "http://www.openptmap.org/tiles/${z}/${x}/${y}.png", {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 18,
            alpha: true
        })
    }),

    new LayerType('openrailwaymap-standard', 'OpenRailwayMap Stand.', function () {
        return new OpenLayers.Layer.OSM("OSM OpenRailwayMap", switch_url("http://{switch:a,b,c}.tiles.openrailwaymap.org/standard/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('openrailwaymap-maxspeed', 'OpenRailwayMap Max.', function () {
        return new OpenLayers.Layer.OSM("OSM OpenRailwayMap", switch_url("http://{switch:a,b,c}.tiles.openrailwaymap.org/maxspeed/${z}/${x}/${y}.png"), layer_options);
    }),


    new LayerType('hike_bike', 'OSM Hike&Bike', function () {
        return new OpenLayers.Layer.OSM.Toolserver("OSM Hike&Bike", 'hikebike');
    }),

    new LayerType('hillshading', 'Hillshading SRTM3 V2', function () {
        return new OpenLayers.Layer.OSM.Toolserver("Hillshading SRTM3 V2", 'hillshading', {
            numZoomLevels: 16
        });
    }),

    new LayerType('wanderreitkarte', 'OSM Wanderreitkarte', function () {
        return new OpenLayers.Layer.OSM("OSM Wanderreitkarte", ["http://www.wanderreitkarte.de/topo/${z}/${x}/${y}.png"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 18
        })
    }),

    new LayerType('mapbox-satellite', 'MapBox Satellite', function () {
        return new OpenLayers.Layer.OSM("MapBox Satellite", switch_url("https://{switch:a,b,c,d}.tiles.mapbox.com/v3/tmcw.map-j5fsp01s/${z}/${x}/${y}.png"), {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 20
        })
    }),

    new LayerType('mapbox-hybrid', 'MapBox Hybrid', function () {
        return new OpenLayers.Layer.OSM("MapBox Hybrid", switch_url("https://{switch:a,b,c,d}.tiles.mapbox.com/v3/tmcw.map-j5fsp01s/${z}/${x}/${y}.png"), {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 20
        })
    }),

/* no longer available
    new LayerType('comic-sans', 'OSM Comic Sans', function () {
        return new OpenLayers.Layer.OSM("OSM Comic Sans", switch_url("https://{switch:a,b,c,d}.tiles.mapbox.com/v3/examples.bc17bb2a/${z}/${x}/${y}.png"), {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 17
        })
    }),
    */

    new LayerType('mapbox-transportation', 'MapBox Transport (OSM)', function () {
        return new OpenLayers.Layer.OSM("MapBox transportation", switch_url("https://{switch:a,b,c,d}.tiles.mapbox.com/v4/peterqliu.9d05be4d/${z}/${x}/${y}@2x.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ"), {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 20
        })
    }),

    new LayerType('mapbox-terrain', 'MapBox Terrain', function () {
        return new OpenLayers.Layer.OSM("MapBox terrain", switch_url("https://{switch:a,b,c,d}.tiles.mapbox.com/v4/matt.72ef5189/${z}/${x}/${y}@2x.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ"), {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 20
        })
    }),

    new LayerType('mapbox-runkeepers', 'MapBox Runkeepers', function () {
        return new OpenLayers.Layer.OSM("MapBox Runkeepers", switch_url("https://{switch:a,b,c,d}.tiles.mapbox.com/v4/heyitsgarrett.kf2a2nb1/${z}/${x}/${y}.png?access_token=pk.eyJ1IjoiaGV5aXRzZ2FycmV0dCIsImEiOiIwdWt5ZlpjIn0.73b7Y47rgFnSD7QCNeS-zA"), {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 20
        })
    }),

    new LayerType('osm2world', 'OSM2World/3D (OSM)', function () {
        return new OpenLayers.Layer.OSM("OSM2World/3D (OSM)", switch_url("http://{switch:a,b,c,d}.tiles.osm2world.org/osm/pngtiles/n/${z}/${x}/${y}.png"), {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 19
        })
    }),



    new LayerType('bing-map', 'Bing Map', function () {
        return new OpenLayers.Layer.Bing(

        // XXX: bing.com returns a wrong zoom level in JSON API call
        OpenLayers.Util.extend({
            initLayer: function () {
                // pretend we have a zoomMin of 0
                if (this.metadata.resourceSets.length > 0) {
                    this.metadata.resourceSets[0].resources[0].zoomMin = 0;
                    OpenLayers.Layer.Bing.prototype.initLayer.apply(this, arguments);
                }
            }
        }, {
            key: BingApiKey,
            type: "Road"
            //,  metadataParams: { mapVersion: "v1" }
        }));
    }),

    new LayerType('bing-satellite', 'Bing Satellite', function () {
        return new OpenLayers.Layer.Bing(OpenLayers.Util.extend({
            initLayer: function () {
                if (this.metadata.resourceSets.length > 0) {
                    this.metadata.resourceSets[0].resources[0].zoomMin = 0;
                    OpenLayers.Layer.Bing.prototype.initLayer.apply(this, arguments);
                }
            }
        }, {
            key: BingApiKey,
            type: "Aerial",
            numZoomLevels: 18
        }));
    }),

    new LayerType('bing-hybrid', 'Bing Hybrid', function () {
        return new OpenLayers.Layer.Bing(OpenLayers.Util.extend({
            initLayer: function () {
                if (this.metadata.resourceSets.length > 0) {
                    this.metadata.resourceSets[0].resources[0].zoomMin = 0;
                    OpenLayers.Layer.Bing.prototype.initLayer.apply(this, arguments);
                }
            }
        }, {
            key: BingApiKey,
            type: "AerialWithLabels",
            numZoomLevels: 18
        }));
    }),

    new LayerType('mapquest-map', 'Mapquest Map (OSM)', function () {
        return new OpenLayers.Layer.OSM('Mapquest Map (OSM)', switch_url("https://{switch:a,b,c,d}.tiles.mapbox.com/v4/mapquest.streets-mb/${z}/${x}/${y}@2x.png?access_token=pk.eyJ1IjoibWFwcXVlc3QiLCJhIjoiY2Q2N2RlMmNhY2NiZTRkMzlmZjJmZDk0NWU0ZGJlNTMifQ.mPRiEubbajc6a5y9ISgydg"), layer_options);
    }),

    new LayerType('mapquest-hybrid', 'Mapquest Hybrid (OSM)', function () {
        return new OpenLayers.Layer.OSM('Mapquest Hybrid (OSM)', switch_url("https://{switch:a,b,c,d}.tiles.mapbox.com/v4/mapquest.satellite-mb/${z}/${x}/${y}@2x.png?access_token=pk.eyJ1IjoibWFwcXVlc3QiLCJhIjoiY2Q2N2RlMmNhY2NiZTRkMzlmZjJmZDk0NWU0ZGJlNTMifQ.mPRiEubbajc6a5y9ISgydg"), layer_options);
    }),

    new LayerType('mapquest-satellite', 'Mapquest Satellite', function () {
        return new OpenLayers.Layer.OSM('Mapquest Satellite', switch_url("https://{switch:a,b,c,d}.tiles.mapbox.com/v4/mapquest.satellitenolabels/${z}/${x}/${y}@2x.png?access_token=pk.eyJ1IjoibWFwcXVlc3QiLCJhIjoiY2Q2N2RlMmNhY2NiZTRkMzlmZjJmZDk0NWU0ZGJlNTMifQ.mPRiEubbajc6a5y9ISgydg"), layer_options);
    }),

    new LayerType('mapquest-dark', 'Mapquest Dark (OSM)', function () {
        return new OpenLayers.Layer.OSM('Mapquest Dark (OSM)', switch_url("https://{switch:a,b,c,d}.tiles.mapbox.com/v4/mapquest.dark-mb/${z}/${x}/${y}@2x.png?access_token=pk.eyJ1IjoibWFwcXVlc3QiLCJhIjoiY2Q2N2RlMmNhY2NiZTRkMzlmZjJmZDk0NWU0ZGJlNTMifQ.mPRiEubbajc6a5y9ISgydg"), layer_options);
    }),

    new LayerType('mapquest-light', 'Mapquest Light (OSM)', function () {
        return new OpenLayers.Layer.OSM('Mapquest Light (OSM)', switch_url("https://{switch:a,b,c,d}.tiles.mapbox.com/v4/mapquest.light-mb/${z}/${x}/${y}@2x.png?access_token=pk.eyJ1IjoibWFwcXVlc3QiLCJhIjoiY2Q2N2RlMmNhY2NiZTRkMzlmZjJmZDk0NWU0ZGJlNTMifQ.mPRiEubbajc6a5y9ISgydg"), layer_options);
    }),

    // you may get warnings in the browser console because the esri server returns a wrong mime type image/jpg instead image/jpeg
/* ESRI Basemaps
     *
     * http://help.arcgis.com/en/arcgisserver/10.0/help/datamaps/index.html#//00v900000005000000.htm
     */
    new LayerType('esri', 'Esri', function () {
        return new OpenLayers.Layer.OSM('Esri', "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/${z}/${y}/${x}.jpg", layer_options);
    }),

    new LayerType('esri-satellite', 'Esri Satellite', function () {
        return new OpenLayers.Layer.OSM('Esri Satellite', "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}.jpg", layer_options);
    }),

    new LayerType('esri-physical', 'Esri Physical', function () {
        return new OpenLayers.Layer.OSM('Esri Physical', "https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/${z}/${y}/${x}.jpg", {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 9
        })
    }),

    new LayerType('esri-shaded-relief', 'Esri Shaded Relief', function () {
        return new OpenLayers.Layer.OSM('Esri Shaded Relief', "https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/${z}/${y}/${x}.jpg", {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 13
        })
    }),

    new LayerType('esri-terrain-base', 'Esri Terrain', function () {
        return new OpenLayers.Layer.OSM('Esri Terrain', "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/${z}/${y}/${x}.jpg", {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 10
        })
    }),

    new LayerType('esri-topo', 'Esri Topo', function () {
        return new OpenLayers.Layer.OSM('Esri Topo', "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/${z}/${y}/${x}.jpg", layer_options);
    }),

    new LayerType('esri-gray', 'Esri Gray', function () {
        return new OpenLayers.Layer.OSM('Esri Gray', "http://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/${z}/${y}/${x}.jpg", layer_options);
    }),

    new LayerType('esri-natgeo', 'Esri National Geographic', function () {
        return new OpenLayers.Layer.OSM('Esri Gray', "http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/${z}/${y}/${x}.jpg", {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 13
        });
    }),

    new LayerType('esri-ocean', 'Esri Ocean', function () {
        return new OpenLayers.Layer.OSM('Esri Ocean', "https://services.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/${z}/${y}/${x}.jpg", {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 11
        });
    }),


/*
     *   ESRI Reference layers
     *
     */

    new LayerType('esri-boundaries-places', 'Esri Boundaries & Places', function () {
        return new OpenLayers.Layer.OSM('Esri Boundaries & Places', "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/${z}/${y}/${x}.jpg", layer_options);
    }),

    new LayerType('esri-reference-overlay', 'Esri Reference Overlay', function () {
        return new OpenLayers.Layer.OSM('Esri Reference Overlay', "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/${z}/${y}/${x}.jpg", {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 10
        })
    }),

    new LayerType('esri-transportation', 'Esri Transportation', function () {
        return new OpenLayers.Layer.OSM('Esri Transportation', "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/${z}/${y}/${x}.jpg", layer_options);
    }),

    new LayerType('apple-iphoto', 'Apple iPhoto (OSM)', function () {
        return new OpenLayers.Layer.OSM('Apple iPhoto (OSM)', "http://gsp2.apple.com/tile?api=1&style=slideshow&layers=default&lang=de_DE&z=${z}&x=${x}&y=${y}&v=9", {
            tileOptions: {
                crossOriginKeyword: null
            },
            sphericalMercator: true,
            numZoomLevels: 15
        });
    }),

    new LayerType('apple-map', 'Apple Map', function () {
        return new OpenLayers.Layer.OSM('Apple Map', switch_url("https://cdn{switch:1,2,3,4}.apple-mapkit.com/ti/tile?type=tile&style=0&size=1&x=${x}&y=${y}&z=${z}&scale=2&lang=en&imageFormat=jpg&v=1603142&poi=1&vendorkey=38da783db1ef0c2d9f8e783a063ffcdc6a6330fe"), layer_options);
    }),

    new LayerType('apple-hybrid', 'Apple Hybrid', function () {
        return new OpenLayers.Layer.OSM('Apple Hybrid', switch_url("https://cdn{switch:1,2,3,4}.apple-mapkit.com/ti/tile?type=tile&style=46&size=1&x=${x}&y=${y}&z=${z}&scale=2&lang=en&imageFormat=jpg&v=1603142&poi=1&vendorkey=38da783db1ef0c2d9f8e783a063ffcdc6a6330fe"), layer_options);
    }),

    new LayerType('apple-satellite', 'Apple Satellite', function () {
        return new OpenLayers.Layer.OSM('Apple Satellite', switch_url("https://sat-cdn{switch:1,2,3,4}.apple-mapkit.com/tile?style=7&size=1&scale=1&z=${z}&x=${x}&y=${y}&v=335&vendorkey=38da783db1ef0c2d9f8e783a063ffcdc6a6330fe"), layer_options);
    }),


    new LayerType('skobbler', 'Skobbler (OSM)', function () {
        return new OpenLayers.Layer.OSM('Skobbler (OSM)', switch_url("http://tiles{switch:1,2,3,4}.skobbler.net/osm_tiles2/${z}/${x}/${y}.png"), layer_options);
    }),

    // http://tiles4-bc7b4da77e971c12cb0e069bffcf2771.skobblermaps.com/TileService/tiles/2.0/01021113210/7/6/31/24.png@2x?traffic=false
    new LayerType('skobbler-lite', 'Skobbler Lite (OSM)', function () {
        return new OpenLayers.Layer.OSM('Skobbler Lite (OSM)', switch_url("https://tiles{switch:1,2,3,4}-bc7b4da77e971c12cb0e069bffcf2771.skobblermaps.com/TileService/tiles/2.0/01021113210/7/${z}/${x}/${y}.png@2x?traffic=false"), layer_options);
    }),

    new LayerType('skobbler-day', 'Skobbler Day (OSM)', function () {
        return new OpenLayers.Layer.OSM('Skobbler Day (OSM)', switch_url("https://tiles{switch:1,2,3,4}-bc7b4da77e971c12cb0e069bffcf2771.skobblermaps.com/TileService/tiles/2.0/01021113210/0/${z}/${x}/${y}.png@2x?traffic=false"), layer_options);
    }),

    new LayerType('skobbler-night', 'Skobbler Night (OSM)', function () {
        return new OpenLayers.Layer.OSM('Skobbler Night (OSM)', switch_url("https://tiles{switch:1,2,3,4}-bc7b4da77e971c12cb0e069bffcf2771.skobblermaps.com/TileService/tiles/2.0/01021113210/2/${z}/${x}/${y}.png@2x?traffic=false"), layer_options);
    }),

    new LayerType('skobbler-outdoor', 'Skobbler Outdoor (OSM)', function () {
        return new OpenLayers.Layer.OSM('Skobbler Outdoor (OSM)', switch_url("https://tiles{switch:1,2,3,4}-bc7b4da77e971c12cb0e069bffcf2771.skobblermaps.com/TileService/tiles/2.0/01021113210/5/${z}/${x}/${y}.png@2x?traffic=false"), layer_options);
    }),

    new LayerType('komoot', 'Komoot (OSM)', function () {
        return new OpenLayers.Layer.OSM('Komoot (OSM)', switch_url("https://a.tile.hosted.thunderforest.com/komoot-2/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('lyrk', 'Lyrk (OSM)', function () {
        return new OpenLayers.Layer.OSM('Lyrk (OSM)', "https://tiles.lyrk.org/ls/${z}/${x}/${y}?apikey=e9f8eb3824344d18a5b4b657773caf30", layer_options);
    }),

    new LayerType('lyrk-retina', 'Lyrk Retina (OSM)', function () {
        return new OpenLayers.Layer.OSM('Lyrk Retina (OSM)', "https://tiles.lyrk.org/lr/${z}/${x}/${y}?apikey=e9f8eb3824344d18a5b4b657773caf30", layer_options);
    }),

    new LayerType('osm-gps', 'OSM GPS', function () {
        return new OpenLayers.Layer.OSM('OSM GPS', switch_url("http://{switch:a,b,c}.gps-tile.openstreetmap.org/lines/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('cartodb-positron', 'CartoDB Positron (OSM)', function () {
        return new OpenLayers.Layer.OSM('CartoDB Positron (OSM)', switch_url("http://{switch:a,b,c,d}.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('cartodb-darkmatter', 'CartoDB Dark Matter (OSM)', function () {
        return new OpenLayers.Layer.OSM('CartoDB Dark Matter (OSM)', switch_url("http://{switch:a,b,c,d}.basemaps.cartocdn.com/dark_all/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('sputnik-map', 'Sputnik (OSM)', function () {
        return new OpenLayers.Layer.OSM('Sputnik (OSM)', switch_url("http://{switch:a,b,c,d}.tiles.maps.sputnik.ru/tiles/kmt2/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('kosmosnimki-map', 'Kosmosnimki (OSM)', function () {
        return new OpenLayers.Layer.OSM('Kosmosnimki (OSM)', switch_url("http://{switch:a,b,c,d}.tile.osm.kosmosnimki.ru/kosmo/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('kosmosnimki-night', 'Kosmosnimki night (OSM)', function () {
        return new OpenLayers.Layer.OSM('Kosmosnimki (OSM)', switch_url("http://{switch:a,b,c,d}.tile.osm.kosmosnimki.ru/night/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('chepetsk-map', 'Chepetsk map', function () {
        return new OpenLayers.Layer.OSM('Chepetsk map', switch_url("http://ingreelab.net/C04AF0B62BEC112E8D7242FB848631D12D252728/${z}/${x}/${y}.png"), layer_options);
    }),


    new LayerType('opensnowmap', 'OSM OpenSnowMap', function () {
        return new OpenLayers.Layer.OSM('OSM OpenSnowMap', switch_url("http://www.opensnowmap.org/opensnowmap-overlay/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('sigma-cycle', 'Sigma Cycle (OSM)', function () {
        return new OpenLayers.Layer.OSM('OSM Sigma Cycle', switch_url("http://tiles1.sigma-dc-control.com/layer5/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('sigma-topo', 'Sigma Topo (OSM)', function () {
        return new OpenLayers.Layer.OSM('OSM Sigma Topo', switch_url("http://tiles1.sigma-dc-control.com/layer8/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('basemap-standard', 'Basemap.at Standard', function () {
        return new OpenLayers.Layer.WMTS({
            name: "basemap.at",
            url: "https://maps1.wien.gv.at/basemap/geolandbasemap/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png",
            layer: "geolandbasemap",
            matrixSet: "google3857",
            requestEncoding: "REST",
            style: "normal",
            numZoomLevels: 21,
            isBaseLayer: true
        });
    }),

    new LayerType('basemap-retina', 'Basemap.at Retina', function () {
        return new OpenLayers.Layer.WMTS({
            name: "basemap.at",
            url: "https://maps2.wien.gv.at/basemap/bmaphidpi/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg",
            layer: "bmaphidpi",
            matrixSet: "google3857",
            requestEncoding: "REST",
            style: "normal",
            numZoomLevels: 20,
            isBaseLayer: true
        });
    }),

    new LayerType('basemap-grey', 'Basemap.at Grey', function () {
        return new OpenLayers.Layer.WMTS({
            name: "basemap.at",
            url: "https://maps3.wien.gv.at/basemap/bmapgrau/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.png",
            layer: "bmapgrau",
            matrixSet: "google3857",
            requestEncoding: "REST",
            style: "normal",
            numZoomLevels: 20,
            isBaseLayer: true
        });
    }),

    new LayerType('basemap-sat', 'Basemap.at Satellite', function () {
        return new OpenLayers.Layer.WMTS({
            name: "basemap.at",
            url: "https://maps4.wien.gv.at/basemap/bmaporthofoto30cm/{Style}/{TileMatrixSet}/{TileMatrix}/{TileRow}/{TileCol}.jpeg",
            layer: "bmaporthofoto30cm",
            matrixSet: "google3857",
            requestEncoding: "REST",
            style: "normal",
            numZoomLevels: 21,
            isBaseLayer: true
        });
    }),


    // for compatibility, we use max-speed instead ito-max-speed
    new LayerType('max-speed', 'ITO Max Speed (OSM)', function () {
        return new OpenLayers.Layer.OSM('ITO Max Speed (OSM)', switch_url("http://t{switch:0,1,2,3}.beta.itoworld.com/124/baafeeae799c1dcc732ea30dd4ae5c97/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('ito-lit', 'ITO Lit (OSM)', function () {
        return new OpenLayers.Layer.OSM('ITO Lit (OSM)', switch_url("http://t{switch:0,1,2,3}.beta.itoworld.com/69/84f7729ed2e9b4c7e2aed58e8fb171fe/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('ito-surface', 'ITO Surface (OSM)', function () {
        return new OpenLayers.Layer.OSM('ITO Surface (OSM)', switch_url("http://t{switch:0,1,2,3}.beta.itoworld.com/215/3f91703263bfa5c9376e129ada11252b/${z}/${x}/${y}.png"), layer_options);
    }),


    new LayerType('yandex-map', "Yandex Maps", function () {
        return new OpenLayers.Layer.TMS("Yandex Maps", "", {
            maxExtent: YandexBounds,
            href: "https://vec02.maps.yandex.net/tiles?l=map&v=4.40",
            getURL: yandex_getTileURL,
            maxResolution: 156543.0339,
            isBaseLayer: true,
            projection: new OpenLayers.Projection("EPSG:900913"),
            numZoomLevels: 19
            // sphericalMercator: true,
            // units: 'm',
            // displayProjection: new OpenLayers.Projection("EPSG:4326"),
        });
    }),

    new LayerType('yandex-satellite', "Yandex Satellite", function () {
        return new OpenLayers.Layer.TMS("Yandex Satellite", "", {
            maxExtent: YandexBounds,
            maxResolution: 156543.0339,
            href: "https://sat01.maps.yandex.net/tiles?l=sat&v=1.35.0",
            getURL: yandex_getTileURL,
            isBaseLayer: true,
            projection: new OpenLayers.Projection("EPSG:900913"),
            numZoomLevels: 19
        });
    }),

    new LayerType('yandex-hybrid', "Yandex Hybrid", function () {
        return new OpenLayers.Layer.TMS("Yandex Hybrid", "", {
            href: "https://vec01.maps.yandex.net/tiles?l=skl",
            getURL: yandex_getTileURL,
            maxResolution: 156543.0339,
            maxExtent: YandexBounds,
            isBaseLayer: true,
            projection: new OpenLayers.Projection("EPSG:900913"),
            numZoomLevels: 19
        });
    }),

    // 1.. 4.maps.nlp.nokia.com/maptile/2.1/maptile/a2e328a0c5/<terrain.day>/3/2/2/256/png8?app_id=<id>&token=<id>
    new LayerType('nokia-map', 'HERE WeGo Map', function () {
        return new OpenLayers.Layer.Here('HERE WeGo Map', {
            type: 'normal.day',
            app_id: 'g7UuRR708Tsut4YSnDLy',
            tile_style_version: 'newest',
            token: 'fVzaDAdRK62zo3CuNcPtDg'
        })
    }),

    new LayerType('nokia-terrain', 'HERE WeGo Terrain', function () {
        return new OpenLayers.Layer.Here('HERE WeGo Terrain', {
            type: 'terrain.day',
            app_id: 'g7UuRR708Tsut4YSnDLy',
            tile_style_version: 'newest',
            token: 'fVzaDAdRK62zo3CuNcPtDg'
        })
    }),

    new LayerType('nokia-satellite', 'HERE WeGo Satellite', function () {
        return new OpenLayers.Layer.Here('HERE WeGo Satellite', {
            type: 'satellite.day',
            app_id: 'g7UuRR708Tsut4YSnDLy',
            tile_style_version: 'newest',
            token: 'fVzaDAdRK62zo3CuNcPtDg'
        })
    }),

    new LayerType('nokia-hybrid', 'HERE WeGo Hybrid', function () {
        return new OpenLayers.Layer.Here('HERE WeGo Hybrid', {
            type: 'hybrid.day',
            app_id: 'g7UuRR708Tsut4YSnDLy',
            tile_style_version: 'newest',
            token: 'fVzaDAdRK62zo3CuNcPtDg'
        })
    }),

    new LayerType('nokia-public_transit', 'HERE WeGo Public Transit', function () {
        return new OpenLayers.Layer.Here('HERE WeGo Public Transit', {
            type: 'normal.day.transit',
            app_id: 'g7UuRR708Tsut4YSnDLy',
            tile_style_version: 'newest',
            token: 'fVzaDAdRK62zo3CuNcPtDg'
        })
    }),

    new LayerType('nokia-traffic', 'HERE WeGo Traffic', function () {
        return new OpenLayers.Layer.Here('HERE WeGo Traffic', {
            type: 'newest/normal.day',
            app_id: 'g7UuRR708Tsut4YSnDLy',
            tile_style_version: 'newest',
            token: 'fVzaDAdRK62zo3CuNcPtDg'
        })
    }),

    new LayerType('baidu-map', 'Baidu Map', function () {
        return new OpenLayers.Layer.Baidu('Baidu Map', "standard", {
            scaler: 2
        })
    }),

    new LayerType('baidu-labels', 'Baidu Labels', function () {
        return new OpenLayers.Layer.Baidu('Baidu Labels', "labels");
    }),

    new LayerType('baidu-satellite', 'Baidu Satellite', function () {
        return new OpenLayers.Layer.Baidu('Baidu Satellite', "satellite");
    }),


/* down
    new LayerType('soviet-military', 'Soviet Military Topo', function () {
        return new OpenLayers.Layer.WMS("Soviet Military Topo", "http://www.topomapper.com/cgi-bin/tilecache-2.11b/tilecache.py", {
            layers: "topomapper_gmerc",
            format: 'image/jpeg'
        }, {
            'buffer': 1,
            'srs': 'EPSG:900913',
            'numZoomLevels': 14,
            wrapDateLine: true,
            transparent: false,
            'attribution': 'Map data hosted by <a href="http://www.atlogis.com/">Atlogis</a>'
        });
    }),
    */

    new LayerType('adfc-radwege', 'ADFC Radwegenetz', function () {
        return new OpenLayers.Layer.OSM('ADFC Radwegenetz', "", {
            tileOptions: {
                crossOriginKeyword: null
            },
            type: 'png',
            getURL: get_mm_bikeTracks
        });
    }),

    new LayerType('max-speed-old', 'Max Speed', function () {
        return new OpenLayers.Layer.XYZ("Max Speed", "http://wince.dentro.info/koord/osm/tiles/${z}/${x}/${y}.png", {
            sphericalMercator: true,
            numZoomLevels: 15
        });
    }),

    new LayerType('map1eu', 'map1eu (OSM)', function () {
        return new OpenLayers.Layer.OSM("map1eu (OSM)", ["http://alpha.map1.eu/tiles/${z}/${x}/${y}.jpg"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 18
        })
    }),

    new LayerType('waymarkedtrails-hiking', 'OSM Trails Hiking', function () {
        return new OpenLayers.Layer.OSM("OSM Hiking Waymarkedtrails", ["http://tile.waymarkedtrails.org/hiking/${z}/${x}/${y}.png"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 18
        })
    }),

    new LayerType('waymarkedtrails-cycling', 'OSM Trails Cycling', function () {
        return new OpenLayers.Layer.OSM("OSM Cycling Waymarkedtrails", ["http://tile.waymarkedtrails.org/cycling/${z}/${x}/${y}.png"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 18
        })
    }),

    new LayerType('waymarkedtrails-mtb', 'OSM Trails MTB', function () {
        return new OpenLayers.Layer.OSM("OSM MTB Waymarkedtrails", ["http://tile.waymarkedtrails.org/mtb/${z}/${x}/${y}.png"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 18
        })
    }),

    new LayerType('waymarkedtrails-skating', 'OSM Trails Skating', function () {
        return new OpenLayers.Layer.OSM("OSM Skating Waymarkedtrails", ["http://tile.waymarkedtrails.org/skating/${z}/${x}/${y}.png"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 18
        })
    }),

    new LayerType('relief', 'Relief SRTM', function () {
        return new OpenLayers.Layer.OSM("Relief SRTM", ["http://maps-for-free.com/layer/relief/z${z}/row${y}/${z}_${x}-${y}.jpg"], {
            tileOptions: {
                crossOriginKeyword: null
            },
            numZoomLevels: 12
        })
    }),

    new LayerType('lgb-webatlas', 'LGB Brandenburg Webatlas', function () {
        return new OpenLayers.Layer.OSM('LGB Brandenburg Webatlas', "", {
            tileOptions: {
                crossOriginKeyword: null
            },
            type: 'png',
            href: 'http://isk.geobasis-bb.de/mapproxy',
            layer_dir: 'bebb-webatlasde',
            layers: 'WebAtlasDE_BEBB_halbton',
            srs: 'EPSG%3A4326',
            getURL: lgb_getTileURL
        });
    }),

    new LayerType('lgb-topo-10', 'LGB Brandenburg Topo 10', function () {
        return new OpenLayers.Layer.OSM('LGB Brandenburg Topo 10', "", {
            tileOptions: {
                crossOriginKeyword: null
            },
            type: 'png',
            href: 'http://isk.geobasis-bb.de/mapproxy',
            layer_dir: 'dtk10',
            layers: 'dtk10',
            srs: 'EPSG%3A4326',
            getURL: lgb_getTileURL
        });
    }),

    new LayerType('lgb-topo-50', 'LGB Brandenburg Topo 50', function () {
        return new OpenLayers.Layer.OSM('LGB Brandenburg Topo 50', "", {
            tileOptions: {
                crossOriginKeyword: null
            },
            type: 'png',
            href: 'http://isk.geobasis-bb.de/mapproxy',
            layer_dir: 'dtk50',
            layers: 'dtk50',
            srs: 'EPSG%3A4326',
            getURL: lgb_getTileURL
        });
    }),

    new LayerType('lgb-plz', 'LGB Brandenburg PLZ', function () {
        return new OpenLayers.Layer.OSM('LGB Brandenburg PLZ', "", {
            tileOptions: {
                crossOriginKeyword: null
            },
            type: 'png',
            href: 'http://isk.geobasis-bb.de/ows/dnmvg.php',
            layer_dir: '',
            layers: 'plz',
            srs: 'EPSG%3A4326',
            width: 1024,
            height: 1024,
            getURL: lgb_getTileURL
        });
    }),

    new LayerType('lgb-administrative-boundaries', 'LGB Brandenburg Admin. B.', function () {
        return new OpenLayers.Layer.OSM('LGB Brandenburg Admin. Boundaries', "", {
            tileOptions: {
                crossOriginKeyword: null
            },
            type: 'png',
            href: 'http://isk.geobasis-bb.de/ows/dnmvg.php',
            layer_dir: '',
            layers: 'vgrz',
            srs: 'EPSG%3A4326',
            width: 1024,
            height: 1024,
            getURL: lgb_getTileURL
        });
    }),

    new LayerType('lgb-satellite-color', 'LGB Brandenburg Satellite Color', function () {
        return new OpenLayers.Layer.OSM('LGB Brandenburg Satellite Color', "", {
            tileOptions: {
                crossOriginKeyword: null
            },
            type: 'jpeg',
            href: 'http://isk.geobasis-bb.de/mapproxy',
            layer_dir: 'dop20',
            layers: 'dop20c',
            srs: 'EPSG%3A4326',
            getURL: lgb_getTileURL
        });
    }),

    new LayerType('lgb-satellite-infrared', 'LGB Brandenburg Satellite Infrared', function () {
        return new OpenLayers.Layer.OSM('LGB Brandenburg Satellite Infrared', "", {
            tileOptions: {
                crossOriginKeyword: null
            },
            type: 'jpeg',
            href: 'http://isk.geobasis-bb.de/mapproxy',
            layer_dir: 'dop20',
            layers: 'dop20cir',
            srs: 'EPSG%3A4326',
            getURL: lgb_getTileURL
        });
    }),

    new LayerType('lgb-satellite-grey', 'LGB Brandenburg Satellite Grey', function () {
        return new OpenLayers.Layer.OSM('LGB Brandenburg Satellite Grey', "", {
            tileOptions: {
                crossOriginKeyword: null
            },
            type: 'jpeg',
            href: 'http://isk.geobasis-bb.de/mapproxy',
            layer_dir: 'dop20',
            layers: 'dop20g',
            srs: 'EPSG%3A4326',
            getURL: lgb_getTileURL
        });
    }),

    new LayerType('lgb-history-1902', 'LGB Brandenburg 1902', function () {
        return new OpenLayers.Layer.OSM('LGB Brandenburg 1902', "", {
            tileOptions: {
                crossOriginKeyword: null
            },
            type: 'png',
            href: 'http://isk.geobasis-bb.de/mapproxy',
            layer_dir: 'dr25',
            layers: 'dr25',
            srs: 'EPSG%3A4326',
            getURL: lgb_getTileURL
        });
    }),

    new LayerType('lgb-history-1767', 'LGB Brandenburg 1767', function () {
        return new OpenLayers.Layer.OSM('LGB Brandenburg 1767', "", {
            tileOptions: {
                crossOriginKeyword: null
            },
            type: 'png',
            href: 'http://isk.geobasis-bb.de/mapproxy',
            layer_dir: 'schmettau',
            layers: 'schmettau',
            srs: 'EPSG%3A4326',
            getURL: lgb_getTileURL
        });
    }),

    // Bing coverage overlays
    new LayerType('bing-coverage-sat', 'BingCoverage Sat', function () {
        return new OpenLayers.Layer.OSM('BingCoverage', "http://ant.dev.openstreetmap.org/bingimageanalyzer/tile.php/${z}/${x}/${y}.png", layer_options);
    }),

    new LayerType('bing-coverage-date', 'BingCoverage Date', function () {
        return new OpenLayers.Layer.OSM('BingCoverage Date', "http://bingcoverage.org/dates.php?z=${z}&x=${x}&y=${y}", layer_options);
    }),


    new LayerType('geoiq-terrain', 'GeoIQ Terrain', function () {
        return new OpenLayers.Layer.OSM("GeoIQ Terrain", switch_url("http://{switch:a,b,c}.acetate.geoiq.com/tiles/terrain/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('geoiq-acetate-base', 'GeoIQ Base', function () {
        return new OpenLayers.Layer.OSM("GeoIQ Base", switch_url("http://{switch:a,b,c}.acetate.geoiq.com/tiles/acetate-base/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('geoiq-acetate-hillshading', 'GeoIQ Hillshading', function () {
        return new OpenLayers.Layer.OSM("GeoIQ Hillshading", switch_url("http://{switch:a,b,c}.acetate.geoiq.com/tiles/acetate-hillshading/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('geoiq-acetate-fg', 'GeoIQ Roads/Labels', function () {
        return new OpenLayers.Layer.OSM("GeoIQ Roads/Labels", switch_url("http://{switch:a,b,c}.acetate.geoiq.com/tiles/acetate-fg/${z}/${x}/${y}.png"), layer_options);
    }),

    new LayerType('viamichelin-map', 'Michelin Map', function () {
        return new OpenLayers.Layer.OSM("Michelin Map", switch_url("http://map{switch:1,2,3}.viamichelin.com/map/mapdirect?map=viamichelin&z=${z}&x=${x}&y=${y}&format=png&version=201503191157&layer=background"), layer_options);
    }),

    new LayerType('viamichelin-light', 'Michelin Simplified', function () {
        return new OpenLayers.Layer.OSM("Michelin Simplified", switch_url("http://map{switch:1,2,3}.viamichelin.com/map/mapdirect?map=light&z=${z}&x=${x}&y=${y}&format=png&version=201503191157&layer=background"), layer_options);
    }),

    new LayerType('viamichelin-hybrid', 'Michelin Labels', function () {
        return new OpenLayers.Layer.OSM("Michelin Labels", switch_url("http://map{switch:1,2,3}.viamichelin.com/map/mapdirect?map=hybrid&z=${z}&x=${x}&y=${y}&format=png&version=201503191157&layer=network"), layer_options);
    }),


    new LayerType('osm-southeastasia', 'OSM SouthEastAsia', function () {
        return new OpenLayers.Layer.OSM('', switch_url('http://{switch:a,b,c,d}.tile.osm-tools.org/osm_then/${z}/${x}/${y}.png'), {
            numZoomLevels: 18
        });
    })

    // EOF padding
    ];

    // check if the google maps JavaScript libs were successfully loaded    
    if (typeof google === 'undefined') {
        console.warn("Error: could not load google JS libs, disable google maps");
    } else {
        var google_layertypes = google_layertypes();
        for (var i = 0; i < google_layertypes.length; i++) {
            state.layertypes.push(google_layertypes[i]);
        }
    }


    // overlay types, just a copy + isBaseLayer: false
    state.over_layertypes = [

    AddOverlay('bbbike-smoothness'), AddOverlay('bbbike-handicap'), AddOverlay('bbbike-cycle-routes'), AddOverlay('bbbike-cycleway'),

    AddOverlay('bbbike-green'), AddOverlay('bbbike-unlit'), AddOverlay('bbbike-unknown'),

    AddOverlay('adfc-radwege'), AddOverlay('public_transport_lines'), AddOverlay('osm-lights'),

    AddOverlay('max-speed'), AddOverlay('ito-lit'), AddOverlay('ito-surface'),

    AddOverlay('yandex-hybrid'), AddOverlay('mapbox-runkeepers'),

    AddOverlay('mapnik-german'), AddOverlay('toner'), AddOverlay('osm-no-labels'),

    AddOverlay('mapquest-satellite'), AddOverlay('nokia-satellite'), AddOverlay('bing-satellite'),

    AddOverlay('nokia-map'), AddOverlay('bing-map'), AddOverlay('esri-topo'), AddOverlay('aster-gdem-srtm-hillshade'),

    AddOverlay('waymarkedtrails-hiking'), AddOverlay('waymarkedtrails-cycling'), AddOverlay('waymarkedtrails-mtb'),

    AddOverlay('waymarkedtrails-skating'), AddOverlay('osm-administrative-boundaries'), AddOverlay('osm-gps'),

    AddOverlay('opensnowmap'), AddOverlay('openrailwaymap-standard'), AddOverlay('openrailwaymap-maxspeed'),

    AddOverlay('lgb-administrative-boundaries'), AddOverlay('lgb-plz'), AddOverlay('openmap-public-transport'),

    AddOverlay('bing-coverage-sat'), AddOverlay('bing-coverage-date'),

    AddOverlay('basemap-retina')

/*
    new OverLayerType('ol_parktrans', 'Parking', function () {
        return new OpenLayers.Layer.OSM.Toolserver("Parking", 'parktrans', {
            opacity: 1,
            numZoomLevels: 16
        });
    }),

    new OverLayerType('ol_powermap', 'Power Map', function () {
        return new OpenLayers.Layer.OSM.Toolserver("Power Map", 'powermap', {
            opacity: 1,
            numZoomLevels: 13
        });
    })
    */

    ];

    reorderMaps("layertypes", mc.sort);
    reorderMaps("over_layertypes", mc.sort_overlay);
    getOrderOfPrefMaps();
}

/* http://xbb.uz/openlayers/i-Yandex.Maps
*/
function yandex_getTileURL(bounds) {
    var r = this.map.getResolution();
    var maxExt = (this.maxExtent) ? this.maxExtent : state.YandexBounds;
    // var maxExt = state.YandexBounds;
    // maxExt = new OpenLayers.Bounds();
    var w = (this.tileSize) ? this.tileSize.w : 256;
    var h = (this.tileSize) ? this.tileSize.h : 256;
    var x = Math.round((bounds.left - maxExt.left) / (r * w));
    var y = Math.round((maxExt.top - bounds.top) / (r * h));
    var z = this.map.getZoom();
    var lim = Math.pow(2, z);
    if (y < 0 >= lim) {
        return OpenLayers.Util.getImagesLocation() + "404.png";
    } else {
        x = ((x % lim) + lim) % lim;
        // var url = (this.url) ? this.url : "https://vec02.maps.yandex.net/tiles?l=map&v=2.2.3";
        var url = (this.href) ? this.href : "https://sat01.maps.yandex.net/tiles?l=sat&v=1.35.0";
        return url + "&x=" + x + "&y=" + y + "&z=" + z;
    }
}

function bvg_getTileURL(bounds) {
    var r = this.map.getResolution();
    var maxExt = (this.maxExtent) ? this.maxExtent : state.YandexBounds;

    var w = (this.tileSize) ? this.tileSize.w : 256;
    var h = (this.tileSize) ? this.tileSize.h : 256;
    var x = Math.round((bounds.left - maxExt.left) / (r * w));
    var y = Math.round((maxExt.top - bounds.top) / (r * h));
    var z = this.map.getZoom();
    var lim = Math.pow(2, z);
    var url = (this.href) ? this.href : "/tiles/";

    // scary, isn't it???
    y = (1 << z) - y - 1;
    return url + z + "/" + x + "/" + y + ".png";
}

function initYandex() {
    var YandexBounds = new OpenLayers.Bounds(-20037508, -20002151, 20037508, 20072865);
    state.YandexBounds = YandexBounds;
}

// http://isk.geobasis-bb.de/mapproxy/bebb-webatlasde/service/wms?LAYERS=WebAtlasDE_BEBB_halbton&FORMAT=image%2Fpng&BGCOLOR=0xFFFFFF&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=&SRS=EPSG%3A25833&BBOX=383990.81444778,5868434.0867246,410081.30601358,5894524.5782904&WIDTH=256&HEIGHT=256

function lgb_getTileURL(bounds) {
    var llbounds = new OpenLayers.Bounds();
    llbounds.extend(OpenLayers.Layer.SphericalMercator.inverseMercator(bounds.left, bounds.bottom));
    llbounds.extend(OpenLayers.Layer.SphericalMercator.inverseMercator(bounds.right, bounds.top));

    var url = this.href;
    if (this.layer_dir) {
        url += '/' + this.layer_dir + "/service/wms";
    }

    var width = this.width ? this.width : 256;
    var height = this.height ? this.height : 256;
    var srs = this.srs || 'EPSG%3A4326'
    var type = this.type || 'png';

    url += '?LAYERS=' + this.layers;
    url += '&FORMAT=image%2F' + type + '&BGCOLOR=0xFFFFFF&SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&STYLES=';
    url += '&SRS=' + srs;
    url += '&BBOX=' + llbounds.toBBOX() + "&WIDTH=" + width + " &HEIGHT=" + height;

    return url
}

function get_mm_bikeTracks(bounds) {
    var llbounds, url;

    llbounds = new OpenLayers.Bounds();
    // llbounds.extend(OpenLayers.Layer.SphericalMercator.inverseMercator(bounds.left, bounds.bottom));
    // llbounds.extend(OpenLayers.Layer.SphericalMercator.inverseMercator(bounds.right, bounds.top));
    llbounds.extend(bounds.left, bounds.bottom);
    llbounds.extend(bounds.right, bounds.top);
    url = "http://mm-lbserver.dnsalias.com/wms/wms.php?REQUEST=GetMap&SERVICE=WMS&VERSION=1.1.1&LAYERS=MM_SEGMENT&STYLES=&FORMAT=image/gif&BGCOLOR=0xFFFFFF&TRANSPARENT=TRUE&SRS=EPSG:4326&BBOX="
    url = url + llbounds.toBBOX() + "&WIDTH=256&HEIGHT=256"

    return url
}


function initMarker(n) {
    state.markersLayer[n] = new OpenLayers.Layer.Markers("Marker");
    state.maps[n].addLayer(state.markersLayer[n]);
    state.marker[n] = new OpenLayers.Marker(state.maps[n].getCenter(), new OpenLayers.Icon('img/cross.png', new OpenLayers.Size(20, 20), new OpenLayers.Pixel(-10, -10)));
    state.markersLayer[n].setVisibility(false);
    state.markersLayer[n].addMarker(state.marker[n]);
}

/*
 * We set the marker in the middle of the map. If the marker moved, we
 * will later re-set the middle to the marker again.
 *
 */
function set_popup(obj) {
    if (!obj) return;

    var map = state.maps[0];
    var message = obj.message || "marker";
    var pos = new OpenLayers.LonLat(obj.lon, obj.lat).transform(state.proj4326, map.getProjectionObject());
    debug("set marker: " + obj.lon + "," + obj.lat);


    var message_p = "";
    if (mc.search.marker_permalink) {
        // message_p += '<p/><div><a href="' + $("#permalink").attr("href") + '&marker=' + message + '">permalink</a></div>';
        message_p += '<p/><div><a class="share_link" onclick="click_share_link(' + obj.lon + ',' + obj.lat + ')">share</a></div>';
    }

    // A popup with some information about our location
    var popup = new OpenLayers.Popup.FramedCloud("Popup", pos, null, // new OpenLayers.Size(50,50), // null,
    "<span id='mc_popup'>" + message + "</span>" + message_p, null, true // <-- true if we want a close (X) button, false otherwise
    );

    // limit popup width and height
    popup.maxSize = new OpenLayers.Size(420, 360)
    debug("max popup size: " + popup.maxSize);

    // remove old popups from search clicks
    if (state.popup) {
        map.removePopup(state.popup);
    }

    map.addPopup(popup);

    // keep values for further usage (delete, position)
    state.popup = popup;
    state.marker_message = message;
}

function click_share_link(lon, lat) {
    if (lat && lon) {
        map.setCenter(new OpenLayers.LonLat(lon, lat).transform(state.proj4326, map.getProjectionObject()));
    }

    debug("marker click feature");

    // close existing helper windows
    $('.dialog-close').trigger({
        type: 'click'
    });

    $("#tools-sharetrigger").trigger({
        type: 'click'
    });
}

function share_marker(pos) {
    var proj4326 = new OpenLayers.Projection('EPSG:4326');

    // remove old marker
    if (state.marker_vectors) {
        map.removeLayer(state.marker_vectors);
    }

    var vectors = new OpenLayers.Layer.Vector("Vector Layer", {
        styleMap: new OpenLayers.StyleMap({
            externalGraphic: "img/marker-blue.png",
            graphicXOffset: -12,
            graphicYOffset: -39,
            graphicWidth: 25,
            graphicHeight: 41,
            graphicName: "cross"
            // pointRadius: 24
        })
    });

    state.marker_vectors = vectors;
    map.addLayer(vectors);

    var marker = new OpenLayers.Control.DragFeature(vectors, {
        onComplete: function (feature, pixel) {
            var point = new OpenLayers.Geometry.Point(feature.geometry.x, feature.geometry.y).transform(map.getProjectionObject(), proj4326);
            debug("marker on complete feature: " + point);
            debug("marker on complete mouse pixel: " + pixel + " " + map.getLonLatFromViewPortPx(pixel).transform(map.getProjectionObject(), proj4326));

            setTimeout(function () {
                click_share_link(point.x, point.y);
            }, 300);
        }
    });

    map.addControl(marker);
    marker.activate();

    // remove popup cloud marker if exists before setting a new marker
    if (state.popup) {
        pos = state.popup.lonlat.transform(map.getProjectionObject(), proj4326);

        debug("delete old popup, new pos: " + pos);
        map.removePopup(state.popup);
        delete state.popup;

        // re-center new marker
        map.setCenter(new OpenLayers.LonLat(pos.lon, pos.lat).transform(proj4326, map.getProjectionObject()));
        // state.marker_message = "";
        updatePermalink();
    }

    // var point = new OpenLayers.Geometry.Point(pos.lon, pos.lat).transform(proj4326, map.getProjectionObject());
    var point = new OpenLayers.Geometry.Point(pos.lon, pos.lat).transform(proj4326, map.getProjectionObject());
    vectors.addFeatures(new OpenLayers.Feature.Vector(point));
}

function setVisibilityWrapper(layer, value) {
    if (layer) {
        layer.setVisibility(value);
    } else {
        // to slow, wait some seconds
        setTimeout(function () {
            if (layer) layer.setVisibility(value);
        }, 2000);
    }
}

function moveStart() {
    state.movestarted = true;
    for (var i = 0; i < mc.NumberOfMaps; i++) {
        setVisibilityWrapper(state.markersLayer[i], false);
    }
    return (false);
}

function moveEnd() {
    if (state.moving) {
        return;
    }

    state.moving = true;
    for (var i = 0; i < mc.NumberOfMaps; i++) {
        if (i != this && state.maps[i]) {
            state.maps[i].setCenter(
            state.maps[this].getCenter().clone().transform(state.maps[this].getProjectionObject(), state.maps[i].getProjectionObject()), state.maps[this].getZoom());
        }
        setVisibilityWrapper(state.markersLayer[i], true);
    }

    state.moving = false;
    updatePermalink();
    state.movestarted = false;
    // state.markersLayer[1-this].setVisibility(true);
    return false;
}

function mouseMove(evt) {
    for (var i = 0; i < mc.NumberOfMaps; i++) {
        if (i != this && state.marker[i]) {
            state.marker[i].moveTo(state.maps[this].getLayerPxFromViewPortPx(evt.xy));
        }
    }
    return (false);
}

function mouseOver(evt) {
    if (!state.movestarted) {
        for (var i = 0; i < mc.NumberOfMaps; i++) {
            if (i != this) {
                setVisibilityWrapper(state.markersLayer[i], true);
            }
        }
    }

    $('#customMousePosition').show();
    $('#customMousePosition').removeClass("mouseOut").addClass("mouseIn");
    $('#customZoomLevel').removeClass("mouseOut").addClass("mouseIn");

    return false;
}

function mouseOut(evt) {
    for (var i = 0; i < mc.NumberOfMaps; i++) {
        setVisibilityWrapper(state.markersLayer[i], false);
    }

    // $('#customMousePosition').hide();
    $('#customMousePosition').removeClass("mouseIn").addClass("mouseOut");
    $('#customZoomLevel').removeClass("mouseIn").addClass("mouseOut");

    return false;
}

// http://www.brain4.de/programmierecke/js/arraySort.php

function sortLayerByName(array) {}

function initSelectOptions(n, type) {
    var sw = $('#sw' + n);
    if (!sw || sw.length == 0) return;

    var optgroup;
    var optgroup_label = "none";

    // cleanup everything in <select> first
    sw.empty();

    for (var i = 0; i < state.layertypes.length; i++) {
        var l = state.layertypes[i];

/* We put the maps into groups, by prefix
         * e.g. "OSM Mapnik" => "OSM" >> "OSM Mapnik"
         */
        var str = l.name.split(/\s+/);
        if (str.length > 0 && str[0] != optgroup_label) {
            debug("New optgroup label: " + str[0]);
            optgroup_label = str[0];

            optgroup = $("<optgroup/>");
            optgroup.attr("label", optgroup_label);
            sw.append(optgroup);
        }

        var opt = $("<option/>");
        opt.attr("value", l.type);
        opt.text(l.name);
        // opt.css("padding", "1px");
        if (l.type == type) {
            opt.attr("selected", "selected");
        }

        optgroup.append(opt);
    }
    sw.bind('change', n, changeLayer);
}

function initSelectOptionsOverlay(n, type) {
    var sw = $('#sw' + n);
    if (!sw || sw.length == 0) return;
    if (!type) type = "none";

    var optgroup;
    var optgroup_label = "none";

    // cleanup everything in <select> first
    sw.empty();
    sw.append('<optgroup label="None"><option value="none">None</option></optgroup>');

    for (var i = 0; i < state.over_layertypes.length; i++) {
        var l = state.over_layertypes[i];

        if (!l.name) {
            debug("Error: unknknown overlay layer: " + l.error)
            continue;
        }

/* We put the maps into groups, by prefix
         * e.g. "OSM Mapnik" => "OSM" >> "OSM Mapnik"
         */
        var str = l.name.split(/\s+/);
        if (str.length > 0 && str[0] != optgroup_label) {
            debug("New optgroup label: " + str[0]);
            optgroup_label = str[0];

            optgroup = $("<optgroup/>");
            optgroup.attr("label", optgroup_label);
            sw.append(optgroup);
        }

        // XXX: IE8
        if (!l) {
            debug("WARNING: unknown overlay config: " + i + " after: " + state.over_layertypes[i - 1].type);
            continue;
        }

        var opt = $("<option/>");
        opt.attr("value", l.type);
        opt.text(l.name);
        // opt.css("padding", "1px");
        if (l.type == type) {
            opt.attr("selected", "selected");
        }

        optgroup.append(opt);
    }

    sw.bind('change', n, changeOverLayer);
    state.over_layers[0] = type;

    if (type == "none") {
        showTransparentMenu(false);
    } else {
        changeOverLayer(null, type);
    }
}

function showTransparentMenu(flag, n) {
    if (!n) n = -2;
    var sw = mc.overlay.type == "select" ? $('#sw' + n) : $('#slider_box');
    if (!sw) return;

    flag ? sw.show() : sw.hide();
}

function initSelectOptionsTransparent(n, percent) {
    var sw = $('#sw' + n);
    if (!sw) return;
    if (typeof percent === 'undefined') percent = state.percent;

    if (!mc.overlay.enabled) return;

    var step = mc.overlay.select_step;

    for (var i = 0, j = 1; i <= 100; i += step, j++) {
        var opt = document.createElement('option');
        opt.value = i;
        opt.text = i + "%"
        opt.style.padding = '1px';
        if (i == percent) {
            opt.selected = true;
        }
        sw[0].options[j] = opt;
    }

    sw.bind('change', n, changeTransparent);
    state.percent = percent;

    return state.percent;
}

function initSliderTransparent(n, percent) {
    var sw = $('#slider_box');

    if (!sw) return;

    if (typeof percent === 'undefined') percent = state.percent;

    if (!mc.overlay.enabled) return;

    var step = mc.overlay.slider_step;

    sw.slider({
        step: 5,
        value: percent,
        animate: "fast",
        slide: function (event, ui) {
            changeTransparent(null, ui.value);
        }

        /* ,change: function(event, ui) { changeTransparent(null, ui.value); } */
    });

    state.percent = percent;
}

function changeTransparent(event, _percent) {
    var percent = event ? event.target.value : _percent;
    var overlayer_name = state.over_layers[0];

    if (overlayer_name == "none" || overlayer_name == "") return state.percent;

    debug("percent: " + percent);
    // default opacity
    if (percent == "" || percent < 0) {
        // reset layer
        if (percent != -2) // called from changeOverLayer
        changeOverLayer(null, overlayer_name);

        // select "default" in menu
        var sw = $('#sw' + "-2");
        if (sw && sw[0] && sw[0].options) sw[0].options[0].selected = true;

        debug("nothing to change: " + overlayer_name + " " + percent);
        return state.percent;
    }

    if (percent < 0 || percent > 100) {
        debug("percent out of range: " + percent + ", reset to 50");
        percent = 50;
    }
    state.percent = percent;

    debug("set transparent percentage to: " + percent);

    for (var n = 0; n < mc.NumberOfMaps; n++) {
        if (state.over_layers_obj[n]) {
            state.over_layers_obj[n].setOpacity(percent / 100);
        }
    }

    updatePermalink();
    return state.percent;
}

// make the column visible

function initColumn(n, display) {
    if (!display) {
        display = "table-cell";
    }
    var column = $('#column' + n);
    column.css("display", display);
}

// set the column width depending on the number of maps

function initColumnWidth(n) {
    var number;
    if (n <= 3) { // one row
        number = n;
    } else if (n <= mc.row3) { // second row
        number = Math.ceil(n / 2);
    } else if (n <= mc.row4) { // 3rd row
        number = Math.ceil(n / 3);
    } else if (n <= mc.row5) { // 4rd row
        number = Math.ceil(n / 4);
    } else { // 5rd row
        number = Math.ceil(n / 5);
    }

    var width = Math.floor(100 / number) + "%";
    $('td.maps').css("width", width);
}

function setStartPos(n, lonlat, zoom) {
    var center = lonlat.clone();
    center.transform(state.proj4326, state.maps[n].getProjectionObject());

    // adjust for maps with lower zoom levels
    var z = state.maps[n].getNumZoomLevels(zoom) - 1;
    if (z < zoom) zoom = z;

    state.maps[n].setCenter(center, zoom);
}

function updatePermalink() {
    var url = getPermalink(mc.NumberOfMaps);
    var permalink = $('#permalink');
    if (!permalink || permalink.length == 0) {
        return;
    }

    permalink[0].href = url;
    $('#customZoomLevel').html('zoom=' + state.maps[0].getZoom());

    updateExtractlink();

    return url;
}


function getPermalink(NumberOfMaps) {
    var pos = getPosition();

    // full base URL, without parameters
    var base = window.location.href;
    if (base.indexOf("?") != -1) {
        base = base.substring(0, base.indexOf("?"));
    }

    // bbbike.org/mc/#map=5/51.509/-5.603
    if (base.indexOf("#") != -1) {
        debug("cleanup '#' in url: " + base);
        base = base.substring(0, base.indexOf("#"));
    }

    var url = base + '?lon=' + pos.lon + '&lat=' + pos.lat + '&zoom=' + pos.zoom + "&num=" + NumberOfMaps;
    for (var i = 0; i < mc.NumberOfMapsMax; i++) {
        if (state.layers[i]) {
            url += "&mt" + i + "=" + state.layers[i].type;
        }
    }

    if (state.over_layers[0] && state.over_layers[0] != 'none') {
        url += "&mt-1" + "=" + state.over_layers[0];
        url += "&mt-1p" + "=" + state.percent;
    }
    if (state.fullscreen) url += "&fullscreen=1";
    if (state.marker_message) url += "&marker=" + encodeURI(state.marker_message);

    return url;
}

function updateExtractlink() {
    var extractlink = $('#extractlink');

    if (!extractlink || extractlink.length == 0) {
        debug("No extract link found, ignored");
        return "";
    }

    var url = extractlink.attr("href");
    extractlink.attr("href", getExtractlink(url));

    return url;
}

function getExtractlink(href) {
    var box = map.getExtent();
    var pos = box.transform(map.getProjectionObject(), state.proj4326)

    // full base URL, without parameters
    var base = href;
    if (base.indexOf("?") != -1) {
        base = base.substring(0, base.indexOf("?"));
    }

    // bbbike.org/mc/#map=5/51.509/-5.603
    if (base.indexOf("#") != -1) {
        debug("cleanup '#' in url: " + base);
        base = base.substring(0, base.indexOf("#"));
    }

    var url = base + '?sw_lng=' + pos.left + '&sw_lat=' + pos.bottom + '&ne_lng=' + pos.right + '&ne_lat=' + pos.top + "&source=mc";

    return url;
}

function updateNumberOfMapsLink(NumberOfMapsMax, NumberOfMaps, NumberOfMapsLinks) {
    var message = "number of maps: <span id='nom_links'>";
    var pl_class = "";

    for (var i = 1; i <= NumberOfMapsMax; i++) {
        // don't show all links, only the important ones
        if (ignoreLink(NumberOfMapsMax, NumberOfMaps, NumberOfMapsLinks, i)) {
            continue;
        }

        if (i > 1) {
            message += " ";
        }
        if (i == NumberOfMaps) {
            message += i;
        } else {
            pl_class = i > 12 && i != NumberOfMapsMax ? 'pl_small' : 'pl_normal';
            message += "<a href='#' class='" + pl_class + "' onclick='this.href=getPermalink(" + i + ");'>" + i + '</a>';
        }
    }
    message += '</span>';

    $('#NumberOfMaps').html(message);
}

function ignoreLink(NumberOfMapsMax, NumberOfMaps, NumberOfMapsLinks, i) {
    // show only the first 8 links if there are less than 8 maps
    // on the map
    if (NumberOfMapsLinks && (NumberOfMaps < NumberOfMapsLinks) && i > NumberOfMapsLinks) return 1;

    // ignore odd small number links
    if (i == 5 || i == 7) return 1;

    // always show the last link
    if (NumberOfMapsMax == i) return 0;

    if (i > NumberOfMapsLinks && i <= mc.row3 && i % 2 == 1) return 1;

    if (i > NumberOfMapsLinks && i > mc.row3 && i <= mc.row4 && i % 3 != 0) return 1;

    if (i > NumberOfMapsLinks && i > mc.row4 && i <= mc.row5 && i % 4 != 0) return 1;

    if (i > NumberOfMapsLinks && i > mc.row5 && i % 10 != 0) return 1;

    // for more than 60 maps: step is 20
    if (i > 60 && i % 20 != 0) return 1;

    return 0;
}

function LayerType(type, name, create) {
    this.type = type;
    this.name = name;
    this.create = create;

    if (state.layertypes_hash[type]) {
        debug("Warning: override map type '" + type + "'")
    }
    state.layertypes_hash[type] = this;
}

function OverLayerType(type, name, create) {
    this.type = type;
    this.name = name;
    this.create = create;

    state.over_layertypes_hash[type] = this;
}

// add an existing map to overlay menu

function AddOverlay(type) {
    var obj = state.layertypes_hash[type];

    if (obj && obj.type) {
        return new OverLayerType("ol_" + obj.type, obj.name, obj.create);
    } else {
        debug("Error unknown map type: " + type, " cannot create overlay");
        return {
            error: type
        };
    }
}


function MapLayer(layertype) {
    var layertype_default = "mapnik";

    debug("MapLayer: " + layertype);
    var lt = state.layertypes_hash[layertype];
    if (!lt) {
        debug("unknown layer type: '" + layertype + "', fall back to " + layertype_default);
        lt = state.layertypes_hash[layertype_default];

        // XXX: give up!
        if (!lt) return {};
    }
    this.layer = lt;
    this.type = lt.type;
    this.name = lt.name;
    this.obj = lt.create();
}

// unfocus select box for key events on a map

function mc_unfocus() {
    var focus = $(':focus');
    if (focus.attr('id')) {
        focus.trigger("blur");
        debug("MapLayer focus is on form element: " + focus.attr('id') + ", unfocus with blur(), type:  " + document.activeElement);
    }
}

function newLayer(map, layertype) {
    state.layers[map] = new MapLayer(layertype);
    state.maps[map].addLayer(state.layers[map].obj);
}

function changeOverLayer(event, _name) {
    var name = event ? event.target.value : _name;
    debug(name);

    var oldLayerName = state.over_layers[0];
    debug("old overlayer name: " + oldLayerName);

    // remove old overlay layers
    for (var n = 0; n < mc.NumberOfMaps; n++) {
        var layers = state.maps[n].layers;
        if (state.over_layers_obj[n]) {
            state.maps[n].removeLayer(state.over_layers_obj[n]);
            delete state.over_layers_obj[n];
        }
    }

    // done
    if (name == "none") {
        showTransparentMenu(false);
        state.over_layers[0] = name;
        updatePermalink();
        return name;
    }

    for (var n = 0; n < mc.NumberOfMaps; n++) {
        if (!state.over_layertypes_hash[name]) {
            debug("unknown overlay name: '" + name + "'");
            continue;
        }

        var overlay = state.over_layertypes_hash[name].create();

        // by default all overlays are not a base layer
        overlay.isBaseLayer = false;

        debug("name: " + name + " n: " + n);
        state.maps[n].addLayer(overlay);
        state.over_layers_obj[n] = overlay;
    }

    state.over_layers[0] = name;
    updatePermalink();
    showTransparentMenu(true);

    // set opacity after an overlayer change
    // if (state.percent > 0) changeTransparent(null, -1);
    changeTransparent(null, state.percent);

    mc_unfocus();
    return name;
}

function changeLayer(event) {
    var map = event.data;
    var maps = state.maps;

    var oldproj = maps[map].getProjectionObject();
    var oldcenter = maps[map].getCenter().clone();
    var oldzoom = maps[map].getZoom();

    var newmap = event.target.value

    maps[map].removeLayer(maps[map].baseLayer);
    newLayer(map, newmap);

    try {
        state.layers[map].obj.setMapType();
    } catch (e) {
        // debug(e.error);
    }

    maps[map].setCenter(oldcenter.transform(oldproj, maps[map].getProjectionObject()), oldzoom);
    updatePermalink();

    mc_unfocus();
}

function osm_getTileURL(bounds) {
    var res = this.map.getResolution();
    var x = Math.round((bounds.left - this.maxExtent.left) / (res * this.tileSize.w));
    var y = Math.round((this.maxExtent.top - bounds.top) / (res * this.tileSize.h));
    var z = this.map.getZoom();
    var limit = Math.pow(2, z);

    if (y < 0 || y >= limit) {
        return OpenLayers.Util.getImagesLocation() + "404.png";
    } else {
        x = ((x % limit) + limit) % limit;
        return this.url + z + "/" + x + "/" + y + "." + this.type;
    }
}

function MapOrderHtml(NumberOfMaps) {
    var tr0 = $('tr#tr0');
    var tr1 = $('tr#tr1');
    var tr2 = $('tr#tr2');
    var tr3 = $('tr#tr3');
    var tr4 = $('tr#tr4');
    var data0 = "";
    var data1 = "";
    var data2 = "";
    var data3 = "";
    var data4 = "";

    debug("MapOrderHtml: " + NumberOfMaps);

    // for the first 3 maps use only one row
    if (NumberOfMaps <= 3) {
        for (var i = 0; i < NumberOfMaps; i++) {
            data0 += MapTD(i);
        }

        tr0.html(data0);
    }

    // for more than 3 maps, use 2 rows
    else if (NumberOfMaps <= mc.row3) {
        var half = Math.ceil(NumberOfMaps / 2);
        for (var i = 0; i < NumberOfMaps; i++) {
            if (i < half) {
                data0 += MapTD(i);
            } else {
                data1 += MapTD(i);
            }
        }

        tr0.html(data0);
        tr1.html(data1);
    }

    // for 11 and more maps, use 3 rows
    else if (NumberOfMaps <= mc.row4) {
        var half = Math.ceil(NumberOfMaps / 3);
        for (var i = 0; i < NumberOfMaps; i++) {
            if (i < half) {
                data0 += MapTD(i);
            } else if (i < half + half) {
                data1 += MapTD(i);
            } else {
                data2 += MapTD(i);
            }
        }

        tr0.html(data0);
        tr1.html(data1);
        tr2.html(data2);
    }
    // 4 rows
    else if (NumberOfMaps <= mc.row5) {
        var half = Math.ceil(NumberOfMaps / 4);
        for (var i = 0; i < NumberOfMaps; i++) {
            if (i < half) {
                data0 += MapTD(i);
            } else if (i < half + half) {
                data1 += MapTD(i);
            } else if (i < half + half + half) {
                data2 += MapTD(i);
            } else {
                data3 += MapTD(i);
            }
        }

        tr0.html(data0);
        tr1.html(data1);
        tr2.html(data2);
        tr3.html(data3);
    }
    // 5 rows
    else {
        var half = Math.ceil(NumberOfMaps / 5);
        for (var i = 0; i < NumberOfMaps; i++) {
            if (i < half) {
                data0 += MapTD(i);
            } else if (i < 2 * half) {
                data1 += MapTD(i);
            } else if (i < 3 * half) {
                data2 += MapTD(i);
            } else if (i < 4 * half) {
                data3 += MapTD(i);
            } else {
                data4 += MapTD(i);
            }
        }

        tr0.html(data0);
        tr1.html(data1);
        tr2.html(data2);
        tr3.html(data3);
        tr4.html(data4);
    }

    // XXX: without this, the left map0 will be half size or 3/4 size
    setMapHeight(NumberOfMaps);
}

function MapTD(number) {
    var help = mc.NumberOfMaps >= 7 ? "" : "<span class='cmtm'>Choose map type: </span>";
    var td = "";
    td += '<td class="maps" id="column' + number + '">';
    td += '   <form action="" class="switch" id="head' + number + '">';
    td += '      <div>' + help + '<select id="sw' + number + '" name="sw' + number + '"><option/></select></div>';
    td += '   </form>';
    td += '   <div class="mapname" id="mapname' + number + '"></div>';
    td += '   <div class="map" id="map' + number + '"></div>';
    td += '</td>';

    return td;
}

/*
 * helper function
 */
function toggleFullScreen(overlay) {
    var fullscreen = !state.fullscreen;
    var fullscreen_type = typeof overlay !== 'undefined' ? overlay : state.fullscreen_type;

    // elements by id
    for (var i = 0; i < state.non_map_tags.length; i++) {
        toggleID(state.non_map_tags[i], fullscreen);
    }

    // map titles
    for (var i = 0; i < mc.NumberOfMaps; i++) {
        toggleID("head" + i, fullscreen);
    }

    state.fullscreen = fullscreen;
    setMapHeight(mc.NumberOfMaps);

    // if active, make the font size larger
    if (fullscreen) {
        $("#fullscreen").removeClass("font_deactive").addClass("font_active");
    } else {
        $("#fullscreen").removeClass("font_active").addClass("font_deactive");
    }

    display_map_name(fullscreen_type);

    state.fullscreen_type = fullscreen_type;
    debug("fullscreen state: " + state.fullscreen + ", type: " + state.fullscreen_type);

    return state.fullscreen;
}

function display_map_name(overlay) {
    var list = $("div#table tr > td > form > div > select");
    var id, number, name, mapname_id;

    for (var i = 0; i < list.length; i++) {
        id = $(list[i]).attr("id");
        number = id.substring(2); // sw0 -> 0
        name = $(list[i]).find("option:selected").text();

        mapname_id = "#mapname" + number;
        $(mapname_id).text(name);

        if (state.fullscreen && overlay != 2) {
            $(mapname_id).show();
        } else {
            $(mapname_id).hide();
        }

        $(mapname_id).css("color", overlay == 3 ? "white" : "black");
        debug("id: " + id + ", name: " + name);
    }
}

function toggleID(tagname, fullscreen) {
    var tag = $("#" + tagname);

    if (tag) fullscreen ? tag.hide() : tag.show();
}

/*
   0: no logging
   1: log to console
   2: log to <div id="debug">
   3: log to <div id="debug">, endless growing
*/
function debug(text, id) {
    if (!mc.debug) return;
    if (!window.console) return; // IE8 ?
    // always log to JavaScript console for debug >= 1
    console.log("Map Compare: " + text);

    if (mc.debug == 1) return;

    if (!id) id = "debug";
    var tag = $("#" + id);

    if (!tag) return;

    // log to HTML page
    var prefix = "debug: ";
    var html = tag.html() ? tag.html() + "; " : prefix;
    tag.html((mc.debug == 3 ? html : prefix) + text)
}

/*
 * geo-location services, find out your current position
 *
 */
function locateMe() {
    if (!navigator || !navigator.geolocation) return;

    var tag = locateMe_tag();
    if (tag) {
        tag.show();
        navigator.geolocation.getCurrentPosition(locateMe_cb, locateMe_error);
        setTimeout(function () {
            tag.hide();
        }, 8000); // paranoid
    }
}

function locateMe_tag() {
    return $("#tools-geolocation");
}

function locateMe_cb(position) {
    var zoom = 15;

    var pos = new MapPosition(position.coords.longitude, position.coords.latitude, zoom);
    setStartPos(1, pos.getLonLat(), pos.zoom);
    locateMe_tag().hide();
    debug("set position lat,lon: " + pos.lat + "," + pos.lon + ", zoom: " + zoom);
}

function locateMe_error(error) {
    debug("could not found position");
    locateMe_tag().hide();
    return;
}

/*
 * set Map Compare preferences in admin console
 *
 */
function initConsole() {
    // debug("init console");
    initCookieCheck();

    initSocial();
    initLayerTypes();

    consoleNumberOfMaps();
    consoleCenterOfMaps();
    consoleTileServer();

    initLayerTypesUserDefined();
    consoleOrderOfMaps();
}

function initCookieCheck() {
    var name = mc_console.cookie.check;

    setCookie(name, "1", true);
};

function initSocial() {
    var tag = $("#social");
    if (!tag) return;

    mc.social ? tag.show() : tag.hide();
}

// returns the configured number of maps

function getNumberOfMaps(override) {
    var number = $.cookie(mc_console.cookie.numberOfMaps);

    if (!number || override) {
        if (!override && mc.responsive.enabled && $(window).height() < mc.responsive.maxHeight) {
            number = 2; // mc.responsive.NumberOfMaps;
            debug("Responsive design: reset number of maps to " + number);
        } else {
            number = mc.NumberOfMaps;
        }
    }

    number = parseInt(number);
    if (number < 1 || number > 999) number = 2;

    return number;
}


function getOrderOfPrefMaps(override) {
    var cookie = $.cookie(mc_console.cookie.orderOfMaps);
    if (!cookie) return mc.mt;

    var list = cookie.split("^");
    if (list.length <= 0) return mc.mt;

    for (var i = 0; i < list.length; i++) {
        if (list[i]) mc.mt[i] = list[i];
    }
    return mc.mt;
}

function getTileServer(number) {
    var obj = {};

    return obj;
}

function setTileServer(obj) {}

function consoleStoreTileServer() {
    // debug("foo");
}

function consoleStoreTileServerOrder() {
    var list = [];

    for (var i = 0; i < mc.mt.length && i < mc.NumberOfMaps; i++) {
        list.push(mc.mt[i]);
    }

    var value = list.join("^");
    setCookie(mc_console.cookie.orderOfMaps, value);
    debug("order of maps: " + value);
}

/* There are several ways to keep the GPS position in a string. For our
 * convenience we support them all: Map Compare, Google Maps, OpenStreeMaps
 *
 * returns: (x,y,z): 13.38885,52.51,12
 * 
 * see the /jasmine.html regression tests
*/
function pos_center_to_mc(pos_string) {
    var data = "";
    var list = [];
    var list2 = [];
    var zoom, lat, lng;

    // illegal parameter
    if (!pos_string || pos_string == "") {
        debug("Oops, wrong paramter in pos_center_to_mc");
    }

    // bbbike.org/mc/?lon=11.583309&lat=50.93314&zoom=10
    // => '11.583309,50.93314,10'
    else if ((list = pos_string.match(/lon=([\d\.]+)&lat=([\d\.]+)&zoom=(\d+)/))) {
        data = [list[1], list[2], list[3]].join();
    }

    // http://a.tile.bbbike.org/osm/bbbike-smoothness/15/17602/10746.png
    // => 13.38134765625,52.52290594027805,11
    else if ((list = pos_string.match(/\/(\d+)\/(\d+)\/(\d+)\.(png|jpg|jpeg)$/i))) {
        zoom = list[1];
        data = [tile2lng(list[2], zoom), tile2lat(list[3], zoom), zoom].join();
    }

    // OpenStreetMap: #map=18/52.58592/13.36120
    // => 13.36120,52.58592,18
    else if ((list = pos_string.match(/#map=(\d+)\/([\d\.]+)\/([\d\.]+)$/))) {
        data = [list[3], list[2], list[1]].join();
    }

    // tools.geofabrik.de: http://tools.geofabrik.de/mc/#15/49.0090/8.3981
    // => 8.3981,49.0090,15
    else if ((list = pos_string.match(/#(\d+)\/([\d\.]+)\/([\d\.]+)/))) {
        data = [list[3], list[2], list[1]].join();
    }

    // Google Maps:   @55.6713442,12.4907999,12z/
    // => 12.4907999,55.6713442,12
    else if ((list = pos_string.match(/@([\d\.]+),([\d\.]+),(\d+)z/))) {
        zoom = list[3];
        data = [list[2], list[1], zoom].join();
    }

    // Map Compare:   13.38885,52.51,12
    else {
        data = pos_string;
    }

    debug('Got position: "' + pos_string + '" => "' + data + '"');
    return data;
}


/*
   get center of map as [lng,lat] array

   checked in order:
   1. cgi parameter
   2. cookies
   3. MC config
*/
function getMapCenter(override) {
    var p = {};
    var pos;
    var zoom = mc.pos.zoom;

    parseParams(function (param, v) {
        p[param] = decodeURIComponent(v).replace(/\+*$|^\+*/g, "").replace(/\+/g, " ");
    });

    var pos_string = override || p["center"] || $.cookie(mc_console.cookie.centerOfMaps);

    if (!pos_string) return mc.pos;

    // lng,lat,zoom (x,y,z): 13.38885,52.51,12
    pos = pos_center_to_mc(pos_string).split(",");

    if (pos.length < 2) {
        debug("unknown pos: " + pos_string);
        return mc.pos;
    }
    if (!check_lng(pos[0])) {
        debug("unknown lng: " + pos[0]);
        return mc.pos;
    }
    if (!check_lat(pos[1])) {
        debug("unknown lat: " + pos[1]);
        return mc.pos;
    }


    if (pos[2]) {
        if (pos[2] == NaN || pos[2] > 20 || pos[2] < 0) {
            debug("unknown zoom level: " + pos[2] + ", ignored");
        } else {
            zoom = pos[2];
        }
    }

    var p = {
        "lng": pos[0],
        "lat": pos[1],
        "zoom": zoom
    };

    return p;
}

function consoleStoreMapCenter() {
    var tag = $('#center');
    var value = tag ? tag.attr("value") : "";

    var pos = getMapCenter(value);
    var string = pos2string(pos);

    setCookie(mc_console.cookie.centerOfMaps, string);
    debug("center of maps: " + string);
}


/*
   display menu to configure the default number of maps
*/
function consoleNumberOfMaps() {
    if (!mc_console.pref_numberOfMaps) return $("#pref_numberOfMaps").hide();

    var tag = $('#consoleNumberOfMaps');
    if (!tag) return false;

    var NumberOfMaps = getNumberOfMaps();

    for (var i = 0; i < state.layertypes.length; i++) {
        var j = i + 1;
        var opt = document.createElement('option');
        opt.value = j;
        opt.text = j;
        opt.style.padding = '1px';
        tag[0].options[i] = opt;

        // pre-select value
        if (j == NumberOfMaps) tag[0].options[i].selected = true;
    }

    // keep current value, even if nothing changed and the user pressed click
    mc.NumberOfMaps = NumberOfMaps;

    // on change update javascript variables
    tag.bind('change', null, function (event) {
        mc.NumberOfMaps = event.target.value;
    });

    return true;
}

function pos2string(pos) {
    var string = pos.lng + "," + pos.lat;
    if (pos.zoom) string += "," + pos.zoom;

    return string;
}

function consoleCenterOfMaps() {
    if (!mc_console.pref_centerOfMaps) { // disable section
        return $("#pref_centerOfMaps").hide();
    }

    var tag = $('#center');
    if (!tag) return false;

    var pos = getMapCenter();

    tag.attr("value", pos2string(pos));
    return true;
}

/*
 * XXX: should be rewritten using standard code function
 *
 */
function consoleOrderOfMaps() {
    var mapsPerRow = 2; // number of maps per row, 2..4
    if (!mc_console.pref_orderOfMaps) return $("#pref_orderOfMaps").hide();

    var tag = $('#consoleOrderOfMaps');
    if (!tag) return false;

    var NumberOfMaps = getNumberOfMaps();
    if (NumberOfMaps > 8) // show only 8 maps, more don't make sense
    NumberOfMaps = 8;

    var layertypes = state.layertypes;
    var html = "\n";
    for (var n = 1; n <= NumberOfMaps; n++) {
        html += "Map " + n + ": ";

        var optgroup_label = "none";
        html += '<select id="order_' + n + '">';
        // html += '<option value="">default</option>';
        for (var i = 0; i < layertypes.length; i++) {
            var str = layertypes[i].name.split(/\s+/);
            if (str.length > 0 && str[0] != optgroup_label) {
                optgroup_label = str[0];
                if (i > 0) html += '</optgroup>';

                html += '<optgroup label="' + optgroup_label + '">';
            }

            html += '<option '
            if (mc.mt[n - 1] && layertypes[i].type == mc.mt[n - 1]) html += 'selected="selected" '
            html += 'value="' + layertypes[i].type + '">' + layertypes[i].name + '</option>';
        }
        html += "</optgroup>\n";
        html += "</select>\n";
        html += (n % mapsPerRow == 0 ? "<br/>" : "\n");
    }
    tag.before(html);

    for (var n = 1; n <= NumberOfMaps; n++) {
        var tag = $('#order_' + n);

        // on change update javascript variables
        tag.bind('change', null, (function (number) {
            return function (event) {
                var value = event.target.value;
                if (value) mc.mt[number] = value;
                debug(value + " " + number);
            };
        })(n - 1)); // call by value, not a reference to n variable
    }

    debug(mc.mt.join("/"));
    return true;
}


function consoleStoreCookieNumberOfMaps() {
    var number = getNumberOfMaps(true);

    setCookie(mc_console.cookie.numberOfMaps, number);
    debug("number of maps: " + number);
}

function cookieCheck() {
    var name = mc_console.cookie.check;
    var value = $.cookie(name);

    if (!value) {
        var tag = $("#tools-console");
        tag.before('<p class="error">Please enable cookies!</p>');
    }
}

function setCookie(name, value, nocheck) {
    if (!nocheck) cookieCheck();

    $.cookie(name, value, {
        expires: mc.preferences_expire,
        path: '/'
    });
}

/*
   delete cookie by name, or all if no argument is given
*/
function consoleDeleteCookies(array) {
    var list = array || [];

    // delete all cookies
    if (list.length == 0) {
        list.push(mc_console.cookie.numberOfMaps);
        list.push(mc_console.cookie.orderOfMaps);
        list.push(mc_console.cookie.centerOfMaps);

        // all tile servers
        for (var i = 1; i <= mc_console.maxTileServer; i++) {
            list.push(mc_console.cookie.tileserver + i);
        }
    }

    for (var i = 0; i < list.length; i++) {
        $.cookie(list[i], null, {
            path: '/'
        });
    }
}

/*
  returns a tile server config object for a given number (1..4)
  The data is from the URL parameters or a cookie
*/
function getTileServerConfig(number) {
    var i = number;

    var p = {}
    parseParams(function (param, v) {
        p[param] = decodeURIComponent(v).replace(/\+*$|^\+*/g, "").replace(/\+/g, " ");
    });

    var obj = {
        name: 'local_tileserver_name_' + i,
        url: 'local_tileserver_url_' + i,
        base: 'local_tileserver_isbaselayer_' + i,
        cookie: mc_console.cookie.tileserver + i
    };

    // validate tile server config

    function validateObj(obj, p, cookie) {
        var maxNameLength = 25;
        // cleanup
        for (var key in obj) {
            if (key.match(/_v$/)) continue; // XXX
            var k = cookie ? key : obj[key]; // cookie or cgi param
            if (typeof p[k] === 'undefined') p[k] = "";

            var val = p[k];
            obj[key + "_v"] = xss(val) ? "" : val;
        }

        if (obj.name_v.length > maxNameLength) {
            obj.name_v = obj.name_v.substring(0, maxNameLength);
        } else if (obj.name_v == "" && obj.url_v != '') {
            obj.name_v = "unknown";
        }

        obj.url_v = normalizeTileServerURL(obj.url_v);
        if (obj.url_v.length > 200) obj.url_v = "";
    }

    // read from URL parameters
    if (p["pref_tileserver"]) {
        validateObj(obj, p);
    }
    // read from cookie
    else {
        var _p = parseCookieTileServer(number);
        validateObj(obj, _p, true);
    }

    obj["pref_tileserver"] = p["pref_tileserver"];

    // disallow spaces in URLs
    if (!isURL(obj.url_v) || obj.url_v.match(/\s|\+/)) obj.url_v = "";

    return obj;
}


/*
  console: display user tile server configuration table
*/
function consoleTileServer() {
    if (!mc_console.pref_tileserver) return $("#pref_tileserver").hide();

    var tag = $('#table_tileserver');
    if (!tag) return false;

    var maxTileServer = mc_console.maxTileServer;

    for (var i = 1; i <= maxTileServer; i++) {
        var obj = getTileServerConfig(i);

        var text = '<tr>' + '<td>' + i + '</td>' + '<td><input maxlength="32" name="' + obj.name + '" type="text" value="' + obj.name_v + '"></td>' + '<td><input maxlength="256" name="' + obj.url + '" type="text" value="' + obj.url_v + '" /></td>' + '<td><select name="' + obj.base + '"><option value="1">yes</option>' + '<option value="0"' + (obj.base_v == "0" ? ' selected="selected"' : "") + '>no</option></td>' + '</tr>';

        tag.append(text);

        var cookie_value = obj.name_v + "^" + obj.url_v + "^" + obj.base_v;
        if (obj.url_v != "") {
            debug("cookie: " + obj.cookie + " " + cookie_value);
            setCookie(obj.cookie, cookie_value);
        } else {
            if (obj.pref_tileserver) {
                consoleDeleteCookies([obj.cookie]);
                debug(obj.cookie);
            }
        }
    }

    return true;
}

/*
  read all user tile server configs from cookies
*/
function initLayerTypesUserDefined() {
    for (var i = mc_console.maxTileServer; i > 0; i--) {
        var cookie = $.cookie(mc_console.cookie.tileserver + i)
        if (cookie) initLayerTypesCookie(i, cookie);
    }
}


/*
  check for valid input
*/
function xss(string) {
    var result = string.match(/[<>"'\^]/) ? 1 : 0;

    if (result) debug("xss detected");

    debug("xss: " + result);
    return result;
}

/*
   /osm/11/1100/671.png    -> /osm/${z}/${x}/${y}.png
   /osm/11/1100/671@2x.png -> /osm/${z}/${x}/${y}@2x.png
   /osm/11/1100/671.png?token=secret    -> /osm/${z}/${x}/${y}.png?token=secret
   
*/
function normalizeTileServerURL(url) {
    // http://a.tile.bbbike.org/osm/bbbike-smoothness/15/17602/10746.png
    var regex = new RegExp('/[12]?\\d/\\d+/\\d+\(@\\d+x)?\.(png|jpg|jpeg)(\\?.*)?$');

    if (!url) return url;

    var u = url;
    if (u.match(regex)) {
        url = u.replace(regex, "/${z}/${x}/${y}$1.$2$3");
    }

    // http://bingcoverage.org/dates.php?z=10&x=545&y=334
    else if (u.match(/&x=\d+/)) {
        url = u.replace(/&x=\d+/, "&x=${x}").replace(/&y=\d+/, "&y=${y}").replace(/&z=\d+/, "&z=${z}").replace(/\?z=\d+/, "?z=${z}");
    }

    // debug("Normalized URL: " + url);
    return url;
}

function parseCookieTileServer(i, cookie) {
    if (!cookie) cookie = $.cookie(mc_console.cookie.tileserver + i);
    if (!cookie) return {};

    var data = cookie.split("^");

    var obj = {
        "name": data[0],
        "url": data[1],
        // normalizeTileServerURL($data[1]),
        "base": data[2],
        "type": 'user_' + i
    };

    // must be a real URL
    if (!isURL(obj.url)) return {};
    if (xss(obj.url)) return {};

    return obj;
}

function isURL(url) {
    if (typeof url === 'undefined' || url == "") return false;

    // support multiple servers
    url = url.replace(/\{switch:([a-z0-9]+).*?\}/, "$1");

    var isURL = url.match(/^https?:\/\/[\w+_\-\.]+(:\d+)?\/\w+/i) ? true : false;

    debug("isURL: " + isURL);
    return isURL;
}

/*
 * support multiple servers in URL config
 * http://{switch:a,b}.tile.bbbike.org -> ["http://a.tile.bbbike.org", "http://a.tile.bbbike.org" ]
 */
function switch_url(url) {
    var list = url.match(/^(https?:\/\/[0-9a-z\-]*?)\{switch:([a-z0-9,]+)\}(.*)/i);

    if (!list || list.length == 0) {
        return url;
    }

    var servers = list[2].split(",");
    var url_list = [];
    for (var i = 0; i < servers.length; i++) {
        url_list.push(list[1] + servers[i] + list[3]);
    }

    return url_list;
}

/*
  add a user tile server
*/
function initLayerTypesCookie(i, cookie) {
    debug("got cookie: " + cookie);

    var obj = parseCookieTileServer(i, cookie);
    if (!isURL(obj.url)) return;

    if (obj.base != "0") {
        state.layertypes.unshift(new LayerType(obj.type, obj.name, function () {
            return new OpenLayers.Layer.OSM(obj.name, switch_url(obj.url), {
                tileOptions: {
                    crossOriginKeyword: null
                },
                // openlayers 2.12
                sphericalMercator: true
            })
        }));
        // addMaptypeToOrder(obj.type);
    } else {
        // over_layertypes.unshift(l);
        state.over_layertypes.unshift(new OverLayerType(obj.type, obj.name, function () {
            return new OpenLayers.Layer.OSM(obj.name, switch_url(obj.url), {
                tileOptions: {
                    crossOriginKeyword: null
                },
                sphericalMercator: true,
                isBaseLayer: false
            })
        }));
    }
}

// add a maptype to prefered order list

function addMaptypeToOrder(maptype) {
    for (var i = 0; i < mc.mt.length; i++) {
        // maptype already exists, skip
        if (mc.mt[i] == maptype) return;
    }
    mc.mt.unshift(maptype);
}

/*
  social links
*/

/*
   see https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
*/
function tile2lng(x, z) {
    return (x / Math.pow(2, z) * 360 - 180);
}

function tile2lat(y, z) {
    var n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
    return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
}

function tile2lnglat(url) {
    // http://a.tile.bbbike.org/osm/bbbike-smoothness/15/17602/10746.png
    var regex = new RegExp(/^https?:\/\/.*?\/([12]?\\d)\/(\\d+)\/(\\d+)(@\\d+x)?\.(png|jpg)$/i);

    var lng;
    var lat;

    if (!url) return undefined;

    var match = regex.exec(url);

    if (!match) {
        return undefined;
    }

    var zoom = match[1];
    lng = tile2lng(match[2], zoom);
    lat = tile2lat(match[3], zoom);
    if (lng == NaN || lat == NaN) return undefined;

    var obj = {
        "lng": lng,
        "lat": lat,
        "zoom": zoom
    };

    return obj;
}


/* validate lat or lng values */

function check_lat(number) {
    return check_coord(number, 90)
}

function check_lng(number) {
    return check_coord(number, 180)
}

function check_coord(number, max) {
    if (number == NaN || number == "") return false;
    if (number >= -max && number <= max) return true;

    return false;
}

function chooseAddrBTLR(b, t, l, r, lon, lat, message) {
    chooseAddr(l, b, r, t, lon, lat, message)
}

function chooseAddr(l, b, r, t, lon, lat, message) {
    var bounds = new OpenLayers.Bounds(l, b, r, t).transform("EPSG:4326", "EPSG:900913");
    map.zoomToExtent(bounds);
    var zoom = map.zoom;

    if (mc.search.max_zoom && mc.search.max_zoom < zoom) {
        zoom = mc.search.max_zoom;
        debug("reset zoom level for address: " + zoom);
        map.zoomTo(zoom);
    }

    // marker for address
    if (mc.search.show_marker) {
        set_popup({
            "lon": lon,
            "lat": lat,
            "message": message
        });
    }
}

function set_search_width() {
    var width = $(window).width();
    var height = $("div#search-results").outerHeight(true) + $("div#search-form").outerHeight(true);
    var max_with = 760;

    if (width > max_with) {
        width = max_with;
    }
    var help_width = Math.floor(width * 0.95);

    $(".jqmWindow").width(help_width);
    $(".jqmWindow").css("right", 20);

    $(".dialog-search").height(height + 20);
    debug("search help width: " + help_width + " height: " + $(".dialog-search").outerHeight(true));
}

function mc_search(query) {
    if (!query) {
        query = $("input#address-query").attr("value") || "";
    }

    if (mc.search.type == 'nominatim') {
        mc_search_nominatim(query);
    } else {
        debug("unknown search type");
    }
}

function init_search() {
    // $('#address-submit').click(function () {
    // IE8, IE9 submit on enter, see http://support.microsoft.com/kb/298498/
    $('div#search-form form').on('submit', function () {
        mc_search();
        return false;
    });

    // disable keyboard shortcuts on input fields
    $("div#search-form").on("focus blur mousein mouseout mouseover", "input#address-query", function () {
        var active = document.activeElement.id == this.id;

        debug("document active: " + (document.activeElement.id ? document.activeElement.id : "ACTIVE") + " " + active);
        active ? state.control.keyboard.deactivate() : state.control.keyboard.activate();
    });

    set_search_width();

    // XXX: on newer jqModal we need a timeout
    setTimeout(function () {
        set_search_width();
    }, 0);

    // XXX: jquery 1.8.3 set the focus later
    // inital focus set
    setTimeout(function () {
        $("div#search-form input#address-query").focus();
    }, 50);
}

function init_share() {
    function show_url(url) {
        var message = '<a href="' + url + '">' + url + "</a>";
        $("span#url_share").html(message);
    }

    function show_url_from_input() {
        var url = jQuery('#permalink').attr("href");
        var u = url;
        // remove old marker parameter
        if (u.indexOf("&marker=") != -1) {
            u = u.substring(0, u.indexOf("&marker="));
            debug("cleanup old marker message: " + url);
        }
        show_url(u + "&marker=" + encodeURI($("input#share-message").attr("value")));
        state.marker_message = $("input#share-message").attr("value");
    }

    $('input#share-message').change(function () {
        show_url_from_input()
    });
    $('input#share-message').keyup(function () {
        show_url_from_input()
    });

    // zoom level changes will trigger some actions
    map.events.register("zoomend", map, function () {
        if ($("input#share-message:visible").length) {
            debug("zoom change");
            show_url_from_input();
        }
    });

    // disable keyboard shortcuts on input fields
    $("div#share-form").on("focus blur mousein mouseout mouseover", "input#share-message", function () {
        var active = document.activeElement.id == this.id;

        debug("document active: " + (document.activeElement.id ? document.activeElement.id : "ACTIVE") + " " + active);
        active ? state.control.keyboard.deactivate() : state.control.keyboard.activate();
    });

    // pre-filled form
    if (state.marker_message) {
        $("input#share-message").attr("value", state.marker_message);
    }

    share_marker(getPosition());
    show_url_from_input();

    set_share_width();

    // XXX: jquery 1.8.3 set the focus later
    // inital focus set
    setTimeout(function () {
        $("div#share-form input#share-message").focus();
    }, 50);
}

function set_share_width() {
    var width = $(window).width();
    var height = $("div.dialog-share").outerHeight(true);
    var max_with = 720;

    if (width > max_with) {
        width = max_with;
    }
    var share_width = Math.floor(width * 0.95);

    $(".jqmWindow").width(share_width);
    $(".jqmWindow").css("right", 20);

    $("div.dialog-share").height(height + 30);
    debug("search help width: " + share_width + " height: " + $(".dialog-share").outerHeight(true));
}

/*
 viewbox=<left>,<top>,<right>,<bottom>
 or viewboxlbrt=<left>,<bottom>,<right>,<top>
   The preferred area to find search results
   */

function get_viewport(map) {
    var proj = map.getProjectionObject();
    var center = map.getCenter().clone();
    var zoom = map.getZoom();

    var box = map.getExtent();
    // 13.184573,52.365721,13.593127,52.66782
    // x1,y1 x2,y2
    var bbox = box.transform(map.getProjectionObject(), state.proj4326).toArray();

    debug(bbox + " " + bbox.length);

    if (bbox && bbox.length == 4) {
        return bbox.join(",");
    } else {
        debug("Warning: no viewboxlbrt found");
        return "";
    }
}

function mc_search_nominatim(query, offset, paging) {
    var limit = mc.search.limit || 25;
    var viewport = "";

    if (!paging) {
        paging = mc.search.paging || 5;
    }
    if (!offset) {
        offset = 0;
    }

    var items = [];
    var counter = 0;


    if (mc.search.viewbox) {
        viewport = get_viewport(map);
    }

    debug("start address search query: " + query + " limit: " + limit + " viewport: " + viewport);
    $("div#search-results").html("<p>start searching...</p>"); // remove old results first
    set_search_width();

    var email = mc.search.user_agent ? "&email=" + mc.search.user_agent : "";

    // async search request to nominatim
    var url = 'https://nominatim.openstreetmap.org/search?format=json&limit=' + limit + "&viewboxlbrt=" + viewport + '&q=' + encodeURI(query) + email;;

    // IE8/IE9
    // $.support.cors = false;
    $.getJSON(url, function (data) {
        $("div#search-results").html(""); // remove old results first
        $.each(data, function (index, val) {
            counter++;
            if (index >= offset && index < offset + paging) {
                if (items.length == 0) {
                    $("div#search-results").append("<br/>");
                }
                debug("Address: " + index + ". " + val.display_name + " lat: " + val.lat + " lon: " + val.lon);

                var link = "<p><a title='lat,lon: " + val.lat + "," + val.lon + " [" + val["class"] + "]'";
                link += "href='#' onclick='chooseAddrBTLR(" + val.boundingbox + "," + val.lon + "," + val.lat + ", \"" + escapeHtmlEntities(val.display_name) + "\");return false;'>";
                link += (data.length == 1 ? "" : counter + ") "); // only one hit, no numbers
                link += escapeHtmlEntities(val.display_name + " [" + val["class"] + "]") + "</a></p>";
                $("div#search-results").append(link);
                items.push(link);
            }
        });

        // nothing found
        if (items.length == 0) {
            $("div#search-results").append("<p>No results found</p>");
        }

        // probably more results, search again
        else if (items.length == paging && offset + paging < counter) {
            $("div#search-results").append("<hr/><a href='#' onclick='mc_search_nominatim(\"" + query + "\"," + (offset + paging) + ", " + paging + "); return false;'>More results...</a>");
        }

        set_search_width();

    }).fail(function (data, textStatus, error) {
        debug("error nominatim search: " + url);
        debug("error nominatim: data: " + data + ", textStatus: " + textStatus + ", error: " + error);
        $("div#search-results").html("<p>Search with nominatim failed. Please try again later. Sorry!</p>" + "<p>" + error + "</p>");
        set_search_width();
    });
}

function escapeHtmlEntities(str) {
    // does not work with single or double quotes
    // var text = $('<div/>').text(str).html();
    var text = str.replace(/&/g, '&amp;').replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

    debug("link text: " + text);
    return text;
}

/*
 * js/common.js
 *
 */

function parseParams(handler) {
    var perma = location.search.substr(1);
    if (perma != '') {
        var paras = perma.split('&');
        for (var i = 0; i < paras.length; i++) {
            var p = paras[i].split('=');
            handler(p[0], p[1]);
        }
    }
}

function getPosition() {
    var proj = state.proj4326; // proj4326
    var center = map.getCenter().clone().transform(map.getProjectionObject(), proj);
    return new MapPosition(
    Math.round(center.lon * 1000000) / 1000000, Math.round(center.lat * 1000000) / 1000000, map.getZoom());
}

/* the help window must be smaller than the main window
 * otherwise we don't see the cancel button on mobile devices
 */
function set_help_width() {
    var width = $(window).width();
    var height = $(window).height();

    if (width > 780) {
        width = 780;
    }
    var help_width = Math.floor(width * 0.95);

    debug("help width: " + help_width + " height: " + height);
    $("#tools-helpwin").width(help_width);
    $("#tools-helpwin").css("left", Math.floor(($(window).width() - help_width) / 2));

    $(".dialog-msg").height(height - 100);
}

$(document).ready(function () {
    if ($('#tools-helpwin').length == 0) return;

    // $('#tools-switcher').bind('change', chooseTool);
    // helper window, blocking
    $('#tools-helpwin').jqm({
        ajax: '@href',
        trigger: 'a.tools-helptrigger',
        overlay: 20,
        /* overlayClass: 'whiteOverlay', */
        onLoad: function (hash) {
            hash.w.jqmAddClose('.dialog-close');
            $("#tools-helpwin").css("top", 20); // always on top of a page
            debug("onLoad helpwin");
        }
    }).draggable();

    // search window, with input, moveable
    $('#tools-inputwin').jqm({
        ajax: '@href',
        trigger: 'a.tools-inputtrigger',
        overlay: 0,
        onLoad: function (hash) {
            hash.w.jqmAddClose('.dialog-close');
            $("#tools-inputwin").css("top", 20); // always on top of a page
            debug("onLoad inputwin");
        }
    }).draggable();
});

/* ================================================== */

function MapPosition(lon, lat, zoom) {
    this.lon = lon;
    this.lat = lat;
    this.zoom = zoom;
}

MapPosition.prototype.getLonLat = function () {
    return new OpenLayers.LonLat(this.lon, this.lat);
}

MapPosition.prototype.tileX = function () {
    if ((this.zoom < 3) || (this.zoom > 18)) {
        return 0;
    }
    return Math.round((1 << (this.zoom - 3)) * (this.lon + 180.0) / 45.0);
}

MapPosition.prototype.tileY = function () {
    if ((this.zoom < 3) || (this.zoom > 18)) {
        return 0;
    }
    var l = this.lat / 180 * Math.PI;
    var pf = Math.log(Math.tan(l) + (1 / Math.cos(l)));
    return Math.round((1 << (this.zoom - 1)) * (Math.PI - pf) / Math.PI);
}

function createMapPositionFromTiles(x, y, zoom) {
    var lon;
    var lat;

    if ((zoom < 3) || (zoom > 18)) {
        lon = 0;
    } else {
        lon = (x + 0.5) * 45.0 / (1 << (zoom - 3)) - 180.0;
    }

    if ((zoom < 3) || (zoom > 18)) {
        lat = 0;
    } else {
        lat = Math.atan(sinh(Math.PI - (Math.PI * (y + 0.5) / (1 << (zoom - 1))))) * 180 / Math.PI;
    }

    return new MapPosition(lon, lat, zoom);
}

function sinh(x) {
    return (Math.exp(x) - Math.exp(-x)) / 2;
}

function createMapPosition(lon, lat, x, y, zoom) {
    if (x != null && y != null) {
        return createMapPositionFromTiles(x, y, zoom);
    } else if (lon != null && lat != null) {
        return new MapPosition(lon, lat, zoom);
    } else {
        return new MapPosition(0, 0, zoom);
    }
}

function valide_profile(p) {
    if (!p) {
        p = profile;
    }

    for (var alias in p) {
        if (mc.debug >= 2) debug("profile: " + alias + ", length: " + p[alias].mt.length);
        for (var i = 0; i < p[alias].mt.length; i++) {
            var type = p[alias].mt[i];
            if (!state.layertypes_hash[type]) {
                debug("profile: '" + alias + "', unknown map: " + type);
            }
        }
    }
}

/* EOF */
