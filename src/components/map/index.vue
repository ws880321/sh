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
        zoom: 2.7,
        center: latLng(37.41322, 91.219482),
				url:'http://222.128.56.122:8081/wordIMG/{z}/{x}/{y}.jpg',
        // url: image,
        withPopup: latLng(47.41322, -1.219482),
        withTooltip: latLng(47.41422, -1.250482),
        currentZoom: 3,
        currentCenter: latLng(47.41322, -1.219482),
        showParagraph: false,
        mapOptions: {
          zoomSnap: 0.5,
		  zoomControl:false,
		  attributionControl:false
        },
        showMap: true,
      };
    },
    mounted() {
      // console.log(image)
    },
    methods: {
        doSomethingOnReady(){
            this.map = this.$refs.myMap.mapObject
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