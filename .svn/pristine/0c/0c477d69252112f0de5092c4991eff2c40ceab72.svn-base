$(document).ready(function(){
    $('.pick').click(function(){
        $(this).css('background','rgb(0, 153, 255)');
        $(this).children().last().addClass('on');
        $(this).siblings().css('background','#fff');
        $(this).siblings().children().removeClass('on');
        })
        var $dep2 = $('.mainmenu > li > ul');
    $('.mainmenu').hover(function(){
        $dep2.slideDown();
        },function(){
        $(this).css('background','#fff');
        $dep2.slideUp();
        })
    $pal = $('.dropDown');
    $chil = $('.dropDown li');
    $lang = $('.dropDown p');
    var a = 0;
    $pal.click(function(){
        a+=1;
        if(a<2){
            $(this).children().slideDown();
        }else{
            $(this).find('li').slideUp();
            return a=0;
        }
        console.log(a);
    })
    $chil.click(function(){
        $(this).parent().find('p').text($(this).text());
    })
    console.log($lang);
    })