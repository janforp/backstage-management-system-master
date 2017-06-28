
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


/// init iframe upload
function ups (uploads, modeType) {
    uploads.each(function (i, n) {

        var _input = $(n).attr("isload", true);
        var _panal = _input.parent();
        var _action = _input.attr("action");
        if (_action.length == 0) {
            alert("缺少action属性!!!");
            return;
        }

        var initWidth=100;
        if(_input.attr("initwidth"))
            initWidth=parseInt( _input.attr("initwidth"));

        var initHeight=100;
        if(_input.attr("initheight"))
            initHeight=parseInt( _input.attr("initheight"));

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

        //上传文件数量
        var fileNums="s";
        if(_input.attr("filenums"))
            fileNums=_input.attr("filenums");

        //iframe框架
        var _iframe = $("<iframe>").addClass("postfile").css("display", "none").attr({ "frameborder": "0", "src": '/plugins/upload/image-upload/file.htm?' + new Date().getTime() }).load(function () {
            var _this = $(this.contentDocument || this.contentWindow.document);

            var _obj = $(this).parent().find("input[type=hidden]").attr("obj");//get outside iframe value
            var _uploadInput = _this.find("input[type=file]");
            //设置上传类型
            _this.find("input[name=file_type]").val(uploadType);
            //设置上传文件大小
            _this.find("input[name=file_size]").val(fileSizeLimit);
                var _first = _this.find("form:first"); //form
            //button　点击调用file点击
            var _button = $(this).parent().find(modeType).click(function () {
                _uploadInput.click();
            });
            if(uploadType=="image"){
                //重置按钮
                var _cancelButton=$(this).parent().find(".btn-cancel").click(function(){
                    var showImg=$("input[obj=" + _obj + "]").attr("showimg");
                    var defaultImage=$("input[obj=" + _obj + "]").attr("defaultimg");
                    if(showImg){
                        var arrShow=showImg.split(",");
                        for(var i=0; i<arrShow.length; i++){
                            if ($(this).attr("w"))
                                $("#" + arrShow[i]).attr("src", defaultImage).show().width($(this).attr("w")).height($(this).attr("h"));
                            else
                                $("#" + arrShow[i]).attr("src", defaultImage).show().width(150).height(100);
                        }
                    }
                    $("input[obj=" + _obj + "]").val("");
                });
            }
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
                    alert(fileName + "请上传" + fileTypeLimit + "格式");
                    return false;
                }
                _first.submit();
            });

            //初始化iframepostform
            _first.attr("action", _action).iframePostForm({
                iframeID: 'iframe-post-form-' + new Date().getTime(),
                post: function () {
                    _input.attr("state", "uploading");

                    if(_input.attr("uploadtype") != "image"){
                        var uploadBox2 = $("input[obj=" + _obj + "]").attr("showobj");
                        $("#" + uploadBox2).show();
                        $("#" + uploadBox2).find(".load_img").show();
                        //_uploadPath.val("文件上传中...");
                    }else{
                        $(".loadingMask[obj='" + _obj + "']").show();
                        $(".loadingPic[obj='" + _obj + "']").show();
                    }
                },
                complete: function (strCallback) {

                    strCallback = strCallback.replace(/<[^>]+>/g,"");
                    strCallback = convert.stringToJson(strCallback);

                    if (strCallback.success == true) {
                        if (uploadType == "image") {
                            var xImage = new Image();
                            xImage.src = strCallback.bean;
                            setTimeout(function () {
                                //var iOldScale = parseFloat(xImage.height / xImage.width);
                                var newWidth = initWidth;
                                var newHeight = initHeight;
                                //var iNewScale = parseFloat(newHeight) / parseFloat(newWidth);

                                //if (iOldScale > iNewScale && xImage.height > newHeight) {
                                //    newWidth = xImage.width * newHeight / xImage.height;
                                //} else if (iOldScale < iNewScale && xImage.width > newWidth) {
                                //    newHeight = xImage.height * newWidth / xImage.width;
                                //} else if (xImage.width < newWidth && xImage.height < newHeight) {
                                //    newWidth = xImage.width;
                                //    newHeight = xImage.height;
                                //}

                                $(".loadingPic[obj='" + _obj + "']").hide();
                                $(".loadingMask[obj='" + _obj + "']").hide();

                                if (fileNums == "photo") { // 上传头像

                                    $(".user_photo").attr("src", strCallback.bean);
                                    $("input[obj='" + _obj + "']").val(strCallback.bean);

                                }else if(fileNums == "banner"){

                                    $(".banner_photo").attr("src", strCallback.bean);
                                    $("input[obj='" + _obj + "']").val(strCallback.bean);

                                }else if(fileNums == 'img1'){

                                    $(".img1").attr("src", strCallback.bean);
                                    $("input[obj='" + _obj + "']").val(strCallback.bean);

                                } else if(fileNums == 'img2'){

                                    $(".img2").attr("src", strCallback.bean);
                                    $("input[obj='" + _obj + "']").val(strCallback.bean);

                                }else if(fileNums == 'img3'){

                                    $(".img3").attr("src", strCallback.bean);
                                    $("input[obj='" + _obj + "']").val(strCallback.bean);

                                }else if(fileNums == 'img4'){

                                    $(".img4").attr("src", strCallback.bean);
                                    $("input[obj='" + _obj + "']").val(strCallback.bean);

                                }else if(fileNums == 'img5'){

                                    $(".img5").attr("src", strCallback.bean);
                                    $("input[obj='" + _obj + "']").val(strCallback.bean);

                                } else if(fileNums == 'img6'){

                                    $(".img6").attr("src", strCallback.bean);
                                    $("input[obj='" + _obj + "']").val(strCallback.bean);

                                }else if(fileNums == 'img7'){

                                    $(".img7").attr("src", strCallback.bean);
                                    $("input[obj='" + _obj + "']").val(strCallback.bean);

                                }else if(fileNums == 'img8'){

                                    $(".img8").attr("src", strCallback.bean);
                                    $("input[obj='" + _obj + "']").val(strCallback.bean);

                                }else if (fileNums == "m") { // 不覆盖已上传

                                    $("ul[obj='" + _obj + "']").append("<li><span class='delete_pic' obj=" + _obj + ">╳</span><img class = 'active_img' src='" + strCallback.bean + "' style='width:" + newWidth + "px; height:" + newHeight + "px;' /></li>");

                                    if( $("input[obj='"+_obj+"']").val() )
                                        $("input[obj='" + _obj + "']").val($("input[obj='" + _obj + "']").val() + ";" + strCallback.bean);
                                    else
                                        $("input[obj='" + _obj + "']").val(strCallback.bean);

                                } else {

                                    $("ul[obj='" + _obj + "']").empty();
                                    $("ul[obj='" + _obj + "']").append("<li><span class='delete_pic' obj=" + _obj + ">╳</span><img class = 'active_img' src='" + strCallback.bean + "' style='width:" + newWidth + "px; height:" + newHeight + "px;' /></li>");
                                    $("input[obj='" + _obj + "']").val(strCallback.bean);

                                }

                            }, 1500)

                        }else if (uploadType == "voice" || uploadType == "background-music") {
                            var rootPath = $("input[obj=" + _obj + "]").attr("rootpath");
                            var voicePath = rootPath + strCallback.data.path;
                            $("input[obj=" + _obj + "]").val(strCallback.data.path);
                            $("input[obj=" + _obj + "]").attr("obj-id", strCallback.data.id);
                            $("input[obj=" + _obj + "]").attr("obj-size", Math.round(strCallback.data.size/1024)+"KB");
                            $("input[obj=" + _obj + "]").attr("obj-name", strCallback.data.name+"."+strCallback.data.ext);
                            var uploadBox = $("input[obj=" + _obj + "]").attr("showobj");

                            setTimeout(function () {
                                $("#" + uploadBox).find(".load_img").hide();
                                $("#" + uploadBox).find(".obj_name").html(strCallback.data.name + "." + strCallback.data.ext).show();
                                $("#" + uploadBox).find(".obj_size").html(Math.round(strCallback.data.size/1024)+" KB").show();

                                $(modeType).find("i").html("重新选择 ...");
                            }, 1500)
                        }
                        _input.removeAttr("state");
                    }else if(strCallback.status == 'error'){
                        alert("上传失败！" + strCallback.msg);
                        return false;
                    }
                }
            });
        });
        _panal.append(_iframe);
    });
}



