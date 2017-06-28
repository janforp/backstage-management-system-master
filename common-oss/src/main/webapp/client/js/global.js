(function (window, $, PG, MSG) {
    var cmp = {
        // 年月日选择
        format_yyyy_MM_dd: "YYYY-MM-DD",
        // 年月日 时分选择
        format_yyyy_MM_dd$HH_mm: "YYYY-MM-DD HH:mm",
        // 年月日 时分秒选择
        format_yyyy_MM_dd$HH_mm_ss: "YYYY-MM-DD HH:mm:ss",
        // 年月日选择
        util_format_yyyy_MM_dd: "yyyy-MM-dd",
        // 年月日 时分选择
        util_format_yyyy_MM_dd$HH_mm: "yyyy-MM-dd HH:mm",
        // 年月日 时分秒选择
        util_format_yyyy_MM_dd$HH_mm_ss: "yyyy-MM-dd HH:mm:ss",
        buttonClasses: ['btn', 'btn-xs'],
        separator: " ~ ",
        locale: {
            applyLabel: '确定',
            cancelLabel: '清除',
            fromLabel: '从',
            toLabel: '到',
            weekLabel: '星期',
            customRangeLabel: '自定义',
            daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月",
                "10月", "11月", "12月"],
            firstDay: 1
        }
    };
    window.cmp = cmp;
    cmp.bindEvent = function (jq, utilFormat) {
        var $this = $(jq);
        var hasValueProperty = $this[0].hasOwnProperty("value");
        var $cmpDatepickerBox = $this.parents(".cmp-datepicker:eq(0)");
        var $valueInput = $cmpDatepickerBox.find("input.valueInput");
        var clearFn = function () {
            $valueInput.val("");
            if (hasValueProperty) {
                $this.val("");
            } else {
                $this.html("");
            }
        };
        $cmpDatepickerBox.find(".clearBtn").on("click", clearFn);
        $this.on('cancel.daterangepicker', clearFn);
        if (util.isJqHasDom($valueInput)) {
            $valueInput.each(function () {
                var $ths = $(this);
                if ($ths.val() == null || $ths.val() === "") {
                    return;
                }
                var role = $ths.attr("role");
                if (role == null || role === "dateValue") {
                    if (hasValueProperty) {
                        $this.val(util.date.format(
                            new Date($ths.val() * 1), utilFormat));
                    } else {
                        $this.html(util.date.format(
                            new Date($ths.val() * 1), utilFormat));
                    }
                } else {
                    if (role === "startDate") {
                        if (hasValueProperty) {
                            $this.val(util.date.format(new Date($ths.val()
                                    * 1), utilFormat)
                                + cmp.separator);
                        } else {
                            $this.html(util.date.format(new Date($ths.val()
                                    * 1), utilFormat)
                                + cmp.separator);
                        }
                    } else if (role === "endDate") {
                        if (hasValueProperty) {
                            $this.val($this.val()
                                + util.date.format(new Date($ths.val()
                                    * 1), utilFormat));
                        } else {
                            $this.html($this.html()
                                + util.date.format(new Date($ths.val()
                                    * 1), utilFormat));
                        }
                    }
                }
            });

            $this.on('apply.daterangepicker', function (ev, picker) {
                var role = $valueInput.attr("role");
                if ($valueInput.length == 1
                    && (role == null || role === "dateValue")) {
                    $valueInput.val(picker.startDate._d.getTime());
                } else {
                    if (role === "startDate" || role === "endDate") {
                        $valueInput.each(function () {
                            var $ths = $(this);
                            role = $ths.attr("role");
                            if (role === "startDate") {
                                $ths.val(picker.startDate._d
                                    .getTime());
                            } else if (role === "endDate") {
                                $ths.val(picker.endDate._d
                                    .getTime());
                            }
                        });
                    }
                }
            });
        }

    }
    cmp.dateBind = function (jq) {
        var $this = $(jq);
        $this.daterangepicker({
            startDate: new Date(),
            buttonClasses: cmp.buttonClasses,
            locale: cmp.locale,
            // 是否可以选择月份/年份，否则就只能一个一个点
            // showDropdowns : true,
            // showWeekNumbers : true,
            singleDatePicker: true,
            format: cmp.format_yyyy_MM_dd
        });
        $this.prop("readonly", true);
        cmp.bindEvent($this, cmp.util_format_yyyy_MM_dd);
    }
// daterangepicker
    cmp.dateRangeBind = function (jq) {
        var $this = $(jq);
        var op = {
            buttonClasses: cmp.buttonClasses,
            locale: cmp.locale,
            separator: cmp.separator,
            // 是否可以选择月份/年份，否则就只能一个一个点
            // showDropdowns : true,
            // showWeekNumbers : true,
            format: cmp.format_yyyy_MM_dd
        };
        if ($this.hasClass("data-max-now")) {
            op.maxDate = new Date();
        } else if ($this.hasClass("data-max-tomorrow")) {
            var now = new Date();
            now.setDate(now.getDate() + 1);
            op.maxDate = now;
        } else if ($this.hasClass("data-min-now")) {
            op.minDate = new Date();
        } else if ($this.hasClass("data-min-yesterday")) {
            var now = new Date();
            now.setDate(now.getDate() - 1);
            op.minDate = now;
        }
        $this.daterangepicker(op);
        $this.prop("readonly", true);
        cmp.bindEvent($this, cmp.util_format_yyyy_MM_dd);
    };
    cmp.dateRangeTimeBind = function (jq) {
        var $this = $(jq);
        var op = {
            buttonClasses: cmp.buttonClasses,
            locale: cmp.locale,
            separator: cmp.separator,
            // singleDatePicker : true,
            timePicker: true,
            timePicker12Hour: false,
            timePickerIncrement: 1,
            // 是否可以选择月份/年份，否则就只能一个一个点
            // showDropdowns : true,
            // showWeekNumbers : true,
            format: cmp.format_yyyy_MM_dd$HH_mm_ss
        };
        if ($this.hasClass("data-max-now")) {
            op.maxDate = new Date();
        } else if ($this.hasClass("data-max-tomorrow")) {
            var now = new Date();
            now.setDate(now.getDate() + 1);
            op.maxDate = now;
        } else if ($this.hasClass("data-min-now")) {
            op.minDate = new Date();
        } else if ($this.hasClass("data-min-yesterday")) {
            var now = new Date();
            now.setDate(now.getDate() - 1);
            op.minDate = now;
        }
        $this.daterangepicker(op);
        $this.prop("readonly", true);
        cmp.bindEvent($this, cmp.util_format_yyyy_MM_dd);
    };
    cmp.dateTimeBind = function (jq) {
        var $this = $(jq);
        $this.daterangepicker({
            startDate: new Date,
            buttonClasses: cmp.buttonClasses,
            locale: cmp.locale,

            // 是否可以选择月份/年份，否则就只能一个一个点
            // showDropdowns : true,
            // showWeekNumbers : true,
            singleDatePicker: true,
            format: cmp.format_yyyy_MM_dd$HH_mm,
            timePicker: true,
            timePicker12Hour: false,
            timePickerIncrement: 1
        });
        $this.prop("readonly", true);
        cmp.bindEvent($this, cmp.util_format_yyyy_MM_dd$HH_mm);
    };
    cmp.dateTimeSsBind = function (jq) {
        var $this = $(jq);
        $this.daterangepicker({
            startDate: new Date(),
            buttonClasses: cmp.buttonClasses,
            locale: cmp.locale,
            // 是否可以选择月份/年份，否则就只能一个一个点
            // showDropdowns : true,
            // showWeekNumbers : true,
            singleDatePicker: true,
            format: cmp.format_yyyy_MM_dd$HH_mm_ss,
            timePicker: true,
            timePicker12Hour: false,
            timePickerIncrement: 1
        });
        $this.prop("readonly", true);
        cmp.bindEvent($this, cmp.util_format_yyyy_MM_dd$HH_mm_ss);
    };
    cmp.numberInputBind = function (jq) {
        var $this = $(jq);
        var $numberVal = $this.find(".number-val");
        var val = null;
        var getMin = function () {
            var minStr = $this.attr("data-min");
            if (util.isNum(minStr)) {
                return minStr * 1;
            }
            return null;
        }
        var getMax = function () {
            var maxStr = $this.attr("data-max");
            if (util.isNum(maxStr)) {
                return maxStr * 1;
            }
            return null;
        }
        var min = getMin();
        var max = getMax();
        {
            var valStr = $numberVal.val();
            if (util.isNum(valStr)) {
                val = valStr * 1;
            }
            if (val != null) {
                if (min != null && val < min) {
                    val = min;
                }
                if (max != null && val > max) {
                    val = max;
                }
            }
        }
        if (val == null) {
            $numberVal.val("");
        } else {
            $numberVal.val(val);
        }
        var minus = function () {
            var _min = getMin();
            var _val = _min;
            if (_val == null) {
                _val = 0;
            }
            var valStr = $numberVal.val();
            if (valStr == "") {
                $numberVal.val(_val);
                return;
            }
            if (util.isNum(valStr)) {
                _val = valStr * 1;
            }
            if (_min != null && (_val - 1) < _min) {
                _val = _min;
            } else {
                _val--;
            }
            $numberVal.val(_val);
        };
        var add = function () {
            var _min = getMin();
            var _max = getMax();
            var _val = _min;
            if (_val == null) {
                _val = 0;
            }
            var valStr = $numberVal.val();
            if (valStr == "") {
                $numberVal.val(_val);
                return;
            }
            if (util.isNum(valStr)) {
                _val = valStr * 1;
            }
            if (_max != null && (_val + 1) > _max) {
                _val = _max;
            } else {
                _val++;
            }
            $numberVal.val(_val);
        };
        $this.find(".btn-minus").bind("click", minus);
        $this.find(".btn-add").bind("click", add);
    };
    cmp.linkWithParamBind = function (jq) {
        var $this = $(jq);
        var paramName = $this.attr("data-param-name");
        var paramSelector = $this.attr("data-param-selector");
        var requestUrl = $this.attr("data-url");
        var isMulti = $this.attr("data-is-multi");
        var rowName = $this.attr("data-row-name") || MSG.find("txt.row");
        var buttonText = $this.html();
        if (buttonText != null && buttonText.indexOf("<") != -1 && buttonText.indexOf(">") != -1) {
            // 替换html 标签
            buttonText = buttonText.replace(/<[\s\S]+?>/g, "");
        }
        if (paramName == null) {
            throw new Error("\"" + buttonText + "\"按钮没有定义：data-param-name");
        }
        if (paramSelector == null) {
            throw new Error("\"" + buttonText + "\"按钮没有定义：data-param-name");
        }
        if (requestUrl == null) {
            throw new Error("\"" + buttonText + "\"按钮没有定义：data-url");
        }
        if (isMulti != null && isMulti == "true") {
            isMulti = true;
        } else {
            isMulti = false;
        }
        requestUrl = util.url(requestUrl);
        $this.on("click", function () {
            var $paramValueJq = $(paramSelector);
            if ($paramValueJq.length <= 0) {
                // 一个都没有，则给出提示
                tips.err(MSG.find("common.error.required-select", rowName));
                return false;
            }
            if (!isMulti && $paramValueJq.length > 1) {
                // 不允许多选
                // 但选择了多个
                tips.err(MSG.find("common.error.single.checkbox", rowName));
                return false;
            }
            var paramEntryArray = [];
            $paramValueJq.each(function (index) {
                paramEntryArray.push(paramName + "=" + $(this).val());
            });
            var paramStr = paramEntryArray.join("&");
            var wenhaoIndex = requestUrl.indexOf("?");
            if (wenhaoIndex == -1) {
                requestUrl = requestUrl + "?" + paramStr;
            } else {
                if (wenhaoIndex == requestUrl.length - 1) {
                    // ?在最后
                    requestUrl = requestUrl + "?" + paramStr;
                } else {
                    // 有其他参数
                    requestUrl = requestUrl + "&" + paramStr;
                }
            }
            location.href = requestUrl;
            return true;
        });
    }
    cmp.rowDeleteBtnBind = function (jq) {
        var $this = $(jq);
        var paramName = $this.attr("data-param-name");
        var paramSelector = $this.attr("data-param-selector");
        var ajaxCallback = $this.attr("data-callback");
        var requestUrl = $this.attr("data-url");
        var maskSelector = $this.attr("data-mask-selector");
        var rowName = $this.attr("data-row-name") || MSG.find("txt.row");
        var buttonText = $this.html();
        if (buttonText != null && buttonText.indexOf("<") != -1 && buttonText.indexOf(">") != -1) {
            // 替换html 标签
            buttonText = buttonText.replace(/<[\s\S]+?>/g, "");
        }
        if (paramName == null) {
            throw new Error("\"" + buttonText + "\"按钮没有定义：data-param-name");
        }
        if (paramSelector == null) {
            throw new Error("\"" + buttonText + "\"按钮没有定义：data-param-name");
        }
        if (requestUrl == null) {
            throw new Error("\"" + buttonText + "\"按钮没有定义：data-url");
        }
        var ajaxCallbackFn = null;
        if (ajaxCallback != null && ajaxCallback != "") {
            ajaxCallbackFn = eval(ajaxCallback);
        }
        var maskJq = maskSelector != null ? $(maskSelector) : null;
        if (maskJq == null || maskJq.length <= 0) {
            maskJq = $(".main-bd");
            if (maskJq.length <= 0) {
                maskJq = $("html");
            }
        }
        requestUrl = util.url(requestUrl);
        $this.on("click", function () {
            var $paramValueJq = $(paramSelector);
            if ($paramValueJq.length <= 0) {
                // 一个都没有，则给出提示
                tips.err(MSG.find("common.error.required-select", rowName));
                return false;
            }
            var paramEntryArray = [];
            $paramValueJq.each(function (index) {
                paramEntryArray.push(paramName + "=" + $(this).val());
            });
            var paramStr = paramEntryArray.join("&");
            util.rowDeleteConfirm(function () {
                util.ajax(requestUrl, paramStr, function (json) {
                    util.unmask(maskJq);
                    if (!json.success) {
                        tips.err(util.getJsonErrorMsg(json));
                    }
                    ajaxCallbackFn(json);
                }, function () {
                    util.unmask(maskJq);
                });
                util.loading(maskJq);
            });
            return false;
        });
    }
    cmp.rowUpdateStatusBtnBind = function (jq) {
        var $this = $(jq);
        var paramName = $this.attr("data-param-name");
        var paramSelector = $this.attr("data-param-selector");
        var ajaxCallback = $this.attr("data-callback");
        var requestUrl = $this.attr("data-url");
        var maskSelector = $this.attr("data-mask-selector");
        var rowName = $this.attr("data-row-name") || MSG.find("txt.row");
        var buttonText = $this.html();
        if (buttonText != null && buttonText.indexOf("<") != -1 && buttonText.indexOf(">") != -1) {
            // 替换html 标签
            buttonText = buttonText.replace(/<[\s\S]+?>/g, "");
        }
        if (paramName == null) {
            throw new Error("\"" + buttonText + "\"按钮没有定义：data-param-name");
        }
        if (paramSelector == null) {
            throw new Error("\"" + buttonText + "\"按钮没有定义：data-param-name");
        }
        if (requestUrl == null) {
            throw new Error("\"" + buttonText + "\"按钮没有定义：data-url");
        }
        var ajaxCallbackFn = null;
        if (ajaxCallback != null && ajaxCallback != "") {
            ajaxCallbackFn = eval(ajaxCallback);
        }
        var maskJq = maskSelector != null ? $(maskSelector) : null;
        if (maskJq == null || maskJq.length <= 0) {
            maskJq = $(".main-bd");
            if (maskJq.length <= 0) {
                maskJq = $("html");
            }
        }
        requestUrl = util.url(requestUrl);
        $this.on("click", function () {
            var $paramValueJq = $(paramSelector);
            if ($paramValueJq.length <= 0) {
                // 一个都没有，则给出提示
                tips.err(MSG.find("common.error.required-select", rowName));
                return false;
            }
            var paramEntryArray = [];
            $paramValueJq.each(function (index) {
                paramEntryArray.push(paramName + "=" + $(this).val());
            });
            var paramStr = paramEntryArray.join("&");
            util.ajax(requestUrl, paramStr, function (json) {
                util.unmask(maskJq);
                if (!json.success) {
                    tips.err(util.getJsonErrorMsg(json));
                }
                ajaxCallbackFn(json);
            }, function () {
                util.unmask(maskJq);
            });
            util.loading(maskJq);
            return false;
        });
    }
    cmp.rowEditBtnBind = function (jq) {
        var $this = $(jq);
        var paramName = $this.attr("data-param-name");
        var paramSelector = $this.attr("data-param-selector");
        var ajaxCallback = $this.attr("data-callback");
        var requestUrl = $this.attr("data-url");
        var maskSelector = $this.attr("data-mask-selector");
        var rowName = $this.attr("data-row-name") || MSG.find("txt.row");
        var buttonText = $this.html();
        if (buttonText != null && buttonText.indexOf("<") != -1 && buttonText.indexOf(">") != -1) {
            // 替换html 标签
            buttonText = buttonText.replace(/<[\s\S]+?>/g, "");
        }
        if (paramName == null) {
            throw new Error("\"" + buttonText + "\"按钮没有定义：data-param-name");
        }
        if (paramSelector == null) {
            throw new Error("\"" + buttonText + "\"按钮没有定义：data-param-name");
        }
        if (requestUrl == null) {
            throw new Error("\"" + buttonText + "\"按钮没有定义：data-url");
        }
        var ajaxCallbackFn = null;
        if (ajaxCallback != null && ajaxCallback != "") {
            ajaxCallbackFn = eval(ajaxCallback);
        }
        var maskJq = maskSelector != null ? $(maskSelector) : null;
        if (maskJq == null || maskJq.length <= 0) {
            maskJq = $(".main-bd");
            if (maskJq.length <= 0) {
                maskJq = $("html");
            }
        }
        requestUrl = util.url(requestUrl);
        $this.on("click", function () {
            var $paramValueJq = $(paramSelector);
            if ($paramValueJq.length <= 0) {
                // 一个都没有，则给出提示
                tips.err(MSG.find("common.error.required-select", rowName));
                return false;
            }
            if ($paramValueJq.length > 1) {
                // 不允许多选
                // 但选择了多个
                tips.err(MSG.find("common.error.single.checkbox", rowName));
                return false;
            }
            var paramEntryArray = [];
            $paramValueJq.each(function (index) {
                paramEntryArray.push(paramName + "=" + $(this).val());
            });
            var paramStr = paramEntryArray.join("&");
            util.ajax(requestUrl, paramStr, function (json) {
                util.unmask(maskJq);
                if (!json.success) {
                    tips.err(util.getJsonErrorMsg(json));
                }
                ajaxCallbackFn(json);
            }, function () {
                util.unmask(maskJq);
            });
            util.loading(maskJq);
            return false;
        });
    }
    cmp.fileBtnBind = function (jq) {
        jq = $(jq);
        var $fileBtnParentBox = jq.parents(".cmp-file-box:eq(0)");
        var $file = jq.find('input[type="file"]');
        var $textBtnDiv = jq.find(".file-btn-div");
        var $textBtn = $textBtnDiv.find(".file-btn");
        $textBtnDiv.css("width", "auto").css("min-width", "100px");
        $textBtn.css("width", "100%");
        var originalBtnName = $textBtn.html();
        var $clearBtn = jq.find(".file-clear-btn");
        var clearFn = function () {
            $textBtnDiv.removeAttr("title").css("width", "auto");
            $textBtn.removeClass("auto_dian").html(originalBtnName);
            $file.val("");
        };
        $clearBtn.bind("click", clearFn);
        $file.bind("change", function () {
            var $this = $(this);
            var filePath = $this.val();
            if (filePath == null || filePath == "") {
                clearFn();
            } else {
                var fileName = filePath;
                if (filePath.indexOf("/") != -1) {
                    fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
                } else if (filePath.indexOf("\\") != -1) {
                    fileName = filePath.substring(filePath.lastIndexOf("\\") + 1);
                }
                $textBtnDiv.attr("title", filePath);
                $textBtn.html(fileName).addClass("auto_dian");
                if (jq.width() > $fileBtnParentBox.width()) {
                    $textBtnDiv.css("width", ($fileBtnParentBox.width() - 39) + "px");
                }
            }
        });
    }
    $(function () {
        $("img.scrollLoading[data-url]").attr("src",
            util.url("/client/img/lazyload.gif")).scrollLoading();
        $(".btnReadme").on("click", function () {
            util.alert(r.msg.find("msg.noun.todo"));
        });
        var logouFn = function () {
            if (util.isMobile) {
                util.mask($("html"), "", true, 50);
            } else {
                util.loading($("html"));
            }
            util.ajax("/c/page/pub/logout", function (json) {
                tips.suc(json.msg);
                setTimeout(function () {
                    location.href = PG.basePath;
                }, 1000);
            });
        };
        $("#doLogout").on("click", logouFn);
        $(".doLogout").on("click", logouFn);
        // 修复input/select/button默认是autocomplete="on"
        $(":input[autocomplete!='on']").attr("autocomplete", "off");
        // icheck-checkbox
        // $("input.icheckbox[type='checkbox']").iCheck({
        // checkboxClass : "icheckbox_minimal-blue"
        // });
        // icheck-radio
        // $("input.iradio[type='radio']").iCheck({
        // radioClass : "iradio_minimal-blue"
        // });
        $(".cmp-number-input").each(function () {
            cmp.numberInputBind(this);
        });
        // combobox
        $(".combo-box").each(function () {
            var $this = $(this);
            if ($this.hasClass("not-bind")) {
                return;
            }
            var $comboVal = $this.find(".combo-val");
            var $comboText = $this.find(".combo-text");
            var isComboBlock = $this.hasClass("combo-block");
            var intervalId = setInterval(function () {
                if ($comboText.width() > 0) {
                    clearInterval(intervalId);
                    if (isComboBlock) {
                        var boxWidth = $this.css("width").replace("px", "") * 1;
                        var caretBtnWidth = $comboText.next().css("width").replace("px", "") * 1;
                        $comboText.css("width", (boxWidth - caretBtnWidth) + "px");
                        $this.find(".combo-menu").css("min-width", boxWidth + "px");
                    } else {
                        var boxWidth = $this.width();
                        var $comboMenu = $this.find(".combo-menu");
                        var menuWidth = $comboMenu.width();
                        if (menuWidth < boxWidth) {
                            $comboMenu.css("min-width", boxWidth + "px");
                        } else {
                        }
                    }
                    $this.find(".combo-menu > li").bind("click", function () {
                        if (!isComboBlock) {
                            var oldWidth = $comboText.css("width").replace("px", "") * 1;
                            $comboText.html($(this).find("a").html());
                            var newWidth = $comboText.css("width").replace("px", "") * 1;
                            $comboText.css("min-width", Math.max(oldWidth, newWidth) + "px");
                            $this.find(".combo-menu").css("min-width", $this.width() + "px");
                        } else {
                            $comboText.html($(this).find("a").html());
                        }
                        $this.find(".combo-menu > li").removeClass("active")
                        $(this).addClass("active");
                        $comboVal.val($(this).attr("option-val")).trigger("change");
                    });
                }
            }, 100);
        });
        // checkbox
        $(".frm-checkbox").each(function () {
            var $checkbox = $(this);
            $checkbox.bind("click", function () {
                var currentChecked = $checkbox.prop("checked");
                if (currentChecked) {
                    // 当前已选中
                    $checkbox.parents(".frm-checkbox-box:eq(0)")
                        .find(".icon-checkbox").addClass("checked");
                } else {
                    $checkbox.parents(".frm-checkbox-box:eq(0)")
                        .find(".icon-checkbox").removeClass("checked");
                }
            });
        });
        // radio
        $(".frm-radio").each(function () {
            var $radio = $(this);
            $radio.bind("click", function () {
                var currentChecked = $radio.prop("checked");
                $radio.parents(".frm-radio-group:eq(0)")
                    .find(".icon-radio").removeClass("checked");
                // 当前已选中
                $radio.prop("checked");
                $radio.parents(".frm-radio-box:eq(0)").find(".icon-radio")
                    .addClass("checked");
            });
        });
        // modal
        $(".modal").each(function () {
            var $modal = $(this);
            $modal.find(".modal-footer button[type='submit']").bind("click",
                function () {
                    $modal.find(".modal-body form[action]").submit();
                });
        });
        var formInModalKeySubmit = function ($event) {
            var $ele = $(this);
            var $form = $ele.parents("form:eq(0)");
            if ($event.keyCode == 13
                && ((!$event.altKey) && (!$event.ctrlKey))
                && $form.length > 0
                && ($form.find("input[type='submit']").length == 0 && $form
                    .find("button[type='submit']").length == 0)) {
                if ($ele.hasClass("typeahead-input")
                    && $ele.parent().find(".dropdown-menu").css("display") !== "none") {
                    return;
                }
                var $submitBtn = $form.find("button[type='submit']");
                if ($submitBtn == null || $submitBtn.length == 0) {
                    $submitBtn = $form.find("input[type='submit']");
                }
                $submitBtn.click();
            }
        };
        $(".modal form[action] input[type='text']").bind("keydown",
            formInModalKeySubmit);
        $(".modal form[action] input[type='password']").bind("keydown",
            formInModalKeySubmit);
        // datapicker
        // 年月日选择
        $(".cmp-date").each(function () {
            cmp.dateBind(this);
        });
        // 年月日时分选择
        $(".cmp-datetime").each(function () {
            cmp.dateTimeBind(this);
        });
        // 年月日时分秒选择
        $(".cmp-datetime-ss").each(function () {
            cmp.dateTimeSsBind(this);
        });
        // 年月日范围选择
        $(".cmp-daterange").each(function () {
            cmp.dateRangeBind(this);
        });
        // 年月日 时分 范围选择
        $(".cmp-daterange-time").each(function () {
            cmp.dateRangeTimeBind(this);
        });
        // tooltip
        $("*[data-toggle='tooltip']").tooltip();
        // table-RowCheck
        $("table.table-row-check").each(function () {
            var $table = $(this);
            var $checkboxs = $table.find("input.row-checkbox[type='checkbox']");
            $checkboxs.bind("click", function ($event) {
                // 禁止冒泡
                $event.stopPropagation();
                var $checkbox = $(this);
                var $rows = $checkbox.parents("tr:eq(0)");
                var isImgCheckbox = $checkbox.hasClass("img_checkbox");
                if ($checkbox.prop("checked")) {
                    $rows.addClass("row-checked");
                    if (isImgCheckbox) {
                        $checkbox.parents(".img_checkbox_label:eq(0)").addClass("selected");
                    }
                } else {
                    $rows.removeClass("row-checked");
                    if (isImgCheckbox) {
                        $checkbox.parents(".img_checkbox_label:eq(0)").removeClass("selected");
                    }
                }
            });
            var $checkAll = $table.find(".row-check-all");
            $checkAll.bind("click", function ($event) {
                if ($checkAll.hasClass("checked")) {
                    // 执行取消全部
                    $checkAll.attr("title", "全选");
                    $checkAll.removeClass("checked");
                    $checkboxs.each(function () {
                        var $checkbox = $(this);
                        if ($checkbox.prop("checked")
                            && (!$checkbox.prop("disabled"))) {
                            $checkbox.trigger("click");
                        }
                    });
                } else {
                    // 执行全选
                    $checkAll.attr("title", "取消全选");
                    $checkAll.addClass("checked");
                    $checkboxs.each(function () {
                        var $checkbox = $(this);
                        if ((!$checkbox.prop("checked"))
                            && (!$checkbox.prop("disabled"))) {
                            $checkbox.trigger("click");
                        }
                    });
                }
            });
            $checkboxs.each(function () {
                var $checkbox = $(this);
                var $rows = $checkbox.parents("tr:eq(0)");
                if ($checkbox.prop("disabled")) {
                    $rows.addClass("disabled");
                }
                $rows.bind("click", function ($event) {
                    if (!$checkbox.prop("disabled")) {
                        $checkbox.trigger("click");
                    }
                });
            });

        });
        // cmp-datetimepicker begin
        $(".cmp-datetimepicker").datetimepicker({
            format: 'yyyy-mm-dd hh:ii',
            autoclose: true,
            todayBtn: true,
            todayHighlight: true,
            minuteStep: 1
        });
        $('.cmp-datetimepicker').bind("changeDate", function () {
            var $this = $(this);
            var $parents = $this.parents(".cmp-datepicker:eq(0)");
            var hiddenName = $this.attr("data-target");
            var $hidden = $parents.find(hiddenName);
            var timeMillis = new Date($this.val()).getTime();
            $hidden.val(timeMillis);
        });
        // cmp-datetimepicker end
        // timeMillis的中文显示
        $(".modal").each(function () {
            var $modalJq = $(this);
            if ($modalJq.find(".auto-focus-btn").length > 0) {
                $modalJq.on("shown.bs.modal", function () {
                    $modalJq.find(".auto-focus-btn").focus();
                });
            }
        });
        $(".cmp-link-with-param").each(function () {
            cmp.linkWithParamBind(this);
        });
        $(".row-delete-btn").each(function () {
            cmp.rowDeleteBtnBind(this);
        });
        $(".row-update-status-btn").each(function () {
            cmp.rowUpdateStatusBtnBind(this);
        });
        $(".row-edit-btn").each(function () {
            cmp.rowEditBtnBind(this);
        });
        $(".cmp-file").each(function () {
            cmp.fileBtnBind(this);
        });
    });
})(window, jQuery, window["pg"], window["MSG"])
