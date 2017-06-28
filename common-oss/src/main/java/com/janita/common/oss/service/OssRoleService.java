package com.janita.common.oss.service;

import com.janita.common.oss.bean.role.OssRelRoleMenuFunction;
import com.janita.common.oss.bean.role.OssRole;
import com.janita.common.oss.dao.OssAdminDAO;
import com.janita.common.oss.dao.OssMenuModuleDAO;
import com.janita.common.oss.dao.OssRelRoleMenuFunctionDAO;
import com.janita.common.oss.dao.OssRoleDAO;
import com.janita.common.oss.dto.MenuModuleDto;
import com.janita.common.oss.dto.OssRoleDetailDto;
import com.janita.common.oss.dto.PageDto;
import com.janita.common.oss.exception.BusinessErrorMsgException;
import com.janita.common.oss.form.RoleSaveForm;
import com.janita.common.oss.form.RoleUpdateForm;
import com.janita.common.oss.model.OssMenuFunction;
import com.janita.common.oss.util.CommonMethod;
import com.wujie.common.beanutil.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by wuqiang on 16-1-30.
 *
 * @author wuqiang
 */
@Service
public class OssRoleService {

    @Autowired
    private OssRoleDAO ossRoleDAO;

    @Autowired
    private OssAdminDAO ossAdminDAO;

    @Autowired
    private OssRelRoleMenuFunctionDAO ossRelRoleMenuFunctionDAO;

    @Autowired
    private OssMenuModuleDAO ossMenuModuleDAO;

    public PageDto selectByPage(int pageNo, int pageSize) {
        return ossRoleDAO.selectByPage(pageNo, pageSize);
    }

    public List<OssRole> selectAllRole() {
        return ossRoleDAO.selectAll();
    }

    /**
     * 查询一个角色所拥有的所有权限（含不显示在菜单中的），且以MenuModuleDto方式返回
     *
     * @param roleId
     * @return
     */
    public List<MenuModuleDto> selectAllFunctionMenuModuleDtoList(int roleId) {
        // 这个角色拥有权限
        List<OssMenuFunction> allFunctionList = ossRelRoleMenuFunctionDAO.selectByRoleId(roleId);
        return CommonMethod.buildMenuModuleDtoListByOssMenuFunctionList(allFunctionList, ossMenuModuleDAO);
    }

    public boolean insert(RoleSaveForm form) {
        long now = System.currentTimeMillis();
        OssRole role = new OssRole();
        role.setRoleName(form.getName());
        role.setRoleDesc(form.getDesc());
        role.setCreateTimeMs(now);
        role.setUpdateTimeMs(now);
        ossRoleDAO.insert(role);
        Integer roleId = role.getRoleId();
        List<Integer> functionIds = form.getFunctionIds();
        if (functionIds != null && functionIds.size() > 0) {
            List<OssRelRoleMenuFunction> relList = new ArrayList<>(functionIds.size());
            for (Integer functionId : functionIds) {
                relList.add(new OssRelRoleMenuFunction(roleId, functionId));
            }
            ossRelRoleMenuFunctionDAO.insertBatch(relList);
        }
        return true;
    }

    public OssRoleDetailDto selectById(Integer roleId) {
        OssRoleDetailDto roleDto = null;
        OssRole role = ossRoleDAO.selectByPrimaryKey(roleId);
        if (role != null) {
            roleDto = new OssRoleDetailDto();
            BeanUtils.copyProperties(role, roleDto);
            roleDto.setFunctionIds(ossRelRoleMenuFunctionDAO.selectFunctionIdByRoleId(roleId));
        }
        return roleDto;
    }

    public boolean update(RoleUpdateForm form) {
        long now = System.currentTimeMillis();
        OssRole role = new OssRole();
        role.setRoleId(form.getRoleId());
        role.setRoleName(form.getName());
        role.setRoleDesc(form.getDesc());
        role.setUpdateTimeMs(now);
        ossRoleDAO.updateByPrimaryKeySelective(role);
        Integer roleId = role.getRoleId();
        ossRelRoleMenuFunctionDAO.deleteByRoleId(roleId);
        List<Integer> functionIds = form.getFunctionIds();
        if (functionIds != null && functionIds.size() > 0) {
            List<OssRelRoleMenuFunction> relList = new ArrayList<>(functionIds.size());
            for (Integer functionId : functionIds) {
                relList.add(new OssRelRoleMenuFunction(roleId, functionId));
            }
            ossRelRoleMenuFunctionDAO.insertBatch(relList);
        }
        return true;
    }

    public boolean delete(List<Integer> roleIds) {
        for (Integer roleId : roleIds) {
            OssRole role = ossRoleDAO.selectByPrimaryKey(roleId);
            if (role != null) {
                int roleSubAdminCount = ossAdminDAO.selectCountByRoleId(roleId);
                if (roleSubAdminCount > 0) {
                    // 还有管理员禁止删除
                    throw new BusinessErrorMsgException("oss.error.remove.has.subadmin", new Object[]{role.getRoleName()});
                }
                ossRoleDAO.deleteByPrimaryKey(roleId);
            }
        }
        ossRelRoleMenuFunctionDAO.deleteByRoleIds(roleIds);
        return true;
    }

}
