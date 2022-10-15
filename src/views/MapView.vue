<template>
  <div id="map" ref="container" />
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { innerHtml } from "@/assets/js/innerHtml";

const container = ref();
const store = inject("te");
const $axios = inject("$axios");
let clickE;
let marker = [];
let initPosition = store.latlngToNaver(37.2940096246681, 126.82561875320746);

onMounted(() => {
  if (container.value) {
    const maps = store.initMap(initPosition, container.value);
    container.value = maps;
  }
  naver.maps.Event.addListener(container.value, "rightclick", function (e) {
    clickE = e;
    store.layerShow(container.value, innerHtml.mapClickMenu, e);

    // 주소보기
    $("#add").on("click", function () {
      alert("주소보기");
      addInfo();
    });

    // 대중교통보기
    $("#ta").on("click", function () {
      alert("대중교통보기");
      taInfo();
    });
  });

  function addInfo() {
    // 주소정보팝업을 띄워야 하니까 그려야지?
    // 이제 기존 팝업은 숨기고
    $("#initInfo").css("display", "none");
    store.layerShow(container.value, innerHtml.addInfo, clickE);
  }

  // 대중교통보기
  function taInfo() {
    // 기존마커가 존재하면 삭제 시켜야지 TODO

    // 일단 마커를 딱 하고 찍어줘야 함 (공통 부분 만들어봐야징)
    $("#initInfo").css("display", "none");
    const position = store.latlngToNaver(
      clickE.latlng._lat,
      clickE.latlng._lng
    );
    let markers = new naver.maps.Marker({
      position: position,
      map: container.value,
      icon: {
        content:
          '<img src="././src/assets/image/pin_area.png"><a class="pin_close" id="pins"></a>',
        size: new naver.maps.Size(22, 35),
        anchor: new naver.maps.Point(11, 35),
      },
    });
    marker.push(markers);

    // 마커를 찍었으면 마커에 mouseover시 반경내 대중교통별 아이콘 개수 표시
    // 커스텀 오버레이로만 가능함
    naver.maps.Event.addListener(marker, "mouseover", function (e) {
      $(".box_info").css("display", "none");
      store.layerShow(container.value, innerHtml.trafficInfo, e);
    });

    naver.maps.Event.addListener(marker, "mouseout", function (e) {
      store.layerShow(container.value, null, e);
    });

    let pinc = document.getElementById("pins");
    pinc.onclick = function () {
      alert("Close");
      console.log(marker);
      for (const element of marker) {
        element.setMap(null);
      }
      $("#initInfo").css("display", "block");
    };
  }
});
</script>

<style>
#map {
  height: 1000px;
  width: 1000px;
}
.pin_close {
  position: absolute;
  left: 23px;
  bottom: 38px;
  display: block;
  width: 15px;
  height: 15px;
  background: url(././src/assets/image/icon_delete.png) center no-repeat;
  z-index: 20;
}

.box_info {
  position: absolute;
  min-width: 210px;
  max-width: 300px;
  background-color: #fff;
  border: 1px solid #aaa;
  border-radius: 3px;
}
.info_head {
  display: flex;
  flex-direction: column;
  padding: 15px 20px 15px 15px;
}

.info_head span.head_title {
  display: block;
  font-size: 0.9rem;
  line-height: 0.9em;
  font-weight: bold;
  color: #222;
  margin-top: -2px;
  margin-bottom: 5px;
}
</style>
