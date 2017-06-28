package com.janita.common.oss.service;

import com.janita.common.oss.bean.role.OssAdmin;
import com.janita.common.oss.dao.OssAdminDAO;
import com.janita.common.oss.dto.LoginServiceResultDto;
import com.janita.common.oss.enums.IntBool;
import com.janita.common.oss.util.CommonMethod;
import com.janita.common.oss.vo.LoginAdminInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


/**
 * Created by Summer on 16/6/13.
 */
@Service
public class LoginService {

    @Autowired
    private OssAdminDAO ossAdminDAO;

    @Autowired
    private OssCacheService ossCacheService;

    public LoginServiceResultDto login(String loginNameOrCellphoneOrEmail, String passwordbyMd5) {
        OssAdmin admin;
        if (CommonMethod.isValidCellphone(loginNameOrCellphoneOrEmail)) {
            admin = ossAdminDAO.selectByCellphone(loginNameOrCellphoneOrEmail);
        } else if (CommonMethod.isValidEmail(loginNameOrCellphoneOrEmail)) {
            admin = ossAdminDAO.selectByEmail(loginNameOrCellphoneOrEmail);
        } else {
            admin = ossAdminDAO.selectByLoginName(loginNameOrCellphoneOrEmail);
        }
        int loginResult = 0;
        LoginAdminInfo loginAdminInfo = null;
        if (admin == null) {
            // 没有此账号
            loginResult = 0;
        } else {
            if (!IntBool.TRUE.val.equals(admin.getStatus())) {
                // 账号被禁用
                loginResult = 2;
            } else {
                String password = CommonMethod.encyptPasswordMd5(passwordbyMd5);
                if (password.equalsIgnoreCase(admin.getLoginPwd())) {
                    // 密码正确
                    loginResult = 1;
                    loginAdminInfo = ossCacheService.getLoginAdminInfo(admin.getAdminId(), true);
                } else {
                    // 密码错误
                    loginResult = 0;
                }
            }
        }
        LoginServiceResultDto resultDto = new LoginServiceResultDto();
        resultDto.setLoginResult(loginResult);
        resultDto.setLoginAdminInfo(loginAdminInfo);
        return resultDto;
    }

}
