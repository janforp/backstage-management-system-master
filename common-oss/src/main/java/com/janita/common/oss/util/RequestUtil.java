package com.janita.common.oss.util;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by wuqiang on 15-8-7.
 *
 * @author wuqiang
 */
public class RequestUtil {
    /**
     * 取得客户端ip地址（可能有多个，如：192.168.10.2,192.168.10.1）<br>
     *
     * @param request HttpServletRequest
     * @return
     */
    public static String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("x-forwarded-for");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }

    /**
     * 得到完成的app Url地址
     *
     * @param request
     * @return http://test.abc.com/contextPath
     */
    public static String getAppUrl(HttpServletRequest request) {
        StringBuffer url = new StringBuffer();
        int port = request.getServerPort();
        if (port < 0) {
            port = 80;
            // Work around java.net.URL bug
        }
        String scheme = request.getScheme().toLowerCase();
        url.append(scheme);
        url.append("://");
        url.append(request.getServerName());
        if ((scheme.equals("http") && (port != 80))
                || (scheme.equals("https") && (port != 443))) {
            url.append(':');
            url.append(port);
        }
        url.append(request.getContextPath());
        return url.toString();
    }
}
