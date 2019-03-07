var em = new Vue({
    el:'#app',
    data:{
        bankList:[],
        listIndex:null,
        saveBankMessage:'',
        imgCode:'00080002',
        chooseBtn:false,
        loading:true,
        no:''
    },

    created(){

        var self = this;
        self.no =this.GetQueryString('contactId')

        console.log('123')
        sessionStorage.no= JSON.stringify(self.no)
        // if(self.bankList.length>0){
        //     self.chooseBtn=true
        // }else {
        //     self.chooseBtn=false
        // }
        var url2 = '/CustomerCreditFront/front/requestApi';
        // alert(localStorage.getItem('contactId'))
        var data = {
            contactId: self.no,
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
                self.loading=false
                if(res.msgEx.status==0){
                   self.bankList=res.msgEx.infos.bankCards
                    if(self.bankList.length>0){
                        self.chooseBtn=true
                    }else {
                        self.chooseBtn=false
                    }

                }else{
                    self.loading=false
                    self.appAlert(res.msgEx.respDesc);
                }
            },
            error: function () {
                self.loading=false
                self.appAlert("请求失败！");
            },

        })
    },
    moutend(){
      console.log('mounted')

    },
    methods: {
        GetQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return decodeURI(r[2]); return null;
        },
        active(site,index){
            this.listIndex=index;
            this.saveBankMessage=site
        },
        sure(){
           //存银行卡信息
            sessionStorage.saveBankMessage= JSON.stringify(this.saveBankMessage)
            console.log(JSON.parse(sessionStorage.saveBankMessage))
            if(JSON.parse(sessionStorage.saveBankMessage)){
                window.location='repayment-dc.html?dc=2'
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

    },
    filters:{
        bankCode:function (value) {
            if(!value){
                return ''
            }
            return value.substr(0, 3) + "* **** **** "+value.substr(-4);
        }
    }
    })
