<template>
  <div class="map pestActual-map" ref="map" id="map"></div>
</template>

<script>
import L from "leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import "leaflet.chinatmsproviders";
import { china } from "../../assets/json/china.js";
import "../../assets/js/leaflet-echarts.js";
import { gradientColors } from "../../assets/js/util.js";
import img from '../../assets/images/u7137.png'
export default {
  name: "soilmap",
  props: ["ddata", "daoda"],
  data() {
    return {
      map: null,
      layers: null,
      marker: null,
      colors: gradientColors("#00BB65", "#FA6400", 101)
    };
  },
  watch: {
   ddata: function(v) {
     if (v.length>0) {
       // this.createLine(v);
      
       let item=v[v.length-1]
       if (item.city=="芜湖") {
         this.createBox((v[v.length-1].probability*100).toFixed(0)+'%')
         this.creatPointer(v[v.length-1].probability*100+'%')
       }else{
         this.createBox(0)
          this.creatPointer('0')

       }
      ;
     }
    },
    daoda: function(v) {
      // this.createBox(v);
    }
  },
  components: {},
  methods: {
    convertData(data) {
      let chinaGeoCoordMap = {
        黑龙江: [127.9688, 45.368],
        内蒙古: [110.3467, 41.4899],
        吉林: [125.8154, 44.2584],
        北京市: [116.4551, 40.2539],
        辽宁: [123.1238, 42.1216],
        河北: [114.4995, 38.1006],
        天津: [117.4219, 39.4189],
        山西: [112.3352, 37.9413],
        陕西: [109.1162, 34.2004],
        甘肃: [103.5901, 36.3043],
        宁夏: [106.3586, 38.1775],
        青海: [101.4038, 36.8207],
        新疆: [87.9236, 43.5883],
        西藏: [91.11, 29.97],
        四川: [103.9526, 30.7617],
        重庆: [108.384366, 30.439702],
        山东: [117.1582, 36.8701],
        河南: [113.4668, 34.6234],
        江苏: [118.8062, 31.9208],
        安徽: [117.29, 32.0581],
        湖北: [114.3896, 30.6628],
        浙江: [119.5313, 29.8773],
        福建: [119.4543, 25.9222],
        江西: [116.0046, 28.6633],
        湖南: [113.0823, 28.2568],
        贵州: [106.6992, 26.7682],
        云南: [102.9199, 25.4663],
        广东: [113.12244, 23.009505],
        广西: [108.479, 23.1152],
        海南: [110.3893, 19.8516],
        上海: [121.4648, 31.2891]
      };
      var res = [];
      var coords = [];
      res = data.map((v, i) => {
        if (data.length >= 1) {
          if (i > 0 && i < data.length) {
            coords.push({
              coords: [
                chinaGeoCoordMap[data[i - 1].province],
                chinaGeoCoordMap[data[i].province]
              ]
            });
          }
          return {
            name: v.province,
            value: [
              chinaGeoCoordMap[v.province][0],
              chinaGeoCoordMap[v.province][1],
              v.probability
            ]
          };
        } else {
          coords = [{ coords: [chinaGeoCoordMap[data[i].province]] }];
          res = {
            name: v.province,
            value: [
              chinaGeoCoordMap[data[i].province][0],
              chinaGeoCoordMap[data[i].province][1],
              v.probability
            ]
          };
        }
      });
      return {
        data: res,
        coords: coords
      };
    },
    initMap() {
      let _this = this;
      this.map = L.map(this.$refs.map, {
        zoomControl: false
      }).setView([31.16292098005371, 118.2939404357909], 5);
      this.map.touchZoom.disable();
      this.map.doubleClickZoom.disable();
      this.map.scrollWheelZoom.disable();

      L.tileLayer
        .chinaProvider("TianDiTu.Satellite.Map", { maxZoom: 18, minZoom: 1 })
        .addTo(this.map);
      L.tileLayer
        .chinaProvider("TianDiTu.Satellite.Annotion", {
          maxZoom: 18,
          minZoom: 1
        })
        .addTo(this.map);
      L.geoJson(china, {
        onEachFeature: function(feature, layer) {
          layer.on("click", e => {
            _this.$emit("dKlclick", feature.properties.Plot_code);
          });
        },
        style: function(feature) {
          return {
            fillColor: "blue", //填充颜
            color: "#E02020",
            opacity: 1,
            fillOpacity: 0.3,
            weight: 1
          };
        }
      }).addTo(this.map);
      this.map.on("click", e => {
        return false
      });
      
    },
    creatPointer(data){
        this.marker ? this.marker.remove() : "";
        let color=this.colors[parseInt(data)]
        let num
        parseInt(data.substring(0,data.length-1))>85?num=85:num=parseInt(data.substring(0,data.length-1))
        let des=`<defs>
        <linearGradient x1="94.016128%" y1="59.9037445%" x2="0%" y2="39.2378795%"  id="linearGradient-1">
        
            <stop stop-color="#FA6400"" stop-opacity="0.4" offset="${num}%"></stop>
            <stop stop-color="${color}"  stop-opacity="0.8" offset="100%"></stop>
        </linearGradient>
    </defs>`
        console.log(data,999999)
        console.log(num,999999)
        console.log(color,999999)
        var myIcon = L.divIcon(
          {className: 'my-div-icon',
          // iconSize:[50,100],
            iconSize: [38, 95],
    iconAnchor: [22, 94],
                    html:`<div class="my-div-icon">
                <?xml version="1.0" encoding="UTF-8"?>
<svg width="506px" height="409px" viewBox="0 0 506 409" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 53.1 (72631) - https://sketchapp.com -->
    <title>箭头-新</title>
    <desc>Created with Sketch.</desc>
    ${des}
    <g id="About-me" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="箭头-新" transform="translate(-848.000000, -507.000000)" fill="url(#linearGradient-1)" fill-rule="nonzero">
            <g transform="translate(1095.026654, 700.765296) rotate(-240.000000) translate(-1095.026654, -700.765296) translate(798.026654, 549.765296)" id="路径">
                <path d="M46.713367,29.5617503 L56.0868228,46.4802515 L1.44382792,24.6166448 C0.626416129,24.3088221 0.216112204,24.0035678 0.212916148,23.7008819 C0.209720091,23.3981961 0.613604784,23.0955102 1.42457023,22.7928243 L56.0868228,0.921512287 L46.9031859,17.4974023 C235.07023,4.50594861 417.230838,76.8769237 593.384999,234.610328 C561.032688,268.741942 540.208997,290.874655 530.913927,301.008467 C401.918234,129.23722 240.518085,38.7549823 46.7134824,29.5617558 L46.713367,29.5617503 Z"></path>
            </g>
        </g>
    </g>
</svg>
                  </div>`
          },

          );

        this.marker=L.marker([30.16425420, 108.29357057], {icon: myIcon}).on('click',(e)=>{
         this.$emit('pointerClick','865650040894798')
        }).addTo(this.map);   

    },
    createLine(data) {
      this.layers ? this.layers.remove() : "";
      var series = [
        {
          type: "lines",
          coordinateSystem: "geo",
          symbol: ["none", "triangle"],
          zlevel: 2,
          effect: {
            show: true,
            symbol: "roundRect",
            period: 2,
            delay: 100,
            trailLength: 0.6,
            symbolSize: 6
          },
          lineStyle: {
            normal: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#ed1941"
                  },
                  {
                    offset: 1,
                    color: "#ffce7b"
                  }
                ],
                globalCoord: false
              },
              width: 1,
              opacity: 0.8,
              //type: 'dotted',
              curveness: 0.2
            }
          },
          data: this.convertData(data).coords
        },
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          showEffectOn: "render",
          zlevel: 3,
          symbol: "circle",
          symbolSize: 5,
          rippleEffect: {
            brushType: "stroke",
            period: 5,
            scale: 7
          },
          label: {
            normal: {
              formatter: "{b}",
              position: "right",
              offset: [1, 6],
              show: true,
              textStyle: {
                color: "yellow"
              }
            }
          },
          itemStyle: {
            normal: {
              show: true,
              color: "yellow"
            }
          },
          data: this.convertData(data).data
        }
      ];
      let option = {
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(166, 200, 76, 0.82)",
          borderColor: "#FFFFCC",
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: "z-index:100",
          formatter: function(params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            var res = "";
            var name = params.name;
            var value = params.value[params.seriesIndex + 1];
            res =
              "<span style='color:#fff;'>" +
              name +
              "</span><br/>数据：" +
              value;
            return res;
          }
        },
        backgroundColor: "transparent",
        geo: {
          map: "china",
          zoom: 5,
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true, //是否允许缩放
          itemStyle: {
            normal: {
              color: "rgba(51, 69, 89, .5)", //地图背景色
              borderColor: "#516a89", //省市边界线00fcff 516a89
              borderWidth: 1
            },
            emphasis: {
              color: "rgba(37, 43, 61, .5)" //悬浮背景
            }
          }
        },
        series: series
      };
      this.layers = L.overlayEcharts(option).addTo(this.map);
    },
    createBox(data2) {
      let data=data2?data2:0
      let pointer = [31.353636941500987, 118.65234375000001];
      // 	var popup = L.popup()
      // .setLatLng(pointer)
      // .setContent('<p>Hello world!<br />This is a nice popup.</p>')
      // .openOn(this.map);
      L.marker(pointer)
        .addTo(this.map)
        .bindPopup(
          `
			<div class="popup-box" style='background-color:${this.colors[parseInt(data)]}'>
				<div class='inner' style='background-color:${this.colors[parseInt(data)]}'>
					<div class="top-title">到达概率：${data}</div>
					<div class="content">
					</div>
				</div>
				<div class="sjx" style='background-color:${this.colors[parseInt(data)]}'>
				</div>
			</div>
		`
        )
        .openPopup();
    }
  },
  mounted() {
    this.initMap();
    let layers = [];
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.map {
  position: relative;
  width: 100%;
  flex: 1;
  max-height: 100%;
}
</style>
<style>
.pestActual-map .leaflet-popup-content-wrapper {
  background-color: transparent;
  box-shadow: none;
}
.pestActual-map .leaflet-popup-content {
  margin: 0;
  position: relative;
}
.pestActual-map .popup-box {
  width: 144px;
  height: 124px;
  background-color: #00bb65;
  opacity: 0.9;
  border: 1px solid #ffffff;
  border-radius: 2px;
  position: relative;
  z-index: 10000;
}
.pestActual-map .inner {
  padding: 8px;
  color: #fff;
  position: relative;
  z-index: 1000;
  height: 100%;
}
.pestActual-map .inner .content {
  width: 128px;
  height: 86px;
  margin-top: 5px;
  background: url("../../assets/images/u7137.png") no-repeat center center;
  background-size: cover;
}
.pestActual-map .leaflet-popup-tip {
  background-color: #00bb65;
}
.pestActual-map .sjx {
  z-index: -1;
  background-color: #00bb65;
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: -10px;
  left: 50%;
  margin-left: -15px;
  transform: rotate(45deg);
}
.new-icon {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  align-content: center;
  color: rgba(255, 255, 255, 0.7);
  box-sizing: border-box;
}
.new-icon > div {
  height: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  align-content: center;
}
.new-icon .icon {
  display: inline-block;
  width: 25px;
  height: 25px;
  background: #ffc500;
  border: 1px solid #fff;
  border-radius: 50%;
  background-image: none;
}
.my-div-icon{
  width: 200px;
  height: 400px;
  transform-origin: 50% 50%;
}
.my-div-icon svg{
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scaleY(2) scaleX(1.5);
  }
</style>
