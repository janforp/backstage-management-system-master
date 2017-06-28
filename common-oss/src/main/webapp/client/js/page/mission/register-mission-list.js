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


    tips.loading();

    var title = $("#missionTitle").val().trim();

    $.ajax({
        url: "/c/page/console/auth/registerMission/registerData",
        type: "POST",
        dataType: "JSON",
        data: {
            pageNum: pageNum,
            title:title
        },
        success: function(data){

            if (data.success) {
                var vos = data.bean.details;
                var body = $("#moneyBody");
                body.empty();
                var newTbody = "";
                for (var i = 0; i < vos.length; i++) {
                    newTbody +=
                        "<tr>"+
                        "    <td><input type='checkbox' value='"+vos[i].missionId+"'></td>"+
                        "    <td>"+vos[i].missionTitle+"</td>"+
                        "    <td><img src='"+vos[i].missionIcon+"'></td>"+
                        "    <td>"+vos[i].missionLabel+"</td>"+
                        "    <td>"+vos[i].minMoney+"</td>"+
                        "    <td>"+vos[i].maxMoney+"</td>"+
                        "    <td>"+vos[i].startTime+"</td>"+
                        "    <td>"+vos[i].endTime+"</td>"+
                        "    <td>"+vos[i].totalNum+"</td>"+
                        "    <td>"+vos[i].leftNum+"</td>"+
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
};


/**
 * 删除
 */
function deleteMission() {

    // tips.err("暂时不开放此功能",2000);
    // return;

    var $input = $("input[type=checkbox]:checked");
    if ($input == null ||$input.length == 0 ) {
        tips.err("至少选择一条",2000);
        return;
    }
    var missionIds = $input.map(function (index,elem) {
        return $(elem).val();
    }).get().join('&');

    $.ajax({
        url     :   "/c/page/console/auth/recommend/deleteMission",
        type    :   "POST",
        dataType:   "JSON",
        data    :   {missionIds:missionIds},

        success :   function(data){

            if (data.success) {
                $input.parent().parent().remove();
                tips.suc(data.msg,2000);
            }else{
                tips.err(data.msg,2000);
            }
        },
        error   :   function () {

        }
    });
}
/**
 * 跳转到修改页面
 */
function updateMission() {

    var $input = $("input[type=checkbox]:checked");
    if ($input == null ||$input.length == 0||$input.length>1 ) {
        tips.err("必须且只能选择一条纪录",2000);
        return;
    }
    var missionId = $input.val();
    window.location.href = ("/c/page/console/auth/registerMission/updateMissionPage?missionId="+missionId);
}
/**
 * 添加
 */
function addMission() {

    window.location.href = ("/c/page/console/auth/registerMission/addMissionPage");
}

/**
 * 详情
 */
function showDetail() {

    var $input = $("input[type=checkbox]:checked");
    if ($input == null ||$input.length == 0||$input.length>1 ) {
        tips.err("必须且只能选择一条纪录",2000);
        return;
    }
    var missionId = $input.val();
    window.location.href = ("/c/page/console/auth/registerMission/missionDetailPage?missionId="+missionId);
}

/**
 * 添加红包:弹框
 */
function addRecommendMissionRed() {

    var $input = $("input[type=checkbox]:checked");
    if ($input == null ||$input.length == 0||$input.length>1 ) {
        tips.err("必须且只能选择一条纪录",2000);
        return;
    }
    $("#alertFrame").removeClass("hide");
    //其他的复选框均不能选择
    $("input[type=checkbox]").prop("disabled",true);
}


/**
 * 点击弹框上的添加红包按钮
 */
function doAddRed() {

    var $input = $("input[type=checkbox]:checked");
    if ($input == null ||$input.length == 0||$input.length>1 ) {
        tips.err("必须且只能选择一条纪录",2000);
        return;
    }
    var missionId = $input.val();

    var totalRedNum = $("#totalRedNum").val().trim();
    if (totalRedNum == "" || totalRedNum == null || totalRedNum == undefined){
        tips.err("请输入红包总数",4000);
        return;
    }

    $.ajax({
        url     :   "/c/page/console/auth/registerMission/addRed",
        type    :   "POST",
        dataType:   "JSON",
        data    :   {missionId:missionId,num:totalRedNum},
        success:function (data) {
            if(data.success){
                tips.suc(data.msg,3000);

                $("#close").click();

                setTimeout(
                    function () {

                        window.location.reload();

                    },2000
                );

            }else{
                tips.err("添加红包失败",3000);
            }
        },
        error:function () {

        }
    });
}

/**
 * 关闭添加红包弹出框
 */
$(document).on("click","#close",function () {
    $("#alertFrame").addClass("hide");
    //恢复复选框选择功能
    $("input[type=checkbox]").prop("disabled",false);
});


/**
 * 添加步骤
 */
function addStep() {

    var $input = $("input[type=checkbox]:checked");
    if ($input == null ||$input.length == 0||$input.length>1 ) {
        tips.err("必须且只能选择一条纪录",2000);
        return;
    }
    var missionId = $input.val();

    window.location.href = "/c/page/console/auth/registerMission/addStepPage?missionId="+missionId;
}