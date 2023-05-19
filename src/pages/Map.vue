<template>
  <div id="app">
    <div id="map" class="map"></div>
    <div id="popup" class="ol-popup">
      <a href="#" id="popup-closer" class="ol-popup-closer"></a>
      <div id="popup-content"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Overlay from "ol/Overlay";
import XYZ from "ol/source/XYZ";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Icon, Style } from "ol/style";
import { transform } from "ol/proj";
import marker from "../assets/marker.png";
import { mapState } from "vuex";

export default defineComponent({
  name: "App",
  computed: {
    ...mapState(["users"]),
  },
  mounted() {
    const container = document.getElementById("popup");
    const content = document.getElementById("popup-content");
    const closer = document.getElementById("popup-closer");

    const overlay = new Overlay({
      element: container,
      autoPan: {
        animation: {
          duration: 250,
        },
      },
    });

    const key = "wZgSfFVyv5LeWrX6J55B";
    const map = new Map({
      layers: [
        new TileLayer({
          source: new XYZ({
            url:
              "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=" +
              key,
            tileSize: 512,
          }),
        }),
      ],
      overlays: [overlay],
      target: "map",
      view: new View({
        // Rostov-on-Don coordinates
        center: transform(
          [this.$route.params.lat, this.$route.params.long],
          "EPSG:4326",
          "EPSG:3857"
        ),
        zoom: this.$route.params.zoom,
      }),
    });

    var Markers = this.users;
    var features = [];

    for (var i = 0; i < Markers.length; i++) {
      var item = Markers[i];
      var longitude = item.lng;
      var latitude = item.lat;

      var iconFeature = new Feature({
        geometry: new Point(
          transform([longitude, latitude], "EPSG:4326", "EPSG:3857")
        ),
        id: item.id,
        name: item.name,
        prioritet: item.prioritet,
        tip: item.tip,
        address: item.address,
        phone: item.phone,
      });

      var iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: marker,
        }),
      });

      iconFeature.setStyle(iconStyle);
      features.push(iconFeature);
    }

    var vectorSource = new VectorSource({
      features: features,
    });

    var vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    map.addLayer(vectorLayer);

    map.on("singleclick", function (evt) {
      const coordinate = transform(evt.coordinate, "EPSG:3857", "EPSG:4326");

      const clickedFeature = map.forEachFeatureAtPixel(evt.pixel, function (
        feature
      ) {
        return feature;
      });

      if (clickedFeature && clickedFeature.get("id")) {
        content.innerHTML = `
              <p>
      id: ${clickedFeature.get("id")}, <br/>
      name: ${clickedFeature.get("name")}, <br/>
      prioritet:  ${clickedFeature.get("prioritet")}, <br/>
      tip: ${clickedFeature.get("tip")}, <br/>
      address:  ${clickedFeature.get("address")}, <br/>
      phone:  ${clickedFeature.get("phone")},
                </p>
          `;
        overlay.setPosition(evt.coordinate);
      } else {
        overlay.setPosition(undefined);
        closer.blur();
      }
    });
  },
});
</script>

<style scoped>
.map {
  width: 100%;
  height: 100vh;
}
.ol-popup {
  position: absolute;
  background-color: white;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 280px;
}
.ol-popup:after,
.ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
}
.ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
}
.ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
}
</style>
