<template>
  <div class="wrap" style="height: 100%; width: 100%" id="map" ref="map">
  </div>
</template>
<script>
import L from 'leaflet';

var tiandituTileLayer = require('@supermap/iclient-leaflet').tiandituTileLayer;
var url = "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World";
 export default {
    name: "Example",
    components: {
    
    },
    data() {
      return {
        zoom: 3,
        // http://t0.tianditu.gov.cn/img_c/wmts?tk=bfb24fe35edaeceaf671d25cb0ec37b3
        url: 'http://t0.tianditu.gov.cn/img_c/wmts?tk=bfb24fe35edaeceaf671d25cb0ec37b3',
      
 
      };
    },
    mounted() {
        console.log(L);
        var map = L.map(this.$refs.map, {
            center: [0, 0],
            maxZoom: 18,
            zoom: 12
        });
        //  tiandituTileLayer({layerType: "img"}).addTo(map);
            // console.log(image)
            },
    methods: {
    }
  };
</script>