function showMessMess(message) {
    window.top.ShowTip(message);
}

function alertMessage(message,url){
    var m = { "Type": "2", "Msg": message}
    window.top.ShowTip(m);
    if (url) {
        location.href = url;
    }
}

function tipMessage(message,url) {
    var m = { "Type": "1", "Msg": message}
    window.top.ShowTip(m);
    if (url){
        location.href = url;
    }
}

function EnterToTab() {
    //$("input:text:first").focus();
    var $inp = $('input:text');
    $inp.bind('keypress', function (e) {
        var key = e.which;
        if (key == 13) {
            e.preventDefault();
            var nxtIdx = $inp.index(this) + 1;
            $(":input:text:eq(" + nxtIdx + ")").focus();
            $(":input:text:eq(" + nxtIdx + ")").select();
        }
    });
}


function SetCookie(cookieName, cookieValue, nDays) {
    var today = new Date();
    var expire = new Date();
    if (nDays == null || nDays == 0) nDays = 1;
    expire.setTime(today.getTime() + 3600000 * 24 * nDays);
    document.cookie = cookieName + "=" + escape(cookieValue) + ";path=/;expires=" + expire.toGMTString();
}

function GetCookie(namex) {
    var cookieString = new String(document.cookie);
    var cookieHeader = namex + "=";
    var beginPosition = cookieString.indexOf(cookieHeader);
    if (beginPosition != -1) {
        cookieString = cookieString.substring(beginPosition + cookieHeader.length);
        if (cookieString.indexOf(";") > -1) {
            cookieString = cookieString.substring(0, cookieString.indexOf(";"));
        }
        return unescape(cookieString);
    }
    return "";
}

function filter(str)
{
    str = str.replace(/\+/g, "%2B");
    str = str.replace(/\&/g, "%26");
    return str;
}

String.prototype.isDate = function () {
    var arr = this.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (arr == null) {
        arr = this.match(/^(\d{4})(\d{2})(\d{2})$/);
        if (arr == null) return null;
    }
    var dt = new Date(arr[1], arr[2] - 1, arr[3]);
    if (dt.getFullYear() == parseInt(arr[1]) && dt.getMonth() + 1 == parseInt(arr[2], 10) && dt.getDate() == parseInt(arr[3], 10))
        return dt;
};

Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

Array.prototype.indexOf = function (key,val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i][key] == val) return i;
    }
    return -1;
};

Array.prototype.remove = function (index) {
    if (index > -1) {
        this.splice(index, 1);
    }
}

Array.prototype.edit = function (index,obj) {
    if (index > -1) {
        this.splice(index, 1,obj);
    }
}

Array.prototype.search = function (key,val) {
    var temp = new Array();
    for (var i = 0; i < this.length; i++) {
        if (!this[i][key])
        { continue; }
        if (this[i][key].indexOf(val) >= 0)
        { temp.push(this[i]); }
    }
    return temp;
}


Array.prototype.contains = function (element) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == element) {
            return true;
        }
    }
    return false;
}


Array.prototype.searchAry = function (arykey, val) {
    var temp = new Array();
    var ary = arykey.split(',');
    
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j < ary.length; j++) {
            if (!this[i][ary[j]]) {  continue; }
            if (this[i][ary[j]].indexOf(val) >= 0) {
                temp.push(this[i]);
                break;
            }
        }
    }
   
    return temp;
}

Array.prototype.searchLeft = function (key, val) {
    var temp = new Array();
    for (var i = 0; i < this.length; i++) {
        if (this[i][key].indexOf(val) == 0) temp.push(this[i]);
    }
    return temp;
}

Date.prototype.FormatDate = function (format) {
    var paddNum = function (num) {
        num += "";
        return num.replace(/^(\d)$/, "0$1");
    }
    //指定格式字符
    var cfg = {
        yyyy: this.getFullYear() //年 : 4位
      , yy: this.getFullYear().toString().substring(2)//年 : 2位
      , M: this.getMonth() + 1  //月 : 如果1位的时候不补0
      , MM: paddNum(this.getMonth() + 1) //月 : 如果1位的时候补0
      , d: this.getDate()   //日 : 如果1位的时候不补0
      , dd: paddNum(this.getDate())//日 : 如果1位的时候补0
      , hh: this.getHours()  //时
      , mm: this.getMinutes() //分
      , ss: this.getSeconds() //秒
    }
    format || (format = "yyyy-MM-dd hh:mm:ss");
    return format.replace(/([a-z])(\1)*/ig, function (m) { return cfg[m]; });
}
Date.prototype.AddDay = function (count) {
    this.setDate((this.getDate() + count));
    return this;
}

//新增点击？按钮功能
$(function () {
    if (window != window.top) {
        $(".typetitle img").each(function () {
            if ($(this).attr("src") == "/Content/themes/Common/Imgs/MetorHelp.gif") {
                $a = $(this).parent();
                $a.removeAttr("href");
                $a.css("cursor", "pointer");
                $a.attr("target", "_blank");
                $.ajax({
                    url: "/HomePage/AjaxGetHelpUrl?ajax=" + Math.random(),
                    type: "GET",
                    dataType: "json",
                    success: function (result) {
                        if (result.Error == "") {
                            //alert(result.Info);
                            //window.open(result.Info);
                            $a.attr("href", result.Info);
                        }
                        else {
                            //window.open("http://bz.infozr.com");
                            //alertMessage(result.Error);
                            $a.attr("href", "http://bz.infozr.com");
                        }
                    },
                    error: function (result) {
                        //alertMessage(result);
                    }
                })

                //$(this).parent().click(function () {
                    //art.dialog.open('/HomePage/clickhelp?ajax='+Math.random(), {
                    //    title: '',
                    //    width: '1000px',
                    //    height: '360px',
                    //    lock: true,
                    //    close: function () {
                    //        art.dialog.close();
                    //    }
                    //});
                //})
            }

            if ($(this).attr("src") == "/Content/themes/Common/Imgs/MetorShearch.gif") {
                $(this).attr("src", "/Content/themes/Common/Imgs/MetorShearch_w.jpg");
                $(this).css("height", "23px");
                $(this).css("width", "46px");
                //$(this).attr("title", "查找");
            }

            if ($(this).attr("src") == "/Content/themes/Common/Imgs/MetorAdd.gif") {
                $(this).attr("src", "/Content/themes/Common/Imgs/MetorAdd_w.jpg");
                $(this).css("height", "23px");
                $(this).css("width", "46px");
                //$(this).attr("title", "添加");
            }

            if ($(this).attr("src") == "/Content/themes/Common/Imgs/MetorHelp.gif") {
                $(this).attr("src", "/Content/themes/Common/Imgs/MetorHelp_w.jpg");
                $(this).css("height", "23px");
                $(this).css("width", "47px");
                //$(this).attr("title", "帮助");
            }
        })

        $(".tablelist tbody tr").each(function () {
            $(this).find("td:last").find("a").each(function () {
                var src = $(this).find("img").attr("src");
                if (!src) return true;
                src = src.toLowerCase();

                if (src == "/content/themes/common/imgs/edit.gif") {
                    $(this).attr("title", "修改");
                }
                if (src == "/content/themes/common/imgs/delete.gif") {
                    $(this).attr("title", "删除");
                }
                if (src == "/content/themes/common/imgs/view.png") {
                    $(this).attr("title", "查看");
                }

                if (src != "/content/themes/common/imgs/moreop2.png") {
                    $(this).find("img").removeAttr("style");
                    var html = $.trim($(this).html());
                    $(this).empty().html(html);
                }
                
            })

            $(this).find("td:last").find("a").not(":last").each(function () {
                var img = $(this).find("img").attr("src");
                if (img) {
                    $(this).css("margin-right", "10px");
                }
            })
        })
    }
})
