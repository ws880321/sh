<template>
  <div class="map" ref="map" id="map"></div>
</template>

<script>
import L from "leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import "leaflet.chinatmsproviders";
export default {
  name: "soilmap",
  props:['data'],
  data(){
    return{
      map:null,
      layers:null,
      soil_plot_code:''
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
        let flag=false
        let layers=L.geoJson(dk, {
          onEachFeature: function(feature, layer) {
            layer.bindTooltip(""+feature.properties.Plot_code).openTooltip();
            layer.on('click',(e)=>{
               L.DomEvent.stopPropagation(e);
              layers.eachLayer(v=>{
                v.setStyle({
                  fillColor: "#E02020", //填充颜
                  color: "#E02020",
                })
              })
              _this.$emit('dKlclick',feature.properties.Plot_code)
              setTimeout(()=>{
                layer.setStyle({
                  fillColor: "#ff9900", //填充颜
                  color: "#ff9900",
                })
              },10)
              // layer.bindTooltip('123123')
              // layer.on('mouseover',()=>{
              //   layer.openTooltip()
              // })
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

        let that=this
        this.map.on('click',function(e){
           console.log(layers.hasLayer(e.target),2222)
             that.$emit('resetFn')
            layers.eachLayer(v=>{
                v.setStyle({
                  fillColor: "#E02020", //填充颜
                  color: "#E02020",
                })
              })
          // }
        })
    },
    creatPointer(data){
      this.soil_plot_code=data[0].soil_plot_code;
      this.$emit('getdkcode',this.soil_plot_code)
      if (this.layers) {
        this.layers.remove()
      //   this.map.remove(this.layers)
      }
     let arr=data.map(v=>v.val)
     let max=Math.max.apply(null,arr)
     let min=Math.min.apply(null,arr)
     let _this=this
      this.layers=L.geoJson(pointerdata, {
        onEachFeature: function(feature, layer) {
          let pdata=data.find(v => {
            return v.col_point_code==feature.properties.Name
          });
          let value=pdata?pdata.val.toFixed(2):0
          let ratio=(value/max).toFixed(2)>0.1?(value/max).toFixed(2):0.1;
          var myIcon = L.divIcon({ className: "new-icon" ,html:'<div><span class="icon" style="transform: scale('+ratio+')"></span>'+value+'</div>'});
          layer.setIcon(myIcon);
          layer.on('click',(e)=>{
            _this.$emit('pointerClick',feature.properties.Name)
          })
        }
      }).addTo(this.map);
    }
  },
  mounted() {
   this.initMap()

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
<style>
.new-icon {
 display: flex;
 flex-direction: column;
 text-align: center;
 align-items: center;
 align-content: center;
 color: rgba(255,255,255,0.7);
 box-sizing: border-box;
  
}
.new-icon>div{
  height: 50px;
  box-sizing: border-box;
   display: flex;
 flex-direction: column;
 text-align: center;
 align-items: center;
 align-content: center;
}
 .new-icon .icon{
   display: inline-block;
    width: 25px;
    height: 25px;
    background: #ffc500;
    border: 1px solid #fff;
    border-radius: 50%;
    background-image: none;
  }

</style>
