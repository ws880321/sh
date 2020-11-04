<template>
  <div class="map" ref="map" id="map"></div>
</template>

<script>
import L from "leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import "leaflet.chinatmsproviders";
import img from '../../assets/images/采集样点icon.svg';
import img2 from '../../assets/images/测点图片.png';
import {
    getPestInfoByActDateAndECode

} from '../../assets/js/pestApi';
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
              _this.$emit('dKlclick',feature.properties.Plot_code)
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
        });
		var myIcon2 = L.icon({
		    iconUrl: img,
		    iconSize: [50, 50],
            className:'iconn2',
		});
		
		let day=new Date().toLocaleDateString().replace(/\//g,'-')
		getPestInfoByActDateAndECode(day, 865650040894798).then(res=>{
			if(res.datas.PestInfoLogTrend.length){
				L.marker([31.16425420, 118.29357057], {icon: myIcon}).on('click',(e)=>{
				 this.$emit('pointerClick','865650040894798')
				}).addTo(this.map); 
			}else{
				L.marker([31.16425420, 118.29357057], {icon: myIcon2}).on('click',(e)=>{
				 this.$emit('pointerClick','865650040894798')
				}).addTo(this.map); 
			}
		})
		getPestInfoByActDateAndECode(day, 865650041007838).then(res=>{
			if(res.datas.PestInfoLogTrend.length){
				L.marker([31.16453155, 118.29033434], {icon: myIcon}).on('click',(e)=>{
				 this.$emit('pointerClick','865650041007838')
				}).addTo(this.map);
			}else{
				L.marker([31.16453155, 118.29033434], {icon: myIcon2}).on('click',(e)=>{
				 this.$emit('pointerClick','865650041007838')
				}).addTo(this.map);
			}
		})
		getPestInfoByActDateAndECode(day, 865650041090289).then(res=>{
			if(res.datas.PestInfoLogTrend.length){
				L.marker([31.16161205, 118.29142225], {icon: myIcon}).on('click',(e)=>{
				 this.$emit('pointerClick','865650041090289')
				}).addTo(this.map);
			}else{
				L.marker([31.16161205, 118.29142225], {icon: myIcon2}).on('click',(e)=>{
				 this.$emit('pointerClick','865650041090289')
				}).addTo(this.map);
			}
		})
		
       
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
	.iconn2{
		filter: grayscale(100%);
	}
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
