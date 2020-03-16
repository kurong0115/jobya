var defaultUrl="http://localhost:8888/";

//var defaultUrl="http://120.24.48.43:8888/";

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
    //$("#topnav").empty();
    $.ajax({
        type:"get",
        url:"topnav.html",
        async:false,
        success:function(data){
            $("#topnav").append(data);
        }
    });
}

// 加载页底导航条
function loadFootNav() {
    $(".footer footer-bar").empty();
    $.ajax({
        type:"get",
        url:"footer.html",
        async:false,
        success:function(data){
            $(".footer footer-bar").html(data);
        }
    });
}

/**
 * 注销
 */
function logout() {
    Notiflix.Confirm.Show(
        '确认',
        '您确定要注销吗？',
        '确定',
        '取消',
        function(){ 
            localStorage.clear();
            Notiflix.Report.Success(
                '注销成功',
                ' ',
                '关闭',
                function () {
                    location.reload();
                }
            );
        },function(){ 
            // No button callbackalert('If you say so...');
        }
    );
}

function jump() {
    Notiflix.Report.Info(
        '请先登录后再尝试!!!',
        ' ',
        '关闭',
        function () {
            window.location.href = "login.html";
        }
    )
    return;
}

function nav() {
    var token = localStorage.getItem("token");
    if (token == null) {
        $("#user-menu").html('<a href="login.html">登录|注册</a></li>');
    }
}

function getFileName(){
    //
    upload();
}

function getUser() {
    var user = JSON.parse(localStorage.getItem("userInfo"));
    return user;
}

function setName() {
    var user = getUser();
    if (user != null) {
        $("#job-user-name").html(user.userName);
    } else {
        $("#user-menu").html('<a href="login.html">登录|注册</a>');
    }
}

//文件上传
function upload(){
    var token = localStorage.getItem("token");
    token = token.substring(1, token.length - 1);
    $.ajax({
        url: defaultUrl + "base/upload",
        type: 'POST',
        cache: false,
        data: new FormData($('#ff')[0]),
        processData: false,
        contentType: false,
        dataType:"json",
        headers:{"token":token},
        success : function(data) {
            if (data.code == 200) {
                $("#head-image").attr("src", "images/head/" + data.data);
                $("#icon").val("images/head/" + data.data); 
                getSuccessMsg("上传成功");
            } else {
                getFailMsg(data.message);
            }
        },error :function(data){
            getFailMsg(data.message);
        }
    });
} 


// 根据社会信用id获取公司信息
function getCompanyByUniformCreditCode() {
    var uniformCreditCode = getValue("uniformCreditCode");
    if (uniformCreditCode == null || uniformCreditCode == true || uniformCreditCode == "") {
        getInfoMsg("请先输入社会信用编码");
        return;
    }
    var company;
    var flag;
    $.ajax({
        type:"GET",
        async:false,
        url:defaultUrl + "company/getCompanyByUniformCreditCode",
        dataType:"json",
        data:{
            "uniformCreditCode":uniformCreditCode
        },
        success:function(data) {
            if (data.code == 200) {
                company = data.data.company;
                if (company != null) {
                    flag = true;
                    $("#companyName").val(company.name);
                    $("#companyNo").val(company.companyNo);
                    getSuccessMsg("已检测");
                } else {
                    getInfoMsg("该站点不存在该公司信息");
                }
            }
        }
    });
    if (flag) {
        return company;
    } else {
        return null;
    }
    
}
{/* <li class="page-item disabled">
    <a class="page-link" href="#" tabindex="-1" aria-disabled="true">
        <i class="mdi mdi-chevron-double-left f-15"></i>
    </a>
</li>
<li class="page-item active"><a class="page-link" href="#">1</a></li>
<li class="page-item"><a class="page-link" href="#">2</a></li>
<li class="page-item"><a class="page-link" href="#">3</a></li>
<li class="page-item"><a class="page-link" href="#">4</a></li>
<li class="page-item">
    <a class="page-link" href="#">
        <i class="mdi mdi-chevron-double-right f-15"></i>
    </a>
</li> */}
function generatePaginaionNav(pagination) {
    $("#pagination").empty();
    
    var item = "";
    var max = 1;
    var currentPage = pagination.currentPage;
    var total = pagination.total;
    var pageSize = pagination.pageSize;
    // 计算最大页码
    max = total % pageSize == 0 ? parseInt(total / pageSize) : parseInt(total / pageSize) + 1;
    var totalPage = pagination.currentPage + 3 > max ? max : currentPage + 3;
    item = item + '<li class="page-item">'+
                        '<a class="page-link" href="javascript:getJobInfoByPage('+ (currentPage - 1) +',' + max + ')" tabindex="-1" aria-disabled="true">'+
                            '<i class="mdi mdi-chevron-double-left f-15"></i>'+
                        '</a>'+
                    '</li>';
    item = item + '<li class="page-item active"><a class="page-link" href="javascript:getJobInfoByPage('+ currentPage +',' + max + ')">'+currentPage+'</a></li>';
    for (var i = currentPage + 1; i <= totalPage; i++) {
        item = item + '<li class="page-item"><a class="page-link" href="javascript:getJobInfoByPage('+ i +',' + max + ')">' + i + '</a></li>';
    }
    item = item + '<li class="page-item">'+
                        '<a class="page-link" href="javascript:getJobInfoByPage('+ (currentPage + 1) +',' + max + ')" tabindex="-1" aria-disabled="true">'+
                            '<i class="mdi mdi-chevron-double-right f-15"></i>'+
                        '</a>'+
                    '</li>';
    $("#pagination").append(item);
}

function getJobInfoByPage(pageNum,max) {
    if (pageNum <= 0) {
        Notiflix.Report.Info(
            '不能再往前了!!!',
            ' ',
            '关闭'
        )
        return;
    }
    if (pageNum > max) {
        Notiflix.Report.Info(
            '已经是最后一页了',
            ' ',
            '关闭'
        )
        return;
    }
    $("#pageNum").val(pageNum);
    listJob();
}