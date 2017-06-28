pg.editCallback = function (json) {
    if (json.success) {
        var bean = json.bean;
        var $modal = $("#modal-edit-package");
        $modal.find('input[name="edit_appName"]').val(bean.appName);
        $modal.find('input[name="edit_channelName"]').val(bean.channelName);
        $modal.find('input[name="edit_packageName"]').val(bean.packageName);
        $modal.find('input[name="edit_appVersion"]').val(bean.appVersion);
        $modal.find('input[name="edit_versionCode"]').val(bean.versionCode);
        $modal.find('#edit_status').val(bean.status);
        $modal.find('#edit_img').attr("src", bean.appIcon).attr("value", bean.appIcon);
        $modal.find('#edit_updateRemark').val(bean.updateRemark);
        $modal.find('#edit_isForce').val(bean.isForce);
        $modal.find('#edit_notes').val(bean.notes);

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

pg.uploadCallback = function (json) {
    if (json.success) {
        closeFrame();
        if (json.msg) {
            tips.suc(json.msg);
        }
        setTimeout(function () {
            location.reload();
        }, 1000);
    }
};

$(function () {

    $("#add_package").on("click", function () {

        var appName = $("#add_appName").val().trim();
        var channelName = $("#add_channelName").val().trim();
        var packageName = $("#add_packageName").val().trim();
        var appVersion = $("#add_appVersion").val().trim();
        var appIcon = $("#add_img").attr("value");
        var status = $("#add_status").val().trim();
        var notes = $("#add_notes").val().trim();
        var versionCode = $("#add_versionCode").val().trim();
        var updateRemark = $("#add_updateRemark").val().trim();
        var isForce = $("#add_isForce").val().trim();

        tips.loading();
        $.ajax({
            url: "/c/page/console/auth/packageChannel/save",
            type: "POST",
            dataType: "JSON",
            data:{
                appName: appName,
                channelName: channelName,
                packageName: packageName,
                appVersion: appVersion,
                appIcon: appIcon,
                status: status,
                notes: notes,
                versionCode: versionCode,
                updateRemark: updateRemark,
                isForce: isForce
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

    $("#edit_package").on("click", function () {

        var appName = $("#edit_appName").val().trim();
        var channelName = $("#edit_channelName").val().trim();
        var packageName = $("#edit_packageName").val().trim();
        var appVersion = $("#edit_appVersion").val().trim();
        var appIcon = $("#edit_img").attr("value");
        var status = $("#edit_status").val().trim();
        var notes = $("#edit_notes").val().trim();
        var versionCode = $("#edit_versionCode").val().trim();
        var updateRemark = $("#edit_updateRemark").val().trim();
        var isForce = $("#edit_isForce").val().trim();

        tips.loading();
        $.ajax({
            url: "/c/page/console/auth/packageChannel/save",
            type: "POST",
            dataType: "JSON",
            data:{
                appName: appName,
                channelName: channelName,
                packageName: packageName,
                appVersion: appVersion,
                appIcon: appIcon,
                status: status,
                notes: notes,
                versionCode: versionCode,
                updateRemark: updateRemark,
                isForce: isForce
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

/**
 * 上传apk
 */
function uploadApk() {
    var $input = $("input[type=checkbox]:checked");
    if ($input == null ||$input.length == 0||$input.length>1 ) {
        tips.err("必须且只能选择一条纪录",2000);
        return;
    }
    $("#channelPackage").val($input.val());
    $("#alertFrame").removeClass("hide");
    //其他的复选框均不能选择
    $("input[type=checkbox]").prop("disabled",true);
}

/**
 * 关闭上传 弹出框
 */
function closeFrame() {
    $("#alertFrame").addClass("hide");
    //恢复复选框选择功能
    $("input[type=checkbox]").prop("disabled",false);
}