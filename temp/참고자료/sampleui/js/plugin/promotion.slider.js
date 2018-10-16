// Resizable Toggle

$(function(){

	jQuery.fn.videoSlide = function(videoId,playBtnId){
		var videoPlayer		= videojs(videoId);
		var _videoKV		= $(this);
		
		var _videoArea		= _videoKV.find("#" + videoId)
		var _btnVideoClose	= _videoKV.find(".btnClose");
		var _slideKV		= $("#slideKV");
		var _slideBtn		= _slideKV.find(".btn-auto");
		var _btnVideoPlay	= _slideKV.find("#"+ playBtnId);
		
		function reset(){
			videoPlayer.currentTime(0);
			videoPlayer.pause();
		}
		
		videoPlayer.on("ended",function(){ 
			if(! _slideBtn.hasClass("autoplay") ){
				jCarouselLiteStart();
			} 
			_videoKV.hide();
			_slideKV.show();
		});
		
		_videoArea.click(function(){
			if( $(this).hasClass("vjs-playing") ){
				videoPlayer.pause();
			} else{
				videoPlayer.play();
			}
		});
		
		_btnVideoPlay.live( "click" , function(event){
			jCarouselLiteStop();		
			_slideKV.hide();
			_videoKV.show();
			videoPlayer.play();
			event.preventDefault();
		});
		
		_btnVideoClose.live( "click" , function(event){
			if(! _slideBtn.hasClass("autoplay") ){
				jCarouselLiteStart();
			} 
			reset();
			_slideKV.show();
			_videoKV.hide();
			event.preventDefault();
		});
	}		
});

var enableCarousel = function () {
    // carousel elements
    var carouselArray = $('.ng-carousel');
	
    var autoSpeed = 3500; 

    for (i = 1; i <= carouselArray.length; i++ ) {

        // KV Carousel auto mark-up
        carouselArray[(i-1)].className += ' ng-carousel'+i;
        var omniNum = carouselArray[(i-1)].parentNode.getAttribute("data-omninum");
        if(omniNum == 0) {
            var omniTxt = "kv";
            omniNum = "kv";
        } else {
            var omniTxt = "bn";
            omniNum = "bn" + omniNum;
        }
        $('.ng-carousel' + i + ' .ng-carousel-pagination > .btn-auto').attr('onclick','');
        $('.ng-carousel' + i + ' .ng-carousel-pagination > span').html('');
        var countListItems = $('.ng-carousel'+i+' .jCarouselLite li');
        for (j = 1; j <= countListItems.length; j++ ) {
            if(j == 1) {
                var firstLiClass = " current";
            } else {
                var firstLiClass = "";
            }
            var paginationElement ="<button class='s"+j+firstLiClass+"'><span class='blind'>slide "+j+"</span></button>";
            $('.ng-carousel' + i + ' .ng-carousel-pagination > span').append(paginationElement);
        }

        var carouselArrayChildren = $(carouselArray[(i-1)]).children().children();
        if(carouselArrayChildren[1].className == 'btn-auto') {
            ngCarousel('.ng-carousel'+i, autoSpeed);
        } else {
            ngCarousel('.ng-carousel'+i);
        }
    }
};


// Carousel init
var ngCarousel  = function (ngclass, automated) {
	// pagination child
	var btnGoArray = $(ngclass + ' .ng-carousel-pagination span').children();

	
	// ngCarousel init 
	if( jQuery.browser.msie && jQuery.browser.version < 9 ){
	// ie8 �댄븯 踰꾩쟾�먯꽌 �먮룞�ㅽ뻾
		$(ngclass + ' .jCarouselLite').jCarouselLite({
			btnNext: ngclass + ' .btn-next',
			btnPrev: ngclass + ' .btn-prev',
			btnAuto: ngclass + ' .btn-auto',
			visible: 1,
			start : 0,
			auto : automated ? automated : null,
			btnGo: btnGoArray,
			pageCurrent: 'current',
			automatic : true
		});
	} else {	
		$(ngclass + ' .jCarouselLite').jCarouselLite({
			btnNext: ngclass + ' .btn-next',
			btnPrev: ngclass + ' .btn-prev',
			btnAuto: ngclass + ' .btn-auto',
			visible: 1,
			start : 0,
			auto : automated ? automated : null,
			btnGo: btnGoArray,
			pageCurrent: 'current',
			automatic : true
		});
	}

};

$(document).ready(function() {
    enableCarousel();

});
