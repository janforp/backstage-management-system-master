package com.janita.common.oss.constant;

/**
 * Created by wuqiang on 15-8-6.
 *
 * @author wuqiang
 */
public class RequestConsts {
    /**
     * 请求相关的编码方式
     */
    public static final String CHARSET = "UTF-8";
    /**
     * 如果采用iframe异步提交时，需要自动带入此参数用于标记此请求也是ajax请求
     */
    public static final String IFRAME_AJAX_MARK_PARAM_NAME = "_AJAX";
    /**
     * Controller方法的@RequestMapping{produces = RequestConsts.CONTENT_TYPE_JSON}
     */
    public static final String CONTENT_TYPE_JSON = "application/json;charset=" + CHARSET;
    public static final String CONTENT_TYPE_TEXT = "text/plain;charset=" + CHARSET;
    public static final String CONTENT_TYPE_HTML = "text/html;charset=" + CHARSET;
    public static final String CONTENT_TYPE_JAVASCRIPT = "application/x-javascript;charset=" + CHARSET;

    public static final String CONSOLE_PATH_PREFIX = "/c/page/console/";
    public static final String CONSOLE_PROJECT_PATH_PREFIX = CONSOLE_PATH_PREFIX + "auth/";
    /**
     * 404错误页的路径（是Controller中返回的路径，而不是url）
     */
    public static final String ERROR_404_PAGE_RESULT = "pub/error/404";
    /**
     * 404错误页的URL路径
     */
    public static final String ERROR_404_PAGE_URL_PATH = "redirect:/c/page/pub/error/404";
    /**
     * 500错误页的路径（是Controller中返回的路径，而不是url）
     */
    public static final String ERROR_500_PAGE_RESULT = "pub/error/500";
    /**
     * 500错误页的URL路径
     */
    public static final String ERROR_500_PAGE_URL_PATH = "redirect:/c/page/pub/error/500";
    /**
     * 403 Forbidden错误页的路径（是Controller中返回的路径，而不是url）
     */
    public static final String ERROR_403_PAGE_RESULT = "pub/error/403";
    /**
     * 403 Forbidden错误页的URL路径
     */
    public static final String ERROR_403_PAGE_URL_PATH = "redirect:/c/page/pub/error/403";
    /**
     * 登录页的路径（是Controller中返回的路径，而不是url）
     */
    public static final String LOGIN_PAGE_RESULT = "pub/login";
    /**
     * 登录页的URL路径
     */
    public static final String LOGIN_PAGE_URL_PATH = "redirect:/c/page/pub/login";
}
