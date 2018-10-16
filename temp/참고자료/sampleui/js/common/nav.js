function topGnb(index) {
	var interval;
	var oldIndex = index - 1;
	var thisIndex = null;
	var firstIndex = oldIndex;
	var lists = $('li.gnb_depth1');
	clearInterval(interval);

	var intervalFN = function() {
		addEvent(firstIndex, false);
		removeEvent(thisIndex, false);
		oldIndex = firstIndex;
	};

	//$('.sub_nav_bg').mouseleave(function(){
		
	//});
	$('#gnbNav').mouseleave(function() {
		$('.nav').stop().animate({
			height:58,
			opacity:1
		},250);
		$('.nav').css({ 'border-bottom': '0'});
		$('.gnb_depth2').stop().animate({
			top:-231,
			opacity:0
		},250);
			
		interval = setTimeout(intervalFN, 0);
		
	});
	var removeEvent = function(oldIndex, depth) {
		if(depth === false && firstIndex == thisIndex) return;
	};

	var addEvent = function(thisIndex, depth) {
		lists.removeClass('selected');

		lists.eq(thisIndex).addClass('selected');
		if(isNaN(thisIndex) === false)

		lists.eq(thisIndex).find('li').mouseenter(function() {
		}).mouseleave(function() {
			if($(this).hasClass('selected') === true) return;

		});
	};

	var b = function() {
		$('.nav').stop().animate({
			height:289,
			opacity:1
		},250);
		$('.nav').css({ 'border-bottom': '3px solid #0d4c99'});
		$('.gnb_depth2').stop().animate({
			top:58,
			opacity:1
		},250);

		thisIndex = lists.index(this);
		if(oldIndex != null && thisIndex != oldIndex && isNaN(oldIndex) === false){
			removeEvent(oldIndex);
		}
		addEvent(thisIndex);
		oldIndex = thisIndex;

		return false;
	};

	lists.bind('mouseenter', b);
	lists.find('a.gnblink').bind('focus', function() {
		b.apply($(this).parents('#gnbArea > ul > li')[0]);
	});
	
	var focusElementFilter = "a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]";
	var focusElements = $('#gnbArea').find('*').filter(focusElementFilter).filter(':visible');
	focusElements.bind('focus', function() {
		$(this).bind('keydown', function(e) {
			//tab:9, 
			if(e.which == 9) {
				if(e.shiftKey) {
					if(focusElements.index(this) == 0) {
						$('#gnbArea').trigger('mouseleave');
					}
				} else {
					if($(this)[0] == focusElements.last()[0]) {
						$('#gnbArea').trigger('mouseleave');
					}
				}
			}
		});
	});
}

$(function(){
	$(window).scroll(function() {
		navigation.scroll();
	});
});

var navigation = {
	settings : {
		offset: 58
	},
	scroll : function() {
		var scroll_top = $(window).scrollTop() * 1;
		var scroll_bottom = ($(document).height() - $(window).height() - $(window).scrollTop()) * 1;

		if( scroll_top > navigation.settings.offset ) {
			$('.navigation').css({ 'position': 'fixed', 'top': 0 });
		} else {
			$('.navigation').css({ 'position': 'relative', 'top': 0 });
		}
	}
};

//// body insert <script type="text/javascript">topGnb();</script>