package com.janita.common.oss.constant;

/**
 * Created by wuqiang on 15-8-6.
 *
 * @author wuqiang
 */
public class AttributeConsts {
    // 在静态资源文件后面添加的版本
    public static final String RESOURCE_VERSION = "RESOURCE_VERSION";
    // 在静态资源文件是否是用“.min”文件
    public static final String RESOURCE_MIN = "RESOURCE_MIN";

    public static final String BASE_PATH = "BASE_PATH";
    public static final String DEBUG = "DEBUG";
    public static final String ERROR_MSG = "ERROR_MSG";
    public static final String RESOURCE_MESSAGE_VERSION = "RESOURCE_MESSAGE_VERSION";
    public static final String RESOURCE_RULE_VERSION = "RESOURCE_RULE_VERSION";
    public static final String RESOURCE_FORM_RULE_VERSION = "RESOURCE_FORM_RULE_VERSION";

    public static final String REQUEST_URI = "REQUEST_URI";

    // 菜单
    public static final String MENU = "MENU";
    public static final String CURRENT_FUNCTION = "CURRENT_FUNCTION";
    public static final String FOCUS_MODULE_ID = "FOCUS_MODULE_ID";
    public static final String FOCUS_FUNCTION_ID = "FOCUS_FUNCTION_ID";

    /**
     * 管理员登录后的会话对象
     */
    public static final String SESSION_ADMIN = "ADMIN";
    public static final String SESSION_ADMIN_ID = "ADMIN_ID";
    /**
     * 系统全局缓存中，保存全部需要授权访问的requestUri的Set对象的key
     */
    public static final String ServletContext_AllRequireAuthorizationRequestUri = "ServletContext_AllRequireAuthorizationRequestUri";

}
