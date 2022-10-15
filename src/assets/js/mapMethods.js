import { innerHtml } from "@/assets/js/innerHtml";

export const mapMethods = {
  initMap: (position, map) => {
    const option = {
      center: position,
      level: 9,
    };
    const maps = new naver.maps.Map(map, option);
    return maps;
  },
  latlngToNaver: (lng, lat) => {
    return new naver.maps.LatLng(lng, lat);
  },
  latlngToMarker: (latLng, map) => {
    const marker = new naver.maps.Marker({
      position: latLng,
      map: map,
    });
    // 바운드로 센터 잡아야함.. 후에..
    map.setCenter(latLng);
    map.setZoom(15);
    return marker;
  },
  layerShow: (map, popHtml, e) => {
    let menuLayer = innerHtml.menuLayer;
    map.getPanes().floatPane.appendChild(menuLayer[0]);
    menuLayer
      .show()
      .css({
        left: e.offset.x + 3,
        top: e.offset.y + 3,
      })
      .html(popHtml);
    return e;
  },
};
