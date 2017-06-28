pg.editCallback = function (json) {
    if (json.success) {
        var bean = json.bean;
        var $modal = $("#modal-edit-navigation");
        $modal.find('input[name="edit_id"]').val(bean.navigationId);
        $modal.find('input[name="edit_title"]').val(bean.navigationTitle);
        $modal.find('#edit_status').val(bean.navigationStatus);
        $modal.find('input[name="edit_url"]').val(bean.navigationUrl);
        $modal.find('input[name="edit_order"]').val(bean.navigationOrder);
        $modal.find('#old_img').attr("src", bean.navigationImg);
        $modal.find('input[name="edit_img"]').val(bean.navigationImg);
        $modal.find('#edit_is_show').selectpicker('val', bean.isShow);


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

    $("#add_navigation").on("click", function () {
        var navigationTitle = $("#add_title").val().trim();
        var navigationStatus = $("#add_status").val().trim();
        var navigationImg = $("#add_img").val().trim();
        var navigationUrl = $("#add_url").val().trim();
        var navigationOrder = $("#add_order").val().trim();
        var isShow = $("#add_is_show").val().trim();

        var limitVersion = $("#add_limit_version").val().trim();
        var maxVersion = $("#add_max_version").val().trim();
        var limitChannelName = $("#add_limit_channel_name").val().toString();
        var limitPackageName = $("#add_limit_package_name").val().toString();


        tips.loading();
        $.ajax({
            url: "/c/page/console/auth/navigation/saveNavigation",
            type: "POST",
            dataType: "JSON",
            data:{
                navigationTitle: navigationTitle,
                navigationStatus: navigationStatus,
                navigationImg: navigationImg,
                navigationUrl: navigationUrl,
                navigationOrder: navigationOrder,
                isShow:isShow,

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

    $("#edit_navigation").on("click", function () {
        var navigationId = $("#edit_id").val().trim();
        var navigationTitle = $("#edit_title").val().trim();
        var navigationStatus = $("#edit_status").val().trim();
        var navigationImg = $("#edit_img").val().trim();
        var navigationUrl = $("#edit_url").val().trim();
        var navigationOrder = $("#edit_order").val().trim();
        var isShow = $("#edit_is_show").val().trim();

        var limitVersion = $("#edit_limit_version").val().trim();
        var maxVersion = $("#edit_max_version").val().trim();
        var limitChannelName = $("#edit_limit_channel_name").val().toString();
        var limitPackageName = $("#edit_limit_package_name").val().toString();

        tips.loading();
        $.ajax({
            url: "/c/page/console/auth/navigation/saveNavigation",
            type: "POST",
            dataType: "JSON",
            data:{
                navigationId: navigationId,
                navigationTitle: navigationTitle,
                navigationStatus: navigationStatus,
                navigationImg: navigationImg,
                navigationUrl: navigationUrl,
                navigationOrder: navigationOrder,
                isShow:isShow,

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