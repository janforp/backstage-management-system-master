package com.janita.common.oss.interceptor;

import com.janita.common.oss.config.Config;
import com.janita.common.oss.constant.AttributeConsts;
import com.janita.common.oss.constant.BaseConsts;
import com.janita.common.oss.constant.ParamConsts;
import com.janita.common.oss.constant.RequestConsts;
import com.janita.common.oss.controller.page.console.ConsoleController;
import com.janita.common.oss.controller.page.console.auth.OssAccountController;
import com.janita.common.oss.dto.MenuModuleDto;
import com.janita.common.oss.enums.IntBool;
import com.janita.common.oss.exception.BusinessErrorMsgException;
import com.janita.common.oss.logger.ControllerLogger;
import com.janita.common.oss.model.OssMenuFunction;
import com.janita.common.oss.service.OssCacheService;
import com.janita.common.oss.util.CommonMethod;
import com.janita.common.oss.util.JsonUtil;
import com.janita.common.oss.util.RequestUtil;
import com.janita.common.oss.vo.LoginAdminInfo;
import com.wujie.common.validation.ValidationUtil;
import com.wujie.common.validation.support.ResourceBundleJavascriptSource;
import com.wujie.common.validation.support.spring.GlobalFormValidator;
import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.apache.commons.lang.StringUtils;
import org.craigq.common.logger.ILoggerFactory;
import org.craigq.common.logger.LogMgr;
import org.craigq.common.logger._LogMgrPackageAccesser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.support.RequestContext;
import org.springframework.web.servlet.support.RequestContextUtils;
import org.springframework.web.util.HtmlUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.net.URLEncoder;
import java.util.*;

/**
 * Created by wuqiang on 15-8-3.
 *
 * @author wuqiang
 */
@Component
public class PageControllerInterceptor implements MethodInterceptor {

    private static Logger selfLogger = LoggerFactory.getLogger(PageControllerInterceptor.class);

    private static Logger httpHeaderLogger = LoggerFactory.getLogger("httpHeaderLogger");

    // 需要登录才能访问的Controller的包路径
    private static final String consolePackage = ConsoleController.class.getPackage().getName();

    // 需要登录且需要进行权限过滤才能访问的Controller的包路径
    private static final String consoleAuthPackage = OssAccountController.class.getPackage().getName();

    @Autowired
    private ILoggerFactory<HttpServletRequest, ControllerLogger> loggerFactory;

    @Autowired
    private OssCacheService ossCacheService;

    @Autowired
    private ResourceBundleJavascriptSource messageJavascriptSource;

    @Autowired
    private ResourceBundleJavascriptSource ruleJavascriptSource;

    @Autowired
    private ResourceBundleJavascriptSource formRuleJavascriptSource;

    @Override
    public Object invoke(MethodInvocation methodInvocation) throws Throwable {

        Object result = null;
        ServletRequestAttributes requestAttributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = requestAttributes.getRequest();
        HttpSession session = request.getSession();
        RequestContext requestContext = new RequestContext(request);
        Locale locale = RequestContextUtils.getLocaleResolver(request).resolveLocale(request);
        ControllerLogger logger = loggerFactory.getLogger(request);
        boolean isDebug = Config.isDebug();
        String requestUri = this.getFixedRequestUri(request);
        boolean hasPermission = true;
        boolean hasError = false;

        // 如果登录了，则这个是当前用户的菜单对象（且有权限操作）
        List<MenuModuleDto> menuModuleDtoList = null;
        // 如果登录了，则这个是当前用户
        LoginAdminInfo loginAdminInfo = null;
        boolean isInConsoleAuthPackage = false;
        boolean isAjax = CommonMethod.isAjaxRequest(request) || methodInvocation.getMethod().isAnnotationPresent(ResponseBody.class);
        try {
            String clientIp = RequestUtil.getClientIp(request);
            // 把Logger对象设置到ThreadLocal
            _LogMgrPackageAccesser.setThreadLogger(logger);
            logger.setRequestUri(requestUri);
            if (isDebug || httpHeaderLogger.isInfoEnabled()) {
                Enumeration<String> headers = request.getHeaderNames();
                Map<String, String> requestHeader = new HashMap<String, String>();
                if (headers != null) {
                    while (headers.hasMoreElements()) {
                        String name = headers.nextElement();
                        List<String> headerValueList = new ArrayList<>(3);
                        Enumeration<String> headerValues = request.getHeaders(name);
                        if (headerValues != null) {
                            while (headerValues.hasMoreElements()) {
                                headerValueList.add(headerValues.nextElement());
                            }
                        }
                        requestHeader.put(name, headerValuesToString(headerValueList));
                    }
                }
                logger.setRequestHeader(requestHeader);
                if (httpHeaderLogger.isInfoEnabled()) {
                    httpHeaderLogger.info(requestUri + " - requestHeader: \n" + requestHeader);
                }
            }

            // 设置客户端IP
            logger.setClientIp(clientIp);

            // 目标Controller的包路径
            String targetControllerPackage = methodInvocation.getThis().getClass().getPackage().getName();
            {
                // 登录验证，以及Controller权限验证(只拦截具体的业务功能权限)
                if (targetControllerPackage.startsWith(consolePackage)) {
                    // 需要进行登录验证过滤
                    loginAdminInfo = CommonMethod.getAdminLoginSession(session);
                    if (loginAdminInfo != null) {
                        // session中有，才去从缓存查询
                        LoginAdminInfo loginAdminInfoFromCache = ossCacheService.getLoginAdminInfo(loginAdminInfo.getAdminId(), false);
                        if (loginAdminInfoFromCache != null) {
                            // 缓存或者数据库中查到了对象，赋值给session的属性中
                            CommonMethod.setAdminLoginSession(session, loginAdminInfoFromCache);
                            loginAdminInfo = loginAdminInfoFromCache;
                        }
                    }

                    {
                        // 判断是否登录
                        String errorMsg = null;
                        if (loginAdminInfo == null) {
                            // session或者cache中为null就是未登录
                            hasError = true;
                            errorMsg = requestContext.getMessage("oss.error.login.required", "Login required.");
                        } else if (!IntBool.TRUE.val.equals(loginAdminInfo.getStatus())) {
                            // 账号被禁用
                            hasError = true;
                            errorMsg = requestContext.getMessage("oss.error.account.disabled", "Account disabled.");
                        }
                        if (hasError) {
                            if (isAjax) {
                                // 直接返回验证错误的JSON
                                result = JsonUtil.buildError(errorMsg, BaseConsts.json_info_error_code_admin_login_required, null);
                            } else {
                                request.setAttribute(AttributeConsts.ERROR_MSG, errorMsg);
                                // 重定向到登录页  callbackUrl还要带上原来的参数
                                StringBuilder oldRequestUriWithQueryString = new StringBuilder(64).append(request.getContextPath()).append(requestUri);
                                if (StringUtils.isNotBlank(request.getQueryString())) {
                                    oldRequestUriWithQueryString.append("?").append(request.getQueryString());
                                }
                                result = new StringBuilder(128).append(RequestConsts.LOGIN_PAGE_URL_PATH)
                                        .append("?").append(ParamConsts.login_callbackUrl)
                                        .append("=").append(URLEncoder.encode(oldRequestUriWithQueryString.toString(), RequestConsts.CHARSET)).toString();
                            }
                        }
                    }

                    if (!hasError) {
                        // 登录判断无错误才有必要判断权限
                        // 判断是否有权操作
                        // 所有被列为需要授权访问的requestUri
                        Set<String> allRequireAuthorizationRequestUri = ossCacheService.getAllRequireAuthorizationRequestUri(request.getServletContext());
                        if (allRequireAuthorizationRequestUri.contains(requestUri)) {
                            // 当前地址是需要授权访问的，则判断当前用户是否有权
                            // 这个用户有权限访问的requestUri
                            Set<String> hasPermissionRequestUris = null;
                            if (loginAdminInfo != null) {
                                hasPermissionRequestUris = loginAdminInfo.getHasPermissionRequestUris();
                                menuModuleDtoList = loginAdminInfo.getMenuModuleDtoList();
                                isInConsoleAuthPackage = true;
                            }
                            if (hasPermissionRequestUris == null || (!hasPermissionRequestUris.contains(requestUri))) {
                                // 用户什么权限都没有，或者不具备当前权限
                                // 无权操作
                                hasError = true;
                                hasPermission = false;
                                String errorMsg = requestContext.getMessage("oss.error.permission.required", "Permission required.");
                                if (isAjax) {
                                    // 直接返回验证错误的JSON
                                    result = JsonUtil.buildError(errorMsg);
                                } else {
                                    // 进入403 Forbidden错误页
                                    result = RequestConsts.ERROR_403_PAGE_RESULT;
                                }
                            }
                        }
                    }
                }
            }
            {
                // 表单验证
                if (!hasError) {
                    // 前面没有错误
                    // 在调用controller方法前，spring就已经调用了验证代码
                    Object errorsObj = request.getAttribute(GlobalFormValidator.VALIDATOR_ERROR_ATTRIBUTE_NAME);
                    if (errorsObj != null && errorsObj instanceof Errors) {
                        Errors errors = (Errors) errorsObj;
                        List<ObjectError> allErrors = errors.getAllErrors();
                        if (allErrors != null && allErrors.size() > 0) {
                            hasError = true;
                            if (isAjax) {
                                // 直接返回验证错误的JSON
                                result = JsonUtil.buildError(allErrors);
                            } else {
                                String errorMsg = null;
                                for (ObjectError objectError : allErrors) {
                                    String msgString = objectError.getDefaultMessage();
                                    if (msgString == null || msgString.length() == 0) {
                                        String messageString = requestContext.getMessage(objectError.getCode());
                                        msgString = ValidationUtil.formatArg(messageString, objectError.getArguments());
                                    }
                                    errorMsg = HtmlUtils.htmlEscape(msgString);
                                    break;
                                }
                                request.setAttribute(AttributeConsts.ERROR_MSG, errorMsg);
                                // 进入到错误页
                                result = RequestConsts.ERROR_500_PAGE_RESULT;
                            }
                        }
                    }
                }
            }
            if (!hasError) {
                // 前面没有错误
                // 执行Controller代码
                result = methodInvocation.proceed();
            }
        } catch (Throwable throwable) {
            hasError = true;
            result = this.handleThrowable(request, requestContext, throwable);
            if (!(throwable instanceof BusinessErrorMsgException)) {
                logger.setException(throwable);
                logger.error(throwable);
            }
        } finally {
            {
                logger.setEndTime(System.currentTimeMillis());
                Throwable exception = logger.getException();
                // 请求是否成功：没有异常或者异常是BusinessErrorMsgException，都算成功
                boolean isSuccess = exception == null || (exception instanceof BusinessErrorMsgException);
                logger.close(isSuccess);
                // 清空ThreadLocal上的Logger
                _LogMgrPackageAccesser.setThreadLogger(null);
                if (!isSuccess) {
                    // 请求不成功，发送异常报告
                    try {
//                        CommonMethod.sendControllerExceptionReport(systemReporterTask,
//                                request, request.getSession().getId(),
//                                logger.getException(), logger);
                    } catch (Exception e) {
                        selfLogger.error("sendControllerExceptionReport", e);
                    }
                }
            }

            request.setAttribute(AttributeConsts.DEBUG, Config.isDebug());
            request.setAttribute(AttributeConsts.REQUEST_URI, requestUri);
            request.setAttribute(AttributeConsts.BASE_PATH, request.getContextPath());
            request.setAttribute(AttributeConsts.RESOURCE_MESSAGE_VERSION, messageJavascriptSource.getVersion(locale));
            request.setAttribute(AttributeConsts.RESOURCE_RULE_VERSION, ruleJavascriptSource.getVersion(locale));
            request.setAttribute(AttributeConsts.RESOURCE_FORM_RULE_VERSION, formRuleJavascriptSource.getVersion(locale));

            if ((!hasError) && hasPermission && !isAjax) {
                // 没有错误且有权操作，且不是ajax请求（否则判断到也没有意义）
                request.setAttribute(AttributeConsts.MENU, menuModuleDtoList);
                if (isInConsoleAuthPackage && loginAdminInfo != null) {
                    // 在功能上且当前登录了
                    Integer functionIdSetInController = null;
                    OssMenuFunction focusFunction = null;
                    OssMenuFunction currentFunction = null;
                    // Controller中指定的functionId
                    Object functionIdObjSetInController = request.getAttribute(AttributeConsts.FOCUS_FUNCTION_ID);
                    if (functionIdObjSetInController != null && functionIdObjSetInController instanceof Integer) {
                        functionIdSetInController = (Integer) functionIdObjSetInController;
                    }
                    // 通过requestUri匹配查找OssMenuFunction
                    currentFunction = loginAdminInfo.getPermittedFunctionByRequestUri(requestUri);// 先通过requestUri匹配
                    if (currentFunction == null) {
                        // 没有找到
                        currentFunction = loginAdminInfo.getPermittedFunctionByRelatedRequestUri(requestUri);// 通过relatedRequestUri匹配
                    }
                    if (functionIdSetInController == null) {
                        focusFunction = currentFunction;
                        if (focusFunction != null
                                && (!IntBool.TRUE.val.equals(focusFunction.getShowInMenu()))
                                && focusFunction.getFocusFunctionId() != null) {
                            // 通过requestUri找到了，但匹配到的OssMenuFunction是不显示在菜单中的，
                            // 而且这个OssMenuFunction有指定的focusFunctionId，则通过focusFunctionId重新查找
                            Integer focusFunctionId = focusFunction.getFocusFunctionId();
                            focusFunction = loginAdminInfo.getPermittedFunctionByFunctionId(focusFunctionId);// 通过focusFunctionId匹配
                            if (focusFunction != null
                                    && (!IntBool.TRUE.val.equals(focusFunction.getShowInMenu()))) {
                                // 匹配到了，但focusFunctionId对应的Function不是菜单，则设置为null
                                focusFunction = null;
                            }
                        }
                    } else {
                        // 通过functionId匹配查找OssMenuFunction
                        focusFunction = loginAdminInfo.getPermittedFunctionByFunctionId(functionIdSetInController);// 通过functionIdSetInController匹配
                        if (focusFunction != null
                                && (!IntBool.TRUE.val.equals(focusFunction.getShowInMenu()))) {
                            // 匹配到了，但functionIdSetInController对应的Function不是菜单，则设置为null
                            focusFunction = null;
                        }
                    }
                    if (focusFunction != null) {
                        // 匹配到了当前操作的方法
                        request.setAttribute(AttributeConsts.FOCUS_MODULE_ID, focusFunction.getModuleId());
                        request.setAttribute(AttributeConsts.FOCUS_FUNCTION_ID, focusFunction.getFunctionId());
                    } else {
                        request.setAttribute(AttributeConsts.FOCUS_MODULE_ID, null);
                        request.setAttribute(AttributeConsts.FOCUS_FUNCTION_ID, null);
                    }
                    request.setAttribute(AttributeConsts.CURRENT_FUNCTION, currentFunction);
                }
            }

        }
        return result;
    }

    /**
     * 为了避免requestUri与数据库不匹配，此方法会把多条/替换成一条/
     *
     * @param request
     * @return
     */
    protected String getFixedRequestUri(HttpServletRequest request) {
        String requestUri = request.getRequestURI();
        String contextPath = request.getContextPath();
        return getFixedRequestUri(requestUri, contextPath);
    }

    /**
     * 为了避免requestUri与数据库不匹配，此方法会把多条/替换成一条/
     *
     * @param requestUri
     * @return
     */
    protected String getFixedRequestUri(String requestUri, String contextPath) {
        return CommonMethod.getFixedRequestUri(requestUri, contextPath);
    }

    protected String handleThrowable(HttpServletRequest request, RequestContext requestContext, Throwable throwable) {
        if (throwable == null) {
            throwable = new RuntimeException("Error Unkown");
        }
        String errorMsg = null;
        boolean isBusinessErrorMsgException = false;
        if (throwable instanceof BusinessErrorMsgException) {
            isBusinessErrorMsgException = true;
            BusinessErrorMsgException businessErrorMsgException = (BusinessErrorMsgException) throwable;
            if ((businessErrorMsgException.getMessage() == null || businessErrorMsgException.getMessage().trim().length() == 0)
                    && businessErrorMsgException.getCode() != null) {
                String message = null;
                try {
                    message = requestContext.getMessage(businessErrorMsgException.getCode(), businessErrorMsgException.getArgs(), businessErrorMsgException.getCode());
                } catch (Exception e) {
                    LogMgr.getLogger().error("PageControllerInterceptor.handleThrowable", e);
                }
                businessErrorMsgException.setMessage(message);
            }
            errorMsg = businessErrorMsgException.getMessage();
            if (errorMsg == null) {
                errorMsg = "Error Unkown";
            }
        } else {
            if (Config.isDebug()) {
                // debug返回异常类型
                errorMsg = "System Error: " + throwable.toString();
            } else {
                Object[] args = null;
                String message = throwable.getMessage();
                if (StringUtils.isNotBlank(message)) {
                    args = new Object[]{message};
                }
                errorMsg = requestContext.getMessage("common.error.exception", args);
            }
        }
        if (CommonMethod.isAjaxRequest(request)) {
            // 直接返回验证错误的JSON
            return JsonUtil.buildException(errorMsg, isBusinessErrorMsgException);
        } else {
            request.setAttribute(AttributeConsts.ERROR_MSG, errorMsg);
            // 进入到错误页
            return RequestConsts.ERROR_500_PAGE_RESULT;
        }
    }

    private static String headerValuesToString(Collection<String> values) {
        if (values == null || values.size() == 0) {
            return "";
        }
        StringBuilder buf = new StringBuilder();
        int i = 0;
        for (String value : values) {
            if (i > 0) {
                buf.append(", ");
            }
            buf.append(value);
            i++;
        }
        return buf.toString();
    }
}
