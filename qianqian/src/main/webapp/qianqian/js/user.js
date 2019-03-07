// console.log(' 310106197910040017  040017 ')
var app = new Vue({
    el: '.content',
    data: {
        loading: true,    //
        page1:true,
        page2:false
    },
    beforeCreate:function () {
        // 判断登录
        if(!appSwitch)  testLogin();
    },
    mounted: function () {
        var _this=this;
        _this.loading=false;
        window.location.hash='';
        window.addEventListener('hashchange',function(e) {
            var hsah=window.location.hash;
            if(hsah==''){
                _this.page1=true;
                _this.page2=false;
            }
        },false);

    },
    methods: {
        restPsw:function () {
            this.page1=false;
            this.page2=true;
            window.location.hash='p2';
        },
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