var vm = new Vue({
    el: '#app',
    data: {
        tips: "",  //提示
        isTips: false,
        idCard: "", //身份证号
        bankCards: [],
        accountName:"",  //持卡人姓名
        loadingPop: false,
        supportBankCodes: "",  //支持的银行卡编号
        isCardAddShow: false  //添加银行卡开关
    },
    beforeCreate:function () {
        // 判断登录
        if(!appSwitch)  testLogin();
    },
    mounted: function() {
        var self = this;

        //添加银行卡开关
        self.showProgress();
        var data2027 = {
            idCard: self.idCard
        }
        var ag2027 = JSON.stringify(data2027);
        $.ajax({
            url: url2,
            timeout: 60000, //超时时间设置，单位毫秒60s
            type: "POST",
            dataType: "json",
            data: ({
                arg0:  '002027',
                arg1: ag2027
            }),
            async: false,
            success: function (res) {
                self.closeProgress();
                console.log(res);
                if(res.msgEx.status == 0){
                    if(res.msgEx.infos.addBank == "on"){
                        console.log("开启添加银行卡");
                        self.isCardAddShow = true;
                    }
                }else{
                    self.showMsg(res.msgEx.respDesc);
                }
            },
            error: function () {
                self.closeProgress();
                self.showMsg("请求失败！");
            }
        });
        /*var addCard = GetQueryString("addCard");
        if(addCard == "1"){
            console.log("开启添加银行卡");
            self.isCardAddShow = true;
        }*/


        self.idCard = getCookie("idCard");


        //获取客户银行卡信息
        self.showProgress();
        var data = {
            idCard: self.idCard
        }
        var ag1 = JSON.stringify(data);
        $.ajax({
            url: url2,
            timeout: 60000, //超时时间设置，单位毫秒60s
            type: "POST",
            dataType: "json",
            data: ({
                arg0: '002014',
                arg1: ag1
            }),
            success: function (res) {
                self.closeProgress();
                console.log(res);
                if(res.msgEx.status == 0){
                    self.bankCards = res.msgEx.infos.bankCards;
                    self.accountName = res.msgEx.infos.name;
                    self.supportBankCodes = res.msgEx.infos.supportBankCodes;
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
    methods: {
        jumpBindingCard: function(index) {
            var self = this;

            //103-农行，01-未绑卡
            if(self.supportBankCodes.indexOf(this.bankCards[index].bankCode) != -1 && this.bankCards[index].checkCard == "00"){
                //setCookie("idCard", self.idCard);
            //    setCookie("accountName", self.accountName);
                setCookie("bankCode", self.bankCards[index].bankCode);
                setCookie("account", self.bankCards[index].account);
                setCookie("bankName", self.bankCards[index].bankName);
                setCookie("bankBranchName", self.bankCards[index].bankBranchName);
                setCookie("bindCardChannel", self.bankCards[index].bindCardChannel);
                setCookie("reservedMobile", self.bankCards[index].mobile);
                window.location = "bindingCard.html";
            }else{
                //console.log("no");
            }
        },
        cardAdd: function () {
            var self = this;

            //setCookie("accountName", self.accountName);
            delCookie("bankCode");
            delCookie("account");
            delCookie("bankName");
            delCookie("bankBranchName");
            delCookie("bindCardChannel");
            delCookie("reservedMobile");
            window.location = "bindingCardAdd.html";
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
        }


    }

})

document.body.addEventListener('touchstart', function () {});