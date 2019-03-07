var em = new Vue({
    el:'#app',
    data:{
        page1:false,
        page2:false,
        page3:false,
        page4:false,
        page5:false,
        page6:false,


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
        if(searchText==06){
            this.page6=true
        }


    },


})
