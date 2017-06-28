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
    var appName = $("#appName").val().trim();
    var marketId = $("#market").val();
    var keyword = $("#keyword").val().trim();
    var status = $("#status").val();
    var releaseTime = $("#releaseTime").val();
    tips.loading();
    $.ajax({
        url: "/c/page/console/auth/demo/demoData",
        type: "POST",
        dataType: "JSON",
        data: {
            pageNum: pageNum,
            appName:appName,
            marketId:marketId,
            keyword:keyword,
            status:status,
            releaseTime:releaseTime
        },
        success: function(data){

            if (data.success) {
                var vos = data.bean.details;
                var body = $("#moneyBody");
                body.empty();
                var newTbody = "";
                for (var i=0;i<vos.length;i++) {

                    var totalNum = parseInt(vos[i].totalNum);
                    var leftNum = parseInt(vos[i].leftNum);
                    var completeNum = totalNum - leftNum;

                    newTbody +=
                        "<tr>"+
                        "    <td><input type='checkbox' value='"+vos[i].keywordId+"'></td>"+
                        "    <td class='app'><img src='"+vos[i].appIcon+"'>&nbsp;&nbsp;"+vos[i].appName+"</td>"+
                        "    <td><img class='market' src='"+vos[i].marketTitleIcon+"'></td>"+
                        "    <td>"+vos[i].keyword+"</td>"+
                        "    <td>"+vos[i].money+"</td>"+
                        "    <td>"+vos[i].totalNum+"</td>"+
                        "    <td>"+completeNum+"</td>"+
                        "    <td>"+vos[i].releaseTime+"</td>"+
                        "    <td>"+vos[i].endTime+"</td>";
                    var status = vos[i].status;
                    if (status == '未开始'){
                        newTbody += "    <td class='wait'>"+vos[i].status+"</td></tr>";
                    }else if(status == '进行中'){
                        newTbody += "    <td class='ing'>"+vos[i].status+"</td></tr>";
                    }else if(status == '已结束'){
                        newTbody += "    <td class='end'>"+vos[i].status+"</td></tr>";
                    }
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
 * 点击修改,弹出修改框
 */
function editWord() {

    var $input = $("input[type=checkbox]:checked");
    if ($input == null ||$input.length == 0||$input.length>1 ) {
        tips.err("必须且只能选择一条纪录",2000);
        return;
    }
    var id = $input.val();
    window.location.href = '/c/page/console/auth/demo/modifyData?keywordId='+id;
}

/**
 * 点击克隆
 */
function copyWord() {

    var $input = $("input[type=checkbox]:checked");
    if ($input == null ||$input.length == 0||$input.length>1 ) {
        tips.err("必须且只能选择一条纪录",2000);
        return;
    }
    var id = $input.val();
    window.location.href = '/c/page/console/auth/demo/clone?keywordId='+id;
}

/**
 * 删除任务
 */
function deleteWord() {
    tips.err('此功能未开放',2000)
}

