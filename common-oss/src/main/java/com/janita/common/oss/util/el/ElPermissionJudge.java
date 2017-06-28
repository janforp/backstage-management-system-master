package com.janita.common.oss.util.el;

import com.janita.common.oss.constant.AttributeConsts;
import com.janita.common.oss.util.CommonMethod;
import com.janita.common.oss.vo.LoginAdminInfo;
import org.craigq.common.logger.ILogger;
import org.craigq.common.logger.LogMgr;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.Set;

/**
 * Created by wuqiang on 16-2-1.
 * <p/>
 * EL权限判断
 *
 * @author wuqiang
 */
public class ElPermissionJudge {
    public static boolean hasAuth(String requestUri) {
        if (requestUri == null) {
            return false;
        }
        Set<String> hasPermissionRequestUris = null;
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        ILogger logger = LogMgr.getLogger();
        if (requestAttributes != null && requestAttributes instanceof ServletRequestAttributes) {
            ServletRequestAttributes servletRequestAttributes = (ServletRequestAttributes) requestAttributes;
            HttpServletRequest request = servletRequestAttributes.getRequest();
            if (request != null) {
                String attributeName = "hasPermission_" + requestUri;
                Object requestUriPermissionJudgeObj = request.getAttribute(attributeName);
                if (requestUriPermissionJudgeObj != null && requestUriPermissionJudgeObj instanceof Boolean) {
                    // request范围的判断缓存
                    return (Boolean) requestUriPermissionJudgeObj;
                }
                boolean hasPermission = true;// 默认允许访问
                boolean isLimitedRequestUri = false;// 当前requestUri是否是受限请求
                Set<String> allRequestUriSet = null;// 所有要进行权限控制的requestUri
                Object allRequestUriSetObj = request.getServletContext().getAttribute(AttributeConsts.ServletContext_AllRequireAuthorizationRequestUri);
                if (allRequestUriSetObj != null && allRequestUriSetObj instanceof Set) {
                    allRequestUriSet = (Set<String>) allRequestUriSetObj;
                }
                if (allRequestUriSet != null && allRequestUriSet.contains(requestUri)) {
                    // 所有要进行权限控制的requestUri中有这个requestUri，则要判断当前用户是否有权限
                    isLimitedRequestUri = true;
                }
                HttpSession session = request.getSession();
                LoginAdminInfo loginAdminInfo = CommonMethod.getAdminLoginSession(session);
                if (loginAdminInfo != null) {
                    hasPermissionRequestUris = loginAdminInfo.getHasPermissionRequestUris();
                    if (isLimitedRequestUri) {
                        // 当前requestUri是受限请求
                        if (hasPermissionRequestUris != null) {
                            hasPermission = hasPermissionRequestUris.contains(requestUri);
                        } else {
                            // 这个用户什么权限都没有，而这个requestUri有在权限控制的列表中，所以说明此用户无权限
                            hasPermission = false;
                        }
                    }
                } else {
                    if (isLimitedRequestUri) {
                        // 没登录，且当前requestUri是受限请求，则肯定没有权限
                        hasPermission = false;
                    }
                    logger.error("ElPermissionJudge.hasAuth(requestUri) must be invoked with session which admin is logged in!");
                }
                request.setAttribute(attributeName, hasPermission);// 设置到request范围缓存
                return hasPermission;
            } else {
                logger.error("ElPermissionJudge.hasAuth(requestUri) must be invoked with request!");
            }
        } else {
            logger.error("ElPermissionJudge.hasAuth(requestUri) must be invoked with request!");
        }
        return false;
    }
}
