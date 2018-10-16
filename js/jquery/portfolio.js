$(document).ready(function(){
    //title images
    var $sImage_length=$('.sImage').length;
    var a=1;
    var $tText=['one','two','three','four','five'];
    var c=1;
    setInterval(function(){
        if(c < $sImage_length){
            $('.aground strong').text($tText[a]);
            $('.sImage').eq(c).prev().removeClass('on');
            $('.sImage').eq(c).addClass('on');
            $('.sImage').eq(c).css('z-index',c+1);
            a+=1;
            c+=1;
        }else{
            $('.aground strong').text($tText[0]);
            $('.sImage').removeClass('on');
            $('.sImage').css('z-index','0');
            $('.sImage').eq(0).addClass('on').css('z-index','1');
            a=1;
            c=1;
        }
        console.log($sImage_length);
        console.log(c)
    },4000)
    //logo
    var text_arr=[];
    $('.logo h1').each(function(i,e){
        text_arr.push($(e).text());
        $(e).text('');
    })
    for(i=0;i<text_arr[0].length;i++){
        $('.logo h1').append('<strong>'+text_arr[0][i]+'</strong>');
        $('.logo h1').children('strong').eq(i).css({
            'animation-name':'logo',
            'animation-duration':'7s',
            'animation-delay':i+'s',
            'animation-iteration-count':'infinite'
        })
    }
    // about scroll
    $(window).scroll(function(){
        var $tnbfix = $('.portfolio').offset();
        if ($(document).scrollTop() > $tnbfix.top){
            $('.tnb').addClass('fix');
        }else{
            $('.tnb').removeClass('fix');
        }
    })
    // section scroll
    var $tnbBtn=$(".tnb > ul > li");
    var $local=$(".tWrap > div");
    $tnbBtn.click(function(e){
        e.preventDefault();
        var $target=$(this);
        var $index=$target.index();
        var $section=$local.eq($index-1);
        var $offset=$section.offset().top;
        $("body, html").animate({scrollTop:$offset},400);
		});
    $(window).scroll(function(){
        if ($(document).scrollTop() < $local.eq(1).offset().top){
            $tnbBtn.eq(1).children('strong').css('color','#f00');
            $tnbBtn.eq(1).siblings().children('strong').css('color','#fff');
            $tnbBtn.eq(1).siblings().children('.tnbUnderbar').remove();
            $('.tnbMenu').eq(0).append('<div class="tnbUnderbar" style="background:#f00;"></div>');
        }else if($(document).scrollTop() < $local.eq(2).offset().top){
            $tnbBtn.eq(2).children('strong').css('color','#f80');
            $tnbBtn.eq(2).siblings().children('strong').css('color','#fff');
            $tnbBtn.eq(2).siblings().children('.tnbUnderbar').remove();
            $('.tnbMenu').eq(1).append('<div class="tnbUnderbar" style="background:#f80;"></div>');
        }else if($(document).scrollTop() < $local.eq(3).offset().top){
            $tnbBtn.eq(3).children('strong').css('color','#ff0');
            $tnbBtn.eq(3).siblings().children('strong').css('color','#fff');
            $tnbBtn.eq(3).siblings().children('.tnbUnderbar').remove();
            $('.tnbMenu').eq(2).append('<div class="tnbUnderbar" style="background:#ff0;"></div>');
        }else{
            $tnbBtn.eq(4).children('strong').css('color','#0f0');
            $tnbBtn.eq(4).siblings().children('strong').css('color','#fff');
            $tnbBtn.eq(4).siblings().children('.tnbUnderbar').remove();
            $('.tnbMenu').eq(3).append('<div class="tnbUnderbar" style="background:#0f0;"></div>');
        }
    })
    console.log($('.portfolio').offset().top)
    console.log($(document).scrollTop())
    console.log($local.eq(1).offset().top);
    console.log($(document).height());
    console.log($(window).scrollTop());
    // portfolio type
    $poTotal=$('.poMenu ul li').eq(0);
    $poCopy=$('.poMenu ul li').eq(1);
    $poHtml=$('.poMenu ul li').eq(2);
    $poCss=$('.poMenu ul li').eq(3);
    $poJq=$('.poMenu ul li').eq(4);
    $poTotal.click(function(){
        $(this).children('span').css('color','#ff0');
        $(this).siblings().children('span').css('color','#fff');
        $('.copy').add('.htmlTest').add('.cssTest').add('.jqTest').fadeIn();
    })
    $poCopy.click(function(){
        $(this).children('span').css('color','#ff0');
        $(this).siblings().children('span').css('color','#fff');
        $('.copy').show();
        $('.htmlTest').add('.cssTest').add('.jqTest').hide();
    })
    $poHtml.click(function(){
        $(this).children('span').css('color','#ff0');
        $(this).siblings().children('span').css('color','#fff');
        $('.htmlTest').fadeIn();
        $('.copy').add('.cssTest').add('.jqTest').hide();
    })
    $poCss.click(function(){
        $(this).children('span').css('color','#ff0');
        $(this).siblings().children('span').css('color','#fff');
        $('.cssTest').fadeIn();
        $('.copy').add('.htmlTest').add('.jqTest').hide();
    })
    $poJq.click(function(){
        $(this).children('span').css('color','#ff0');
        $(this).siblings().children('span').css('color','#fff');
        $('.jqTest').fadeIn();
        $('.copy').add('.htmlTest').add('.cssTest').hide();
    })
    // portfolio list scroll
    $(function(){
        $('.poList ul').slimScroll({
            position: 'right',
            color:'#00f',
            railColor:'#fff',
            wheelStep: 8,
            railOpacity:0.3,
            height: '100%',
            railVisible: true,
            alwaysVisible: true
        });
    })
    // fancy box
    $('.cover').click(function(){
        var bg_idx=-1;
        bg_idx=bg_idx+10;
        $('.fancyBx').append('<div class="fancyImg"><img src="'+$(this).siblings().children('img').attr('src')+'"></div>');
        $('.fancyBg').css('z-index',bg_idx);
        $('.fancyBg').stop().animate({width:'100%',height:'100%',top:'0',left:'0'},1000);
        $('.fancyBg').click(function(){
            bg_idx=bg_idx-10;
            $('.fancyBg').stop().animate({width:'0',height:'0',top:'50%',left:'50%'},1000);
            setTimeout(function(){
                $('.fancyBg').css('z-index',bg_idx);
                $('.fancyImg').remove();
            },700)
        })
    })
    //send button
    $('.sendBtn').click(function(){
        alert('서비스 준비중입니다.')
    })
})