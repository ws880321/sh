<template>
  <div class="map" ref="map" id="map"></div>
</template>

<script>
import L from "leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import "leaflet.chinatmsproviders";
import "geotiff-layer-leaflet/dist/geotiff-layer-leaflet";
import "../../assets/js/plotty.js";
export default {
  name: "soilmap",
  props: {
    data:{
      type:String,
      default:()=>{
        return "tif/avaN_a.tif"
      }
    }
  },
  data() {
    return {
      map: null,
      layers: null,
      URL:'http://47.94.15.166:7005/nybdata/u/www/201908/20190809202640j9hk.tif'
    };
  },
  watch: {
    data: function(v) {
		console.log(v)
        this.creatHeat(v)
    }
  },
  components: {},
  methods: {
    initMap() {
      let _this = this;
      this.map = L.map(this.$refs.map, {
        zoomControl: false
      }).setView([31.16292098005371, 118.2939404357909], 17);
      L.tileLayer
        .chinaProvider("TianDiTu.Satellite.Map", { maxZoom: 18, minZoom: 1 })
        .addTo(this.map);
      var watercolor = L.tileLayer(
        "http://t0.tianditu.gov.cn/img_w/wmts?tk=327b3b70173ba08945326ea32bcbbef4"
      ).addTo(this.map);
      let layers=L.geoJson(dk, {
        onEachFeature: function(feature, layer) {
          layer.bindTooltip(""+feature.properties.Plot_code).openTooltip();
          layer.on("click", e => {
            _this.$emit("dKlclick", feature.properties.Plot_code);
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
          });
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
      }).addTo(this.map);
      // const cloudmask = new L.LeafletGeotiff("tif/avaN_a.tif", {
      //   band: 0,
      //   opacity: 1,
      //   renderer: new L.LeafletGeotiff.Plotty({
      //       colorScale: 'ccc',
      //       image:'http://47.94.15.166:7005/nybdata/u/www/201908/20190809202640j9hk.tif',
      //       clampLow: false,
      //       clampHigh: true,
      //       displayMin: 40,
      //       displayMax: 160
      //   })
      // }).addTo(this.map);

    },
    creatHeat(data) {
      if (this.layers) {
        this.layers.remove();
        //   this.map.remove(this.layers)
      }
      this.layers= new L.LeafletGeotiff(data, {
        opacity: 1,
        renderer: new L.LeafletGeotiff.Plotty({
            band:1,
            colorScale: 'ccc2',
            // image:data,
            clampLow: false,
            clampHigh: true,
            displayMin: 52,
            displayMax: 160
        })
      }).addTo(this.map);
    }
  },
  mounted() {
    this.initMap();
    this.creatHeat(this.URL)
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
</style>
