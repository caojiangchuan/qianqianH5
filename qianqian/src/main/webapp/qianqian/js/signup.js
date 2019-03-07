// console.log(' 310106197910040017  040017 ')
var app = new Vue({
    el: '.content',
    data: {
        loading: false,    //
        page1: false,      //登录过
        page2: false,      //注册协议
        page3: false,      //注册、忘记密码
        page4: false,      //登录
        page5: false,      //确认密码
        page6: false,        //签约
        page4GoBack: false,
        checked: false,  //同意条款
        selectLoginMode: true,
        subState: 0,     //按钮提交状态
        gobackPage: 1,
        nowPage: 1,
        isAgreement:true,    //是否同意签约
        id:'',
        checkedCt: false,  //勾选
    },
    beforeCreate:function () {
        // 判断登录
        if(!appSwitch)  testLogin();
    },
    mounted: function () {
        if (localStorage.user) {
            this.page1 = true;
        } else {
            this.page4 = true;
        }
        window.addEventListener("hashchange", myHashchange);
        function myHashchange() {
          var urlHash=location.hash.split('#')[1];
        }
    },
    methods: {
        //注册同意条款
        agreeRule: function () {
            this.page2 = false;
            this.page3 = true;
            this.gobackPage = 2;
            this.nowPage = 3;
        },
        //选择登录方式
        selectLogin: function () {

        },
        submitIn: function (state) {
            var _this = this;
            if (state == '1') {
                //已有登录记录，只需密码；
                var pswd = $('.password1').val();
                if (!pswd) {
                    this.appAlert('请输入密码');
                    return;
                }
            } else if (state == '2') {
                //密码登录
                var tel = $('.p2_tel_in').val();
                var pswd = $('.p4_pswd').val();
                if (!isPhoneNum(tel) && !isIdCard(tel)) {
                    this.appAlert('请输入正确的身份证号/手机号！');
                    return;
                }
                if (!pswd) {
                    this.appAlert('请输入密码！');
                    return;
                }
                // 借新还旧:borrowNew  绑卡:saveBack
                var data = {
                    'identityNo': tel,
                    "password": hex_md5(pswd),
                }
                var ag1 = JSON.stringify(data);
                _this.loading = true;
                $.ajax({
                    url: url2,
                    timeout: 60000,
                    type: "POST",
                    dataType: "json",
                    data: ({
                        arg0: '002010',
                        arg1: ag1
                    }),
                    success: function (res) {
                        _this.loading = false;
                        if (res.code == '0000') {

                            if (res.msgEx.status == 0) {

                                if(res.msgEx.infos.code=='001004'){
                                    _this.appAlert(res.msgEx.infos.messge);
                                }else {

                                _this.appAlert("登录成功！");
                                setCookie('idCard',res.msgEx.infos.idCard);
                                setCookie('phone',res.msgEx.infos.phone);
                                setCookie("accountName", res.msgEx.infos.customerName);
                                if(res.msgEx.infos.joinType)    setCookie('joinType',res.msgEx.infos.joinType);
                                if(res.msgEx.infos.id)    _this.id=res.msgEx.infos.id;
                                // if(!res.msgEx.infos.isAgreement){
                                //     //_this.page6=true;
                                //     _this.contractBtn();
                                //     return;
                                // }
                                if(GetQueryString('redirectURL'))   window.location=GetQueryString('redirectURL');
                                    else    window.location='selectCard.html';
                            }}
                            else {
                                _this.appAlert(res.msgEx.respDesc);
                            }
                        } else {
                            _this.appAlert(res.msgEx.respDesc);
                        }
                    },
                    error: function () {
                        _this.loading = false;
                        _this.appAlert("网络繁忙，请稍后再试！");
                    }
                });

            }
            // else if(state=='3'){
            //   //短信登录
            //   var tel=$('.p2_tel_in').val();
            //   if(!isPhoneNum(tel)&&!isIdCard(tel)){
            //     this.appAlert('请输入正确的手机号！');
            //     return;
            //   }
            //   var code=$('.i_code2').val();
            //   if(!code){
            //     this.appAlert('请输入验证码！');
            //     return;
            //   }
            //
            // }
        },
        //发送验证码
        sendCode: function () {
            var _this = this;
            var tel = $('.p3_tel').val();
            if (!isPhoneNum(tel)) {
                this.appAlert('请输入正确的手机号！');
                return;
            }

            var send_code = $('.send_code');
            if (send_code.hasClass('disabled')) return;

            //13524013730
            var data = {
                'phone': tel,
                "smsType": '2'
            }
            var ag1 = JSON.stringify(data);
            _this.loading = true;
            $.ajax({
                url: url2,
                timeout: 60000,
                type: "POST",
                dataType: "json",
                data: ({arg0: '002004', arg1: ag1}),
                success: function (res) {
                    _this.loading = false;
                    if (res.code == '0000') {
                        if (res.msgEx.status == 0) {

                            var wait = 60;
                            time(send_code);
                            function time(o) {
                                if (wait == 0) {
                                    o.removeClass("disabled");
                                    o.text('发送验证码');
                                    wait = 60;
                                } else {
                                    o.addClass("disabled");
                                    o.text("重新发送" + wait + "s");
                                    wait--;
                                    setTimeout(function () {
                                        time(o)
                                    }, 1000)
                                }
                            }
                        } else {
                            _this.appAlert(res.msgEx.respDesc);
                        }
                    } else {
                        _this.appAlert("网络繁忙，请稍后再试！");
                    }
                },
                error: function () {
                    _this.loading = false;
                    _this.appAlert("网络繁忙，请稍后再试！");
                }
            });
        },
        //确认验证码
        testCode: function () {
            var _this = this;
            var tel = $('.p3_tel').val();
            var code = $('.i_code').val();
            if (!isPhoneNum(tel)) {
                this.appAlert('请输入正确的手机号！');
                return;
            }
            if (!code) {
                this.appAlert('请输入验证码！');
                return;
            }
            //13524013730
            var data = {
                'phone': tel,
                'smsCode': code,
                "smsType": '2'
            }
            var ag1 = JSON.stringify(data);
            _this.loading = true;
            $.ajax({
                url: url2,
                timeout: 60000,
                type: "POST",
                dataType: "json",
                data: ({arg0: '002005', arg1: ag1}),
                success: function (res) {
                    _this.loading = false;
                    if (res.code == '0000') {
                        if (res.msgEx.status == 0) {
                            _this.page5 = false;
                            _this.page4 = true;
                        } else {
                            _this.appAlert(res.msgEx.respDesc);
                        }
                    } else {
                        _this.appAlert("网络繁忙，请稍后再试！");
                    }

                },
                error: function () {
                    _this.loading = false;
                    _this.appAlert("网络繁忙，请稍后再试！");
                }
            });
        },
        //重置密码
        restPswd: function () {
            var tel = $('.p3_tel').val();
            var first_pswd = $('.p5_pswd').val();
            var again_pswd = $('.again_pswd').val();
            var _this = this;
            if (!first_pswd) {
                _this.appAlert('请输入密码！');
                return;
            }
            if (!again_pswd) {
                _this.appAlert('请再次输入密码！');
                return;
            }
            if (first_pswd != again_pswd) {
                _this.appAlert('两次输入的密码不一致，请重新输入！');
                return;
            }
            var data = {
                'phone': tel,
                'password': hex_md5(again_pswd),
            }
            var ag1 = JSON.stringify(data);
            _this.loading = true;
            $.ajax({
                url: url2,
                timeout: 60000,
                type: "POST",
                dataType: "json",
                data: ({arg0: '002003', arg1: ag1}),
                success: function (res) {
                    _this.loading = false;
                    if (res.code == '0000') {
                        if (res.msgEx.status == 0) {
                            _this.appAlert('修改成功！');
                            _this.page5 = false;
                            _this.page4 = true;
                        } else {
                            _this.appAlert(res.msgEx.respDesc);
                        }
                    } else {
                        _this.appAlert("网络繁忙，请稍后再试！");
                    }

                },
                error: function () {
                    _this.loading = false;
                    _this.appAlert("网络繁忙，请稍后再试！");
                }
            });
        },
        //签约
        contractBtn:function () {
            var _this=this;
            var data = {
                'customerId': _this.id,
            }
            var ag1 = JSON.stringify(data);
            _this.loading = true;
            $.ajax({
                url: url2,
                timeout: 60000,
                type: "POST",
                dataType: "json",
                data: ({arg0: '004026', arg1: ag1}),
                success: function (res) {
                    _this.loading = false;
                    if (res.code == '0000') {
                        if (res.msgEx.status == 0) {
                           // _this.page6 = false;
                            if(GetQueryString('redirectURL'))   window.location=GetQueryString('redirectURL');
                                 else    window.location='selectCard.html';

                        } else {
                            _this.appAlert(res.msgEx.respDesc);
                        }
                    } else {
                        _this.appAlert("网络繁忙，请稍后再试！");
                    }
                },
                error: function () {
                    _this.loading = false;
                    _this.appAlert("网络繁忙，请稍后再试！");
                }
            });

        },
        gopage: function (x, y) {
            this['page' + x] = false;
            this['page' + y] = true;
            this.gobackPage = x;
            this.nowPage = y;
            //  _this.eval(_hide)=false;
        },
        //返回
        goback: function (phide, pshow) {

            if (pshow) {
                this['page' + phide] = false;
                this['page' + pshow] = true;
            } else {
                var x = this.gobackPage;
                var y = this.nowPage;
                this['page' + y] = false;
                this['page' + x] = true;
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

});
