var control = {
    getString: function (o, isParseErr) {
        var strValue = "";
        if ($(o).is('input'))
            strValue = $.trim($(o).val());
        else if ($(o).is('label'))
            strValue = $.trim($(o).text());
        else if ($(o).is('textarea'))
            strValue = $.trim($(o).val());
        else if ($(o).is('select'))
            strValue = $.trim($(o).val());

        isParseErr = isParseErr == undefined ? false : isParseErr;
        //为空
        if (isParseErr && !strValue)
            ParseError(o);
        else
            strValue = convert.quanjiaoToBanjiao(strValue);

        return strValue;
    },
    getInt: function (o, isParseErr, d) {
        isParseErr = isParseErr == undefined ? true : isParseErr;
        var _num = this.getString(o, isParseErr);
        if (!!_num) {
            try {
                return parseInt(_num);
            } catch (e) {
            }
        }
        return d == undefined ? 0 : d;
    },
    getDate: function (o, d) {
        var _date = this.getString(o, false);
        if (!_date)
            return "2000-01-01";
        else
            return _date;
    },
    reloadImg:function(imgUrl, initWidth, initHeight, _obj){
        var xImage = new Image();
        xImage.src = imgUrl;
        var iOldScale = parseFloat(xImage.height / xImage.width);
        var newWidth=initWidth;
        var newHeight=initHeight;
        var iNewScale = parseFloat(newHeight) / parseFloat(newWidth);

        if (iOldScale > iNewScale && xImage.height > newHeight) {
            newWidth = xImage.width * newHeight / xImage.height;
        } else if (iOldScale < iNewScale && xImage.width > newWidth) {
            newHeight = xImage.height * newWidth / xImage.width;
        } else if (xImage.width < newWidth && xImage.height < newHeight) {
            newWidth = xImage.width;
            newHeight = xImage.height;
        }

        var marginTop=(initHeight-newHeight)/2+"px";
        $("img[obj='"+_obj+"']").height(newHeight).width(newWidth).css("margin-top",marginTop);
    },
    setSubmitClick:function(obj){
        $(document).keydown(function (e) {
            if (e.keyCode == 13) {
                $(obj).click();
            }
        });
    }
}


var convert = {
    stringToJson: function (str) {
        return eval('(' + str + ')');
    },
    numberToMoney: function (strNum) {
        if (strNum.length <= 3) {
            return strNum;
        }
        if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
            return strNum;
        }
        var a = RegExp.$1, b = RegExp.$2, c = RegExp.$3;
        var re = new RegExp();
        re.compile("(\\d)(\\d{3})(,|$)");
        while (re.test(b)) {
            b = b.replace(re, "$1,$2$3");
        }
        return a + "" + b + "" + c;
    },
    quanjiaoToBanjiao: function (str) {
        var i;
        var result = '';
        for (i = 0; i < str.length; i++) {
            code = str.charCodeAt(i);
            if (code >= 65281 && code < 65373) {
                result += String.fromCharCode(str.charCodeAt(i) - 65248);
            }
            else {
                result += str.charAt(i);
            }
        }
        return result;
    },
    toDecimal: function (src, pos) {
        return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
    },
    padLeft: function (str) {
        str = parseInt(str);
        str = str < 10 ? "0" + str : str;
        return str;
    }
}