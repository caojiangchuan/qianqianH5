// console.log(' 310106197910040017  040017 ')
var app2 = new Vue({
    el: '#app2',
    data: {
        loading: true,    //
        page1:false,
        page2:false,
        appSwitch:false,
        score:0,
        time: new Date().toLocaleDateString().replace('/','-').replace('/','-')
    },
    mounted: function () {
        var self = this;

        if( typeof  app!="undefined"){
            self.appSwitch=true;
           // app.creditScore('222')
        }

        //添加银行卡开关
     //   self.showProgress();
        var customerId;
        if( GetQueryString('customerId') ){
            customerId=GetQueryString('customerId')
        }
        var data2027 = {
            customerId:customerId
        }
        var ag2027 = JSON.stringify(data2027);
        $.ajax({
            url: url2,
            timeout: 60000, //超时时间设置，单位毫秒60s
            type: "POST",
            dataType: "json",
            data: ({
                arg0:  '006013',
                arg1: ag2027
            }),
            async: false,
            success: function (res) {
               // self.closeProgress();
                console.log(res);
               // app.creditScore();
                if(res.msgEx.status == 0){
                    //获取芝麻分成功
                    self.score=res.msgEx.infos.score;
                    self.time=res.msgEx.infos.time;
                    if(!self.score){
                        self.page2=true;
                    }else{
                        setTimeout(function () {
                            if( typeof  app!="undefined"){
                                self.appSwitch=true;
                            }
                            if(self.appSwitch) app.creditScore(self.score)
                        },1000);
                        self.page1=true;
                    }

                }else{
                    self.page2=true;
                   // self.showMsg(res.msgEx.respDesc);
                }
            },
            error: function () {
                self.page2=true;
                // self.closeProgress();
                // self.showMsg("请求失败！");
            }
        });

    },
    methods: {
        closepage:function(){
                app.closeNowPage();
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
