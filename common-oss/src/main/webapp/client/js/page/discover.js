pg.editCallback = function (json) {
    if (json.success) {
        var bean = json.bean;
        var $modal = $("#modal-edit-discover");
        $modal.find('input[name="edit_id"]').val(bean.discoverId);
        $modal.find('input[name="edit_title"]').val(bean.discoverTitle);
        $modal.find('#edit_status').val(bean.discoverStatus);
        $modal.find('input[name="edit_url"]').val(bean.discoverUrl);
        $modal.find('input[name="edit_order"]').val(bean.discoverOrder);
        $modal.find('#old_img').attr("src", bean.discoverImg);
        $modal.find('input[name="edit_img"]').val(bean.discoverImg);
        $modal.find('input[name="edit_desc"]').val(bean.discoverDescription);

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

    $("#add_discover").on("click", function () {
        var discoverTitle = $("#add_title").val().trim();
        var discoverStatus = $("#add_status").val().trim();
        var discoverImg = $("#add_img").val().trim();
        var discoverUrl = $("#add_url").val().trim();
        var discoverOrder = $("#add_order").val().trim();
        var discoverDescription = $("#add_desc").val().trim();

        var limitVersion = $("#add_limit_version").val().trim();
        var maxVersion = $("#add_max_version").val().trim();
        var limitChannelName = $("#add_limit_channel_name").val().toString();
        var limitPackageName = $("#add_limit_package_name").val().toString();



        tips.loading();
        $.ajax({
            url: "/c/page/console/auth/discover/saveDiscover",
            type: "POST",
            dataType: "JSON",
            data:{
                discoverTitle: discoverTitle,
                discoverStatus: discoverStatus,
                discoverImg: discoverImg,
                discoverUrl: discoverUrl,
                discoverOrder: discoverOrder,
                discoverDescription: discoverDescription,

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

    $("#edit_discover").on("click", function () {
        var discoverId = $("#edit_id").val().trim();
        var discoverTitle = $("#edit_title").val().trim();
        var discoverStatus = $("#edit_status").val().trim();
        var discoverImg = $("#edit_img").val().trim();
        var discoverUrl = $("#edit_url").val().trim();
        var discoverOrder = $("#edit_order").val().trim();
        var discoverDescription = $("#edit_desc").val().trim();
        var limitVersion = $("#edit_limit_version").val().trim();
        var maxVersion = $("#edit_max_version").val().trim();
        var limitChannelName = $("#edit_limit_channel_name").val().toString();
        var limitPackageName = $("#edit_limit_package_name").val().toString();

        tips.loading();
        $.ajax({
            url: "/c/page/console/auth/discover/saveDiscover",
            type: "POST",
            dataType: "JSON",
            data:{
                discoverId: discoverId,
                discoverTitle: discoverTitle,
                discoverStatus: discoverStatus,
                discoverImg: discoverImg,
                discoverUrl: discoverUrl,
                discoverOrder: discoverOrder,
                discoverDescription: discoverDescription,

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