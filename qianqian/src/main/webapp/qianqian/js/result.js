var em = new Vue({
    el:'#warp',
    data: {
        isSuccess: true,
        customerId: '',
        appSwitch:false,
        info:'',
        url:decodeURIComponent(decodeURIComponent(window.location.href)),
        code:GetQueryString('code'),
        msg:GetQueryString('msg'),
        test:'',

    },
    created:function () {

        if( typeof  app!="undefined"){
            self.appSwitch=true;
        }
        var params = {
            customerId: this.customerId
        }

        console.log(this.url)
        if( !GetQueryString('code')){
            window.location.href=this.url
        }else {
            var aaa = GetQueryString('customerId')
            var arr=aaa.split("?");
            this.customerId=arr[0]
            console.log(this.customerId)
        }
        this.test='{"code":'+JSON.stringify(this.code)+',"msg":"'+this.msg+'"}';
        // alert(this.test)
        if(this.code){
            if(this.code==0000) {
                this.isSuccess = false
                // alert('code存在')
                this.getOpeningResult()
            }
        }
    },
    mounted: function () {

        var self = this
        self.test='{"code":'+JSON.stringify(self.code)+',"msg":"'+self.msg+'"}';
        // alert(self.url)
        if(self.code!=0000&&self.code){
            // alert(self.test)
            self.isSuccess = false
         setTimeout(function () {
             if( typeof  app!="undefined"){
                 self.appSwitch=true;
             }
             if(self.appSwitch) {
                 // alert('code不存在')
                 app.setSignCardInfo(self.test)
                 self.closePage();
             }
         },0)
        }

    },
    methods: {
        closePage: function() {
            app.closeNowPage()
        },
        res_btn: function() {
            if( typeof  app!="undefined"){
                this.appSwitch=true;
            }
                if(this.appSwitch){
                    app.setSignCardInfo(this.info)
                    this.closePage();
                }
            console.log('点击了按钮',this.customerId)
        },
        // 接口请求
        getOpeningResult: function(item) {
            var that = this
            console.log('调用了', that.isSuccess)
            var data = {
                customerId: this.customerId,
            }
            var ag1 = JSON.stringify(data);
            $.ajax({
                url: url2,
                timeout: 60000, //超时时间设置，单位毫秒60s
                type: "POST",
                dataType: "json",
                data: ({
                    arg0: '006020',
                    arg1: ag1
                }),
                async: true,
                success: function (res) {
                    that.isSuccess = false
                    if(res.msgEx.status==0){

                        var infos = res.msgEx.infos
                        that.info=JSON.stringify(infos)

                        setTimeout(function () {
                            if( typeof  app!="undefined"){
                                that.appSwitch=true;
                            }
                            if(that.appSwitch) app.setSignCardInfo(that.info)
                        },1000);

                          if(infos.code!=0000){
                              // alert('不是四个0')
                              if( typeof  app!="undefined"){
                                  that.appSwitch=true;
                              }
                              if(that.appSwitch) {
                                  app.setSignCardInfo(that.info)
                                  that.closePage();
                              }
                          }

                    }else {
                        // alert('接口错误')
                        if( typeof  app!="undefined"){
                            that.appSwitch=true;
                        }
                        if(that.appSwitch) {
                            var mes ='{"code":'+JSON.stringify(1111)+',"msg":"'+res.msgEx.respDesc+'"}';
                            app.setSignCardInfo(mes)
                            that.closePage();
                        }
                    }

                }
            })
        }
    }


})
