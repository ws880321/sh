<template>
  <div class="map" ref="map" id="map"></div>
</template>

<script>
import L from "leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import "leaflet.chinatmsproviders";
import img from '../../assets/images/测点icon_默认.svg';
import img2 from '../../assets/images/测点图片.png';
import {getPlantIotMonitorByEquipmentCode} from '../../assets/js/plantApi.js';
export default {
  name: "soilmap",
  props:['data'],
  data(){
    return{
      map:null,
      layers:null
    }
  },
  watch: {
    data:function(v){
      this.creatPointer(v) 
    }
  },
  components: {},
  methods:{
    initMap(){
      let _this=this
      this.map = L.map(this.$refs.map, {
          zoomControl: false
        }).setView([31.16292098005371, 118.2939404357909], 17);
        L.tileLayer
          .chinaProvider("TianDiTu.Satellite.Map", { maxZoom: 18, minZoom: 1 })
          .addTo( this.map);
        var watercolor = L.tileLayer(
          "http://t0.tianditu.gov.cn/img_w/wmts?tk=327b3b70173ba08945326ea32bcbbef4"
        ).addTo( this.map);
        let layers=L.geoJson(dk, {
          onEachFeature: function(feature, layer) {
            layer.bindTooltip(""+feature.properties.Plot_code).openTooltip();
            layer.on('click',(e)=>{
                console.log(e);
              _this.$emit('dKlclick',feature.properties.Plot_code)
                layers.eachLayer(v=>{
                v.setStyle({
                  fillColor: "#E02020", //填充颜
                  color: "#E02020",
                })
              })
              layer.setStyle({
                fillColor: "#ff9900", //填充颜
                color: "#ff9900",
              })
            })
          },
          style: function(feature) {
            return {
              fillColor: "#E02020", //填充颜
              color: "#E02020",
              opacity: 1,
              fillOpacity: 0.3,
              weight: 1
            };
          }
        }).addTo( this.map);
    },
    creatPointer(data){
        var myIcon = L.icon({
            iconUrl: img,
            iconSize: [50, 50],
            className:'iconn',
            opacity:0.8
        });
        var myIcon2 = L.icon({
            iconUrl: img,
            iconSize: [50, 50],
            className:'iconn2',
            opacity:0.8
        });
		var myIcon3 = L.icon({
		    iconUrl: img,
		    iconSize: [50, 50],
		    className:'iconn3',
		    opacity:0.8
		});
        function resetIcon(){
           a.setIcon(myIcon)
           a1.setIcon(myIcon)
           a2.setIcon(myIcon)
        }
		getPlantIotMonitorByEquipmentCode('704991c7e053')
		    .then((response) => {
				if(response.datas.plantIotMonitor.length){
					let a=L.marker([31.16315, 118.293304], {icon: myIcon}).addTo(this.map)
				}else{
					let a=L.marker([31.16315, 118.293304], {icon: myIcon3}).addTo(this.map)
				}
		    })
		    .catch((error) => {
		        console.error(error);
		    });
			getPlantIotMonitorByEquipmentCode('7015ff6fc479')
			    .then((response) => {
					if(response.datas.plantIotMonitor.length){
        let a1=L.marker([31.16356, 118.289696], {icon: myIcon}).addTo(this.map);
					}else{
        let a1=L.marker([31.16356, 118.289696], {icon: myIcon3}).addTo(this.map);
					}
			    })
			    .catch((error) => {
			        console.error(error);
			    });
				getPlantIotMonitorByEquipmentCode('708ba938827b')
				    .then((response) => {
						if(response.datas.plantIotMonitor.length){
							
							let a2=L.marker([31.16491, 118.292584], {icon: myIcon}).addTo(this.map);
						}else{
        let a2=L.marker([31.16491, 118.292584], {icon: myIcon3}).addTo(this.map);
						}
				    })
				    .catch((error) => {
				        console.error(error);
				    });
        // let a=L.marker([31.16315, 118.293304], {icon: myIcon}).addTo(this.map)
        // let a1=L.marker([31.16356, 118.289696], {icon: myIcon}).addTo(this.map);
        // let a2=L.marker([31.16491, 118.292584], {icon: myIcon}).addTo(this.map);
        // let a2=L.marker([31.16172423164175,118.29050302505495], {icon: myIcon}).addTo(this.map);
        a.on('click',()=>{
          resetIcon()
          a.setIcon(myIcon2)
           this.$emit('pointerClick','704991c7e053')
        })
        a1.on('click',()=>{
           resetIcon()
           a1.setIcon(myIcon2)
           this.$emit('pointerClick','7015ff6fc479')
        })
        a2.on('click',()=>{
           resetIcon()
            a2.setIcon(myIcon2)
           this.$emit('pointerClick','708ba938827b')
        })
        // a2.on('click',()=>{
        //    this.$emit('pointerClick',' 704991c7e053')
        // })
    },
    creatHtml(data){
      return   `
       <div class='plant-popup-box'>
            <div class='title'>
                <img src="${img2}"/>
                <p>
                    <span>安徽芜湖试验田01测点</span>
                    <small>2018-06-20  12:10</small>
                </p>
            </div>
            <div class='popup-body'>
                <div class='item'>
                    <span>32℃</span>
                    <span>空气温度</span>
                </div>
                <div class='item'>
                    <span>32℃</span>
                    <span>空气温度</span>
                </div>
                <div class='item'>
                    <span>32℃</span>
                    <span>空气温度</span>
                </div>
                <div class='item'>
                    <span>32℃</span>
                    <span>空气温度</span>
                </div>
                <div class='item'>
                    <span>32℃</span>
                    <span>空气温度</span>
                </div>
                <div class='item'>
                    <span>32℃</span>
                    <span>空气温度</span>
                </div>
            </div>
        </div>
        `
    }
  },
  mounted() {
   this.initMap()
   this.creatPointer()

    let layers = [];
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  position: relative;
  width: 100%;
  flex: 1;
  max-height: 100%;
}
</style>
<style lang="less">
.plant-popup-box{
    display:flex;
    flex-direction: column;
    width:200px;
    .title{
        display: flex;
        align-items:center;
        
        img{
            width:30px;
            height:30px;
            margin-right:10px;
        }
        p{
            display:flex;
            flex-direction: column;
            font-size: 14px;
            color: rgba(0,0,0,0.85);
            small{
                font-size: 12px;
                color: rgba(0,0,0,0.45);
            }
        }
    }

    .popup-body{
        display: flex;
        flex-wrap:wrap;
        justify-content: space-between;
        .item{
            width:60px;
            height:60px;
            display:flex;
            align-items: center;
            flex-direction:column;
            span{
                font-size: 16px;
                color: rgba(0,0,0,0.85);
            }
            span:nth-child(2){
                font-size: 12px;
                color: rgba(0,0,0,0.45);
            }
        }

    }
}

</style>
<style>
  .iconn2{
  width: 60px!important;
  height: 60px!important;
  }
  .iconn3{
  width: 60px!important;
  height: 60px!important;
  filter: grayscale(100%);
  }
</style>
