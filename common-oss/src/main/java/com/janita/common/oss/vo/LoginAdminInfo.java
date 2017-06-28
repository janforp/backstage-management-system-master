package com.janita.common.oss.vo;

import com.janita.common.oss.dto.MenuModuleDto;
import com.janita.common.oss.model.OssMenuFunction;
import com.janita.common.oss.util.other.FieldGetters;
import com.wujie.common.utils.WJCollections;

import java.io.Serializable;
import java.util.*;

/**
 * Created by craig on 16/1/28.
 */
public class LoginAdminInfo implements Serializable {

    // 管理员ID，主键，自增长ID
    private Integer adminId;
    // 角色ID
    private Integer roleId;
    // 角色名
    private String roleName;
    // 姓名
    private String realName;
    // 登录名；唯一／非空
    private String loginName;
    // 登录手机；唯一／可空
    private String cellphone;
    // 登录邮箱；唯一／可空
    private String email;
    // 头像文件名
    private String portrait;
    // 0：禁用；1：正常
    private Integer status;

    // 这个用户的菜单
    private List<MenuModuleDto> menuModuleDtoList  = new ArrayList<>(0);

    // 这个用户有权限访问的requestUri，含showInMenu=0的（即：含不显示在菜单中的）
    private Set<String> hasPermissionRequestUris = new HashSet<>(0);

    // 这个用户有权限访问的所有功能，含showInMenu=0的（即：含不显示在菜单中的）
    private List<OssMenuFunction> allFunctionList = new ArrayList<>(0);

    // allFunctionList按照functionId进行分组的结果
    private Map<Integer, OssMenuFunction> allFunctionIdMap = new HashMap<>(0);

    // allFunctionList按照requestUri进行分组的结果
    private Map<String, OssMenuFunction> allFunctionRequestUriMap = new HashMap<>(0);

    // allFunctionList按照relatedRequestUri进行分组的结果
    private Map<String, OssMenuFunction> allFunctionRelatedRequestUriMap = new HashMap<>(0);


    public Integer getAdminId() {
        return adminId;
    }

    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    public Integer getRoleId() {
        return roleId;
    }

    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
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

    public String getPortrait() {
        return portrait;
    }

    public void setPortrait(String portrait) {
        this.portrait = portrait;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public List<MenuModuleDto> getMenuModuleDtoList() {
        return menuModuleDtoList;
    }

    public void setMenuModuleDtoList(List<MenuModuleDto> menuModuleDtoList) {

        if (menuModuleDtoList == null) {
            menuModuleDtoList = new ArrayList<>(0);
        }

        this.menuModuleDtoList = menuModuleDtoList;
    }

    public Set<String> getHasPermissionRequestUris() {
        return hasPermissionRequestUris;
    }

    public void setHasPermissionRequestUris(Set<String> hasPermissionRequestUris) {
        if (hasPermissionRequestUris == null) {
            hasPermissionRequestUris = new HashSet<>(0);
        }
        this.hasPermissionRequestUris = hasPermissionRequestUris;
    }

    public List<OssMenuFunction> getAllFunctionList() {
        return allFunctionList;
    }

    public void setAllFunctionList(List<OssMenuFunction> allFunctionList) {
        if (allFunctionList == null) {
            allFunctionList = new ArrayList<>(0);
        }
        this.allFunctionList = allFunctionList;
        if (allFunctionList != null && allFunctionList.size() > 0) {
            this.allFunctionIdMap = WJCollections.groupByUnique(allFunctionList, FieldGetters.OssMenuFunction_functionId_getter);
            this.allFunctionRequestUriMap = WJCollections.groupByUnique(allFunctionList, FieldGetters.OssMenuFunction_requestUri_getter);
//            this.allFunctionRelatedRequestUriMap = WJCollections.groupByUnique(allFunctionList, FieldGetters.OssMenuFunction_relatedRequestUri_getter);
        }
    }

    public OssMenuFunction getPermittedFunctionByFunctionId(Integer functionId) {
        return this.allFunctionIdMap.get(functionId);
    }

    public OssMenuFunction getPermittedFunctionByRequestUri(String requestUri) {
        return this.allFunctionRequestUriMap.get(requestUri);
    }

    public OssMenuFunction getPermittedFunctionByRelatedRequestUri(String relatedRequestUri) {
        return this.allFunctionRelatedRequestUriMap.get(relatedRequestUri);
    }
}
