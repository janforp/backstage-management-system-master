/**
 * Created by Jan on 2016/12/5.
 * 自己的积分墙管理
 */


/**
 *
 * 积分墙图片，最多两张
 */
$(function () {
    if(appImg.length != 0){
        var imgs = appImg.split(";");
        if(imgs.length>=1){
            $("#appImg1").attr('src',imgs[0]);
            if(imgs.length>=2){
                $("#appImg2").attr('src',imgs[1]);
            }
        }
    }
});

/**
 * 初始化标签
 */
$(function () {

    var labelCheckbox = $("input[name=label]");

    if(labels.length != 0){

        var ls = labels.split(",");
        for(var i=0;i<ls.length;i++){

            var labelValue = ls[i];
            for(var j=0;j<labelCheckbox.length;j++){
                var checkBoxValue = $(labelCheckbox[j]).val();
                if (labelValue == checkBoxValue){
                    $(labelCheckbox[j]).prop('checked' ,true)
                }
            }
        }
    }
});





/**
 * 选择市场时,显示对应的网址
 */
function showUrl() {

    var $option = $("#market option:selected");
    var marketName = $option.text();
    $("#marketName").val('去'+marketName);
};
//显示市场
function gotoMarket() {
    var $option = $("#market option:selected");
    var marketName = $option.text();

    if (marketName.indexOf('应用宝')>=0) {
        window.open('http://android.myapp.com/');
    }else if(marketName.indexOf('小米')>=0) {
        window.open('http://app.xiaomi.com/');
    }else if(marketName.indexOf('360')>=0) {
        window.open('http://app.so.com/');
    }else if(marketName.indexOf('OPPO')>=0) {
        window.open('http://store.oppomobile.com/');
    }else if(marketName.indexOf('魅族')>=0) {
        window.open('http://app.meizu.com/');
    }else if(marketName.indexOf('豌豆荚')>=0) {
        window.open('http://www.wandoujia.com/apps');
    }else if(marketName.indexOf('安卓市场')>=0) {
        window.open('http://apk.hiapk.com/');
    }else if(marketName.indexOf('华为')>=0) {
        window.open('http://app.hicloud.com/');
    }else if (marketName.indexOf('百度手机助手') >= 0){
        window.open('http://shouji.baidu.com/');
    }else if(marketName.indexOf('应用汇')>=0){
        window.open('http://www.appchina.com/');
    }else if(marketName.indexOf('PP')>=0){
        window.open('http://www.25pp.com/android/');
    }else if(marketName.indexOf('搜狗')>=0){
        window.open('http://zhushou.sogou.com/apps/');
    }else if(marketName.indexOf('安智')>=0){
        window.open('http://www.anzhi.com/');
    }
}
//url输入框值变化的时候自动清空其他输入框的值
$("#appUrl").change(function () {
    var url = $("#appUrl").val();
    var $input = $("input[type=text]");
    $input.val("");
    $("#appUrl").val(url);
    $("#appIcon").attr("src","");
});
/**
 * 点击'抓内容'按钮
 */
function getDataFromUrl() {

    tips.loading();

    var appUrl = $("#appUrl").val().trim();
    if(appUrl.length==0 || appUrl == ''){
        $("#urlTips").text('请输入正确的链接');
        tips.hide;
        setTimeout(function () {$("#urlTips").text('');},2000);
        return;
    }
    var marketId = $("#market").val();
    if(marketId == ""){
        tips.err("请选择市场",2000);
        return;
    }
    $.ajax({
        url:'/c/page/console/auth/demo/pareUrl',
        type:'post',
        dataType:'json',
        data:{url:appUrl,marketId:marketId},
        success:function (data) {
            tips.hide;
            if (data.success){
                var mission = data.bean.mission;
                $("#appName").val(mission.appName);
                $("#appPackage").val(mission.appPackage);
                $("#size").val(mission.size);
                $("#appIcon").attr('src',mission.appIcon);

                tips.suc("采集成功",2000);
                $("#parse").val("采集");
            }else {
                tips.err("采集失败",2000);
            }
        }
    });
};

/**
 * 查看app详情页
 */
function toDetailPage() {
    var appUrl = $("#appUrl").val().trim();
    if(appUrl.length==0 || appUrl == ''){
        $("#urlTips").text('请输入正确的链接');
        setTimeout(function () {$("#urlTips").text('');},3000);
        return;
    }
    window.open(appUrl);
}


/**
 * 保存关键词任务
 */
function save() {
    var wallId,appName,appIcon,appPackage,appDesc,appSize,appLabel,
        appIntroduce,appImg,startTime,endTime,isLimitNum,totalNum,leftNum,
        totalMoney,stepOneMoney,stepOneDesc,stepTwoMoney,stepTwoDay,
        wallWeight,isEnd,stepOneSecond,stepTwoSecond;

    wallId = $("#wallId").val();
    appName = $("#appName").val().trim();
    if(appName == "" || appName.length == 0){
        tips.err("请输入APP名字",2000);
        return;
    }
    appPackage = $("#appPackage").val().trim();
    if (appPackage == "" || appPackage.length == 0){
        tips.err("请输入包名",2000);
        return;
    }
    appSize = $("#appSize").val().trim();
    appDesc = $("#appDesc").val().trim();
    appIntroduce = $("#appIntroduce").val();
    //包地址
    appIcon = $("#appIcon").attr('src');

    var appImg1 = $("#appImg1").attr('src');
    var appImg2 = $("#appImg2").attr('src');


    if (( appImg1 == undefined || appImg1.length == 0 ||appImg1 == "" ) ){
        appImg = appImg2;
    }
    if( appImg2 == undefined|| appImg2.length == 0 || appImg2 == "" ){
        appImg = appImg1;
    }
    if (( appImg1 == undefined || appImg1.length == 0||appImg1 == "" ) && (appImg2 == undefined|| appImg2.length == 0|| appImg2 == "" )){
        appImg = "";
    }
    if(appImg1 != undefined && appImg2 != undefined){
        if(appImg1.length>0 && appImg2.length>0){
            appImg = appImg1+";"+appImg2;
        }
    }


    isLimitNum = $("#isLimitNum").val();
    if(add == 1 && isLimitNum == 1){
        totalNum = $("#totalNum").val().trim();
        if (isNaN(totalNum)){
            tips.err("请输入总数量",2000);
            return;
        }
        if (totalNum != parseInt(totalNum)){
            tips.err("请输入总数量",2000);
            return;
        }
        leftNum = $("#leftNum").val().trim();
        if(isNaN(leftNum)){
            tips.err("请输入剩余数量",2000);
            return;
        }
        if (leftNum != parseInt(leftNum)){
            tips.err("请输入剩余数量",2000);
            return;
        }
    }else{
        totalNum = 0;
        leftNum = 0;
    }
    totalMoney = $("#totalMoney").val().trim();
    if (isNaN(totalMoney)){
        $("#moneyTips").text('请输入正确的金额');
        setTimeout(function () {$("#moneyTips").text('');},2000);
        return;
    }
    stepOneMoney = $("#stepOneMoney").val().trim();
    if (isNaN(stepOneMoney)){
        tips.err("请输入第一步奖励",2000);
        return;
    }
    stepOneSecond = $("#stepOneSecond").val().trim();
    stepOneDesc = $("#stepOneDesc").val();
    stepTwoMoney = $("#stepTwoMoney").val().trim();
    if (isNaN(stepTwoMoney)){
        tips.err("请输入深度任务奖励",2000);
        return;
    }
    stepTwoSecond = $("#stepTwoSecond").val().trim();
    stepTwoDay = $("#stepTwoDay").val().trim();
    startTime = $("#startTime").val().trim();
    if (startTime == "" || startTime.length == 0){
        tips.err("请输入开始时间",2000);
        return;
    }
    endTime = $("#endTime").val().trim();
    if (endTime == "" || endTime.length == 0){
        tips.err("请输入结束时间",2000);
        return;
    }
    //要支持多标签
    appLabel = "";
    var checkedLabelCheckBox = $("input[name=label]:checked");
    for(var i=0 ;i<checkedLabelCheckBox.length;i++){

        var labelValue = $(checkedLabelCheckBox[i]).val();
        if (appLabel == ""){
            appLabel = appLabel+labelValue;
        }else{
            appLabel = appLabel+","+labelValue;
        }
    }

    wallWeight = $("#wallWeight").val().trim();
    isEnd = $("#isEnd").val();


    if(add == '1'){//添加新关键词任务
        wallId = 0;
    }else{//修改关键词任务
        wallId = $("#wallId").val();
    }

    $.ajax({
        url:'/c/page/console/auth/selfIntegral/save',
        type:'post',
        dataType:'json',
        data:{
            wallId:wallId,
            appName:appName,
            appIcon:appIcon,
            appPackage:appPackage,
            appDesc:appDesc,
            appSize:appSize,
            stepOneSecond:stepOneSecond,
            stepTwoSecond:stepTwoSecond,
            appLabel:appLabel,
            appIntroduce:appIntroduce,
            appImg:appImg,
            startTime:startTime,
            endTime:endTime,
            isLimitNum:isLimitNum,
            totalNum:totalNum,
            leftNum:leftNum,
            totalMoney:totalMoney,
            stepOneMoney:stepOneMoney,
            stepOneDesc:stepOneDesc,
            stepTwoMoney:stepTwoMoney,
            stepTwoDay:stepTwoDay,
            wallWeight:wallWeight,
            isEnd:isEnd
        },
        success:function (data) {

            if (data.success){

                tips.suc("保存成功",2000);
                setTimeout(function () {
                    window.location.href='/c/page/console/auth/selfIntegral/selfIntegralPage';
                },2000);
            }else {
                tips.err("保存失败",2000);
            }
        }
    });
}
/**
 * 点击上传图片按钮
 */
function imgClick() {
    $("#appIcon").click();
}

function switchTotalLeftNum() {

    var isLimitNum = $("#isLimitNum").val();
    if (isLimitNum == 0){

        $("#totalNumDiv").addClass("hide");
        $("#leftNumDiv").addClass("hide");

    }else {
        $("#totalNumDiv").removeClass("hide");
        $("#leftNumDiv").removeClass("hide");
    }
}