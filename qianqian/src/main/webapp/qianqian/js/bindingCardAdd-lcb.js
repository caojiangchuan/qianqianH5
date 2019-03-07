var vm = new Vue({
    el: '#app',
    data: {
        idCard: null,
        sendCodeActive: false,
        btnActive: false,
        codeOff: false,
        tips: "",  //提示
        isTips: false,
        show: true,
        count: '',
        timer: null,
        code: "",  //验证码
        bankCards: {
            "accountName": "",
            "bankCode": "",
            "account": "132132",
            "bankBranchName": "",
            "bindCardChannel": "",
            "reservedMobile": ""
        },
        bankName: "",
        srcFlowId: "",  //流水号
        loadingPop: false,
        isBind: true,   //是否绑卡
        //selected: ""   //select选中值,
        bankCode: "",
        customerId: "",
        error:false
    },
    mounted: function () {
        var self = this;

        self.idCard = GetQueryString('idCard');

        //绑卡获取银行卡列表
        self.showProgress();
        var data6007 = {
            idCard: self.idCard,
            bankCard:GetQueryString('bankCard')
        }
        var ag6007 = JSON.stringify(data6007);
        $.ajax({
            url: url2,
            timeout: 60000, //超时时间设置，单位毫秒60s
            type: "POST",
            dataType: "json",
            data: ({
                arg0: '006007',
                arg1: ag6007
            }),
            success: function (res) {
                self.closeProgress();
                //console.log(res.msgEx.infos.bankCards[0]);
                if (res.msgEx.status == 0) {
                    //ajax数据传输
                    self.bankCards.accountName = res.msgEx.infos.name;
                    self.bankCards.account = res.msgEx.infos.bankcard;
                    self.bankCards.reservedMobile = res.msgEx.infos.mobile;
                    self.bankName = res.msgEx.infos.bankName;
                    self.bankCards.bankBranchName = res.msgEx.infos.bankBranchName;
                    self.bankCode = res.msgEx.infos.bankCode;

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


    methods: {
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
        //确定
        signBtn: function () {
            var self = this;
            //console.log("validateCode：" + self.code + " reservedMobile：" + self.bankCards.reservedMobile);
            self.customerId = getCookie("customerId");
            var loanNo=GetQueryString('loanNo');
            self.showProgress();
            //签约H5与捞财宝绑卡
            var data = {
                customerId: self.customerId,
                bankCard: self.bankCards.account,
                cellPhone: self.bankCards.reservedMobile,
                bankCode: self.bankCode,
                applyBankBranch:self.bankCards.bankBranchName,
                loanNo:loanNo
            }
            var ag1 = JSON.stringify(data);
            $.ajax({
                url: url2,
                timeout: 60000, //超时时间设置，单位毫秒60s
                type: "POST",
                dataType: "json",
                async: true,
                data: ({
                    arg0: '006003',
                    arg1: ag1
                }),
                success: function (res) {
                    console.log("验证成功");
                    console.log(res);
                    if (res.msgEx.status == 0) {
                        console.log("添加成功");
                        self.showMsg(res.msgEx.respDesc);

                        //查询是否可以签约
                        var data006010 = {
                            loanNo:loanNo
                        }
                        var ag6001 = JSON.stringify(data006010);
                        $.ajax({
                            url: url2,
                            timeout: 60000, //超时时间设置，单位毫秒60s
                            type: "POST",
                            dataType: "json",
                            async: true,
                            data: ({
                                arg0: '006010',
                                arg1: ag6001
                            }),
                            success: function (res) {
                                console.log(res);
                                self.closeProgress();
                                if (res.msgEx.infos.result == 0) {
                                    self.showMsg(res.msgEx.respDesc);
                                    //跳转签约
                                    window.location='custom-lcb.html?loanNo='+loanNo+'&idCard='+self.idCard;
                                } else {
                                    self.showMsg(res.msgEx.respDesc);
                                    self.error=true;
                                }
                            },
                            error: function () {
                                self.closeProgress();
                                self.error=true;
                                self.showMsg("请求失败！");
                            }
                        });
                        //end
                      //  setTimeout(function () {
                            //window.location = "selectCard.html";
                           // alert("ok")
                       // }, 500)
                    } else {
                        self.showMsg(res.msgEx.respDesc);

                        self.closeProgress();
                    }

                },
                error: function () {
                    self.closeProgress();
                    self.showMsg("请求失败！");
                }
            });
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
            // if (appSwitch) {
            //    app.showProgress();
            // } else {
            //     self.loadingPop = true;
            // }
            self.loadingPop = true;
        },
        closeProgress: function () {
            var self = this;
            // if (appSwitch) {
            //     app.closeProgress();
            // } else {
            //     self.loadingPop = false;
            // }
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
        },
        bankCardsAccount: function (ev) {
            console.log(ev)
            //  ev.value =ev.value.replace(/\s/g,'').replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ');
        }

    },
    computed: {
        reversedIdCard: function () {
            if (this.idCard) {
                return "**** **** **** ** " + this.idCard.substr(14, 4);
            }
        },
        account: function () {
            if (this.bankCards.account) {
                return "**** **** **** ** " + this.bankCards.account.substr(this.bankCards.account.length-4,4);
            }

        },
        reservedMobile: function () {
            if (this.bankCards.reservedMobile) {
                return this.bankCards.reservedMobile.substr(0, 3)+"****" + this.bankCards.reservedMobile.substr(7, 4);
            }
        }


    },

})
