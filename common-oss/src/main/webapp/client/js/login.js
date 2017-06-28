$(function () {
    var topWindow = util.getParentWindow();
    if (topWindow !== window) {
        // iframe调用的
        window.tips = topWindow.tips;
    }
});
// 如果调用页，希望获得登录成功回调方法，则
pg.doLoginCbFn = function (json) {
    var $form = $(this);
    if (json.success) {
        $form.find('button[type="submit"]').prop("disabled", true);
        util.loading($form);
        var $successCallbackFn = $("#successCallbackFn");
        var successCallbackFn = null;
        if (util.isJqHasDom($successCallbackFn)) {
            try {
                eval("successCallbackFn = " + $successCallbackFn.val());
            } catch (e) {
            }
            if (!util.isFun(successCallbackFn)) {
                successCallbackFn = null;
            }
        }
        if (successCallbackFn != null) {
            successCallbackFn.call(window, json);
        } else {
            setTimeout(function () {
                location.href = $form.find("#callbackUrl").val();
            }, 1000);
        }
    } else {
        var $captchaImg = $("img.captcha");
        var captchaSrc = $captchaImg.attr("original-src");
        $captchaImg.attr("src", captchaSrc + "?_v=" + new Date().getTime());
        var $vcode = $form.find("#vcode");
        $vcode.val("");
        if (json.field) {
            if (json.field == "pid") {
                $form.find("#pid").val("");
                $form.find("#pwd").focus().val("");
                setTimeout(function () {
                    $vcode.fieldClearInvalid();
                }, 2)
            }
        }
        tips.err(json.error);
    }
};
pg.onResize = function () {
    var centerHeight = util.clientHeight() - $("#header").height()
        - $("#footer").height();
    $("#login-container").css("padding-top",
        ((centerHeight - $("#login-panel").height()) * 0.25) + "px");
    $("#login-panel").fadeIn();
}
$(function () {
    if (location.hash == "#ERROR") {
        tips.err(r.msg.find("errors.login.required.msg"));
    }
    pg.onResize();
    $(window).bind("resize", function () {
        pg.onResize();
    });
    var $loginForm = $("#loginForm");
    var $pid = $loginForm.find("#pid");
    var pwdEntryptFn = function () {
        var pwdSrc = $(this).val();
        if (pwdSrc != null && pwdSrc != "") {
            $pid.val(MD5.encrypt(pwdSrc));
        } else {
            $pid.val("");
        }
    };
    $loginForm.find("#pwd").bind("keydown | keyup", pwdEntryptFn);
    pwdEntryptFn.call($loginForm.find("#pwd")[0]);

    pg.validateLoginForm = function () {
        pwdEntryptFn.call($loginForm.find("#pwd")[0]);
        return true;
    }

    var $vcode = $("input.verify-code-input");
    var $captchaImg = $("img.captcha");
    var captchaSrc = $captchaImg.attr("src");
    $captchaImg.attr("original-src", captchaSrc);
    $captchaImg.bind("click", function () {
        $captchaImg.attr("src", captchaSrc + "?_v=" + new Date().getTime());
        $vcode.val("");
        $vcode.focus();
        $vcode.fieldClearInvalid();
    });
    var $vcode = $("#vcode");
    var vcodeEvents = $._data($vcode[0]).events;
    var vcodeBlurEventArray = vcodeEvents != null ? vcodeEvents.blur : null;
    if (vcodeBlurEventArray != null && vcodeBlurEventArray.length > 0) {
        var validateHandler = vcodeBlurEventArray[0].handler;
        $vcode.unbind("blur", validateHandler);// 暂时解绑自动验证的onblur方法
        var isClickCaptchaImg = false;
        $captchaImg.on("click", function () {
            isClickCaptchaImg = true;
        });
        $vcode.on("click", function () {
            isClickCaptchaImg = false;
        });
        $vcode.on("blur", function () {
            if (isClickCaptchaImg) {
                isClickCaptchaImg = false;
                return;
            }
            validateHandler.call(this, arguments[0]);
        });
    }
});