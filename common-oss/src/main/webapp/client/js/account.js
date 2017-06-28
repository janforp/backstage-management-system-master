pg.saveCallback = function (json) {
    if (json.success) {
        $("#modal-add-account").modal("hide");
        $("form *[type='submit']").prop("disabled", true);
        util.loading();
        setTimeout(function () {
            location.href = util.url("/c/page/console/auth/account/list");
        }, 10000);
    }
}
pg.editCallback = function (json) {
    if (json.success) {
        var bean = json.bean;
        var $modal = $("#modal-edit-account");
        $modal.find('input[name="adminId"]').val(bean.adminId);
        $modal.find('input[name="realName"]').val(bean.realName);
        $modal.find('input[name="loginName"]').val(bean.loginName);
        $modal.find('input[name="cellphone"]').val(bean.cellphone);
        $modal.find('input[name="email"]').val(bean.email);
        $modal.find('.edit_status_label').each(function () {
            var $label = $(this);
            var $input = $label.find('input[name="status"]');
            if (bean.status == $input.val() * 1) {
                $label.find(".icon_radio").trigger("click")
            }
        });
        $modal.modal({backdrop: "static", keyboard: false});
    }
}
pg.updateCallback = function (json) {
    if (json.success) {
        $("#modal-edit-account").modal("hide");
        $("form *[type='submit']").prop("disabled", true);
        util.loading();
        setTimeout(function () {
            location.reload();
        }, 1000);
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
    var pwdMinLength = 6;
    var pwdEntryptFn = function ($event) {
        var $pwdSrc = $(this);
        var $pwdTarget = $($pwdSrc.attr("data-target"));
        var pwdSrcVal = $pwdSrc.val();
        if (pwdSrcVal != null && pwdSrcVal.length >= pwdMinLength) {
            $pwdTarget.val(MD5.encrypt(pwdSrcVal));
        } else {
            $pwdTarget.val("");
        }
    };
    $("input.epwd[type='password']").bind("keydown | keyup", pwdEntryptFn).each(function () {
        var $pwdInput = $(this);
        var pwdInputValidateHandler = null;
        var pwdInputEvents = $._data(this).events;
        var pwdInputBlurEventArray = pwdInputEvents != null ? pwdInputEvents.blur : null;
        if (pwdInputBlurEventArray != null && pwdInputBlurEventArray.length > 0) {
            pwdInputValidateHandler = pwdInputBlurEventArray[0].handler;
            $pwdInput.unbind("blur", pwdInputValidateHandler);// 暂时解绑自动验证的onblur方法
        }
        $pwdInput.bind("blur", function ($event) {
            var $pwdSrc = $(this);
            var $pwdTarget = $($pwdSrc.attr("data-target"));
            var pwdSrcVal = $pwdSrc.val();
            if (pwdSrcVal.length > 0 && pwdSrcVal.length < pwdMinLength) {
                // 输入了密码，但没有达到规定位数
                $pwdTarget.fieldMarkInvalid(MSG.find("oss.error.loginPwd.length", pwdMinLength));
                return;
            } else {
                $pwdTarget.fieldClearInvalid();
                if (pwdInputValidateHandler != null) {
                    pwdInputValidateHandler.call(this, $event);
                }
            }
        })
    });
    $("#modal-add-account").on("hidden.bs.modal", function () {
        $(this).find("form")[0].reset();
    });
    $("#modal-edit-account").on("hidden.bs.modal", function () {
        var $modal = $(this);
        $modal.find("form")[0].reset();
        $modal.find('.edit_status_label').removeClass("selected");
    });
});