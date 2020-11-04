<template>
  <div class="wrap" style="height: 100%; width: 100%">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="centerUpdate"
      ref="myMap"
      @ready="doSomethingOnReady()"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="url" />
      <!-- <l-protobuf :url="url2" :options="options" ref="res" /> -->
      <l-marker
        :lat-lng="item.latlng"
        v-for="(item, i) in cdata"
        :key="i"
        :name="item.name"
      >
        <l-icon class-name="someExtraClass" :icon-size="dynamicSize(item.lv)">
          <div class="title">{{ item.name }}</div>
          <l-tooltip :content="item.tip + item.lv + '级'"></l-tooltip>
        </l-icon>
      </l-marker>
    </l-map>
  </div>
</template>
<script>
//https://vue2-leaflet.netlify.app/components/LMap.html#demo
import { latLng } from "leaflet";
import LProtobuf from "vue2-leaflet-vectorgrid";
import L from "leaflet";
import { LMap, LTileLayer, LMarker, LIcon, LTooltip } from "vue2-leaflet";
export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon,
    LTooltip,
    LProtobuf,
  },
  props: {
    cdata: {
      default: () => {
        return [
          {
            name: "美国",
            latlng: [7.48, 122.25],
            lv: 2,
            tip: "卫生防疫水平：",
          },
          {
            name: "韩国",
            latlng: [37.33, 126.58],
            lv: 3,
            tip: "卫生防疫水平：",
          },
        ];
      },
    },
  },
  computed: {},
  data() {
    return {
      zoom: 2,
      center: latLng(0, 91.219482),
      url: "http://222.128.56.122:8081/wordIMG/{z}/{x}/{y}.jpg",
      url3: "/pbf/qqbjx/tile/{z}/{x}/{y}.pbf",
      url2:
        "https://basemaps.arcgis.com/v1/arcgis/rest/services/World_Basemap/VectorTileServer/tile/{z}/{y}/{x}.pbf",

      // url: image,
      withPopup: latLng(47.41322, -1.219482),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 2,
      currentCenter: latLng(47.41322, -1.219482),
      showParagraph: false,
      mapOptions: {
        zoomSnap: 0.5,
        zoomControl: false,
        attributionControl: false,
      },
      options: {
        vectorTileLayerStyles: {
          gadm36_0_project: {
            weight: 0.5,
            fillColor: "#f90",
            color: "#f90",
            fillOpacity: 1,
            opacity: 1,
          },
        },
        maxZoom: 19,
        interactive: true,
      },
      showMap: true,
    };
  },
  mounted() {
    setTimeout(() => {
      console.log(this.$refs.res);
    }, 3000);
    // console.log(image)
  },
  methods: {
    dynamicSize(i) {
      return [10 * i, 10 * i];
    },
    doSomethingOnReady() {
      this.map = this.$refs.myMap.mapObject;
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
    },
  },
};
</script>
<style lang="less">
.someExtraClass {
  width: 30px;
  height: 30px;
  background-color: #f90;
  border-radius: 50%;
  position: relative;

  .title {
    position: absolute;
    top: -20px;
    width: 60px;
    color: antiquewhite;
  }
}
</style>
