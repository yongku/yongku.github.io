/* Start : Global Navigation Bar */
$(function(){
	//gnb
	$.fn.gnb = function(options){
		var option = $.extend( {}, $.fn.gnb.defaults, options || {} );
		return this.each(function(){
			var $this = $(this)
			, depth1Link = $this.find("a.gnblink")
			, depth2Box = $this.find(".gnb_depth2")
			, depth2Link = $this.find(".gnb_depth2 a")
			, oldMenu, oldSMenu, openMenu, setTemp;
			// 초기함수
			function _init(){
				depth2Box.hide();
				if(option.mCurrent == 0 && option.sCurrent == 0){
					option.openMenu = false;
				}
				if( option.openMenu == true ) memPositon(option.mCurrent, option.sCurrent);
			}
			// 활성화함수
			function memPositon(pageNum, subNum){
				depth1Link.eq(pageNum - 1).trigger("mouseover");
				if( depth1Link.eq(pageNum - 1).next().length ){
					if(subNum > 0){
						depth1Link.eq(pageNum - 1).next().find("a").removeClass("current");
						depth1Link.eq(pageNum - 1).next().find("a").eq(subNum - 1).addClass("current");
					}
				}
				
			}
			// 활성화 초기함수
			function rsReturn(){
				//$(oldMenu).find("img")[0].src = $(oldMenu).find("img")[0].src.replace("_on.", "_off.");
				$(oldMenu).parents('li').removeClass('selected');
				$(oldMenu).parent().find(".gnb_depth2").hide();
			}
			// depth1Link mouseenter 이벤트
			depth1Link.bind("mouseenter focus", function(){
				if( oldMenu ){
					//$(oldMenu).find("img")[0].src = $(oldMenu).find("img")[0].src.replace("_on.", "_off.");
					$(oldMenu).parent().find(".gnb_depth2").hide();
					$(oldMenu).parents('li').removeClass('selected');
				}
				//$(this).find("img")[0].src = $(this).find("img")[0].src.replace("_off.", "_on.");
				$(this).parent().find(".gnb_depth2").show();
				$(this).parents('li').addClass('selected');
				oldMenu = this;
			});
			// depth2Box mouseenter 이벤트
			depth2Link.bind("mouseenter focusin", function(){
				if( oldSMenu ){
					$(oldSMenu).removeClass("current");
				}
				if( $(this).attr("class") == "current"){
					//return false;
				} else {
					$(this).addClass("current");
				}
				oldSMenu = this;
			});
			// $this mouseenter 이벤트
			$this.bind("mouseenter focusin", function(){
				clearTimeout(setTemp);
			});
			// $this mouseleave 이벤트
			$this.bind("mouseleave focusout", function(){
				setTemp = setTimeout(function(){
					if( option.openMenu  == true ) 
						memPositon(option.mCurrent, option.sCurrent);
					else 
						rsReturn();
				}, 100);
			});
			_init();
		});
	}
	// mCurrent - 1뎁스메뉴 활성화 번호, sCurrent - 2뎁스메뉴 활성화 번호 [ex:$("#gnb").gnb({ mCurrent : 0, sCurrent : 0 });]
	$.fn.gnb.defaults = { mCurrent : 0, sCurrent : 0, openMenu : true };
});
/* End : Global Navigation Bar */