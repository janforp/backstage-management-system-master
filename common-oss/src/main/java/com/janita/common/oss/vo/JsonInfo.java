package com.janita.common.oss.vo;

import java.io.Serializable;
import java.util.Collection;

/**
 * Created by wuqiang on 15-8-6.
 * <p/>
 * JSON响应对象，均由此类封装
 *
 * @author wuqiang
 */
public class JsonInfo implements Serializable {

    // true：表示请求成功；false:为失败
    private boolean success;
    // 失败或成功消息
    private String msg;
    // 特别的错误代码（如要求登录，code=admin_login_required）
    private String code;
    // 如果是FieldError，则此项会有值
    private String field;
    // 返回的数据(返回非Collection的对象时，采用此项;map也采用此项)
    private Object bean;
    // 返回的数据
    private Object array;

    private JsonInfo() {
    }

    public static JsonInfo buildSuccess(String msg) {
        return buildSuccess(msg, null);
    }

    public static JsonInfo buildSuccess(String msg, Object data) {
        return build(true, msg, null, null, data);
    }

    public static JsonInfo buildError(String msg) {
        return buildError(msg, null);
    }

    public static JsonInfo buildError(String msg, String field) {
        return buildError(msg, null, field);
    }

    public static JsonInfo buildError(String msg, String errorCode, String field) {
        return build(false, msg, errorCode, field, null);
    }


    public static JsonInfo build(boolean success, String msg, String errorCode, String field, Object data) {
        JsonInfo json = new JsonInfo();
        json.success = success;
        json.msg = msg;
        json.code = errorCode;
        json.field = field;
        if (data != null) {
            if (data instanceof Collection || data.getClass().isArray()) {
                json.array = data;
            } else {
                json.bean = data;
            }
        }
        return json;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMsg() {
        return msg;
    }

    public String getCode() {
        return code;
    }

    public String getField() {
        return field;
    }

    public Object getBean() {
        return bean;
    }

    public Object getArray() {
        return array;
    }
}
