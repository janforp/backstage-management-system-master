package com.janita.common.oss.controller.page.console.auth;

import com.janita.common.oss.bean.role.OssAdmin;
import com.janita.common.oss.bean.role.OssRole;
import com.janita.common.oss.constant.BaseConsts;
import com.janita.common.oss.constant.ParamConsts;
import com.janita.common.oss.constant.RequestConsts;
import com.janita.common.oss.constant.SizeConsts;
import com.janita.common.oss.dto.PageDto;
import com.janita.common.oss.enums.IntBool;
import com.janita.common.oss.form.AccountSaveForm;
import com.janita.common.oss.form.AccountUpdateForm;
import com.janita.common.oss.service.OssAdminService;
import com.janita.common.oss.service.OssRoleService;
import com.janita.common.oss.util.CommonMethod;
import com.janita.common.oss.util.JsonUtil;
import com.janita.common.oss.util.Md5EncryptUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.support.RequestContext;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

/**
 * Created by wuqiang on 15-12-30.
 *
 * @author wuqiang
 */
@RequestMapping(value = "/page/console/auth/account", produces = RequestConsts.CONTENT_TYPE_HTML, method = {RequestMethod.GET, RequestMethod.POST})
@Controller
public class OssAccountController {

    @Autowired
    private OssAdminService ossAdminService;

    @Autowired
    private OssRoleService ossRoleService;

    @RequestMapping("/list")
    public String list(HttpServletRequest request,
                       @RequestParam(value = ParamConsts.pageNo, required = false) Integer pageNo) {
        RequestContext requestContext = new RequestContext(request);
        if (pageNo == null || pageNo <= 0) {
            pageNo = 1;
        }
        PageDto pageDto = ossAdminService.selectByPage(pageNo, SizeConsts.PAGE_SIZE_DEFAULT);
        List<OssRole> allRole = ossRoleService.selectAllRole();
        request.setAttribute("pg", pageDto);
        request.setAttribute("allRole", allRole);
        request.setAttribute("portraitInfo", requestContext.getMessage("oss.account.portrait.info"));
        return "console/auth/account-list";
    }

    @RequestMapping(value = "/save", method = RequestMethod.POST)
    @ResponseBody
    public String save(HttpServletRequest request, @Valid AccountSaveForm accountSaveForm, BindingResult result) {
        RequestContext requestContext = new RequestContext(request);
        String passwordbyMd5 = null;
        try {
            passwordbyMd5 = Md5EncryptUtil.decrypt(accountSaveForm.getLoginPwd());
        } catch (Exception e) {
        }
        if (passwordbyMd5 == null || passwordbyMd5.length() != 32) {
            // 不是MD5密码
            return JsonUtil.buildError(requestContext.getMessage("oss.required.pid"), "loginPwd");
        }
        accountSaveForm.setLoginName(accountSaveForm.getLoginName().toLowerCase());
        accountSaveForm.setLoginPwd(CommonMethod.encyptPasswordMd5(passwordbyMd5));
        if (ossAdminService.insert(accountSaveForm, "")) {
            return JsonUtil.buildSuccess(requestContext.getMessage("msg.success"));
        }
        return JsonUtil.buildError(requestContext.getMessage("msg.fail"));
    }

    @RequestMapping("/edit")
    @ResponseBody
    public String edit(HttpServletRequest request, @RequestParam(value = ParamConsts.id, required = false) Integer adminId) {
        RequestContext requestContext = new RequestContext(request);
        if (adminId == null) {
            return JsonUtil.buildError(requestContext.getMessage("oss.error.account.not.exist"));
        }
        OssAdmin admin = ossAdminService.selectById(adminId);
        if (admin != null) {
            admin.setLoginPwd(null);
            return JsonUtil.buildData(admin);
        }
        return JsonUtil.buildError(requestContext.getMessage("oss.error.account.not.exist"));
    }

    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    public String update(HttpServletRequest request, @Valid AccountUpdateForm accountUpdateForm, BindingResult result) {
        RequestContext requestContext = new RequestContext(request);
        if (StringUtils.isNotBlank(accountUpdateForm.getLoginPwd())) {
            String passwordbyMd5 = null;
            try {
                passwordbyMd5 = Md5EncryptUtil.decrypt(accountUpdateForm.getLoginPwd());
            } catch (Exception e) {
            }
            if (passwordbyMd5 == null || passwordbyMd5.length() != 32) {
                // 不是MD5密码
                return JsonUtil.buildError(requestContext.getMessage("oss.required.pid"), "loginPwd");
            }
            accountUpdateForm.setLoginPwd(CommonMethod.encyptPasswordMd5(passwordbyMd5));
        } else {
            accountUpdateForm.setLoginPwd(null);
        }
        Integer targetStatus = null;
        if (accountUpdateForm.getStatus() != null) {
            if (IntBool.TRUE.val.equals(accountUpdateForm.getStatus()) || IntBool.FALSE.val.equals(accountUpdateForm.getStatus())) {
                targetStatus = accountUpdateForm.getStatus();
            }
        }
        accountUpdateForm.setStatus(targetStatus);
        accountUpdateForm.setLoginName(accountUpdateForm.getLoginName().toLowerCase());
        if (ossAdminService.update(accountUpdateForm, null)) {
            return JsonUtil.buildSuccess(requestContext.getMessage("msg.success"));
        }
        return JsonUtil.buildError(requestContext.getMessage("msg.fail"));
    }

    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    @ResponseBody
    public String remove(HttpServletRequest request, @RequestParam(value = ParamConsts.ids, required = false) List<Integer> adminIds) {
        RequestContext requestContext = new RequestContext(request);
        if (adminIds == null || adminIds.isEmpty()) {
            return JsonUtil.buildError(requestContext.getMessage("common.error.required-select", new Object[]{requestContext.getMessage("oss.account")}));
        }
        if (adminIds.contains(BaseConsts.super_administrator_id)) {
            // 禁止删除超级管理员
            return JsonUtil.buildError(requestContext.getMessage("oss.error.forbid.remove.super.admin"));
        }
        if (ossAdminService.delete(adminIds)) {
            return JsonUtil.buildSuccess(requestContext.getMessage("msg.success"));
        }
        return JsonUtil.buildError(requestContext.getMessage("msg.fail"));
    }


}
