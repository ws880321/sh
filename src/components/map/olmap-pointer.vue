<template>
  <div class="map-wrap">
    <div class="map" ref="map" id="map"></div>
    <a-card
      style="width: 300px"
      class="card"
      ref="card"
      v-show="pointer"
      :style="pointerStyle"
    >
      <p>{{ text }}</p>
    </a-card>
  </div>
</template>

<script>
import "ol/ol.css";
import Circle from "ol/geom/Circle";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import GeoJSON from "ol/format/GeoJSON";
import Map from "ol/Map";
import { fromLonLat, toLonLat, transform } from "ol/proj";
import { defaults } from "ol/control";
import XYZ from "ol/source/XYZ";
import View from "ol/View";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { Icon, Text } from "ol/style";
import { OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import data from "./pt.json";
import img from "../../assets/images/采集样点icon.svg";
export default {
  data() {
    return {
      x: 0,
      y: 0,
      text: "",
      map: null,
      pointer: false,
    };
  },
  props: {
    pointers: {
      default: () => {
        return [
          {
            name: "123",
            point: [-109, 46.5],
            value: 11,
          },
        ];
      },
    },
  },
  watch: {
    pointers: function() {
      this.pointerInit();
    },
  },
  computed: {
    pointerStyle: function() {
      return {
        left: this.x + "px",
        top: this.y + "px",
      };
    },
  },
  mounted() {
    this.mapInit();
  },
  methods: {
    pointerInit() {
      let vectorLayers = [];
      this.pointers.map((v) => {
        // console.log(transform(v.point, "EPSG:3857", "EPSG:4326"));/
        var iconFeature = new Feature({
          geometry: new Point(
            fromLonLat(transform(v.point, "EPSG:3857", "EPSG:4326"))
          ),
          // geometry: new Point(fromLonLat([-116, 39.910683])),

          name: v.name,
          data: v.value ? v.value : 0,
          population: 4000,
          rainfall: 500,
        });

        var iconStyle = new Style({
          image: new Icon({
            size: [128, 128],
            scale: 0.22,
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            color: "#f90",
            src: img,
          }),
          text: new Text({
            text: v.name,
            scale: 1,
            fill: new Fill({
              color: "#000000",
            }),
            stroke: new Stroke({
              color: "#FFFF99",
              width: 2,
            }),
          }),
        });

        iconFeature.setStyle(iconStyle);

        var vectorSource = new VectorSource({
          features: [iconFeature],
        });

        var vectorLayer = new VectorLayer({
          source: vectorSource,
        });
        vectorLayers.push(vectorLayer);
        console.log(vectorLayer);
        this.map ? this.map.addLayer(vectorLayer) : "";
      });

      return vectorLayers;
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
              // url: "http://t1.tianditu.gov.cn/img_w/wmts?tk=bfb24fe35edaeceaf671d25cb0ec37b3",
              // url:"http://t3.tianditu.com/DataServer?T=img_w&tk=bfb24fe35edaeceaf671d25cb0ec37b3&x={x}&y={y}&l={z}",
            }),
          }),
          // ...this.pointerInit(),
        ],
        view: new View({
          center: transform([116.4551, 40.2539], "EPSG:4326", "EPSG:900913"),
          zoom: 1,
        }),
      });
      map.on("pointermove", (evt) => {
        if (evt.dragging) {
          return;
        }
        var feature = map.forEachFeatureAtPixel(evt.pixel, function(feature) {
          return feature;
        });
        if (feature) {
          var pixel = map.getEventPixel(evt.originalEvent);
          this.text = feature.values_.data;
          this.pointer = true;
          this.x = pixel[0];
          this.y = pixel[1];
        } else {
          this.pointer = false;
        }
      });
      this.map = map;
      //   this.pinit(map);
    },
  },
};
</script>

<style scoped lang="less">
.map-wrap,
.map {
  position: relative;
  width: 100%;
  height: 100%;
}

.card {
  position: absolute;
  z-index: 11111111;
  left: 0px;
  top: 0px;
}
</style>
