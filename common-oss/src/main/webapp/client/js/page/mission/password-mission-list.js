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

    $.ajax({
        url: "/c/page/console/auth/password/passwordData",
        type: "POST",
        dataType: "JSON",
        data: {
            pageNum: pageNum,
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
                        "    <td><input type='checkbox' value='"+vos[i].id+"'></td>"+
                        "    <td>"+vos[i].redPassword+"</td>"+
                        "    <td>"+vos[i].totalNum+"</td>"+
                        "    <td>"+vos[i].leftNum+"</td>"+
                        "    <td>"+vos[i].minMoney+"</td>"+
                        "    <td>"+vos[i].maxMoney+"</td>"+
                        "    <td>"+vos[i].endTime+"</td>"+
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
 * 修改
 */
function modify() {
    var $input = $("input[type=checkbox]:checked");
    if ($input.length == 0 || $input.length >1) {
        tips.err("选择一条纪录",2000);
        return;
    }
    var missionId = $input.val();
    $.ajax({
        url:'/c/page/console/auth/password/modify',
        type:'POST',
        dataType:'JSON',
        data:{missionId:missionId},
        success:function (data) {
            if (data.success){
                $("#id").val(data.bean.mission.id);
                $("#totalNum").val(data.bean.mission.totalNum);
                $("#password").val(data.bean.mission.redPassword);
                $("#leftNum").val(data.bean.mission.leftNum);
                $("#maxMoney").val(data.bean.mission.maxMoney);
                $("#minMoney").val(data.bean.mission.minMoney);
                $("#endTime").val(data.bean.mission.endTime);

                $("#modify").val(data.bean.modify);
                $('#myModal').modal('show')
            }
        }
    });
}


/**
 * 添加
 */
function add() {

    var password = $("#password").val().trim();
    if(password==""||password==null||password==undefined){
        tips.err('口令不能为空',2000);
        return;
    }
    var maxMoney = $("#maxMoney").val().trim();
    if (isNaN(parseInt(maxMoney))){
        tips.err('请输入最大金额',2000);
        return;
    }
    var minMoney = $("#minMoney").val().trim();
    if (isNaN(parseInt(minMoney))){
        tips.err('请输入最小金额',2000);
        return;
    }

    var totalNum = $("#totalNum").val().trim();
    if (isNaN(parseInt(totalNum))){
        tips.err('请输入红包总数',2000);
        return;
    }
    var leftNum = $("#leftNum").val().trim();
    if (isNaN(parseInt(leftNum))){
        tips.err('请输入红包剩余数',2000);
        return;
    }
    var endTime = $("#endTime").val().trim();
    if(endTime==""||endTime==null||endTime==undefined){
        tips.err('请输入结束时间',2000);
        return;
    }
    var id = $("#id").val().trim();
    var modify = $("#modify").val();

    if (modify == 1){
        $.ajax({
            url:'/c/page/console/auth/password/save',
            type:'POST',
            dataType:'JSON',
            data:{
                id:id,
                redPassword:password,
                leftNum:leftNum,
                totalNum:totalNum,
                minMoney:minMoney,
                maxMoney:maxMoney,
                endTime:endTime
            },
            success:function (data) {
                if (data.success){
                    tips.suc('操作成功',2000);
                    setTimeout(function () {
                        window.location.href='/c/page/console/auth/password/passwordPage';
                    },3000);
                }else {
                    tips.err('操作失败',3000);
                }
            }
        });

    }else {
        $.ajax({
            url:'/c/page/console/auth/password/save',
            type:'POST',
            dataType:'JSON',
            data:{
                redPassword:password,
                leftNum:leftNum,
                totalNum:totalNum,
                minMoney:minMoney,
                maxMoney:maxMoney,
                endTime:endTime
            },
            success:function (data) {
                if (data.success){
                    tips.suc('操作成功',2000);
                    setTimeout(function () {
                        window.location.href='/c/page/console/auth/password/passwordPage';
                    },3000);
                }else {
                    tips.err('操作失败',3000);
                }
            }
        });
    }


}





