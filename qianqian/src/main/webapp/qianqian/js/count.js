// console.log(' 310106197910040017  040017 ')
var app = new Vue({
    el: '.content',
    data: {
        loading: true,    //
        money:''
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


        var data600001 = {
            appCurrentTime:'data',
            sysCode: 'Zdqq'
        }
        var ag600001 = JSON.stringify(data600001);
        $.ajax({
            url: url2,
            timeout: 60000, //超时时间设置，单位毫秒60s
            type: "POST",
            dataType: "json",
            data: ({
                arg0: '001001',
                arg1: ag600001
            }),
            async: false,
            success: function (res) {
                _this.closeProgress();
                console.log(res);
                if(res.msgEx.status == 0){

                }else{
                       _this.appAlert(res.msgEx.respDesc);
                }
            },
            error: function () {
                _this.closeProgress();
                _this.appAlert("请求失败！");
            }
        });

    },
    methods: {
        make:function(){
            var _this = this;
            var num = $(".ct_ipt1").val()
            var money_num = parseInt(num);
            if(!this.money){
               _this.closeProgress();
                _this.appAlert("请填写申请金额！");
            }else{
                if(money_num<20001||money_num>150000){
                    _this.closeProgress();
                _this.appAlert("申请金额范围在20001-150000之间");
                   
                }
            }
        },
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

        showProgress: function() {
            var self = this;

            if(appSwitch){
                app.showProgress();
            }else{
                self.loadingPop = true;
            }
        },
        closeProgress: function() {
            var self = this;

            if(appSwitch){
                app.closeProgress();
            }else{
                self.loadingPop = false;
            }
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
    },
    watch:{
        money:function () {
            if(this.money.split('')[0]!='￥'){
                this.money='￥'+this.money;
            }
            if(this.money=='￥'){
                this.money=""
            }
        }
    }

});