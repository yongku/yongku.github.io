jQuery(function(){		
	// 랭킹
	var familyLayer = $('#lankLayer');
	$('#btn_lank,#lankLayer').hover(function(){
		familyLayer.show();
	},function(){
		familyLayer.hide();
	});
	$('.lank_close').click(function() {
		$(this).parent('div#lankLayer').hide();	
	});
	
	// 모바일 검색창
	/*
	$('button.srch_tab').bind('keyup click',function() {
		$(this).prev('.m_srch').stop().slideToggle();	
	});
	$('button.srch_tab2').bind('keyup click',function() {
		$(this).prev().prev('.m_srch2').stop().slideToggle();	
	});
	*/	
});

// 랭킹
function lankLayerShow(){
	document.getElementById("lankLayer").style.display='block';
}
function lankLayerHide(){
	document.getElementById("lankLayer").style.display ='none';
};

$(function(){
	$('#lst_problem>li').addClass('off')
	$('#lst_problem>li a').bind('click',function(){
		var idx=$(this).parent().index();
		
		if($(this).parent().hasClass('off')){
			$('#lst_problem>li').addClass('off').removeClass('on');
			$('.lst_production2.v2>li').hide();
			if($(window).width()>=768){
				$(this).parent().removeClass('off').addClass('on');
				$('#lst_problem>li.on .lst_production2.v2').show();
				$('.lst_production2.v2>li:eq('+idx+')').show();
			}else{
				$('#lst_problem>li.on .lst_production2.v2').show();
			};
		}else{
			$('#lst_problem>li.on .lst_production2.v2').hide();
			$(this).parent().removeClass('on').addClass('off');
			$('.lst_production2.v2>li:eq('+idx+')').hide();
		};
	});
	$(window).resize(function(){
		if($(window).width()<=768){
			$('#lst_problem>li').removeClass('on').addClass('off');
			$('#lst_problem>li.on .lst_production2.v2').hide();
		};
	});
	$('.txt_problem input').click(function(){
		$('#lst_problem>li.on .lst_production2.v2').hide();
		$('#lst_problem>li').removeClass('on').addClass('off');
	})
});

jQuery(function(){
	var process=null;
	var direct1="up";
	function upmv(){
		$(".lst_rolling").stop().animate(
			{top:"-17px"},300,function(){
				var $myobj=$(".lst_rolling li:first").clone(true);
				$(".lst_rolling li:first").remove();
				$(".lst_rolling").css("top",0);
				$(".lst_rolling").append($myobj);
			}
		)
		$(".lst_rolling_v2").stop().animate(
			{top:"-17px"},300,function(){
				var $myobj=$(".lst_rolling_v2 li:first").clone(true);
				$(".lst_rolling_v2 li:first").remove();
				$(".lst_rolling_v2").css("top",0);
				$(".lst_rolling_v2").append($myobj);
			}
		)
		if(process) clearTimeout(process)
		process=setTimeout(upmv,3000);
	}
	function downmv(){
		$(".lst_rolling").stop().animate(
			{top:"0px"},300,function(){
				var $myobj=$(".lst_rolling li:last").clone(true);
				$(".lst_rolling li:last").remove();
				$(".lst_rolling").css("top","-17px");
				$(".lst_rolling").prepend($myobj);
			}
		)
		$(".lst_rolling_v2").stop().animate(
			{top:"0px"},300,function(){
				var $myobj=$(".lst_rolling_v2 li:last").clone(true);
				$(".lst_rolling_v2 li:last").remove();
				$(".lst_rolling_v2").css("top","-17px");
				$(".lst_rolling_v2").prepend($myobj);
			}
		)
		if(process) clearTimeout(process)
		process=setTimeout(downmv,3000);
	}
	process=setTimeout(upmv,500);
	
	$(document).ready(function(){
		var $upbtn=$("#prev");
		var $downbtn=$("#next");

		$upbtn.click(function(){
			direct1="up";
			clearTimeout(process);
			upmv();
		});
		$downbtn.click(function(){
			direct1="down";
			clearTimeout(process);
			downmv();
		});
		$(".lst_rolling,.lst_rolling_v2").bind("mouseover focus",function(){
			clearTimeout(process);
			$(".lst_rolling,.lst_rolling_v2").stop();
		})
		$(".lst_rolling,.lst_rolling_v2").bind("mouseout blur",function(){
			if(direct1=="up"){
				upmv();
			}
			else{
				downmv();
			}
		})
	});
});

//GNB
jQuery(function(){

	$('#gnb').on('keyup mouseenter',function(){
		$('.gnb_total').css('display','block');
	});
	$('#gnb').on('mouseleave',function(){
		$('.gnb_total').css('display','none');		
    });
	$('.space_Lastlst').keydown(function(){
		$('.gnb_total').css('display','none');		
    });

	/*
	$('#sub_gnb li a').mouseleave(function(){
		$('.gnb_total').stop().slideUp('fast');
	});
	$('.gnb_total').mouseover(function(){
		$(this).stop().show();
	});
	$('.gnb_total').mouseleave(function(){
		$(this).stop().slideUp();
	});
	*/
});

function lankLayerHide2(){
//	document.getElementById('gnb_total').style.display ='none';
	$('.gnb_total').css('display','none');
};

//BEST 많이하는 질문
jQuery(function(){
	var toggleListBtn = $('.qna_close');
	$(toggleListBtn).toggle(
		function(){
			$(this).addClass('on');
			$(this).siblings('ol').slideUp('fast');
			$(this).text($(this).text().replace("접기","펼치기"));
		},
		function(){
			$(this).removeClass('on');
			$(this).siblings('ol').slideDown('fast');
			$(this).text($(this).text().replace("펼치기","접기"));
		}
	);
});


// 레이어팝업
jQuery(function(){
	$('.btn_help').bind('click',function(){
		$('.help_dec').hide()
		$(this).next().fadeIn('fast')
	})
	$('.btn_close').click(function(){
		$('.help_dec').fadeOut('fast')
	})
})

// 서브 갤러리
jQuery(function(){
	$('.problem.v2 ul li').addClass('off')
	$('.problem.v2 a').on('click',function(){
		var legh=$(this).parent().index();
			if($(this).parent().hasClass('off')){
				if($(window).width()>=768){
					$('.lst_production2 > li').each(function(){
						$('.lst_production2').css('display','block');
						$('.lst_production2 > li').hide();
						$('.problem.v2 li').removeClass('on').addClass('off');
						$('.section_problem').css('margin-bottom','-40px');
						$('div.txt_problem.v3').css('visibility','hidden');
					});
					$('.lst_production2 > li:eq('+legh+')').show().parent().parent().removeClass('off').addClass('on');
 		                var h = $('.problem .overflow li.on .lst_production2').height()
 		                var t = 84
                        var nextH = parseInt(h)
                        var nextHT = parseInt(h) + parseInt(t)
                    $('.section_problem').css('padding-bottom', nextH + 'px');
				}else{
					$('.lst_production2 > li').css('display','none');
                    $('.section_problem').css('padding-bottom', '0');
					$('.problem.v2 li').show();
				}
		}else{
			$(this).parent().removeClass('on').addClass('off');
			$('.lst_production2').css('border-bottom' , '0');
			$('.lst_production2 > li').css('display','none');
			$('.section_problem').css('margin-bottom','0');
			$('div.txt_problem.v3').css('visibility','visible');
			$('div.txt_problem.v3').css('margin-bottom','0');
			$('.txt_problem.v2').css({'position':'relative','top':'0'});
			$('.m_slide').addClass('on');
            $('.section_problem').css('padding-bottom', '0');
		};
	});

	$('.m_slide').toggle(function(){
		$(this).addClass('on');
	} , function(){
		$(this).removeClass('on');
	});

	$('.m_slide').toggle(function(){
		$('.problem.v2').show()
		}, function(){
		$('.problem.v2').hide()
	});

	$(window).resize(function(){
		if($(window).width()<768){
			$('.section_problem').css('margin-bottom','0');
			$('.lst_production2 > li').hide();
            $('.section_problem').css({'padding-bottom':'1px','height':''});
            $('.md_srch_result').css('margin-top','0');
		};
		if($(window).width()>=768){
 		       var h = $('.problem .overflow li.on .lst_production2').height();
               var nextH = parseInt(h)
			$('.lst_reserve #a1').css('padding-top','0');
            $('.section_problem').css('height', '176px');
            $('#Modelname_S').css('height', '260px');
		    $('div.txt_problem.v3').css('visibility','visible');
            $('.section_problem').css('padding-bottom', nextH + 'px');
            $('.md_srch_result').css('margin-top','80px');
			$('div.txt_problem.v3').show();
			$('.problem.v2').show();
		};
	});
	$('.lst_production2.v3 dd a').click(function(){
		$('.lst_production2 > li').hide();
		$('.lst_production2').css('border-bottom','0');
		$('.section_problem').css('margin-bottom','0');
		$('div.txt_problem.v3').css('visibility','visible');
		$('.txt_problem.v2').css({'position':'relative','top':'0'});
		$('.problem.v2 ul li').addClass('off').removeClass('');
        $('.section_problem').css({'height':'176px','padding-bottom':'0'});
        $('#Modelname_S').css({'height':'260px','padding-bottom':'0'});
	});
});


// 시각장애인용 사용설명서
$(function(){
 	$('#lst_disabled_Manuel>li').addClass('off')
	$('#lst_disabled_Manuel>li a').bind('click',function(){
		var idx=$(this).parent().index(); 

		if($(this).parent().hasClass('off')){
			$('#lst_disabled_Manuel>li').addClass('off').removeClass('on');
			$('.lst_disabled_Detailview').hide();
			if($(window).width()>=768){
				$(this).parent().removeClass('off').addClass('on');
				$('#lst_disabled_Manuel>li.on .lst_disabled_Detailview').show();
				$('.lst_disabled_Detailview>li:eq('+idx+')').show();
 		          var h = $('#lst_disabled_Manuel>li.on .lst_disabled_Detailview').height();
 		          var t = $('#lst_disabled_Manuel>li.on .lst_disabled_Detailview').css('top');
 		          var s = 30 ;
                  var nextH = parseInt(h) + parseInt(t) + parseInt(s);
                $('.disabled').css('height', nextH + 'px');
			}else{
				$(this).parent().removeClass('off').addClass('on');
				$('#lst_disabled_Manuel>li.on .lst_disabled_Detailview').show();
				$('.lst_disabled_Detailview>li:eq('+idx+')').show();
 		          var h = $('#lst_disabled_Manuel>li.on .lst_disabled_Detailview').height();
 		          var t = $('#lst_disabled_Manuel>li.on .lst_disabled_Detailview').css('top');
 		          var s = 30 ;
                  var nextH = parseInt(h) + parseInt(t) + parseInt(s);
                $('.disabled').css('height', nextH + 'px');
			};
		}else{
			$('#lst_disabled_Manuel>li.on .lst_disabled_Detailview').hide();
			$(this).parent().removeClass('on').addClass('off');
			$('.lst_disabled_Detailview>li:eq('+idx+')').hide();
            $('.disabled').css('height', '270px');
		};		
    });
	$(window).resize(function(){
		if($(window).width()<=768){
			$('#lst_disabled_Manuel>li').removeClass('on').addClass('off');
			$('#lst_disabled_Manuel>li.on .lst_disabled_Detailview').show();
		};
	});
});

//찾아오시는 길
jQuery(function(){
   $('.find_lst>li>a').addClass('off');
      var h = $('.find_lst li.on .find_lst_view>li').height();
      var t = 62 ;
      var nextH = parseInt(h) + parseInt(t);
      $('.find_lst').css('height', nextH + 'px');
	  $('.find_lst>li>a').bind('click',function(){
		  $('.find_lst>li').removeClass('on').addClass('off');
	         var idxn=$(this).parent().index();
		     if($(this).hasClass('off')){
		     	$('.find_lst>li a').removeClass('on');
	 	  	    $(this).parents().removeClass('off').addClass('on');
	  		  	$('.find_lst_view>li').hide();
		  		$(this).addClass('on');
			  	$('.find_lst_view>li:eq('+idxn+')').show();
 		          var h = $('.find_lst li.on .find_lst_view>li').height();
                  var t = 62 ;
                  var nextH = parseInt(h) + parseInt(t);
                $('.find_lst').css('height', nextH + 'px');
	  		}else{
		  		$(this).removeClass('on').addClass('off');
			  	$('.find_lst_view>li:eq('+idxn+')').show();
	  		};
      $('.find_lst').css('height', nextH + 'px');
	  });
	$(window).resize(function(){
          var h = $('.find_lst li.on .find_lst_view>li').height();
          var t = 62 ;
          var nextH = parseInt(h) + parseInt(t);
          $('.find_lst').css('height', nextH + 'px');
	});
});

// 로그인 스크립트
jQuery(function(){
	var iText = $('.form_spacing dd label').next('.form_spacing input');
	var ispan = $('.form_spacing dd label');
	ispan.css('position','absolute');
	iText.focus(function(){
		$(this).prev(ispan).css('visibility','hidden');
		})
	.blur(function(){
		if($(this).val() == ''){
			$(this).prev(ispan).css('visibility','visible');
		} else {
			$(this).prev(ispan).css('visibility','hidden');
		}
	})
	.change(function(){
		if($(this).val() == ''){
			$(this).prev(ispan).css('visibility','visible');
		} else {
			$(this).prev(ispan).css('visibility','hidden');
		}
	})
	.blur();
});

// value 스크립트
jQuery(function(){
	var labels = $('.center_txt');
	labels.css('position','absolute');
	$('.search_value').focus(function(){
		labels.css('visibility','hidden')
	})
});

// 서비스 예약
/*	
jQuery(function(){
	var toggleList='.lst_reserve';
	var toggleListBtn=toggleList+'>li>h3>a';
	$(toggleListBtn).parent().next('.srv_regist').hide();
	$(toggleListBtn).click(function(){
		$(this).parent().parent().siblings().children().children().removeClass('on').parent().next('.srv_regist').hide();
		$(this).toggleClass('on');
		$(this).parent().next('.srv_regist').slideToggle();
	});
});
*/

//제품군 팝업
jQuery(function(){
	var btnA = $('.ui_page li .fst_a');
	var lstUl = $('.ui_page ul');
	btnA.addClass('hide');
	btnA.bind('click' , function(){
		if($(this).hasClass('hide')){
			btnA.removeClass('show').addClass('hide'); // 클레스 초기화
			lstUl.slideUp('fast') // 컨텐츠 초기화
			$(this).removeClass('hide').addClass('show') // 이벤트 핸들러 클레스 변경
			$(this).next().slideDown('fast') // 컨텐츠 활성화
		}else{
			//alert('ddd')
			$(this).removeClass('show').addClass('hide');
			lstUl.slideUp('fast');
		}
	});
});

//통합검색
jQuery(function(){
/*	$('.wid_input input').focus(function(){
		$('.all_complet').css('display' , 'block');
	});*/
/*	$('.search_off').click(function(){
		$('.all_complet').css('display' , 'none');
	});*/
	$('.sv_bottom a.more').toggle(function(){
		$('.sv_bottom ul').css('height' , 'auto')
		$(this).text($(this).text().replace("더보기","접기"));
		$(this).addClass('on')
	} , function(){
		$('.sv_bottom ul').css('height' , '55px')
		$(this).text($(this).text().replace("접기","더보기"));
		$(this).removeClass('on')
	});
});

//삼성전자서비스 GIS
$(function(){
	$('.btn_fold').toggle(
		function(){
			$('.get_directions').css('margin-left','-350px')
			$('.map_area').css('margin-left','0')
			$(this).css('background-position','-540px -435px')
			$('.btn_map').css('left','5px')
		}
		,function(){
			$('.get_directions').css('margin-left','0')
			$('.map_area').css('margin-left','352px')
			$(this).css('background-position','-680px -435px')
			$('.btn_map').css('left','355px')
		}
	)
	$('.btn_map_close').toggle(
		function(){
			$('.btn_map').css('bottom','-39px')
			$(this).css('background-position','-315px -1035px')
		}
		,function(){
			$('.btn_map').css('bottom','0')
			$(this).css('background-position','-275px -1035px')
		}
	)
	$('.lst_directions>li>a').bind('click keyup',function(){
		var idxn=$(this).parent().index();
		$('.lst_directions>li').removeClass('on');
		$('.lst_directions_view>li').hide();
		$(this).parent().addClass('on');
		$('.lst_directions_view>li:eq('+idxn+')').show();
	});
	$('.lst_localsrch>li>input').bind('click keyup',function(){
		var idxn=$(this).parent().index();
		$('.lst_localsrch_view>li').hide();
		$(this).parent().addClass('on');
		$('.lst_localsrch_view>li:eq('+idxn+')').show();
	});
})

//사진 보기
$(function(){
	//$('.cs_photo_pop').hide();
	$('.photo_view_pop>a').bind('click keyup',function(){
		$('.cs_photo_pop').show()
	})
	$('.cs_photo_pop>a').bind('click keyup',function(){
		$('.cs_photo_pop').hide()
	})
})

//댓글 삭제
$(function(){
	$('.comm_lst .del_con').hide();
	$('.comm_lst .btn_comm_close').bind('click keyup',function(){
		if($(window).width()>=768){
			$('.comm_lst .del_con').addClass('on');
		}else{
			$(this).parent().addClass('on')
			$('.comm_lst .del_con').addClass('on');
		}
	})
	$(window).resize(function(){
		if($(window).width()>=768){
			$('.comm_lst .del_area').removeClass('on')
		}else{
			if($('.comm_lst .del_con').hasClass('on')){
				$('.comm_lst .del_area').addClass('on')
			}
		}
	});
})

//센터장
$(function(){
	$('.pic_center .center_colon').toggle(
		function(){
			if($(window).width()<=768){
				$('.pic_center img').show();
			};
		}
		,function(){
			if($(window).width()<=768){
				$('.pic_center img').hide();
			};
		}
	);
})

//하단 퀵
jQuery(function(){
	$('.lst_quick>li').addClass('off')
	$('.lst_quick a').bind('click',function(){
		var idxn=$(this).parent().index();
		if($(this).parent().hasClass('off')){
			$('.lst_quick>li').addClass('off').removeClass('on');
			$('.lst_quick_view>li').hide();
			$(this).parent().removeClass('off').addClass('on');
			$('.lst_quick_view>li:eq('+idxn+')').fadeIn();
			$('.quick_menu').css('width','960px')
		}else{
			$(this).parent().removeClass('on').addClass('off');
			$('.lst_quick_view>li:eq('+idxn+')').hide();
			$('.quick_menu').css('width','180px')
			/*$('.quick_menu').animate(
				{width:"180px"}
			)*/
		};
	});
	$('.lst_quick a').bind('keyup mouseover',function(){
		$(this).parent().addClass('cft');
	})
	$('.lst_quick a').bind('mouseleave',function(){
		$(this).parent().removeClass('cft');
	})
	$('.lst_quick_view>li .btn_close').bind('click',function(){
		$('.lst_quick_view>li').fadeOut();
	});
});

$(window).scroll(function(){
	var head = $("#header").height(),
		quick = $("div.quick"),
		footer = $("#footer").height(),
		quickHeight = quick.height(),
		contentsHeight = $("#container").height(),
		limit = contentsHeight - quickHeight,
		winscrolltop = $(window).scrollTop(),
		winscrollbtm = head + footer + contentsHeight - $(window).height();
		//alert(winscrollbtm)
	if (winscrolltop > winscrollbtm) {
		if( navigator.userAgent.toLowerCase().indexOf("msie 6") < -1 ) {
			$(quick).removeClass('btmScroll');
		}
		else {
			$(quick).css({"position" : "fixed","bottom" : "162px" ,"right" : "50%"});
		}
	}
	else {
		if( navigator.userAgent.toLowerCase().indexOf("msie 6") < -1 ) {}
		else {
			$(quick).css({"position" : "fixed","bottom" : "0px","right" : "50%"});
		}
	}
	if (winscrolltop > limit) {
		if( navigator.userAgent.toLowerCase().indexOf("msie 6") < -1 ) {
			$('.quick').addClass('btmScroll');
		}
	}
});

$(function () {
	var $win = $(window);
	function limitScroll() {
		var quick = $("div.quick");
		var footer = $("#footer");
		var	footerTop;
		var quickHeight;
		var limit;
		var tmp;
		
		if ( quick != null && quick != "undefined" && 
				footer != null && footer != "undefined" && 
					footer.offset() != null && footer.offset() != "undefined") {

			footerTop = footer.offset().top;
			quickHeight = quick.outerHeight();
			limit = footerTop - quickHeight;
			tmp = $(window).scrollTop();
			
			if (tmp > limit) {
				if( navigator.userAgent.toLowerCase().indexOf("msie 6") < -1 ) {
					$(quick).addClass('btmScroll');
				}
				else {
					quick.css({top: limit - tmp});
				}
			}
			
		}
	}
	limitScroll();
	$win.bind('scroll resize', limitScroll);
});

/* 딤드 리사이징 */
$(document).ready(function() {
	$('.dimmed').height(($(this).height() * 1)-0);
	$(window).resize(function(){
		$('.dimmed').height(($(this).height() * 1)-0);
		});
	}
);

/* 통합검색 토글 */
$(document).ready(function(){
	var btn_serch = $('a.searchs2');
	var serch_con = $('.search_more');
	btn_serch.addClass('off');
	btn_serch.click(function(){
		if(btn_serch.hasClass('off')){
			serch_con.slideDown('fast')
			btn_serch.addClass('mobi_down')
			$(this).removeClass('off').addClass('on');
		}else{
			serch_con.slideUp('fast')
			btn_serch.removeClass('mobi_down')
			$(this).removeClass('on').addClass('off');
		}
	});

	$('.default_btn a.btn_gray_v2').click(function(){
		serch_con.slideUp('fast');
		btn_serch.removeClass('on').addClass('off');
	});
});

/* 초기화 모바일 */
$(document).ready(function() {
	if($(window).width()<=768){
		$('input.cancel_btn').addClass('mobile');
	}
});

/* 출장서비스 레이어 팝업 */
$(document).ready(function(){
	$('.slideup_script .btn_cnt a').click(function(){
		$('.slideup_script').slideUp('slow')
	})
	$('.slideup_script .closeup').click(function(){
		$('.slideup_script').slideUp('slow')
	})
})
jQuery(function(){
	if(navigator.userAgent.match(/SAMSUNG SHV-E300L|SAMSUNG SHV-E300K|SAMSUNG SHV-E300S/)){
		//$('.wonder').css('background-color','yellow');
	};
});

/* 이달의 best10 컨텐츠 */
/*
$(function(){
 	$('.best10_list>li').addClass('off')
	$('.best10_list>li a').bind('click',function(){
		var idx=$(this).parent().index(); 

		if($(this).parent().hasClass('off')){
			$('.best10_list>li').addClass('off').removeClass('on');
			$('.best10_answer').hide('fast');
			if($(window).width()>=768){
				$(this).parent().removeClass('off').addClass('on');
				$('.best10_list>li.on .best10_answer').show('fast');
				$('.best10_answer>li:eq('+idx+')').show('fast');
			}else{
				$(this).parent().removeClass('off').addClass('on');
				$('.best10_list>li.on .best10_answer').show('fast');
				$('.best10_answer>li:eq('+idx+')').show('fast');
			};
		}else{
			$('.best10_list>li.on .best10_answer').hide('fast');
			$(this).parent().removeClass('on').addClass('off');
			$('.best10_answer>li:eq('+idx+')').hide('fast');
		};		
    });
	$(window).resize(function(){
		if($(window).width()<=768){
			$('.best10_list>li').removeClass('on').addClass('off');
			$('.best10_list>li.on .best10_answer').show('fast');
		};
	});
});
 */

/* 구글 웹로그 환경설정 */
/*
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-47543334-1', 'samsungsvc.co.kr');
ga('send', 'pageview');
*/