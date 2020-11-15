<template>
  <div class="map" ref="map" id="map"></div>
</template>

<script>
import "ol/ol.css";
import Circle from "ol/geom/Circle";
import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import { defaults } from "ol/control";
import XYZ from "ol/source/XYZ";
import View from "ol/View";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { Icon } from "ol/style";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import data from "./pt.json";
export default {
  data() {
    return {};
  },
  mounted() {
    this.mapInit();
  },
  methods: {
    pointerInit(geojsonObject) {
      var image = new CircleStyle({
        radius: 3,
        fill: null,
        stroke: new Stroke({ color: "#f90", width: 6 }),
      });
      var styles = {
        Point: new Style({
          image: image,
        }),
      };
      var styleFunction = function(feature) {
        return styles[feature.getGeometry().getType()];
      };
      var vectorSource = new VectorSource({
        features: new GeoJSON({
          defaultDataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857",
        }).readFeatures(geojsonObject),
      });

      var vectorLayer = new VectorLayer({
        source: vectorSource,
        style: styleFunction,
      });
      return vectorLayer;
    },
    mapInit() {
      let map = new Map({
        controls: defaults({
          attribution: false,
          zoom: false,
          rotate: false,
        }),
        target: "map",
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "http://222.128.56.122:8081/wordIMG/{z}/{x}/{y}.jpg",
            }),
          }),
          this.pointerInit(data),
        ],
        view: new View({
          center: [-98, 12.1533636310594],
          zoom: 1,
        }),
      });
      //   this.pinit(map);
    },
  },
};
</script>

<style>
.map {
  width: 100%;
  height: 100%;
}
</style>
