var em =  new Vue({
    el:'#app',
    data:{
        noMoney:false,
        outTime:false,
        title:'还款'

    },
    mounted:function () {

        var noMoney =this.GetQueryString('noMoney')
        var outTime =this.GetQueryString('outTime')
       //余额不足
        if(noMoney==1){
            this.noMoney=true
            this.outTime=false
            document.title = '还款失败';
        }
        //超时72小时
        if(outTime==1){
            this.noMoney=false
            this.outTime=true
            document.title = '还款失效';
        }
    },
    methods:{
        GetQueryString(name) {
           var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
           var r = window.location.search.substr(1).match(reg);
           if (r != null) return decodeURI(r[2]); return null;
}
}



})
