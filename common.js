var browser = {
    versions: function () {
        let u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1,  //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: u.search(/AppleWebKit.*Mobile.*/) != -1, //是否为移动终端
            ios: u.search(/\(i[^;]+;( U;)? CPU.+Mac OS X/) != -1,//ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1,//是否web应该程序，没有头部与底部           
        };
    }()
}
/*--------------------------------------------------------------------------------------*/

let dir;
let repeatCount = 0;
let cTimeout;

function ScrollToControl(tagname) {
    let elem = document.getElementsByTagName(tagname)[0];
    let scrollPos = elementPosition(elem).y;
    scrollPos = scrollPos - document.documentElement.scrollTop - document.body.scrollTop;
    dir = 1;
    if (scrollPos < 0) dir = -1;
    scrollPos = -70 + scrollPos;
    let remainder = scrollPos % 50;
    let repeatTimes = (scrollPos - remainder) / 50;///步距50

    repeatTimes *= dir;
    ScrollSmoothly(scrollPos, repeatTimes);
    window.scrollBy(0, remainder);
}
function ScrollSmoothly(scrollPos, repeatTimes) {
    if (repeatCount < repeatTimes) {
        window.scrollBy(0, dir * 50);
    }
    else {
        repeatCount = 0;
        clearTimeout(cTimeout);
        return;
    }
    repeatCount++;
    cTimeout = setTimeout("ScrollSmoothly('" + scrollPos + "','" + repeatTimes + "')", 10);
}
function elementPosition(obj) {
    let curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        curleft = obj.offsetLeft;
        curtop = obj.offsetTop;
        while (obj = obj.offsetParent) {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        }
    }
    return { x: curleft, y: curtop };
}