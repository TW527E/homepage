//弹窗样式
iziToast.settings({
    timeout: 10000,
    progressBar: false,
    close: false,
    closeOnEscape: true,
    position: 'topCenter',
    transitionIn: 'bounceInDown',
    transitionOut: 'flipOutX',
    displayMode: 'replace',
    layout: '1',
    backgroundColor: '#00000040',
    titleColor: '#efefef',
    messageColor: '#efefef',
    icon: 'Fontawesome',
    iconColor: '#efefef',
});

//加载完成后执行
window.addEventListener('load', function () {

    //载入动画
    $('#loading-box').attr('class', 'loaded');
    $('#bg').css("cssText", "transform: scale(1);filter: blur(0px);transition: ease 1.5s;");
    $('.cover').css("cssText", "opacity: 1;transition: ease 1.5s;");
    $('#section').css("cssText", "transform: scale(1) !important;opacity: 1 !important;filter: blur(0px) !important");

    //用户欢迎
    setTimeout(function () {
        iziToast.show({
            timeout: 2500,
            icon: false,
            title: hello,
            message: '歡迎來到我的個人主頁!'
        });
    }, 800);
}, false)

setTimeout(function () {
    $('#loading-text').html("字體與文件加載需要一定的時間")
}, 3000);

//延迟加载音乐播放器
function downloadJSAtOnload() {
    var element = document.createElement("script");
    element.src = "./js/music.js";
    document.body.appendChild(element);
}
if (window.addEventListener)
    window.addEventListener("load", downloadJSAtOnload, false);
else if (window.attachEvent)
    window.attachEvent("onload", downloadJSAtOnload);
else window.onload = downloadJSAtOnload;

//新春灯笼 （ 需要时取消注释 ）
/*
new_element=document.createElement("link");
new_element.setAttribute("rel","stylesheet");
new_element.setAttribute("type","text/css");
new_element.setAttribute("href","./css/lantern.css");
document.body.appendChild(new_element);

new_element=document.createElement("script");
new_element.setAttribute("type","text/javascript");
new_element.setAttribute("src","./js/lantern.js");
document.body.appendChild(new_element);
*/

//火狐浏览器独立样式
if (isFirefox = navigator.userAgent.indexOf("Firefox") > 0) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.href = './css/firefox.css';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    head.appendChild(link);
    window.addEventListener('load', function () {
        setTimeout(function () {
            iziToast.show({
                timeout: 8000,
                icon: "fa-solid fa-circle-exclamation",
                message: '您正在使用 Firefox 瀏覽器，某部份功能將會不支持'
            });
        }, 3800);
    }, false)
}

//获取一言
fetch('https://v1.hitokoto.cn?max_length=24')
    .then(response => response.json())
    .then(data => {
        $('#hitokoto_text').html(data.hitokoto)
        $('#from_text').html(data.from)
    })
    .catch(console.error)

var times = 0;
$('#hitokoto').click(function () {
    if (times == 0) {
        times = 1;
        var index = setInterval(function () {
            times--;
            if (times == 0) {
                clearInterval(index);
            }
        }, 1000);
        fetch('https://v1.hitokoto.cn?max_length=24')
            .then(response => response.json())
            .then(data => {
                $('#hitokoto_text').html(data.hitokoto)
                $('#from_text').html(data.from)
            })
            .catch(console.error)
    } else {
        iziToast.show({
            timeout: 2000,
            icon: "fa-solid fa-circle-exclamation",
            message: '不要點那麼快啦 QAQ'
        });
    }
});

//获取天气
//每日限量 100 次
//请前往 https://www.tianqiapi.com/ 申请（免费）
fetch('https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-B70BD04A-9F4C-466B-808C-0BF84DB092A8&limit=1&offset=0&format=JSON&locationName=%E6%96%B0%E7%AB%B9%E7%B8%A3')
    .then(response => response.json())
    .then(data => {
        $('#wea_text').html(data.records.location[0].weatherElement[0].time[0].parameter.parameterName)
        $('#city_text').html(data.records.location[0].locationName)
        $('#tem_night').html(data.records.location[0].weatherElement[2].time[1].parameter.parameterName)
        $('#tem_day').html(data.records.location[0].weatherElement[4].time[0].parameter.parameterName)
    })
    .catch(console.error)

//获取时间
var t = null;
t = setTimeout(time, 1000);

function time() {
    clearTimeout(t);
    dt = new Date();
    var y = dt.getYear() + 1900;
    var mm = dt.getMonth() + 1;
    var d = dt.getDate();
    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var day = dt.getDay();
    var h = dt.getHours();
    var m = dt.getMinutes();
    var s = dt.getSeconds();
    if (h < 10) {
        h = "0" + h;
    }
    if (m < 10) {
        m = "0" + m;
    }
    if (s < 10) {
        s = "0" + s;
    }
    //document.getElementById("time").innerHTML = y + "&nbsp;年&nbsp;" + mm + "&nbsp;月&nbsp;" + d + "&nbsp;日&nbsp;" + "<span class='weekday'>" + weekday[day] + "</span><br>" + "<span class='time-text'>" + h + ":" + m + ":" + s + "</span>";
    $("#time").html(y + "&nbsp;年&nbsp;" + mm + "&nbsp;月&nbsp;" + d + "&nbsp;日&nbsp;" + "<span class='weekday'>" + weekday[day] + "</span><br>" + "<span class='time-text'>" + h + ":" + m + ":" + s + "</span>");
    t = setTimeout(time, 1000);
}

//链接提示文字
$("#social").mouseover(function () {
    $("#social").css({
        "background": "rgb(0 0 0 / 25%)",
        'border-radius': '6px',
        "backdrop-filter": "blur(5px)"
    });
    $("#link-text").css({
        "display": "block",
    });
}).mouseout(function () {
    $("#social").css({
        "background": "none",
        "border-radius": "6px",
        "backdrop-filter": "none"
    });
    $("#link-text").css({
        "display": "none"
    });
});

$("#github").mouseover(function () {
    $("#link-text").html("去 Github 看看");
}).mouseout(function () {
    $("#link-text").html("通過這些聯繫我");
});
$("#qq").mouseover(function () {
    $("#link-text").html("有什麼事嗎");
}).mouseout(function () {
    $("#link-text").html("通過這些聯繫我");
});
$("#steam").mouseover(function () {
    $("#link-text").html("跟我玩遊戲");
}).mouseout(function () {
    $("#link-text").html("通過這些聯繫我");
});
$("#bilibili").mouseover(function () {
    $("#link-text").html("來看下影片!");
}).mouseout(function () {
    $("#link-text").html("通過這些聯繫我");
});
$("#email").mouseover(function () {
    $("#link-text").html("來封 Email");
}).mouseout(function () {
    $("#link-text").html("通過這些聯繫我");
});
$("#telegram").mouseover(function () {
    $("#link-text").html("跟我聊聊天 ~");
}).mouseout(function () {
    $("#link-text").html("通過這些聯繫我");
});
$("#twitter").mouseover(function () {
    $("#link-text").html("來看看w");
}).mouseout(function () {
    $("#link-text").html("通過這些聯繫我");
});

//更多页面切换
var shoemore = false;
$('#switchmore').on('click', function () {
    shoemore = !shoemore;
    if (shoemore && $(document).width() >= 990) {
        $('#container').attr('class', 'container mores');
        $("#change").html("MEOW&nbsp;!");
        $("#change1").html("好癢w，你竟然發現了我!（ 再次點擊關閉 ）");
    } else {
        $('#container').attr('class', 'container');
        $("#change").html("Hello&nbsp;This&nbsp;Beautiful&nbsp;World&nbsp;!");
        $("#change1").html("為了更好的生活奮鬥");
    }
});

//更多页面关闭按钮
$('#close').on('click', function () {
    $('#switchmore').click();
});

//移动端菜单栏切换
var switchmenu = false;
$('#switchmenu').on('click', function () {
    switchmenu = !switchmenu;
    if (switchmenu) {
        $('#row').attr('class', 'row menus');
        $("#menu").html("<i class='fa-solid fa-xmark'></i>");
    } else {
        $('#row').attr('class', 'row');
        $("#menu").html("<i class='fa-solid fa-bars'></i>");
    }
});

//更多弹窗页面
$('#openmore').on('click', function () {
    $('#box').css("display", "block");
    $('#row').css("display", "none");
    $('#more').css("cssText", "display:none !important");
});
$('#closemore').on('click', function () {
    $('#box').css("display", "none");
    $('#row').css("display", "flex");
    $('#more').css("display", "flex");
});

//监听网页宽度
window.addEventListener('load', function () {
    window.addEventListener('resize', function () {
        //关闭移动端样式
        if (window.innerWidth >= 600) {
            $('#row').attr('class', 'row');
            $("#menu").html("<i class='fa-solid fa-bars'></i>");
            //移除移动端切换功能区
            $('#rightone').attr('class', 'row rightone');
        }

        if (window.innerWidth <= 990) {
            //移动端隐藏更多页面
            $('#container').attr('class', 'container');
            $("#change").html("Hello&nbsp;World&nbsp;!");
            $("#change1").html("為了更好的生活奮鬥");

            //移动端隐藏弹窗页面
            $('#box').css("display", "none");
            $('#row').css("display", "flex");
            $('#more').css("display", "flex");
        }
    })
})

//移动端切换功能区
var changemore = false;
$('#changemore').on('click', function () {
    changemore = !changemore;
    if (changemore) {
        $('#rightone').attr('class', 'row menus mobile');
    } else {
        $('#rightone').attr('class', 'row menus');
    }
});

//更多页面显示关闭按钮
$("#more").hover(function () {
    $('#close').css("display", "block");
}, function () {
    $('#close').css("display", "none");
})

//屏蔽右键
document.oncontextmenu = function () {
    iziToast.show({
        timeout: 2000,
        icon: "fa-solid fa-circle-exclamation",
        message: '為提高瀏覽體驗，此網站禁用右鍵'
    });
    return false;
}

//控制台输出
var styleTitle1 = `
font-size: 20px;
font-weight: 600;
color: rgb(244,167,89);
`
var styleTitle2 = `
font-size:12px;
color: rgb(244,167,89);
`
var styleContent = `
color: rgb(30,152,255);
`
var title1 = '誠誠の個人主頁'
var title2 = `
 _____ __  __  _______     ____     __
|_   _|  \\/  |/ ____\\ \\   / /\\ \\   / /
  | | | \\  / | (___  \\ \\_/ /  \\ \\_/ / 
  | | | |\\/| |\\___ \\  \\   /    \\   /  
 _| |_| |  | |____) |  | |      | |   
|_____|_|  |_|_____/   |_|      |_|                                                     
`
var content = `
版 本 号：3.0
更新日期：2022-05-20

主页:  https://www.imsyy.top
Github:  https://github.com/imsyy/home
`
console.log(`%c${title1} %c${title2}
%c${content}`, styleTitle1, styleTitle2, styleContent)