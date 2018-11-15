$(document).ready(function(){
    //title images
    var $sImage_length=$('.sImage').length;
    var a=1;
    var $tText=['PREV','&&','TO','||','NEXT'];
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
    },4000)
    //logo
    var text_arr=[];
    $('.logo').each(function(i,e){
        text_arr.push($(e).text());
        $(e).text('');
    })
    for(i=0;i<text_arr[0].length;i++){
        $('.logo').append('<strong>'+text_arr[0][i]+'</strong>');
        $('.logo').children('strong').eq(i).css({
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
            $('.tnbWrap').addClass('fix');
        }else{
            $('.tnbWrap').removeClass('fix');
        }
    })
    // section scroll
    var $tnbHeight=$('.tnbWrap').height();
    var $tnbBtn=$(".tnb > ul > li");
    var $local=$(".tWrap > section");
    $tnbBtn.click(function(e){
        e.preventDefault();
        var $target=$(this);
        var $index=$target.index();
        var $section=$local.eq($index);
        var $offset=$section.offset().top;
        if($index<2){
            $("body, html").animate({scrollTop:$offset},400);
        }else{
            $("body, html").animate({scrollTop:$offset-$tnbHeight},400);
        }    
    });
    $(window).scroll(function(){
        if ($(document).scrollTop() < $local.eq(1).offset().top){
            $tnbBtn.eq(0).children('strong').css('color','#f00');
            $tnbBtn.eq(0).siblings().children('strong').css('color','#fff');
            $tnbBtn.eq(0).siblings().children('.tnbUnderbar').remove();
            $('.tnbMenu').eq(0).append('<div class="tnbUnderbar" style="background:#f00;"></div>');
        }else if($(document).scrollTop() < $local.eq(2).offset().top-$tnbHeight){
            $tnbBtn.eq(1).children('strong').css('color','#f80');
            $tnbBtn.eq(1).siblings().children('strong').css('color','#fff');
            $tnbBtn.eq(1).siblings().children('.tnbUnderbar').remove();
            $('.tnbMenu').eq(1).append('<div class="tnbUnderbar" style="background:#f80;"></div>');
        }else if($(document).scrollTop() < $local.eq(3).offset().top-$tnbHeight){
            $tnbBtn.eq(2).children('strong').css('color','#ff0');
            $tnbBtn.eq(2).siblings().children('strong').css('color','#fff');
            $tnbBtn.eq(2).siblings().children('.tnbUnderbar').remove();
            $('.tnbMenu').eq(2).append('<div class="tnbUnderbar" style="background:#ff0;"></div>');
        }else{
            $tnbBtn.eq(3).children('strong').css('color','#0f0');
            $tnbBtn.eq(3).siblings().children('strong').css('color','#fff');
            $tnbBtn.eq(3).siblings().children('.tnbUnderbar').remove();
            $('.tnbMenu').eq(3).append('<div class="tnbUnderbar" style="background:#0f0;"></div>');
        }
    })
    // svg animation
    $('.poMenu li').click(function(){
            $(this).find('path').css('animation','pathani 7s cubic-bezier(.3,0.3,.1,.8)');
    })
    // svg path number
    var $svgPathNumber=[];
    for(d=0;d<$('path').length;d++){
        $pathNumber1=$('path').eq(d).attr('d').split(',').length;
        $pathNumber2=$('path').eq(d).attr('d').split('.').length;
        $('path').css('stroke-dasharray',$pathNumber1+$pathNumber2);
        $svgPathNumber.push($pathNumber1+$pathNumber2);
    }
    // portfolio type
    var $poList=['.total','.copy','.htmlTest','.cssTest','.jqTest'];
    var $poMenuLi=$('.poMenu ul li');
    $poMenuLi.click(function(){
        $(this).find('path').css({'fill':'#ff0','stroke':'#ff0'});
        $(this).siblings().find('path').css({'fill':'#fff','stroke':'#fff'});
        var $clickIndex=$(this).index();
        var $clickName=$poList[$clickIndex];
        var $clickName2=$poList[$clickIndex+1];
        if($(document).width()>1024){
            if($clickName==='.total'){
                $('.viewList li').fadeIn();
            }else{
                $('.viewList').find($clickName).siblings().fadeOut();
                $('.viewList').find($clickName).fadeIn();
            }
        }else{
            $('.viewList').find($clickName2).siblings().fadeOut();
            $('.viewList').find($clickName2).fadeIn();
        }
    })
    // portfolio list hover --> make cover
    $('.poList img').hover(function(){
        // $(this).append('<div class="cover"><img src="images/portfolio/bg_recom.png" alt="expandimage"></div>')
        $(this).css({'width':'105%','height':'105%'})
    },function(){
        $(this).css({'width':'100%','height':'100%'})
    })
    //polist 
    if($(document).width()<1024){
        $('.poMenu ul li').eq(0).remove();
        $('.copy').siblings().fadeOut();
        $('.copy').fadeIn();
    }
    console.log($(document).width())
    // fancy box
    $('.viewList li').click(function(){
        var bg_idx=-1;
        bg_idx=bg_idx+10;
        link=$(this).find('img').attr('alt');
        $('.link').attr('href',link);
        $('.fancyBx').append('<div class="fancyImg"><img src="'+$(this).find('img').attr('src')+'"></div>');
        $('.fancyBg').css('z-index',bg_idx);
        $('.fancyBg').stop().animate({width:'100%',height:'100%',top:'0',left:'0'},1000);
        $('.fancyBg').click(function(){
            bg_idx=bg_idx-10;
            $('.fancyBg').stop().animate({width:'0',height:'0',top:'50%',left:'50%'},1000);
            setTimeout(function(){
                $('.fancyBg').css('z-index',bg_idx);
                $('.fancyImg').remove();
            },700)
            $('.viewList li a').click(function(){
                setTimeout(function(){
                    $('.fancyBg').css('z-index',bg_idx-10);
                    $('.fancyImg').remove();
                },100)
            })
        })
    })
    //send button
    $('.sendBtn').click(function(){
        alert('서비스 준비중입니다.')
    })
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
    var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/5bd7a9bc476c2f239ff68306/default';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
    })();
})