package com.janita.common.oss.form;

import org.springframework.web.multipart.MultipartFile;

/**
 * Created by wuqiang on 16-2-2.
 *
 * @author wuqiang
 */
public class AccountSaveForm {
    private Integer roleId;
    private String realName;
    private String loginName;
    private String loginPwd;
    private String cellphone;
    private String email;
    private MultipartFile portrait;

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRealName() {
        return realName;
    }

    public void setRealName(String realName) {
        this.realName = realName;
    }

    public String getLoginName() {
        return loginName;
    }

    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    public String getLoginPwd() {
        return loginPwd;
    }

    public void setLoginPwd(String loginPwd) {
        this.loginPwd = loginPwd;
    }

    public String getCellphone() {
        return cellphone;
    }

    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public MultipartFile getPortrait() {
        return portrait;
    }

    public void setPortrait(MultipartFile portrait) {
        this.portrait = portrait;
    }
}
