pg.editCallback = function (json) {
    if (json.success) {
        var bean = json.bean;
        var $modal = $("#modal-edit-sort");
        $modal.find('input[name="edit_id"]').val(bean.sortId);
        $modal.find('input[name="edit_title"]').val(bean.sortName);
        $modal.find('#edit_status').val(bean.sortStatus);
        $modal.find('input[name="edit_order"]').val(bean.sortOrder);
        var sortDesc = bean.sortDesc.split(",");
        for(var i = 0; i < sortDesc.length; i++) {
            $("input[name='edit_desc']:checkbox[value='"+sortDesc[i]+"']").attr('checked','true');
        }
        $modal.find('#old_img').attr("src", bean.sortImg);
        $modal.find('input[name="edit_img"]').val(bean.sortImg);

        $modal.find('input[name="edit_limit_version"]').val(bean.limitVersion);
        $modal.find('#edit_limit_channel_name').selectpicker('val', bean.limitChannelName.split(","));
        $modal.find('#edit_limit_package_name').selectpicker('val', bean.limitPackageName.split(","));

        $modal.find('input[name="edit_verify_version"]').val(bean.verifyVersion);
        $modal.find('#edit_verify_channel_package_name').selectpicker('val', bean.verifyChannelPackage.split(","));

        $modal.modal({backdrop: "static", keyboard: false});
    }
}

pg.deleteCallback = function (json) {
    if (json.success) {
        util.loading();
        if (json.msg) {
            tips.suc(json.msg);
        }
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
};

$(function () {

    $("#add_sort").on("click", function () {

        var sortName = $("#add_title").val().trim();
        var sortStatus = $("#add_status").val().trim();
        var sortOrder = $("#add_order").val().trim();
        var sortDesc = $("input:checkbox[name='add_desc']:checked").map(function(index,elem) {
            return $(elem).val();
        }).get().join(',');
        var sortImg = $("#add_img").val().trim();

        var limitVersion = $("#add_limit_version").val().trim();
        var limitChannelName = $("#add_limit_channel_name").val().toString();
        var limitPackageName = $("#add_limit_package_name").val().toString();
        var verifyVersion = $("#add_verify_version").val().trim();
        var verifyChannelPackage = $("#add_verify_channel_package_name").val().toString();

        tips.loading();
        $.ajax({
            url: "/c/page/console/auth/indexSort/saveSort",
            type: "POST",
            dataType: "JSON",
            data:{
                sortName: sortName,
                sortStatus: sortStatus,
                sortImg:sortImg,
                sortDesc: sortDesc,
                sortOrder: sortOrder,
                limitVersion: limitVersion,
                limitChannelName: limitChannelName,
                limitPackageName: limitPackageName,
                verifyVersion: verifyVersion,
                verifyChannelPackage: verifyChannelPackage
            },
            success:function (data) {
                if (data.success){
                    tips.suc('操作成功');
                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                }else {
                    tips.err(data.msg, 2000);
                }
            },
            error:function () {

            }
        });
    });

    $("#edit_sort").on("click", function () {
        var sortId = $("#edit_id").val().trim();
        var sortName = $("#edit_title").val().trim();
        var sortStatus = $("#edit_status").val().trim();
        var sortDesc = $("input:checkbox[name='edit_desc']:checked").map(function(index,elem) {
            return $(elem).val();
        }).get().join(',');
        var sortOrder = $("#edit_order").val().trim();
        var sortImg = $("#edit_img").val().trim();

        var limitVersion = $("#edit_limit_version").val().trim();
        var limitChannelName = $("#edit_limit_channel_name").val().toString();
        var limitPackageName = $("#edit_limit_package_name").val().toString();
        var verifyVersion = $("#edit_verify_version").val().trim();
        var verifyChannelPackage = $("#edit_verify_channel_package_name").val().toString();

        tips.loading();
        $.ajax({
            url: "/c/page/console/auth/indexSort/saveSort",
            type: "POST",
            dataType: "JSON",
            data:{
                sortId: sortId,
                sortImg:sortImg,
                sortName: sortName,
                sortStatus: sortStatus,
                sortDesc: sortDesc,
                sortOrder: sortOrder,
                limitVersion: limitVersion,
                limitChannelName: limitChannelName,
                limitPackageName: limitPackageName,
                verifyVersion: verifyVersion,
                verifyChannelPackage: verifyChannelPackage
            },
            success:function (data) {
                if (data.success){
                    tips.suc('操作成功');
                    setTimeout(function () {
                        location.reload();
                    }, 2000);
                }else {
                    tips.err(data.msg, 2000);
                }
            },
            error:function () {
            }
        });

    });

});