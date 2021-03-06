// $.getScript("js/lib/photoswipecontrol.js",function(){
//     //console.log('放大缩小加载成功');
// });

var vm = new Vue({
    el: '#app',
    data: {
        loanNo: null,
        idCard:null,
        isShow: false,
        isSignShow: true,
        isMask: false,
        isMaskGrey: false,
        moreFiles: [],
        moreFilesActive: "0",
        selectMenuText: "",
        checked: false,  //勾选
        sendCodeActive: false,
        btnActive: true,
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
        from: "normal",
        isGoNextReq: false
    },

    mounted: function() {
        var self = this;
        self.loanNo = GetQueryString("loanNo");
        self.idCard = GetQueryString("idCard");
        if( GetQueryString("goList")==1){
            setTimeout(function () {
                app.toBorrowScheduleList();
            },1000)
            return;
        }
        var paramsLoanNo = {
            loanNo: self.loanNo
        }
        var paramsLoanNo = JSON.stringify(paramsLoanNo);
        $.ajax({
            url: url2,
            // timeout: 60000, //超时时间设置，单位毫秒60s
            type: "POST",
            dataType: "json",
            async:true,
            data: ({
                arg0: '006010',
                arg1: paramsLoanNo
            }),
            success: function (res) {
                console.log(res);
                self.closeProgress();
                if (res.msgEx.infos.result == 0) {

                    self.getList()
                    self.showMsg(res.msgEx.respDesc);
                    //跳转签约
                    // window.location='custom-lcb.html?loanNo='+loanNo+'&idCard='+self.idCard;
                } else {
                    // self.showMsg(res.msgEx.respDesc);
                    self.showMsg(res.msgEx.infos.message);
                    self.error=true;
                }
            },
            error: function () {
                // console.log('这里是请求失败')

                self.error=true;
                // self.showMsg("失败请求斤斤计较斤斤计较！");
                self.isGoNextReq = false
            }
        });
        // if(self.isGoNext){
            //查询合同列表

        // }
    },
    methods: {
        getList:function(){
            var self = this
            var data2021 = {
                loanNo: self.loanNo
            }
            var ag2021 = JSON.stringify(data2021);
            $.ajax({
                url: url2,
                timeout: 60000, //超时时间设置，单位毫秒
                type: "POST",
                async: true,
                dataType: "json",
                data: ({
                    arg0: '002021',
                    arg1: ag2021
                }),
                success: function (res) {
                    console.log(res);

                    if (res.msgEx.status == 0) {

                        self.moreFiles = res.msgEx.infos;
                        // self.filesOpen(0,moreFiles.attachment[0].contractTypeDic,moreFiles.attachment[0].fileNum)

                        console.log("fileNum:" + self.moreFiles.attachment[0].fileNum);

                        self.closeProgress();
                        //加载合同文件
                        self.selectMenuText = encodeURI(url3 + "?arg0=002022&arg1={'fileNum':'" + self.moreFiles.attachment[0].fileNum +"'}"); //图片列表

                        imgLoad(img1, function () {
                            console.log('合同文件加载完毕');
                            self.closeProgress();
                            $.getScript("js/lib/photoswipecontrol.js",function(){
                                //console.log('放大缩小加载成功');
                            });
                        });
                    } else {
                        self.failMessage = res.msgEx.respDesc;
                        self.failPop = !self.failPop;
                        self.failIconClass = "next_setp";
                        self.isCloseBtn = true;
                        self.closeProgress();
                    }
                },
                error: function () {
                    self.showMsg("请求失败！");
                }
            });
        },
        //显示隐藏
        showToggle: function() {
            this.isShow = !this.isShow;
            this.isMask = !this.isMask;
        },
        showMask: function() {
            this.showToggle();
        },
        filesOpen: function(index, name, fileNum) {
            var self = this;

            self.moreFilesActive = index;    
            self.showToggle();

            console.log("fileNum:" + fileNum+index+name);
            self.showProgress();
            setTimeout(function(){
                //加载合同文件(因返回成功不是json格式，故取不到错误信息，为提高加载效率不做接口调用)                     
                self.selectMenuText = encodeURI(url3 + "?arg0=002022&arg1={'fileNum':'" + fileNum +"'}"); //图片列表
                  console.log(self.selectMenuText+'123')
                imgLoad(img1, function () {
                    console.log('合同文件加载完毕');
                    self.closeProgress(); 
                    /*$.getScript("js/lib/photoswipecontrol.js",function(){
                        //console.log('放大缩小加载成功');
                    });*/
                });
            },500);
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
                self.sendValidCode(formData);
            }
        },        
        sendValidCode: function(formData) {
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
        //签名
        signBtn: function() {
            var self = this;
                //self.showMsg("请填写验证码");
                self.showProgress();
                //签订
            var data2025 = {
                loanNo: self.loanNo,
                idCard:self.idCard
            }
                var ag2025 = JSON.stringify(data2025);
                $.ajax({
                    url: url2,
                    timeout: 60000, //超时时间设置，单位毫秒
                    type: "POST",
                    async: true,
                    dataType: "json",
                    data: ({
                        arg0: '002025',
                        arg1: ag2025
                    }),
                    success: function (res) {
                        self.closeProgress();
                        console.log(res);
                        if(res.msgEx.status == 0){
                            // self.failMessage = "根据合同规定要求，客户需要在<span>捞财宝</span>完成信息确认后才可进行下一步";
                            // self.failPop = !self.failPop;
                            // self.failIconClass = "next_setp";
                            // self.isNextSetpBtn = true;
                            // self.urlLcb = res.msgEx.infos.urlLcb;
                            window.location= res.msgEx.infos.urlLcb;
                        } else{
                            self.showMsg(res.msgEx.respDesc);
                        }
                    },
                    error: function () {
                        self.closeProgress();
                        self.showMsg("请求失败！");
                    }
                });
                //签订end

                console.log("validateCode：" + self.code + "mobile：" + self.moreFiles.phone);


        },
        nextSetp: function() {
            console.log("跳转地址：" + this.urlLcb);
            window.location.href = this.urlLcb;
        },
        closeBtn: function() {
            if(appSwitch){
                app.closeNowPage();
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
            self.loadingPop = true;
        },
        closeProgress: function() {
            var self = this;
            if (appSwitch) {
                app.closeProgress();
            }
            self.loadingPop = false;
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