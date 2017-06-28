pg.editCallback = function (json) {
    if (json.success) {
        var bean = json.bean;
        var $modal = $("#modal-edit-ad");
        $modal.find('input[name="edit_id"]').val(bean.adId);
        $modal.find('input[name="edit_title"]').val(bean.adTitle);
        $modal.find('#edit_status').val(bean.adStatus);
        $modal.find('input[name="edit_url"]').val(bean.adUrl);
        $modal.find('#old_img').attr("src", bean.adImg);
        $modal.find('input[name="edit_img"]').val(bean.adImg);
        $modal.find('input[name="edit_skip"]').val(bean.adSkip);
        $modal.find('input[name="edit_time"]').val(bean.adDuration);

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

    $("#add_ad").on("click", function () {
        var adTitle = $("#add_title").val().trim();
        var adStatus = $("#add_status").val().trim();
        var adImg = $("#add_img").val().trim();
        var adUrl = $("#add_url").val().trim();
        var adSkip = $("#add_skip").val().trim();
        var adDuration = $("#add_time").val().trim();
        tips.loading();
        $.ajax({
            url: "/c/page/console/auth/startAd/saveAd",
            type: "POST",
            dataType: "JSON",
            data:{
                adTitle: adTitle,
                adStatus: adStatus,
                adImg: adImg,
                adUrl: adUrl,
                adSkip: adSkip,
                adDuration:adDuration
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
        var adId = $("#edit_id").val().trim();
        var adTitle = $("#edit_title").val().trim();
        var adStatus = $("#edit_status").val().trim();
        var adImg = $("#edit_img").val().trim();
        var adUrl = $("#edit_url").val().trim();
        var adSkip = $("#edit_skip").val().trim();
        var adDuration = $("#edit_time").val().trim();
        tips.loading();
        $.ajax({
            url: "/c/page/console/auth/startAd/saveAd",
            type: "POST",
            dataType: "JSON",
            data:{
                adId:adId,
                adTitle: adTitle,
                adStatus: adStatus,
                adImg: adImg,
                adUrl: adUrl,
                adSkip: adSkip,
                adDuration:adDuration
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