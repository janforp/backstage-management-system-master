package com.janita.common.oss.logger;

import org.craigq.common.logger.ILoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by wuqiang on 15-8-5.
 *
 * @author wuqiang
 */
@Component
public class ControllerLoggerFactory implements ILoggerFactory<HttpServletRequest, ControllerLogger> {
    public ControllerLogger getLogger(HttpServletRequest request) {
        return new ControllerLogger(request);
    }
}
