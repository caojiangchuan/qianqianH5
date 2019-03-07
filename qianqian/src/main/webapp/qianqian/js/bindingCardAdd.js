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
            "account": "",
            "bankNames": [],
            "bankBranchName": "",
            "bindCardChannel": "",
            "reservedMobile": ""
        },
        srcFlowId: "",  //流水号
        loadingPop: false,
        isBind: true,   //是否绑卡
        //selected: ""   //select选中值
    },
    beforeCreate:function () {
        // 判断登录
        if(!appSwitch)  testLogin();
    },
    mounted: function() {
        var self = this;

        self.idCard = getCookie("idCard");
        if("undefined" != getCookie("accountName")){
            self.bankCards.accountName = getCookie("accountName") || "";
        }
        /*if("undefined" != getCookie("bankCode")){
            self.bankCards.bankCode = getCookie("bankCode") || "";
        }
        if("undefined" != getCookie("account")){
            self.bankCards.account = getCookie("account") || "";
        }*/

        //支持银行卡列表
        self.showProgress();
        var data1002 = {
            idCard: self.idCard,
            accountName: self.bankCards.accountName,
            bankCode: self.bankCards.bankCode,
            account: self.bankCards.account.replace(/\s+/g,""),
            bankName: self.bankCards.bankName,
            reservedMobile: self.bankCards.reservedMobile
        }
        var ag1002 = JSON.stringify(data1002);
        $.ajax({
            url: url2,
            timeout: 60000, //超时时间设置，单位毫秒60s
            type: "POST",
            dataType: "json",
            data: ({
                arg0: '001002',
                arg1: ag1002
            }),
            success: function (res) {
                self.closeProgress();
                console.log(res.msgEx.infos);
                if(res.msgEx.status == 0){
                    //所属银行
                    self.bankCards.bankNames = res.msgEx.infos;
                }else{
                    self.showMsg(res.msgEx.respDesc);
                }
            },
            error: function () {
                self.closeProgress();
                self.showMsg("请求失败！");
            }
        });


        if(self.bankCards.reservedMobile){
            self.btnActive = !self.btnActive;
            self.codeOff = !self.codeOff;
            //验证码
            self.show = true;
            clearInterval(self.timer);
            self.timer = null;

            self.sendCodeActive = true;
        }else{
            self.sendCodeActive = false;
        }
    },
    watch: {
        "bankCards.reservedMobile": {
            handler: function (val) {
                var self = this;
                //手机号码为空
                if(val.length!=11){
                    self.btnActive = false;
                    self.codeOff = false;
                    self.sendCodeActive = false;
                }else{
                    self.btnActive = true;
                    self.codeOff = true;
                    self.sendCodeActive = true;
                }
            },
            deep: true
        },
        "bankCards.account":{
            handler:function(val){
                var self = this;
                self.bankCards.account =self.bankCards.account.replace(/\s/g,'').replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ');
            },
            deep: true
        }
    },
    computed: {
        reversedIdCard: function () {
            if(this.idCard){
                return this.idCard.substr(0, 3) + " **** **** **** " + this.idCard.substr(14, 4);
            }

        }
    },
    methods: {
        //发送验证码
        sendCode: function(formData) {
            var self = this;

            if (!self.bankCards.reservedMobile) {
                self.showMsg("请填写手机号码");
                return false;
            }

            if (self.bankCards.reservedMobile.length!=11) {
                self.showMsg("手机号码不正确");
                return false;
            }

            // if (!isPhoneNum(self.bankCards.reservedMobile)) {
            //     self.showMsg("手机号码不正确");
            //     return false;
            // }

            if (self.bankCards.reservedMobile) {
                self.sendValidCode(formData);
            }
        },        
        sendValidCode: function(formData) {
            var self = this;

            self.showProgress();
            //发送短信验证码
            var data = {
                idCard: self.idCard,
                accountName: self.bankCards.accountName,
                bankCode: $("#bankName").find("option:selected").attr("value"),
                account: self.bankCards.account.replace(/\s+/g,""),
                bankName: $("#bankName").find("option:selected").attr("name"),
                reservedMobile: self.bankCards.reservedMobile
            }
            var ag1 = JSON.stringify(data);
            $.ajax({
                url: url2,
                timeout: 60000, //超时时间设置，单位毫秒60s
                type: "POST",
                dataType: "json",
                data: ({
                    arg0: '002016',
                    arg1: ag1
                }),
                success: function (res) {
                    self.closeProgress();
                    console.log(res);
                    if(res.msgEx.status == 0){
                        self.srcFlowId = res.msgEx.infos.flowId;
                        self.sendCodeActive = !self.sendCodeActive;
                        self.getCode(formData);
                    }else{
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
        //确定
        signBtn: function() {
            var self = this;

            if (!self.bankCards.account) {
                self.showMsg("请填写银行卡号");
                return false;
            }
            if (!isAccount(self.bankCards.account.replace(/\s+/g,""))) {
                self.showMsg("银行卡号不正确");
                return false;
            }
            if (!self.bankCards.bankBranchName) {
                self.showMsg("请填写所属支行");
                return false;
            }
            if (!isBranchName(self.bankCards.bankBranchName)) {
                self.showMsg("所属支行不正确");
                return false;
            }
            if (!self.bankCards.reservedMobile) {
                self.showMsg("请填写手机号码");
                return false;
            } 
            // if (!isPhoneNum(self.bankCards.reservedMobile)) {
            //     self.showMsg("手机号码不正确");
            //     return false;
            // }
            
            if (self.bankCards.reservedMobile.length!=11) {
                self.showMsg("手机号码不正确");
                return false;
            }

            if (!self.code) {
                console.log(self.code);
                self.showMsg("请填写验证码");
                return false;
            }
            if(!self.srcFlowId) {
                console.log(self.srcFlowId);
                self.showMsg("请获取短信验证码");
                return false;
            }
            //console.log("validateCode：" + self.code + " reservedMobile：" + self.bankCards.reservedMobile);

            self.showProgress();
            //协议支付签约
            var data = {
                srcFlowId: self.srcFlowId,
                verCode: self.code,
                idCard: self.idCard,

                bankCode: $("#bankName").find("option:selected").attr("value"),
                account: self.bankCards.account.replace(/\s+/g,""),
                bankName: $("#bankName").find("option:selected").attr("name"),
                bankBranchName: self.bankCards.bankBranchName,
                reservedMobile: self.bankCards.reservedMobile
            }
            var ag1 = JSON.stringify(data);
            $.ajax({
                url: url2,
                timeout: 60000, //超时时间设置，单位毫秒60s
                type: "POST",
                dataType: "json",
                data: ({
                    arg0: '002028',
                    arg1: ag1
                }),
                success: function (res) {
                    console.log("验证成功");
                    console.log(res);
                    if(res.msgEx.status == 0){
                        console.log("添加成功");
                        self.showMsg(res.msgEx.respDesc);
                        setTimeout(function () {
                            window.location = "selectCard.html";
                        },500)
                    }else{
                        self.showMsg(res.msgEx.respDesc);
                    }
                    self.closeProgress();

                    // if(res.msgEx.status == 0){
                    //     //验证通过后-添加银行卡
                    //     var data2026 = {
                    //         idCard: self.idCard,
                    //         bankCode: $("#bankName").find("option:selected").attr("value"),
                    //         account: self.bankCards.account.replace(/\s+/g,""),
                    //         bankName: $("#bankName").find("option:selected").attr("name"),
                    //         bankBranchName: self.bankCards.bankBranchName,
                    //         reservedMobile: self.bankCards.reservedMobile
                    //     }
                    //     var ag2026 = JSON.stringify(data2026);
                    //     $.ajax({
                    //         url: url2,
                    //         timeout: 60000, //超时时间设置，单位毫秒60s
                    //         type: "POST",
                    //         dataType: "json",
                    //         data: ({
                    //             arg0: '002026',
                    //             arg1: ag2026
                    //         }),
                    //         success: function (res) {
                    //             console.log(res);
                    //             if(res.msgEx.status == 0){
                    //                 console.log("添加成功");
                    //                 self.showMsg(res.msgEx.respDesc);
                    //                 setTimeout(function () {
                    //                     window.location = "selectCard.html";
                    //                 },500)
                    //             }else{
                    //                 self.showMsg(res.msgEx.respDesc);
                    //             }
                    //             self.closeProgress();
                    //         },
                    //         error: function () {
                    //             self.closeProgress();
                    //             self.showMsg("请求失败！");
                    //         }
                    //     });
                    //
                    // }else{
                    //     self.closeProgress();
                    //     self.showMsg(res.msgEx.respDesc);
                    // }
                },
                error: function () {
                    self.closeProgress();
                    self.showMsg("请求失败！");
                }
            });
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

            if(appSwitch){
                app.showMsg(text);
            }else{
                self.tipsAlert(text);
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
        closeProgress: function() {
            var self = this;

            if(appSwitch){
                app.closeProgress();
            }else{
                self.loadingPop = false;
            }
        },
        tipsAlert: function(text) {
            var self = this;

            self.tips = text;
            self.isTips = !self.isTips;
            setTimeout(function () {
                self.isTips = false;
            }, 1500);
            return false;
        },
        bankCardsAccount:function (ev) {
            console.log(ev)
          //  ev.value =ev.value.replace(/\s/g,'').replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ');
        }

    }

})