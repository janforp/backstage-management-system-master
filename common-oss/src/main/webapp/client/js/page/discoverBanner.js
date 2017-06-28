pg.editCallback = function (json) {
    if (json.success) {
        var bean = json.bean;
        var $modal = $("#modal-edit-banner");
        $modal.find('input[name="edit_id"]').val(bean.bannerId);
        $modal.find('input[name="edit_title"]').val(bean.bannerTitle);
        $modal.find('#edit_status').val(bean.bannerStatus);
        $modal.find('input[name="edit_url"]').val(bean.bannerUrl);
        $modal.find('input[name="edit_order"]').val(bean.bannerOrder);
        $modal.find('#old_img').attr("src", bean.bannerImg);
        $modal.find('input[name="edit_img"]').val(bean.bannerImg);
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

    $("#add_banner").on("click", function () {
        var bannerTitle = $("#add_title").val().trim();
        var bannerStatus = $("#add_status").val().trim();
        var bannerImg = $("#add_img").val().trim();
        var bannerUrl = $("#add_url").val().trim();
        var bannerOrder = $("#add_order").val().trim();
        var isShow = $("#add_is_show").val().trim();

        var limitVersion = $("#add_limit_version").val().trim();
        var maxVersion = $("#add_max_version").val().trim();
        var limitChannelName = $("#add_limit_channel_name").val().toString();
        var limitPackageName = $("#add_limit_package_name").val().toString();


        tips.loading();
        $.ajax({
            url: "/c/page/console/auth/discoverBanner/saveBanner",
            type: "POST",
            dataType: "JSON",
            data:{
                bannerTitle: bannerTitle,
                bannerStatus: bannerStatus,
                bannerImg: bannerImg,
                bannerUrl: bannerUrl,
                bannerOrder: bannerOrder,
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

    $("#edit_banner").on("click", function () {
        var bannerId = $("#edit_id").val().trim();
        var bannerTitle = $("#edit_title").val().trim();
        var bannerStatus = $("#edit_status").val().trim();
        var bannerImg = $("#edit_img").val().trim();
        var bannerUrl = $("#edit_url").val().trim();
        var bannerOrder = $("#edit_order").val().trim();
        var isShow = $("#edit_is_show").val().trim();

        var limitVersion = $("#edit_limit_version").val().trim();
        var maxVersion = $("#edit_max_version").val().trim();
        var limitChannelName = $("#edit_limit_channel_name").val().toString();
        var limitPackageName = $("#edit_limit_package_name").val().toString();


        tips.loading();
        $.ajax({
            url: "/c/page/console/auth/discoverBanner/saveBanner",
            type: "POST",
            dataType: "JSON",
            data:{
                bannerId:bannerId,
                bannerTitle: bannerTitle,
                bannerStatus: bannerStatus,
                bannerImg: bannerImg,
                bannerUrl: bannerUrl,
                bannerOrder: bannerOrder,
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