// console.log(' 310106197910040017  040017 ')
var app = new Vue({
    el: '.content',
    data: {
        loading: true,    //
    },
    beforeCreate:function () {
        // 判断登录
        if(!appSwitch)  testLogin();
    },
    mounted: function () {
        this.loading=false;
        //增加底部
        // $(".footer").load("footer.html");
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            pagination: {
                el: '.swiper-pagination',
            },
        })
    },
    methods: {

        appAlert: function (x) {
            var _this = this;
            setTimeout(function () {
                $('#appAlert').show()
            }, 5)
            this.anim3('bounceInUp')
            $('.biao_con').text(x);
            setTimeout(function () {
                _this.anim3('bounceOutDown');
            }, 2000)
            $('#appAlert').delay(2200).fadeOut()
        },
        anim3: function (x) {
            $('#appAlert').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $(this).removeClass();
            });
        }
    }

});