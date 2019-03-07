Vue.component('security-code', {
    template: '<div class="security-code-wrap">' +
        '<label :for="`code-${uuid}`">' +
        '<ul :class="`${theme}-container security-code-container`">' +
        '<li class="field-wrap" v-for="(item, index) in length" :key="index">' +
        '<i class="char-field">{{value[index] || placeholder}}</i>' +
        '</li></ul></label>' +
        '<input ref="input"  class="input-code" autofocus="autofocus" @keyup="handleInput($event)" :code="this.code" v-model="value"' +
        ':id="`code-${uuid}`" :name="`code-${uuid}`" type="tel" pattern="\d*" onkeyup="this.value=this.value.replace(/\\D/g,\'\')" :maxlength="length"' +
        'autocorrect="off" autocomplete="off" autocapitalize="off" ></div>',
    // 组件属性[开发属性接口]
    props: {
        length: {
            type: Number,
            default: 8
        },
        placeholder: {
            type: String,
            default: ''
        },
        theme: {
            type: String,
            default: 'block'
        },
        code:{}
    },
    // variables
    data() {
        return {
            value: ''
            // code: this.code
        }
    },
    computed: {
        uuid() {
            return Math.random().toString(36).substring(3, 8)
        }
    },

    methods: {
        hideKeyboard() {
            // 输入完成隐藏键盘
            document.activeElement.blur() // ios隐藏键盘
            this.$refs.input.blur() // android隐藏键盘
        },
        handleSubmit() {
            //输入时，给输入框赋一次值
            this.$emit('input', this.value)
            // console.log(this.value, 'input', this.code)
        },
        handleInput(e) {
            this.$refs.input.value = this.value
            if (this.value.length >= this.length) {
                this.hideKeyboard()
            }
            this.handleSubmit()
        },

    }
})
// 创建根实例
new Vue({
    el: '#app',
    data: {
        code: '',
        loading:false
    },
    created(){
        console.log('check')
        sessionStorage.removeItem('saveBankMessage')
    },
    methods:{
        // outTime(){
        //         //   setTimeout(function () {
        //         //       this.loading=false
        //         //   },2000)
        //         // },
        input(item){
            this.code = item
        },
        next() {

            if(this.code.length<8){
                this.appAlert("请输入完整的校验码");
            }else {

                var data = {
                    verifyCode: this.code
                }
                var ag1 = JSON.stringify(data);
                var self = this
                self.loading=true
               $.ajax({
                   url: url2,
                   timeout: 60000, //超时时间设置，单位毫秒60s
                   type: "POST",
                   dataType: "json",
                   data: ({
                       arg0: '008001',
                       arg1: ag1
                   }),
                   success: function (res) {

                       if(res.msgEx.status == 0){
                           self.loading=false
                           if(res.msgEx.infos.compsyInfo.status==01) {
                               localStorage.setItem('lendName', res.msgEx.infos.personInfo.name)//借款人姓名
                               localStorage.setItem('idNum', res.msgEx.infos.personInfo.idNum)//借款人身份证
                               localStorage.setItem('contactId', res.msgEx.infos.compsyInfo.contactId)//代偿人编号
                               localStorage.setItem('loanState', res.msgEx.infos.loanInfo.loanState)//借款状态
                               localStorage.setItem('compsyAmount', res.msgEx.infos.compsyInfo.compsyAmount)//代偿金额
                               localStorage.setItem('upperCompsyAmount', res.msgEx.infos.compsyInfo.upperCompsyAmount)//代偿最大金额
                               localStorage.setItem('loanNo', res.msgEx.infos.loanInfo.loanNo)//借款编号
                               localStorage.setItem('loanBelong', res.msgEx.infos.loanInfo.loanBelong)//合同编号
                               localStorage.setItem('verifyCode', self.code)//合同编号
                               localStorage.setItem('contractNum', res.msgEx.infos.loanInfo.contractNum)//合同编号
                                console.log(res.msgEx.infos.compsyInfo.upperCompsyAmount)

                               window.location = 'repayment-dc.html?dc=1'
                           }
                           if(res.msgEx.infos.compsyInfo.status==02 || res.msgEx.infos.compsyInfo.status==03){
                                 window.location='repay-success.html'
                           }
                           if(res.msgEx.infos.compsyInfo.status==04){
                               window.location='repay-fail.html?noMoney=1'
                           }
                           if(res.msgEx.infos.compsyInfo.status==05){
                               window.location='repay-fail.html?outTime=1'
                           }
                       }else{
                           self.loading=false
                           self.appAlert(res.msgEx.respDesc);
                   }

                   },
                   error: function () {
                       self.loading=false
                       self.appAlert("请求失败！");
                   }
               })

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
