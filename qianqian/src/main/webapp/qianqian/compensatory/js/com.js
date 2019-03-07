//H5请求url
var url2 = '/CustomerCreditFront/front/requestApi';        //H5
var url3 = '/CustomerCreditFront/front/requestApi4Stream';    //H5数据流


//移动端调试


//调用APP方法开关

//     source = GetQueryString("source");
// if(source == "app"){
//     appSwitch = true;
// }else if(source == "other"){
//     appSwitch = false;
// }
if(typeof  noSigup!="undefined"){
    hasSignup=true;
}
// 判断登录







var TIME_COUNT = 60;

Vue.filter('accNo', function (val) {
    if (val) {
        return "**** **** **** " + val.substr(val.length-4);
    }
});
Vue.filter('phone', function (val) {
    if (val) {
        return val.substr(0, 3) + "****" + val.substr(7);
    }
});


function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}

function imgLoad(img, callback) {
    var timer = setInterval(function () {
        if (img.complete) {
            callback(img)
            clearInterval(timer)
        }
    }, 50)
}
function isPhoneNum(value) {
    return /^1[0-9]{10}$/.test(value);
//  return /^0?(13[0-9]|15[012356789]|17[012356789]|18[012356789]|14[57])[0-9]{8}$/.test(value);
};

function isIdCard(value) {
    return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(value)
}

//银行卡号
function isAccount(value) {
    return /^([1-9]{1})(\d{14,18})$/.test(value)
}
//所属支行
function isBranchName(value) {
    return /^[A-Za-z0-9\u4e00-\u9fa5]{0,1000}$/.test(value)
}

//anim
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('2 6(1,0){$(1).7(0+\' 3\').4(\'5 8 c d b\',2(){$(9).a(0+\' 3\')})};',14,14,'x|y|function|animated|one|webkitAnimationEnd|anim|addClass|mozAnimationEnd|this|removeClass|animationend|MSAnimationEnd|oanimationend'.split('|'),0,{}));

function setCookie(name,value)//两个参数，一个是cookie的名子，一个是值
{
    var Days = 7; //此 cookie 将被保存 30 天
    var exp = new Date();    //new Date("December 31, 9998");
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getCookie(name)//取cookies函数
{
    var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
    if(arr != null) return unescape(arr[2]); return null;
}

//删除指定名称的cookie，将其过期时间设定为一个过去的时间
function delCookie(name){
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = name + "=a; expires=" + date.toGMTString();
}
//删除所有cookie
function clearCookie(){
    var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i =  keys.length; i--;)
            document.cookie=keys[i]+'=0;expires=' + new Date(0).toUTCString()
    }
}

//图片预加载
(function addImg(isrc)
{
    var Img = new Image();
    Img.src = isrc;
    Img.onload = function ()
    {
        $('.ld_gif').html('<img src="'+Img.src+'">');
        return Img.src;
    }
})('img/icons/loading.gif');

Vue.component('footer-nav', {
    data: function () {
        return {
            newClass: 'ddd'
        }
    },
    props: ['post'],
    template: '<div class="footer">' +
        '<a href="index.html" :class=" post == 1 ? \'active\' : \'\' ">首页 </a>' +
        '<a href="javascript:;" onclick="alert(\'暂未开放\')" :class=" post == 2 ? \'active\' : \'\' ">还款计划 </a>' +
        '<a href="user.html" :class=" post == 3 ? \'active\' : \'\' ">个人中心 </a>' +
        '<a href="javascript:;" onclick="alert(\'暂未开放\')" :class=" post == 4 ? \'active\' : \'\' ">更多 </a>' +
        '</div>',
})

