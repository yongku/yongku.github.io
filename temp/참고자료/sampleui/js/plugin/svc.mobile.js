/*<![CDATA[*/
	/* get Ajax Object */
	function getAjaxObj(){
		var xhr;
		if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
			xhr=new XMLHttpRequest();
		}
		else{// code for IE6, IE5
			xhr = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return xhr;
	}

	// daum.map api
	var KEY = "";
	var domainName = document.domain;

	if(domainName == "dev.samsungsvc.co.kr"){
		KEY = "13e9e6f89037e93fa48291c82307b0b8585b6020";
	}else if(domainName == "210.94.48.231"){
		KEY = "d6c188df39b2356e2b76af44c87fd424f7cfd864";
	}else if(domainName == "www.samsungsvc.co.kr"){
		KEY = "93170180186af66b9ec4b69c152e3b81f7de8fa3";
	}else if(domainName == "m.3366.co.kr"){
		KEY = "14681b8b5236220ec0fd7028cd5050836f3ea43b";
	}else if(domainName == "www.3366.co.kr"){
		KEY = "65d8b18e7c5b919cb15e749e030592dee572f6e7";
	}else if(domainName == "m.samsungsvc.co.kr"){
		KEY = "e58a644123eef1b5ca7251891d276fb1c0d77175";
	}else if(domainName == "samsungsvc.co.kr"){
		KEY = "5b1c5c669bcddfc31e6dc10a059ace37d3080da3";
	}else if(domainName == "3366.co.kr"){
		KEY = "1443d7185735bc2ba1fb85369a37cbd367d56d68";
	}

	function reqTransWGStoTM(x,y,func){
		var pos = document.createElement('script');
		pos.type = 'text/javascript';
		pos.charset = 'utf-8';
		pos.src = "http://apis.daum.net/maps/transcoord?apikey="+KEY+"&output=json&callback="+func+"&fromCoord=WGS84&toCoord=TM&x="+x+"&y="+y;

		document.getElementsByTagName('head')[0].appendChild(pos);
	}

	function reqTransTMtoWGS(x,y,func){
		var pos = document.createElement('script');
		pos.type = 'text/javascript';
		pos.charset = 'utf-8';
		pos.src = "http://apis.daum.net/maps/transcoord?apikey="+KEY+"&output=json&callback="+func+"&fromCoord=TM&toCoord=WGS84"+"&x="+x+"&y="+y;

		document.getElementsByTagName('head')[0].appendChild(pos);
	}

	// geolocation
	var gpsTimeOutClear = false;
	var browserSupport  = false;

	function getPosition(){

		//if(confirm("고객님의 [위치정보 수집]을 허용 하시겠습니까?\r\n수집된 해당 정보는 [가까운 센터찾기 및 현위치 표시]에 이용됩니다.")){
		if (navigator.geolocation) {

			gpsTimeOutClear = true;
			browserSupport  = true;

			navigator.geolocation.getCurrentPosition(
				function(position) {

					var y = position.coords.longitude;
					var x = position.coords.latitude;

					getNearCenterName(x,y);

				}, function(error) {

					switch(error.code) {
						case error.PERMISSION_DENIED:
							//$("#CenterName").html("사이트에서 현재 위치정보 검색을 거부했습니다. [설정 > 고급설정 > 웹사이트 설정]에서 변경하세요.");
							//$(".cenLink").eq(1).css("display","none");
							alert('사이트에서 현재 위치정보 검색을 거부했습니다.\n[설정 > 고급설정 > 웹사이트 설정]에서 변경하세요.');
							break;
						case error.POSITION_UNAVAILABLE:
							//$("#CenterName").html("브라우저가 위치정보를 검색하지 못했습니다.");
							//$(".cenLink").eq(1).css("display","none");
							alert('브라우저가 위치정보를 검색하지 못했습니다.');
							break;
						case error.TIMEOUT:
							//$("#CenterName").html("브라우저의 위치 정보 검색 시간이 초과됐습니다.");
							//$(".cenLink").eq(1).css("display","none");
							alert('브라우저의 위치 정보 검색 시간이 초과됐습니다.');
							break;
						case error.UNKNOWN_ERROR:
							//$("#CenterName").html("위치 정보 검색에 문제가 있습니다.");
							//$(".cenLink").eq(1).css("display","none");
							alert('위치 정보 검색에 문제가 있습니다.');
							break;
					}
				},
				{
					maximumAge:Infinity,
					timeout:5000
				}
			);
		} else {
			alert("위치정보 수집기능이 꺼져 있거나\r\n사용 중이신 브라우저가 해당 기능을 지원하지 않습니다.");
			//setNotice();
		}
		//}
	}

	function reTryGetPos(){
//		if(confirm("고객님의 [위치정보 수집]을 허용 하시겠습니까?\r\n수집된 해당 정보는 [가까운 센터찾기 및 현위치 표시]에 이용됩니다.")){

		if(navigator.geolocation) {
			browserSupport  = true;
			gpsTimeOutClear = true;

			navigator.geolocation.getCurrentPosition(
				function(position){

					var y = position.coords.longitude;
					var x = position.coords.latitude;

					var cookieVal = x+"\,"+y;

					var expireDate = new Date();
					expireDate = new Date(expireDate.getTime() + 60 * 60 * 24 * 1000 * 1);
					setCookie("SVCMW-CPRN",cookieVal,expireDate);	// cookie 생성

					//reqTransWGStoTM(x,y,"getNearCenterName");
					getNearCenterName(x,y);

					refreshTimer = setTimeout('location.href = "/cyber/jsp/mobile/geo/SearchCenterByMyPositionMobile.jsp"',3000);

				}, function(error) {

					switch(error.code) {
						case error.PERMISSION_DENIED:
							$("#CenterName").html("사이트에서 현재 위치정보 검색을 거부했습니다.\n[설정 > 고급설정 > 웹사이트 설정]에서 변경하세요.");
							$(".cenLink").eq(1).css("display","none");
							//alert('현재 페이지에서 사용자가 위치 정보 검색을 거부했습니다.');
							break;
						case error.POSITION_UNAVAILABLE:
							$("#CenterName").html("브라우저가 위치정보를 검색하지 못했습니다.");
							$(".cenLink").eq(1).css("display","none");
							//alert('브라우저가 위치정보를 검색하지 못했습니다.');
							break;
						case error.TIMEOUT:
							$("#CenterName").html("브라우저의 위치 정보 검색 시간이 초과됐습니다.");
							$(".cenLink").eq(1).css("display","none");
							//alert('브라우저의 위치 정보 검색 시간이 초과됐습니다.');
							break;
						case error.UNKNOWN_ERROR:
							$("#CenterName").html("위치 정보 검색에 문제가 있습니다.");
							$(".cenLink").eq(1).css("display","none");
							//alert('위치 정보 검색에 문제가 있습니다.');
							break;
					}
				},
				{
					maximumAge:Infinity,
					timeout:5000
				}
			);
		}
		else{
			alert("위치정보 수집기능이 꺼져 있거나\r\n사용 중이신 브라우저가 해당 기능을 지원하지 않습니다.");
			setNotice();
		}
//		}
	}

	// COOKIE
	function setCookie(name,value,expires){
		//cookie에 정보 저장
		document.cookie = name + "=" + escape(value) +"; expires=" + ((expires == null) ? "" : expires.toGMTString())+"; path=/cyber/";
	}

	function getCookie(name){
		var arg = name + "=";
        var alen = arg.length;
        var clen=document.cookie.length;
        var i=0;

        while(i< clen){
            var j = i+alen;
            if(document.cookie.substring(i,j)==arg){
				var end = document.cookie.indexOf(";",j);
				if(end== -1){
					end = document.cookie.length;
				}
				return unescape(document.cookie.substring(j,end));
            }
    		i=document.cookie.indexOf(" ",i)+1;
    		if (i==0) break;
    	}
    	return null;
	}

	function getNearCenterName(x,y){
		var cenName = "";
		var cenID = "";
		var dist = 0;
		if(confirm("고객님의 [위치정보 수집]을 허용 하시겠습니까?\r\n수집된 해당 정보는 [가까운 센터찾기 및 현위치 표시]에 이용됩니다.")){
			var xhr = getAjaxObj();
			var httpURL = "/cyber/gis/CyberGisManager.Svlt?callMethod=getNearestCenter&direction=/jsp/mobile/geo/getNearestCenter.jsp&kcode2=서비스센터&radioCh=0&xPos="+x+"&yPos="+y;
			xhr.open("GET",httpURL,true);
			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4 && xhr.status === 200){
					if(xhr.responseXML != null){
						cenName = xhr.responseXML.getElementsByTagName("name")[0].childNodes[0].nodeValue;
						cenID   = xhr.responseXML.getElementsByTagName("cenid")[0].childNodes[0].nodeValue;
						dist    = xhr.responseXML.getElementsByTagName("dist")[0].childNodes[0].nodeValue;
	
						var cookieVal = "";//getCookie("SVCMW-CPRN");
	
						cookieVal += cenID;
						cookieVal += "\,"+cenName;
						cookieVal += "\,"+dist;
						cookieVal += "\,"+x+"\,"+y;
						//cookieVal += "\,"+getCookie("SVCMW-CPRN");
	
						//delCookie("SVCMW-CPRN");	// 기존 쿠기 삭제
						var expireDate = new Date();
						expireDate = new Date(expireDate.getTime() + 60 * 60 * 24 * 1000 * 1);
						setCookie("SVCMW-CPRN",cookieVal,expireDate);	// cookie 생성
	
						setNearCenter("SVCMW-CPRN");
					}
				}
			};
			xhr.send();
		}
	}


/*]]>*/