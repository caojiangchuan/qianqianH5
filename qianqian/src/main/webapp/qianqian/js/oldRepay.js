var App = new Vue({
    el: '.content',
    data: {
        page: {
            page1: false,
            page2: false,
        },
        typeImgUrl: '',
        dataOldRepay: '',
        joinType: '1',
        idCard: '',
        phone: '',
        appAl_text: '',
        oldAppNo: '',     // 原申请件编号,
        isApp:false
    },
    beforeCreate:function () {
        // 判断登录
        if(!appSwitch)  testLogin();
    },
    mounted: function () {
        if(GetQueryString('platform')=='ios'){
            var trs=window.screen.width/750;
            $('.content').css('transform','scale('+trs+')');
        }
        var _this = this;
        if(GetQueryString('from')=='app') _this.isApp=true;
        Vue.nextTick(function () {
                setTimeout(function(){
                    var swiper = new Swiper('.swiper-container', {
                        direction: 'vertical',
                        slidesPerView: 'auto',
                        mousewheelControl: true,
                        freeMode: true,

                        roundLengths : true, //防止文字模糊
                    });
                },100);
            })
        $('body').bind("touchmove",function(e){
            e.preventDefault();
        });
        _this.idCard = getCookie('idCard') || GetQueryString('idCard');
        _this.phone = getCookie('phone') || GetQueryString('phone');
        var data = {
            'idCard': _this.idCard,
            "phone": _this.phone,
        }
        var ag1 = JSON.stringify(data);

        $.ajax({
            url: url2,
            timeout: 60000,
            type: "POST",
            async: false,
            dataType: "json",
            data: ({
                arg0: '002012',
                arg1: ag1
            }),
            success: function (res) {
                if (res.code == '0000') {
                    if (res.msgEx.status == 0) {
                        _this.joinType = res.msgEx.infos.joinType;
                        if (_this.joinType == -1) {
                            _this.appAl_text = '活动筹划中';
                            $('#appAlert2').fadeIn();
                        } else if (_this.joinType == '活动一') {
                            _this.typeImgUrl = 'img/active/oldRepay1.jpg';
                        } else if (_this.joinType == '活动二') {
                            _this.typeImgUrl = 'img/active/oldRepay2.jpg';
                        } else if (_this.joinType == 3) {
                            _this.appAl_text = '您已经参与过活动了<br>不能重复参加哦';
                            $('#appAlert2').fadeIn();
                        }
                    } else {
                        _this.appAlert(res.msgEx.respDesc);
                        if (res.msgEx.respDesc == '未找到该身份证记录') {
                            window.location = 'signup.html';
                        }
                    }

                } else {
                    _this.appAlert(res.msgEx.respDesc);
                }

            },
            error: function () {
                _this.loadingHide();
                _this.appAlert("网络繁忙，请稍后再试！");
            }
        });

        if(GetQueryString('page')==2){
            _this.page.page2 = true;
        }else{
            _this.page.page1 = true;
        }
        // var furlHash = location.hash.split('#')[1];
        // if (furlHash)  _this.page[furlHash] = true;
        // else    _this.page.page1 = true;
    //    window.addEventListener("hashchange", myHashchange);
    //     function myHashchange() {
    //         var urlHash = location.hash.split('#')[1];
    //         for (var Key in _this.page) {
    //             _this.page[Key] = false;
    //         }
    //         if (urlHash)  _this.page[urlHash] = true;
    //         else _this.page.page1 = true;
    //     }
        //console.log('localStorage:' + localStorage.getItem("dataOldRepay"))
        if (localStorage.getItem("dataOldRepay")) {
            _this.dataOldRepay = JSON.parse(localStorage.getItem("dataOldRepay"));
        }
        if (localStorage.getItem("oldAppNo")) {
            _this.oldAppNo = localStorage.getItem("oldAppNo");
        }
    } ,
    methods: {
        //跳转活动页
        p1_btn: function () {
            var _this = this;
            _this.loadingShow();
            var data = {
                'idCard': _this.idCard,
                "phone": _this.phone,
            }
            var ag1 = JSON.stringify(data);
            $.ajax({
                url: url2,
                timeout: 60000,
                type: "POST",
                dataType: "json",
                data: ({
                    arg0: '002011',
                    arg1: ag1
                }),
                success: function (res) {
                    _this.loadingHide();
                    if (res.code == '0000') {
                        if (res.msgEx.status == 0) {
                          // location.hash = 'page2';
                            var link=window.location.href;

                            _this.dataOldRepay = res.msgEx.infos;
                            _this.oldAppNo = res.msgEx.infos.oldAppNo;
                            localStorage.setItem("dataOldRepay", JSON.stringify(_this.dataOldRepay));
                            localStorage.setItem("oldAppNo", _this.oldAppNo);

                            if(link.indexOf('?') == -1){
                                window.location = link + '?page=2';
                            }else{
                                window.location = link+ '&' + 'page=2';
                            }

                        } else {
                            _this.appAlert(res.msgEx.respDesc);
                        }
                    } else {
                        _this.appAlert(res.msgEx.respDesc);
                    }

                },
                error: function () {
                    this.loadingHide();
                    _this.appAlert("网络繁忙，请稍后再试！");
                }
            });

        },
        //活动详情
        oldRepayBtn: function () {

            var _this = this;
            _this.loadingShow();
            var data = {
                'idCard': _this.idCard,
                "phone": _this.phone,
                'oldLoanNo':_this.oldAppNo,
            }
            //_this.oldAppNo, '20170911D9653F'
            var ag1 = JSON.stringify(data);
            $.ajax({
                url: url2,
                timeout: 120000,
                type: "POST",
                dataType: "json",
                data: ({
                    arg0: '002013',
                    arg1: ag1
                }),
                success: function (res) {
                    _this.loadingHide();
                    if (res.code == '0000') {
                        if (res.msgEx.status == 0) {
                            location.hash='page2';
                            if(_this.isApp)
                                window.location = "custom.html?loanNo="+ res.msgEx.infos.newLoanNo+"&source=app&from=jxhj";
                                else    window.location = "custom.html?loanNo="+ res.msgEx.infos.newLoanNo+"&source=other&from=jxhj";
                        } else {
                            if(res.msgEx.respDesc==400001)  _this.appAl_text = '您已经参与过活动了<br>不能重复参加哦';
                                else    _this.appAl_text = '合同生成中<br>稍后客服会联系您哦';
                            $('#appAlert2').fadeIn();
                        }
                    } else {
                        _this.appAlert('网络繁忙，请稍后再试！');
                    }

                },
                error: function () {
                    _this.loadingHide();
                    _this.appAlert("网络繁忙，请稍后再试！");
                }
            });


        },
        loadingShow: function() {
            if(this.isApp)     app.showProgress();
                else $('.loading').fadeIn();
        },
        loadingHide: function() {
                if(this.isApp) app.closeProgress();
                    else $('.loading').fadeOut();

        },
        closePage: function() {
            if(this.isApp)  app.closeNowPage();
                else  wx.closeWindow();
        },
        appAl_btn: function () {
            if(this.joinType==-1||this.joinType==3)   this.closePage();
            $('#appAlert2').fadeOut();
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