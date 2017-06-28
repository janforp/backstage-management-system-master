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
        url: "/c/page/console/auth/appShare/appShareData",
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
                        "    <td><input type='checkbox' value='"+vos[i].missionId+"'></td>"+
                        "    <td>"+vos[i].missionTitle+"</td>"+
                        "    <td>"+vos[i].money+"</td>"+
                        "    <td><img src='"+vos[i].missionIcon+"'></td>"+
                        "    <td>"+vos[i].callbackUrl+"</td>"+
                        "    <td>"+vos[i].totalClickTimes+"</td>"+
                        "    <td>"+vos[i].leftClickTimes+"</td>"+
                        "    <td>"+vos[i].startTime+"</td>"+
                        "    <td>"+vos[i].createTime+"</td>"+
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
    if ($input.length == 0) {
        tips.err("至少选择一条纪录",2000);
        return;
    }
    var missionId = $input.val();
    $.ajax({
        url:'/c/page/console/auth/appShare/modify',
        type:'POST',
        dataType:'JSON',
        data:{missionId:missionId},
        success:function (data) {
            if (data.success){
                $("#missionId").val(data.bean.mission.missionId);
                $("#title").val(data.bean.mission.missionTitle);
                $("#money").val(data.bean.mission.money);
                $("#callbackUrl").val(data.bean.mission.callbackUrl);
                $("#totalTimes").val(data.bean.mission.totalClickTimes);
                $("#leftTimes").val(data.bean.mission.leftClickTimes);
                $("#desc").val(data.bean.mission.missionDesc);
                $("#text").val(data.bean.mission.missionText);
                $("#startTime").val(data.bean.mission.startTime);
                var isEnd = data.bean.mission.isEnd;
                $("input[name='isEnd'][value='"+isEnd+"']").attr("checked",true);

                $("#missionIcon").attr('src',data.bean.mission.missionImg);
                $("#exampleIcon").attr('src',data.bean.mission.exampleImg);

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

    var title = $("#title").val().trim();
    if(title==""||title==null||title==undefined){
        tips.err('标题不能为空',2000);
        return;
    }
    var money = $("#money").val().trim();
    if (isNaN(parseInt(money))){
        tips.err('请输入点击奖励',2000);
        return;
    }
    var callbackUrl = $("#callbackUrl").val().trim();
    var totalTimes = $("#totalTimes").val().trim();
    if (isNaN(parseInt(totalTimes))){
        tips.err('请输入总次数',2000);
        return;
    }
    if(totalTimes==""||totalTimes==null||totalTimes==undefined){
        totalTimes = 1000;
    }
    var leftTimes = $("#leftTimes").val().trim();
    if(leftTimes==""||leftTimes==null||leftTimes==undefined){
        leftTimes = totalTimes;
    }
    var desc = $("#desc").val().trim();
    var text = $("#text").val().trim();
    var isEnd=$("input[name=isEnd]").val();
    var missionIcon = $("#missionIcon").attr('src');
    var exampleIcon = $("#exampleIcon").attr('src');
    var missionId = $("#missionId").val();
    var startTime = $("#startTime").val().trim();

    var modify = $("#modify").val();

    if (modify == 1){
        $.ajax({
            url:'/c/page/console/auth/appShare/save',
            type:'POST',
            dataType:'JSON',
            data:{
                missionId:missionId,
                money:money,
                missionTitle:title,
                missionIcon:missionIcon,
                callbackUrl:callbackUrl,
                missionDesc:desc,
                missionText:text,
                missionImg:missionIcon,
                exampleImg:exampleIcon,
                totalClickTimes:totalTimes,
                leftClickTimes:leftTimes,
                startTime:startTime,
                isEnd:isEnd
            },
            success:function (data) {
                if (data.success){
                    tips.suc('操作成功',3000);
                    setTimeout(function () {
                        window.location.href='/c/page/console/auth/appShare/appSharePage';
                    },3000);
                }else {
                    tips.err('操作失败',3000);
                }
            }
        });

    }else {
        $.ajax({
            url:'/c/page/console/auth/appShare/save',
            type:'POST',
            dataType:'JSON',
            data:{
                money:money,
                missionTitle:title,
                missionIcon:missionIcon,
                callbackUrl:callbackUrl,
                missionDesc:desc,
                missionText:text,
                missionImg:missionIcon,
                exampleImg:exampleIcon,
                totalClickTimes:totalTimes,
                leftClickTimes:leftTimes,
                startTime:startTime,
                isEnd:isEnd
            },
            success:function (data) {
                if (data.success){
                    tips.suc('操作成功',3000);
                    setTimeout(function () {
                        window.location.href='/c/page/console/auth/appShare/appSharePage';
                    },3000);
                }else {
                    tips.err('操作失败',3000);
                }
            }
        });
    }


}





