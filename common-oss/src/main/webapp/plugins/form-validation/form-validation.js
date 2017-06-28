+function ($, ajaxSubmitFn, alertGlobalErrorTipsFn, MSG, FORMRULE, RULE, validationConfig) {
    'use strict';
    var config = {
        // 表单元素拥有这个class，就会自动执行bindFormValidate绑定
        validationFormMarkClass: "v-form",
        // 如果在表单元素上定义了这个属性，则这个表单的验证规则id就是这个的值，否则默认取id
        attrFormRuleId: "v-form-id",
        ajaxFormMarkClass: "ajax-form",
        // ajax提交成功后的回调方法名称
        attrAjaxCallbackFn: "ajax-callback",
        // 额外的验证方法：无参方法，执行时，此方法的scope是当前验证的表单dom对象，返回值：true/false
        attrExtraValidateFn: "extra-validate",
        // 指明错误消息显示的元素选择器，如：一个隐藏的字段是name=pid，而实际上希望把错误提示在一个id=pwd的元素上，则pid元素应该添加属性：v-show-id="#pwd"
        attrShowId: "v-show-id",
        // 指明字段值变更绑定的目标元素选择器，如：一个隐藏的字段是name=pid，而实际上希望把onblur时间绑定在d=pwd的元素上，则pid元素应该添加属性：v-event-id="#pwd"
        attrEventId: "v-event-id",
        // 一个隐藏域实际上它是通过自定义选择器产生的，则应该添加属性：v-input-type="select"
        attrInputType: "v-input-type",
        attrRuleId: "v-rule-id",
        invalidMarkClass: "validation-invalid",
        tooltipInnerTextClass: "tooltip-inner-text",
        /**
         * 表单重置时，所采用的原来的值
         *
         * @type String
         */
        originalValueName: "original-value",
        msgKeys: {
            // 必填错误消息代码
            requiredErrorCode: "common.error.required",
            // 必选错误消息代码
            selectRequiredError: "common.error.required-select",
            // 正则验证失败默认错误消息代码
            regexErrorCode: "common.error.regex",
            // 长度大于maxLength错误消息代码
            maxLengthErrorCode: "common.error.max-length",
            // 长度小于minLength错误消息代码
            minLengthErrorCode: "common.error.min-length",
            // 长度范围错误消息代码
            lengthRangeErrorCode: "common.error.length-range",
            // 长度范围错误（当maxLen和minLen相等时，出错时使用这个消息）
            lengthErrorCode: "common.error.length",
            // 值大于maxVal错误消息代码
            maxValueErrorCode: "common.error.max-value",
            // 值小于minVal错误消息代码
            minValueErrorCode: "common.error.min-value",
            // 值范围错误消息代码
            valueRangeErrorCode: "common.error.value-range",
        }
    };
    if (validationConfig != null && typeof(validationConfig) == "object") {
        for (var p in validationConfig) {
            var propertyValue = validationConfig[p];
            if (typeof(propertyValue) != "function") {
                if ("msgKeys" === p) {
                    if (typeof(propertyValue) == "object") {
                        for (var p2 in propertyValue) {
                            var property2Value = propertyValue[p2];
                            if (typeof(property2Value) != "function") {
                                config.msgKeys[p2] = property2Value;
                            }
                        }
                    }
                } else {
                    config[p] = propertyValue;
                }
            }
        }
    }
    var fn = {
        isNumber: function (obj) {
            if (obj == null || isNaN(obj) || typeof(obj) !== "number") {
                return false;
            } else {
                return true;
            }
        },
        stringTrim: function (str) {
            return str.replace(/(^[\s\r\n]+)/, "").replace(/([\s\r\n]+$)/, "");
        },
        /**
         * 找到这个元素用于提示错误消息的jquery对象，如个这个元素有display-id属性，则去查找这个元素
         */
        findMarkInvalidJqObj: function (jq) {
            if (jq != null && jq.length > 0) {
                var showId = jq.attr(config.attrShowId);
                if (showId != null) {
                    var target = $(showId);
                    if (target.length > 0) {
                        return target;
                    }
                }
            }
            return jq;
        },
        tryTrimInputElementValue: function (jq) {
            if (jq != null && jq.length > 0) {
                var tagName = (jq[0].tagName + "").toUpperCase();
                var inputType = (jq.attr("type") + "").toUpperCase();
                if ((tagName == "INPUT" && (inputType == "TEXT" || inputType == "PASSWORD" || inputType == "EMAIL"))
                    || tagName == "TEXTAREA") {
                    var val = jq.val();
                    if (val != null) {
                        jq.val(this.stringTrim((val + "")));
                    }
                }
            }
        },
        buildTooltipHtml: function (textInfo) {
            return "<div class='"
                + (config.tooltipInnerTextClass != null ? config.tooltipInnerTextClass : "")
                + " auto_dian' style='color:#ffffff;text-align:left;' id='"
                + ("tip-id-" + Math.random()).replace(".", "") + "' title='"
                + textInfo + "'>" + textInfo + "</div> ";
        },
        buildTooltip: function (element, textInfo, isManual, placement) {
            var bs_tooltip = element.data("bs.tooltip");
            var tipJq = bs_tooltip != null ? bs_tooltip.$tip : null;
            if (tipJq != null && tipJq.length > 0) {
                element.data("bs.tooltip").options.title = this.buildTooltipHtml(textInfo);
                tipJq.find("." + config.tooltipInnerTextClass).html(textInfo);
            } else {
                var _placement = "right";
                if (placement != null) {
                    if (placement === "left" || placement === "top"
                        || placement === "bottom" || placement === "right") {
                        _placement = placement;
                    }
                }
                var conf = {
                    html: true,
                    title: this.buildTooltipHtml(textInfo),
                    placement: _placement
                };
                if (isManual == null || isManual === true) {
                    conf.trigger = "manual";
                }
                element.tooltip(conf);
            }
        },
        showRuleTipInfo: function (jq, info) {
            var placeholder = jq.attr("placeholder");
            if (placeholder == null || placeholder == "") {
                jq.attr("placeholder", info);
            }
        },
        getFormRuleId: function (formJq) {
            if (formJq != null && formJq.length > 0) {
                return formJq.attr(config.attrFormRuleId) || formJq.attr("id");
            }
            return null;
        },
        isRuleObject: function (ruleObj) {
            if (ruleObj != null && typeof(ruleObj) == "object") {
                var req = ruleObj["req"];
                var name = ruleObj["name"];
                return (req != null && (req === true || req === false)) && (name != null && typeof(name) == "string" && this.stringTrim(name).length > 0);
            } else {
                return false;
            }
        }
    }
    /**
     * 标记元素级错误信息
     */
    $.fn.markInvalid = function (error, _isAutoHide, placement) {
        var isAutoHide = false;
        if (_isAutoHide != null && (typeof(_isAutoHide) === "boolean")) {
            isAutoHide = _isAutoHide;
        }
        var _markInvalid = function (element, error) {
            error = error + "";
            var tip = null;
            element.addClass(config.invalidMarkClass);
            // element.tooltip("destroy");
            fn.buildTooltip(element, error, (!isAutoHide), placement);
            element.tooltip("show");
            tip = element.data("bs.tooltip").$tip;
            tip.removeClass("tooltip-error");
            tip.addClass("tooltip-error");
        };
        this.each(function () {
            var ele = $(this);
            if ((ele.css("display") + "").toLowerCase() != "none") {
                _markInvalid(ele, error);
            } else {
                alertGlobalErrorTipsFn(error);
            }
        })
    };
    /**
     * 清除标记元素级错误信息
     */
    $.fn.clearInvalid = function () {
        var _clearInvalid = function (element) {
            element.tooltip("destroy");
            element.removeClass(config.invalidMarkClass);
            var tip = element.data("bs.tooltip") != null ? element
                .data("bs.tooltip").$tip : null;
            if (tip != null) {
                tip.removeClass("tooltip-error");
            }
        };
        this.each(function () {
            _clearInvalid($(this));
        })
    };
    /**
     * 标记输入元素级错误信息
     */
    $.fn.fieldMarkInvalid = function (error) {
        this.each(function () {
            fn.findMarkInvalidJqObj($(this)).markInvalid(error);
        })
    };
    /**
     * 清除输入标记元素级错误信息
     */
    $.fn.fieldClearInvalid = function () {
        this.each(function () {
            fn.findMarkInvalidJqObj($(this)).clearInvalid();
        })
    };

    /**
     * 用于form清除所有的markInvalid()标记
     */
    $.fn.clearAllInvalid = function () {
        this.each(function () {
            var ele = $(this);
            if (ele.length > 0) {
                ele.clearInvalid();
                ele.find("." + config.invalidMarkClass).clearInvalid();
            }
        })
    };
    /**
     * 每个field的验证方法（验证并标记错误）
     * @param _ruleId 验证规则id或者验证规则对象（可选：默认使用validation-rule-id对应的值作为ruleId）
     * @returns {boolean}
     */
    $.fn.isFieldValid = function (_ruleIdOrRuleObj) {
        var $this = this;
        var cr = fn.isRuleObject(_ruleIdOrRuleObj) ? _ruleIdOrRuleObj : null;
        if (cr == null) {
            var ruleKey = (_ruleIdOrRuleObj != null && typeof(_ruleIdOrRuleObj) != "string") ? _ruleIdOrRuleObj : null;
            if (ruleKey == null && $this.length > 0) {
                ruleKey = $this.attr(config.attrRuleId);
            }
            cr = RULE.find(ruleKey);
        }
        if (cr == null || typeof(cr) != "object") {
            throw new Error("isFieldValid.ValidationRule must not be null.");
        }
        var flag = 1;
        var showName = MSG.find(cr.showName) || cr.name;
        if ($this.length <= 0) {
            // 元素就不存在了
            alertGlobalErrorTipsFn(MSG.find(config.msgKeys.requiredErrorCode, showName));
            return false;
        }
        var regexVal = cr.regex;
        var regexErrVal = null;
        if (regexVal != null) {
            if (!(regexVal  instanceof RegExp)) {
                // ValidationRule中的regex属性，还是字符串，则需要把他初始化成RegExp对象
                regexVal = new RegExp(regexVal);
                cr.regex = regexVal; // 并缓存起来，提高效率
            }
            regexErrVal = MSG.find((cr.err || config.msgKeys.regexErrorCode), showName);
        }
        var nullVal = "";
        var hasLenRule = fn.isNumber(cr.minLen) || fn.isNumber(cr.maxLen);
        var hasRegex = regexVal != null;
        var hasValRule = fn.isNumber(cr.minVal) || fn.isNumber(cr.maxVal);
        var _isFieldValid = function (jq, allJq) {
            var rs = 1;
            var dom = jq[0];
            var tagName = (dom.tagName + "").toUpperCase();
            if (cr.trim) {
                jq.each(function () {
                    fn.tryTrimInputElementValue($(this));
                })
            }
            var val = jq.val();
            var isReqErr = false;
            var isNull = (val == null || val == nullVal);
            var inputType = (jq.attr("type") + "").toUpperCase();
            var inputType2 = (jq.attr(config.attrInputType) + "").toUpperCase();
            if (cr.req) {
                if (((tagName == "INPUT" && inputType == "CHECKBOX" ) || inputType2 == "CHECKBOX")) {
                    var checkedCount = 0;
                    if ($(jq[0]).prop("checked")) {
                        checkedCount++;
                    }
                    var allCheckboxJq = allJq;
                    allCheckboxJq.each(function () {
                        if (this != dom && $(this).prop("checked")) {
                            checkedCount++;
                        }
                    });
                    console.log("checkedCount:" + checkedCount)
                    if (checkedCount <= 0 || val == null || val == nullVal) {
                        isReqErr = true;
                        jq.fieldMarkInvalid(MSG.find(config.msgKeys.selectRequiredError, showName));
                    }

                } else {
                    if (val == null || val == nullVal) {
                        isReqErr = true;
                        jq
                            .fieldMarkInvalid((tagName == "SELECT" || inputType2 == "SELECT")
                                ? MSG.find(config.msgKeys.selectRequiredError, showName)
                                : MSG.find(config.msgKeys.requiredErrorCode, showName));
                    }
                }
            }
            /* 1:minLen/maxLen;2:minLen,3:maxLen */
            var isLenErr = 0;
            if (!isNull && !isReqErr) {
                // 没有发生必填错误，则进行长度验证
                if (hasLenRule) {
                    if (fn.isNumber(cr.minLen) && fn.isNumber(cr.maxLen)) {
                        if (val.length < cr.minLen || val.length > cr.maxLen) {
                            isLenErr = 1;
                            if (cr.minLen === cr.maxLen) {
                                jq.fieldMarkInvalid(MSG.find(config.msgKeys.lengthErrorCode, showName, cr.minLen));
                            } else {
                                jq.fieldMarkInvalid(MSG.find(config.msgKeys.lengthRangeErrorCode, showName, cr.minLen, cr.maxLen));
                            }
                        }
                    } else if (fn.isNumber(cr.minLen)) {
                        if (val.length < cr.minLen) {
                            isLenErr = 2;
                            jq.fieldMarkInvalid(MSG.find(config.msgKeys.minLengthErrorCode, showName, cr.minLen));
                        }
                    } else if (fn.isNumber(cr.maxLen)) {
                        if (val.length > cr.maxLen) {
                            isLenErr = 3;
                            jq.fieldMarkInvalid(MSG.find(config.msgKeys.maxLengthErrorCode, showName, cr.maxLen));
                        }
                    }
                }
            }
            var isRegexErr = false;
            if (!isNull && (!isReqErr) && isLenErr === 0) {
                // 没有发生长度验证错误，则进行正则验证
                if (hasRegex) {
                    if (!regexVal.test(val)) {
                        // 正则验证失败
                        isRegexErr = true;
                        jq.fieldMarkInvalid(regexErrVal);
                    }
                }
            }
            /* 1:minVal/maxVal;2:minVal,3:maxVal */
            var isValErr = 0;
            if (!isNull && (!isReqErr) && isLenErr === 0 && (!isRegexErr)) {
                // 没有发生正则验证错误，则进行值验证验证
                if (hasValRule) {
                    var numberVal = val * 1;
                    if (fn.isNumber(cr.minVal) && fn.isNumber(cr.maxVal)) {
                        if ((!fn.isNumber(numberVal))
                            || numberVal < cr.minVal
                            || numberVal > cr.maxVal) {
                            isValErr = 1;
                            jq.fieldMarkInvalid(MSG.find(config.msgKeys.valueRangeErrorCode, showName, cr.minVal, cr.maxVal));
                        }
                    } else if (fn.isNumber(cr.minVal)) {
                        if ((!fn.isNumber(numberVal))
                            || numberVal < cr.minVal) {
                            isValErr = 2;
                            jq.fieldMarkInvalid(MSG.find(config.msgKeys.minValueErrorCode, showName, cr.minVal));
                        }
                    } else if (fn.isNumber(cr.maxVal)) {
                        if ((!fn.isNumber(numberVal))
                            || numberVal > cr.maxVal) {
                            isValErr = 3;
                            jq.fieldMarkInvalid(MSG.find(config.msgKeys.maxValueErrorCode, showName, cr.maxVal));
                        }
                    }
                }
            }
            if (isReqErr === false && isLenErr === 0 && isRegexErr === false
                && isValErr === 0) {
                // 全部验证规则都通过，则取消掉错误提示
                jq.fieldClearInvalid();
            } else {
                rs = 0;
            }
            return rs;
        }
        if ($this.length > 1) {
            var tagName = ($this[0].tagName + "").toUpperCase();
            var inputType = ($this.attr("type") + "").toUpperCase();
            var inputType2 = ($this.attr(config.attrInputType) + "").toUpperCase();
            if ((tagName == "INPUT" && inputType == "CHECKBOX")
                || inputType2 == "CHECKBOX") {
                flag = _isFieldValid($this, $this);
            }
            else {
                $this.each(function () {
                    flag *= _isFieldValid($(this), $this);
                });
            }
        } else {
            flag = _isFieldValid($this, $this);
        }
        return flag != 0;
    }
    /**
     * 仅对form元素有效，只支持第一个元素，调用每一个field的fieldValidate方法
     *
     * @return true:验证通过、false:验证失败
     */
    $.fn.isFormValid = function () {
        var element = this;
        if (element.length > 0) {
            try {
                var dom = element[0];
                element = $(dom);
                var tagName = (dom.tagName + "").toUpperCase();
                if ("FORM" !== tagName) {
                    throw new Error("isFormValid is not supported for tagName=" + tagName.toLowerCase);
                }
                var f = 1;
                var extraValidateResult = true;
                {
                    var extraValidateFn = null;
                    var extraValidateFnName = element.attr(config.attrExtraValidateFn);
                    if (extraValidateFnName != null) {
                        try {
                            eval("extraValidateFn="
                                + extraValidateFnName);
                        } catch (e) {
                        }
                    }
                    if (extraValidateFn != null && typeof(extraValidateFn) == "function") {
                        extraValidateResult = extraValidateFn.call(dom); // 额外的验证方法的scope是当前验证的表单dom对象
                    }
                }
                // 只对Form元素有效
                var formRuleId = fn.getFormRuleId(element);
                var ruleIds = FORMRULE.find(formRuleId);
                if (ruleIds != null && ruleIds instanceof Array) {
                    for (var i = 0; i < ruleIds.length; i++) {
                        var ruleId = ruleIds[i];
                        var cr = RULE.find(ruleId);
                        var fieldName = (cr != null ? cr.name : null);
                        if (!element.find("*[name='" + fieldName + "']").isFieldValid(cr)) {
                            f *= 0;
                        }
                    }
                }
                return extraValidateResult && (f != 0);
            } catch (e) {
                throw e;
            }
        }
        return false;
    };
    /**
     * 仅对form元素有效，只支持第一个元素
     *
     * @return 如果验证通过：true；否则：false；如果是ajax表单无论是否验证通过，都返回false（如果验证通过内部会调用ajax提交方法提交表单）
     */
    $.fn.validateAndSubmit = function ($event) {
        var element = $(this[0]);
        var dom = element[0];
        var tagName = (dom.tagName + "").toUpperCase();
        if ("FORM" !== tagName) {
            throw new Error("validateAndSubmit is not supported for tagName=" + tagName.toLowerCase);
        }
        var isFormValid = element.isFormValid();
        if (isFormValid !== true) {
            // 验证不通过，直接返回false（拒绝非ajax表单直接提交）
            return false;
        }
        // 用于标记不直接刷新提交的表达
        var isAjaxForm = element.hasClass(config.ajaxFormMarkClass);
        if (isAjaxForm) {
            // 用于标记，不要使用ajax直接提交（可能要手动组织提交数据）
            var ajaxCallbackFn = null;
            var ajaxCallbackFnName = element.attr(config.attrAjaxCallbackFn);
            if (ajaxCallbackFnName != null) {
                try {
                    eval("ajaxCallbackFn="
                        + ajaxCallbackFnName);
                } catch (e) {
                }
            }
            var ajaxSubmitOption = {};
            if (ajaxCallbackFn != null
                && typeof(ajaxCallbackFn) == "function") {
                ajaxSubmitOption.scope = dom;
                ajaxSubmitOption.callback = ajaxCallbackFn;
            }
            // 调用ajax异步提交方法，执行提交
            ajaxSubmitFn(dom, ajaxSubmitOption);
            // 只要是ajax表单，一定返回false，拒绝表单直接提交
            return false;
        } else {
            // 非ajax表单，验证已通过返回true，允许表单刷新提交
            return true;
        }
    };
    /**
     * 给输入字段绑定onblur事件进行验证
     * 支持jquery选择多个元素执行
     */
    $.fn.bindFieldValidateOnBlur = function (_ruleIdOrRuleObj) {
        var $this = this;
        if ($this.length <= 0) {
            return;
        }
        var cr = fn.isRuleObject(_ruleIdOrRuleObj) ? _ruleIdOrRuleObj : null;
        var ruleKey = null;
        if (cr == null) {
            ruleKey = (_ruleIdOrRuleObj != null && typeof(_ruleIdOrRuleObj) != "string") ? _ruleIdOrRuleObj : null;
            if (ruleKey == null && $this.length > 0) {
                ruleKey = $this.attr(config.attrRuleId);
            }
            cr = RULE.find(ruleKey);
        }
        if (cr == null || typeof(cr) != "object") {
            throw new Error("bindFieldValidateOnBlur.ValidationRule must not be null.");
        }
        if (ruleKey != null && $this.attr(config.attrRuleId) == null) {
            $this.attr(config.attrRuleId, ruleKey);
        }
        if (cr.info != null && cr.info !== "") {
            // 需要预先提示
            var showName = MSG.find(cr.showName) || cr.name;
            fn.showRuleTipInfo($this, MSG.find(cr.info, showName));
        }
        var tagName = ($this[0].tagName + "").toUpperCase();
        var inputType = (($this.attr("type") || $this.attr(config.attrInputType) ) + "").toUpperCase();
        var _event = "blur";
        var isCheckbox = false;
        if (tagName == "INPUT") {
            if (inputType == "FILE") {
                _event = "change";
            } else if (inputType == "CHECKBOX") {
                isCheckbox = true;
                _event = "change";
            } else if ((inputType == "TEXT" || inputType == "PASSWORD" || inputType == "EMAIL") && fn.isNumber(cr.maxLen) && cr.maxLen > 0) {
                $this.attr("maxlength", cr.maxLen);
            }
        } else if (tagName == "TEXTAREA" && fn.isNumber(cr.maxLen) && cr.maxLen > 0) {
            $this.attr("maxlength", cr.maxLen);
        }
        var eventJq = $this;
        var eventId = $this.attr(config.attrEventId);
        if (eventId != null) {
            eventJq = $(eventId);
            eventJq = eventJq.length > 0 ? eventJq : $this;
        }
        if (isCheckbox) {
            eventJq.bind(_event, function () {
                $this.isFieldValid(cr);
            });
        } else {
            eventJq.bind(_event, function () {
                $this.isFieldValid(cr);
            });
        }
    }
    /**
     * 仅对form元素有效，用于绑定提交时，进行自动验证
     * 支持jquery选择多个元素执行
     * @param _formRuleId（可选参数）
     */
    $.fn.bindFormValidate = function (_formRuleId) {
        var $this = this;
        var _formBind = function (element, __formRuleId) {
            var dom = element[0];
            var tagName = (dom.tagName + "").toUpperCase();
            if ("FORM" !== tagName) {
                // 只对Form元素有效
                throw new Error("bindFormValidate is not supported for tagName=" + tagName.toLowerCase);
            }
            var formRuleId = null;
            if (__formRuleId != null && typeof(__formRuleId) == "string") {
                formRuleId = __formRuleId;
            } else {
                formRuleId = fn.getFormRuleId(element);
            }
            if (formRuleId == null) {
                throw new Error("bindFormValidate.formRuleId must not be null.");
            }
            var ruleIds = FORMRULE.find(formRuleId);
            if (ruleIds == null) {
                throw new Error("bindFormValidate cannot find rules for formRuleId=" + formRuleId);
            }
            if (ruleIds != null && ruleIds instanceof Array) {
                for (var i = 0; i < ruleIds.length; i++) {
                    var ruleId = ruleIds[i];
                    var cr = RULE.find(ruleId);
                    var fieldName = (cr != null ? cr.name : null);
                    var fieldJq = element.find("*[name='" + fieldName + "']");
                    fieldJq.attr(config.attrRuleId, ruleId);
                    fieldJq.bindFieldValidateOnBlur(cr);
                }
            }
        };
        $this.each(function () {
            _formBind($(this), _formRuleId);
        });
        $this.bind("reset", function () {
            // reset的时候清除所用markInvalid标记
            var formJq = $(this);
            formJq.clearAllInvalid();
            formJq.find("input:hidden").each(function () {
                var hid = $(this);
                var originalValue = hid.attr(config.originalValueName);
                if (originalValue != null) {
                    hid.val(originalValue);
                }
            });
            formJq.find("*[" + config.originalValueName + "]").each(
                function () {
                    var input = $(this);
                    var originalValue = input
                        .attr(config.originalValueName);
                    if (originalValue != null) {
                        this.value = originalValue;
                        this.defaultValue = originalValue;
                        setTimeout(function () {
                            input.val(originalValue);
                        }, 10)
                    }
                });
        });
        $this.bind("submit", function ($event) {
            // 如果验证通过：true；否则：false；如果是ajax表单无论是否验证通过，都返回false（如果验证通过内部会调用ajax提交方法提交表单）
            return $(this).validateAndSubmit($event);
        });
    };
    $(document).ready(function () {
        $("form input:hidden").each(function () {
            var hid = $(this);
            if (hid.attr(config.originalValueName) == null) {
                hid.attr(config.originalValueName, hid.val());
            }
        });
        $("form." + config.validationFormMarkClass).bindFormValidate();
        $("form." + config.ajaxFormMarkClass).bind("submit", function () {
            // 绝对禁止ajax表单刷新提交
            return false;
        });
        $(window).bind("resize", function () {
            setTimeout(function () {
                $(".tooltip").each(function () {
                    $(this).prev().tooltip("show"); // 让已经显示的tooltip重新定位
                });
            }, 1);
        });
    });
}
(window.jQuery,
    // 异步提交的方法
    function () {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        window.util.ajaxSubmit.apply(window.util, args);
    },
    // 发出全局错误提示的方法
    function () {
        var args = [];
        for (var i = 0; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        window.tips.err.apply(window.tips, args);
    },
    // message的ResourceBundle对象
    window["MSG"],
    // 表单规则的ResourceBundle对象
    window["FORM_RULE"],
    // 字段验证规则ResourceBundle对象
    window["RULE"],
    // 验证配置：validationConfig（可选）
    null);