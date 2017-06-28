package com.janita.common.oss.service;

import com.janita.common.oss.bean.role.OssAdmin;
import com.janita.common.oss.bean.role.OssRole;
import com.janita.common.oss.dao.OssAdminDAO;
import com.janita.common.oss.dao.OssRoleDAO;
import com.janita.common.oss.dto.PageDto;
import com.janita.common.oss.enums.IntBool;
import com.janita.common.oss.exception.BusinessErrorMsgException;
import com.janita.common.oss.form.AccountSaveForm;
import com.janita.common.oss.form.AccountUpdateForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by wuqiang on 16-2-2.
 *
 * @author wuqiang
 */
@Service
public class OssAdminService {

    @Autowired
    private OssAdminDAO ossAdminDAO;

    @Autowired
    private OssRoleDAO ossRoleDAO;

    public PageDto selectByPage(int pageNo, int pageSize) {
        return ossAdminDAO.selectByPage(pageNo, pageSize);
    }

    public boolean insert(AccountSaveForm form, String portraitUrl) {
        long now = System.currentTimeMillis();
        OssRole role = ossRoleDAO.selectByPrimaryKey(form.getRoleId());
        if (role == null) {
            throw new BusinessErrorMsgException("oss.error.role.not.exist");
        }
        if (ossAdminDAO.selectByLoginName(form.getLoginName()) != null) {
            // 登录名已存在
            throw new BusinessErrorMsgException("oss.error.loginName.exist", new Object[]{form.getLoginName()});
        }
        if (ossAdminDAO.selectByCellphone(form.getCellphone()) != null) {
            // cellphone已存在
            throw new BusinessErrorMsgException("oss.error.cellphone.exist", new Object[]{form.getCellphone()});
        }
        if (ossAdminDAO.selectByEmail(form.getEmail()) != null) {
            // email已存在
            throw new BusinessErrorMsgException("oss.error.email.exist", new Object[]{form.getEmail()});
        }
        OssAdmin admin = new OssAdmin();
        admin.setRoleId(role.getRoleId());
        admin.setRealName(form.getRealName());
        admin.setLoginName(form.getLoginName());
        admin.setLoginPwd(form.getLoginPwd());
        admin.setCellphone(form.getCellphone());
        admin.setEmail(form.getEmail());
        admin.setPortrait(portraitUrl);
        admin.setStatus(IntBool.TRUE.val);
        admin.setCreateTimeMs(now);
        admin.setUpdateTimeMs(now);
        ossAdminDAO.insertSelective(admin);
        return true;
    }

    public OssAdmin selectById(Integer adminId) {
        return ossAdminDAO.selectByAdminId(adminId);
    }

    public boolean update(AccountUpdateForm form, String portraitUrl) {
        long now = System.currentTimeMillis();
        OssRole role = ossRoleDAO.selectByPrimaryKey(form.getRoleId());
        if (role == null) {
            throw new BusinessErrorMsgException("oss.error.role.not.exist");
        }
        OssAdmin existAdmin = null;
        if ((existAdmin = ossAdminDAO.selectByLoginName(form.getLoginName())) != null && (!existAdmin.getAdminId().equals(form.getAdminId()))) {
            // 登录名已存在
            throw new BusinessErrorMsgException("oss.error.loginName.exist", new Object[]{form.getLoginName()});
        }
        if ((existAdmin = ossAdminDAO.selectByCellphone(form.getCellphone())) != null && (!existAdmin.getAdminId().equals(form.getAdminId()))) {
            // cellphone已存在
            throw new BusinessErrorMsgException("oss.error.cellphone.exist", new Object[]{form.getCellphone()});
        }
        if ((existAdmin = ossAdminDAO.selectByEmail(form.getEmail())) != null && (!existAdmin.getAdminId().equals(form.getAdminId()))) {
            // email已存在
            throw new BusinessErrorMsgException("oss.error.email.exist", new Object[]{form.getEmail()});
        }
        OssAdmin admin = new OssAdmin();
        admin.setAdminId(form.getAdminId());
        admin.setRoleId(role.getRoleId());
        admin.setRealName(form.getRealName());
        admin.setLoginName(form.getLoginName());
        admin.setLoginPwd(form.getLoginPwd());
        admin.setCellphone(form.getCellphone());
        admin.setEmail(form.getEmail());
        admin.setPortrait(portraitUrl);
        admin.setStatus(IntBool.TRUE.val);
        admin.setUpdateTimeMs(now);
        ossAdminDAO.updateByPrimaryKeySelective(admin);
        return true;
    }

    public boolean delete(List<Integer> adminIds) {
        for (Integer adminId : adminIds) {
            OssAdmin admin = ossAdminDAO.selectByPrimaryKey(adminId);
            if (admin != null) {
                ossAdminDAO.deleteByPrimaryKey(adminId);
            }
        }
        return true;
    }

}
