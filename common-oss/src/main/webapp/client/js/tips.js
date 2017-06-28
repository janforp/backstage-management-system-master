/**
 * 顶部提示对象
 *
 * @type
 */
(function (owner) {
    var tips = {
        defaultNotifyBoxWidth: 350,
        defaultMsgInnerWidth: 318,
        loadingMsgInner: '<div class="u-mask-msg-inner"><div class="u-mask-msg-text" style="padding-top: 16px;"></div></div>',
        show: function (msg, option) {
            if (msg == null) {
                return;
            }
            $.notify(msg, option);
            var $ukNotify = $(".uk-notify:eq(0)");
            var $msgInnerHidden = $ukNotify.find(".uk-msg-inner-hidden:eq(0)");
            var msgInnerHiddenWidth = $msgInnerHidden.width();
            var cha = 0;
            if ((msgInnerHiddenWidth + 80) < this.defaultMsgInnerWidth) {
                cha = this.defaultMsgInnerWidth - 80 - msgInnerHiddenWidth;
            }
            if (cha != 0) {
                // 有差值，要修改宽度
                var boxWidth = this.defaultNotifyBoxWidth - cha;
                $ukNotify.css("width", (boxWidth) + "px").css("margin-left",
                    (-1 * boxWidth / 2) + "px");
            } else {
                $ukNotify.css("width", (this.defaultNotifyBoxWidth) + "px")
                    .css("margin-left",
                    (-1 * this.defaultNotifyBoxWidth / 2) + "px");
            }
        },
        hideOthers: function () {
            var $notifyMessage = $(".uk-notify-message");
            $notifyMessage.fadeOut("normal", function () {
                $(this).remove();
            });
        },
        /**
         * @param {}
         *            msg 弹出的消息
         * @param {}
         *            timeout 显示多少时间（毫秒）后消失，如果为0，则不自动消失
         */
        suc: function (msg, timeout) {
            var option = {
                pos: "top-center",
                status: "success"
            };
            if (timeout != null && (timeout * 1) >= 0) {
                option.timeout = timeout;
            }
            this.hideOthers();
            this.show(msg, option);
        },
        /**
         * @param {}
         *            msg 弹出的消息
         * @param {}
         *            timeout 显示多少时间（毫秒）后消失，如果为0，则不自动消失
         */
        err: function (msg, timeout) {
            var option = {
                pos: "top-center",
                status: "danger"
            };
            var _timeout = timeout;
            if (timeout == null) {
                _timeout = 5000;
            }
            if (_timeout != null && (_timeout * 1) >= 0) {
                option.timeout = _timeout;
            }
            this.hideOthers();
            this.show(msg, option);
        },
        /**
         * @param {}
         *            msg 弹出的消息
         * @param {}
         *            timeout 显示多少时间（毫秒）后消失，如果为0，则不自动消失
         */
        info: function (msg, timeout) {
            var option = {
                pos: "top-center",
                status: "info"
            };
            if (timeout != null && (timeout * 1) >= 0) {
                option.timeout = timeout;
            }
            this.hideOthers();
            this.show(msg, option);
        },
        /**
         * @param {}
         *            msg 弹出的消息
         * @param {}
         *            timeout 显示多少时间（毫秒）后消失，如果为0，则不自动消失
         */
        warn: function (msg, timeout) {
            var option = {
                pos: "top-center",
                status: "warning"
            };
            if (timeout != null && (timeout * 1) >= 0) {
                option.timeout = timeout;
            }
            this.hideOthers();
            this.show(msg, option);
        },
        hideLoading: function () {
            var $notifyMessage = $(".uk-notify-message-loading");
            $notifyMessage.fadeOut("normal", function () {
                $(this).remove();
            });
        },
        loading: function (timeout) {
            var option = {
                pos: "top-center",
                status: "loading"
            };
            if (timeout != null && (timeout * 1) >= 0) {
                option.timeout = timeout;
            }
            this.hideOthers();
            this.show(this.loadingMsgInner, option);
            var $ukNotify = $(".uk-notify:eq(0)");
            $ukNotify.find(".uk-close:eq(0)").hide();
            var $notifyMessage = $ukNotify.find(".uk-notify-message:eq(0)");
            $notifyMessage.css("padding-top", "5px").css("padding-bottom", "5px");
        }
    };
    owner.tips = tips;
})(window);
