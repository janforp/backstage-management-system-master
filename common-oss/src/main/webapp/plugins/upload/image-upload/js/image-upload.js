//*****************************************************初始化Begin*****************************************************
$(function () {
    initupload($(document));
});

function setUpload(d, uploadMode){
    var uploadObj= d.find(uploadMode);
    if (uploadObj.length > 0) {
        if ($.fn.iframePostForm) {
            ups(uploadObj, uploadMode);
        } else {
            $.getScript('/plugins/upload/image-upload/js/jquery.iframe-post-form.min.js', function () {
                ups(uploadObj, uploadMode)
            });
        }
    }
}

function initupload(d) {
    d = $(d || document.body);
    //初始化upload上传组件
    setUpload(d, "[mode=button-upload-pic]");
}


// init iframe upload
function ups (uploads, modeType) {

    uploads.each(function (i, n) {

        var _input = $(n).attr("isload", true);
        var _panal = _input.parent();
        var _action = _input.attr("action");
        if (_action.length == 0) {
            alert("缺少action属性!!!");
            return;
        }

        //上传文件类型
        var uploadType= "image";
        if(_input.attr("uploadtype") && _input.attr("uploadtype")!="image")
            uploadType=_input.attr("uploadtype");

        //上传文件类型
        var fileTypeLimit="png,jpeg,jpg,gif";
        if(_input.attr("filetypelimit"))
            fileTypeLimit=_input.attr("filetypelimit");

        //上传文件大小
        var fileSizeLimit="0";
        if(_input.attr("filesizelimit"))
            fileSizeLimit=_input.attr("filesizelimit");

        //上传文件名称【对象】
        var fileName="图片";
        if(_input.attr("filename"))
            fileName=_input.attr("filename");


        //iframe框架
        var _iframe = $("<iframe>").addClass("postfile").css("display", "none").attr({"frameborder": "0", "src": '/plugins/upload/image-upload/file.htm?'+new Date().getTime()}).load(function (){

            var _this = $(this.contentDocument || this.contentWindow.document);
            var _obj = $(this).parent().find(".img-upload").attr("obj");//get outside iframe value
            var _uploadInput = _this.find("input[type=file]");
            // 设置上传类型
            _this.find("input[name=file_type]").val(uploadType);
            // 设置上传文件大小
            _this.find("input[name=file_size]").val(fileSizeLimit);
            var _first = _this.find("form:first"); //form
            //button　点击调用file点击
            var _button = $(this).parent().find(modeType).click(function () {
                _uploadInput.click();
            });

            //file控件
            var _file = _uploadInput.change(function () {
                var filePath = _uploadInput.val();
                var arrExtension = filePath.split(".");
                var extension = arrExtension[arrExtension.length - 1].toLowerCase();
                var arrayLimitType = fileTypeLimit.split(",");
                var exist = false;
                for (var i = 0; i < arrayLimitType.length; i++) {
                    if (extension == arrayLimitType[i]) {
                        exist = true;
                        break;
                    }
                }
                if (!exist) {
                    //alert(fileName + "请上传" + fileTypeLimit + "格式");
                    return false;
                }
                _first.submit();
            });

            //初始化iframepostform
            _first.attr("action", _action).iframePostForm({
                iframeID: 'iframe-post-form-' + new Date().getTime(),
                post: function () {
                    $(".img-upload[obj='" + _obj + "']").attr("src", "/client/img/upload_loading.gif");
                },
                complete: function (strCallback) {
                    strCallback = strCallback.replace(/<[^>]+>/g,"");
                    strCallback = convert.stringToJson(strCallback);
                    $(".img-upload[obj='" + _obj + "']").attr("src", strCallback.bean);
                    $(".img-upload[obj='" + _obj + "']").attr("value", strCallback.bean);
                }
            });
        });
        _panal.append(_iframe);
    });
}



