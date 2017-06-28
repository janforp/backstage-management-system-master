package com.janita.common.oss.exception;

/**
 * Created by wuqiang on 15-8-7.
 * <p/>
 * 业务错误消息异常，当抛出此异常时，会把此异常的message返回给客户端
 *
 * @author wuqiang
 */
public class BusinessErrorMsgException extends RuntimeException {
    // message属性文件中的错误代码
    private String code;
    private Object[] args;
    private String message;

    /**
     * 直接提供错误代码，Interceptor会自动处理
     *
     * @param code
     */
    public BusinessErrorMsgException(String code) {
        this(code, null);
    }

    /**
     * 直接提供错误代码，Interceptor会自动处理
     *
     * @param code
     * @param args 错误代码对应的消息有参数
     */
    public BusinessErrorMsgException(String code, Object[] args) {
        this(code, args, null);
    }

    public BusinessErrorMsgException(String code, Object[] args, String message) {
        super(message != null ? message : (code != null ? code : ""));
        this.code = code;
        this.args = args;
        this.message = message;
    }

    @Override
    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return this.getMessage();
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Object[] getArgs() {
        return args;
    }

    public void setArgs(Object[] args) {
        this.args = args;
    }
}
