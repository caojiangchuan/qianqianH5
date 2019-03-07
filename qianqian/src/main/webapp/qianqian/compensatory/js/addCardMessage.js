var em = new Vue({
    el:'#app',
    data:{
        name:'',
        idcard:'',
        bankCard:'',
        bankDev:'',
        phone:'',
        code:'',
        bank:'请选择银行',//不為‘請選擇銀行’時被賦值
        bankList:[],
        saveBankCode:'',
        srcFlowId:'',
        saveBankName:'',
        show:true,
        count:'',
        get:'获取验证码',
        bankChoose:false,
        chooseBankName:'请选择银行',
        loading:true,
        getOnce:false,
        test:false,
        no:JSON.parse(sessionStorage.no)

    },
    mounted(){


        var url2 = '/CustomerCreditFront/front/requestApi';
        var data1002 = {

        }
        var self =this
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
                self.loading=false
                console.log(res.msgEx.infos);
                if(res.msgEx.status == 0){
                    //所属银行

                    self.bankList = res.msgEx.infos;
                      console.log( self.bankList,'1')
                }else{
                    self.appAlert(res.msgEx.respDesc);
                }
            },
            error: function () {
                self.loading=false
                self.appAlert("请求失败！");
            }
        });
    },
    computed: {
        // reversedIdCard: function () {
        //     if(this.idCard){
        //         return this.idCard.substr(0, 3) + " **** **** *** " + this.idCard.substr(-4);
        //     }
        //
        // },
    },
    watch:{
        // "bankCards.account":{
        //     handler:function(val){
        //         var self = this;
        //         self.bankCards =self.bankCards.replace(/\s/g,'').replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ');
        //     },
        //     deep: true
        // }
        "bankCard":{
            handler:function(val){
                var self = this;
                self.bankCard =self.bankCard.replace(/\s/g,'').replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ');
            },
            deep: true
        }
    },
    methods:{
         jianpan(){
             var originalHeight=document.documentElement.clientHeight ||document.body.clientHeight;
             window.onresize=function(){
                 //键盘弹起与隐藏都会引起窗口的高度发生变化
                 var resizeHeight=document.documentElement.clientHeight || document.body.clientHeight;
                 if(resizeHeight-0<originalHeight-0){
                     //当软键盘弹起，在此处操作
                     window.scrollTo(100,200);
                 }else{
                     //当软键盘收起，在此处操作
                     window.scrollTo(100,200);
                 }
             }

         },
        idInput(e){
            this.idcard=e.target.value
            if(this.idcard.length>18){
             this.idcard=this.idcard.slice(0,18)
            }
        },
        hideInput(){
            this.bankChoose=false
        },
        chooseBank(item){
            console.log(item,'1')
            this.chooseBankName=item.bankName
            this.bankChoose=false
            this.saveBankCode=item.bankCode
        },
        anzhuo(){
            // this.$refs.input.blur() // android隐藏键盘
        },
        choose(){
            this.bankChoose=!this.bankChoose

        },

        inputOnBlur(){
            window.scrollTo(0,0);

        },
        inputTop(){
            window.scrollTo(0,0);
        },
        binding(){

            var self = this
            var reg2 = new RegExp(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/)
            var obj = {}
            var regName=new RegExp(/^[\u4E00-\u9FA5\xb7]{1,20}$/);
            this.name.replace(/(\xb7)/g,function (val, key) {
                obj[key]?obj[key]++:obj[key]=1
            })

            if(self.name==''){
                self.appAlert("姓名不能为空！");
                return
            }
            if (obj['·'] == this.name.length) {
                self.appAlert("姓名有误，请重新输入！");
                return
            } else if(!regName.test(this.name)){
                self.appAlert("姓名有误，请重新输入！");
                return
            }
            if(self.idcard==''){
                self.appAlert("身份证号不能为空！");
                return
            }
            if(self.idcard!=''){
                if(!reg2.test(self.idcard)){
                    self.appAlert("身份证格式错误")
                    return
                }
            }
            if(this.bankCard==''){
                self.appAlert("银行卡号不能为空！");
                return
            }else if(this.bankCard.length<19){
                self.appAlert("银行卡格式错误！");
                return
            }
            // if(this.saveBankCode==''){
            //     self.appAlert("请选择所属银行！");
            //     return
            // }
            if(this.chooseBankName=='请选择银行')
            {
                self.appAlert("请选择所属银行！");
                return
            }
            if(this.bankDev==''){
                self.appAlert("所属支行不能为空！");
                return
            }
            if(this.phone==''){
                self.appAlert("手机号不能为空！");
                return
            }
            if(this.code==''){
                self.appAlert("验证码不能为空！");
                return
            }
            if(this.bank!='请选择银行'){
                this.bankName=this.bank
            }

            if(self.phone.length<11){
                self.appAlert("请输入正确的手机号")
                return
            }
            if(self.code.length<6){
                self.appAlert("验证码不能少于6位数")
                return
            }
            self.getOnce=true
            self.loading=true
            var data = {
                srcFlowId: self.srcFlowId,
                // srcFlowId:'10182905356053585403',
                contactId: localStorage.getItem('contactId'),
                verCode: self.code,
                idCard: self.idcard.replace("x","X"),
                name: self.name,
                bankCode: self.saveBankCode,
                account: self.bankCard.replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ""),
                bankName: self.chooseBankName,
                bankBranchName:self.bankDev,
                reservedMobile: self.phone,
                verifyCode:localStorage.getItem('verifyCode'),
            }
            var ag1 = JSON.stringify(data);
            if(self.getOnce=true){

            $.ajax({
                url: url2,
                timeout: 60000, //超时时间设置，单位毫秒60s
                type: "POST",
                dataType: "json",
                data: ({
                    arg0: '008006',
                    arg1: ag1
                }),
                success: function (res) {
                    self.loading=false
                    console.log("验证成功");
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
                            self.appAlert(res.msgEx.respDesc);

                            document.location='addCard.html'+'?contactId='+self.no


                        }
                    }else {
                        if (self.srcFlowId == '') {
                            self.appAlert('验证码错误！');
                        } else {
                            self.appAlert(res.msgEx.respDesc);
                        }

                    }
                }
            })
            }else {
                self.loading=false
                self.appAlert('请获取验证码');
                return
            }
        },
        inputFun(e){
            var self =this

            self.saveBankCode=self.bankList[e.target.selectedIndex-1].bankCode
            self.saveBankName=self.bankList[e.target.selectedIndex-1].bankName
            console.log(self.saveBankCode)
            //e.target 指向了dom元素

            // ...
        },
        getCode(){
            var self = this;
            var reg = new RegExp(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/)
            var obj = {}
            var regName=new RegExp(/^[\u4E00-\u9FA5\xb7]{1,20}$/);
            this.name.replace(/(\xb7)/g,function (val, key) {
                obj[key]?obj[key]++:obj[key]=1
            })

            if(self.name==''){
               self.appAlert("姓名不能为空！");
               return
           }
            if (obj['·'] == this.name.length) {
                self.appAlert("姓名有误，请重新输入！");
                return
            } else if(!regName.test(this.name)){
                self.appAlert("姓名有误，请重新输入！");
                return
            }
           if(this.idcard==''){
               self.appAlert("身份证号不能为空！");
               return
           }
            if(self.idcard!=''){
                if(!reg.test(self.idcard)){
                    self.appAlert("身份证格式错误")
                    return
                }
            }
           if(this.bankCard==''){
               self.appAlert("银行卡号不能为空！");
               return
           }else if(this.bankCard.length<19){
               self.appAlert("银行卡格式错误！");
               return
           }
           // if(this.saveBankCode==''){
           //     self.appAlert("请选择所属银行！");
           //     return
           // }
            if(this.chooseBankName=='请选择银行')
            {
                self.appAlert("请选择所属银行！");
                return
            }
           if(this.bankDev==''){
               self.appAlert("所属支行不能为空！");
               return
           }
           if(this.phone==''){
               self.appAlert("手机号不能为空！");
               return
           }

            if(self.phone.length<11){
                self.appAlert("请输入正确的手机号")
                    return
            }

            var TIME_COUNT = 60;
            if (!this.timer) {
                var _this = this;
                this.show = false;
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

            //发送短信验证码
            var data = {
                idCard: self.idcard.replace("x","X"),
                contactId:localStorage.getItem('contactId'),
                accountName: self.name,
                bankCode: self.saveBankCode,
                account: self.bankCard.replace(" ", "").replace(" ", "").replace(" ", "").replace(" ", ""),
                bankName: self.chooseBankName,
                bankBranchName:self.bankDev,
                reservedMobile: self.phone,
                type:'1'
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
                    self.loading=false
                    console.log(res);
                    if(res.msgEx.status == 0){
                        self.srcFlowId=res.msgEx.infos.flowId
                        // alert(self.srcFlowId)
                    }else{
                        self.appAlert(res.msgEx.respDesc);
                    }
                },
                error: function () {
                    self.loading=false
                    self.appAlert("请求失败！");
                }
            });
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
