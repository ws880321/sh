<template>
  <div class="map" ref="map" id="map"></div>
</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import { OLWMTSConstants } from "./OLWMTSConstants";
import XYZ from "ol/source/XYZ";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import olprojProjection from "ol/proj/Projection";
import olsourceVectorTile from "ol/source/VectorTile";
import olFeature from "ol/Feature";
import olformatMVT from "ol/format/MVT";
import ollayerVectorTile from "ol/layer/VectorTile";
import olstyleStyle from "ol/style/Style";
import olstyleFill from "ol/style/Fill";
import olstyleStroke from "ol/style/Stroke";
import olstyleCircle from "ol/style/Circle";
import echarts from "echarts";
import ADLayer from "openlayers_echart";

export default {
  data() {
    return {
      option: {
        geo: {
          map: "world",
          label: {
            emphasis: {
              show: false,
            },
          },
          roam: false, //是否允许缩放
          itemStyle: {
            normal: {
              color: "rgba(51, 69, 89, 1)", //地图背景色
              borderColor: "#516a8900", //省市边界线00fcff 516a89
              borderWidth: 1,
            },
            emphasis: {
              color: "rgba(37, 43, 61, 1)", //悬浮背景
            },
          },
        },
        series: series,
      },
      echarts,
    };
  },
  mounted() {
    this.mapInit();
  },
  methods: {
    getECOption() {
      var geoCoordMap = {
        上海: [121.4648, 31.2891],
        东莞: [113.8953, 22.901],
        东营: [118.7073, 37.5513],
        中山: [113.4229, 22.478],
        临汾: [111.4783, 36.1615],
        临沂: [118.3118, 35.2936],
        丹东: [124.541, 40.4242],
        丽水: [119.5642, 28.1854],
        乌鲁木齐: [87.9236, 43.5883],
        佛山: [112.8955, 23.1097],
        保定: [115.0488, 39.0948],
        兰州: [103.5901, 36.3043],
        包头: [110.3467, 41.4899],
        北京: [116.4551, 40.2539],
        北海: [109.314, 21.6211],
        南京: [118.8062, 31.9208],
        南宁: [108.479, 23.1152],
        南昌: [116.0046, 28.6633],
        南通: [121.1023, 32.1625],
        厦门: [118.1689, 24.6478],
        台州: [121.1353, 28.6688],
        合肥: [117.29, 32.0581],
        呼和浩特: [111.4124, 40.4901],
        咸阳: [108.4131, 34.8706],
        哈尔滨: [127.9688, 45.368],
        唐山: [118.4766, 39.6826],
        嘉兴: [120.9155, 30.6354],
        大同: [113.7854, 39.8035],
        大连: [122.2229, 39.4409],
        天津: [117.4219, 39.4189],
        太原: [112.3352, 37.9413],
        威海: [121.9482, 37.1393],
        宁波: [121.5967, 29.6466],
        宝鸡: [107.1826, 34.3433],
        宿迁: [118.5535, 33.7775],
        常州: [119.4543, 31.5582],
        广州: [113.5107, 23.2196],
        廊坊: [116.521, 39.0509],
        延安: [109.1052, 36.4252],
        张家口: [115.1477, 40.8527],
        徐州: [117.5208, 34.3268],
        德州: [116.6858, 37.2107],
        惠州: [114.6204, 23.1647],
        成都: [103.9526, 30.7617],
        扬州: [119.4653, 32.8162],
        承德: [117.5757, 41.4075],
        拉萨: [91.1865, 30.1465],
        无锡: [120.3442, 31.5527],
        日照: [119.2786, 35.5023],
        昆明: [102.9199, 25.4663],
        杭州: [119.5313, 29.8773],
        枣庄: [117.323, 34.8926],
        柳州: [109.3799, 24.9774],
        株洲: [113.5327, 27.0319],
        武汉: [114.3896, 30.6628],
        汕头: [117.1692, 23.3405],
        江门: [112.6318, 22.1484],
        沈阳: [123.1238, 42.1216],
        沧州: [116.8286, 38.2104],
        河源: [114.917, 23.9722],
        泉州: [118.3228, 25.1147],
        泰安: [117.0264, 36.0516],
        泰州: [120.0586, 32.5525],
        济南: [117.1582, 36.8701],
        济宁: [116.8286, 35.3375],
        海口: [110.3893, 19.8516],
        淄博: [118.0371, 36.6064],
        淮安: [118.927, 33.4039],
        深圳: [114.5435, 22.5439],
        清远: [112.9175, 24.3292],
        温州: [120.498, 27.8119],
        渭南: [109.7864, 35.0299],
        湖州: [119.8608, 30.7782],
        湘潭: [112.5439, 27.7075],
        滨州: [117.8174, 37.4963],
        潍坊: [119.0918, 36.524],
        烟台: [120.7397, 37.5128],
        玉溪: [101.9312, 23.8898],
        珠海: [113.7305, 22.1155],
        盐城: [120.2234, 33.5577],
        盘锦: [121.9482, 41.0449],
        石家庄: [114.4995, 38.1006],
        福州: [119.4543, 25.9222],
        秦皇岛: [119.2126, 40.0232],
        绍兴: [120.564, 29.7565],
        聊城: [115.9167, 36.4032],
        肇庆: [112.1265, 23.5822],
        舟山: [122.2559, 30.2234],
        苏州: [120.6519, 31.3989],
        莱芜: [117.6526, 36.2714],
        菏泽: [115.6201, 35.2057],
        营口: [122.4316, 40.4297],
        葫芦岛: [120.1575, 40.578],
        衡水: [115.8838, 37.7161],
        衢州: [118.6853, 28.8666],
        西宁: [101.4038, 36.8207],
        西安: [109.1162, 34.2004],
        贵阳: [106.6992, 26.7682],
        连云港: [119.1248, 34.552],
        邢台: [114.8071, 37.2821],
        邯郸: [114.4775, 36.535],
        郑州: [113.4668, 34.6234],
        鄂尔多斯: [108.9734, 39.2487],
        重庆: [107.7539, 30.1904],
        金华: [120.0037, 29.1028],
        铜川: [109.0393, 35.1947],
        银川: [106.3586, 38.1775],
        镇江: [119.4763, 31.9702],
        长春: [125.8154, 44.2584],
        长沙: [113.0823, 28.2568],
        长治: [112.8625, 36.4746],
        阳泉: [113.4778, 38.0951],
        青岛: [120.4651, 36.3373],
        韶关: [113.7964, 24.7028],
      };

      var BJData = [
        [{ name: "北京" }, { name: "上海", value: 95 }],
        [{ name: "北京" }, { name: "广州", value: 90 }],
        [{ name: "北京" }, { name: "大连", value: 80 }],
        [{ name: "北京" }, { name: "南宁", value: 70 }],
        [{ name: "北京" }, { name: "南昌", value: 60 }],
        [{ name: "北京" }, { name: "拉萨", value: 50 }],
        [{ name: "北京" }, { name: "长春", value: 40 }],
        [{ name: "北京" }, { name: "包头", value: 30 }],
        [{ name: "北京" }, { name: "重庆", value: 20 }],
        [{ name: "北京" }, { name: "常州", value: 10 }],
      ];

      var SHData = [
        [{ name: "上海" }, { name: "包头", value: 95 }],
        [{ name: "上海" }, { name: "昆明", value: 90 }],
        [{ name: "上海" }, { name: "广州", value: 80 }],
        [{ name: "上海" }, { name: "郑州", value: 70 }],
        [{ name: "上海" }, { name: "长春", value: 60 }],
        [{ name: "上海" }, { name: "重庆", value: 50 }],
        [{ name: "上海" }, { name: "长沙", value: 40 }],
        [{ name: "上海" }, { name: "北京", value: 30 }],
        [{ name: "上海" }, { name: "丹东", value: 20 }],
        [{ name: "上海" }, { name: "大连", value: 10 }],
      ];

      var GZData = [
        [{ name: "广州" }, { name: "福州", value: 95 }],
        [{ name: "广州" }, { name: "太原", value: 90 }],
        [{ name: "广州" }, { name: "长春", value: 80 }],
        [{ name: "广州" }, { name: "重庆", value: 70 }],
        [{ name: "广州" }, { name: "西安", value: 60 }],
        [{ name: "广州" }, { name: "成都", value: 50 }],
        [{ name: "广州" }, { name: "常州", value: 40 }],
        [{ name: "广州" }, { name: "北京", value: 30 }],
        [{ name: "广州" }, { name: "北海", value: 20 }],
        [{ name: "广州" }, { name: "海口", value: 10 }],
      ];

      var planePath =
        "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = geoCoordMap[dataItem[0].name];
          var toCoord = geoCoordMap[dataItem[1].name];
          if (fromCoord && toCoord) {
            res.push({
              fromName: dataItem[0].name,
              toName: dataItem[1].name,
              coords: [fromCoord, toCoord],
            });
          }
        }
        return res;
      };

      var color = ["#a6c84c", "#ffa022", "#46bee9"];
      var series = [];
      [["北京", BJData], ["上海", SHData], ["广州", GZData]].forEach(function(
        item,
        i
      ) {
        series.push(
          {
            name: item[0] + " Top10",
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
                color: color[i],
                width: 0,
                curveness: 0.2,
              },
            },
            data: convertData(item[1]),
          },
          {
            name: item[0] + " Top10",
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
                color: color[i],
                width: 1,
                opacity: 0.4,
                curveness: 0.2,
              },
            },
            data: convertData(item[1]),
          },
          {
            name: item[0] + " Top10",
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
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
              return val[2] / 8;
            },
            itemStyle: {
              normal: {
                color: color[i],
              },
            },
            data: item[1].map(function(dataItem) {
              return {
                name: dataItem[1].name,
                value: geoCoordMap[dataItem[1].name].concat([
                  dataItem[1].value,
                ]),
              };
            }),
          }
        );
      });

      return {
        tooltip: {
          trigger: "item",
        },
        series: series,
      };
    },
    move(map) {
      var oe = new ADLayer(this.getECOption(), map, echarts);
      oe.render();
    },
    pbfLayer() {
      var initStyle = new olstyleStyle({
        // fill: new olstyleFill({
        //     color: '#12563b'

        // }),
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
        code: "EPSG:3857",
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
    mapInit() {
      let map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: new XYZ({
              url: "http://222.128.56.122:8081/wordIMG/{z}/{x}/{y}.jpg",
            }),
          }),
          //   this.pbfLayer(),
        ],
        view: new View({
          center: [0, 0],
          zoom: 3,
        }),
      });
      this.move(map, echarts);
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
