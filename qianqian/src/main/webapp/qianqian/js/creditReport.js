var em = new Vue({
    el:'#app',
    data:{
        page1:false,
        page2:false,
        page3:false,


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

        //余额不足

    },


})
