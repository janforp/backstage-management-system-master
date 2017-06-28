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

    var userId = $("#userId").val();

    tips.loading();

    $.ajax({
        url: "/c/page/console/auth/withdraw/moneyData",
        type: "POST",
        dataType: "JSON",
        data: {
            pageNum: pageNum,
            userId: userId
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
                        "   <td>"+vos[i].userId+"</td>";

                    if(vos[i].detailType == 1){
                        newTbody +=
                            "<td style='color: red'>"+vos[i].accountMoney+"</td>"+
                            "<td style='color: red'>收入</td>";
                    }else {
                        newTbody +=
                            "<td style='color: green'>"+vos[i].accountMoney+"</td>"+
                            "<td style='color: green'>支出</td>";
                    }
                    newTbody +=
                        "   <td>"+vos[i].detailContent+"</td>"+
                        "   <td>"+vos[i].detailTime+"</td>"+
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



