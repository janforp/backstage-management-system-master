+function (win, $, basePath, defaultError) {
    var consts = {
        loginRequiredErrorCode: "user_login_required",
        jsonSuccessProperty: "success",
        jsonErrorCodeProperty: "code",
        jsonMsgProperty: "msg",
        defaultError: defaultError,
        iframeAjaxMarkParamName: "_ajax",
        iframeAjaxMarkParamValue: "1"
    }
    if (basePath == null) {
        basePath = "";
    }
    var tips = {
        toastSelector: "#global-toast",
        loadingToastSelector: "#global-toast-loading",
        $toast: null,
        $loadingToast: null,
        defaultTimeout: 2000,
        defaultErrorTimeout: 5000,
        tipsIntervalId: null,
        init: function () {
            this.$toast = $(this.toastSelector);
            if (this.$toast.length <= 0) {
                throw new Error("can not find toast element.");
            }
            this.$loadingToast = $(this.loadingToastSelector);
            if (this.$loadingToast.length <= 0) {
                throw new Error("can not find loading toast element.");
            }
        },
        loading: function () {
            var self = this;
            var $toast = self.$loadingToast;
            if ($toast.css('display') != 'none') {
                return;
            }
            $toast.fadeIn("fast");
        },
        hideLoading: function () {
            var self = this;
            var $toast = self.$loadingToast;
            if ($toast.css('display') == 'none') {
                return;
            }
            $toast.hide();
        },
        suc: function (msg, timeout) {
            this._show(true, msg, timeout);
        },
        /**
         * @param {}
         *            msg 弹出的消息
         * @param {}
         *            timeout 显示多少时间（毫秒）后消失，如果为0，则不自动消失
         */
        err: function (msg, timeout) {
            this._show(false, msg, timeout);
        },
        _show: function (success, msg, timeout) {
            var self = this;
            var $toast = self.$toast;
            if ($toast.css('display') != 'none') {
                if (self.tipsIntervalId != null) {
                    clearInterval(self.tipsIntervalId)
                    self.tipsIntervalId = null;
                }
                $toast.hide();
            }
            var _timeout = success ? self.defaultTimeout : self.defaultErrorTimeout;
            if (timeout != null && typeof(timeout) == 'number' && (!isNaN(timeout)) && timeout > 0) {
                _timeout = timeout;
            }
            var $toast_icon = $toast.find('[class*="weui_icon_"]:eq(0)');
            if (success) {
                $toast_icon.attr("class", "weui_icon_toast");
            } else {
                $toast_icon.attr("class", "weui_icon_warn error_tip");
            }
            var $weui_toast_content = $toast.find(".weui_toast_content");
            if (msg == null || msg === "") {
                $weui_toast_content.hide();
            } else {
                $weui_toast_content.html(msg).show();
            }
            $toast.fadeIn("fast");
            self.tipsIntervalId = setTimeout(function () {
                self.tipsIntervalId = null;
                $toast.hide();
            }, _timeout);
        },
        hide: function () {
            var self = this;
            var $toast = self.$toast;
            if ($toast.css('display') == 'none') {
                return;
            }
            if (self.tipsIntervalId != null) {
                clearInterval(self.tipsIntervalId)
                self.tipsIntervalId = null;
            }
            $toast.hide();
        }
    };
    win.tips = tips;
    var dialog = {
        alertSelector: "#global-dialog-alert",
        confirmSelector: "#global-dialog-confirm",
        $alert: null,
        alertOriginalTitle: "&nbsp;",
        alertOriginalMsg: "&nbsp;",
        alertCallback: null,
        $confirm: null,
        confirmOriginalTitle: "&nbsp;",
        confirmOriginalMsg: "&nbsp;",
        confirmOkCallback: null,
        confirmCancelCallback: null,
        init: function () {
            var self = this;
            self.$alert = $(self.alertSelector);
            if (self.$alert.length <= 0) {
                throw new Error("can not find alert dialog element.");
            }
            self.alertOriginalTitle = self.$alert.find(".weui_dialog_title").html();
            self.alertOriginalMsg = self.$alert.find(".weui_dialog_bd").html();
            self.$alert.find(".weui_btn_dialog").on('click', function ($event) {
                self.hideAlert(this);
            });
            self.$confirm = $(self.confirmSelector);
            if (self.$confirm.length <= 0) {
                throw new Error("can not find confirm dialog element.");
            }
            self.confirmOriginalTitle = self.$confirm.find(".weui_dialog_title").html();
            self.confirmOriginalMsg = self.$confirm.find(".weui_dialog_bd").html();
            self.$confirm.find(".weui_btn_dialog").on('click', function ($event) {
                self.hideConfirm(this);
            });
        },
        /**
         * alert窗口，一般来说标题必须要有，内容可以没有
         * @param title 消息标题
         * @param msg 消息内容（灰色的字）
         * @param callback 用户关闭对话框后的回调方法
         */
        alert: function (title, msg, callback) {
            var self = this;
            var $dialog = self.$alert;
            if ($dialog.css('display') != 'none') {
                return;
            }
            if (title == null) {
                title = "";
            }
            if (msg == null) {
                msg = "";
            }
            $dialog.find(".weui_dialog_title").html(title);
            $dialog.find(".weui_dialog_bd").html(msg);
            if (callback != null && typeof(callback) == "function") {
                self.alertCallback = callback;
            }
            $dialog.fadeIn("fast");
        },
        /**
         * confirm窗口，一般来说标题必须要有，内容可以没有
         * @param title 消息标题
         * @param msg 消息内容（灰色的字）
         * @param okCallback 用户选择确定、同意后的回调方法
         * @param cancelCallback 用户选择取消、拒绝后的回调方法
         */
        confirm: function (title, msg, okCallback, cancelCallback) {
            var self = this;
            var $dialog = self.$confirm;
            if ($dialog.css('display') != 'none') {
                return;
            }
            if (title == null) {
                title = "";
            }
            if (msg == null) {
                msg = "";
            }
            $dialog.find(".weui_dialog_title").html(title);
            $dialog.find(".weui_dialog_bd").html(msg);
            if (okCallback != null && typeof(okCallback) == "function") {
                self.confirmOkCallback = okCallback;
            }
            if (cancelCallback != null && typeof(cancelCallback) == "function") {
                self.confirmCancelCallback = cancelCallback;
            }
            $dialog.fadeIn("fast");
        },
        hideAlert: function () {
            var self = this;
            self.$alert.hide();
            self.$alert.find(".weui_dialog_title").html(self.alertOriginalTitle);
            self.$alert.find(".weui_dialog_bd").html(self.alertOriginalMsg);
            if (self.alertCallback != null && typeof(self.alertCallback) == "function") {
                var callbackScope = win;
                if (arguments.length > 0 && arguments[0] != null && typeof(arguments[0]) == 'object') {
                    callbackScope = arguments[0];
                }
                self.alertCallback.call(callbackScope);
            }
            self.alertCallback = null;
        },
        hideConfirm: function () {
            var self = this;
            self.$confirm.hide();
            self.$confirm.find(".weui_dialog_title").html(self.confirmOriginalTitle);
            self.$confirm.find(".weui_dialog_bd").html(self.confirmOriginalMsg);
            if ((self.confirmOkCallback != null && typeof(self.confirmOkCallback) == "function")
                || (self.confirmCancelCallback != null && typeof(self.confirmCancelCallback) == "function")) {
                var callbackScope = win;
                var isClickOkBtn = false;
                if (arguments.length > 0 && arguments[0] != null && typeof(arguments[0]) == 'object') {
                    callbackScope = arguments[0];
                    isClickOkBtn = $(callbackScope).hasClass("btn_dialog_ok");
                }
                if (isClickOkBtn) {
                    self.confirmOkCallback.call(callbackScope);
                } else {
                    self.confirmCancelCallback.call(callbackScope);
                }
            }
            self.confirmOkCallback = null;
            self.confirmCancelCallback = null;
        }
    };
    win.dialog = dialog;
    var util = {
        consts: consts,
        loginErrorCallback: function (json) {

        },
        /**
         * 窗口的物理像素宽度（即：windowWidth()实际总共由多少个物理像素组成）
         * @returns {number}
         */
        physicalWindowWidth: function () {
            return this.windowWidth() * this.devicePixelRatio();
        },
        /**
         * 获取屏幕实际像素与虚拟像素的倍数，
         * 即：这个屏幕，一个点由几个实际像素组成，视网膜屏幕>=2
         * 如：iPhone 4s ~ iPhone 5s对应的值是：2
         * iPhone 6 / 6p ~ iPhone 6s / 6s p 是：3
         * @returns {number} 一定不会返回null，也有可能返回小数
         */
        devicePixelRatio: function () {
            var tmp = window.devicePixelRatio;
            return tmp == null || tmp <= 0 ? 1 : tmp;
        },
        /**
         * 窗口宽度
         * 与是否出现横向滚动条无关（与屏幕宽度类似，当然如果浏览器窗口可以最大化、最小化、调整大小则与这个状态有关）
         * @returns {number}
         */
        windowWidth: function () {
            return $(window).width();
        },
        /**
         * 窗口高度
         * 与是否出现纵向滚动条无关（与屏幕高度类似，当然如果浏览器窗口可以最大化、最小化、调整大小则与这个状态有关）
         * @returns {number}
         */
        windowHeight: function () {
            return $(window).height();
        },
        isJsonSuccess: function (json) {
            if (json != null && json[this.consts.jsonSuccessProperty] === true) {
                // 请求成功
                return true;
            }
            return false;
        },
        isJsonFailed: function (json) {
            return !this.isJsonSuccess(json);
        },
        /**
         * 判断是否是数字类型
         */
        isNumber: function (obj) {
            if (obj == null || isNaN(obj) || typeof(obj) !== "number") {
                return false;
            } else {
                return true;
            }
        },
        /**
         * 判断是否是数组对象
         *
         * @param {}
         *            obj 参数
         * @return {Boolean}
         */
        isArray: function (obj) {
            if (obj != null && typeof(obj) == 'object' && (obj instanceof Array)) {
                return true;
            }
            return false;
        },
        url: function (subUrl) {
            if (subUrl != null) {
                subUrl = subUrl + "";
                var subUrlUpper = subUrl.toUpperCase();
                if (subUrlUpper.indexOf("HTTP://") == 0
                    || subUrlUpper.indexOf("HTTPS://") == 0
                    || subUrlUpper.indexOf("//") == 0) {
                    return subUrl;
                }
                if (basePath !== "" && subUrl.indexOf(basePath) == 0) {
                    return subUrl;
                } else {
                    if (subUrl.indexOf("/") == 0) {
                        return basePath + subUrl;
                    } else {
                        return basePath + "/" + subUrl;
                    }
                }
            }
            return basePath + "/";
        },
        /**
         * ajax post
         * @param {}
         *            url 地址
         * @param {}
         *            params
         *            如:{id:"23424",name:"asdfasdf"}/"id=213213&name=sadfasdfas"/[{name:"id",value:"123131"},{name:"id",value:"234324324"}]，第二个参数也可以是callback方法
         * @param {}
         *            callback function(json)或者{callback:function(json){},scope:obj}
         * @param {} 网络
         */
        ajaxPost: function (url, _paramsOrCallback, _callback) {
            this._ajax("POST", url, _paramsOrCallback, _callback);
        },
        /**
         * ajax get
         * @param {}
         *            url 地址
         * @param {}
         *            params
         *            如:{id:"23424",name:"asdfasdf"}/"id=213213&name=sadfasdfas"/[{name:"id",value:"123131"},{name:"id",value:"234324324"}]，第二个参数也可以是callback方法
         * @param {}
         *            callback function(json)或者{callback:function(json){},scope:obj}
         * @param {} 网络
         */
        ajaxGet: function (url, _paramsOrCallback, _callback) {
            this._ajax("GET", url, _paramsOrCallback, _callback);
        },
        /**
         *
         * @param {}
         *            method post/get
         * @param {}
         *            url 地址
         * @param {}
         *            params
         *            如:{id:"23424",name:"asdfasdf"}/"id=213213&name=sadfasdfas"/[{name:"id",value:"123131"},{name:"id",value:"234324324"}]，第二个参数也可以是callback方法
         * @param {}
         *            callback function(json)或者{callback:function(json){},scope:obj}
         * @param {} 网络
         */
        _ajax: function (method, url, _paramsOrCallback, _callback) {
            var ut = this;
            var params = "";
            var callbackFn = null;
            if (_params != null && (typeof(_params) == 'string' || ut.isArray(_params) || typeof(_params) == 'object')) {
                params = _params;
            } else if (typeof(_params) == "function") {
                callbackFn = _params;
            }
            var scope = window;
            if (_callback != null) {
                if (typeof(_callback) == "function") {
                    callbackFn = _callback;
                } else if (typeof(_callback) == "object" && typeof(_callback.callback) == "function") {
                    callbackFn = _callback.callback;
                    if (_callback.scope != null && typeof(_callback.scope) == "object") {
                        scope = _callback.scope;
                    }
                }
            }
            $.ajax({
                url: ut.url(url),
                data: params,
                type: method,
                dataType: "text",
                success: function (jsonText) {
                    var json = null;
                    try {
                        json = eval("(function(){return " + jsonText + ";})()");
                    } catch (e) {
                        throw new Error("parse json error: " + jsonText);
                    }
                    if (json != null && ut.isJsonFailed(json)) {
                        if (ut.consts.loginRequiredErrorCode === json[ut.consts.jsonErrorCodeProperty]) {
                            ut.loginErrorCallback(json);
                        }
                        var errorMsg = json[ut.consts.jsonMsgProperty];
                        if (errorMsg == null || errorMsg == "") {
                            // 获取默认错误消息
                            errorMsg = ut.consts.defaultError;
                        }
                        tips.err(errorMsg);
                    }
                    if (callbackFn != null) {
                        // 调用callback
                        callbackFn.call(scope, json);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    tips.err(ut.consts.defaultError);
                    if (callbackFn != null) {
                        // 调用callback
                        callbackFn.call(scope, json);
                    }
                }
            });
        },
        /**
         *
         * @param form
         * @param _optionOrCallback
         *            _optionOrCallback={callback:function(json){},scope:obj}/function(json){}
         */
        ajaxSubmit: function (form, _optionOrCallback) {
            var jq = $(form);
            if (jq.length <= 0) {
                throw new Error("form not found.");
            }
            var formDom = jq[0];
            if (formDom.tagName.toUpperCase() != 'FORM') {
                throw new Error("ajaxSubmit not support " + formDom.tagName + " Element.");
            }
            if (jq.length > 1) {
                // 有多个form，只取第一个
                jq = $(formDom);
            }
            var ut = this;
            var url = jq.attr('action');
            var isIframeAjax = false;// 是否是通过iframe发起的异步提交
            var $submitBtn = null;
            var submitBtnSelector = jq.attr("data-submit-btn");
            if (submitBtnSelector != null && submitBtnSelector != "") {
                $submitBtn = $(submitBtnSelector);
                if ($submitBtn.length <= 0) {
                    $submitBtn = null;
                }
            }
            if ($submitBtn == null) {
                $submitBtn = jq.find("*[type='submit']");
            }
            var option = {
                callback: null,
                scope: window,
                realCallback: function (json) {
                    $submitBtn.prop("disabled", false).removeAttr("disabled");
                    tips.hideLoading();
                    // 结果提示
                    if (ut.isJsonSuccess(json)) {
                        var msg = json[ut.consts.jsonMsgProperty];
                        if (msg != null) {
                            tips.suc(msg);
                        }
                    } else {
                        if (isIframeAjax) {
                            // 是通过iframe发起的异步提交，否则不同提示错误，因为_ajax方法会弹出错误提示
                            var errorMsg = json[ut.consts.jsonMsgProperty];
                            if (errorMsg == null || errorMsg == "") {
                                // 获取默认错误消息
                                errorMsg = ut.consts.defaultError;
                            }
                            tips.err(errorMsg);
                        }
                    }
                    if (json != null && ut.consts.loginRequiredErrorCode === json[ut.consts.jsonErrorCodeProperty]) {
                        ut.loginErrorCallback(json);
                    }
                    if (this.callback != null) {
                        // 调用外部定义的callback
                        this.callback.call(this.scope, json);
                    }
                }
            };
            if (_optionOrCallback != null) {
                if (typeof(_optionOrCallback) == 'object') {
                    if (typeof(_optionOrCallback.callback) == 'function') {
                        option.callback = _optionOrCallback.callback;
                    }
                    if (_optionOrCallback.scope != null && typeof(_optionOrCallback.scope) == 'object') {
                        option.scope = _optionOrCallback.scope;
                    }
                } else if (typeof(_optionOrCallback) == 'function') {
                    option.callback = _optionOrCallback;
                }
            }
            if (jq != null) {
                $submitBtn.prop("disabled", true).attr("disabled", "disabled");
                var enctype = null;
                if (jq.find("input[type='file']").length > 0
                    || ((enctype = jq.attr("enctype")) != null && "MULTIPART/FORM-DATA" == enctype.toUpperCase())) {
                    // 应该使用iframe异步提交
                    isIframeAjax = true;
                    var iframeId = ("form_submit_iframe_" + Math.random()).replace(".", "");
                    $("body").append("<iframe src='javascript:void(0);' style='display:none;' id='"
                        + iframeId
                        + "' name='"
                        + iframeId
                        + "'></iframe>");
                    jq.attr("target", iframeId);
                    var old_action = jq.attr("action");
                    var ajaxMarkParamName = ut.consts.iframeAjaxMarkParamName;
                    if (ajaxMarkParamName != null && ajaxMarkParamName != "") {
                        var arr = url.split("?");
                        var paramArray = [];
                        var isFoundAjaxParam = false;
                        var urlAction = arr[0];
                        if (arr.length > 1) {
                            var queryString = arr[1];
                            if (queryString != "") {
                                var arr2 = queryString.split("&");
                                for (var ii = 0; ii < arr2.length; ii++) {
                                    var a2 = arr2[ii].split("=");
                                    if (a2[0] === ajaxMarkParamName) {
                                        // 有这个参数
                                        isFoundAjaxParam = true;
                                        paramArray.push({
                                            n: a2[0],
                                            v: "1"
                                        });
                                    } else {
                                        paramArray.push({
                                            n: a2[0],
                                            v: a2[1]
                                        });
                                    }
                                }
                            }
                        }
                        if (!isFoundAjaxParam) {
                            paramArray.push({
                                n: ajaxMarkParamName,
                                v: ut.consts.iframeAjaxMarkParamValue
                            })
                        }
                        url = urlAction + "?";
                        var isPutAjax = false;
                        for (var k = 0; k < paramArray.length; k++) {
                            if (paramArray[k].n === ajaxMarkParamName) {
                                if (!isPutAjax) {
                                    if (k != 0) {
                                        url += "&";
                                    }
                                    url += (paramArray[k].n + "=" + paramArray[k].v);
                                    isPutAjax = true;
                                }
                            } else {
                                if (k != 0) {
                                    url += "&";
                                }
                                url += (paramArray[k].n + "=" + paramArray[k].v);
                            }
                        }
                        jq.attr("action", url);
                    }
                    tips.loading();
                    jq[0].submit();
                    $("#" + iframeId).bind("load", function () {
                        jq.attr("action", old_action);
                        jq.removeAttr("target");
                        $submitBtn.prop("disabled", false).removeAttr("disabled");
                        var json = null;
                        var html = null;
                        try {
                            var iframeDocument = this.contentDocument || this.contentWindow.document;
                            if ($("pre", iframeDocument).length > 0) {
                                html = $("pre", iframeDocument).html();
                            } else {
                                html = $("body", iframeDocument).html();
                            }
                            setTimeout(function () {
                                $("#" + iframeId).remove();
                            }, 500);
                            json = eval("(function(){return " + html + ";})()");
                        } catch (err) {
                            throw new Error("parse json error: " + html);
                        }
                        option.realCallback(json);
                    });
                } else {
                    // 用javascript ajax提交
                    var method = "GET";
                    var formMethod = null;
                    if ((formMethod = jq.attr("method")) != null && (formMethod = formMethod.toUpperCase()) == "POST") {
                        method = formMethod;
                    }
                    tips.loading();
                    ut._ajax(method, url, jq.serialize(), {
                        callback: option.realCallback,
                        scope: option
                    }, function () {
                        try {
                            $submitBtn.prop("disabled", false).removeAttr("disabled");
                            tips.hideLoading();
                        } catch (e) {
                        }
                    });
                }
            }
        }
    };
    win.util = util;
    // 以下内容是document ready以后
    $(function () {
        // document ready
        tips.init();
        dialog.init();

        // carousel -start
        $(".carousel").each(function () {
            var $carousel = $(this);
            var $carouselImg = $carousel.find(".carousel_img");
            $carouselImg.on("swipeleft", function ($event) {
                // 向左滑动
                $carousel.carousel("next");
            });
            $carouselImg.on("swiperight", function ($event) {
                // 向右滑动
                $carousel.carousel("prev");
            });
        });
        // carousel -end
    });
}(window, $, pg.basePath, MSG.find("common.error.default"));