/**
* Title : Vertical Rolling Banner
* Author : Won Joso (http://blog.naver.com/josoblue , http://www.motionj.com)
* Email : joso@motionj.com
* Version : v1.0
* License : Free (사용범위는 제한이 없으나, js 파일의 주석을 제거하고나 재판매용으로 이용되서는 않됩니다.)
* Option Description :
* width : 배너 한개의 너비
* height : 배너 한개의 높이
* max_view : 초기 화면에 보여줄 배너 갯수
* speed : 1000 당 1초.
* tAlgin : 정렬방식 (나병현 추가)
**/

(function($){
	$.fn.motionj_rolling_vertical = function(o){
		o = $.extend({
			width : 245,
			height : 60,
			max_view : 3,
			speed : 3000,
			pause: false,
            tAlign: 'left'
		}, o || {});

		return this.each(function(){
			var e = $(this);
			var e_ul = e.find('ul');
			var e_li_length = e.find('ul li').length;

			e.css({'position':'relative', 'width':o.width, 'height':o.height * o.max_view, 'overflow':'hidden'});
			e.find('ul').css({'position':'absolute', 'top':'0', 'left':'0', 'width':o.width});
			e.find('ul li').css({ float: 'left', 'position': 'relative', 'width': o.width, 'height': o.height, 'text-align': o.tAlign });
			e.find('ul li a img').css({float:'left'});

			e.mouseover(function(){o.pause = true;});
			e.mouseleave(function(){o.pause = false;});

			var act = function(){
				if(!o.pause){
					e.find('ul').animate({top:-o.height}, {complete : function(){
						e.find('ul li:first').clone().appendTo(e_ul);
						e.find('ul li:first').remove();
						e.find('ul').css('top','0');
					}});
				}
			}

			if(o.max_view < e_li_length){
				setInterval(act, o.speed);
			}
			$('.stop').click(function(){o.pause = true;});
			$('.play').click(function(){o.pause = false;});
			$('ul li a').focus(function(){o.pause = true;});
		});
		
	}
})(jQuery);