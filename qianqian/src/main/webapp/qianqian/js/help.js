$(function(){
    tabChange(1);
    $(".help-con").css("height",($(window).height()-250)+'px');
    $('.container').find('.box-3').click(function () {
        var i = $(this).index() + 1;
        tabChange(i);
    })

});
function tabChange(i){
    $(".page" + i).show().siblings().hide();
    $(".container").find(".box-3").eq(i-1).addClass("swiper-slide-active").siblings().removeClass("swiper-slide-active");
}
