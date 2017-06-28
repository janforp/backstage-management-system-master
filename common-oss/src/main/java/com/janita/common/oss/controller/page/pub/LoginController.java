package com.janita.common.oss.controller.page.pub;

import com.janita.common.oss.constant.ParamConsts;
import com.janita.common.oss.constant.RequestConsts;
import com.janita.common.oss.dto.LoginServiceResultDto;
import com.janita.common.oss.enums.IntBool;
import com.janita.common.oss.form.LoginForm;
import com.janita.common.oss.service.LoginService;
import com.janita.common.oss.service.OssCacheService;
import com.janita.common.oss.util.CommonMethod;
import com.janita.common.oss.util.JsonUtil;
import com.janita.common.oss.util.Md5EncryptUtil;
import com.janita.common.oss.util.captcha.CaptchaUtil;
import com.janita.common.oss.vo.LoginAdminInfo;
import org.apache.commons.lang.StringUtils;
import org.craigq.common.logger.LogMgr;
import org.patchca.utils.encoder.EncoderHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.support.RequestContext;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.io.ByteArrayOutputStream;
import java.io.IOException;

/**
 * Created by wuqiang on 15-12-30.
 *
 * @author wuqiang
 */
@RequestMapping(value = "/page/pub", produces = RequestConsts.CONTENT_TYPE_HTML, method = {RequestMethod.GET, RequestMethod.POST})
@Controller
public class LoginController {

    private static String login_captcha_attr_name = "LOGIN_CAPTCHA_ATTR_NAME";

    @Autowired
    private OssCacheService ossCacheService;

    @Autowired
    private LoginService loginService;

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(HttpServletRequest request, Model model,
                        @RequestParam(value = ParamConsts.login_callbackUrl, required = false) String callbackUrl) {

        if (StringUtils.isBlank(callbackUrl)) {
            callbackUrl = "../console/index";
        }

        LoginAdminInfo loginAdminInfo = CommonMethod.getAdminLoginSession(request.getSession());
        if (loginAdminInfo != null && IntBool.TRUE.val.equals(loginAdminInfo.getStatus())) {
            return "redirect:../console/index";
        }

        request.setAttribute(ParamConsts.login_callbackUrl, callbackUrl);
        return RequestConsts.LOGIN_PAGE_RESULT;
    }

    @RequestMapping(value = "/login.do", produces = RequestConsts.CONTENT_TYPE_JSON, method = RequestMethod.POST)
    @ResponseBody
    public String doLogin(HttpServletRequest request, @Valid LoginForm loginForm, BindingResult result) {

        RequestContext requestContext = new RequestContext(request);
        HttpSession session = request.getSession();
        Object textCaptchaObject = session.getAttribute(login_captcha_attr_name);

        session.removeAttribute(login_captcha_attr_name);
        if (textCaptchaObject == null) {
            // 用户没有获取过验证码
            return JsonUtil.buildError(requestContext.getMessage("oss.error.vcode"), "vcode");
        }
        if (!textCaptchaObject.toString().equalsIgnoreCase(loginForm.getVcode())) {
            return JsonUtil.buildError(requestContext.getMessage("oss.error.vcode"), "vcode");
        }
        String passwordbyMd5 = null;
        try {
            passwordbyMd5 = Md5EncryptUtil.decrypt(loginForm.getPid());
        } catch (Exception e) {
        }
        if (passwordbyMd5 == null || passwordbyMd5.length() != 32) {
            // 不是MD5密码
            return JsonUtil.buildError(requestContext.getMessage("oss.required.pid"), "pid");
        }
        loginForm.setPid(passwordbyMd5);
        LoginServiceResultDto serviceResultDto = loginService.login(loginForm.getUid(), loginForm.getPid());
        if (serviceResultDto.isLoginSuccess()) {
            // 保存到会话
            CommonMethod.setAdminLoginSession(request.getSession(), serviceResultDto.getLoginAdminInfo());
            return JsonUtil.buildSuccess(requestContext.getMessage("oss.login.success"));
        } else {
            int loginResult = serviceResultDto.getLoginResult();
            String errorCode;
            switch (loginResult) {
                case 2: // 账号被禁用
                    errorCode = "oss.error.account.disabled";
                    break;
                default: // 用户名或密码错误
                    errorCode = "oss.error.uid_or_pwd";
                    break;
            }
            return JsonUtil.buildError(requestContext.getMessage(errorCode), "pid");
        }

    }


    @RequestMapping(value = "/login/captcha.png", produces = "image/png", method = RequestMethod.GET)
    public void loginCaptcha(HttpServletRequest request, HttpServletResponse response) {
        ServletOutputStream respOs = null;
        ByteArrayOutputStream imageOutputStream = null;
        try {
            imageOutputStream = new ByteArrayOutputStream();
            String textCaptcha = EncoderHelper.getChallangeAndWriteImage(CaptchaUtil.getRandomCaptchaService(), "png", imageOutputStream);
            request.getSession().setAttribute(login_captcha_attr_name, textCaptcha);// 设置到会话范围

            response.setHeader("Cache-Control", "no-store");
            response.setHeader("Pragma", "no-cache");
            response.setDateHeader("Expires", 0L);
            response.setContentType("image/png");

            byte[] captchaChallengeAsJpeg = imageOutputStream.toByteArray();
            respOs = response.getOutputStream();
            respOs.write(captchaChallengeAsJpeg);
            respOs.flush();
        } catch (IOException e) {
            LogMgr.getLogger().error("generate captcha image error: {}", e);
        } finally {
            if (imageOutputStream != null) {
                try {
                    imageOutputStream.close();
                } catch (IOException e) {
                    LogMgr.getLogger().error(e);
                }
            }
            if (respOs != null) {
                try {
                    respOs.close();
                } catch (IOException e) {
                    LogMgr.getLogger().error(e);
                }
            }
        }
    }

    @RequestMapping(value = "/logout", produces = RequestConsts.CONTENT_TYPE_JSON, method = RequestMethod.GET)
    @ResponseBody
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession();
        Integer adminId = CommonMethod.getAdminIdSession(session);
        if (adminId != null) {
            ossCacheService.removeLoginAdminInfo(adminId);
        }
        CommonMethod.setAdminLoginSession(session, null);
        session.invalidate();
        return JsonUtil.buildSuccess(new RequestContext(request).getMessage("oss.logout.success"));
    }
}
