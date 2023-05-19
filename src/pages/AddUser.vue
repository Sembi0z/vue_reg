<template>
  <div class="container">
    <form class="form" @submit.prevent="submitForm()">
      <div class="form-title">
        <h3>Добавить Заявку</h3>
        <h5>Введите данные</h5>
      </div>

      <div class="form-group">
        <label for="name">
          <h5>Заявитель</h5>
          <input
            type="text"
            v-model="name"
            id="name"
            placeholder="Name"
            minlength="3"
            required
          />
        </label>
        <label for="prioritet">
          <h5>Приоритет</h5>
          <select v-model="prioritet" id="prioritet" required>
            <option v-for="item in prioritets" :key="item">
              {{ item }}
            </option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label for="name">
          <h5>Номер телефона</h5>
          <input
            type="text"
            v-model="phone"
            id="phone"
            placeholder="Phone"
            minlength="9"
            required
          />
        </label>
        <label for="tip">
          <h5>Тип аварии</h5>
          <select v-model="tip" id="tip" required>
            <option v-for="item in tips" :key="item">
              {{ item }}
            </option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label for="name">
          <h5>Адрес</h5>
          <input
            type="text"
            v-model="address"
            id="address"
            placeholder="Address"
            minlength="4"
            @input="geocodeCity()"
            required
          />
        </label>
      </div>

      <div class="form-group">
        <label for="name">
          <h5>Карта</h5>
          <div id="map" class="map"></div>
        </label>
      </div>

      <div class="form-actions">
        <button type="reset">Отмена</button>
        <button type="submit" :disabled="!latitude">Применить</button>
      </div>
    </form>
  </div>
</template>
<script>
import { ref, defineComponent } from "vue";
import axios from "axios";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Icon, Style } from "ol/style";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { transform } from "ol/proj";
import markerLogo from "../assets/marker.png";
import { mapMutations } from "vuex";

export default defineComponent({
  data() {
    return {
      name: "",
      phone: "",
      address: "",
      tip: "",
      prioritet: "",
      prioritets: ["Незамедлительно", "Высокий", "Средний", "Низкий"],
      tips: [
        "Порыв",
        "Утечка",
        "Колонка уличная",
        "Некачественная вода",
        "Закупорка",
        "Другое",
      ],
      latitude: null,
      longitude: null,
      vectorLayer: null,
      map: null,
    };
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    ...mapMutations(["addUser"]),
    initializeMap() {
      this.map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
        ],
        controls: [],
        view: new View({
          // Rostov-on-Don coordinates
          center: transform([39.701505, 47.2357137], "EPSG:4326", "EPSG:3857"),
          zoom: 12,
        }),
      });
    },
    geocodeCity() {
      const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${this.address}`;

      axios
        .get(apiUrl)
        .then((response) => {
          if (response.data.length > 0) {
            const location = response.data[0];
            this.latitude = location.lat;
            this.longitude = location.lon;
            this.addMarker();
          } else {
            console.log("No results found.");
          }
        })
        .catch((error) => {
          console.log("Error geocoding:", error);
        });
    },
    addMarker() {
      if (this.vectorLayer) {
        this.map.removeLayer(this.vectorLayer);
      }

      const marker = new Feature({
        geometry: new Point(
          fromLonLat([parseFloat(this.longitude), parseFloat(this.latitude)])
        ),
      });

      const markerStyle = new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: markerLogo,
        }),
      });

      marker.setStyle(markerStyle);

      this.vectorLayer = new VectorLayer({
        source: new VectorSource({
          features: [marker],
        }),
      });

      this.map.addLayer(this.vectorLayer);

      const markerExtent = marker.getGeometry().getExtent();
      this.map.getView().fit(markerExtent, {
        padding: [100, 100, 100, 100],
        minResolution: 100,
      });

      // Adjust zoom level as desired
      const maxZoom = 18;
      const minZoom = 16;
      const currentZoom = this.map.getView().getZoom();
      if (currentZoom > maxZoom) {
        this.map.getView().setZoom(maxZoom);
      } else if (currentZoom < minZoom) {
        this.map.getView().setZoom(minZoom);
      }
    },

    submitForm() {
      if (this.latitude) {
        let user = {
          name: this.name,
          phone: this.phone,
          address: this.address,
          tip: this.tip,
          prioritet: this.prioritet,
          lat: this.latitude,
          lng: this.longitude,
        };
        this.addUser(user);
        this.$router.push("/");
      }
    },
  },
});
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  padding-top: 140px;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form {
  padding: 20px;
  width: 480px;
  background: #ffffff;
  box-shadow: 2px 20px 24px -4px rgba(16, 24, 40, 0.08),
    0px 8px 8px -4px rgba(16, 24, 40, 0.03);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px 20px;

  &-title {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 10px;

    h3 {
      font-weight: 700;
    }

    h5 {
      color: #667085;
      font-weight: 500;
    }
  }

  &-group {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    gap: 20px;

    label {
      flex: 1 0 auto;
    }

    &:nth-child(1) label:nth-child(1) {
      min-width: 300px;
    }

    h5 {
      margin-bottom: 10px;
    }

    input,
    select,
    .map {
      padding: 10px;
      width: 100%;
      height: 44px;
      background: #ffffff;
      border: 1px solid #d0d5dd;
      box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
      border-radius: 8px;
      outline: none;
    }

    .map {
      padding: 5px;
      min-height: 240px;
      border-radius: 8px;
    }
  }

  &-actions {
    margin-top: 20px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    button {
      cursor: pointer;
      flex: 1 0 auto;
      padding: 10px;
      height: 44px;
      background: #ffffff;
      border: 1px solid #d0d5dd;
      box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
      border-radius: 8px;
      font-weight: 600;
      outline: none;

      &:disabled {
        opacity: 0.5;
      }

      &:nth-child(2) {
        color: #fff;
        background: #7f56d9;
        border: none;
        box-shadow: none;
      }
    }
  }
}
</style>
