/**
 * 点击保存
 */
$(document).on("click","#save",function () {

    var missionId = $("#missionId").text().trim();
    var missionTitle = $("#missionTitle").val().trim();
    if (missionTitle == "" || missionTitle == null || missionTitle == undefined){
        tips.err("请输入任务标题",4000);
        return;
    }
    var missionIcon = $("#missionIcon").attr("value");
    if (missionIcon == "" || missionIcon == null || missionIcon == undefined){
        missionIcon = $("#oldMissionIcon").attr("src");
    }
    var missionLabel = $("#missionLabel").val();
    if (missionLabel == "" || missionLabel == null || missionLabel == undefined) {
        //1.先看用户是否点击了'不使用标签' 按钮
        var userLabel = $("#userLabel").val();
        if (userLabel == '0') {

            missionLabel == "";
        }else{
            /**
             * labels:旧标签
             */
            missionLabel = labels;
        }
    }
    if (missionLabel == null || missionLabel == undefined) {
        missionLabel = "";
    }
    missionLabel = missionLabel.toString();
    var missionType = 1;
    var minMoney = $("#minMoney").val().trim();
    if (minMoney == "" || minMoney == null || minMoney == undefined){
        minMoney = 1.00;
    }
    var maxMoney = $("#maxMoney").val().trim();
    if (maxMoney == "" || maxMoney == null || maxMoney == undefined){
        maxMoney = 1.00;
    }
    var startTime = $("#startTime").val().trim();
    var endTime = $("#endTime").val().trim();
    var totalNum = $("#totalNum").val().trim();
    if (totalNum == "" || totalNum == null || totalNum == undefined){
        totalNum = 200;
    }
    var leftNum = $("#leftNum").val().trim();
    if (leftNum == "" || leftNum == null || leftNum == undefined){
        leftNum = totalNum;
    }
    var missionOrder = $("#missionOrder").val();
    if (missionOrder == "" || missionOrder == null || missionOrder == undefined){
        missionOrder = 0;
    }
    var missionDesc = $("#missionDesc").val().trim();
    var missionStatus = $("#missionStatus").val();

    tips.loading();

    $.ajax({
        url: "/c/page/console/auth/exchange/save",
        type: "POST",
        dataType: "JSON",
        data:{
            missionId: missionId,
            missionTitle: missionTitle,
            missionType: missionType,
            missionIcon: missionIcon,
            missionLabel: missionLabel,
            minMoney: minMoney,
            maxMoney: maxMoney,
            startTime: startTime,
            endTime: endTime,
            totalNum: totalNum,
            leftNum: leftNum,
            missionDesc: missionDesc,
            missionStatus: missionStatus,
            missionOrder: missionOrder
        },
        success:function (data) {
            if (data.success){
                tips.suc(data.msg, 2000);
                window.location.href = ("/c/page/console/auth/exchange/exchangeList");
            }else {
                tips.err(data.msg, 2000);
            }
        },
        error:function () {

        }
    });
});