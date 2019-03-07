// console.log(' 310106197910040017  040017 ')
var app = new Vue({
    el: '.content',
    data: {
        loading: true,    //
        rm_con3:false,  //银行卡
        rm_c3_con:false, //银行卡
        closeLeRi:true,     //淡出方式
        rm_c3_con2:false,   //银行卡列表
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
        
        //
        $('.msg_con').on('click','li',function () {
            $(this).toggleClass('act');
        });

    },
    methods: {
        //点击还款
        repayment:function () {
            this.rm_con3=this.rm_c3_con=true;
        },
        //关闭还款
        rm_c3c_close:function () {
            this.rm_con3=this.rm_c3_con=false;
        },
        //打开银行卡列表
        bank_list:function(){
            this.rm_c3_con=false;
            this.rm_c3_con2=true;
        },
        //bank 返回
        rm_c4c_back:function () {
            this.rm_c3_con=true;
            this.rm_c3_con2=false;
        },
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