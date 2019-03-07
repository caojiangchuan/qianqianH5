$.getScript("js/lib/photoswipecontrol.js", function () {
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
        count: '',
        timer: null,
        failPop: false,
        failMessage: "",
        isCloseBtn: false,
        failIconClass: "",
        isNextSetpBtn: false,
        urlLcb: "",
        isGoNext: true,
        loadingPop: true,
        from: "normal"
    },
    mounted: function () {
        var self = this;
        self.loanNo = GetQueryString("loanNo");

        //from —— normal:正常签章  jxhj:借新还旧
        self.from = GetQueryString("from");

        // if(self.from == "normal"){
        //合同列表接口
        var data006005 = {
            idCard: GetQueryString("idCard"),
            loanNo: GetQueryString("loanNo"),
            userName: GetQueryString("userName"),
            phone: GetQueryString("phone"),
            type:GetQueryString("type")
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
                console.log(res);
                if (res.msgEx.status == 0) {
                    self.moreFiles = res.msgEx.infos;
                    self.closeProgress();
                    //显示第一张图片
                    self.filesOpen(0,res.msgEx.infos[0].fileName)
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
                self.showMsg("请求失败！");
                //不再请求合同列表接口
                self.isGoNext = false;
            }
        });
        // }
        // else {
        //     console.log("from:"+ self.from);
        // }

    },
    methods: {
        //显示隐藏
        showToggle: function () {
            this.isShow = !this.isShow;
            this.isMask = !this.isMask;
        },
        showMask: function () {
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
                    console.log(res);
                    if (res.msgEx.status == 0) {
                        //显示图片
                        self.selectMenuText = 'data:image/jpeg;base64,' + res.msgEx.infos.image
                        self.closeProgress();
                    } else {
                        self.showMsg(res.msgEx.respDesc);
                    }
                },
                error: function () {
                    self.showMsg("请求失败！");
                    self.isGoNext = false;
                }
            });

        },
        signCheck: function () {
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
        showSignBlock: function () {
            this.isSignShow = !this.isSignShow;
        },
        //查看授权书
        viewBook: function () {
            this.isMaskGrey = !this.isMaskGrey;
            this.replyShow();
        },
        viewBtn: function () {
            this.isMaskGrey = !this.isMaskGrey;
        },
        replyShow: function () {
            $(".reply_view").css("display", "-webkit-box");
            myScroll = new IScroll('#tcWrapper', {
                scrollbarClass: 'myScrollbar',
                hScrollbar: false,
                vScroll: true,
                hideScrollbar: true //是否隐藏滚动条
            });
            $('body').bind("touchmove", function (e) {
                e.preventDefault();
            });
            $(".close_reply").bind("click", function () {
                $(".reply_view").css("display", "none");
                $('body').unbind("touchmove");
            });
        },
        //发送验证码
        sendCode: function (formData) {
            var self = this;

            if (self.checked) {
                self.sendValidCode(formData);
            }
        },
        sendValidCode: function (formData) {
            var self = this;
            console.log(self.moreFiles.phone);

            //发送短信验证码
            self.showProgress();
            var data = {
                mobile: self.moreFiles.phone
            }
            var ag1 = JSON.stringify(data);
            $.ajax({
                url: url2,
                timeout: 60000, //超时时间设置，单位毫秒
                type: "POST",
                async: false,
                dataType: "json",
                data: ({
                    arg0: '002023',
                    arg1: ag1
                }),
                success: function (res) {
                    self.closeProgress();
                    console.log(res);
                    if (res.msgEx.status == 0) {
                        self.sendCodeActive = !self.sendCodeActive;
                        self.getCode(formData);
                    } else {
                        self.showMsg(res.msgEx.respDesc);
                    }
                },
                error: function () {
                    self.closeProgress();
                    self.showMsg("请求失败！");
                }
            });
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
        signBtn: function () {
            app.closeNowPage()
        },
        nextSetp: function () {
            console.log("跳转地址：" + this.urlLcb);
            window.location.href = this.urlLcb;
        },
        closeBtn: function () {
            if (appSwitch) {
                app.closeNowPage();
            } else {
                //调用微信API关闭当前窗口
                wx.closeWindow();
            }
        },
        showMsg: function (text) {
            var self = this;

            if (appSwitch) {
                app.showMsg(text);
            } else {
                self.tipsAlert(text);
            }
        },
        showProgress: function () {
            var self = this;
            self.loadingPop = true;
        },
        closeProgress: function () {
            var self = this;
            self.loadingPop = false;
        },
        tipsAlert: function (text) {
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
