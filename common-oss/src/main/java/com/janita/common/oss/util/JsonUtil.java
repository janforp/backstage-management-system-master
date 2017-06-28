package com.janita.common.oss.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.janita.common.oss.config.Config;
import com.janita.common.oss.constant.BaseConsts;
import com.janita.common.oss.exception.BusinessErrorMsgException;
import com.janita.common.oss.vo.JsonInfo;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.servlet.support.RequestContext;

import java.util.*;

/**
 * Created by wuqiang on 15-8-6.
 *
 * @author wuqiang
 */
public class JsonUtil {

    public static String toJSONString(Object obj) {
        JSON.DEFFAULT_DATE_FORMAT = BaseConsts.FMT_yyyy_MM_dd_HH_mm_ss;
        return JSON.toJSONString(obj, SerializerFeature.WriteDateUseDateFormat, SerializerFeature.DisableCircularReferenceDetect);
    }

    public static final String success_default = JsonUtil.buildSuccess();
    public static final String fail_default = JsonUtil.buildError();

    public static String buildSuccess() {
        return toJSONString(JsonInfo.buildSuccess(null));
    }

    public static String buildSuccess(String msg) {
        return toJSONString(JsonInfo.buildSuccess(msg));
    }

    public static String buildData(Object data) {
        return toJSONString(JsonInfo.buildSuccess(null, data));
    }

    public static String buildSuccess(String msg, Object data) {
        return toJSONString(JsonInfo.buildSuccess(msg, data));
    }


    public static String buildError() {
        return toJSONString(JsonInfo.buildError(null));
    }

    public static String buildError(String msg) {
        return toJSONString(JsonInfo.buildError(msg));
    }

    public static String buildError(String msg, String field) {
        return toJSONString(JsonInfo.buildError(msg, field));
    }

    public static String buildError(String msg, String errorCode, String field) {
        return toJSONString(JsonInfo.buildError(msg, errorCode, field));
    }

    public static String buildError(List<ObjectError> errors) {
        if (errors != null && errors.size() > 0) {
            ObjectError error = errors.get(0);
            if (error == null) {
                return buildError();
            }
            if (error instanceof FieldError) {
                FieldError fieldError = (FieldError) error;
                return buildError(fieldError.getDefaultMessage(), fieldError.getField());
            } else {
                return buildError(error.getDefaultMessage());
            }
        } else {
            return buildError();
        }
    }

    /**
     * 构建错误消息JSON对象（发生异常专用），JsonInfo并序列化<p/>
     * 并设置JsonInfo.data=null<p/>
     * 并设置JsonInfo.code=500<p/>
     * 并设置JsonInfo.msg="Service Busy."<p/>
     */
    public static String buildException(Throwable throwable) {
        if (throwable == null) {
            throwable = new RuntimeException("Error Unkown");
        }
        String msg;
        if (Config.isDebug()) {
            msg = "System Error: " + throwable.toString();
        } else {
            msg = "Service Busy.";
        }
        return buildException(msg, (throwable instanceof BusinessErrorMsgException));
    }

    /**
     * 构建错误消息JSON对象（发生异常专用），JsonInfo并序列化<p/>
     * 并设置JsonInfo.data=null<p/>
     * 并设置JsonInfo.code=500<p/>
     * 并设置JsonInfo.msg="Service Busy."<p/>
     */
    public static String buildException(Throwable throwable, RequestContext requestContext, Locale locale) {
        if (throwable == null) {
            throwable = new RuntimeException("Error Unkown");
        }
        String msg;
        if (Config.isDebug()) {
            msg = "System Error: " + throwable.toString();
        } else {
            msg = requestContext.getMessage("common.error.exception");
        }
        return buildException(msg, (throwable instanceof BusinessErrorMsgException));
    }

    /**
     * 构建错误消息JSON对象，JsonInfo并序列化<p/>
     * 并设置JsonInfo.code=500<p/>
     * 并设置JsonInfo.data=null<p/>
     * 并设置JsonInfo.msg=msg<p/>
     */
    public static String buildException(String msg, boolean isBusinessErrorMsgException) {
        String errorCode = null;
        if (!isBusinessErrorMsgException) {
            // 不是业务异常，则返回code=500
            errorCode = BaseConsts.json_info_error_code_when_exception;
        }
        return toJSONString(JsonInfo.buildError(msg, errorCode, null));
    }

    /**
     * json字符串转map
     */
    public static HashMap<String, String> toHashMap(Object object) {

        HashMap<String, String> data = new HashMap<String, String>();

        // 将json字符串转换成jsonObject
        JSONObject jsonObject = JSONObject.parseObject(object.toString());
        Set<String> set = jsonObject.keySet();
        Iterator it = set.iterator();

        // 遍历jsonObject数据，添加到Map对象
        while (it.hasNext()) {
            String key = String.valueOf(it.next());
            String value = (String) jsonObject.get(key);
            data.put(key, value);
        }

        return data;

    }

}
