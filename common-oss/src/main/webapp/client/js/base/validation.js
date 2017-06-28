var blurControl = ["input[type='text']", "input[type = 'password']", "textarea", "select", "*[type='radio']"];
var submitControlX = ["input[type='text']", "input[type = 'password']", "textarea", "select", ".radioX"];
validate = {
    groupErr: function (currMsg, allMsg) {
        allMsg = allMsg == "" ? currMsg : allMsg + "\n" + currMsg;
        return allMsg;
    },
    inputBlur: function (isWarning) {
        $(blurControl).each(function (k) {
            $(blurControl[k]).each(function () {
                //自定义radio button按钮
                if ($(this).attr("type") == "radio") {
                    $(this).live("click", function () {
                        //去除警告文本框
                        var _this = "";
                        if ($(this).parent().parent().find(".radioX").length > 0)
                            _this = $(this).parent().parent().find(".radioX");
                        else if ($(this).parent().parent().parent().find(".radioX").length > 0)
                            _this = $(this).parent().parent().parent().find(".radioX");

                        if (_this.hasClass("input_warning"))
                            _this.removeClass("input_warning");
                    });
                } else if ($(this).attr("validate")) {
                    $(this).live("focus", function () {
                        if ($(this).hasClass("input_warning"))
                            $(this).removeClass("input_warning");
                    }).live("blur", function () {
                        //如果隐藏则返回
                        if ($(this).is(":hidden"))
                            return;

                        var msg = "";
                        var vali = $(this).attr("validate").split("|");
                        var err = $(this).attr("errormessage").split("|");
                        var v = "";
                        v = $.trim($(this).val());
                        //if (this.tagName == "INPUT" || this.tagName == "TEXTAREA")
                        if (this.tagName == "SELECT" && (v == 0 || v == -1))
                            v = "";

                        $(vali).each(function (i) {
                            switch (vali[i]) {
                                case "required":
                                    if (!v)
                                        msg = validate.groupErr(err[i], msg);
                                    break;
                                case "number":
                                    if (!validate.isNumber(v))
                                        msg = validate.groupErr(err[i], msg);
                                    break;
                            }
                        });

                        if (msg) {
                            if (isWarning)
                                $(this).addClass("input_warning");

                            //alert(msg);
                        }
                    });
                }
            });
        });
    },
    inputSubmit: function (refMsg, isWarning, customControl) {
        submitControl=submitControlX;
        if(customControl)
            submitControl=customControl;

        $(submitControl).each(function (k) {
            $(submitControl[k]).each(function (a) {
                if ($(this).attr("validate")) {
                    //去除警告文本框
                    if ($(this).hasClass("input_warning"))
                        $(this).removeClass("input_warning");

                    //如果隐藏则返回
                    if ($(this).is(":hidden"))
                        return;

                    var vali = $(this).attr("validate").split("|");
                    var err = $(this).attr("errormessage").split("|");
                    var compareV = "";
                    if ($(this).attr("compare"))
                        compareV = $.trim($("#" + $(this).attr("compare")).val());

                    var v = "";

                    if (this.tagName == "INPUT" || this.tagName == "TEXTAREA")
                        v = $.trim($(this).val());
                    else if (this.tagName == "SELECT") {
                        v = $(this).val();
                        if (v == 0 || v == -1)
                            v = "";
                    }else if (submitControl[k] == ".radioX") {
                        $(this).find("*[type='radio']").each(function () {
                            if ($(this).attr("use") == "true") {
                                v = "have";
                                return;
                            }
                        });
                    }

                    isError = "";
                    errorAmount = 0;
                    $(vali).each(function (i) {
                        switch (vali[i]) {
                            case "required":
                                if (!v) {
                                    refMsg = validate.groupErr(err[i], refMsg);
                                    isError = "required";
                                    errorAmount++;
                                }
                                break;
                            case "number":
                                if (!validate.isNumber(v)) {
                                    refMsg = validate.groupErr(err[i], refMsg);
                                    isError = "number";
                                    errorAmount++;
                                }
                                break;
                            case "compare":
                                if(v != compareV) {
                                    refMsg = validate.groupErr(err[i], refMsg);
                                    isError = "compare";
                                    errorAmount++;
                                }
                                break;
                        }

                        if (errorAmount > 0)
                            return false;
                    });

                    if (isError && isWarning)
                        $(this).addClass("input_warning");
                }
            });
        });

        return refMsg;
    },
    isNumber: function (str) {
        //var reg = /^[0-9]+.?[0-9]*$/;//带小数
        var reg = /^\d+$/;
        if (reg.test(str))
            return true;
        else
            return false;
    },
    isExistImage:function(imgUrl){
        var xImage = new Image();
        xImage.src = imgUrl;
        return xImage.width > 0 ? true : false;
    },
    isString : function(obj) {
        if (this.isNull(obj) || typeof(obj) !== "string") {
            return false;
        } else {
            return true;
        }
    },
    /**
     * 使用typeof来判断是否是Object对象
     */
    isObj : function(obj) {
        if (this.isNull(obj)) {
            return false;
        }
        return (typeof(obj) === "object");
    },
    /**
     * 使用typeof来判断是否是Jquery对象
     *
     */
    isJq : function(obj) {
        if (!window.jQuery) {
            return false;
        }
        if (this.isNull(obj)) {
            return false;
        }
        return (obj instanceof window.jQuery.fn.init);
    },
    /**
     * 使用typeof来判断是否是Jquery对象，且length>0
     */
    isJqHasDom : function(obj) {
        if (!this.isJq(obj)) {
            return false;
        }
        return (obj.length > 0);
    },
    /**
     * 判断是否是DOM元素对象，如果能够访问window.Element类 <br>
     * 如果传入document对象，将返回false
     */
    isDom : function(obj) {
        if (this.isNull(obj) || (!this.isObj(obj))) {
            return false;
        }
        if (this.notNull(window.Element)
            && ((!this.isIE()) || this.isIE8() || this.isIE9OrHigher())) {
            // 不是ie或者ie8/ie9/ie9+ 传入document对象，将返回true
            return (obj instanceof window.Element);
        } else {
            // TODO 在ie6-、ie6、ie7浏览器下，通过对象的tagName来判断，判断不是完美的
            // 无法访问window.Element类，如果传入document对象，将返回false
            if (this.isObj(obj) && this.isString(obj.tagName)
                && (this.str.matchReg(obj.tagName, /^[^<>/'"\\/\n\r]+$/))) {
                return true;
            } else {
                return false;
            }
        }
    },
    /**
     * 判断是否是数组对象
     */
    isArray : function(obj) {
        if (this.isObj(obj) && (obj instanceof Array)) {
            return true;
        }
        return false;
    },
    isRegex : function(regex) {
        if (this.isNull(regex) || typeof(regex) != "object") {
            return false;
        }
        return (regex instanceof RegExp);
    },
    /**
     * 判断参数/变量是否定义,未定义或不为null：true,已定义且不为null:false
     */
    isNull : function(arg) {
        return (typeof(arg) === "undefined" || arg === null);
    },
    /**
     * 判断参数/变量是否定义,已定义且不为null：true,未定义或null:false
     *
     * @param {}
     *            obj 参数/变量
     * @return {Boolean}
     */
    notNull : function(arg) {
        return (typeof(arg) != "undefined" && arg != null);
    },
    /**
     * 是不是boolean类型
     */
    isBoolean : function(flag) {
        if (this.isNull(flag)) {
            return false;
        }
        return (typeof(flag) === "boolean");
    },
    /**
     * 判断是否是方法
     *
     * @param {}
     *            obj
     * @return {Boolean}
     */
    isFun : function(fun) {
        if (this.isNull(fun)) {
            return false;
        }
        return (typeof(fun) === "function");
    },

    /**
     * Firefox浏览器
     */
    isFF : function() {
        return (navigator.userAgent + "").toLowerCase().indexOf("firefox") != -1;
    },
    /**
     * 判断浏览器类型 IE
     *
     * @return {}
     */
    isIE : function() {
        return (navigator.appName + "").toLowerCase()
                .indexOf("microsoft internet explorer") > -1
            && document.all != null;

    },
    /**
     * 判断浏览器类型 IE6或者IE6-
     *
     * @return {}
     */
    isIE6OrLower : function() {
        var browserVersion = 0;
        if (this.notNull(navigator.appVersion)) {
            browserVersion = (navigator.appVersion + "");
            browserVersion = browserVersion.substring(browserVersion
                .toUpperCase().indexOf("MSIE")
            + "MSIE".length);
            browserVersion = this.str.trim(browserVersion.substring(0,
                browserVersion.toUpperCase().indexOf(";")));
            if (this.isNum(browserVersion)) {
                browserVersion = browserVersion * 1;
            }
        }
        if (this.isIE() && (((browserVersion * 1) <= 6.0))) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断浏览器类型 IE6
     *
     * @return {}
     */
    isIE6 : function() {
        var browserVersion = "";
        if (this.notNull(navigator.appVersion)) {
            browserVersion = (navigator.appVersion + "");
            browserVersion = browserVersion.substring(browserVersion
                .toUpperCase().indexOf("MSIE")
            + "MSIE".length);
            browserVersion = this.str.trim(browserVersion.substring(0,
                browserVersion.toUpperCase().indexOf(";")));
        }
        if (this.isIE()
            && ((browserVersion == "6.0") || (this.str.startsWith(
                browserVersion, "6.")))) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断浏览器类型 IE7
     *
     * @return {}
     */
    isIE7 : function() {
        var browserVersion = "";
        if (this.notNull(navigator.appVersion)) {
            browserVersion = (navigator.appVersion + "");
            browserVersion = browserVersion.substring(browserVersion
                .toUpperCase().indexOf("MSIE")
            + "MSIE".length);
            browserVersion = this.str.trim(browserVersion.substring(0,
                browserVersion.toUpperCase().indexOf(";")));
        }
        if (this.isIE()
            && ((browserVersion == "7.0") || (this.str.startsWith(
                browserVersion, "7.")))) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断浏览器类型 IE8
     *
     * @return {}
     */
    isIE8 : function() {
        var browserVersion = "";
        if (this.notNull(navigator.appVersion)) {
            browserVersion = (navigator.appVersion + "");
            browserVersion = browserVersion.substring(browserVersion
                .toUpperCase().indexOf("MSIE")
            + "MSIE".length);
            browserVersion = this.str.trim(browserVersion.substring(0,
                browserVersion.toUpperCase().indexOf(";")));
        }
        if (this.isIE()
            && ((browserVersion == "8.0") || (this.str.startsWith(
                browserVersion, "8.")))) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断浏览器类型 IE9
     *
     * @return {}
     */
    isIE9 : function() {
        var browserVersion = "";
        if (this.notNull(navigator.appVersion)) {
            browserVersion = (navigator.appVersion + "");
            browserVersion = browserVersion.substring(browserVersion
                .toUpperCase().indexOf("MSIE")
            + "MSIE".length);
            browserVersion = this.str.trim(browserVersion.substring(0,
                browserVersion.toUpperCase().indexOf(";")));
        }
        if (this.isIE()
            && ((browserVersion == "9.0") || (this.str.startsWith(
                browserVersion, "9.")))) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断浏览器类型 IE9
     *
     * @return {}
     */
    isIE10 : function() {
        var browserVersion = "";
        if (this.notNull(navigator.appVersion)) {
            browserVersion = (navigator.appVersion + "");
            browserVersion = browserVersion.substring(browserVersion
                .toUpperCase().indexOf("MSIE")
            + "MSIE".length);
            browserVersion = this.str.trim(browserVersion.substring(0,
                browserVersion.toUpperCase().indexOf(";")));
        }
        if (this.isIE()
            && ((browserVersion == "10.0") || (this.str.startsWith(
                browserVersion, "10.")))) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断浏览器类型 IE9
     *
     * @return {}
     */
    isIE9OrHigher : function() {
        var browserVersion = 0;
        if (this.notNull(navigator.appVersion)) {
            browserVersion = (navigator.appVersion + "");
            browserVersion = browserVersion.substring(browserVersion
                .toUpperCase().indexOf("MSIE")
            + "MSIE".length);
            browserVersion = this.str.trim(browserVersion.substring(0,
                browserVersion.toUpperCase().indexOf(";")));
            if (this.isNum(browserVersion)) {
                browserVersion = browserVersion * 1;
            }
        }
        if (this.isIE() && (((browserVersion * 1) >= 9.0))) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 判断浏览器类型 Chrome
     *
     * @return {}
     */
    isChrome : function() {
        return (navigator.userAgent + "").toLowerCase().indexOf("chrome") > -1;
    },
    /**
     * 精确判断浏览器类型 Safari
     *
     * @return {}
     */
    isSafari : function() {
        if (this.isChrome()) {
            return false;
        }
        return (navigator.userAgent + "").toLowerCase().indexOf("safari") > -1;
    },
    init: function (isWarning) {
        this.inputBlur(isWarning);
    }
}

