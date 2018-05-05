var NowDate=new Date();
      var time_h=NowDate.getHours();
      var mapOption = {
          center: {lat: 22.725794, lng: 12.314665},//初始中心位置
          zoom: 18,//地圖預設大小
          mapTypeId: 'roadmap',
          //切換地圖類型，範例：https://developers.google.com/maps/documentation/javascript/reference#MapTypeId
          styles: brightstyle,
          //更改地圖樣式，刪除路明建築商店名稱
          disableDefaultUI: true,
          //關掉預設控制選項，放大縮小街景衛星balabala
          //MotionTrackingControl: true,//回到裝置位子功能，但她不能用先放著
          
      }
      //google map api 程式
      function initMap() {
      	//判斷時間改變styles
      	if ((time_h > 6)&& (time_h <18)){
      		mapOption.styles = brightstyle;//alert(time_h);
      	}
      	else{
      		mapOption.styles = nightstyle;
      	}
      	//宣告地圖物件
        var map = new google.maps.Map(document.getElementById('map'), mapOption);
       	//宣告提示視窗
        var infoWindow = new google.maps.InfoWindow({map: map});
        //使用者位子的標記
        var user_location = new google.maps.Marker({
          position: {lat: 22.726218, lng: 120.314348},
          icon:'pic/jogging.png',
          map: map
        });
        //宣告標記群組，任務地點用
        var labels = ["1","2","3","4"];
        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            icon:'pic/carrot.png',
            label: labels[i % labels.length]
          });
        });
         var markerCluster = new MarkerClusterer(map, markers, 
         	{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
         	gridSize: 70/*群集分隔線 數字越大格子越小*/}
         	);
        //宣告自訂標記，P:經緯度，I:圖片
         var features = [
         {position: new google.maps.LatLng(22.726571, 120.312356),
            icon: 'pic/Food.png'},
         {position: new google.maps.LatLng(22.726098, 120.314314),
            icon: 'pic/WC.png'},
         {position: new google.maps.LatLng(22.725841, 120.313418),
            icon: 'pic/Station.png'}
         ];
          // 把自訂標記放到地圖.
        features.forEach(function(feature) {
          var marker_selficon = new google.maps.Marker({
            position: feature.position,
            icon: feature.icon,
            map: map
          });
        });
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          //navigator.geolocation.getCurrentPosition(function(position) {
          	navigator.geolocation.watchPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            user_location.setPosition(pos);//設定使用者標記的位子，隨watchposition更新
            infoWindow.setPosition(pos);
            infoWindow.setContent('嗨嗨你在這.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          },{timeout:1000});
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }
      //群集標記的經緯度
        var locations = [
        {lat: 22.726218, lng: 120.314348},
        {lat: 22.725816, lng: 120.314060},
        {lat: 22.725415, lng: 120.314358},
        {lat: 22.726210, lng: 120.314948},
        {lat: 22.725818, lng: 120.315248},
        {lat: 22.725382, lng: 120.314937},
        ]
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }