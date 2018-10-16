$(document).ready(function(){
    $cBox = $('.container > div');
    $close = $('.close');
    $close.click(function(){
        $cBox.slideUp();
    })
})