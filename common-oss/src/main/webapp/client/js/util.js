window.onerror = function (msg, url, line) {
    // 等document ready后，会被util中的代码覆盖
    alert(msg);
    return false;
};
window.onerror.max = 3;
window.onerror.num = 0;
/**
 * 全局js Util方法
 *
 * @type
 */
(function (MSG, PG, TIPS) {
    window.util = {
        /**
         * 是否是debug模式
         *
         * @type Boolean
         */
        debug: true,
        isMobile: false,
        cons: {
            loadingImg: "/client/img/loading.gif",
            // 如果采用iframe异步提交时，需要自动带入此参数用于标记此请求也是ajax请求
            iframeAjaxMarkParamName: "_AJAX",
            dialog: {
                iframeModal: "modal-iframe-box",
                iframe: "modal-iframe"
            },
            date: {
                dateFormat: "yyyy-MM-dd",
                timeFormat: "yyyy-MM-dd HH:mm:ss",
                minuteFormat: "yyyy-MM-dd HH:mm",
                dateFormat4Picker: "yyyy-mm-dd",
                timeFormat4Picker: "yyyy-mm-dd hh:ii:ss",
                minuteFormat4Picker: "yyyy-mm-dd hh:ii",
                timeLen: 155,
                timeMinuteLen: 138,
                dateLen: 97
            },

            jsonSuccessProperty: "success",
            jsonMsgProperty: "msg",
            jsonErrorCodeProperty: "code",
            jsonErrorFieldProperty: "field",
            jsonBeanProperty: "bean",
            jsonArrayProperty: "array",


            // 用于标记需要重新登录，且登录页的body.id需要和这个相同
            errorsAdminLoginRequiredCode: "admin_login_required",
            /**
             * 全局资源数据key
             */
            titleWait: "title.wait",
            processLoad: "process.loading",
            processSubmit: "process.submit",
            processSearch: "process.search",
            processDoing: "process.doing",
            defaultError: "common.error.default",
            errorTitle: "title.error",
            errorsRequired: "common.error.required",
            errorsRequiredSelect: "common.error.required-select",
            errorsException: "common.error.exception",
            titleException: "title.exception",
            errorNetworkAjax404: "common.error.network.ajax404",
            errorNetwork: "common.error.network",
            msgConfirmDoChecked: "msg.confirm.do.checked",
            btnRemove: "btn.remove",
            txtSemicolon: "txt.semicolon",
            msgSuccessLogin: "oss.login.success",
            /**
             * 表单重置时，所采用的原来的值
             *
             * @type String
             */
            originalValueName: "original-value",
            /**
             * 用于字段报错时，在哪个元素上提示错误信息的属性名
             */
            showIdName: "v-show-id",
            /**
             * 用于绑定字段onblur事件时，在哪个元素上触发验证方法的属性名，已知使用在了ComboboxTag上
             */
            eventIdName: "v-event-id",
            /**
             * 一个自定义组件用于替换那个原始的浏览器组件；如已知的：select/checkbox/radio
             */
            inputType: "v-input-type",
            /**
             * 默认的KindEditor的items参数
             *
             * @type
             */
            editorItems: ['source', '|', 'undo', 'redo', '|', 'preview',
                'template', 'code', 'cut', 'copy', 'paste', 'plainpaste',
                'wordpaste', '|', 'justifyleft', 'justifycenter',
                'justifyright', 'justifyfull', 'insertorderedlist',
                'insertunorderedlist', 'indent', 'outdent', 'subscript',
                'superscript', 'clearhtml', 'quickformat', 'selectall', '|',
                'fullscreen', '/', 'formatblock', 'fontname', 'fontsize', '|',
                'forecolor', 'hilitecolor', 'bold', 'italic', 'underline',
                'strikethrough', 'lineheight', 'removeformat', '|', 'image',
                'table', 'hr', 'emoticons', 'baidumap', 'pagebreak', 'anchor',
                'link', 'unlink']
        },
        emptyFn: function () {
        },
        init: function () {
            var me = this;
            if (!this.isObj(window.console)) {
                window.console = {
                    log: this.emptyFn
                };
            }
            if (!this.debug) {
                var console = window.console;
                if (console != null) {
                    window["z_" + (Math.random() + "").replace(".", "")
                    + "_console"] = console;
                    // new新取一个console对象
                    window.console = {
                        log: this.emptyFn
                    };
                    // 不是debug模式
                    // 关闭console所有方法
                    for (var p in console) {
                        var property = console[p];
                        if (this.isFun(property)) {
                            window.console[p] = this.emptyFn;
                        }
                    }
                }
            }
            /**
             * 若返回 false，则在浏览器控制台（若有）中显示错误消息。反之则不再显示错误消息。
             */
            window.onerror = function (msg, url, line) {
                if (me.debug) {
                    $("#modal-js-exception")
                        .modal()
                        .find(".modal-body")
                        .html(
                        "<p style='padding-bottom:5px;padding-top:5px;'><span style='font-weight:bold;display:inline-block;width:35px;text-align: right;'>Error:&nbsp;</span><span style='color:red;'>"
                        + msg
                        + "</span></p><p style='padding-bottom:5px;padding-top:5px;'><span style='font-weight:bold;display:inline-block;width:35px;text-align: right;'>File:&nbsp;</span><a href='view-source:"
                        + url
                        + "' target='_blank'>"
                        + url
                        + "</a></p><p style='padding-bottom:5px;padding-top:5px;'><span style='font-weight:bold;display:inline-block;width:35px;text-align: right;'>Line:&nbsp;</span>"
                        + line + "</p>");
                    return (!me.debug);
                }
            };
            window.onerror.max = 3;
            window.onerror.num = 0;
            // 添加浏览器区分class
            var $body = $("body");
            if (this.isIE()) {
                $body.addClass("d-body-ie");
                if (this.isIE10()) {
                    $body.addClass("d-body-ie10");
                } else if (this.isIE9()) {
                    $body.addClass("d-body-ie9");
                } else if (this.isIE8()) {
                    $body.addClass("d-body-ie8");
                } else if (this.isIE7()) {
                    $body.addClass("d-body-ie7");
                } else if (this.isIE6()) {
                    $body.addClass("d-body-ie6");
                } else if (this.isIE6OrLower()) {
                    $body.addClass("d-body-ie5_minus");
                }
            } else if (this.isChrome()) {
                $body.addClass("d-body-webkit");
                $body.addClass("d-body-chrome");
            } else if (this.isSafari()) {
                $body.addClass("d-body-webkit");
                $body.addClass("d-body-safari");
            } else if (this.isFF()) {
                $body.addClass("d-body-firefox");
            }
            this.cons.loadingImg = this.url(this.cons.loadingImg);
        },
        isJsonSuccess: function (json) {
            if (this.isObj(json)) {
                if (json[this.cons.jsonSuccessProperty] === true) {
                    // 请求成功
                    return true;
                }
            }
            return false;
        },
        isJsonFailed: function (json) {
            return !this.isJsonSuccess(json);
        },
        /**
         * 获取地址栏（不包含参数、hash（#tab1））
         *
         * @return {}
         */
        actionUrl: function () {
            return window.location.protocol + "//" + window.location.host
                + window.location.pathname;
        },
        getRandomNum: function () {
            return ((Math.random() + "").replace(".", "") * 1);
        },
        /**
         * String的辅助方法
         *
         * @type
         */
        str: {
            /**
             * trim方法，会把开头的\s和\r和\n都替换掉
             *
             * @return {}
             */
            trim: function (str) {
                return str.replace(/(^[\s\r\n]+)/, "").replace(/([\s\r\n]+$)/, "");
            },
            /**
             * trimRight方法，会把右侧的\s和\r和\n都替换掉
             *
             * @return {}
             */
            rtrim: function (str) {
                return str.replace(/([\s\r\n]+$)/, "");
            },
            /**
             * trim方法，会把左侧的\s和\r和\n都替换掉
             *
             * @return {}
             */
            ltrim: function (str) {
                return str.replace(/(^[\s\r\n]+)/, "");
            },
            contains: function (str, subStr) {
                return (str + "").indexOf(subStr) != -1;
            },
            startsWith: function (str, subStr) {
                if ((str + "").indexOf(subStr) == 0) {
                    return true;
                } else {
                    return false;
                }
            },
            endsWith: function (str, subStr) {
                if (str.length > 0
                    && ((str.lastIndexOf(subStr) + subStr.length) == str.length)) {
                    return true;
                } else {
                    return false;
                }
            },
            encodeHtml: function (str) {
                return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(
                    /"/g, "&quot;").replace(/'/g, "&apos;");
            },
            decodeHtml: function (str) {
                return str.replace(/\&lt;/g, "<").replace(/\&gt;/g, ">").replace(
                    /\&quot;/g, "\"").replace(/\&apos;/g, "'");
            },
            encodeUrl: function (str) {
                return encodeURIComponent(str) + "";
            },
            /**
             * 把资源字符串中的字符串进行格式化 <br>
             * 比如：<br>
             * R["format_error"]={0}格式错误; <br>
             * alert(MSG.["format_error"].format(new Array("密码")));<br>
             * 则就弹出：密码错误
             *
             * @param {}
             *            argsArray
             * @return {}
             */
            format: function (originalStr, argsArray) {
                if (originalStr == null || typeof(argsArray) === "undefined"
                    || argsArray === null) {
                    return originalStr + "";
                }
                var str = originalStr + "";
                if (typeof(argsArray) != "object"
                    || ((!(argsArray instanceof Array)))) {
                    argsArray = [argsArray + ""];
                }
                if (arguments.length > 2) {
                    // 有第三个参数
                    for (var i = 2; i < arguments.length; i++) {
                        argsArray.push(arguments[i]);
                    }
                }
                if (typeof(argsArray) == "object" && (argsArray instanceof Array)
                    && argsArray.length > 0) {
                    for (var i = 0; i < argsArray.length; i++) {
                        str = str.replace(new RegExp("\\{" + i + "\\}", 'g'),
                            argsArray[i]);
                    }
                }
                return str;
            },
            /**
             * 让首字母大写的函数
             *
             * @return {}
             */
            initCap: function (str) {
                var _this = str;
                if (_this != "") {
                    var ini = _this.substr(0, 1);
                    _this = ini.toUpperCase() + _this.substr(1, _this.length - 1);
                }
                return _this + "";
            },
            /**
             * 验证本字符串是否符合正则规则，而原生态的match方法是类似于java中的group方法（返回与正则匹配字符数组(一个元素是一个字符)）
             *
             * @param {}
             *            regex
             * @return {}
             */
            matchReg: function (str, regex) {
                if (typeof(regex) === "undefined" || regex === null) {
                    return false;
                }
                var pattern = null;
                if (regex instanceof RegExp) {
                    pattern = regex;
                } else {
                    try {
                        pattern = new RegExp(regex + "");
                    } catch (e) {
                        alert("can not compile string(\"" + regex
                            + "\") to Regex! @matchReg")
                    }
                }
                if (pattern.test(str)) {
                    return true;
                } else {
                    return false;
                }
            },
            /**
             * 把"替换成\"
             *
             * @param {}
             *            src
             * @return {}
             */
            replaceQuotes: function (src) {
                var tempReplaceMent = "#"
                    + (Math.random() + "" + Math.random()).replace(/\./g, "")
                    + "#";
                return (src + "").replace("\\\"", tempReplaceMent + "\"").replace(
                    "\"", "\\\"").replace(tempReplaceMent, "\\");
                // return (src + "").replace("\\\"", tempReplaceMent +
                // "\"").replace(
                // "\"", "\\\"").replace(tempReplaceMent, "\\");
            },
            /**
             * 把"替换成&quot;
             *
             * @param {}
             *            src
             * @return {}
             */
            encodeQuotes: function (src) {
                return (src + "").replace(/"/g, "&quot;");
            }
        },
        array: {
            /**
             * 数组包含函数
             *
             * @param {}
             *            e
             * @return {Boolean}
             */
            contains: function (array, elem) {
                for (var i = 0; i < array.length; i++) {
                    if (array[i] == elem) {
                        return true;
                    }
                }
                return false;
            },
            /**
             * 排序
             *
             * @param {}
             *            arr 数组
             * @param {}
             *            isReverse true:从大到小；false:从小到大
             */
            sort: function (arr, isReverse) {
                if (isReverse) {
                    // 从大到小
                    // 外层循环，共要进行arr.length次求最大值操作
                    for (var i = 0; i < arr.length; i++) {
                        // 内层循环，找到第i大的元素，并将其和第i个元素交换
                        for (var j = i; j < arr.length; j++) {
                            if (arr[i] < arr[j]) {
                                // 交换两个元素的位置
                                var temp = arr[i];
                                arr[i] = arr[j];
                                arr[j] = temp;
                            }
                        }
                    }
                } else {
                    // 外层循环，共要进行arr.length次求最大值操作
                    for (var i = 0; i < arr.length; i++) {
                        // 内层循环，找到第i大的元素，并将其和第i个元素交换
                        for (var j = i; j < arr.length; j++) {
                            if (arr[i] > arr[j]) {
                                // 交换两个元素的位置
                                var temp = arr[i];
                                arr[i] = arr[j];
                                arr[j] = temp;
                            }
                        }
                    }
                }
                return arr;
            }
        },
        date: {
            /**
             * 对Date的扩展，将 Date 转化为指定格式的String
             * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符 年(y)可以用
             * 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) eg:<br>
             * (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2007-07-02
             * 08:09:04.423 <br>
             * (new Date()).format("yyyy-MM-dd E HH:mm:ss") ==> 2007-03-10 二
             * 20:09:04 <br>
             * (new Date()).format("yyyy-MM-dd EE hh:mm:ss") ==> 2007-03-10 周二
             * 08:09:04 <br>
             * (new Date()).format("yyyy-MM-dd EEE hh:mm:ss") ==> 2007-03-10 星期二
             * 08:09:04 <br>
             * (new Date()).format("yyyy-M-d h:m:s.S") ==> 2007-7-2 8:9:4.18
             */
            format: function (date, fmt) {
                var o = {
                    "M+": date.getMonth() + 1,
                    // 月份
                    "d+": date.getDate(),
                    // 日
                    "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
                    // 小时
                    "H+": date.getHours(),
                    // 小时
                    "m+": date.getMinutes(),
                    // 分
                    "s+": date.getSeconds(),
                    // 秒
                    "q+": Math.floor((date.getMonth() + 3) / 3),
                    // 季度
                    "S": date.getMilliseconds()
                    // 毫秒
                };
                var week = {
                    "0": "\u65e5",
                    "1": "\u4e00",
                    "2": "\u4e8c",
                    "3": "\u4e09",
                    "4": "\u56db",
                    "5": "\u4e94",
                    "6": "\u516d"
                };
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4
                        - RegExp.$1.length));
                }
                if (/(E+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1)
                            ? (RegExp.$1.length > 2
                            ? "\u661f\u671f"
                            : "\u5468")
                            : "")
                        + week[date.getDay() + ""]);
                }
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1,
                            (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k])
                                .substr(("" + o[k]).length)));
                    }
                }
                return fmt;
            }
        },
        /**
         * Bootstrap-Fix
         *
         * @type
         */
        btf: {
            /**
             * 此方法用于把bootstrap-datetimepicker的format转换成java的时间的格式化parttern <br>
             * 由于时间控件bootstrap-datetimepicker.js所使用的时间格式化字符串规范不同
             */
            bootstrapFormat2JavaDateFormat: function (bootstrapFormat) {
                if (bootstrapFormat == null) {
                    return null;
                }
                bootstrapFormat = bootstrapFormat + "";
                // bootstrap中的m（月）-- java中M（月）
                bootstrapFormat = bootstrapFormat.replace(/m/g, "M");
                // bootstrap中的i（分） -- java中m（分）
                bootstrapFormat = bootstrapFormat.replace(/i/g, "m");
                if (bootstrapFormat.indexOf("H") !== -1) {
                    // 有小时
                    // bootstrap中的H（12制） -- java中h（12制）
                    bootstrapFormat = bootstrapFormat.replace(/H/g, "h");
                } else if (bootstrapFormat.indexOf("h") !== -1) {
                    // 有小时
                    // bootstrap中的h（24制） -- java中H（24制）
                    bootstrapFormat = bootstrapFormat.replace(/h/g, "H");
                }
                return bootstrapFormat;
            }
        },
        /**
         * 获取JSON的的error.msg
         *
         * @param {}
         *            json
         */
        getJsonErrorMsg: function (json) {
            if (json != null && json[this.cons.jsonSuccessProperty] == false) {
                if (this.notNull(json[this.cons.jsonMsgProperty])) {
                    return json[this.cons.jsonMsgProperty];
                } else {
                    return MSG.find(this.cons.defaultError);
                }
            }
            return null;
        },
        url: function (subUrl) {
            if (subUrl != null) {
                subUrl = subUrl + "";
                if (this.str.startsWith(subUrl.toUpperCase(), "HTTP://")
                    || this.str.startsWith(subUrl.toUpperCase(), "HTTPS://")
                    || this.str.startsWith(subUrl.toUpperCase(), "//")) {
                    return subUrl;
                }
                if (PG.basePath !== "" && (this.str.startsWith(subUrl, PG.basePath))) {
                    return subUrl;
                } else {
                    if (this.str.startsWith(subUrl, "/")) {
                        return PG.basePath + subUrl;
                    } else {
                        return PG.basePath + "/" + subUrl;
                    }
                }
            }
            return PG.basePath + "/";
        },
        data: (function () {
            var dataName = ("_$" + Math.random() + "_$cache_").replace(".", "");
            return function () {
                if (!this.isObj(PG[dataName])) {
                    PG[dataName] = new this.DataHashMap();
                }
                return PG[dataName];
            };
        })(),
        /**
         * 服务于--hasWindowShow<br>
         * 服务于--onWindowShow
         *
         * @param {}
         *            className
         * @return {}
         */
        getDataKeyForHasInstance: function (className) {
            return "__$isClass_" + className + "_HasInstance";
        },
        /**
         * 返回false表明此Window类，没有已打开的实例，可以继续<br>
         * 返回true就不能继续了
         *
         * @param {}
         *            win
         * @return {}
         */
        hasWindowShow: function (win) {
            if (win != null && win.$className != null) {
                return (true === this.data().get(this
                    .getDataKeyForHasInstance(win.$className)));
            } else {
                return false;
            }
        },
        /**
         * 当一个window打开的时候，应该调用此方法
         *
         * @param {}
         *            win ExtJs的类
         */
        onWindowShow: function (win) {
            if (win != null && win.$className != null) {
                this.data()
                    .put(this.getDataKeyForHasInstance(win.$className), true);
            }
        },
        onWindowClose: function (win) {
            if (win != null && win.$className != null) {
                this.data().put(this.getDataKeyForHasInstance(win.$className),
                    false);
            }
        },
        /**
         * 和processTip方法配套
         */
        cancelLoadTip: function (jq) {
            return this.cancelProcessTip(jq);
        },
        /**
         * 和processTip方法配套
         */
        cancelProcessTip: function (jq) {
            var _jq = $("html");
            if (this.isJqHasDom(jq)) {
                _jq = jq;
            }
            this.unmask(_jq);
            return _jq;
        },
        processTip: function (msg, jq, onlyIcon, top) {
            var _jq = $("html");
            if (this.isJqHasDom(jq)) {
                _jq = jq;
            }
            return this.mask(_jq, msg, onlyIcon, top);
        },
        loading: function (jq, withText) {
            var msg = null;
            if (withText === true) {
                msg = MSG.find(this.cons.processLoad);
            }
            return this.processTip(msg, jq);
        },
        submiting: function (jq) {
            return this.processTip(MSG.find(this.cons.processSubmit), jq);
        },
        searching: function (jq) {
            return this.processTip(MSG.find(this.cons.processSearch), jq);
        },
        deleteing: function (jq) {
            return this.processTip(MSG.find(this.cons.processDoing), jq);
        },
        DataHashMap: (function () {
            /**
             @constructor
             @template T
             */
            var DataHashMap = function () {
                this.__$values_9385948511771858 = {};
            }
            /**
             * 设置Entry
             * @param key
             * @param val
             * @returns {DataHashMap}
             */
            DataHashMap.prototype.put = function (key, val) {
                this.__$values_9385948511771858[key] = val;
                return this
            };
            /**
             * 查找属性值
             * @param key
             * @param {...*} [argsOrArray] 格式化参数
             * @returns {*}
             */
            DataHashMap.prototype.get = function (key) {
                if (key == null) {
                    return null;
                }
                var val = this.__$values_9385948511771858[key];
                if (val == null) {
                    // key未定义或者为null
                    return null;
                }
                return val
            };
            return DataHashMap;
        })(),
        errorsRequiredMsg: function () {
            return MSG.find(this.cons.errorsRequired) + "";
        },
        errorsRequiredSelectMsg: function () {
            return MSG.find(this.cons.errorsRequiredSelect) + "";
        },
        /**
         * 判断对象是否是字符串类型
         *
         * @param {}
         *            obj
         * @return {Boolean}
         */
        isString: function (obj) {
            if (this.isNull(obj) || typeof(obj) !== "string") {
                return false;
            } else {
                return true;
            }
        },
        /**
         * 判断是否是数字类型
         */
        isNumber: function (obj) {
            if (this.isNull(obj) || isNaN(obj) || typeof(obj) !== "number") {
                return false;
            } else {
                return true;
            }
        },
        /**
         * 广义判断是否是数字，转型后是也返回true，null或者undefined返回false;
         *
         * @param {}
         *            testObj
         * @return {Boolean}
         */
        isNum: function (testObj) {
            var testStr = this.str.trim(testObj + "");
            if (testStr === "" || this.isNull(testObj) || isNaN(testObj * 1)) {
                return false;
            } else {
                return true;
            }
        },
        /**
         * 使用typeof来判断是否是Object对象
         *
         * @param {}
         *            obj 参数
         * @return {Boolean}
         */
        isObj: function (obj) {
            if (this.isNull(obj)) {
                return false;
            }
            return (typeof(obj) === "object");
        },
        /**
         * 使用typeof来判断是否是Jquery对象
         *
         * @param {}
         *            obj 参数
         * @return {Boolean}
         */
        isJq: function (obj) {
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
         *
         * @param {}
         *            obj 参数
         * @return {Boolean}
         */
        isJqHasDom: function (obj) {
            if (!this.isJq(obj)) {
                return false;
            }
            return (obj.length > 0);
        },
        /**
         * 判断是否是DOM元素对象，如果能够访问window.Element类 <br>
         * 如果传入document对象，将返回false
         *
         * @可配置 在ie6-/ie6/ie7上不完美
         * @param {}
         *            obj
         * @return {Boolean}
         */
        isDom: function (obj) {
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
         *
         * @param {}
         *            obj 参数
         * @return {Boolean}
         */
        isArray: function (obj) {
            if (this.isObj(obj) && (obj instanceof Array)) {
                return true;
            }
            return false;
        },
        isRegex: function (regex) {
            if (this.isNull(regex) || typeof(regex) != "object") {
                return false;
            }
            return (regex instanceof RegExp);
        },
        /**
         * 判断参数/变量是否定义,未定义或不为null：true,已定义且不为null:false
         *
         * @param {}
         *            obj 参数/变量
         * @return {Boolean}
         */
        isNull: function (arg) {
            return (typeof(arg) === "undefined" || arg === null);
        },
        /**
         * 判断参数/变量是否定义,已定义且不为null：true,未定义或null:false
         *
         * @param {}
         *            obj 参数/变量
         * @return {Boolean}
         */
        notNull: function (arg) {
            return (typeof(arg) != "undefined" && arg != null);
        },
        /**
         * 是不是boolean类型
         */
        isBoolean: function (flag) {
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
        isFun: function (fun) {
            if (this.isNull(fun)) {
                return false;
            }
            return (typeof(fun) === "function");
        },

        /**
         * Firefox浏览器
         */
        isFF: function () {
            return (navigator.userAgent + "").toLowerCase().indexOf("firefox") != -1;
        },
        /**
         * 判断浏览器类型 IE
         *
         * @return {}
         */
        isIE: function () {
            return (navigator.appName + "").toLowerCase()
                    .indexOf("microsoft internet explorer") > -1
                && document.all != null;

        },
        /**
         * 判断浏览器类型 IE6或者IE6-
         *
         * @return {}
         */
        isIE6OrLower: function () {
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
        isIE6: function () {
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
        isIE7: function () {
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
        isIE8: function () {
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
        isIE9: function () {
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
        isIE10: function () {
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
        isIE9OrHigher: function () {
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
        isChrome: function () {
            return (navigator.userAgent + "").toLowerCase().indexOf("chrome") > -1;
        },
        /**
         * 精确判断浏览器类型 Safari
         *
         * @return {}
         */
        isSafari: function () {
            if (this.isChrome()) {
                return false;
            }
            return (navigator.userAgent + "").toLowerCase().indexOf("safari") > -1;
        },
        /**
         * 屏幕可用宽度
         */
        clientWidth: function () {
            if (window.jQuery) {
                return window.jQuery(window).width();
            } else {
                return window.document.documentElement.clientWidth;
            }
        },
        /**
         * 屏幕可用高度
         */
        clientHeight: function () {
            if (window.jQuery) {
                return window.jQuery(window).height();
            } else {
                return window.document.documentElement.clientHeight;
            }
        },
        getFrameDocument: function (iframeDom) {
            if (this.isNull(iframeDom) && (!this.isDom(iframeDom))) {
                return null;
            }
            var iframeDocument = null;
            if (iframeDom != null) {
                try {
                    // iframeDocument = iframeJq[0].contentWindow.document;
                    iframeDocument = iframeDom.contentDocument
                        || iframeDom.contentWindow.document;
                } catch (e) {
                    iframeDocument = null;
                }
            }
            return iframeDocument;
        },
        getFrameWindow: function (iframeDom) {
            if (this.isNull(iframeDom) && (!this.isDom(iframeDom))) {
                return null;
            }
            var iframeWindow = null;
            if (iframeDom != null) {
                try {
                    iframeWindow = iframeDom.contentWindow;
                } catch (e) {
                    iframeWindow = null;
                }
            }
            return iframeWindow;
        },
        /**
         * 在iframe页面内、被window.open打开的页面内调用这个方法取得父页面的document对象
         */
        getParentWindowDocument: function () {
            return this.getParentWindow().document;
        },
        /**
         * 在iframe页面内、被window.open打开的页面内调用这个方法取得父页面的window对象
         */
        getParentWindow: function () {
            var parentWindow = window.top;
            if (parentWindow == null) {
                parentWindow = window;
            }
            return parentWindow;
        },
        _mask: {
            util: null,
            maskIdAttrName: "mask-id",
            maskPrefix: "mask-",
            maskMsgPrefix: "mask-msg-",
            init: function (util) {
                this.util = util;
                var styleStr = ".u-mask{filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=70);opacity: 0.7;background: white;} "
                    + ".u-mask{z-index: 1050;position: absolute;width: 100%;height: 100%;zoom: 1;}"
                    + ".u-mask-msg{z-index: 1051;position: absolute;padding: 8px;-webkit-border-radius: 3px;-moz-border-radius: 3px;-ms-border-radius: 3px;-o-border-radius: 3px;border-radius: 3px;background-image: none;background-color: #e5e5e5;}"
                    + ".u-mask-msg-inner{padding: 0;background-color: transparent;color: #666666;font: normal 13px helvetica, arial, verdana, sans-serif;}"
                    + ".u-mask-msg-text{padding: 21px 0 0;background-image: url("
                    + util.url(util.cons.loadingImg)
                    + ");background-repeat: no-repeat;background-position: center 0;}"
                    + ".u-masked-relative{position: relative;}"
                    + ".u-maks-only-icon .u-mask-msg-inner,.u-maks-only-icon .u-mask-msg-text{height: 16px;}"
                    + ".u-maks-only-icon .u-mask-msg-text{width: 16px;}";
                $("head").append("<style type=\"text/css\">" + styleStr
                    + "</style>");
                var styleStr_todo = ".u-mask-todo{filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=50);opacity: 0.5;background: #000;} "
                    + ".u-mask-todo{z-index: 90;position: absolute;width: 100%;height: 100%;zoom: 1;}"
                    + ".u-mask-todo-msg{font-size:30px;color:#37BAE4;z-index: 91;position: absolute;padding: 8px;-webkit-border-radius: 3px;-moz-border-radius: 3px;-ms-border-radius: 3px;-o-border-radius: 3px;border-radius: 3px;background-image: none;}"
                    + ".u-masked-todo-relative{position: relative;}";
                $("head").append("<style type=\"text/css\">" + styleStr_todo
                    + "</style>");
            },
            _getMaskId: function () {
                return ("" + Math.random()).replace(".", "");
            },
            mask: function (jq, msg, onlyIcon, _top) {
                var top = null;
                if (this.util.isNumber(_top)) {
                    top = _top;
                }
                onlyIcon = (onlyIcon === true) || msg == null || msg === "";
                jq = $(jq);
                if (jq.attr("mask-target") && $(jq.attr("mask-target")).length > 0) {
                    jq = $(jq.attr("mask-target"));
                }
                var rs = null;
                if (this.util.isJqHasDom(jq)) {
                    for (var i = 0; i < jq.length; i++) {
                        var t = $(jq[i]);
                        if (t.attr(this.maskIdAttrName) != null
                            && this.util.isJqHasDom($("#" + this.maskPrefix
                                + t.attr(this.maskIdAttrName)))) {
                            var oldMaskJq = $("#" + this.maskPrefix
                                + t.attr(this.maskIdAttrName));
                            var oldMaskMsgJq = $("#" + this.maskMsgPrefix
                                + t.attr(this.maskIdAttrName));
                            oldMaskJq.show();
                            if (onlyIcon) {
                                oldMaskMsgJq.addClass("u-maks-only-icon");
                            } else {
                                oldMaskMsgJq.removeClass("u-maks-only-icon");
                            }
                            if (msg == null && (!onlyIcon)) {
                                oldMaskMsgJq.hide();
                            } else {
                                if (i == 0) {
                                    rs = oldMaskMsgJq;
                                }
                                oldMaskMsgJq.find(".u-mask-msg-text")
                                    .html(msg != null ? msg : "");
                                oldMaskMsgJq.show();
                                if (this.util.isJqHasDom(oldMaskMsgJq)) {
                                    var left = (t.width() - (oldMaskMsgJq.width() < 32
                                            ? 32
                                            : oldMaskMsgJq.width()))
                                        / 2;
                                    if (top == null) {
                                        top = (t.height() - oldMaskMsgJq.height())
                                            / 2;
                                    }
                                    oldMaskMsgJq.css("left", left + "px").css(
                                        "top", top + "px");
                                }
                            }
                        } else {
                            var id = this._getMaskId();
                            t
                                .attr(this.maskIdAttrName, id)
                                .addClass("u-masked-relative")
                                .addClass("u-masked")
                                .append('<div style="top: 0px; left: 0px; height: '
                                + t.height()
                                + 'px;" class="u-mask" id="'
                                + this.maskPrefix + id + '"></div>');
                            t.append('<div class="u-mask-msg'
                                + (onlyIcon ? " u-maks-only-icon" : "")
                                + '" id="' + this.maskMsgPrefix + id
                                + '" style="right: auto;">'
                                + '<div class="u-mask-msg-inner">'
                                + '<div class="u-mask-msg-text">'
                                + (msg != null ? msg : '') + '</div>'
                                + '</div>' + '</div>');
                            var maskMsgJq = t.find("#" + this.maskMsgPrefix + id);
                            var left = (t.width() - (maskMsgJq.width() < 32
                                    ? 32
                                    : maskMsgJq.width()))
                                / 2;
                            if (top == null) {
                                top = (t.height() - maskMsgJq.height()) * 0.4;
                            }
                            // var top = (util.clientHeight() - maskMsgJq.height())
                            // *0.4;
                            maskMsgJq.css("left", left + "px").css("top",
                                top + "px");
                            if (msg == null && (!onlyIcon)) {
                                maskMsgJq.hide();
                            }
                            if (i == 0) {
                                rs = maskMsgJq;
                            }
                        }
                    }
                }
                // <div style="top: 0px; left: 0px; height: 450px;" class="x-mask"
                // id="ext-gen1132"></div>
                return rs;
            },
            todoMask: function (jq, msg) {
                var rs = null;
                if (this.util.isJqHasDom(jq)) {
                    for (var i = 0; i < jq.length; i++) {
                        var t = $(jq[i]);
                        if (t.attr(this.maskIdAttrName) != null
                            && this.util.isJqHasDom($("#" + this.maskPrefix
                                + t.attr(this.maskIdAttrName)))) {
                            var oldMaskJq = $("#" + this.maskPrefix
                                + t.attr(this.maskIdAttrName));
                            var oldMaskMsgJq = $("#" + this.maskMsgPrefix
                                + t.attr(this.maskIdAttrName));
                            oldMaskJq.show();
                            if (msg == null) {
                                oldMaskMsgJq.hide();
                            } else {
                                if (i == 0) {
                                    rs = oldMaskMsgJq;
                                }
                                oldMaskMsgJq.html(msg + "");
                                oldMaskMsgJq.show();
                                if (this.util.isJqHasDom(oldMaskMsgJq)) {
                                    var left = (t.width() - oldMaskMsgJq.width())
                                        / 2;
                                    var top = (t.height() - oldMaskMsgJq.height())
                                        / 2;
                                    oldMaskMsgJq.css("left", left + "px").css(
                                        "top", top + "px");
                                }
                            }
                        } else {
                            var id = this._getMaskId();
                            t
                                .attr(this.maskIdAttrName, id)
                                .addClass("u-masked-todo-relative")
                                .addClass("u-masked-todo")
                                .append('<div style="top: 0px; left: 0px; height: '
                                + t.height()
                                + 'px;" class="u-mask-todo" id="'
                                + this.maskPrefix + id + '"></div>');
                            t.append('<div class="u-mask-todo-msg" id="'
                                + this.maskMsgPrefix + id
                                + '" style="right: auto;">'
                                + (msg != null ? msg : '') + '</div>');
                            var maskMsgJq = t.find("#" + this.maskMsgPrefix + id);
                            var left = (t.width() - maskMsgJq.width()) / 2;
                            var top = (t.height() - maskMsgJq.height()) / 2;
                            maskMsgJq.css("left", left + "px").css("top",
                                top + "px");
                            if (msg == null) {
                                maskMsgJq.hide();
                            }
                            if (i == 0) {
                                rs = maskMsgJq;
                            }
                        }
                    }
                }
                // <div style="top: 0px; left: 0px; height: 450px;" class="x-mask"
                // id="ext-gen1132"></div>
                return rs;
            },
            unmask: function (jq) {
                jq = $(jq);
                if (jq.attr("mask-target") && $(jq.attr("mask-target")).length > 0) {
                    jq = $(jq.attr("mask-target"));
                }
                if (this.util.isJqHasDom(jq)) {
                    for (var i = 0; i < jq.length; i++) {
                        var t = $(jq[i]);
                        t.removeClass("u-masked-relative").removeClass("u-masked");
                        if (t.attr(this.maskIdAttrName) != null
                            && this.util.isJqHasDom($("#" + this.maskPrefix
                                + t.attr(this.maskIdAttrName)))) {
                            var oldMaskJq = $("#" + this.maskPrefix
                                + t.attr(this.maskIdAttrName));
                            var oldMaskMsgJq = $("#" + this.maskMsgPrefix
                                + t.attr(this.maskIdAttrName));
                            oldMaskJq.remove();
                            oldMaskMsgJq.remove();
                        }
                    }
                }
            }
        },
        mask: function (jq, msg, onlyIcon, top) {
            return this._mask.mask(jq, msg, onlyIcon, top);
        },
        unmask: function (jq) {
            return this._mask.unmask(jq);
        },
        todoMask: function (jq, msg) {
            return this._mask.todoMask(jq, msg);
        },
        /**
         *
         * @param {}
         *            url 地址
         * @param {}
         *            params
         *            如:{id:"23424",name:"asdfasdf"}/"id=213213&name=sadfasdfas"/[{name:"id",value:"123131"},{name:"id",value:"234324324"}]，第二个参数也可以是callback方法
         * @param {}
         *            callback function(json)或者{callback:function(json){},scope:obj}
         * @param {}
         *            __isTipsErrorOnNetWorkErrorOrErrorCallbackAndLoginError(默认true)
         *            true/false 当ajax请求失败时是否提示网络异常
         */
        ajax: function (url, _params, _callback,
                        _isTipsErrorOnNetWorkErrorOrErrorCallbackAndLoginError) {
            var isTipsErrorOnNetWorkError = true;
            var ut = this;
            var errorCallbackFn = null;
            var loginErrorFn = null;
            if (ut
                    .isBoolean(_isTipsErrorOnNetWorkErrorOrErrorCallbackAndLoginError)) {
                isTipsErrorOnNetWorkError = _isTipsErrorOnNetWorkErrorOrErrorCallbackAndLoginError;
            } else if (ut
                    .isFun(_isTipsErrorOnNetWorkErrorOrErrorCallbackAndLoginError)) {
                errorCallbackFn = _isTipsErrorOnNetWorkErrorOrErrorCallbackAndLoginError;
            } else if (ut
                    .isObj(_isTipsErrorOnNetWorkErrorOrErrorCallbackAndLoginError)) {
                if (ut
                        .isBoolean(_isTipsErrorOnNetWorkErrorOrErrorCallbackAndLoginError.tipsOnNetworkError)) {
                    isTipsErrorOnNetWorkError = _isTipsErrorOnNetWorkErrorOrErrorCallbackAndLoginError.tipsOnNetworkError;
                }
                if (ut
                        .isFun(_isTipsErrorOnNetWorkErrorOrErrorCallbackAndLoginError.onNetworkError)) {
                    errorCallbackFn = _isTipsErrorOnNetWorkErrorOrErrorCallbackAndLoginError.onNetworkError;
                }
                if (ut
                        .isFun(_isTipsErrorOnNetWorkErrorOrErrorCallbackAndLoginError.onLoginError)) {
                    loginErrorFn = _isTipsErrorOnNetWorkErrorOrErrorCallbackAndLoginError.onLoginError;
                }
            }
            if (loginErrorFn == null) {
                loginErrorFn = errorCallbackFn;
            }
            url = ut.url(url);
            var params = "";
            var callback = _callback;
            if (_params != null
                && (ut.isString(_params) || ut.isArray(_params) || ut
                    .isObj(_params))) {
                params = _params;
            } else if (ut.isFun(_params)) {
                callback = _params;
            }
            var scope = window;
            var callbackFn = function (json) {
            }
            if (callback != null) {
                if (typeof(callback) == "function") {
                    // callback = function(json){}
                    callbackFn = callback;
                } else if (typeof(callback) == "object"
                    && callback.callback != null
                    && typeof(callback.callback) == "function") {
                    // callback = {callback:function(json){},scope:obj}
                    callbackFn = callback.callback;
                    if (callback.scope != null
                        && typeof(callback.scope) == "object") {
                        scope = callback.scope;
                    }
                }
            }
            $.ajax({
                url: url,
                data: params,
                type: "POST",
                dataType: "text",
                success: function (jsonText) {
                    var json = null;
                    try {
                        json = eval("(function(){return " + jsonText + ";})()");
                    } catch (e) {
                        alert("parse json error: " + e)
                        json = {};
                        json[ut.cons.jsonSuccessProperty] = false;
                    }
                    if (json != null
                        && ut.isJsonFailed(json)
                        && ut.cons.errorsAdminLoginRequiredCode === json[ut.cons.jsonErrorCodeProperty]) {
                        // 请求失败,且有弹出登录窗口的标记
                        ut.loginDialog(json);
                        if (ut.isFun(loginErrorFn)) {
                            loginErrorFn(json);
                        }
                        return;
                    }
                    try {
                        // 调用callback
                        callbackFn.call(scope, json);
                    } catch (e) {
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (isTipsErrorOnNetWorkError) {
                        if ("Not Found" === errorThrown) {
                            TIPS.err(MSG.find(ut.cons.errorNetworkAjax404));
                        } else {
                            TIPS.err(MSG.find(ut.cons.errorNetwork));
                        }
                    }
                    if (errorCallbackFn) {
                        errorCallbackFn(jqXHR, textStatus, errorThrown);
                    }
                    ut.unmask($(".u-masked"));
                }
            });
        },
        /**
         * 获取body滚动对象
         *
         * @param {}
         *            _document
         * @return {}
         */
        getBodyScrollJq: function (_document) {
            var thisDocument = document;
            if (this.notNull(_document)) {
                thisDocument = _document;
            }
            var scrollPos = $(thisDocument.body);
            if ((navigator.userAgent + "").toLowerCase().indexOf("chrome") > -1) {
                scrollPos = $(thisDocument.body);
            } else if (typeof document.compatMode != 'undefined'
                && (document.compatMode + "").toUpperCase() != 'BACKCOMPAT') {
                scrollPos = $(thisDocument.documentElement);
            } else if (typeof document.body != 'undefined') {
                scrollPos = $(thisDocument.body);
            }
            return scrollPos;
        },
        /**
         *
         * @param {}
         *            targetTopObjOrHeight 要到的jQuery对象的顶部位置或者直接写数字的话代表位置
         * @param {}
         *            scrollJqObj 产生滚动的jquery对象
         */
        calculateScrollTime: function (targetTopObjOrHeight, scrollJqObj) {
            var targetHeight = 0;
            if (this.isJqHasDom(targetTopObjOrHeight)) {
                /* 是jQuery对象 */
                targetHeight = targetTopObjOrHeight.offset().top;
            } else if (this.isNumber(targetTopObjOrHeight)) {
                /* 是数字 */
                targetHeight = targetTopObjOrHeight;
            } else {
                return 0;
            }
            var gap = ($("html")[0].scrollTop * 1 - targetHeight);
            if (this.isJqHasDom(scrollJqObj)) {
                gap = (scrollJqObj[0].scrollTop * 1 - targetHeight);
            }
            var time = 1000;
            if (gap < 500) {
                time = 300;
            } else if (gap >= 500 && gap < 1000) {
                time = 500;
            } else if (gap >= 1000 && gap < 2000) {
                time = 1000;
            } else if (gap >= 2000 && gap < 5000) {
                time = 1500;
            } else if (gap >= 5000 && gap < 10000) {
                time = 1500;
            } else {
                time = 2500;
            }
            return time;
        },
        _fieldErrorScroll: function (errorFieldJq) {
            var target = errorFieldJq;
            var $showIdJq = errorFieldJq.attr(this.cons.showIdName) != null ? $(errorFieldJq.attr(this.cons.showIdName)) : null;
            if ($showIdJq != null && $showIdJq.length > 0) {
                target = $showIdJq;
            }
            this.scroll(null, target.offset().top - 50, this
                .calculateScrollTime(target));
        },
        scroll: function (targetJq, targetTopObjOrHeight, time, delay) {
            if (this.isNull(targetTopObjOrHeight)) {
                return;
            }
            var targetHeight = 0;
            if (this.isJqHasDom(targetTopObjOrHeight)) {
                /* 是jQuery对象 */
                targetHeight = targetTopObjOrHeight.offset().top;
            } else if (this.isNumber(targetTopObjOrHeight)) {
                /* 是数字 */
                targetHeight = targetTopObjOrHeight;
            } else {
                return;
            }
            var scrollPos = this.getBodyScrollJq(document);
            if (this.isJqHasDom(targetJq)) {
                scrollPos = targetJq;
            }
            var _delay = 0;
            if (this.isNumber(delay)) {
                _delay = delay * 1;
            } else {
                _delay = 1;
            }
            var _time = 0;
            if (this.isNumber(time)) {
                _time = time * 1;
            }
            setTimeout(function () {
                scrollPos.animate({
                    scrollTop: targetHeight
                }, _time);
            }, _delay);
        },
        /**
         *
         * @param formIdOrFormDomOrOption
         *            HTMl中FORM的id或者直接传入Form的DOM对象/ {formId:"",url:"action"}
         * @param _option
         *            _option={callback:function(json){},scope:obj,showWait:true/false}/function(json){}
         * @param isTipMsg
         *            true/false 是否显示提示消息（成功或失败） 默认true
         * @param isScrollToErrorField
         *            true/false 当发生字段级错误时，是否同时滚动到错误字段处
         */
        ajaxSubmit: function (formIdOrFormDomOrOption, _option, _isTipMsg,
                              _isScrollToErrorField) {
            var isTipMsg = true;
            var isScrollToErrorField = true;
            var ut = this;
            if (ut.isBoolean(_isTipMsg)) {
                isTipMsg = _isTipMsg;
            }
            if (ut.isBoolean(_isScrollToErrorField)) {
                isScrollToErrorField = _isScrollToErrorField;
            }
            var jq = null;
            var url = null;
            if (formIdOrFormDomOrOption != null) {
                if (ut.isDom(formIdOrFormDomOrOption)) {
                    // 是HTML Form对象
                    jq = $(formIdOrFormDomOrOption);
                } else if (ut.isObj(formIdOrFormDomOrOption)) {
                    // option配置
                    var formId = formIdOrFormDomOrOption.formId
                    jq = $("#" + formId);
                    url = formIdOrFormDomOrOption.url;
                } else {
                    // 是ID
                    jq = $("#" + formIdOrFormDomOrOption);
                }
            }
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
            var $maskTarget = jq;
            var maskTargetSelector = jq.attr("data-mask");
            var $parentModal = null;
            if (maskTargetSelector != null && maskTargetSelector != "" && $(maskTargetSelector).length > 0) {
                $maskTarget = $(maskTargetSelector);
            } else if (($parentModal = jq.parents(".modal-content:eq(0)")).length > 0) {
                $maskTarget = $parentModal;
            }
            var option = {
                showWait: true,
                // waitTitle : MSG.find(ut.cons.titleWait),
                // waitMsg : MSG.find(ut.cons.processSubmit),
                callback: function (json) {
                    // 调用者外部定义
                },
                scope: window,
                realCallback: function (json) {
                    $submitBtn.prop("disabled", false).removeAttr("disabled");
                    try {
                        ut.cancelProcessTip($maskTarget);
                    } catch (e) {
                    }
                    try {
                        if (isTipMsg) {
                            // 默认操作结果提示
                            if (json[ut.cons.jsonSuccessProperty]) {
                                var msg = json[ut.cons.jsonMsgProperty];
                                var msgStr = null;
                                if (msg != null && typeof(msg) != "object") {
                                    msgStr = msg + "";
                                }
                                if (isTipMsg && msgStr != null) {
                                    TIPS.suc(msgStr);
                                }
                            } else {
                                var errStr = ut.getJsonErrorMsg(json);
                                var errField = json[ut.cons.jsonErrorFieldProperty];
                                var errFieldJq = null;
                                if (errField != null) {
                                    errFieldJq = jq.find("*[name='" + errField
                                        + "']");
                                    if (errFieldJq.length <= 0) {
                                        errFieldJq = null;
                                    }
                                }
                                if (errFieldJq == null) {
                                    TIPS.err(errStr);
                                } else {
                                    errFieldJq.fieldMarkInvalid(errStr);
                                    errFieldJq.focus();
                                    if (isScrollToErrorField
                                        && $(".modal[aria-hidden='false']").length == 0) {
                                        ut._fieldErrorScroll(errFieldJq);
                                    }
                                }
                            }
                        }
                    } catch (e) {
                    }
                    if (json != null
                        && ut.isJsonFailed(json)
                        && ut.cons.errorsAdminLoginRequiredCode === json[ut.cons.jsonErrorCodeProperty]) {
                        // 请求失败,且有弹出登录窗口的标记
                        ut.loginDialog(json, false);
                        return;
                    }
                    try {
                        // 调用外部定义的callback
                        this.callback.call(this.scope, json);
                    } catch (ee) {
                    }
                }
            };
            if (ut.isObj(_option)) {
                if (ut.isBoolean(_option.showWait)) {
                    option.showWait = _option.showWait;
                }
                if (ut.isFun(_option.callback)) {
                    option.callback = _option.callback;
                }
                if (ut.notNull(_option.scope)) {
                    option.scope = _option.scope;
                }
            } else if (ut.isFun(_option)) {
                option.callback = _option;
            }
            if (jq != null) {
                $submitBtn.prop("disabled", true).attr("disabled", "disabled");
                if (jq.find("input[type='file']").length > 0
                    || (jq.attr("enctype") != null && "MULTIPART/FORM-DATA" == jq
                        .attr("enctype").toUpperCase())) {
                    // 应该使用iframe异步提交
                    var iframeName = ("form_submit_iframe_" + Math.random())
                        .replace(".", "");
                    $("body")
                        .append("<iframe src='javascript:void(0);' style='display:none;' id='"
                        + iframeName
                        + "' name='"
                        + iframeName
                        + "'></iframe>");
                    jq.attr("target", iframeName);
                    // var ajaxInputId = ("ajax_" + Math.random())
                    // .replace(".", "")
                    /* 用于标记是否是Ajax请求 */
                    // jq
                    // .append('<input type="hidden" name="_AJAX" value="1"
                    // id="'
                    // + ajaxInputId + '"/>');
                    var old_action = jq.attr("action");
                    if (url == null) {
                        url = jq.attr("action");
                    }
                    var ajaxMarkParamName = ut.cons.iframeAjaxMarkParamName;
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
                            v: "1"
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
                    jq[0].submit();
                    // for (var i = 0; i < needResetJqFieldArr.length; i++) {
                    // var iJq = needResetJqFieldArr[i];
                    // iJq.val(iJq.attr("originalvalue"));
                    // }
                    if (option.showWait) {
                        ut.loading($maskTarget);
                    }
                    $("#" + iframeName).bind("load", function () {
                        jq.attr("action", old_action);
                        $submitBtn.prop("disabled", false)
                            .removeAttr("disabled");
                        var json = null;
                        try {
                            var ifDoc = ut.getFrameDocument(this);
                            var html = null;
                            if ($("pre", ifDoc).length > 0) {
                                html = $("pre", ifDoc).html();
                            } else {
                                html = $("body", ifDoc).html();
                            }
                            // setTimeout(function() {
                            // jq.find("#" + ajaxInputId).remove();
                            // }, 50);
                            setTimeout(function () {
                                $("#" + iframeName).remove();
                            }, 500);
                            // <pre>
                            eval("json=" + html);
                        } catch (err) {
                            json = {};
                            json[ut.cons.jsonSuccessProperty] = false;
                            json[ut.cons.jsonMsgProperty] = MSG.find(ut.cons.defaultError);
                        }
                        option.realCallback(json);
                    });
                } else {
                    // 用javascript ajax提交
                    if (url == null) {
                        url = jq.attr('action');
                    }
                    if (option.showWait) {
                        ut.loading($maskTarget);
                    }
                    ut.ajax(url, jq.serialize(), {
                        callback: option.realCallback,
                        scope: option
                    }, function () {
                        try {
                            $submitBtn.prop("disabled", false)
                                .removeAttr("disabled");
                            ut.cancelProcessTip(jq);
                        } catch (e) {
                        }
                    });
                }
            }
        },
        /**
         * 判断浏览器各种支持对象
         *
         * @type
         */
        support: {
            util: null,
            /**
             * 是否支持属性
             *
             * @type Boolean
             */
            placeholder: false,
            init: function (util) {
                this.util = util;
                this.placeholder = 'placeholder' in document.createElement('input');
            }
        },
        cookie: {
            util: null,
            init: function (util) {
                this.util = util;
            },
            /**
             * 设置cookie
             *
             * @param {}
             *            name
             * @param {}
             *            value
             * @param {}
             *            daysExpiresDate Number/Date 默认30天；
             */
            put: function (name, value, daysExpiresDate, path, domain, secure) {
                var util = this.util;
                var argv = arguments;
                var argc = arguments.length;
                var expires = null;
                if (argc > 2) {
                    if (argv[2] != null) {
                        if (util.isNumber(argv[2])) {
                            var d = new Date();
                            d
                                .setTime(d.getTime()
                                + (argv[2] * 24 * 60 * 60 * 1000));
                            if (argv[2] > 0) {
                                expires = d;
                            }
                        } else if (argv[2] instanceof Date) {
                            expires = argv[2];
                        }
                    }
                } else {
                    var d = new Date();
                    d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
                    expires = d;
                }
                var path = (argc > 3) ? argv[3] : '/';
                var domain = (argc > 4) ? argv[4] : null;
                var secure = (argc > 5) ? argv[5] : false;
                document.cookie = name
                    + "="
                    + escape(value)
                    + ((expires == null) ? "" : ("; expires=" + expires
                        .toGMTString()))
                    + ((path == null) ? "" : ("; path=" + path))
                    + ((domain == null) ? "" : ("; domain=" + domain))
                    + ((secure == true) ? "; secure" : "");
            },
            /**
             * 通过名称，获取一个cookie
             *
             * @param {}
             *            name
             * @return {}
             */
            find: function (name) {
                var arg = name + "=";
                var alen = arg.length;
                var clen = document.cookie.length;
                var i = 0;
                var j = 0;
                while (i < clen) {
                    j = i + alen;
                    if (document.cookie.substring(i, j) == arg)
                        return this._getCookieVal(j);
                    i = document.cookie.indexOf(" ", i) + 1;
                    if (i == 0)
                        break;
                }
                return null;
            },
            findAllCookie: function () {
                var cookieArray = document.cookie.split("; ");
                var array = [];
                if (cookieArray != null && cookieArray.length > 0) {
                    for (var i = 0; i < cookieArray.length; i++) {
                        var cookieEntryArray = cookieArray[i].split("=");
                        if (cookieEntryArray.length > 1) {
                            array.push({
                                name: cookieEntryArray[0],
                                value: unescape(cookieEntryArray[1])
                            });
                        }
                    }
                }
                return array;
            },
            /**
             * 通过document.cookie字符串的offset来查找值
             */
            _getCookieVal: function (offset) {
                var endstr = document.cookie.indexOf(";", offset);
                if (endstr == -1) {
                    endstr = document.cookie.length;
                }
                return unescape(document.cookie.substring(offset, endstr));
            },
            /**
             * 通过名称，删除cookie
             *
             * @param {}
             *            name
             */
            remove: function (name) {
                if (this._getCookieVal(name) != null) {
                    // Thu, 01 Jan 1970 00:00:01 GMT
                    var startDate = new Date();
                    startDate.setTime(1000);
                    this.put(name, null, startDate);
                }
            }
        },
        /**
         *
         * @return {}
         */
        alert: function (msg) {
            return this.dialog.alert(msg);
        },
        /**
         * 确定XXX
         *
         * @param {}
         *            msg
         * @param {}
         *            callback
         */
        confirm: function (msg, callback) {
            var pwin = this.getParentWindow();
            var modalJq = pwin.$("#modal-confirm");
            var confirmMsgJq = modalJq.find(".confirm-msg");
            confirmMsgJq.html(msg);
            modalJq.unbind("hidden.bs.modal");
            modalJq.on("hidden.bs.modal", pwin.util.dialog
                .buildModalHiddenCallbackOnReloadCallback(confirmMsgJq, ""));
            var doConfirmBtnJq = modalJq.find(".do-confirm");
            doConfirmBtnJq.unbind("click");
            if (this.isFun(callback)) {
                doConfirmBtnJq.bind("click", function () {
                    callback();
                });
            }
            return modalJq.modal();
        },
        /**
         * 确定XXX
         *
         * @param {}
         *            msg
         * @param {}
         *            callback
         */
        confirm2: function (msg, callback) {
            var pwin = this.getParentWindow();
            var modalJq = pwin.$("#modal-confirm");
            var confirmMsgJq = modalJq.find(".confirm-msg");
            var oldMsg = confirmMsgJq.html();
            confirmMsgJq.html(msg);
            modalJq.unbind("hidden.bs.modal");
            modalJq.on("hidden.bs.modal", pwin.util.dialog
                .buildModalHiddenCallbackOnReloadCallback(confirmMsgJq,
                oldMsg));
            var doConfirmBtnJq = modalJq.find(".do-confirm");
            doConfirmBtnJq.unbind("click");
            if (this.isFun(callback)) {
                doConfirmBtnJq.bind("click", function () {
                    callback();
                });
            }
            return modalJq.modal();
        },
        /**
         * 确定要删除被选择中的数据吗？
         *
         * @param {}
         *            msg
         * @param {}
         *            callback
         */
        rowDeleteConfirm: function (callback) {
            this.confirm(MSG.find(this.cons.msgConfirmDoChecked, MSG.find(this.cons.btnRemove)), callback);
        },
        dialog: {
            util: null,
            iframeDefaultOption: {
                title: null,
                showHeader: true,
                closeable: true,
                keyboard: true,
                backdrop: true,
                width: "auto",
                height: "auto",
                afterShow: null,
                afterShowScope: null,
                onload: null,
                onloadScope: null,
                onclose: null,
                oncloseScope: null
            },
            buildModalHiddenCallbackOnReloadCallback: function (confirmMsgJq,
                                                                oldMsg) {
                return function () {
                    confirmMsgJq.html(oldMsg);
                };
            },
            init: function (util) {
                this.util = util;
            },
            closeIframe: function () {
                $("#" + this.util.cons.dialog.iframeModal).modal("hide");
            },
            /**
             * 弹出框使用iframe加载一个新页面(url)
             *
             * @param url
             * @param {}
             *            option:<br>{ <br>
		 *            title:string 对话框标题，如果不填写，则取iframe中的title标签<br>
		 *            width:number/string("auto"/"modal-lg"/"modal-sm"等)（默认：auto）<br>
		 *            heigth:number/"auto"（默认：auto）<br>
		 *            afterShow:function（弹出框弹出后要执行的方法）<br>
		 *            afterShowScope:object（afterShow的运行域），默认为window<br>
		 *            onload:function（iframe加载成功后要执行的方法）<br>
		 *            onloadScope:object（onload的运行域），默认为window<br>
		 *            onclose:function（关闭对话框后执行的方法）<br>
		 *            oncloseScope:object（onclose的运行域），默认为window<br>
		 *            showHeader:true/false，是否显示头部<br>
		 *            closeable:true/false，是否可以关闭<br>
		 *            <br>
		 *            <br> }
             * @return {}
             */
            open: function (url, option) {
                var util = this.util;
                var op = $.extend({}, this.iframeDefaultOption, option);
                var $iframeModal = $("#" + util.cons.dialog.iframeModal);
                var $iframe = $iframeModal.find("." + util.cons.dialog.iframe);
                var $modalDialog = $iframeModal.find(".modal-dialog");
                var $modalBody = $iframeModal.find(".modal-body");
                var $modalContent = $iframeModal.find(".modal-content");
                var $modalHeader = $modalContent.find(".modal-header");
                var $closeBtn = $modalHeader.find(".close");
                var $modalTitle = $modalHeader.find(".modal-title");
                $modalHeader.hide();
                $iframe.unbind("load");
                $iframeModal.unbind("hide.bs.modal");
                $iframeModal.unbind("hidden.bs.modal");
                $iframeModal.unbind("shown.bs.modal");
                var $loadingBox = $iframeModal.find(".loading-box");
                $loadingBox.show();
                $iframe.hide().attr("src", "about:blank");
                $modalDialog.removeAttr("style");
                $modalContent.removeAttr("style");
                if (!op.closeable) {
                    op.backdrop = "static";
                    op.keyboard = false;
                }
                $iframe.bind("load", function () {
                    $iframe.unbind("load");
                    var iwin = util.getFrameWindow($iframe[0]);
                    var start = new Date().getTime();
                    var idoc = util.getFrameDocument($iframe[0]);
                    var isCurrentLoginPage = op.isLoginPage === true;
                    if (!isCurrentLoginPage) {
                        if (util.cons.errorsAdminLoginRequiredCode === $("body", idoc).attr("id")) {
                            util.loginDialog(null, true);
                            return;
                        } else {
                            iwin.$(iwin).bind("beforeunload", function () {
                                $iframe.hide();
                                $loadingBox.show();
                            });
                            $iframe.bind("load", function () {
                                var iidoc = util.getFrameDocument($iframe[0]);
                                var iiwin = util.getFrameWindow($iframe[0]);
                                iiwin.$(iiwin).bind("beforeunload", function () {
                                    $iframe.hide();
                                    $loadingBox.show();
                                });
                                if (util.cons.errorsAdminLoginRequiredCode === $("body", iidoc).attr("id")) {
                                    $iframe.unbind("load");
                                    $iframe.hide();
                                    $loadingBox.show();
                                    util.loginDialog(null, true);
                                } else {
                                    $loadingBox.hide();
                                    $iframe.fadeIn();
                                }
                            });
                        }
                    }
                    var intervalId = setInterval(function () {
                        if (iwin.$ != null && iwin.document != null && $(iwin.document).width() > 0 && $(iwin.document).height() > 0) {
                            clearInterval(intervalId);
                            if (op.showHeader) {
                                $modalHeader.show();
                            } else {
                                $modalHeader.hide();
                            }
                            if (op.closeable) {
                                $closeBtn.show();
                            } else {
                                $closeBtn.hide();
                            }
                            if (util.isFun(op.onload)) {
                                var scope = op.onloadScope || window;
                                op.onload.call(scope, $iframe[0]);
                            }
                            var intervalId2 = setInterval(function () {
                                idoc = iwin.document;
                                var clientWidth = $(idoc).width();
                                var clientHeight = $(idoc).height();
                                if (clientWidth > 0 && clientHeight > 0) {
                                    clearInterval(intervalId2);
                                    var width = "";
                                    if (util.isNumber(op.width)) {
                                        width = (op.width + 57) + "px";
                                    } else {
                                        // auto
                                        width = (clientWidth + 57) + "px";
                                    }
                                    $modalDialog.css("width", width);
                                    var heightVal = 0;
                                    var height = "";
                                    if (util.isNumber(op.height)) {
                                        heightVal = (op.height + 46);
                                    } else {
                                        // auto
                                        heightVal = (clientHeight + 46);
                                    }
                                    if (op.showHeader) {
                                        $modalBody.css("height", heightVal + "px");
                                        var title = op.title;
                                        if (title == null) {
                                            title = $("title", idoc).html();
                                        }
                                        $modalTitle.html(title);
                                        var headerHeight = $modalHeader.height() + 31;
                                        heightVal = heightVal + headerHeight;
                                    } else {
                                        $modalBody.removeAttr("style");
                                    }
                                    height = heightVal + "px";
                                    $modalContent.css("height", height);
                                    $loadingBox.hide();
                                    $iframe.fadeIn();
                                }// if2 end
                            }, 10);// setInterval2 end
                        }// if end
                    }, 50);// setInterval end
                });
                $iframeModal.bind("hide.bs.modal", function () {
                    $iframe.unbind("load");
                    if (util.isFun(op.onclose)) {
                        var scope = op.oncloseScope || window;
                        op.onclose.call(scope, $iframe[0]);
                    }
                });
                $iframeModal.bind("hidden.bs.modal", function () {
                    $loadingBox.show();
                    $iframe.hide().attr("src", "about:blank");
                    $modalDialog.removeAttr("style");
                    $modalContent.removeAttr("style");
                    $modalBody.removeAttr("style");
                    $modalTitle.html("");
                });
                if (util.isFun(op.afterShow)) {
                    $iframeModal.bind("shown.bs.modal", function () {
                        var scope = op.afterShowScope || window;
                        op.afterShow.call(scope);
                    });
                }
                // url = util.buildParam(util.url(url), "___iframe", "1");
                url = util.url(url);
                $iframe.attr("src", url);
                $iframeModal.modal({
                    backdrop: op.backdrop,
                    keyboard: op.keyboard
                });
            },
            /**
             *
             * @return {}
             */
            alert: function (msg) {
                var $modalAlert = $("#modal-alert");
                $modalAlert.find("#modalAlertTitle").html(msg);
                var marginTop = ((this.util.clientHeight() - $modalAlert
                        .find(".modal-content").height()) / 2)
                    * 0.4;
                $modalAlert.modal({
                    backdrop: "static"
                });
                return $modalAlert;
            }
        },
        /**
         * 让form reset支持hidden元素
         *
         * @param {}
         *            formJq form的jQuery对象
         */
        fixFormReset: function (formJq) {
            var me = this;
            formJq.find("input:hidden").each(function () {
                var hid = $(this);
                hid.attr(me.cons.originalValueName, hid.val());
            });
            formJq.bind("reset", function () {
                $(this).find("input:hidden").each(function () {
                    var hid = $(this);
                    var originalValue = hid.attr(me.cons.originalValueName);
                    if (originalValue != null) {
                        hid.val(originalValue);
                    }
                });
                $(this).find("*[" + me.cons.originalValueName + "]").each(
                    function () {
                        var input = $(this);
                        var originalValue = input
                            .attr(me.cons.originalValueName);
                        if (originalValue != null) {
                            this.value = originalValue;
                            this.defaultValue = originalValue;
                            setTimeout(function () {
                                input.val(originalValue);
                            }, 10)
                        }
                    });
            });
        },
        /**
         * combobox组件JS版
         *
         * @type
         */
        combo: {
            util: null,
            init: function (util) {
                this.util = util;
            },
            cons: {
                comboDivClass: "selectInput",
                comboMenuClass: "dropdown-menu",
                comboDivFocusClass: "combo-focus",
                comboTextInputClass: "combo-text-input",
                comboDropdownToggleClass: "dropdown-toggle",
                comboHiddenInputClass: "selectInput-hidden",
                comboItemActiveClass: "combo-item-active",
                comboItemClass: "combo-item",
                comboOptionValueName: "option-value"
            },
            /**
             * @param upEleJq
             *            要绘制在那个元素中，上级DIV的jQuery对象
             * @param config
             *            配置，等同于<ech:combobox/>的属性<br>
             *            例如：<br>
             *            <br>{<br>
		 *            data:[{value:1,text:"已发送"}],// 必填<br>
		 *            name:"smsStatus", // 必填 <br>
		 *            selectedValue:1, <br>
		 *            readOnly:true ,//默认true <br>
		 *            autoComplete:true ,//默认true <br>
		 *            cls:null , <br>
		 *            placeholder:null, <br>
		 *            blankText:null, <br>
		 *            blankValue:"" // 默认"" <br>}
             */
            build: function (upEleJq, config) {
                var me = this;
                var conf = {
                    data: [],
                    name: null,
                    selectedValue: null,
                    readOnly: true,
                    autoComplete: true,
                    cls: null,
                    placeholder: null,
                    blankText: null,
                    blankValue: "",
                    forceSelection: true,
                    dataUrl: null
                };
                if (me.util.isObj(config)) {
                    conf.data = config.data;
                    conf.name = config.name;
                    conf.selectedValue = config.selectedValue;
                    if (me.util.isBoolean(config.readOnly)
                        && config.readOnly === false) {
                        conf.readOnly = false;
                    }
                    if (me.util.isBoolean(config.forceSelection)
                        && config.forceSelection === false) {
                        conf.forceSelection = false;
                        conf.readOnly = false;
                    }
                    if (me.util.isBoolean(config.autoComplete)
                        && config.autoComplete === false) {
                        conf.autoComplete = false;
                    }
                    conf.cls = config.cls;
                    conf.placeholder = config.placeholder;
                    conf.blankText = config.blankText;
                    if (me.util.notNull(config.blankValue)) {
                        conf.blankValue = config.blankValue;
                    }
                    if (me.util.notNull(config.dataUrl)) {
                        conf.dataUrl = config.dataUrl;
                    }
                }
                var divId = "combo-" + conf.name + "-" + me.util.getRandomNum();
                var ulId = "combo-ul-" + conf.name;
                var textInputId = "combo-text-" + conf.name;
                var hiddenInputId = "combo-hidden-" + conf.name;
                var bf = "<div class=\"input-group selectInput";
                if (conf.cls != null) {
                    bf += (" " + conf.cls);
                }
                bf += ("\" id=\"" + divId + "\">");
                bf += ("<input class=\"combo-text-input form-control\" autocomplete=\""
                + (conf.autoComplete ? "on" : "off")
                + "\" type=\"text\""
                + " id=\"" + textInputId + "\"");
                if (conf.placeholder != null) {
                    bf += (" placeholder=\"" + conf.placeholder + "\"");
                }
                if (conf.readOnly) {
                    bf += (" readonly=\"true\"");
                }
                if (!conf.forceSelection) {
                    bf += ((" onfocus=\"(function($this){var isInit=$this.attr('is-init')==null;if(isInit){")
                    + (conf.dataUrl ? "util.combo.initAjax($this,'"
                    + conf.dataUrl + "');" : "")
                    + ("var initBindFn=function(eve){var hideInput=$(this).parent().find('#")
                    + (hiddenInputId)
                    + ("');var selectOp=hideInput.prev().find('a[title=\\''+$(this).val()+'\\']');if(selectOp.length<=0){hideInput.val($(this).val());}else{hideInput.val(selectOp.attr('option-value'));}};") + ("$this.attr('is-init','true');$this.bind('keydown',initBindFn).bind('keypress',initBindFn).bind('keyup',initBindFn).bind('blur',initBindFn);}})($(this));\""));
                } else {
                    bf += (" force-selection=\"true\"");
                }
                var originalSelectedValue = conf.selectedValue;
                var isFindCheckedVal = false;
                var isFindSelectValueText = false;
                var selectedValueText = null;
                if (conf.blankText != null && conf.selectedValue == null) {
                    conf.selectedValue = conf.blankValue;
                    selectedValueText = conf.blankText;
                } else {
                    var arr = conf.data;
                    for (var i = 0; i < arr.length; i++) {
                        var o = arr[i];
                        var val = o.value;
                        var text = o.text;
                        if (conf.selectedValue != null) {
                            if (conf.selectedValue === val) {
                                // 找到匹配的值了
                                isFindSelectValueText = true;
                                selectedValueText = text;
                                isFindCheckedVal = true;
                                break;
                            }
                        } else {
                            // 取得第一个值
                            selectedValueText = text;
                            conf.selectedValue = val;
                            isFindCheckedVal = true;
                            break;
                        }
                    }
                    if (!isFindCheckedVal && arr.length > 0) {
                        // selectedValue仍然是null
                        if (conf.blankText != null) {
                            conf.selectedValue = conf.blankValue;
                            selectedValueText = conf.blankText;
                        } else {
                            // 取得第一个值
                            selectedValueText = arr[0].text;
                            conf.selectedValue = arr[0].value;
                        }
                    }
                }
                if ((!isFindSelectValueText) && (!conf.forceSelection)) {
                    // 没有真正找到匹配的值，且允许手动输入值
                    // 真正传入的值
                    if (originalSelectedValue != null) {
                        conf.selectedValue = originalSelectedValue;
                        selectedValueText = originalSelectedValue;
                    }
                }
                if (selectedValueText != null) {
                    bf += (" value=\""
                    + me.util.str.encodeQuotes(selectedValueText) + "\"");
                }
                bf += ("/>");
                bf += ("<input autocomplete=\"off\" class=\"selectInput-hidden\" type=\"hidden\" name=\""
                + conf.name
                + "\" "
                + me.util.cons.inputType
                + "=\""
                + "select"
                + "\" "
                + me.util.cons.showIdName
                + "=\""
                + divId
                + "\" "
                + me.util.cons.eventIdName
                + "=\""
                + textInputId + "\"" + " id=\"" + hiddenInputId + "\"");
                if (conf.selectedValue != null) {
                    bf += (" value=\""
                    + me.util.str.encodeQuotes(conf.selectedValue) + "\"");
                }
                bf += ("/>");
                bf += ("<div class=\"input-group-btn\">")
                bf += ("<button type=\"button\" class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\"><span class=\"caret\"></span></button>")
                bf += ("<ul class=\"dropdown-menu pull-right\" style=\"display:none;\"");
                bf += (" id=\"" + ulId + "\">");
                bf += ("</ul>");

                bf += ("</div>");
                bf += ("</div>");
                upEleJq.each(function () {
                    var $this = $(this);
                    $this.html("");
                    $this.html(bf);
                    me.render($this, conf.data, conf.selectedValue,
                        conf.blankText, conf.blankValue);
                });
            },
            initAjax: function (textInputJq, url) {
                var me = this;
                var comboUtil = this;
                if (!me.util.isJqHasDom(textInputJq)) {
                    return;
                }
                var textInputDom = textInputJq[0];
                var comboJjaxCacheUpperMap = me.util.data()
                    .get("COMBO-AJAX-CACHE-UPPER-MAP");
                if (comboJjaxCacheUpperMap == null) {
                    comboJjaxCacheUpperMap = {};
                    me.util.data().put("COMBO-AJAX-CACHE-UPPER-MAP",
                        comboJjaxCacheUpperMap);
                }
                var thisComboJjaxCacheMap = comboJjaxCacheUpperMap[textInputJq
                    .attr("id")];
                if (thisComboJjaxCacheMap == null) {
                    thisComboJjaxCacheMap = {};
                    comboJjaxCacheUpperMap[textInputJq.attr("id")] = thisComboJjaxCacheMap;
                }
                textInputJq.attr("term", textInputJq.val());
                textInputJq.attr("data-url", me.util.url(url));
                textInputJq.bind("keydown", function (eve) {
                    var ENTER = 13;
                    var SPACE = 32;
                    var LEFT = 37;
                    var UP = 38;
                    var RIGHT = 39;
                    var DOWN = 40;
                    var CHAR_A = 65;
                    var CTRL = 17;
                    var SHIFT = 16;
                    var ALT = 18;
                    var ESC = 27;
                    // 输入法输入
                    var SHURU_INPUT = me.util.isFF() ? 0 : 229;
                    switch (eve.keyCode) {
                        case SHURU_INPUT :
                            if ((me.util.isIE()) && (!me.util.isIE9OrHigher())) {
                                setTimeout(function () {
                                    comboUtil._searchTimeout(
                                        textInputJq, eve);
                                }, 10);
                            }
                            break;
                        case ENTER :
                            break;
                        case ESC :
                            break;
                        case DOWN :
                            break;
                        case RIGHT :
                            break;
                        case UP :
                            break;
                        case LEFT :
                            break;
                        case CTRL :
                            break;
                        case SHIFT :
                            break;
                        case ALT :
                            break;
                        case CHAR_A :
                            if (eve.ctrlKey) {
                                // Ctrl+A 全选
                                break;
                            }
                        default :
                            setTimeout(function () {
                                comboUtil._searchTimeout(
                                    textInputJq, eve);
                            }, 10);
                            break;
                    }
                });
                textInputJq.bind("input", function (eve) {
                    var $this = $(this);
                    setTimeout(function () {
                        comboUtil._searchTimeout(textInputJq, eve);
                    }, 10);
                });
                if (textInputJq.val().length > 0) {
                    textInputJq[0].searching = setTimeout(function () {
                        comboUtil
                            .search(textInputJq, textInputJq.val(), {});
                    }, 150);
                }
            },
            _searchTimeout: function (textInputJq, eve) {
                var me = this;
                var comboUtil = this;
                var textInputDom = textInputJq[0];
                var value = textInputJq.val();
                var thisComboJjaxCacheMap = me.util.data()
                    .get("COMBO-AJAX-CACHE-UPPER-MAP")[textInputJq.attr("id")];
                var cacheJson = thisComboJjaxCacheMap[value];
                if (cacheJson != null) {
                    // 缓存里面有
                    clearTimeout(textInputDom.searching);
                    textInputJq.attr("term", textInputJq.val());
                    comboUtil.response(cacheJson, textInputJq, value, eve);
                    return;
                }
                if (value.length == 0) {
                    comboUtil.response({}, textInputJq, "", eve);
                    if (textInputDom.searching != null) {
                        clearTimeout(textInputDom.searching);
                    }
                    return;
                }
                clearTimeout(textInputDom.searching);
                textInputDom.searching = setTimeout(function () {
                    var val = textInputJq.val();
                    if (textInputJq.attr("term") != val) {
                        comboUtil.search(textInputJq, val, eve);
                    }
                    clearTimeout(textInputDom.searching);
                }, 200);
            },
            search: function (textInputJq, value, eve) {
                var textInputDom = textInputJq[0];
                value = value != null ? value : textInputJq.val();
                textInputJq.attr("term", textInputJq.val());
                var thisComboJjaxCacheMap = this.util.data()
                    .get("COMBO-AJAX-CACHE-UPPER-MAP")[textInputJq.attr("id")];
                var cacheJson = thisComboJjaxCacheMap[value];
                if (cacheJson != null) {
                    // 有缓存
                    this.response(cacheJson, textInputJq, value, eve);
                } else {
                    this.ajaxSearch(textInputJq, value, eve);
                }
            },
            ajaxSearch: function (textInputJq, value, eve) {
                var comboUtil = this;
                value = value != null ? value : textInputJq.val();
                textInputJq.parents("." + this.cons.comboDivClass + ":eq(0)")
                    .addClass("combo-loading");
                this.util.ajax(textInputJq.attr("data-url"), {
                    query: value
                }, function (json) {
                    textInputJq.parents("." + this.cons.comboDivClass
                        + ":eq(0)").removeClass("combo-loading");
                    comboUtil.response(json, textInputJq, value, eve);
                });
            },
            response: function (json, textInputJq, val, eve) {
                var ut = this.util;
                var optionArray = [];
                var valueField = textInputJq.attr("value-field");
                var textField = textInputJq.attr("text-field");
                if (json[ut.cons.jsonArrayProperty] != null) {// TODO wuqiang
                    var thisComboJjaxCacheMap = ut.data()
                        .get("COMBO-AJAX-CACHE-UPPER-MAP")[textInputJq
                        .attr("id")];
                    thisComboJjaxCacheMap[val] = json;
                }
                var len = 0;
                if (json[ut.cons.jsonArrayProperty] != null && json[ut.cons.jsonArrayProperty].length > 0) {
                    len = json[ut.cons.jsonArrayProperty].length;
                    for (var i = 0; i < len; i++) {
                        var dto = json[ut.cons.jsonArrayProperty][i];
                        var text = null;
                        if (textField != null && dto.hasOwnProperty(textField)) {
                            text = dto[textField];
                        } else {
                            text = dto["text"];
                        }
                        var value = null;
                        if (valueField != null && dto.hasOwnProperty(valueField)) {
                            value = dto[valueField];
                        } else {
                            value = dto["value"];
                        }
                        if (value == null) {
                            value = text;
                        }
                        optionArray.push({
                            value: value,
                            text: text
                        });
                    }
                }
                var comboDivJq = textInputJq.parents("." + this.cons.comboDivClass
                    + ":eq(0)");
                this.render(comboDivJq, optionArray, val, null, null, false, true);
                if (len > 0) {
                    this.showComboMenu(comboDivJq)
                } else {
                    this.hideComboDrop(comboDivJq, true);
                }
            },
            /**
             * 自定义combobox内容重绘
             *
             * @param {}
             *            comboboxDivJq combobox最外层DIV的jquery对象
             * @param {}
             *            optionArr [{value:11,text:"管理员"}]
             * @param {}
             *            _selectedValue 当前选中值（可选），不填则选中第一个
             * @param {}
             *            blankText 第一条空选项的显示值，如：全部类型
             * @param {}
             *            _blankValue 第一条空选项的真实值，如：""
             */
            render: function (comboboxDivJq, optionArr, _selectedValue, blankText,
                              _blankValue, isChangeVal, isHighlight) {
                var me = this;
                if (!me.util.isBoolean(isChangeVal)) {
                    isChangeVal = true;
                }
                if (!me.util.isBoolean(isHighlight)) {
                    // 是否高亮显示
                    isHighlight = false;
                }
                var textInputJq = comboboxDivJq.find("."
                    + me.cons.comboTextInputClass);
                var textInputRealVal = textInputJq.val();
                var blankValue = "";
                if (_blankValue != null) {
                    blankValue = _blankValue;
                }
                var forceSelection = textInputJq.attr("force-selection") != null;
                var ulEle = comboboxDivJq.find("ul");
                ulEle.children().remove();
                var liHtml = "";
                var selectText = "";
                var selectedValue = "";
                if (blankText != null) {
                    var _optionArr = [];
                    _optionArr.push({
                        value: blankValue,
                        text: blankText
                    });
                    for (var i = 0; i < optionArr.length; i++) {
                        _optionArr.push(optionArr[i]);
                    }
                    optionArr = _optionArr;
                }
                if (forceSelection) {
                    if (me.util.isArray(optionArr) && optionArr.length > 0) {
                        selectText = optionArr[0].text;
                        selectedValue = optionArr[0].value;
                    }
                }
                if (_selectedValue != null) {
                    selectedValue = _selectedValue;
                }
                var originalSelectedValue = _selectedValue;
                var isFindSelectValueText = false;
                if (me.util.isArray(optionArr)) {
                    for (var i = 0; i < optionArr.length; i++) {
                        if (optionArr[i].value == selectedValue) {
                            isFindSelectValueText = true;
                            selectText = optionArr[i].text;
                        }
                        var __val = me.util.str.encodeQuotes(optionArr[i].value);
                        var textHtml = optionArr[i].text == null
                            ? ""
                            : optionArr[i].text + "";
                        if (isHighlight) {
                            if (textHtml.indexOf(textInputRealVal) != -1) {
                                textHtml = textHtml.replace(textInputRealVal,
                                    "<span style=\"color:#49afcd;\">"
                                    + textInputRealVal + "</span>");
                            }
                        }
                        liHtml += "<li><a class=\"auto_dian combo-item\" title=\""
                            + optionArr[i].text + "\" option-value=\"" + __val
                            + "\" href=\"javascript:;\" target=\"_self\">"
                            + textHtml + "</a></li>";
                    }
                    ulEle.html(liHtml);
                }
                if ((!isFindSelectValueText) && (!forceSelection)) {
                    // 没有真正找到匹配的值
                    // ，且允许手动输入值
                    // 真正传入的值
                    if (originalSelectedValue != null) {
                        selectedValue = originalSelectedValue;
                        selectText = originalSelectedValue;
                    }
                }
                var hideInputJq = comboboxDivJq.find("."
                    + me.cons.comboHiddenInputClass);
                if (isChangeVal) {
                    textInputJq.val(selectText);
                    hideInputJq.val(selectedValue);
                }
                textInputJq.attr("original-value", selectText);
                hideInputJq.attr("original-value", selectedValue);
                me.bind(comboboxDivJq);
            },
            /**
             * 自定义combobox事件取消绑定
             *
             * @param {}
             *            comboboxDivJq combobox最外层DIV的jquery对象
             */
            unbind: function (comboDivJq) {
                var me = this;
                var comboTextInputJq = comboDivJq.find("input."
                    + me.cons.comboTextInputClass);
                var comboDropdownToggleJq = comboDivJq.find("."
                    + me.cons.comboDropdownToggleClass);
                comboTextInputJq.unbind("click", me.handler.showHideComboMenu);
                comboDivJq.unbind("focusin", me.handler.divFocusin);
                comboDivJq.unbind("focusout", me.handler.divFocusout);
                comboDropdownToggleJq.unbind("click", me.handler.showHideComboMenu);
                comboDivJq.find("a." + me.cons.comboItemClass).unbind("focus",
                    me.handler.comboItemOnmouseoverOnfocus).unbind("mouseover",
                    me.handler.comboItemOnmouseoverOnfocus);
                comboDivJq.find("a." + me.cons.comboItemClass).unbind("click",
                    me.handler.itemClick);
                comboTextInputJq.unbind("keydown", me.handler.selectOnKeyDown);
                comboDropdownToggleJq.unbind("keydown", me.handler.selectOnKeyDown);
                comboDivJq.find("a." + me.cons.comboItemClass).unbind("keydown",
                    me.handler.selectOnKeyDown);
            },
            /**
             * 自定义combobox事件重新绑定
             *
             * @param {}
             *            comboboxDivJq combobox最外层DIV的jquery对象
             */
            bind: function (comboDivJq) {
                var me = this;
                me.unbind(comboDivJq);
                var comboTextInputJq = comboDivJq.find("input."
                    + me.cons.comboTextInputClass);
                var comboDropdownToggleJq = comboDivJq.find("."
                    + me.cons.comboDropdownToggleClass);
                comboTextInputJq.bind("click", me.handler.showHideComboMenu);
                comboDivJq.bind("focusin", me.handler.divFocusin);
                comboDivJq.bind("focusout", me.handler.divFocusout);
                comboDropdownToggleJq.bind("click", me.handler.showHideComboMenu);
                comboDivJq.find("a." + me.cons.comboItemClass).bind("focus",
                    me.handler.comboItemOnmouseoverOnfocus).bind("mouseover",
                    me.handler.comboItemOnmouseoverOnfocus);
                comboDivJq.find("a." + me.cons.comboItemClass).bind("click",
                    me.handler.itemClick);
                comboTextInputJq.bind("keydown", me.handler.selectOnKeyDown);
                comboDropdownToggleJq.bind("keydown", me.handler.selectOnKeyDown);
                comboDivJq.find("a." + me.cons.comboItemClass).bind("keydown",
                    me.handler.selectOnKeyDown);
            },
            hideComboDrop: function (selectDivJq, isFocusBack) {
                var me = this;
                selectDivJq.find("." + me.cons.comboMenuClass).hide();
                setTimeout(function () {
                    // 修复在text input中打开menu后，又点击按钮，导致按钮的状态与menu的状态不符的bug
                    selectDivJq.removeClass("open");
                }, 10);
                if (isFocusBack) {
                    selectDivJq.find("." + me.cons.comboTextInputClass).focus();
                }
            },
            showComboMenu: function (selectDivJq) {
                var me = this;
                if (!selectDivJq.hasClass(me.cons.comboDivClass)) {
                    selectDivJq = selectDivJq.parents("." + me.cons.comboDivClass
                        + ":eq(0)");
                }
                var $thisMenuJq = selectDivJq.find("." + me.cons.comboMenuClass);
                $thisMenuJq.css("width", selectDivJq.width() + "px");
                var isShown = $thisMenuJq.css("display") == "none" ? false : true;
                if (!isShown) {
                    $("." + me.cons.comboDivClass).each(function () {
                        if (this != selectDivJq[0]) {
                            me.hideComboDrop($(this));
                        }
                    });
                    setTimeout(function () {
                        selectDivJq.addClass("open");
                    }, 10);
                    $thisMenuJq.show();
                }
                var selectedHiddenValue = selectDivJq.find("."
                    + me.cons.comboHiddenInputClass).val();
                $thisMenuJq.find("a." + me.cons.comboItemActiveClass)
                    .removeClass(me.cons.comboItemActiveClass);
                $thisMenuJq.find("a." + me.cons.comboItemClass + "["
                    + me.cons.comboOptionValueName + "='" + selectedHiddenValue
                    + "']").addClass(me.cons.comboItemActiveClass);

            },
            handler: {
                itemClick: function () {
                    var $this = $(this);
                    var $menu = $this.parents("." + util.combo.cons.comboMenuClass
                        + ":eq(0)");
                    $menu.find("a." + util.combo.cons.comboItemActiveClass)
                        .removeClass(util.combo.cons.comboItemActiveClass);
                    $this.addClass(util.combo.cons.comboItemActiveClass);
                    var $divJq = $menu.parents("." + util.combo.cons.comboDivClass
                        + ":eq(0)");
                    var $textInpu = $divJq.find("."
                        + util.combo.cons.comboTextInputClass);
                    var value = $this.attr("title") != null
                        ? $this.attr("title")
                        : $this.html();
                    $textInpu.val(value);
                    util.combo.hideComboDrop($divJq, true);
                    var hiddenValue = $this
                        .attr(util.combo.cons.comboOptionValueName);
                    if (typeof(hiddenValue) == 'undefined' || hiddenValue === null) {
                        hiddenValue = value;
                    }
                    $divJq.find("." + util.combo.cons.comboHiddenInputClass)
                        .val(hiddenValue);
                    /* 手动调用input的onchange事件 */
                    $divJq.find("." + util.combo.cons.comboTextInputClass).change();
                    $textInpu.focus();
                },
                divFocusin: function () {
                    $(this).addClass(util.combo.cons.comboDivFocusClass);
                },
                divFocusout: function () {
                    $(this).removeClass(util.combo.cons.comboDivFocusClass);
                },
                // 处理按下向上、向下按键
                selectOnKeyDown: function (_eve) {
                    var keyCode = _eve.keyCode;
                    var $this = $(this);
                    var $divJq = $(this).parents("."
                        + util.combo.cons.comboDivClass + ":eq(0)");
                    if (keyCode == 40 || keyCode == 38 || keyCode == 9) {
                        var ulMenuJq = $divJq.find("."
                            + util.combo.cons.comboMenuClass);
                        var focusItem = ulMenuJq.find("li a."
                            + util.combo.cons.comboItemClass + ":focus");
                        if (keyCode == 40) {
                            // 向下
                            util.combo.showComboMenu($divJq);
                            if (!util.isJqHasDom(focusItem)) {
                                focusItem = ulMenuJq.find("li a."
                                    + util.combo.cons.comboItemActiveClass);
                            }
                            var shouldFocusA = null;
                            if (util.isJqHasDom(focusItem)
                                && util
                                    .isJqHasDom(focusItem
                                        .parent()
                                        .next()
                                        .find("a."
                                        + util.combo.cons.comboItemClass))) {
                                shouldFocusA = focusItem.parent().next().find("a."
                                    + util.combo.cons.comboItemClass);
                            } else {
                                shouldFocusA = ulMenuJq
                                    .find("li a."
                                    + util.combo.cons.comboItemClass
                                    + ":eq(0)");
                            }
                            shouldFocusA.focus();
                        } else if (keyCode == 38) {
                            // 向上
                            var shouldFocusA = null;
                            if (!util.isJqHasDom(focusItem)) {
                                focusItem = ulMenuJq.find("li a."
                                    + util.combo.cons.comboItemActiveClass);
                            }
                            if (util.isJqHasDom(focusItem)
                                && util
                                    .isJqHasDom(focusItem
                                        .parent()
                                        .prev()
                                        .find("a."
                                        + util.combo.cons.comboItemClass))) {
                                shouldFocusA = focusItem.parent().prev().find("a."
                                    + util.combo.cons.comboItemClass);
                            } else {
                                shouldFocusA = ulMenuJq.find("li a:last");
                            }
                            shouldFocusA.focus();
                        } else if (keyCode == 9) {
                            // tab且焦点是在text input上
                            if ($this.hasClass(util.combo.cons.comboTextInputClass)
                                || $this
                                    .hasClass(util.combo.cons.comboDropdownToggleClass)) {
                                return true;
                            } else {
                                util.combo.showComboMenu($divJq);
                                if (!util.isJqHasDom(focusItem)) {
                                    focusItem = ulMenuJq.find("li a."
                                        + util.combo.cons.comboItemActiveClass);
                                }
                                var shouldFocusA = null;
                                if (util.isJqHasDom(focusItem)
                                    && util
                                        .isJqHasDom(focusItem
                                            .parent()
                                            .next()
                                            .find("a."
                                            + util.combo.cons.comboItemClass))) {
                                    shouldFocusA = focusItem
                                        .parent()
                                        .next()
                                        .find("a."
                                        + util.combo.cons.comboItemClass);
                                } else {
                                    shouldFocusA = ulMenuJq.find("li a."
                                        + util.combo.cons.comboItemClass
                                        + ":eq(0)");
                                }
                                shouldFocusA.focus();
                            }
                        }
                        return false;
                    } else if (keyCode == 27) {
                        // esc
                        util.combo.hideComboDrop($divJq, true);
                        return false;
                    } else {
                        return true;
                    }
                },
                showHideComboMenu: function (_event) {
                    var _this = this;
                    var $divJq = $(_this).parent();
                    var $thisMenuJq = $divJq.find("."
                        + util.combo.cons.comboMenuClass);
                    var isShown = $thisMenuJq.css("display") == "none"
                        ? false
                        : true;
                    if (isShown) {
                        util.combo.hideComboDrop($divJq);
                    } else {
                        util.combo.showComboMenu($divJq);
                    }
                },
                comboItemOnmouseoverOnfocus: function () {
                    var $this = $(this);
                    var $menu = $this.parent().parent();
                    $menu.find("a." + util.combo.cons.comboItemActiveClass)
                        .removeClass(util.combo.cons.comboItemActiveClass);
                    $this.addClass(util.combo.cons.comboItemActiveClass);
                }
            }
        },
        /**
         * pagination组件JS版
         *
         * @type
         */
        pagination: {
            util: null,
            init: function (util) {
                this.util = util;
            },
            cons: {
                REQUEST_PARAM_PAGE_SIZE: "ps",
                REQUEST_PARAM_PAGE_NO: "pn"
            },
            /**
             * JS内存中的数组分页
             *
             * @param {Array}
             *            arr
             * @param {Number}
             *            pageNo
             * @param {Number}
             *            pageSize
             * @return {JSON}
             */
            memoryPageQueryJson: function (arr, pageNo, pageSize) {
                var ut = this.util;
                var json = {};
                json[ut.cons.jsonSuccessProperty] = true;
                var array = [];
                json[ut.cons.jsonArrayProperty] = array;
                array.push(this.memoryPageQuery(arr, pageNo, pageSize));
                return json;
            },
            /**
             * JS内存中的数组分页
             *
             * @param {Array}
             *            arr
             * @param {Number}
             *            pageNo
             * @param {Number}
             *            pageSize
             * @return {Page}
             */
            memoryPageQuery: function (arr, pageNo, pageSize) {
                var me = this;
                var util = me.util;
                var ps = util.getPageSize();
                var pn = 1;
                if (util.isNumber(pageSize) && pageSize > 0) {
                    ps = pageSize;
                }
                if (util.isNumber(pageNo) && pageNo > 0) {
                    pn = pageNo;
                }
                var page = {
                    /**
                     * 应该显示几行空白tr
                     */
                    blankRowCount: 5,
                    /**
                     * 最大空白行数
                     */
                    maxBlankRowCount: 5,
                    /**
                     * 每页记录数（默认由SystemConst定义）
                     */
                    pageSize: ps,
                    /**
                     * 当前页（默认1）
                     */
                    pageNo: pn,
                    /**
                     * 本次分页查询的所有记录数
                     */
                    rowCount: 0,
                    /**
                     * 总页数（由：rowCount和pageSize计算得出）
                     */
                    pageCount: 0,

                    // -- 返回结果 --//
                    rs: []
                };
                if ((page.pageNo + "").indexOf(".") != -1) {
                    var pcs = (page.pageNo + "");
                    var dotIndex = pcs.indexOf(".");
                    pcs = pcs.substring(0, dotIndex);
                    page.pageNo = pcs * 1;
                }
                if (util.isArray(arr)) {
                    page.rowCount = arr.length;
                    page.pageCount = (page.rowCount + page.pageSize - 1)
                        / page.pageSize;
                    if ((page.pageCount + "").indexOf(".") != -1) {
                        var pcs = (page.pageCount + "");
                        var dotIndex = pcs.indexOf(".");
                        pcs = pcs.substring(0, dotIndex);
                        page.pageCount = pcs * 1;
                    }
                    if (page.pageNo > page.pageCount) {
                        if (page.pageCount == 0) {
                            page.pageNo = 1;
                        } else {
                            page.pageNo = page.pageCount;
                        }
                    }
                    var startIndex = (page.pageNo - 1) * page.pageSize;
                    var endIndex = startIndex + page.pageSize - 1;
                    if (endIndex > page.rowCount - 1) {
                        endIndex = page.rowCount - 1;
                    }
                    for (var i = startIndex; i <= endIndex; i++) {
                        page.rs.push(arr[i]);
                    }
                    if (page.rs != null && page.rs.length > 0) {
                        if (page.pageSize < page.maxBlankRowCount) {
                            page.blankRowCount = page.pageSize - page.rs.length;
                        } else {
                            page.blankRowCount = page.maxBlankRowCount
                                - page.rs.length;
                        }
                        if (page.blankRowCount < 0) {
                            page.blankRowCount = 0;
                        }
                    }
                }
                return page;
            },
            /**
             * @param upEleJq
             *            要绘制在那个元素中，上级DIV的jQuery对象
             * @param config
             *            配置，等同于<ech:pagination/>的属性<br>
             *            例如：<br>
             *            <br>{<br>
		 *            url:{String:Action分页地址(一定返回Page对象的JSON:{success:true/false,root:[{rs:[],pageNo:1}]})}<br>
		 *            /{Function:JS内存分页方法（第一个参数为pageNo）（返回JSON:{success:true/false,root:[{rs:[],pageNo:1}]}）}
		 *            参考：pmksm004.js--PG.pmksm004PageFn<br>
		 *            /{Array:JS内存数组分页，分页大小采用默认大小}
		 *            data:[{value:1,text:"已发送"}],// 必填<br>
		 *            name:"smsStatus", // 必填 <br>
		 *            selectedValue:1, <br>
		 *            readOnly:true ,//默认true <br>
		 *            autoComplete:true ,//默认true <br>
		 *            cls:null , <br>
		 *            placeholder:null, <br>
		 *            blankText:null, <br>
		 *            blankValue:"" // 默认"" <br>}
             * @param {Function}(必填)
             *            parameterBuilder 用于构建附加参数的方法
             * @param {Function}
             *            drawTableFn 把JSON传给这个方法，由这个方法去绘制表格
             * @param {Object/Array}(可选)
             *            例如：$("#xxxid")/[$("#xxxid1"),$("#xxxid2")]
             *            maskEleJqOrArray 在Ajax请求的时候，把这些元素用遮罩遮住
             * @param {Object}(可选)
             *            drawTableFnScope drawTableFn这个方法的运行域
             * @param {Object}(可选)
             *            _relativePaginationConfig 关联同页面中的另外一个分页组件
             *            {jq:$("#另外一个分页组件的上级"),config:{这个组件的特定配置与第二个参数config写法相同（不写则默认与config相同）}}
             */
            build: function (upEleJq, config, _parameterBuilder, drawTableFn,
                             _maskEleJqOrArray, drawTableFnScope, _relativePaginationConfig) {
                var me = this;
                var ut = me.util;
                /**
                 * 返回的代理对象
                 */
                var returnObj = {
                    jq: upEleJq,
                    args: arguments,
                    reload: function (pageNo) {
                        this.jq.each(function () {
                            if (ut.isFun(this.paginationReload)) {
                                this.paginationReload(pageNo);
                            }
                        });
                    }
                };
                var relativePaginationConfig = _relativePaginationConfig;
                var conf = {
                    page: {},
                    url: null,
                    cls: null,
                    go: true,
                    statusBar: true,
                    id: null
                };
                var maskEleJqOrArray = [];
                if (ut.isArray(_maskEleJqOrArray)) {
                    for (var i = 0; i < _maskEleJqOrArray.length; i++) {
                        if (ut.isJqHasDom(_maskEleJqOrArray[i])) {
                            maskEleJqOrArray.push(_maskEleJqOrArray[i]);
                        }
                    }
                } else if (ut.isJqHasDom(_maskEleJqOrArray)) {
                    maskEleJqOrArray.push(_maskEleJqOrArray)
                }
                if (me.util.isObj(config)) {
                    conf.page = config.page;
                    conf.url = config.url;
                    if (me.util.isBoolean(config.go) && config.go === false) {
                        conf.go = false;
                    }
                    if (me.util.isBoolean(config.statusBar)
                        && config.statusBar === false) {
                        conf.statusBar = false;
                    }
                    conf.id = config.id;
                }
                if (me.util.isObj(config)
                    && me.util.isObj(relativePaginationConfig)
                    && me.util.isObj(relativePaginationConfig.config)) {
                    relativePaginationConfig.config.page = config.page;
                    relativePaginationConfig.config.url = config.url;
                    if (!me.util.isBoolean(relativePaginationConfig.config.go)) {
                        relativePaginationConfig.config.go = conf.go;
                    }
                    if (!me.util
                            .isBoolean(relativePaginationConfig.config.statusBar)) {
                        relativePaginationConfig.config.statusBar = conf.statusBar;
                    }
                }
                var parameterBuilder = function () {
                    return null;
                };
                if (me.util.isFun(_parameterBuilder)) {
                    parameterBuilder = _parameterBuilder;
                }
                var extParamRs = parameterBuilder();
                var extParamStr = "";
                if (ut.isArray(extParamRs)) {
                    for (var i = 0; i < extParamRs.length; i++) {
                        if (i != 0) {
                            extParamStr += "&";
                        }
                        extParamStr += (extParamRs[i].name + "=" + extParamRs[i].value);
                    }
                } else if (ut.isString(extParamRs)) {
                    extParamStr = extParamRs;
                }
                var _drawTableFnScope = drawTableFnScope;
                var _drawTableFn = function (json) {
                };
                if (ut.isFun(drawTableFn)) {
                    _drawTableFn = drawTableFn;
                }
                // if (ut.isObj(upEleJq[0].parentPaginationConfig)
                // && ut.isJqHasDom(upEleJq[0].parentPaginationConfig.jq)
                // && ut.isObj(upEleJq[0].parentPaginationConfig.config)) {
                // upEleJq[0].parentPaginationConfig.config.page = conf.page;
                // me.build(upEleJq[0].parentPaginationConfig.jq,
                // upEleJq[0].parentPaginationConfig.config, null, null,
                // null, null);
                // }
                upEleJq.each(function () {
                    if (this.conf == null) {
                        this.conf = conf;
                    } else {
                        this.conf.page = conf.page;
                    }
                    if (this.relativePaginationConfig == null) {
                        this.relativePaginationConfig = relativePaginationConfig;
                    } else {
                        if (me.util.isObj(relativePaginationConfig)
                            && me.util.isObj(relativePaginationConfig.config)) {
                            if (this.relativePaginationConfig.config == null) {
                                this.relativePaginationConfig.config = {};
                            }
                            this.relativePaginationConfig.config.page = relativePaginationConfig.config.page;
                        }
                    }
                    if (this.maskEleJqOrArray == null) {
                        this.maskEleJqOrArray = maskEleJqOrArray;
                    }
                });
                if (ut.isObj(relativePaginationConfig)
                    && ut.isJqHasDom(relativePaginationConfig.jq)) {
                    relativePaginationConfig.jq.each(function () {
                        if (this.conf == null) {
                            this.conf = relativePaginationConfig.config;
                        } else {
                            this.conf.page = relativePaginationConfig.config.page;
                        }
                        if (this.parentPaginationConfig == null) {
                            this.parentPaginationConfig = {
                                jq: upEleJq,
                                config: config
                            };
                        } else {
                            this.parentPaginationConfig.config.page = conf.page;
                        }
                        if (this.maskEleJqOrArray == null) {
                            this.maskEleJqOrArray = maskEleJqOrArray;
                        }
                    });
                }
                /**
                 * 重绘制分页插件
                 */
                var paginationRender = function (json, _divDomObj) {
                    var divDomObj = this;
                    if (window.util.isObj(_divDomObj)) {
                        divDomObj = _divDomObj;
                    }
                    divDomObj.conf.page = json[ut.cons.jsonArrayProperty][0];
                    me.build($(divDomObj), divDomObj.conf,
                        divDomObj.parameterBuilder, divDomObj.drawTableFn,
                        divDomObj.maskEleJqOrArray, divDomObj.drawTableFnScope);
                    var __relaConf = null;
                    if (ut.isObj(divDomObj.relativePaginationConfig)
                        && ut.isJqHasDom(divDomObj.relativePaginationConfig.jq)
                        && ut.isObj(divDomObj.relativePaginationConfig.config)) {
                        __relaConf = divDomObj.relativePaginationConfig;
                    }
                    if (ut.isObj(divDomObj.parentPaginationConfig)
                        && ut.isJqHasDom(divDomObj.parentPaginationConfig.jq)
                        && ut.isObj(divDomObj.parentPaginationConfig.config)) {
                        __relaConf = divDomObj.parentPaginationConfig;
                    }
                    if (ut.isObj(__relaConf)) {
                        __relaConf.config.page = divDomObj.conf.page;
                        me.build(__relaConf.jq, __relaConf.config,
                            divDomObj.parameterBuilder, divDomObj.drawTableFn,
                            divDomObj.maskEleJqOrArray,
                            divDomObj.drawTableFnScope);
                    }
                }
                /**
                 * 调用绘制table的方法
                 */
                var drawTable = function (json) {
                    var scope = this.util.isObj(this.drawTableFnScope)
                        ? this.drawTableFnScope
                        : this;
                    this.drawTableFn.call(scope, json);
                }
                var maskFn = function () {
                    for (var i = 0; i < maskEleJqOrArray.length; i++) {
                        ut.loading(maskEleJqOrArray[i]);
                    }
                };
                var unmaskFn = function () {
                    for (var i = 0; i < maskEleJqOrArray.length; i++) {
                        ut.cancelLoadTip(maskEleJqOrArray[i]);
                    }
                };
                upEleJq.each(function () {
                    if (this.maskFn == null) {
                        this.maskFn = maskFn;
                    }
                    if (this.unmaskFn == null) {
                        this.unmaskFn = unmaskFn;
                    }
                    if (this.actionUrl == null) {
                        this.actionUrl = conf.url;
                    }
                    if (this.drawTableFn == null) {
                        this.drawTableFn = drawTableFn;
                    }
                    if (this.drawTableFnScope == null) {
                        this.drawTableFnScope = drawTableFnScope;
                    }
                    if (this.drawTable == null) {
                        this.drawTable = drawTable;
                    }
                    if (this.parameterBuilder == null) {
                        this.parameterBuilder = parameterBuilder;
                    }
                    if (this.paginationRender == null) {
                        this.paginationRender = paginationRender;
                    }
                });
                if (ut.isObj(relativePaginationConfig)
                    && ut.isJqHasDom(relativePaginationConfig.jq)) {
                    relativePaginationConfig.jq.each(function () {
                        if (this.maskFn == null) {
                            this.maskFn = maskFn;
                        }
                        if (this.unmaskFn == null) {
                            this.unmaskFn = unmaskFn;
                        }
                        if (this.actionUrl == null) {
                            this.actionUrl = conf.url;
                        }
                        if (this.drawTableFn == null) {
                            this.drawTableFn = drawTableFn;
                        }
                        if (this.drawTableFnScope == null) {
                            this.drawTableFnScope = drawTableFnScope;
                        }
                        if (this.drawTable == null) {
                            this.drawTable = drawTable;
                        }
                        if (this.parameterBuilder == null) {
                            this.parameterBuilder = parameterBuilder;
                        }
                        if (this.paginationRender == null) {
                            this.paginationRender = paginationRender;
                        }
                    });
                }
                var page = conf.page;
                var wpg = PG;
                var paginationReload = function (_$pageSize, _divDomObj) {
                    var $divJq = $(this);
                    if (window.util.isDom(_divDomObj)) {
                        $divJq = $(_divDomObj);
                    }
                    var $pageSize = 1;
                    if (ut.isNumber(_$pageSize) && _$pageSize > 0) {
                        $pageSize = _$pageSize;
                    }
                    var $currentNumAJq = $divJq.find(".pagination")
                        .find("li.active a");
                    if (ut.isJqHasDom($currentNumAJq)
                        && util.isNumber($currentNumAJq.html() * 1)
                        && ($currentNumAJq.html() * 1 > 0)) {
                        $pageSize = $currentNumAJq.html() * 1;
                    }
                    if (ut.isString(conf.url)) {
                        // 第一次传入，没有page对象
                        ut.ajax(conf.url, me.buildParams($pageSize, extParamStr),
                            function (json) {
                                unmaskFn();
                                paginationRender(json, upEleJq[0]);
                                if (ut.isJsonSuccess(json)) {
                                    var scope = ut.isObj(_drawTableFnScope)
                                        ? _drawTableFnScope
                                        : me;
                                    _drawTableFn.call(scope, json);
                                } else {
                                    TIPS.err(ut.getJsonErrorMsg(json));
                                }
                            });
                        maskFn();
                    } else if (ut.isFun(conf.url)) {
                        // JS分页方法
                        maskFn();
                        var json = conf.url($pageSize);
                        paginationRender(json, upEleJq[0]);
                        if (ut.isJsonSuccess(json)) {
                            var scope = ut.isObj(_drawTableFnScope)
                                ? _drawTableFnScope
                                : me;
                            _drawTableFn.call(scope, json);
                        } else {
                            TIPS.err(ut.getJsonErrorMsg(json));
                        }
                        unmaskFn();
                    } else if (ut.isArray(conf.url)) {
                        // JS内存数组
                        maskFn();
                        var json = me.memoryPageQueryJson(conf.url, $pageSize);
                        paginationRender(json, upEleJq[0]);
                        if (ut.isJsonSuccess(json)) {
                            var scope = ut.isObj(_drawTableFnScope)
                                ? _drawTableFnScope
                                : me;
                            _drawTableFn.call(scope, json);
                        } else {
                            TIPS.err(ut.getJsonErrorMsg(json));
                        }
                        unmaskFn();
                    }
                };
                upEleJq.each(function () {
                    if (!window.util.isFun(this.paginationReload)) {
                        this.paginationReload = paginationReload;
                    }
                });
                if (!me.util.isObj(page)) {
                    // 第一次传入，没有page对象
                    paginationReload(1, upEleJq[0]);
                    return returnObj;
                }
                if (conf.id == null || me.util.str.trim((conf.id + "")) == "") {
                    conf.id = "pagination-" + me.util.getRandomNum();
                }
                var id = conf.id;
                var html = "";
                var divHtml = "<div id='"
                    + conf.id
                    + "' class='pagination-cmp-div"
                    + ((conf.cls != null && (!conf.cls.trim().equals("")))
                        ? " " + conf.cls
                        : "") + "'>" + "</div>";
                var paginationJqArray = [];
                upEleJq.each(function () {
                    var $this = $(this);
                    $this.html("");
                    $this.html(divHtml);
                    paginationJqArray.push($this
                        .find(".pagination-cmp-div"));
                });
                if (conf.statusBar) {
                    if (page.rowCount > 0) {
                        html += ("<div class=\"pageCountBar\">共&nbsp;<span class=\"rowCount\">"
                        + page.rowCount
                        + "</span>&nbsp;条，共&nbsp;<span class=\"pageCount\">"
                        + page.pageCount + "</span>&nbsp;页。</div>");
                    } else {
                        html += ("<div class=\"pageCountBar\"><em style=\"color:#888;\">没有符合的数据</em></div>");
                    }
                }
                if (conf.go) {
                    html += ("<div class='input-prepend input-append pageJump'><span class='add-on'>跳到</span>");
                    html += ("<input class='paginationInput' id='" + id
                    + "-go-number" + "' type='text' placeholder='"
                    + page.pageNo + "' value='" + page.pageNo + "' onkeydown='(function(_this){_this.onkeypress=function(_event){ var eve=_event;if(window.event){eve=window.event;}eve=$.event.fix(eve);if(eve.keyCode===13){$(_this).next().click();return false;}}})(this);'>");
                    var ajaxCallbackFn = "";
                    var goToJsFn = "(function($this){"
                        + "var _divDom=$this.parent().parent().parent()[0];"
                        + "if(util.isString(_divDom.actionUrl)){"
                        + "window.util.ajax(_divDom.actionUrl,window.util.pagination.buildParams($this.prev().val()*1,_divDom.parameterBuilder()),function(json){_divDom.unmaskFn();_divDom.paginationRender(json);_divDom.drawTable(json);});_divDom.maskFn();"
                        + "} else if (util.isFun(_divDom.actionUrl)) {"
                        + "_divDom.maskFn();var json = _divDom.actionUrl($this.prev().val()*1);_divDom.paginationRender(json);_divDom.drawTable(json);_divDom.unmaskFn();"
                        + "} else if (util.isArray(_divDom.actionUrl)) {"
                        + "_divDom.maskFn();var json = window.util.pagination.memoryPageQueryJson(_divDom.actionUrl,$this.prev().val()*1);_divDom.paginationRender(json);_divDom.drawTable(json);_divDom.unmaskFn();"
                        + "}" + "})($(this));' id='" + id + "-go-btn";
                    html += ("<button type='button' onclick='" + goToJsFn + "' class='btn'>Go</button></div>");
                }
                html += ("<div class='pageinitionBar fr'>");
                html += ("<div id='" + conf.id + "-number" + "' class='pagination'>");
                html += ("<ul>");

                if (page.pageNo <= 1) {
                    // 上一页
                    html += (me.buildLi(true, false, false, 0, "&lt;"));
                } else {
                    // 上一页
                    html += (me.buildLi(false, false, false, page.pageNo - 1, "&lt;"));
                }
                // 第一页
                if (page.pageNo > 2) {
                    html += (me.buildLi(false, false, false, 1, "1"));
                }
                // ...
                if (page.pageNo > 3) {
                    // if (page.pageNo == 3 + 1) {
                    // html += (me.buildLi(false, false, false, 2, "2"));
                    // } else {
                    html += (me.buildLi(false, false, true, 0, "..."));
                    // }
                }
                if (page.pageNo === 2 || page.pageNo === 3) {
                    html += (me.buildLi(false, false, false, page.pageNo - 1,
                        (page.pageNo - 1) + ""));
                }
                html += (me
                    .buildLi(false, true, false, page.pageNo, (page.pageNo) + ""));
                if (page.pageNo + 1 === page.pageCount
                    || page.pageNo + 2 === page.pageCount) {
                    html += (me.buildLi(false, false, false, page.pageNo + 1,
                        (page.pageNo + 1) + ""));
                }
                // ...
                if (page.pageNo <= page.pageCount - 3) {
                    // if (page.pageNo == page.pageCount - 3) {
                    // html += (me.buildLi(false, false, false, page.pageCount - 1,
                    // (page.pageCount - 1) + ""));
                    // } else {
                    html += (me.buildLi(false, false, true, 0, "..."));
                    // }
                }
                if (page.pageNo <= page.pageCount - 2) {
                    html += (me.buildLi(false, false, false, page.pageCount,
                        (page.pageCount) + ""));
                }
                // 下一页
                if (page.pageNo < page.pageCount) {
                    html += (me.buildLi(false, false, false, page.pageNo + 1, "&gt;"));
                } else {
                    html += (me.buildLi(true, false, false, 0, "&gt;"));
                }
                html += "</ul>";
                html += "</div>";
                html += "</div>";
                for (var i = 0; i < paginationJqArray.length; i++) {
                    var $this = paginationJqArray[i];
                    $this.html("");
                    $this.html(html);
                }
                return returnObj;
            },
            buildLi: function (isDisabled, isCurrent, isSplit, num, aContent) {
                var li = "<li";
                if (isDisabled || isCurrent || isSplit) {
                    li += " class='";
                    if (isDisabled) {
                        li += " disabled";
                    }
                    if (isCurrent) {
                        li += " active";
                    }
                    if (isSplit) {
                        li += " split";
                    }
                    li += "'";
                }
                var goToJsFn = "(function($this){"
                    + "var _divDom=$this.parent().parent().parent().parent().parent().parent()[0];"
                    + "if(util.isString(_divDom.actionUrl)){ "
                    + "window.util.ajax(_divDom.actionUrl,window.util.pagination.buildParams("
                    + num
                    + ",_divDom.parameterBuilder()),function(json){_divDom.unmaskFn();_divDom.paginationRender(json);_divDom.drawTable(json);});_divDom.maskFn();"
                    + "} else if (util.isFun(_divDom.actionUrl)) {"
                    + "_divDom.maskFn();var json = _divDom.actionUrl("
                    + num
                    + ");_divDom.paginationRender(json);_divDom.drawTable(json);_divDom.unmaskFn();"
                    + "} else if (util.isArray(_divDom.actionUrl)) {"
                    + "_divDom.maskFn();var json = window.util.pagination.memoryPageQueryJson(_divDom.actionUrl,"
                    + num
                    + ");_divDom.paginationRender(json);_divDom.drawTable(json);_divDom.unmaskFn();"
                    + "}" + "})($(this));";
                li += ("><a target='_self' href='javascript:;' "
                + ((num != null && num > 0)
                    ? ("onclick='" + goToJsFn + "return false;'")
                    : "") + ">" + aContent + "</a></li>");
                return li;
            },
            buildParams: function (pageNo, extParamRs) {
                var me = this;
                var ut = me.util;
                var allParams = "";
                if (ut.isArray(extParamRs)) {
                    for (var i = 0; i < extParamRs.length; i++) {
                        if (i != 0) {
                            allParams += "&";
                        }
                        allParams += (extParamRs[i].name + "=" + extParamRs[i].value);
                    }
                } else if (ut.isString(extParamRs)) {
                    allParams = extParamRs;
                }
                if (allParams != "") {
                    allParams += "&";
                }
                allParams += (me.cons.REQUEST_PARAM_PAGE_NO + "=");
                if (pageNo != null) {
                    allParams += (pageNo + "");
                }
                return allParams;
            }
        },
        /**
         * 和ELFuncUtil的同名方法作用相同
         *
         * @param {}
         *            labelText 名称值，如："手机"
         * @return {String} "手机："
         */
        formLabel: function (labelText) {
            if (labelText != null) {
                labelText = labelText + "";
                if (this.str.endsWith(labelText, "：")
                    || this.str.endsWith(labelText, ":")) {
                    return labelText;
                } else {
                    return labelText + (MSG.find(this.cons.txtSemicolon) || "：");
                }
            } else {
                return "null" + "：";
            }
        },
        __checkboxCheckAllBindObj: {
            gridCheckAllClass: "grid-check-all",
            gridCheckClass: "grid-check",
            checkboxCheckedTrClass: "table-tr-checked",
            checkBoxTdClass: "checkBoxTd",
            checkAllClickFn: function () {
                var $this = $(this);
                var $tableJq = $this.parents("table:eq(0)");
                // 取消子元素对其实现的半选中状态
                $(this).prop("indeterminate", false);
                if (this.checked) {
                    $tableJq.find("input[type='checkbox']."
                        + util.__checkboxCheckAllBindObj.gridCheckClass).each(
                        function () {
                            if (!this.checked) {
                                $(this).click();
                            }
                        });
                    // 全选
                } else {
                    // 取消全选
                    $tableJq.find("input[type='checkbox']."
                        + util.__checkboxCheckAllBindObj.gridCheckClass).each(
                        function () {
                            if (this.checked) {
                                $(this).click();
                            }
                        });
                }
            },
            tdCheckboxClickFn: function () {
                var checkboxCheckedTrClass = util.__checkboxCheckAllBindObj.checkboxCheckedTrClass;
                var gridCheckAllClass = util.__checkboxCheckAllBindObj.gridCheckAllClass;
                var gridCheckClass = util.__checkboxCheckAllBindObj.gridCheckClass;
                var _this = this;
                var $this = $(_this);
                var $tableJq = $this.parents("table:eq(0)");
                if (_this.checked) {
                    // 选中
                    $this.parents("tr:eq(0)").addClass(checkboxCheckedTrClass);
                } else {
                    $this.parents("tr:eq(0)").removeClass(checkboxCheckedTrClass);
                }
                var subCheckJqArr = $tableJq.find("input[type='checkbox']."
                    + gridCheckClass);
                var allCount = subCheckJqArr.length;
                var checkedCount = 0;
                subCheckJqArr.each(function () {
                    if (this.checked) {
                        checkedCount++;
                    }
                });
                var gridCheckAllJq = $tableJq.find("input[type='checkbox']."
                    + gridCheckAllClass);
                if (checkedCount >= allCount) {
                    // 全选了
                    gridCheckAllJq.prop("checked", true);
                    gridCheckAllJq.prop("indeterminate", false);
                } else {
                    // 没有全选
                    gridCheckAllJq.prop("checked", false);
                    if (checkedCount > 0) {
                        // 选择了一部分
                        gridCheckAllJq.prop("indeterminate", true);
                    } else {
                        gridCheckAllJq.prop("indeterminate", false);
                    }
                }
            },
            tdRadioClickFn: function () {
                var checkboxCheckedTrClass = util.__checkboxCheckAllBindObj.checkboxCheckedTrClass;
                var _this = this;
                var $_this = $(_this);
                var $tableJq = $_this.parents("table:eq(0)");
                var _thisName = $_this.attr("name");
                $tableJq.find("tr").removeClass(checkboxCheckedTrClass);
                if (_this.checked) {
                    // 选中
                    $_this.parents("tr:eq(0)").addClass(checkboxCheckedTrClass);
                }
            }
        },
        checkboxCheckAllUnbind: function (tableJq) {
            var me = this;
            var gridCheckAllClass = me.__checkboxCheckAllBindObj.gridCheckAllClass;
            var gridCheckClass = me.__checkboxCheckAllBindObj.gridCheckClass;
            if (this.isJqHasDom(tableJq)) {
                tableJq.each(function () {
                    var $tableJq = $(this);
                    var gridCheckAllJq = $tableJq.find("input[type='checkbox']."
                        + gridCheckAllClass);
                    gridCheckAllJq.unbind("click",
                        me.__checkboxCheckAllBindObj.checkAllClickFn);
                    $tableJq.find("input[type='radio']." + gridCheckClass).unbind(
                        "click", me.__checkboxCheckAllBindObj.tdRadioClickFn);
                    $tableJq.find("input[type='checkbox']." + gridCheckClass)
                        .unbind("click",
                        me.__checkboxCheckAllBindObj.tdCheckboxClickFn);
                });
            }
        },
        /**
         * 让一览的列表里的选中全部checkbox支持响应事件 只需加入样式“grid-check-all”
         *
         * @param {}
         *            tableJq
         */
        checkboxCheckAllBind: function (tableJq) {
            var me = this;
            var gridCheckAllClass = me.__checkboxCheckAllBindObj.gridCheckAllClass;
            var gridCheckClass = me.__checkboxCheckAllBindObj.gridCheckClass;
            var checkboxCheckedTrClass = me.__checkboxCheckAllBindObj.checkboxCheckedTrClass;
            var checkBoxTdClass = me.__checkboxCheckAllBindObj.checkBoxTdClass;
            if (this.isJqHasDom(tableJq)) {
                tableJq.each(function () {
                    var $tableJq = $(this);
                    var gridCheckAllJq = $tableJq.find("input[type='checkbox']."
                        + gridCheckAllClass);
                    gridCheckAllJq.bind("click",
                        me.__checkboxCheckAllBindObj.checkAllClickFn);
                    $tableJq.find("input[type='radio']." + gridCheckClass).bind(
                        "click", me.__checkboxCheckAllBindObj.tdRadioClickFn);
                    $tableJq.find("input[type='checkbox']." + gridCheckClass)
                        .bind("click",
                        me.__checkboxCheckAllBindObj.tdCheckboxClickFn);
                });
            }
        },
        /**
         * 绑定table的相关事件
         *
         * @param {}
         *            tableJq
         */
        tableBind: function (tableJq) {
            var gridCheckAllClass = "grid-check-all";
            var gridCheckClass = "grid-check";
            var checkBoxTdClass = "checkBoxTd";
            var tableCheckboxClass = "table-row-select";
            tableJq.find("tbody td").bind("click", function (_event) {
                if (_event != null
                    && $(_event.currentTarget).hasClass(checkBoxTdClass)
                    && _event.target == $(_event.currentTarget)
                        .find("input[type='checkbox']." + gridCheckClass)[0]) {
                    // 直接点击checkbox的时候也会触发这个checkbox所属上级td的click事件，所以此时不应该执行后面的代码
                    return;
                }
                // 是否按下Ctrl键
                var isCtrlKey = _event.ctrlKey;
                var _this = this;
                var $this = $(_this);
                var currentTrCheckboxJq = null;
                if ($this.hasClass(checkBoxTdClass)) {
                    currentTrCheckboxJq = $this.find("input[type='checkbox']."
                        + gridCheckClass);
                } else {
                    currentTrCheckboxJq = $this.parent().find("td."
                        + checkBoxTdClass).find("input[type='checkbox']."
                        + gridCheckClass);
                }
                if (!util.isJqHasDom(currentTrCheckboxJq)) {
                    return;
                }
                currentTrCheckboxJq.click();
                var currentTrCheckboxDom = currentTrCheckboxJq[0];
                if (!isCtrlKey) {
                    $this.parents("table").find("input[type='checkbox']."
                        + gridCheckClass).each(function () {
                        var __this = this;
                        if (currentTrCheckboxDom != __this
                            && currentTrCheckboxDom.checked && __this.checked) {
                            $(__this).click();
                        }
                    });
                }
            });
        },
        /**
         * 开关组件的事件绑定方法
         *
         * @param {}
         *            switchBtnDivJq 开关组件的上级DIV的jQuery对象
         */
        switchBtnBindFn: function (switchBtnDivJq) {
            switchBtnDivJq.bind("click", function (_event) {
                // var eve = window.event||_event;
                var eve = _event;
                var $this = $(this);
                if ($this.hasClass("switch-open")) {
                    $this.removeClass("switch-open")
                        .addClass("switch-close");
                    $this.find(".switch-left")
                        .removeClass("active btn-info").html("&nbsp;");
                    $this.find(".switch-right").addClass("active")
                        .html($this.find(".switch-right")
                            .attr("disValue"));
                } else {
                    $this.removeClass("switch-close")
                        .addClass("switch-open");
                    $this.find(".switch-left").addClass("active btn-info")
                        .html($this.find(".switch-left")
                            .attr("disValue"));
                    $this.find(".switch-right")
                        .removeClass("active btn-info").html("&nbsp;");
                }
                var targetId = $this.attr("target_id");
                if (targetId != null) {
                    $("#" + targetId).val($this.find(".active").val());
                }
                eve.stopPropagation();
            });
        },
        /**
         * 弹出登录窗口<br>
         * 由li-ningning维护
         *
         * @param {}
         *            _type(
         * @Decleared ) 登录类型、0：在授权过程中的登录，1：普通正常登录 默认为1（本参数也可以设置为回调方法）
         * @param {}
         *            _callback 回调方法
         */
        loginDialog: function (json, _isTipsErrorOrAfterLoginSuc) {
            var ut = this;
            if (ut.IS_SHOWN_LOGIN_DIALOG) {
                return;
            }
            ut.IS_SHOWN_LOGIN_DIALOG = true;
            var isTipsError = true;
            var afterLoginSuc = null;
            if (ut.isBoolean(_isTipsErrorOrAfterLoginSuc)) {
                isTipsError = _isTipsErrorOrAfterLoginSuc;
            }
            if (ut.isFun(_isTipsErrorOrAfterLoginSuc)) {
                afterLoginSuc = _isTipsErrorOrAfterLoginSuc;
            }
            var tempFnName = "afterLoginSuc_" + ut.getRandomNum();
            ut[tempFnName] = function (json) {
                if (ut.isJsonSuccess(json)) {
                    ut[tempFnName] = null;
                    delete ut[tempFnName];
                    if (json[ut.cons.jsonMsgProperty]) {
                        TIPS.suc(MSG.find(ut.cons.msgSuccessLogin, json[ut.cons.jsonMsgProperty]));
                    }
                    $("#" + ut.cons.dialog.iframeModal).modal("hide");
                    if (afterLoginSuc != null) {
                        afterLoginSuc(json);
                    }
                    ut.IS_SHOWN_LOGIN_DIALOG = false;
                }
            };
            ut.dialog.open("/", {
                isLoginPage: true,
                showHeader: false,
                closeable: false,
                afterShow: function () {
                    if (isTipsError) {
                        var err = ut.getJsonErrorMsg(json);
                        if (err != null) {
                            TIPS.err(err);
                        }
                    }
                },
                onload: function (iframeDom) {
                    var win = util.getFrameWindow(iframeDom);
                    var $$ = win.$;
                    $$("#login-container").addClass("pt0i").addClass("pb0i");
                    $$("body").css("margin-bottom", "0").css("overflow", "hidden");
                    $$("#header").remove();
                    $$("#footer").remove();
                    $$("#login-panel")
                        .append('<input id="successCallbackFn" value="function(json){util.getParentWindow().util.'
                        + tempFnName + '(json);}" type="hidden">');
                },
                onclose: function (iframeDom) {
                    ut.IS_SHOWN_LOGIN_DIALOG = false;
                }
            });
        },
        /**
         * 注册弹出框
         *
         * @param {}
         *            callback
         */
        registerDialog: function (callback) {

        },
        /**
         *
         * @param {}
         *            paramName 要添加的参数名
         * @param {}
         *            paramVal 要添加的参数值
         * @param {}
         *            _removeParamNames 要移除的参数名或参数名数组
         */
        buildParam: function (originalUrl, paramName, paramVal, _removeParamNames) {
            var originalUrlArray = originalUrl.split("?");
            var url = originalUrlArray[0];
            var queryString = "";
            if (originalUrlArray.length > 1) {
                queryString = originalUrlArray[1];
            }
            var removeParamNames = [];
            if (_removeParamNames != null) {
                if (this.isArray(_removeParamNames)) {
                    for (var i = 0; i < _removeParamNames.length; i++) {
                        removeParamNames.push(_removeParamNames[i] + "");
                    }
                } else {
                    removeParamNames.push(_removeParamNames + "");
                }
            }
            if (queryString == null || queryString === "" || queryString === "?") {
                if (paramVal != null && paramVal !== "") {
                    url += ("?" + paramName + "=" + encodeURI(paramVal));
                } else {
                    return originalUrl;
                }
            } else {
                var params = [];
                if (queryString.indexOf("?") == 0) {
                    queryString = queryString.substring(1);
                }
                var array1 = queryString.split("&");
                for (var i = 0; i < array1.length; i++) {
                    var tmp = array1[i];
                    var array2 = tmp.split("=");
                    if (!this.array.contains(removeParamNames, array2[0])) {
                        // 过滤参数
                        params.push({
                            n: array2[0],
                            v: array2[1]
                        });
                    }
                }
                var isFindParam = false;
                for (var i = 0; i < params.length; i++) {
                    var pm = params[i];
                    if (pm.n === paramName) {
                        isFindParam = true;
                        if (paramVal != null && paramVal !== "") {
                            pm.v = paramVal;
                        } else {
                            params[i] = null;
                        }
                    }
                }
                if (!isFindParam) {
                    params.push({
                        n: paramName,
                        v: paramVal
                    })
                }
                var search = "?";
                for (var i = 0; i < params.length; i++) {
                    var pm = params[i];
                    if (pm != null) {
                        if (search != "?"
                            && search.lastIndexOf("&") != (search.length - 1)) {
                            search += "&";
                        }
                        search += (pm.n + "=" + encodeURI(pm.v));
                    }
                }
                if (search == "?") {
                    search = "";
                }
                url += search;
            }
            return url;
        },
        querySearch: function (paramName, paramVal, _removeParamNames) {
            var url = util.actionUrl();
            var removeParamNames = ["pn"];
            if (_removeParamNames != null) {
                if (this.isArray(_removeParamNames)) {
                    for (var i = 0; i < _removeParamNames.length; i++) {
                        removeParamNames.push(_removeParamNames[i] + "");
                    }
                } else {
                    removeParamNames.push(_removeParamNames + "");
                }
            }
            var queryString = util.str.trim(location.search);
            if (queryString === "" || queryString === "?") {
                if (paramVal != null && paramVal !== "") {
                    url += ("?" + paramName + "=" + encodeURI(paramVal));
                } else {
                    location.reload();
                    return;
                }
            } else {
                var params = [];
                if (queryString.indexOf("?") == 0) {
                    queryString = queryString.substring(1);
                }
                var array1 = queryString.split("&");
                for (var i = 0; i < array1.length; i++) {
                    var tmp = array1[i];
                    var array2 = tmp.split("=");
                    if (!this.array.contains(removeParamNames, array2[0])) {
                        // 过滤参数
                        params.push({
                            n: array2[0],
                            v: array2[1]
                        });
                    }
                }
                var isFindParam = false;
                for (var i = 0; i < params.length; i++) {
                    var pm = params[i];
                    if (pm.n === paramName) {
                        isFindParam = true;
                        if (paramVal != null && paramVal !== "") {
                            pm.v = paramVal;
                        } else {
                            params[i] = null;
                        }
                    }
                }
                if (!isFindParam) {
                    params.push({
                        n: paramName,
                        v: paramVal
                    })
                }
                var search = "?";
                for (var i = 0; i < params.length; i++) {
                    var pm = params[i];
                    if (pm != null) {
                        if (search != "?"
                            && search.lastIndexOf("&") != (search.length - 1)) {
                            search += "&";
                        }
                        search += (pm.n + "=" + encodeURI(pm.v));
                    }
                }
                if (search == "?") {
                    search = "";
                }
                url += search;
            }
            location.href = url;
        }
    };
})(window["MSG"], pg, tips);

$(document).ready(function () {
    var util = window.util;
    util.init();
    util.dialog.init(util);
    util.combo.init(util);
    // util.pagination.init(util);
    // 初始化mask对象的相关操作
    util._mask.init(util);
    // 初始化tips对象的相关操作
    util.support.init(util);
    util.cookie.init(util);
});