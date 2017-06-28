package com.janita.common.oss.logger;

import org.craigq.common.logger.ILogger;
import org.craigq.common.logger.LogCycleType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Rest请求，一次请求中使用的同一个Logger对象
 *
 * @author wu-qiang
 */
public class ControllerLogger implements ILogger {

    private LogCycleType logType = LogCycleType.REQUEST;
    protected Logger logger;
    private HttpServletRequest request;
    /**
     * 请求开始时间
     */
    private long startTime;
    private String requestUri;
    private String clientIp;
    private Map<String, String> requestHeader;
    /**
     * 请求完成时间
     */
    private long endTime;

    /**
     * 最后的操作是否发生异常
     */
    private Throwable exception;

    public ControllerLogger(HttpServletRequest request) {
        super();
        this.request = request;
        logger = LoggerFactory.getLogger(ControllerLogger.class);
        this.requestUri = request.getRequestURI();
        this.startTime = System.currentTimeMillis();
    }

    /**
     * 请求结束后，关闭操作
     */
    @Override
    public void close(boolean isSuccess) {
        if (isSuccess) {
            if (this.logger.isInfoEnabled()) {
                this.info("request-hashCode:" + request.hashCode());
                this.info("requestUri:" + requestUri);
                this.info("clientIp:" + clientIp);
                this.info("startTime:" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS")
                        .format(new Date(startTime)));
                this.info(
                        "endTime:" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS")
                                .format(new Date(endTime)));
                if (this.requestHeader == null) {
                    Enumeration<String> headers = this.request.getHeaderNames();
                    Map<String, String> _requestHeader = new HashMap<String, String>();
                    if (headers != null) {
                        String name = headers.nextElement();
                        List<String> headerValueList = new ArrayList<>(3);
                        Enumeration<String> headerValues = request.getHeaders(name);
                        if (headerValues != null) {
                            while (headerValues.hasMoreElements()) {
                                headerValueList.add(headerValues.nextElement());
                            }
                        }
                        _requestHeader.put(name, headerValuesToString(headerValueList));
                    }
                    this.requestHeader = _requestHeader;
                }
                this.info("requestHeader:" + requestHeader);
                if (exception != null) {
                    this.error("exception:" + exception.toString());
                }
            }
        } else {
            if (this.requestHeader == null) {
                Enumeration<String> headers = this.request.getHeaderNames();
                Map<String, String> _requestHeader = new HashMap<String, String>();
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
                        _requestHeader.put(name, headerValuesToString(headerValueList));
                    }
                }
                this.requestHeader = _requestHeader;
            }
            this.error("请求发生异常：");
            this.error("request-hashCode:" + request.hashCode());
            this.error("requestUri:" + requestUri);
            this.error("clientIp:" + clientIp);
            this.error("startTime:" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS")
                    .format(new Date(startTime)));
            this.error(
                    "endTime:" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS")
                            .format(new Date(endTime)));
            this.error("requestHeader:" + this.requestHeader);
            if (exception != null) {
                this.error("exception:" + exception.toString());
            }
        }
    }

    public String getName() {
        return this.logger.getName();
    }

    @Override
    public ILogger info(Object msg) {
        logger.info(String.valueOf(msg));
        return this;
    }

    @Override
    public ILogger debug(Object msg) {
        logger.debug(String.valueOf(msg));
        return this;
    }

    @Override
    public ILogger warn(Object msg) {
        logger.warn(String.valueOf(msg));
        return this;
    }

    @Override
    public ILogger error(Object msg) {
        if (msg != null && msg instanceof Throwable) {
            this.error("", (Throwable) msg);
        } else {
            logger.error(String.valueOf(msg));
        }
        return this;
    }

    @Override
    public ILogger error(String msg, Throwable ex) {
        this.exception = ex;
        logger.error(msg, ex);
        return this;
    }

    public boolean isDebugEnabled() {
        return this.logger.isDebugEnabled();
    }

    public boolean isInfoEnabled() {
        return this.logger.isInfoEnabled();
    }

    public boolean isWarnEnabled() {
        return this.logger.isWarnEnabled();
    }

    @Override
    public void setLogType(LogCycleType logType) {
        this.logType = logType;
    }

    @Override
    public LogCycleType getLogType() {
        return this.logType;
    }

    public void setRequestUri(String requestUri) {
        this.requestUri = requestUri;
    }

    public String getRequestUri() {
        return requestUri;
    }

    public Map<String, String> getRequestHeader() {
        return requestHeader;
    }

    public void setRequestHeader(Map<String, String> requestHeader) {
        this.requestHeader = requestHeader;
    }

    public long getStartTime() {
        return startTime;
    }

    public long getEndTime() {
        return endTime;
    }

    public void setEndTime(long endTime) {
        this.endTime = endTime;
    }

    public Throwable getException() {
        return exception;
    }

    public void setException(Throwable exception) {
        this.exception = exception;
    }

    public String getClientIp() {
        return clientIp;
    }

    public void setClientIp(String clientIp) {
        this.clientIp = clientIp;
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
