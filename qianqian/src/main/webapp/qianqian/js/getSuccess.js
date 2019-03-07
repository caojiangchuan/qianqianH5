var em = new Vue({
    el:'#warp',
    data: {
        appSwitch:false,
        info:'',
        url:decodeURIComponent(decodeURIComponent(window.location.href)),
        code:GetQueryString('code'),
        msg:GetQueryString('msg'),
        test:'',
        isSuccess:false,
        isTips: false,
        tips:''
    },
    created:function () {
        if( !GetQueryString('code')){
            window.location.href=this.url
        }else {
            console.log(GetQueryString('code'),'code')
            console.log(GetQueryString('msg'),'msg')
        }

        if(this.code){
           this.isSuccess=true
            this.tipsAlert(this.msg)
        }
        if(this.code!=0000){
            this.goIndex();
        }
    },
    mounted: function () {
        // if(this.code!=0000){
        //     // alert(this.code)
        //     // console.log('123123112')
        //     // alert('215151515')
        //     this.isSuccess = false
        //     if( typeof  app!="undefined"){
        //         self.appSwitch=true;
        //     }
        //     if(self.appSwitch) app.cashApplySuccess(this.test)
        //     this.closePage();
        //
        // }
    },
    methods: {
        closePage: function() {
            app.closeNowPage()
        },
        goIndex:function(){
            app.cashApplySuccess()
        },
        res_btn: function() {
            if( typeof  app!="undefined"){
                self.appSwitch=true;
            }
            if(self.appSwitch){
                this.goIndex();
            }

        },
        // 接口请求
        tipsAlert: function (text) {
            var self = this;

            self.tips = text;
            self.isTips = !self.isTips;
            setTimeout(function () {
                self.isTips = false;
            }, 1500);
            return false;
        }
    },



})
