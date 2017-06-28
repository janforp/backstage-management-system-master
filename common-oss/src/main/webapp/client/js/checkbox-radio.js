(function ($) {
    $(function () {
        // img_radio
        $(".icon_checkbox").on("click", function () {
            var $icon = $(this);
            var $thisCheckboxInput = null;
            var $img_checkbox_label = $icon.parent(".img_checkbox_label");
            if ($img_checkbox_label.length > 0) {
                var selected = $img_checkbox_label.hasClass("selected");
                $thisCheckboxInput = $img_checkbox_label.find('input.img_checkbox[type="checkbox"]');
                if ($thisCheckboxInput.length > 0 && $thisCheckboxInput.prop("disabled")) {
                    return;
                }
                if (selected) {
                    $img_checkbox_label.removeClass("selected");
                    $thisCheckboxInput.prop("checked", false).trigger("change");// 并触发change事件
                } else {
                    $img_checkbox_label.addClass("selected");
                    $thisCheckboxInput.prop("checked", true).trigger("change");// 并触发change事件
                }
            } else {
                if ($icon.hasClass("disabled")) {
                    return;
                }
                var selected = $icon.hasClass("selected");
                if (selected) {
                    $icon.removeClass("selected");
                } else {
                    $icon.addClass("selected");
                }
            }
        });
        $(".img_checkbox").on("click", function () {
            var $thisCheckboxInput = $(this);
            var $img_checkbox_label = $thisCheckboxInput.parent(".img_checkbox_label");
            var $icon = $img_checkbox_label.find(".icon_checkbox");
            if ($img_checkbox_label.length > 0) {
                var selected = $img_checkbox_label.hasClass("selected");
                if ($thisCheckboxInput.length > 0 && $thisCheckboxInput.prop("disabled")) {
                    return;
                }
                if (selected) {
                    $img_checkbox_label.removeClass("selected");
                    $thisCheckboxInput.prop("checked", false).trigger("change");// 并触发change事件
                } else {
                    $img_checkbox_label.addClass("selected");
                    $thisCheckboxInput.prop("checked", true).trigger("change");// 并触发change事件
                }
            } else {
                if ($icon.hasClass("disabled")) {
                    return;
                }
                var selected = $icon.hasClass("selected");
                if (selected) {
                    $icon.removeClass("selected");
                } else {
                    $icon.addClass("selected");
                }
            }
        });
        $(".icon_radio").on("click", function () {
            var currentIcon = this;
            var $currentIcon = $(currentIcon);
            var $img_radio_label = $currentIcon.parent(".img_radio_label");
            var $thisRadioInput = null;
            if ($img_radio_label.length > 0) {
                var selected = $img_radio_label.hasClass("selected");
                if (selected) {
                    // radio选中后，不支持取消
                    return;
                }
                $thisRadioInput = $img_radio_label.find('input.img_radio[type="radio"]');
                if ($thisRadioInput.length > 0 && $thisRadioInput.prop("disabled")) {
                    return;
                }
                if ($thisRadioInput.length > 0 && $thisRadioInput.attr("name") != null) {
                    var inputName = $thisRadioInput.attr("name");
                    var $parent = null;
                    var $form = $thisRadioInput.parents("form:eq(0)");
                    if ($form.length > 0) {
                        $parent = $form;
                    } else {
                        $parent = $("body");
                    }
                    var $allSameNameRadioInput = $parent.find('input.img_radio[type="radio"][name="' + inputName + '"]');
                    $allSameNameRadioInput.each(function () {
                        var indexThis = this;
                        if (indexThis !== currentIcon) {
                            // 把其他同名radio取消选中
                            var $indexThis = $(indexThis);
                            var $indexThis_img_radio_label = $indexThis.parent(".img_radio_label");
                            $indexThis_img_radio_label.removeClass("selected");
                            $indexThis_img_radio_label.find('input.img_radio[type="radio"]').prop("checked", false);
                        }
                    });
                }
                $img_radio_label.addClass("selected");
                $thisRadioInput.prop("checked", true).trigger("change");
            } else {
                if ($currentIcon.hasClass("disabled")) {
                    return;
                }
                var selected = $currentIcon.hasClass("selected");
                if (selected) {
                    // radio选中后，不支持取消
                    return;
                }
                $currentIcon.addClass("selected");
            }
        });
        $(".img_radio").on("click", function () {
            var $thisRadioInput = $(this);
            var $img_radio_label = $thisRadioInput.parent(".img_radio_label");
            var $currentIcon = $img_radio_label.find(".icon_radio");
            var currentIcon = $currentIcon[0];
            if ($img_radio_label.length > 0) {
                var selected = $img_radio_label.hasClass("selected");
                if (selected) {
                    // radio选中后，不支持取消
                    return;
                }
                $thisRadioInput = $img_radio_label.find('input.img_radio[type="radio"]');
                if ($thisRadioInput.length > 0 && $thisRadioInput.prop("disabled")) {
                    return;
                }
                if ($thisRadioInput.length > 0 && $thisRadioInput.attr("name") != null) {
                    var inputName = $thisRadioInput.attr("name");
                    var $parent = null;
                    var $form = $thisRadioInput.parents("form:eq(0)");
                    if ($form.length > 0) {
                        $parent = $form;
                    } else {
                        $parent = $("body");
                    }
                    var $allSameNameRadioInput = $parent.find('input.img_radio[type="radio"][name="' + inputName + '"]');
                    $allSameNameRadioInput.each(function () {
                        var indexThis = this;
                        if (indexThis !== currentIcon) {
                            // 把其他同名radio取消选中
                            var $indexThis = $(indexThis);
                            var $indexThis_img_radio_label = $indexThis.parent(".img_radio_label");
                            $indexThis_img_radio_label.removeClass("selected");
                            $indexThis_img_radio_label.find('input.img_radio[type="radio"]').prop("checked", false);
                        }
                    });
                }
                $img_radio_label.addClass("selected");
                $thisRadioInput.prop("checked", true).trigger("change");
            } else {
                if ($currentIcon.hasClass("disabled")) {
                    return;
                }
                var selected = $currentIcon.hasClass("selected");
                if (selected) {
                    // radio选中后，不支持取消
                    return;
                }
                $currentIcon.addClass("selected");
            }
        });
    });
})(jQuery);