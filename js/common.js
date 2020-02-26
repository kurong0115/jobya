//var defaultUrl="http://localhost:8888/";

var defaultUrl="http://120.24.48.43:8888/";

function getSuccessMsg(msg) {
    $.message({
        message:msg,
        type:'success',
        duration:'3000'
    });
}

function getInfoMsg(msg) {
    $.message({
        message:msg,
        type:'info',
        duration:'3000'
    });
}

function getFailMsg(msg) {
    $.message({
        message:msg,
        type:'error',
        duration:'3000'
    });
}

function getValue(id) {
    var value = $("#" + id).val();
    if (value != null) {
        if (value != "") {
            return value;
        }
    }
    return null;
}

function getSelectText(id){
    var text = $("#" + id + " option:selected").text();
    if (text != null) {
        if (text != "") {
            return text;
        }
    }
    return null;
}

function getSelectValue(id){
    var value = $("#" + id + " option:selected").val();
    if (value != null) {
        if (value != "") {
            return value;
        }
    }
    return null;
}

function error(data) {
    getFailMsg("服务器异常");
}



/**
 * 判断是不是邮箱格式
 * @param {} email 
 */
function checkEmail(email) {
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (reg.test(email)) {
        return true;
    } else {
        getInfoMsg("请输入正确格式的邮箱！！！");
        return false;
    }
}

/**
 * 检查数字的长度
 * @param {*} str 
 * @param {*} len 
 */
function checkStringLength(str,len) {
    var reg = /^[0-9]{6}$/;
    if (reg.test(str)) {
        return true;
    } else {
        getInfoMsg("请输入六位数字验证码！！！");
        return false;
    }
}

function checkPhone(phone) {
    var reg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    if (reg.test(phone)) {
        return true;
    } else {
        getInfoMsg("请输入正确电话号码！！！");
        return false;
    }
}

function sleep(n) {
    var start = new Date().getTime();
    //  console.log('休眠前：' + start);
    while (true) {
        if (new Date().getTime() - start > n) {
            break;
        }
    }
}

// 加载导航条
function loadTopNav() {
    $("#topnav").empty();
    $.ajax({
        type:"get",
        url:"topnav.html",
        async:true,
        success:function(data){
            $("#topnav").html(data);
        }
    });
}

// 加载页底导航条
function loadFootNav() {
    $(".footer footer-bar").empty();
    $.ajax({
        type:"get",
        url:"footer.html",
        async:true,
        success:function(data){
            $(".footer footer-bar").html(data);
        }
    });
}

/**
 * 注销
 */
function logout() {
    swal({
        title: "您确定要注销吗？",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonText: "是",
        confirmButtonColor: "#ec6c62"
    }, function() {
        localStorage.removeItem("token");
        swal("注销成功!");
    });
}

function nav() {
    var token = localStorage.getItem("token");
    if (token == null) {
        $("#user-menu").html('<a href="login.html">登录|注册</a></li>');
    }
}