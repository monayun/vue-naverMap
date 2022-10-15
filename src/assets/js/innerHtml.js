export const innerHtml = {
  menuLayer: $('<div style="position:absolute;z-index:10000;padding:10px;display:none;" id="info"></div>'),
  mapClickMenu: `<div id="initInfo" style="position:absolute;left:0;top:0;width:124px;background-color:#ffc0e2;text-align:center;">
        <button id="add">주소보기</button>
        <button id="ta">대중교통</button>
      </div>`,
  addInfo: `<div class="box_info">
      <div class="info_head">
        <span class="head_title">장소명</span>
        <span class="head_address">주소 6번지</span>
      </div>
    </div>`,
  trafficInfo: `<div class="pin_area">
			<div class="pin_area_layer">
				<ul>
					<li class="tit">반경(1km)내 대중교통</li>
					<li><span class="t1">버스정류장</span><span class="t2">150개</span></li>
					<li><span class="t1">지하철역</span><span class="t2">20개</span></li>
					<li><span class="t1">기차역</span><span class="t2">5개</span></li>
					<li><span class="t1">공항</span><span class="t2">1개</span></li>
				</ul>
			</div>
		</div>`,
};
