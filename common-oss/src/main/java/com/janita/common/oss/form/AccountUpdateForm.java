package com.janita.common.oss.form;

/**
 * Created by wuqiang on 16-2-2.
 *
 * @author wuqiang
 */
public class AccountUpdateForm extends AccountSaveForm {
    private Integer adminId;
    private Integer status;

    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
