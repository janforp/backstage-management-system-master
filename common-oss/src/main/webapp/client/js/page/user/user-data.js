/**
 * 生成某一天数据
 */
function statistics() {
    var searchDate = $("#startDate").val().trim();
    if (searchDate == ""||searchDate == null ||searchDate == undefined){
        tips.err("请输入查询日期",2000);
        return;
    }
    tips.loading();
    $.ajax({
        url: "/c/page/console/auth/user/statistics",
        type: "POST",
        dataType: "JSON",
        data:{
            date: searchDate
        },
        success:function (data) {
            if (data.success){
                tips.alert("执行成功");
            }else {
                tips.alert("执行失败");
            }
        },
        error:function () {
            tips.alert("执行失败");
        }
    });
}


/**
 * 查询时间段
 */
function selectDataByTime() {
    var startDate = $("#startDate").val().trim();
    var endDate = $("#endDate").val().trim();
    if (startDate == ""||startDate == null ||startDate == undefined){
        tips.err("请输入起始日期",2000);
        return;
    }
    if (endDate == ""||endDate == null ||endDate == undefined){
        tips.err("请输入结束日期",2000);
        return;
    }
    if(startDate > endDate){
        tips.err("请输入正确的日期范围",2000);
        return;
    }
    tips.loading();
    $.ajax({
        url: "/c/page/console/auth/user/dataByDateScope",
        type: "POST",
        dataType: "JSON",
        data: {
            startDate: startDate,
            endDate: endDate
        },
        success:function (data) {
            if (data.success){
                $("#dataDiv").empty();
                var date = data.bean.scope;
                var startTime = date.startTime;
                var endTime = date.endTime;
                var newData =
                    "<span class='tableTitle'>&nbsp;日期:&nbsp;"+startTime+"&nbsp;到&nbsp;"+endTime+"</span>&nbsp;&nbsp;" +
                    "<button class='btn btn-default btn-sm navbar-btn' onclick=\"selectChannelDataByDateScope(\'"+startTime+"\',\'"+endTime+"\')\"><i class=\"glyphicon glyphicon-search\"></i>渠道详情</button>" +
                    "   <table class='table table-striped table-hover table-bordered table-navbar-no-bottom'>" +
                    "       <tr align='center'>" +
                    "           <td colspan='2'>用户</td>" +
                    "           <td colspan='4'>金额</td>" +
                    "           <td colspan='4'>金币</td>" +
                    "       </tr>" +
                    "       <tr align='center'>" +
                    "           <td>新增(人)</td>" +
                    "           <td>累计(人)</td>" +
                    "           <td>新增用户发放金额(元)</td>" +
                    "           <td>总发放金额(元)</td>" +
                    "           <td>新增用户消耗金额(元)</td>" +
                    "           <td>总消耗金额(元)</td>" +
                    "           <td>新增用户发放金币(个)</td>" +
                    "           <td>总发放金币(个)</td>" +
                    "           <td>新增用户消耗金币(个)</td>" +
                    "           <td>总消耗金币(个)</td>" +
                    "       </tr>"+
                    "       <tr align='center'>" +
                    "           <td>"+date.todayUser+"</td>" +
                    "           <td>"+date.totalUser+"</td>" +
                    "           <td>"+date.todayUserGiveMoney+"</td>" +
                    "           <td>"+date.todayTotalGiveMoney+"</td>" +
                    "           <td>"+date.todayUserExpendMoney+"</td>" +
                    "           <td>"+date.todayTotalExpendMoney+"</td>" +
                    "           <td>"+date.todayUserGiveCoin+"</td>" +
                    "           <td>"+date.todayTotalGiveCoin+"</td>" +
                    "           <td>"+date.todayUserExpendCoin+"</td>" +
                    "           <td>"+date.todayTotalExpendCoin+"</td>" +
                    "       </tr>" +
                    "   </table>";
                $("#dataDiv").append(newData);
                tips.hideLoading();
            }
        },
        error:function () {

        }
    });
}

/**
 * 渠道详情
 * @param startTime
 * @param endTime
 */
function selectChannelDataByDateScope(startDate, endDate) {
    tips.loading();
    $.ajax({
        url: "/c/page/console/auth/user/channelDataByDateScope",
        type: "POST",
        dataType: "JSON",
        data: {
            startDate: startDate,
            endDate: endDate
        },
        success:function (data) {
            if(data.success){
                var details = data.bean.vos;
                var date = data.bean.scope;
                if (details.length == 0) {
                    tips.err("无渠道数据",4000);
                    return;
                }else {
                    var dataDiv = $("#dataDiv");
                    dataDiv.empty();
                    var newData =
                        "<span class='tableTitle'>&nbsp;日期:&nbsp;"+startDate+"&nbsp;到&nbsp;"+endDate+"</span>&nbsp;&nbsp;" +
                        "   <table class='table table-striped table-hover table-bordered table-navbar-no-bottom'>" +
                        "       <tr align='center'>" +
                        "           <td colspan='2'>用户</td>" +
                        "           <td colspan='4'>金额</td>" +
                        "           <td colspan='4'>金币</td>" +
                        "       </tr>" +
                        "       <tr align='center'>" +
                        "           <td>新增(人)</td>" +
                        "           <td>累计(人)</td>" +
                        "           <td>新增用户发放金额(元)</td>" +
                        "           <td>总发放金额(元)</td>" +
                        "           <td>新增用户消耗金额(元)</td>" +
                        "           <td>总消耗金额(元)</td>" +
                        "           <td>新增用户发放金币(个)</td>" +
                        "           <td>总发放金币(个)</td>" +
                        "           <td>新增用户消耗金币(个)</td>" +
                        "           <td>总消耗金币(个)</td>" +
                        "       </tr>"+
                        "       <tr align='center'>" +
                        "           <td>"+date.todayUser+"</td>" +
                        "           <td>"+date.totalUser+"</td>" +
                        "           <td>"+date.todayUserGiveMoney+"</td>" +
                        "           <td>"+date.todayTotalGiveMoney+"</td>" +
                        "           <td>"+date.todayUserExpendMoney+"</td>" +
                        "           <td>"+date.todayTotalExpendMoney+"</td>" +
                        "           <td>"+date.todayUserGiveCoin+"</td>" +
                        "           <td>"+date.todayTotalGiveCoin+"</td>" +
                        "           <td>"+date.todayUserExpendCoin+"</td>" +
                        "           <td>"+date.todayTotalExpendCoin+"</td>" +
                        "       </tr>" +
                        "   </table>";
                    $("#dataDiv").append(newData);


                    $("#dataDiv").append("<span class='tableTitle'>&nbsp;渠道详情:</span>");

                    var detailTable =
                        "<table class='table table-striped table-hover table-bordered table-navbar-no-bottom'>"+
                        "   <thead>"+
                        "       <tr>"+
                        "           <th>包名</th>"+
                        "           <th>渠道</th>"+
                        "           <th>新增(人)</th>"+
                        "           <th>累计(人)</th>"+
                        "           <th>新增用户发放金额(元)</th>"+
                        "           <th>总发放金额(元)</th>"+
                        "           <th>新增用户消耗金额(元)</th>"+
                        "           <th>总消耗金额(元)</th>"+
                        "           <th>新增用户发放金币(个)</th>"+
                        "           <th>总发放金币(个)</th>"+
                        "           <th>新增用户消耗金币(个)</th>"+
                        "           <th>总消耗金币(个)</th>"+
                        "       </tr>"+
                        "   </thead>"+
                        "   <tbody>";
                    for (var i=0;i<details.length ;i++) {
                        detailTable +=
                            "<tr>"+
                            "   <td>"+details[i].packageName+"</td>"+
                            "   <td>"+details[i].channelName+"</td>"+
                            "   <td>"+details[i].todayUser+"</td>"+
                            "   <td>"+details[i].totalUser+"</td>"+
                            "   <td>"+details[i].todayUserGiveMoney+"</td>"+
                            "   <td>"+details[i].todayTotalGiveMoney+"</td>"+
                            "   <td>"+details[i].todayUserExpendMoney+"</td>"+
                            "   <td>"+details[i].todayTotalExpendMoney+"</td>"+
                            "   <td>"+details[i].todayUserGiveCoin+"</td>"+
                            "   <td>"+details[i].todayTotalGiveCoin+"</td>"+
                            "   <td>"+details[i].todayUserExpendCoin+"</td>"+
                            "   <td>"+details[i].todayTotalExpendCoin+"</td>"+
                            "</tr>";
                    }
                    detailTable += "</tbody></table>";
                    $("#dataDiv").append(detailTable);
                    tips.hideLoading();
                }
            }
        },
        error:function () {
            
        }
    });
}