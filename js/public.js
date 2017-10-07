$(function(){
	$(document).ready(function(){
		//open the lateral panel
	  $(".panel-button").click(function(){
			$('.panel').addClass('is-visible');
	    $(".close-space").addClass("visible-close-space");
		});
		//clode the lateral panel
	  $(".panel-close").click(function(){
			$('.panel').removeClass('is-visible');
	    $(".close-space").removeClass('visible-close-space');
		});
	  $(".close-space").click(function(){
	    $(".panel").removeClass("is-visible");
	    $(".close-space").removeClass('visible-close-space');
	  });
	});

	$('.close').click(function(){
		$('#myModal').modal('hide');
	})
	
})
// 只在圖上顯示出單一路徑
// 當resize不進行refresh
var map;
var final_site="";
var end=[];
var markers=[];
var test;
var output = document.getElementById("numberChosen");
var showRoute=document.getElementById('scroll')
// var directionsDisplay = new google.maps.DirectionsRenderer();
// var directionsService= new google.maps.DirectionsService();
var directionsDisplay;
var durationlist = [];
var directionsService;
var testCursite = true;
var cursite = {lat: 25.018247199999998, lng: 121.5312799};

// google.maps.event.addDomListener(window,"load", init())
function DATAClick(){
	document.getElementById('infos').innerHTML='<i></i><div id = "load"><span></span><span></span><!-- <button id = "load">載入更多</button> --></div>';
	var $infos = $('#infos');
	modalData(durationlist, test, cursite);

}

function showModal(){
  $('#myModal').modal('show');
    $("#myModal").draggable({
      handle: ".modal-header"
    });
}

function init(){
  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService= new google.maps.DirectionsService();
  var defaultCenter = {lat: 25.018247199999998, lng: 121.5312799};
  var input = document.getElementById('site-search');
  var options = {componentRestrictions: {country: 'tw'}}
  var autocomplete = new google.maps.places.Autocomplete(input, options);

  var mapProp =  {
    zoom:12,
    center: defaultCenter
  };

  mapObj=new google.maps.Map(document.getElementById("map"),mapProp);
  

  var enddest = gettest(defaultCenter)

  
  mapObj.setCenter(defaultCenter)

  
  // //show modal
  // 	if (cursite!=null & testCursite==true){
  //   	showModal();
  //   	testCursite=false;
  //   }
//自行輸入位置
	autocomplete.addListener( 'place_changed', function(){
	autocomplete.bindTo('bounds', mapProp )
	var place = autocomplete.getPlace();
	console.log(place)
	if (!place.geometry) {
	// User entered the name of a Place that was not suggested and
	// pressed the Enter key, or the Place Details request failed.
		window.alert("No details available for input: '" + place.name + "'");
		return;
	}
	
	var inputmarker=new google.maps.Marker({
	              map: mapObj,
	              title: place.name,
	              position: place.geometry.location
	            });

	var contentstring = '<h3>'+place.name+'</h3>'+'<p>'+place.formatted_address+'</p>'; 

	var infowindow = new google.maps.InfoWindow({
	          content: contentstring
	        });
	infowindow.open(mapObj, inputmarker);

	if (place.geometry.viewport) {
		mapObj.fitBounds(place.geometry.viewport);
	} else {
		var keyinsite = {lat:place.geometry.location.lat(),lng:place.geometry.location.lng()};

		durationtime(enddest, keyinsite)
		mapObj.setCenter(keyinsite);
		mapObj.setZoom(17);  // Why 17? Because it looks good.
	}

	})

  function error(err) {

    alert('請輸入現在位置');
      
  };
//取當下位置
  window.navigator.geolocation.getCurrentPosition(function(response){
    cursite = {lat:response.coords.latitude, lng: response.coords.longitude};
    final_site = cursite;
    durationtime(enddest, cursite);
    mapObj.setCenter(cursite);
    
    

  }, error);
  
}



function gettest(site) {

  test= [{"child":"1","burn":"1","name":"台大醫院","address":"100台北市中正區中山南路7號","lat":25.0402741,"lng":121.51915910000002},{"child":"0","burn":"0","name":"國立台灣大學醫學院附設醫院新竹分院","address":"300新竹市北區經國路一段442巷25號","lat":24.815899,"lng":120.97989389999998},{"child":"0","burn":"1","name":"國立成功大學醫學院附設醫院","address":"704台南市北區勝利路138號","lat":23.0021803,"lng":120.21898669999996},{"child":"1","burn":"0","name":"臺大醫院雲林分院斗六院區","address":"640雲林縣斗六市雲林路二段579號","lat":23.6975466,"lng":120.52591949999999},{"child":"0","burn":"1","name":"三軍總醫院內湖院區","address":"114台北市內湖區成功路二段325號","lat":25.0682859,"lng":121.59074699999996},{"child":"0","burn":"1","name":"高雄榮民總醫院","address":"813高雄市左營區大中一路386號","lat":22.6797767,"lng":120.3223911},{"child":"0","burn":"1","name":"台中榮總","address":"台灣大道四段1650號","lat":24.1837584,"lng":120.60370660000001},{"child":"0","burn":"0","name":"光田綜合醫院","address":"433台中市沙鹿區沙田路117號","lat":24.2354394,"lng":120.55886780000003},{"child":"1","burn":"1","name":"童綜合醫院沙鹿院區","address":"433台中市沙鹿區成功西街8號","lat":24.242947,"lng":120.56069000000002},{"child":"1","burn":"0","name":"安泰醫院急診室","address":"928屏東縣東港鎮中正路一段210號","lat":22.4740818,"lng":120.45921529999998},{"child":"0","burn":"1","name":"國泰醫院急診室","address":"106台北市大安區仁愛路四段280號","lat":25.0368886,"lng":121.55358019999994},{"child":"1","burn":"1","name":"台北馬偕紀念醫院急診室","address":"10491台北市中山區中山北路二段92號","lat":25.0588322,"lng":121.52236749999997},{"child":"0","burn":"1","name":"新光吳火獅紀念醫院","address":"111台北市士林區文昌路95號","lat":25.0962573,"lng":121.52040139999997},{"child":"0","burn":"1","name":"佳里奇美醫院","address":"722台南市佳里區興化里佳里興606號","lat":23.1816689,"lng":120.1837918},{"child":"0","burn":"0","name":"基隆長庚紀念醫院","address":"204基隆市安樂區基金一路208巷200號","lat":25.1489038,"lng":121.70786279999993},{"child":"1","burn":"1","name":"馬偕紀念醫院新竹院區","address":"300新竹市東區光復路二段690號","lat":24.800045,"lng":120.9906631},{"child":"0","burn":"0","name":"新竹國泰綜合醫院","address":"300新竹市東區中華路二段678號","lat":24.7982349,"lng":120.96531319999997},{"child":"1","burn":"1","name":"嘉義基督教醫院","address":"600嘉義市東區忠孝路539號","lat":23.4994174,"lng":120.45016800000008},{"child":"0","burn":"1","name":"亞東紀念醫院","address":"220新北市板橋區南雅南路二段21號","lat":24.9972647,"lng":121.45277149999993},{"child":"0","burn":"0","name":"臺北慈濟醫院","address":"231新北市新店區建國路289號","lat":24.9860629,"lng":121.53567620000001},{"child":"0","burn":"0","name":"淡水馬偕醫院","address":"251新北市淡水區民權路47號","lat":25.139759,"lng":121.4604693},{"child":"0","burn":"1","name":"林口長庚紀念醫院","address":"333桃園市龜山區復興街5號","lat":25.0616876,"lng":121.36750810000001},{"child":"1","burn":"1","name":"彰化基督教醫院中華路院區","address":"500彰化縣彰化市中華路176號","lat":24.0784818,"lng":120.53978940000002},{"child":"0","burn":"1","name":"嘉義長庚紀念醫院","address":"613嘉義縣朴子市嘉朴路西段6號","lat":23.4623035,"lng":120.28595530000007},{"child":"0","burn":"1","name":"柳營奇美醫院","address":"台南市柳營區太康里太康201號","lat":23.2889176,"lng":120.32510939999997},{"child":"0","burn":"1","name":"奇美醫院","address":"台南市永康區中華路901號","lat":23.0209835,"lng":120.22204149999993},{"child":"0","burn":"1","name":"高雄長庚紀念醫院","address":"833高雄市鳥松區大埤路123號","lat":22.6493625,"lng":120.35263170000007},{"child":"0","burn":"0","name":"義大醫院","address":"827高雄市燕巢區義大路ㄧ號","lat":22.7659067,"lng":120.36435549999999},{"child":"0","burn":"1","name":"慈濟綜合醫院花蓮院區急診","address":"970花蓮縣花蓮市中央路三段707號","lat":23.9962048,"lng":121.59254720000001},{"child":"0","burn":"0","name":"門諾會醫院","address":"970花蓮縣花蓮市民權路44號","lat":23.9878102,"lng":121.6263725},{"child":"0","burn":"1","name":"大林慈濟醫院","address":"622嘉義縣大林鎮民生路2號","lat":23.596561,"lng":120.45718269999998},{"child":"0","burn":"1","name":"萬芳醫院","address":"116台北市文山區興隆路三段111號","lat":24.9996897,"lng":121.55758450000008},{"child":"0","burn":"1","name":"高醫急診室","address":"807高雄市三民區十全一路100號","lat":22.6453863,"lng":120.31021469999996},{"child":"0","burn":"1","name":"中山醫學大學附設醫院","address":"402台中市南區建國北路一段110號","lat":24.1220819,"lng":120.65157670000008},{"child":"1","burn":"1","name":"中國醫藥大學附設醫院","address":"404台中市北區育德路2號","lat":24.1576494,"lng":120.68054919999997},{"child":"0","burn":"0","name":"雙和醫院","address":"235新北市中和區中正路291號","lat":24.9926989,"lng":121.49352590000001},{"child":"0","burn":"1","name":"羅東博愛醫院","address":"265宜蘭縣羅東鎮南昌街83號","lat":24.6716881,"lng":121.77315759999999},{"child":"0","burn":"0","name":"東元綜合醫院","address":"302新竹縣竹北市縣政二路69號","lat":24.82378,"lng":121.0144669},{"child":"0","burn":"0","name":"光田綜合醫院大甲院區","address":"437台中市大甲區經國路321號","lat":24.3466462,"lng":120.61649360000001}];
  for (var i = 0; i < test.length; i++) {

    var pos = {
      lat: parseFloat(test[i].lat),
      lng: parseFloat(test[i].lng)
    };
    // 建立目的地marker
    var Marker = new google.maps.Marker({
      position:pos,
      animation:google.maps.Animation.DROP//掉下來動畫
    })
    
    var info = new google.maps.InfoWindow({
      content: test[i].name + "<br>" + test[i].address
    });
    info.open(mapObj, Marker);
    info.setPosition(site);
    markers.push(Marker);
    Marker.setMap(mapObj);
    end.push(new google.maps.LatLng(test[i].lat, test[i].lng));

  }
  return end;
};
function durationtime(end, site){
	for(var i=0; i < end.length; i++){
	  var address = end[i];
	  var service= new google.maps.DistanceMatrixService();
	  if(service){
	    service.getDistanceMatrix({ 
	      origins: [site],
	      destinations: [{'lat':address.lat(), 'lng': address.lng()}],
	      travelMode: 'DRIVING',
	      unitSystem: google.maps.UnitSystem.METRIC,
	      avoidHighways: false,
	      avoidTolls: false},
	      function(result, status){
	        if(status == google.maps.DistanceMatrixStatus.OK){
	          var duration = result.rows[0].elements[0].duration.value;
	          
	          durationlist.push({"value":duration}); 
	        }
	        if(durationlist.length == end.length){
	          
	          for(var i=0; i<end.length; i++){
	            durationlist[i]['key']=i;

	          }
	          durationlist = durationlist.sort(function(a,b){
	                return a.value>b.value? 1: -1;
	               });
	          console.log(durationlist)
	          modalData(durationlist, test, site)
	          addMarkerListeners(site);
	        }
	      });
	  }
	}
	showModal();
}
function ifclick(index){
	console.log(index);
	desiredDestination(durationlist[index%durationlist.length].key)
}
function modalData(duration, detail, site){
	var $infos = $('#infos');


	var contents = {"wait_normal": {"\u53f0\u5317\u99ac\u5055\u7d00\u5ff5\u91ab\u9662\u6025\u8a3a\u5ba4": "40", "\u57fa\u9686\u9577\u5e9a\u7d00\u5ff5\u91ab\u9662": "29", "\u5149\u7530\u7d9c\u5408\u91ab\u9662": "1", "\u4e09\u8ecd\u7e3d\u91ab\u9662\u5167\u6e56\u9662\u5340": "6", "\u65b0\u5149\u5433\u706b\u7345\u7d00\u5ff5\u91ab\u9662": "25", "\u842c\u82b3\u91ab\u9662": "0", "\u570b\u7acb\u6210\u529f\u5927\u5b78\u91ab\u5b78\u9662\u9644\u8a2d\u91ab\u9662": "41", "\u5927\u6797\u6148\u6fdf\u91ab\u9662": "16", "\u6148\u6fdf\u7d9c\u5408\u91ab\u9662\u82b1\u84ee\u9662\u5340\u6025\u8a3a": "28", "\u570b\u7acb\u53f0\u7063\u5927\u5b78\u91ab\u5b78\u9662\u9644\u8a2d\u91ab\u9662\u65b0\u7af9\u5206\u9662": "11", "\u5609\u7fa9\u57fa\u7763\u6559\u91ab\u9662": "20", "\u9ad8\u96c4\u9577\u5e9a\u7d00\u5ff5\u91ab\u9662": "63", "\u5149\u7530\u7d9c\u5408\u91ab\u9662\u5927\u7532\u9662\u5340": "3", "\u53f0\u4e2d\u69ae\u7e3d": "16", "\u65b0\u7af9\u570b\u6cf0\u7d9c\u5408\u91ab\u9662": "4", "\u81fa\u5317\u6148\u6fdf\u91ab\u9662": "3", "\u4e2d\u570b\u91ab\u85e5\u5927\u5b78\u9644\u8a2d\u91ab\u9662": "31", "\u6de1\u6c34\u99ac\u5055\u91ab\u9662": "17", "\u5947\u7f8e\u91ab\u9662": "41", "\u67f3\u71df\u5947\u7f8e\u91ab\u9662": "9", "\u53f0\u5927\u91ab\u9662": "103", "\u5609\u7fa9\u9577\u5e9a\u7d00\u5ff5\u91ab\u9662": "13", "\u99ac\u5055\u7d00\u5ff5\u91ab\u9662\u65b0\u7af9\u9662\u5340": "3", "\u5b89\u6cf0\u91ab\u9662\u6025\u8a3a\u5ba4": "4", "\u7fa9\u5927\u91ab\u9662": "58", "\u96d9\u548c\u91ab\u9662": "26", "\u570b\u6cf0\u91ab\u9662\u6025\u8a3a\u5ba4": "13", "\u5f70\u5316\u57fa\u7763\u6559\u91ab\u9662\u4e2d\u83ef\u8def\u9662\u5340": "12", "\u81fa\u5927\u91ab\u9662\u96f2\u6797\u5206\u9662\u6597\u516d\u9662\u5340": "26", "\u4e2d\u5c71\u91ab\u5b78\u5927\u5b78\u9644\u8a2d\u91ab\u9662": "8", "\u9580\u8afe\u6703\u91ab\u9662": "4", "\u7f85\u6771\u535a\u611b\u91ab\u9662": "0", "\u4f73\u91cc\u5947\u7f8e\u91ab\u9662": "10", "\u6771\u5143\u7d9c\u5408\u91ab\u9662": "3", "\u6797\u53e3\u9577\u5e9a\u7d00\u5ff5\u91ab\u9662": "139", "\u9ad8\u96c4\u69ae\u6c11\u7e3d\u91ab\u9662": "29", "\u9ad8\u91ab\u6025\u8a3a\u5ba4": "0", "\u7ae5\u7d9c\u5408\u91ab\u9662\u6c99\u9e7f\u9662\u5340": "0", "\u4e9e\u6771\u7d00\u5ff5\u91ab\u9662": "56"}, "wait_ergent": {"\u53f0\u5317\u99ac\u5055\u7d00\u5ff5\u91ab\u9662\u6025\u8a3a\u5ba4": "0", "\u57fa\u9686\u9577\u5e9a\u7d00\u5ff5\u91ab\u9662": "0", "\u5149\u7530\u7d9c\u5408\u91ab\u9662": "0", "\u4e09\u8ecd\u7e3d\u91ab\u9662\u5167\u6e56\u9662\u5340": "0", "\u65b0\u5149\u5433\u706b\u7345\u7d00\u5ff5\u91ab\u9662": "0", "\u842c\u82b3\u91ab\u9662": "0", "\u570b\u7acb\u6210\u529f\u5927\u5b78\u91ab\u5b78\u9662\u9644\u8a2d\u91ab\u9662": "3", "\u5927\u6797\u6148\u6fdf\u91ab\u9662": "1", "\u6148\u6fdf\u7d9c\u5408\u91ab\u9662\u82b1\u84ee\u9662\u5340\u6025\u8a3a": "0", "\u570b\u7acb\u53f0\u7063\u5927\u5b78\u91ab\u5b78\u9662\u9644\u8a2d\u91ab\u9662\u65b0\u7af9\u5206\u9662": "0", "\u5609\u7fa9\u57fa\u7763\u6559\u91ab\u9662": "0", "\u9ad8\u96c4\u9577\u5e9a\u7d00\u5ff5\u91ab\u9662": "3", "\u5149\u7530\u7d9c\u5408\u91ab\u9662\u5927\u7532\u9662\u5340": "0", "\u53f0\u4e2d\u69ae\u7e3d": "0", "\u65b0\u7af9\u570b\u6cf0\u7d9c\u5408\u91ab\u9662": "0", "\u81fa\u5317\u6148\u6fdf\u91ab\u9662": "0", "\u4e2d\u570b\u91ab\u85e5\u5927\u5b78\u9644\u8a2d\u91ab\u9662": "3", "\u6de1\u6c34\u99ac\u5055\u91ab\u9662": "0", "\u5947\u7f8e\u91ab\u9662": "0", "\u67f3\u71df\u5947\u7f8e\u91ab\u9662": "0", "\u53f0\u5927\u91ab\u9662": "1", "\u5609\u7fa9\u9577\u5e9a\u7d00\u5ff5\u91ab\u9662": "0", "\u99ac\u5055\u7d00\u5ff5\u91ab\u9662\u65b0\u7af9\u9662\u5340": "0", "\u5b89\u6cf0\u91ab\u9662\u6025\u8a3a\u5ba4": "0", "\u7fa9\u5927\u91ab\u9662": "0", "\u96d9\u548c\u91ab\u9662": "3", "\u570b\u6cf0\u91ab\u9662\u6025\u8a3a\u5ba4": "2", "\u5f70\u5316\u57fa\u7763\u6559\u91ab\u9662\u4e2d\u83ef\u8def\u9662\u5340": "1", "\u81fa\u5927\u91ab\u9662\u96f2\u6797\u5206\u9662\u6597\u516d\u9662\u5340": "1", "\u4e2d\u5c71\u91ab\u5b78\u5927\u5b78\u9644\u8a2d\u91ab\u9662": "0", "\u9580\u8afe\u6703\u91ab\u9662": "0", "\u7f85\u6771\u535a\u611b\u91ab\u9662": "0", "\u4f73\u91cc\u5947\u7f8e\u91ab\u9662": "0", "\u6771\u5143\u7d9c\u5408\u91ab\u9662": "0", "\u6797\u53e3\u9577\u5e9a\u7d00\u5ff5\u91ab\u9662": "1", "\u9ad8\u96c4\u69ae\u6c11\u7e3d\u91ab\u9662": "0", "\u9ad8\u91ab\u6025\u8a3a\u5ba4": "0", "\u7ae5\u7d9c\u5408\u91ab\u9662\u6c99\u9e7f\u9662\u5340": "0", "\u4e9e\u6771\u7d00\u5ff5\u91ab\u9662": "0"}, "full_emergency": {"\u9ad8\u91ab\u6025\u8a3a\u5ba4": "0", "\u57fa\u9686\u9577\u5e9a\u7d00\u5ff5\u91ab\u9662": "29", "\u9580\u8afe\u6703\u91ab\u9662": "4", "\u65b0\u5149\u5433\u706b\u7345\u7d00\u5ff5\u91ab\u9662": "30", "\u53f0\u5927\u91ab\u9662": "103", "\u570b\u7acb\u6210\u529f\u5927\u5b78\u91ab\u5b78\u9662\u9644\u8a2d\u91ab\u9662": "43", "\u53f0\u4e2d\u69ae\u7e3d": "32", "\u9ad8\u96c4\u69ae\u6c11\u7e3d\u91ab\u9662": "30", "\u5b89\u6cf0\u91ab\u9662\u6025\u8a3a\u5ba4": "4", "\u6148\u6fdf\u7d9c\u5408\u91ab\u9662\u82b1\u84ee\u9662\u5340\u6025\u8a3a": "28", "\u4e9e\u6771\u7d00\u5ff5\u91ab\u9662": "56", "\u570b\u7acb\u53f0\u7063\u5927\u5b78\u91ab\u5b78\u9662\u9644\u8a2d\u91ab\u9662\u65b0\u7af9\u5206\u9662": "10"}}
	var i = 0;

	
	function createInfo (i, msite){
		var obj = durationlist[i % durationlist.length];
		var objMin = Math.floor((obj.value)/60);
		var hosp = detail[obj.key].name;
		var content1 = contents['wait_normal'][hosp];
		var content2 = contents['wait_ergent'][hosp];
		var id = "chosen"+i.toString();
		
		return $('<div />').addClass('info').append($('<time />').text("約"+objMin+"分鐘可抵達"))
											// .append($('<i />').addClass(obj.icon))
											.append($('<div />').addClass('content').append($('<h1 />').text(hosp))
																					.append($('<p />').html('等待住院人數: '+ content1 +'<br/> 等待急診人數:' + content2))
																				 	.append($('<input>').attr({'type':'button', 'id':id}).addClass("chosen").val('選擇目的地')));
	}
	$(document).ready(function(){
		var count=0;
		while(count < 3){
					
			if(document.getElementById('childButton').checked || document.getElementById('burnButton').checked){
				while(1){
					if(i>=38)	break;
					var obj = durationlist[i % durationlist.length];
					var hosp = detail[obj.key].name;
					console.log(hosp);
					console.log(detail[obj.key]);
					if((!document.getElementById('childButton').checked || detail[obj.key].child==1) && (!document.getElementById('burnButton').checked || detail[obj.key].burn==1)){
						break;
					}
					else{
						i = i+1;
					}
				}
			}
			console.log(i);
			if(i>=38)	return;
			$infos.append(createInfo(i, site));
			$("#chosen"+i.toString()).attr('onClick','ifclick('+i.toString()+')');
			count = count+1;
			i = i+1;
		}
		$("#load").mouseover(function(e){
			if(document.getElementById('childButton').checked || document.getElementById('burnButton').checked){
				while(1){
					if(i>=38)	break;
					var obj = durationlist[i % durationlist.length];
					var hosp = detail[obj.key].name;
					console.log(hosp);
					console.log(detail[obj.key]);
					if((!document.getElementById('childButton').checked || detail[obj.key].child==1) && (!document.getElementById('burnButton').checked || detail[obj.key].burn==1)){
						break;
					}
					else{
						console.log(i);
						i = i+1;
					}
				}
			}
			if(i>=38)	return;
			$infos.append(createInfo(i,site));
			$("#chosen"+i.toString()).attr('onClick','ifclick('+i.toString()+')');
			
			i = i+1;
		});

	})
}


function addMarkerListeners(site){
  
  if(markers.length > 0){
    for (var i = 0; i < markers.length; i++){
      google.maps.event.addListener(markers[i], 'click',(function(i){
        

        return function(){
          plotroute(end[i], site);
        }
      })(i));
      directionsDisplay.setMap(mapObj);
    }
  }
}

function plotroute( pos, site){
  
  var request = {
    origin: site,
    destination: pos,
    travelMode: 'DRIVING'

  };
  $('.panel').addClass('is-visible');
$(".close-space").addClass("visible-close-space");

  directionsService.route(request, function(result, status){
    if (status==='OK'){
      showRoute.innerHTML='';
      directionsDisplay.setDirections(result);
      directionsDisplay.setPanel(showRoute);
    }
  });
}

function desiredDestination(index){
	var site = final_site;
	showRoute.innerHTML='';
	console.log(index);
	console.log(durationlist);
	console.log(test);

	directionsService.route(
	{ origin:site,
	  destination: end[index],
	  travelMode:google.maps.TravelMode.DRIVING,
	},

	function(results){
	  
	  directionsDisplay.setDirections(results);
	  directionsDisplay.setPanel(showRoute);
	  directionsDisplay.setMap(mapObj);
	  
	}
	)
	$('#myModal').modal('hide');


}



 function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
      marker.setAnimation(null);
    } else {
      marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }