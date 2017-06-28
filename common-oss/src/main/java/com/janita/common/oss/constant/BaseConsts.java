package com.janita.common.oss.constant;

/**
 * Created by wuqiang on 15-8-6.
 *
 * @author wuqiang
 */
public class BaseConsts {
    // 最大的超级管理员的ID
    public static final Integer super_administrator_role_id = 1000;
    public static final Integer super_administrator_id = 10000;
    public static final String FMT_yyyy_MM_dd = "yyyy-MM-dd";
    public static final String FMT_yyyy_MM_dd_HH_mm = "yyyy-MM-dd HH:mm";
    public static final String FMT_yyyy_MM_dd_HH_mm_ss = "yyyy-MM-dd HH:mm:ss";
    public static final String FMT_MM_dd_HH_mm = "MM-dd HH:mm";
    public static final String FMT_yyyy_MM = "yyyy-MM";
    public static final String FMT_MM_dd = "MM-dd";
    /**
     * 发生异常时，返回的code
     */
    public static final String json_info_error_code_when_exception = "500";
    /**
     * 发生拦截到要求登录，但没有登录的请求时，返回点额code
     */
    public static final String json_info_error_code_admin_login_required = "admin_login_required";

    /**
     * 暂时放在这里
     */
    public static final String CANCEL_ORDER = "订单已作废";

    public static final String ALREADY_SEND = "此订单已发货";
}
