var vm = new Vue({
    el: "#app",
    data: {
        num: "",
        phone: GetQueryString('tel'),
        idCard:GetQueryString('idCard'),
        show: true,
        count: '',
        timer: null,
        tips: "",  //提示
        isTips: false,
        loadingPop: false,
        check:true,
        isclick: false
    },
    methods: {
        Gocheck:function(){
            this.check=!this.check
        },
        getCode: function () {
            var TIME_COUNT = 60;
            this.isclick = true;
            if (!this.timer) {
                var _this = this;
                this.show = false;
                this.count = TIME_COUNT;
                this.timer = setInterval(function () {

                    if (_this.count > 0 && _this.count <= TIME_COUNT) {
                        _this.count--;
                    } else {
                        _this.show = true;
                        clearInterval(_this.timer);
                        _this.timer = null;
                    }
                }, 1000)

            }
            ;

            var self = this;
            //短信验证接口
            var data = {
                cellPhone: self.phone,
            }
            var ag1 = JSON.stringify(data);
            $.ajax({
                url: url2,
                timeout: 60000,
                type: "POST",
                dataType: "json",
                data: ({
                    arg0: '006001',
                    arg1: ag1
                }),
                success: function (res) {
                    self.loading = false;
                    if (res.msgEx.status == "0") {
                       // console.log("验证码发送成功");
                        self.appAlert("验证码发送成功");
                    } else {
                        self.appAlert(res.msgEx.respDesc);
                    }

                },
                error: function (res) {
                    self.closeProgress();
                    self.appAlert("验证码请求失败！");
                }
            })


        },//验证码倒计时
        sign: function () {
            var self = this;
            if (self.isclick) {
                if ($(" #inpu ").val() == "") {

                    self.appAlert("请输入验证码！");
                }
                if ($(" #inpu ").val() !== "" && self.check == true) {
                    self.appAlert("请勾选协议！");
                } //信息框提醒

                if ($(" #inpu ").val() !== "" && self.check == false) {//确定快速认证接口

                    var data = {
                        cellPhone: self.phone,
                        validateCode: self.num,
                    }
                    self.showProgress();
                    var ag1 = JSON.stringify(data);
                    $.ajax({
                        url: url2,
                        timeout: 60000,
                        type: "POST",
                        dataType: "json",
                        data: ({
                            arg0: '006002',
                            arg1: ag1
                        }),
                        success: function (res) {
                            // self.loading = false;

                            if (res.msgEx.status == 0) {
                                console.log("登录成功");
                                setCookie('customerId', res.msgEx.infos.customerId);
                                //   self.appAlert(res.msgEx.respDesc);
                                //实名认证
                                var data6008 = {
                                    idCard: self.idCard,
                                    customerId: res.msgEx.infos.customerId,
                                }
                                var ag6008 = JSON.stringify(data6008);
                                $.ajax({
                                    url:url2,
                                    timeout:60000,
                                    type:"POST",
                                    dataType:"json",
                                    data:({
                                        arg0:'006008',
                                        arg1:ag6008
                                    }),
                                    success:function(res){
                                        self.closeProgress();
                                        // self.loading = false;
                                        if(res.msgEx.status == 0){
                                            console.log("实名认证");
                                            self.appAlert(res.msgEx.respDesc);
                                            var url = res.msgEx.infos.huaRuiUrl
                                            window.location.href=url
                                        }else{
                                            self.appAlert(res.msgEx.respDesc);
                                        }

                                    },
                                    error:function(res){
                                        self.closeProgress();
                                        self.appAlert("网络繁忙，实名认证失败！");
                                    }
                                })
                                //实名认证 end

                            } else {
                                self.closeProgress();
                                self.appAlert(res.msgEx.respDesc);
                            }

                        },
                        error: function (res) {
                            self.closeProgress();
                            self.appAlert("登录请求失败！");
                        }
                    })
                }
            } else {
                self.appAlert("请先获取短信验证码！");
            }


        },
        showProgress: function() {
            var self = this;
            if(appSwitch){
                app.showProgress();
            }else{
                self.loadingPop = true;
            }
        },
        closeProgress: function () {
            var self = this;
            if (appSwitch) {
                app.closeProgress();
            } else {
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
    }

})
