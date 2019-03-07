var em =  new Vue({
    el:'#app',
    data:{
        lendName:localStorage.getItem('lendName'),
        lendId:localStorage.getItem('idNum'),
        backMoney:'',
        bank:'',
        bankNo:'',
        backName:'',
        backId:'',
        phone:'',
        seen:false,
        outTime:false,
        repay:true,
        state:false,
        upperCompsyAmount:parseFloat(localStorage.getItem('upperCompsyAmount')),
        saveBankMessage:[],
        branchBank:'',
        bankListLong:'',
        loading:true,
        lendloneNo:localStorage.getItem('contactId')

    },
    //过滤器
    filters: {
        //借款人身份证加星号
        lendId:function(value){
            if(!value){
                return ''
            }
            return value.substr(0, 3) + "***********" + value.substr(-4);
        },
        //还款人身份证加星号
        backId:function(value){
            if(!value){
                return ''
            }
            return value.substr(0, 3) + "***********" + value.substr(-4);
        },
        //银行卡号
        bankNo:function(value){
            if(!value){
                return ''
            }
            return value.substr(0, 3) + "*********"+value.substr(-4);
        },
        //电话加星号
        phone: function(value) {
            if (!value) {
                return ''
            }
            return value.substr(0, 3) + "****" + value.substr(-4);
        },

    },
    mounted(){
        var self = this;
        var jk =self.GetQueryString('dc')

        self.backMoney = parseFloat(localStorage.getItem('compsyAmount'))
        console.log(sessionStorage.saveBankMessage)
        if(sessionStorage.saveBankMessage!=undefined){
            self.saveBankMessage=JSON.parse(sessionStorage.saveBankMessage)
            self.loading=false

        }else {
            self.saveBankMessage=[]
        }

        console.log(this.saveBankMessage)
        if(localStorage.getItem('loanState')&&localStorage.getItem('loanState')=='逾期'){
            this.state=true
        }

        if(jk==1) {

            var url2 = '/CustomerCreditFront/front/requestApi';
            var data = {
                contactId: localStorage.getItem('contactId'),
            }
            var ag1 = JSON.stringify(data);

            $.ajax({
                url: url2,
                timeout: 60000, //超时时间设置，单位毫秒60s
                type: "POST",
                dataType: "json",
                data: ({
                    arg0: '008002',
                    arg1: ag1
                }),
                success: function (res) {
                    // window.location='repayment-dc.html'

                    if (res.msgEx.status == 0) {
                        self.loading = false
                        self.backName = res.msgEx.infos.bankCards[0].name
                        self.bank = res.msgEx.infos.bankCards[0].bankName
                        self.bankNo = res.msgEx.infos.bankCards[0].account
                        self.backId = res.msgEx.infos.bankCards[0].idNum
                        self.phone = res.msgEx.infos.bankCards[0].mobile
                        self.branchBank = res.msgEx.infos.bankCards[0].bankBranchName
                        self.bankListLong = res.msgEx.infos.bankCards.length

                    } else {
                        self.loading = false
                        self.appAlert(res.msgEx.respDesc);
                    }
                },
                error: function () {
                    self.loading = false
                    self.appAlert("请求失败！");
                },

            })
        }

        if(jk=2){
            self.loading = false
            self.backName = self.saveBankMessage.name
            self.bank = self.saveBankMessage.bankName
            self.bankNo = self.saveBankMessage.account
            self.backMoney = localStorage.getItem('compsyAmount')
            self.backId = self.saveBankMessage.idNum
            self.phone = self.saveBankMessage.mobile
            self.branchBank = self.saveBankMessage.bankBranchName
            console.log(this.branchBank, '123')
        }

    },
    watch:{


    },
    methods:{
        GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
},
        goList(){
          window.location='addCard.html?contactId='+this.lendloneNo
        },


        //点击还款卡确定
        sure(){
            var self = this
            if(self.backMoney==''){
                self.appAlert("请输入正确的还款金额")
                return
            }
           if(self.backMoney&&self.bankListLong > 0){

               var str=this.backMoney.toString();
               endstr=str.charAt(str.length-1);
               statStr=str.charAt(0);
               if(statStr=='.'|| statStr==0){
                   self.appAlert("还款金额应大于1")
                   return
               }else {
                   self.seen=true
                   self.outTime=true
               }

               if(endstr=='.'){
                   this.backMoney=this.backMoney.replace('.','')
               }
           }
            if(sessionStorage.saveBankMessage!=undefined){

                var str=this.backMoney;
                endstr=str.charAt(str.length-1);
                statStr=str.charAt(0);
                if(statStr=='.'|| statStr==0){
                    self.appAlert("还款金额应大于1")
                    return
                }
                self.seen=true
                self.outTime=true
                if(endstr=='.'){
                    this.backMoney=this.backMoney.replace('.','')

                }
            }
           else if(self.bankListLong==0){
               self.appAlert("请选择银行卡")
           }
            localStorage.setItem('dc-idCard',self.backId)//代偿人身份证
            localStorage.setItem('dc-backName',self.backName)//代偿人姓名
            localStorage.setItem('dc-backMoney',self.backMoney)//代偿人还款金额
            localStorage.setItem('dc-phone',self.phone)//代偿人手机号
            localStorage.setItem('dc-account',self.bankNo)//代偿人账户
            localStorage.setItem('dc-bank',self.bank)//代偿人银行名称
            localStorage.setItem('dc-branchBank',self.branchBank)//代偿人分支银行名称

        },
        //还款次数用光
        closeWait(){
            this.seen=false
        },
        //取消
        cancel(){
            this.seen=false,
            this.repay=false
        },
        inputFun(e){
            //e.target 指向了dom元素
            this.backMoney = e.target.value.match(/^\d*(\.?\d{0,2})/g)[0];

            if(this.backMoney>this.upperCompsyAmount){
                this.backMoney=this.upperCompsyAmount
            }
            // ...
        },
        //确定还款
        gopay(){

              window.location='contract.html'

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
