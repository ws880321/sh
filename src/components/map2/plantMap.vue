<template>
  <div class="map" ref="map" id="map">
  <img src="/tif/avaN_a.tif">
  </div>
</template>

<script>
import L from "leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import "leaflet.chinatmsproviders";
import "geotiff-layer-leaflet/dist/geotiff-layer-leaflet";
import "../../assets/js/plotty.js";
import axios from 'axios'
// import * as tiff from 'tiff'
// import * as utif from 'utif'
// import GeoTIFF from '../../assets/js/geotiff.bundle.min.js';

export default {
  name: "soilmap",
  props: {
    data:{
      type:String,
      default:()=>{
        return "tif/avaN_a.tif"
      }
    },
    dtime:{
      type:String,
      default:()=>{
        return "2019-07-04"
      }
    }
  },

  data() {
    return {
      map: null,
      layers: null,
      layers2: null,
      URL:'http://47.94.15.166:7005/nybdata/u/www/201908/20190809202640j9hk.tif'
    };
  },
  watch: {
    data: function(v) {
        this.creatHeat(v)
    },
    dtime: function(v) {
        console.log(v,223)
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
      this.layers2=layers
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
      //     var imageUrl = 'tif/a1.png',
      //     imageBounds =this.layers2.getBounds();
      // L.imageOverlay(imageUrl, imageBounds,{
      //   opacity:0.2
      // }).addTo(this.map);
      // axios.get('tif/20190930163047at0q.tif',{
      //     responseType: "arraybuffer",
      //   }).then(res=>{
      //     let a=utif.decode(res.data)
      //     console.log(a,9999)


      //     var ifds = utif.decode(res.data);
      //     let d=utif.decodeImage(res.data, ifds[0])
      //     var rgba  = utif.toRGBA8(ifds[0]);  // Uint8Array with RGBA pixels
      //     console.log(rgba)
      //     let y=utif.encode(ifds[0])
      //     let k=utif.encodeImage(rgba, 100, 100)
      //     console.log(y,88888)
      //     console.log(k,88888)
      //     // console.log(ifds[0].width, ifds[0].height, ifds[0]);
      //     // console.log(d);
      //     // console.log(rgba ,ifds[0].t42112[0]);
      //   //  console.log(res.data,12311111)
      //   //  // console.log(JSON.parse(res.data),12311111)
      //   //  tiff.decode(res.data,{
      //   //     size:1,
      //   //     width:1,
      //   //     height:1,
      //   //     bitsPerSample:1
      //   //  }).then(res2=>{
      //   //   console.log(res2,123)
      //   // })
      // })


    // var xhr = new XMLHttpRequest();
    // xhr.responseType = "arraybuffer";
    // // xhr.responseType = "arraybuffer";
    // var url = "/tif/avaN_a.tif"
    // // var url = "https://api.gagogroup.cn/publisher/v2/data/landuse/20180101/" + coords.z + "/" + coords.x + "/" + coords.y + "/lerc?token=" + token;
    // // var url = "https://api.gagogroup.cn/publisher/v2/data/ndvi/20170801/" + coords.z + "/" + coords.x + "/" + coords.y + "/lerc?token=" + token;
    // xhr.open("Get", url, true);
    // xhr.send();

    // // var that = this;
    // xhr.onreadystatechange = function (evt) {
    //   if (evt.target.readyState == 4 && evt.target.status == 200) {
    //     console.log(xhr.response,999)
    //     let a=tiff.pageCount(xhr.response)
        
    //     let b=tiff.decode(xhr.response)
    //     console.log(b)
    //     done(error, tile);
    //   }
    // }
     // 20190930163049sn96.tif
      let arr =[
        {
          time:'2019-07-04',
          tif:'tif/b2.tif',
          num:[52,160]
        },{
          time:'2019-07-06',
          tif:'tif/b3.tif',
          num:[0,42]
        },{
          time:'2019-07-22',
          tif:'tif/b4.tif',
          num:[-1,2]
        },{
          time:'2019-07-26',
          tif:'tif/b5.tif',
          num:[1,10]
        },{
          time:'2019-08-09',
          tif:'tif/b2.tif',
          num:[52,160]
        },{
          time:'2019-08-23',
          tif:'tif/b3.tif',
          num:[0,102]
        },{
          time:'2019-09-06',
          tif:'tif/b4.tif',
          num:[-1,2]
        },{
          time:'2019-09-19',
          tif:'tif/b5.tif',
          num:[0,10]
        },{
          time:'2019-10-20',
          tif:'tif/b2.tif',
           num:[52,160]
        },{
          time:'2019-10-29',
          tif:'tif/b3.tif',num:[0,102]
        },{
          time:'2019-10-09',
          tif:'tif/b4.tif',num:[0,2]
        }
      ]
      let currentTif;
      let url;

      arr.map(v=>{
        if (v.time==this.dtime) {
          currentTif=v
          url=v.tif
        }else{
          // url='tif/avaN_a.tif'
        }
      })
      this.layers= new L.LeafletGeotiff(data, {
        opacity: 1,
        renderer:new L.LeafletGeotiff.Plotty({
            band:0,
            colorScale: 'ccc',
             // colorScale: 'rdbu',
            image:data,
            clampLow: false,
            clampHigh: true,
            displayMin: -1,
            displayMax:1
        })
      }).addTo(this.map);

    }
  },
  mounted() {
    this.initMap();
    this.creatHeat(this.data)
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
