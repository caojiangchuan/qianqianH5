var em = new Vue({
    el:'#app',
    data:{
        page1:false,
        page2:false,
        page3:false,
        page4:false,
        page5:false,
        page6:false,
        page7:false,
        page8:false,
        page9:false,
        page10:false,
        page11:false,
        page12:false,
        page13:false,
        page14:false,
        page15:false,
        page16:false,
        page17:false,
        page18:false,

    },
    created:function () {

        var searchUrl =window.location.href;
        var searchData =searchUrl.split("#");
        var  searchText =decodeURI(searchData[1]);

       if(searchText==01){
           this.page1=true
       }
        if(searchText==02 ){
            this.page2=true
        }
        if(searchText==03 ){
            this.page3=true
        }
        if(searchText==04 ){
            this.page4=true
        }
        if(searchText==05){
            this.page5=true
        }
        if(searchText==06 ){
            this.page6=true
        }
        if(searchText==07){
            this.page7=true
        }
        if(searchText==08){
            this.page8=true
        }
        if(searchText==09){
            this.page9=true
        }
        if(searchText==10){
            this.page10=true
        }
        if(searchText==11 ){
            this.page11=true
        }
        if(searchText==12 ){
            this.page12=true
        }
        if(searchText==13 ){
            this.page13=true
        }
        if(searchText==14){
            this.page14=true
        }
        if(searchText==15 ){
            this.page15=true
        }
        if(searchText==16){
            this.page16=true
        }
        if(searchText==17){
            this.page17=true
        }
        if(searchText==18){
            this.page18=true
        }
        //余额不足

    },


})
