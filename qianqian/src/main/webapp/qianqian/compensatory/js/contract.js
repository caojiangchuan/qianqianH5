$.getScript("js/photoswipecontrol.js",function(){
    //console.log('放大缩小加载成功');
});

var vm = new Vue({
    el: '#app',
    data: {
        loanNo: null,
        isShow: false,
        isSignShow: true,
        isMask: false,
        isMaskGrey: false,
        moreFiles: [],
        moreFilesActive: "0",
        selectMenuText: "",
        checked: false,  //勾选
        sendCodeActive: false,
        btnActive: false,
        codeOff: true,
        tips: "",  //提示
        isTips: false,
        code: "",  //验证码
        show: true,
        count: '60',
        timer: null,
        failPop: false,
        failMessage: "",
        isCloseBtn: false,
        failIconClass: "",
        isNextSetpBtn: false,
        urlLcb: "",
        isGoNext: true,
        loadingPop: false,
        from: "normal",
        idCard:GetQueryString("idCard"),
        moreFilesphone:localStorage.getItem('dc-phone'),
        loading:true,
        isCheckedSendCode: false,
        goTop:true


    },
    beforeCreate:function () {
        // 判断登录
        //if(!appSwitch)  testLogin();
    },
    mounted: function() {
        var self = this;
        // self.loanNo = GetQueryString("loanNo");
        //
        // //from —— normal:正常签章  jxhj:借新还旧
        // self.from = GetQueryString("from");
        self.from='normal'
        if(self.from == "normal"){
            //征审获取合同签名结果(内部合同轮询)
            var data8005 = {
                idCard:localStorage.getItem('dc-idCard'),
                borrowIdCard:localStorage.getItem('idNum'),
                contractNum:localStorage.getItem('contractNum'),
                contactName:localStorage.getItem('dc-backName'),
                compsyAmount:localStorage.getItem('dc-backMoney'),
                name:localStorage.getItem('lendName'),
                loanNo:localStorage.getItem('loanNo'),
                mobile:localStorage.getItem('dc-phone'),
                loanBelong:localStorage.getItem('loanBelong'),
                accountBank:localStorage.getItem('dc-bank'),
                accountNum:localStorage.getItem('dc-account'),
                accountBranchBank:localStorage.getItem('dc-branchBank'),
                verifyCode:localStorage.getItem('verifyCode'),
                // verifyCode:'94189734',


            }
            var ag8005 = JSON.stringify(data8005);
            $.ajax({
                url: url2,
                timeout: 60000, //超时时间设置，单位毫秒60s
                type: "POST",
                async: false,
                dataType: "json",
                data: ({
                    arg0: '008005',
                    arg1: ag8005
                }),
                success: function (res) {
                    self.loading=false
                    console.log(res);
                    if (res.msgEx.status == 0) {

                        if(res.msgEx.infos.status==02 || res.msgEx.infos.status==03){
                            window.location='repay-success.html'
                        }
                        if(res.msgEx.infos.status==04){
                            window.location='repay-fail.html?noMoney=1'
                        }
                        if(res.msgEx.infos.status==05){
                            window.location='repay-fail.html?outTime=1'
                        }else {

                                var data006005 = {
                                    idCard: localStorage.getItem('dc-idCard'),
                                    loanNo: localStorage.getItem('loanNo'),
                                    userName: localStorage.getItem('lendName'),
                                    phone: localStorage.getItem('dc-phone'),
                                    type: '5'
                                }
                                var ag006005 = JSON.stringify(data006005);
                                $.ajax({
                                    url: url2,
                                    timeout: 60000, //超时时间设置，单位毫秒60s
                                    type: "POST",
                                    async: true,
                                    dataType: "json",
                                    data: ({
                                        arg0: '006005',
                                        arg1: ag006005
                                    }),
                                    success: function (res) {
                                        self.loading = false
                                        console.log(res);
                                        if (res.msgEx.status == 0) {
                                            self.moreFiles = res.msgEx.infos;
                                            self.closeProgress();
                                            //显示第一张图片
                                            self.filesOpen(0, res.msgEx.infos[0].fileName)
                                            self.isShow = false
                                            self.isMask = false;
                                        } else {
                                            self.failMessage = res.msgEx.respDesc;
                                            self.failPop = !self.failPop;
                                            self.failIconClass = "next_setp";
                                            self.isCloseBtn = true;
                                        }
                                    },
                                    error: function () {
                                        self.loading = false
                                        self.tipsAlert("网络异常，请重试！");
                                        //不再请求合同列表接口
                                        self.isGoNext = false;
                                    }
                                });
                                // if (res.msgEx.infos.lcbstatus) {
                                //     self.closeBtn();
                                // } else {
                                //     // if (res.msgEx.infos.status == 0) {
                                //     //     // self.failMessage = "根据合同规定要求，客户需要在<span>捞财宝</span>完成信息确认后才可进行下一步";
                                //     //     // self.failPop = !self.failPop;
                                //     //     // self.failIconClass = "next_setp";
                                //     //     // self.isNextSetpBtn = true;
                                //     //     // self.urlLcb = res.msgEx.infos.urlLcb;
                                //     //     // //不再请求合同列表接口
                                //     //     // self.isGoNext = false;
                                //     //
                                //     // }
                                // }

                        }

                    }else {
                        self.tipsAlert(res.msgEx.respDesc);
                        //不再请求合同列表接口
                        self.isGoNext = false;
                        self.loading = false
                    }
                },

                error: function () {
                    self.loading=false
                    self.tipsAlert("请求失败！");
                    //不再请求合同列表接口
                    self.isGoNext = false;
                }
            });
        }else {
            console.log("from:"+ self.from);
        }

        // if(self.isGoNext){
        //     //查询合同列表 生成
        //     var data2021 = {
        //         loanNo:self.loanNo
        //     }
        //     var ag2021 = JSON.stringify(data2021);
        //     $.ajax({
        //         url: url2,
        //         timeout: 60000, //超时时间设置，单位毫秒
        //         type: "POST",
        //         async: false,
        //         dataType: "json",
        //         data: ({
        //             arg0: '002021',
        //             arg1: ag2021
        //         }),
        //         success: function (res) {
        //             console.log(res);
        //             if (res.msgEx.status == 0) {
        //                 self.moreFiles = res.msgEx.infos;
        //
        //                 console.log("fileNum:" + self.moreFiles.attachment[0].fileNum);
        //
        //                 self.showProgress();
        //                 //加载合同文件
        //                 self.selectMenuText = encodeURI(url3 + "?arg0=002022&arg1={'fileNum':'" + self.moreFiles.attachment[0].fileNum +"'}"); //图片列表
        //
        //                 imgLoad(img1, function () {
        //                     console.log('合同文件加载完毕');
        //                     self.closeProgress();
        //                     /*$.getScript("js/lib/photoswipecontrol.js",function(){
        //                         //console.log('放大缩小加载成功');
        //                     });*/
        //                 });
        //             } else {
        //                 self.failMessage = res.msgEx.respDesc;
        //                 self.failPop = !self.failPop;
        //                 self.failIconClass = "next_setp";
        //                 self.isCloseBtn = true;
        //             }
        //         },
        //         error: function () {
        //             self.showMsg("请求失败！");
        //         }
        //     });
        // }
    },
    methods: {
        down(){
            window.scrollTo(0,0);
        },
        iptTop(){
            this.goTop=false
        },
        //显示隐藏
        showToggle: function() {
            this.isShow = !this.isShow;
            this.isMask = !this.isMask;
        },
        showMask: function() {
            this.showToggle();
        },
        filesOpen: function (index,fileName) {
            var self = this;

            self.moreFilesActive = index;
            self.showToggle();

            self.showProgress();
            var data006006 = {
                fileName: fileName,
            }
            var ag006006 = JSON.stringify(data006006);
            $.ajax({
                url: url2,
                timeout: 60000,
                type: "POST",
                async: true,
                dataType: "json",
                data: ({
                    arg0: '006006',
                    arg1: ag006006
                }),
                success: function (res) {
                    self.loading=false
                    console.log(res);
                    if (res.msgEx.status == 0) {
                        //显示图片
                        self.selectMenuText = 'data:image/jpeg;base64,' + res.msgEx.infos.image
                        self.closeProgress();
                    } else {
                        self.tipsAlert(res.msgEx.respDesc);
                    }
                },
                error: function () {
                    self.loading=false
                    self.tipsAlert("请求失败！");
                    self.isGoNext = false;
                }
            });

        },
        signCheck: function() {
            var self = this;

            self.btnActive = !self.btnActive;
            self.codeOff = !self.codeOff;
            //验证码
            self.show = true;
            clearInterval(self.timer);
            self.timer = null;

            if (self.checked) {
                self.sendCodeActive = true;
            } else {
                self.sendCodeActive = false;
            }
        },
        showSignBlock: function() {
            this.isSignShow = !this.isSignShow;
        },
        //查看授权书
        viewBook: function() {
            this.isMaskGrey = !this.isMaskGrey;
            this.replyShow();
        },
        viewBtn: function() {
            this.isMaskGrey = !this.isMaskGrey;
        },
        replyShow: function(){
            $(".reply_view").css("display","-webkit-box");
            myScroll = new IScroll('#tcWrapper', {
                scrollbarClass: 'myScrollbar' ,
                hScrollbar:false,
                vScroll:true,
                hideScrollbar: true //是否隐藏滚动条
            });
            $('body').bind("touchmove",function(e){
                e.preventDefault();
            });
            $(".close_reply").bind("click",function(){
                $(".reply_view").css("display","none");
                $('body').unbind("touchmove");
            });
        },
        //发送验证码
        sendCode: function(formData) {
            var self = this;

            if (self.checked) {
                var TIME_COUNT = 60;
                if (!this.timer) {
                    var _this = this;
                    this.show = false;
                    this.isCheckedSendCode=true
                    this.count = TIME_COUNT;
                    this.get='重新获取'
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
                var data = {
                    mobile: localStorage.getItem('dc-phone')
                }
                var ag1 = JSON.stringify(data);
                 if(!self.show) {
                     $.ajax({
                         url: url2,
                         timeout: 60000, //超时时间设置，单位毫秒
                         type: "POST",
                         dataType: "json",
                         data: ({
                             arg0: '002023',
                             arg1: ag1
                         }),
                         success: function (res) {
                             self.loading=false
                             console.log(res);
                             if (res.msgEx.status == 0) {


                             } else {
                                 self.tipsAlert(res.msgEx.respDesc);
                             }
                         },
                         error: function () {
                             self.loading=false
                             self.tipsAlert("请求失败！");
                         }
                     });

                 }
            }

        },
        sendValidCode: function(formData) {
            var self = this;
            self.isCheckedSendCode = true;
            console.log(self.moreFiles.phone);

            //发送短信验证码
            self.showProgress();
            var data = {
                mobile: localStorage.getItem('dc-phone')
            }
            var ag1 = JSON.stringify(data);
            if(self.show) {
                $.ajax({
                    url: url2,
                    timeout: 60000, //超时时间设置，单位毫秒
                    type: "POST",
                    dataType: "json",
                    data: ({
                        arg0: '002023',
                        arg1: ag1
                    }),
                    success: function (res) {
                        self.loading=false
                        console.log(res);
                        if (res.msgEx.status == 0) {


                        } else {
                            self.tipsAlert(res.msgEx.respDesc);
                        }
                    },
                    error: function () {
                        self.loading=false
                        self.tipsAlert("请求失败！");
                    }
                });
            }
        },
        getCode: function (formData) {
            var self = this;

            if (!self.timer) {
                self.count = TIME_COUNT;
                self.show = false;
                self.timer = setInterval(function () {
                    if (self.count > 0 && self.count <= TIME_COUNT) {
                        self.count--;
                    } else {
                        self.show = true;
                        self.sendCodeActive = true;
                        clearInterval(self.timer);
                        self.timer = null;
                    }
                }, 1000)
            }
        },
        //签 名
        signBtn: function() {

            var self = this;

            // console.log('isCheckedSendCode', self.isCheckedSendCode)
            if (!self.isCheckedSendCode) {
                self.tipsAlert("请点击发送验证码");
                return
            }
            if (self.checked && !self.code) {
                //checkbox选中，验证码input为空
                self.tipsAlert("请填写验证码");
                return
            }else if(self.code.length<6){
                self.tipsAlert("验证码不能少于6位");
                return
            }
            else {
                self.loading=true
                var data2024 = {
                    mobile:localStorage.getItem('dc-phone'),
                    validateCode: self.code
                }
                var ag2024 = JSON.stringify(data2024);
                $.ajax({
                    url: url2,
                    timeout: 60000, //超时时间设置，单位毫秒
                    type: "POST",
                    dataType: "json",
                    data: ({
                        arg0: '002024',
                        arg1: ag2024
                    }),
                    success: function (res) {

                        console.log(res);
                        if (res.msgEx.status == 0) {
                            //签订

                            var data8007 = {
                                idCard:localStorage.getItem('dc-idCard'),
                                contractNum:localStorage.getItem('contractNum'),
                                contactName:localStorage.getItem('dc-backName'),
                                amount:localStorage.getItem('dc-backMoney'),
                                account:localStorage.getItem('dc-account'),
                                name:localStorage.getItem('lendName'),
                                loanNo:localStorage.getItem('loanNo'),
                                mobile:localStorage.getItem('dc-phone'),
                                verifyCode:localStorage.getItem('verifyCode'),
                                loanBelong:localStorage.getItem('loanBelong')
                            }
                            var ag8007 = JSON.stringify(data8007)
                            $.ajax({
                                url: url2,
                                timeout: 60000, //超时时间设置，单位毫秒
                                type: "POST",
                                dataType: "json",
                                data: ({
                                    arg0: '008007',
                                    arg1: ag8007
                                }),
                                success: function (res) {
                                    self.loading=false
                                    console.log(res);
                                    if (res.msgEx.status == 0) {                                           //签订
                                        self.btnActive=false
                                        if(res.msgEx.infos.status==02 || res.msgEx.infos.status==03){
                                            window.location='repay-success.html'
                                        }
                                        if(res.msgEx.infos.status==04){
                                            window.location='repay-fail.html?noMoney=1'
                                        }
                                        if(res.msgEx.infos.status==05){
                                            window.location='repay-fail.html?outTime=1'
                                        }else{
                                            setTimeout(function () {
                                                window.location = 'repay-success.html'
                                            }, 1000)
                                        }
                                    } else {
                                        self.btnActive=false
                                        self.tipsAlert(res.msgEx.respDesc);
                                        setTimeout(function () {
                                            window.location='repay-fail.html?noMoney=1'
                                        },1000)

                                    }
                                },
                                error: function () {
                                    self.btnActive=false
                                    self.loading=false
                                    self.tipsAlert(res.msgEx.respDesc);
                                    setTimeout(function () {
                                        window.location='repay-fail.html?outTime=1'
                                    },1000)
                                }
                            });
                        } else {

                            self.loading=false
                            self.tipsAlert(res.msgEx.respDesc);
                        }
                    },
                    error: function () {

                        self.loading=false
                        self.tipsAlert("请求失败！");
                    }
                });

            }





        },
        nextSetp: function() {
            console.log("跳转地址：" + this.urlLcb);
            window.location.href = this.urlLcb;
        },
        closeBtn: function() {
            if(appSwitch){
                app.closeNowPage();
            }else{
                //调用微信API关闭当前窗口
                wx.closeWindow();
            }
        },
        showMsg: function(text) {
            var self = this;

            // if(appSwitch){
            //     app.showMsg(text);
            // }else{
            //     self.tipsAlert(text);
            // }
        },
        showProgress: function() {
            var self = this;

            // if(appSwitch){
            //     app.showProgress();
            // }else{
            //     self.loadingPop = true;
            // }
        },
        closeProgress: function() {
            var self = this;

            // if(appSwitch){
            //     app.closeProgress();
            // }else{
            //     self.loadingPop = false;
            // }
        },
        tipsAlert: function(text) {
            var self = this;

            self.tips = text;
            self.isTips = !self.isTips;
            setTimeout(function () {
                self.isTips = false;
            }, 1500);
            return false;
        }
    }

})
