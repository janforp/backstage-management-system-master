/**
 * 页面加载自动查询一次
 */
$(document).ready(function(){
    turnPage(1);
});


/**
 * 翻页
 */
function turnPage(pageNum) {

    var withdrawType = $("#withdrawType").val();
    var withdrawStatus = $("#withdrawStatus").val();
    var startTime = $("#startTime").val().trim();
    var endTime = $("#endTime").val().trim();
    var cellphone = $("#cellphone").val().trim();
    var pageSize = $("#pageSize").val().trim();

    if (parseInt(pageSize) != pageSize && pageSize != ""){
        $("#pageSizeAlert").text("请输入整数");
        setTimeout(function () {
            $("#pageSizeAlert").text("");
        },2000);
        return;
    }

    tips.loading();

    $.ajax({
        url: "/c/page/console/auth/withdraw/list",
        type: "POST",
        dataType: "JSON",
        data: {
            withdrawType: withdrawType,
            withdrawStatus: withdrawStatus,
            startTime: startTime,
            endTime: endTime,
            cellphone: cellphone,
            pageSize: pageSize,
            pageNum: pageNum
        },
        success: function(data){
            if (data.success) {
                var details = data.bean.details;
                var body = $("#redBody");
                body.empty();
                var newTbody = "";
                for (var i= 0;i<details.length ;i ++) {
                    newTbody +=
                        "<tr status='"+details[i].withdrawStatus+"'>"+
                        "    <td><input type='checkbox' value='"+details[i].withdrawId+"' userId='"+details[i].userId+"'></td>"+
                        "    <td>"+details[i].withdrawId+"</td>"+
                        "    <td>"+details[i].userId+"</td>"+
                        "    <td>"+details[i].withdrawAccount+"</td>"+
                        "    <td>"+details[i].accountName+"</td>"+
                        "    <td>"+details[i].applyMoney+"</td>"+
                        "    <td>"+details[i].withdrawMoney+"</td>"+
                        "    <td>"+details[i].applyTime+"</td>"+
                        "    <td>"+details[i].withdrawTime+"</td>";
                    if (details[i].withdrawType == 'zhifubao'){
                        newTbody +=  "    <td>支付宝</td>";
                    }else if(details[i].withdrawType == 'weixin'){
                        newTbody +=  "    <td>微信</td>";
                    }else if(details[i].withdrawType == 'huafei'){
                        newTbody +=  "    <td>话费</td>";
                    }
                    if (details[i].withdrawStatus == '0'){
                        newTbody += "    <td>未处理</td>";
                    }else if(details[i].withdrawStatus == '1') {
                        newTbody += "    <td><span style='color: green'>已处理</span></td>";
                    }else if(details[i].withdrawStatus == '2') {
                        newTbody += "    <td><span style='color: red'>已作废</span></td>";
                    }

                    var remark = details[i].remarks;
                    if (remark == 'undefined' || remark == "null" || remark == null){
                        remark = ""
                    }
                    newTbody +=
                        "    <td>"+remark+"</td>"+
                        "</tr>";
                }
                body.append(newTbody);
                // 分页条
                $("#pagination").html(data.bean.page);
                tips.hideLoading();
            }else{
                tips.err("操作失败",2000);
            }
        },
        error: function () {

        }
    });
}


/**
 * 点击作废
 */
$(document).on("click","#invalid",function () {
    var $input = $("input[type=checkbox]:checked");
    if ($input == null ||$input.length == 0||$input.length>1 ) {
        tips.err("必须且只能选择一条纪录",2000);
        return;
    }
    var status = $input.parent().parent().attr("status");
    if (status == '2'){
        tips.err("此记录已经是作废记录",2000);
        return;
    }
    $("#remarksDiv").show();
    return;
});


/**
 * 点击确定作废按钮
 */
function sureInvalid() {
    var $input = $("input[type=checkbox]:checked");
    if ($input == null ||$input.length == 0||$input.length>1 ) {
        tips.err("必须且只能选择一条纪录",2000);
        return;
    }
    var detailId = $input.val();
    var remarks = $("#remarks").val().trim();
    if (remarks == null ||remarks.length == 0) {
        tips.err("请填写作废原因",2000);
        return;
    }
    
    tips.loading();
    $.ajax({
        url: "/c/page/console/auth/withdraw/invalid",
        type: "POST",
        dataType: "JSON",
        data: {
            detailId: detailId,
            remarks: remarks
        },
        success: function(data) {
            if (data.success){
                tips.suc("操作成功",2000);
                setTimeout(function () {
                    window.location.href = "/c/page/console/auth/withdraw/withdrawList";
                },2000);
            }else {
                tips.err(data.msg,2000);
            }
        },
        error: function () {

        }
    });
}


/**
 * 点击确认 提现
 */
$(document).on("click","#withdraw",function () {

    var $input = $("input[type=checkbox]:checked");
    if ($input == null ||$input.length == 0||$input.length>1 ) {
        tips.err("必须且只能选择一条纪录",2000);
        return;
    }
    var detailId = $input.val();

    tips.loading();

    $.ajax({
        url: "/c/page/console/auth/withdraw/withdraw",
        type: "POST",
        dataType: "JSON",
        data: {
            detailId: detailId
        },
        success: function(data) {
            if (data.success){
                tips.suc(data.msg,2000);
                setTimeout(function () {
                    window.location.href = "/c/page/console/auth/withdraw/withdrawList";
                },2000);
            }else {
                tips.err(data.msg,2000);
            }
        },
        error: function () {

        }
    });
});


/**
 * 现金记录
 */
function moneyRecords() {

    var $input = $("input[type=checkbox]:checked");
    if ($input == null ||$input.length == 0||$input.length>1 ) {
        tips.err("必须且只能选择一条纪录",2000);
        return;
    }
    var userId = $input.attr("userId");

    window.open('/c/page/console/auth/withdraw/moneyList?userId='+userId);

}