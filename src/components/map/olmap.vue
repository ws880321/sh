<template>
  <div class="map" ref="map" id="map"></div>
</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { OLWMTSConstants } from "./OLWMTSConstants";
import XYZ from "ol/source/XYZ";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import olprojProjection from "ol/proj/Projection";
import olsourceVectorTile from "ol/source/VectorTile";
import olFeature from "ol/Feature";
import { defaults } from "ol/control";
import olformatMVT from "ol/format/MVT";
import ollayerVectorTile from "ol/layer/VectorTile";
import olstyleStyle from "ol/style/Style";
import olstyleFill from "ol/style/Fill";
import olstyleStroke from "ol/style/Stroke";
import olstyleCircle from "ol/style/Circle";
import echarts from "echarts";
import ADLayer from "openlayers_echart";
import { transform } from "ol/proj";

export default {
  data() {
    return {};
  },
  mounted() {},
  props: {
    type: {
      type: String,
      default: () => {
        return "line";
      },
    },
    data: {
      type: Array,
      default: () => {
        return [
          {
            name: "北京",
            tag: "116.4551, 40.2539",
            value: 145,
          },
          {
            name: "上海",
            tag: "121.4648, 31.2891",
            value: 145,
          },
        ];
      },
    },
  },
  watch: {
    data: function(v) {
      if (v.length > 0) {
        console.log(v, 99);
        let coordsdata = [];
        v.map((v, index) => {
          if (index > 0) {
            coordsdata.push({
              coords: [
                transform(v.tag.split(","), "EPSG:4326", "EPSG:900913"),
                transform([116.4551, 40.2539], "EPSG:4326", "EPSG:900913"),
              ],
            });
          }
        });
        this.mapInit(coordsdata);
      }
    },
  },

  methods: {
    series(type, data) {
      var planePath =
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
      var color = ["#a6c84c", "#ffa022", "#46bee9"];
      let lineSeries = [
        {
          type: "lines",
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: "#fff",
            symbolSize: 3,
          },
          lineStyle: {
            normal: {
              color: color[0],
              width: 0,
              curveness: 0.2,
            },
          },
          data: data,
        },
        {
          type: "lines",
          zlevel: 2,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15,
          },
          lineStyle: {
            normal: {
              color: color[0],
              width: 1,
              opacity: 0.4,
              curveness: 0.2,
            },
          },
          data: data,
        },
      ];
      let pointSeries = [
        {
          type: "effectScatter",
          zlevel: 3,
          rippleEffect: {
            brushType: "stroke",
          },
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: "{b}",
            },
          },
          symbolSize: function(val) {
            let v = 4 + val[2] / 10;
            if (v > 18) {
              return 18;
            } else if (v > 10 && v < 18) {
              return v;
            } else {
              return 10;
            }
          },
          itemStyle: {
            normal: {
              color: color[0],
            },
          },
          data: this.data.map((dataItem) => {
            return {
              name: dataItem.name,
              value: transform(
                dataItem.tag.split(","),
                "EPSG:4326",
                "EPSG:900913"
              ).concat([dataItem.value]),
            };
          }),
        },
        {
          type: "effectScatter",
          zlevel: 3,
          rippleEffect: {
            brushType: "stroke",
          },
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: "{b}",
            },
          },
          symbolSize: function(val) {
            return 10;
          },
          itemStyle: {
            normal: {
              color: color[0],
            },
          },
          data: [
            {
              name: "北京",
              value: [
                ...transform([116.4551, 40.2539], "EPSG:4326", "EPSG:900913"),
                100,
              ],
            },
          ],
        },
      ];
      let series = [];
      if (type == "line") {
        series = [...lineSeries, ...pointSeries];
      } else {
        series = [...pointSeries];
      }
      return series;
    },
    move(map, data) {
      var option = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            if (typeof params.value[2] == "undefined") {
              return params.name + " : " + params.value;
            } else {
              return params.name + " : " + params.value[2];
            }
          },
        },
        legend: {
          orient: "vertical",
          top: "bottom",
          left: "right",
          textStyle: {
            color: "#000000",
          },
          selectedMode: "single",
        },
        series: this.series(this.type, data),
      };
      var oe = new ADLayer(option, map, echarts);
      oe.render();
    },
    pbfLayer() {
      var initStyle = new olstyleStyle({
        stroke: new olstyleStroke({
          color: "blue",
          width: 1,
        }),
        image: new olstyleCircle({
          radius: 1,
          fill: new olstyleFill({
            color: "red",
          }),
        }),
      });
      let matrixIds = OLWMTSConstants.epsg3857_matrixIds; // ['EPSG:4326:0', 'EPSG:4326:1', 'EPSG:4326:2', 'EPSG:4326:3', 'EPSG:4326:4', 'EPSG:4326:5', 'EPSG:4326:6', 'EPSG:4326:7', 'EPSG:4326:8', 'EPSG:4326:9', 'EPSG:4326:10', 'EPSG:4326:11', 'EPSG:4326:12', 'EPSG:4326:13', 'EPSG:4326:14', 'EPSG:4326:15', 'EPSG:4326:16', 'EPSG:4326:17', 'EPSG:4326:18', 'EPSG:4326:19', 'EPSG:4326:20', 'EPSG:4326:21'];
      let projection = new olprojProjection({
        code: "EPSG:4326",
        units: "m",
        axisOrientation: "neu",
      });

      let resolutions = OLWMTSConstants.epsg3857_resolutionsEx; //[0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125, 0.0054931640625, 0.00274658203125, 0.001373291015625, 6.866455078125E-4, 3.4332275390625E-4, 1.71661376953125E-4, 8.58306884765625E-5, 4.291534423828125E-5, 2.1457672119140625E-5, 1.0728836059570312E-5, 5.364418029785156E-6, 2.682209014892578E-6, 1.341104507446289E-6, 6.705522537231445E-7, 3.3527612686157227E-7];
      let pbfUrl = "/qqbjx/tile/{z}/{x}/{y}.pbf";
      let olSource = new olsourceVectorTile({
        url: pbfUrl,
        format: new olformatMVT({ featureClass: olFeature }),
        projection: projection,
        tileGrid: new WMTSTileGrid({
          tileSize: OLWMTSConstants.tileSize, // [256, 256],
          origin: OLWMTSConstants.epsg3857_origin, // [-180.0, 90.0],
          resolutions: resolutions,
          matrixIds: matrixIds,
        }),
        wrapX: true,
        tileUrlFunction: function(tileMarker, pixelRatio, proj) {
          if (!tileMarker) return;

          let tileUrl = pbfUrl
            .replace("{z}", String(tileMarker[0]))
            .replace("{x}", String(Math.abs(tileMarker[1])))
            .replace("{y}", String(Math.abs(tileMarker[2] + 1)));
          return tileUrl;
        },
      });

      //创建矢量瓦片图层
      let olLayer = new ollayerVectorTile({
        style: initStyle,
        source: olSource,
      });

      return olLayer;
    },
    mapInit(data) {
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

              // url:
              // "http://t3.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=56618c6e3603f212a8b25b0607b2dca1",
              // "http://webrd03.is.autonavi.com/appmaptile?size=1&scale=1&style=8&x={x}&y={y}&z={z}",
            }),
          }),
          // this.pbfLayer(),
        ],
        view: new View({
          center: transform([116.4551, 40.2539], "EPSG:4326", "EPSG:900913"),
          zoom: 3,
        }),
        projection: "EPSG:4326",
      });
      this.move(map, data);
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
