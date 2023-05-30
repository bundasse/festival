<template>
  <div class="w-full h-full min-h-screen bg-[#e9f1f6]">
    <div class="max-w-7xl mx-auto">
      <button @click="$router.go(-1)" class="text-xl hover:text-blue-600">&#10094; 뒤로가기</button>
    </div>
  <div v-if="listItem&& listItem.UC_SEQ === Number(listId)">
    <!-- isNaN : not a number. 패러미터가 숫자일 경우 false, 숫자가 아닐 경우 true 이걸 부정했으니까 'listId 숫자일 때' 보여줌 -->
    <!-- !isNaN(listId) && listId < listItem.length : 패러미터가 숫자이면서, listItem의 갯수보다 값이 낮을 때에만 v-if가 포함된 div를 출력한다. -->
    <div class="max-w-7xl mx-auto border box-border p-4 rounded mt-7 bg-white">
      <h3 class="font-bold mb-2 text-xl">{{ listItem.TITLE }}</h3>
      <h4 class="mb-2 text-lg">{{ listItem.SUBTITLE }}</h4>
      <img :src="listItem.MAIN_IMG_NORMAL" :alt="listItem.TITLE" :title="listItem.TITLE" class="w-full">
      <ul>
        <li class="mb-2 mt-4">구군: {{ listItem.GUGUN_NM }}</li>
        <li class="mb-2 ">장소: {{ listItem.MAIN_PLACE }}</li>
        <li class="mb-2 ">전화번호: {{ listItem.CNTCT_TEL }}</li>
        <li class="mb-2 ">기간: {{ listItem.USAGE_DAY_WEEK_AND_TIME }}</li>
        <li class="mb-2 leading-7">상세내용: {{ listItem.ITEMCNTNTS }}</li>
        <li v-if="listItem.HOMEPAGE_URL !== ''">홈페이지: <button class="px-2py-1 rounded cursor-pointer text-sm bg-blue-200" @click="open_page(listItem.HOMEPAGE_URL)">홈페이지</button></li>
      </ul>
      <div class="flex my-[3%]">
        <div id="map" class="w-2/4 h-96"></div>
        <div id="map2" class="w-2/4 h-96"></div>
      </div>
    </div>
  </div>
  <div v-else :click="$router.replace('/404')">
  </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      listId: this.$route.params.id,
      listItem:[],
      map: null,
      markers: [],
      latitude: 0,
      longitude: 0
    }
  },
  name: "DetailPage",
  created(){
    this.listItem = JSON.parse(sessionStorage.getItem('data'))
    console.log(this.listItem)
    if (!("geolocation" in navigator)) {
      return;
    }

    // // get position
    // navigator.geolocation.getCurrentPosition(pos => {
    //   this.latitude = pos.coords.latitude;
    //   this.longitude = pos.coords.longitude;

    //   if (window.kakao && window.kakao.maps) {

    //     this.initMap();

    //   } else {
    //     const script = document.createElement("script");
    //     /* global kakao */
    //     script.onload = () => kakao.maps.load(this.initMap);
    //     script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=4087fbcbb6e717750dbff159db53fdea";
    //     document.head.appendChild(script);
    //   }

    // }, err => {
    //   alert(err.message);
    // })
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=4087fbcbb6e717750dbff159db53fdea";
      document.head.appendChild(script);
}
  },
  methods:{
    open_page(url){
      window.open(url);
    },
    initMap() {
    const container = document.getElementById("map");
    var roadviewContainer = document.getElementById("map2");
    var roadview = new kakao.maps.Roadview(roadviewContainer); //濡쒕뱶酉� 媛앹껜
    var roadviewClient = new kakao.maps.RoadviewClient(); //醫뚰몴濡쒕��� 濡쒕뱶酉� �뚮끂ID瑜� 媛��몄삱 濡쒕뱶酉� helper媛앹껜
    var position = new kakao.maps.LatLng(this.listItem.LAT, this.listItem.LNG); //吏��꾩쓽 以묒떖醫뚰몴.
    roadviewClient.getNearestPanoId(position, 50, function(panoId) {
      roadview.setPanoId(panoId, position); //panoId�� 以묒떖醫뚰몴瑜� �듯빐 濡쒕뱶酉� �ㅽ뻾
  }); 
    const options = {
      center: new kakao.maps.LatLng(this.listItem.LAT, this.listItem.LNG),
      level: 5,
    };
    this.map = new kakao.maps.Map(container, options);
    this.displayMarker([[this.listItem.LAT, this.listItem.LNG]]);
  },
  displayMarker(markerPositions) {
    if (this.markers.length > 0) {
      this.markers.forEach((marker) => marker.setMap(null));
    }

    const positions = markerPositions.map(
        (position) => new kakao.maps.LatLng(...position)
    );

    
    if (positions.length > 0) {
      this.markers = positions.map(
          (position) =>
              new kakao.maps.Marker({
                map: this.map,
                position,
              })
      );

      const bounds = positions.reduce(
          (bounds, latlng) => bounds.extend(latlng),
          new kakao.maps.LatLngBounds()
      );


      this.map.setBounds(bounds);
    }
  }
  },
  computed:{
  }    
}
</script>

<style>

</style>