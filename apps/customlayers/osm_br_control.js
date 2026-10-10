// Couche de contrôle OSM Breizh (tuiles XYZ) ajoutée en surcouche
(function () {
  var layer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "https://tile.openstreetmap.bzh/br_control/{z}/{x}/{y}.png",
      crossOrigin: "anonymous",
      maxZoom: 18,
      attributions:
        "<a href='https://openstreetmap.bzh/' target='_blank'>OpenStreetMap Breizh</a>",
    }),
  });
  new CustomLayer("klokter", layer);
})();
