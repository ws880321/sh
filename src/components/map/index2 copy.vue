<template>
  <div class="wrap" style="height: 100%; width: 100%">
    <l-map v-if="showMap" :zoom="zoom" :center="center" :options="mapOptions" @update:center="centerUpdate" ref="myMap" @ready="doSomethingOnReady()"
      @update:zoom="zoomUpdate">
      <l-tile-layer :url="url" />
      <l-marker :lat-lng="[47.413220, -1.189482]">
        <l-icon
                class-name="someExtraClass">
        <div class="headline">123123</div>
        <img src="/images/layers.png">
        </l-icon>
    </l-marker>
    </l-map>
  </div>
</template>
<script>
  //https://vue2-leaflet.netlify.app/components/LMap.html#demo
  import { latLng } from "leaflet";
  import L from "leaflet";
  import { LMap, LTileLayer, LMarker, LIcon } from "vue2-leaflet";
  import '../../assets/js/leafEcharts.js'
 var worldGeoCoordMap = {
		'美国蒙特里': [-121.874729,36.541478 ],
		'荷兰奥特芬': [5.057415,52.735095 ],
		'中国上海': [121.4648, 31.2891]
	};
	var worldDatas = [
		[{
			name: '美国蒙特里',
			value: 0
		}],	[{
			name: "荷兰奥特芬",
			value: 0
		}],	[{
			name: '中国上海',
			value: 0
		}]
	];

	var convertData = function(data) {
		var res = [];
		for(var i = 0; i < data.length; i++) {
			var dataItem = data[i];
			var fromCoord = worldGeoCoordMap[dataItem[0].name];
			var toCoord = [121.4648, 31.2891];
			if(fromCoord && toCoord) {
				res.push([{
					coord: fromCoord,
					value: dataItem[0].value
				}, {
					coord: toCoord,
				}]);
			}
		}
		return res;
	};
	var series = [];
	[['中国上海', worldDatas]].forEach(function(item, i) {
		series.push({
				type: 'lines',
				zlevel: 2,
				effect: {
					show: true,
					period: 4, //箭头指向速度，值越小速度越快
					trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
					symbol: 'arrow', //箭头图标
					symbolSize: 5, //图标大小
				},
				lineStyle: {
					normal: {
						width: 1, //尾迹线条宽度
						opacity: 1, //尾迹线条透明度
						curveness: .3 //尾迹线条曲直度
					}
				},
				data: convertData(item[1])
			}, {
				type: 'effectScatter',
				coordinateSystem: 'geo',
				zlevel: 2,
				rippleEffect: { //涟漪特效
					period: 4, //动画时间，值越小速度越快
					brushType: 'stroke', //波纹绘制方式 stroke, fill
					scale: 4 //波纹圆环最大限制，值越大波纹越大
				},
				label: {
					normal: {
						show: true,
						position: 'right', //显示位置
						offset: [5, 0], //偏移设置
						formatter: function(params){//圆环显示文字
							return params.data.name;
						},
						fontSize: 13
					},
					emphasis: {
						show: true
					}
				},
				symbol: 'circle',
				symbolSize: function(val) {
					return 5+ val[2] * 5; //圆环大小
				},
				itemStyle: {
					normal: {
						show: false,
						color: '#f00'
					}
				},
				data: item[1].map(function(dataItem) {
					return {
						name: dataItem[0].name,
						value: worldGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
					};
				}),
			},
			//被攻击点
			{
				type: 'scatter',
				coordinateSystem: 'geo',
				zlevel: 2,
				rippleEffect: {
					period: 4,
					brushType: 'stroke',
					scale: 4
				},
				label: {
					normal: {
						show: true,
						position: 'right',
						//offset:[5, 0],
						color: '#0f0',
						formatter: '{b}',
						textStyle: {
							color: "#0f0"
						}
					},
					emphasis: {
						show: true,
						color: "#f60"
					}
				},
				symbol: 'pin',
				symbolSize: 50,
				data: [{
					name: item[0],
					value: worldGeoCoordMap[item[0]].concat([10]),
				}],
			}
		);
	});
  export default {
    name: "Example",
    components: {
      LMap,
      LTileLayer,
      LMarker,
      LIcon
    },
    data() {
      return {
        zoom: 2,
        center: latLng(0,0),
        url: 'https://webst01.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
        showParagraph: false,
        mapOptions: {
		  zoomControl:false,
		  attributionControl:true,
		  minZoom:2,
		//   dragging:false
        },
        showMap: true,
        option:{
		geo: {
			map: 'world',
			center: [0,0],
			zoom:1,
			left: 0, top: 0, right: 0, bottom: 0,
			boundingCoords: [
				// 定位左上角经纬度
				[-180, 90],
				// 定位右下角经纬度
				[180, -90]
			],
			layoutCenter: ['100%', '100%'],
			layoutSize:[100,100],
			label: {
				emphasis: {
					show: false
				}
			},
			roam: false, //是否允许缩放
			itemStyle: {
				normal: {
					color: 'rgba(51, 69, 89, 1)', //地图背景色
					borderColor: '#516a8900', //省市边界线00fcff 516a89
					borderWidth: 1
				},
				emphasis: {
					color: 'rgba(37, 43, 61, 0)' //悬浮背景
				}
			}
		},
		series: series
	}
      };
    },
    mounted() {
      // console.log(image)
    },
    methods: {
        doSomethingOnReady(){
            this.map = this.$refs.myMap.mapObject
            setTimeout(()=>{
                L.overlayEcharts(this.option).addTo(this.map);
            },1000)

        },
      zoomUpdate(zoom) {
        this.currentZoom = zoom;
      },
      centerUpdate(center) {
        this.currentCenter = center;
      },
      showLongText() {
        this.showParagraph = !this.showParagraph;
      },
      innerClick() {
        alert("Click!");
      }
    }
  };
</script>