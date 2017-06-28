pg.editCallback = function (json) {
    if (json.success) {
        var bean = json.bean;
        var $modal = $("#modal-edit-banner");
        $modal.find('input[name="edit_id"]').val(bean.wallId);
        $modal.find('input[name="edit_title"]').val(bean.wallTitle);
        $modal.find('#edit_status').val(bean.wallStatus);
        $modal.find('input[name="edit_url"]').val(bean.wallUrl);
        $modal.find('input[name="edit_order"]').val(bean.wallOrder);
        $modal.find('#old_img').attr("src", bean.wallImg);
        $modal.find('input[name="edit_img"]').val(bean.wallImg);
        $modal.find('input[name="edit_desc"]').val(bean.wallDesc);

        $modal.find('input[name="edit_limit_version"]').val(bean.limitVersion);
        $modal.find('input[name="edit_max_version"]').val(bean.maxVersion);
        $modal.find('#edit_limit_channel_name').selectpicker('val', bean.limitChannelName.split(","));
        $modal.find('#edit_limit_package_name').selectpicker('val', bean.limitPackageName.split(","));


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

    $("#add_banner").on("click", function () {
        var title = $("#add_title").val().trim();
        var status = $("#add_status").val().trim();
        var img = $("#add_img").val().trim();
        var url = $("#add_url").val().trim();
        var order = $("#add_order").val().trim();
        var desc = $("#add_desc").val().trim();

        var limitVersion = $("#add_limit_version").val().trim();
        var maxVersion = $("#add_max_version").val().trim();
        var limitChannelName = $("#add_limit_channel_name").val().toString();
        var limitPackageName = $("#add_limit_package_name").val().toString();


        tips.loading();
        $.ajax({
            url: "/c/page/console/auth/integral/saveWall",
            type: "POST",
            dataType: "JSON",
            data:{

                wallTitle: title,
                wallDesc: desc,
                wallImg: img,
                wallStatus: status,
                wallUrl: url,
                wallOrder:order,

                limitVersion: limitVersion,
                maxVersion:maxVersion,
                limitChannelName: limitChannelName,
                limitPackageName: limitPackageName,

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

    $("#edit_banner").on("click", function () {
        var id = $("#edit_id").val().trim();
        var title = $("#edit_title").val().trim();
        var status = $("#edit_status").val().trim();
        var img = $("#edit_img").val().trim();
        var url = $("#edit_url").val().trim();
        var order = $("#edit_order").val().trim();
        var desc = $("#edit_desc").val().trim();


        var limitVersion = $("#edit_limit_version").val().trim();
        var maxVersion = $("#edit_max_version").val().trim();
        var limitChannelName = $("#edit_limit_channel_name").val().toString();
        var limitPackageName = $("#edit_limit_package_name").val().toString();


        tips.loading();
        $.ajax({
            url: "/c/page/console/auth/integral/saveWall",
            type: "POST",
            dataType: "JSON",
            data:{
                wallId:id,
                wallTitle: title,
                wallDesc: desc,
                wallImg: img,
                wallStatus: status,
                wallUrl: url,
                wallOrder:order,

                limitVersion: limitVersion,
                maxVersion:maxVersion,
                limitChannelName: limitChannelName,
                limitPackageName: limitPackageName,

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