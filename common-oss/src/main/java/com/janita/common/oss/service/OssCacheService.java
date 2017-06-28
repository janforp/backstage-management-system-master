package com.janita.common.oss.service;

import com.alibaba.fastjson.JSON;
import com.janita.common.oss.bean.role.OssAdmin;
import com.janita.common.oss.bean.role.OssRole;
import com.janita.common.oss.constant.AttributeConsts;
import com.janita.common.oss.constant.OssCacheConsts;
import com.janita.common.oss.constant.RequestConsts;
import com.janita.common.oss.dao.*;
import com.janita.common.oss.dto.MenuModuleDto;
import com.janita.common.oss.model.OssMenuFunction;
import com.janita.common.oss.util.CommonMethod;
import com.janita.common.oss.vo.LoginAdminInfo;
import com.wujie.common.redis.StringKeyRedisTemplate;
import org.apache.commons.lang.StringUtils;
import org.craigq.common.logger.LogMgr;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.ServletContext;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by wuqiang on 16-1-29.
 *
 * @author wuqiang
 */
@Service
public class OssCacheService {

    @Autowired
    private StringKeyRedisTemplate ossCacheRedisTemplate;

    @Autowired
    private OssAdminDAO ossAdminDAO;

    @Autowired
    private OssRoleDAO ossRoleDAO;

    @Autowired
    private OssRelRoleMenuFunctionDAO ossRelRoleMenuFunctionDAO;

    @Autowired
    private OssMenuModuleDAO ossMenuModuleDAO;

    @Autowired
    private OssMenuFunctionDAO ossMenuFunctionDAO;


    /**
     * 如果servletContext!=null，则会系统内存中的Set对象，如果缓存过期了，也会更新servletContext中缓存的Set对象
     *
     * @param servletContext
     * @return
     */
    public Set<String> getAllRequireAuthorizationRequestUri(ServletContext servletContext) {
        String key = OssCacheConsts.key_AllRequireAuthorizationRequestUri;
        String json = null;
        try {
            json = ossCacheRedisTemplate.get(key);
        } catch (Exception e) {
            LogMgr.getLogger().error("OssCacheService.getAllRequireAuthorizationRequestUri", e);
        }
        if (json != null) {
            // 缓存未过期
            if (servletContext != null) {
                // 从系统内存中查找这个set对象
                Object requestUriSetObj = servletContext.getAttribute(AttributeConsts.ServletContext_AllRequireAuthorizationRequestUri);
                if (requestUriSetObj != null && requestUriSetObj instanceof Set) {
                    return (Set<String>) requestUriSetObj;
                }
            }
            List<String> requestUriList = null;
            try {
                requestUriList = JSON.parseArray(json, String.class);
            } catch (Exception e) {
                LogMgr.getLogger().error("OssCacheService.getAllRequireAuthorizationRequestUri", e);
            }
            if (requestUriList == null) {
                requestUriList = ossMenuFunctionDAO.selectAllRequestUri();
            }
            Set<String> requestUriSet = new HashSet<>(requestUriList);
            if (servletContext != null) {
                // 缓存到系统内存
                servletContext.setAttribute(AttributeConsts.ServletContext_AllRequireAuthorizationRequestUri, requestUriSet);
            }
            return requestUriSet;
        } else {
            // 缓存已过期
            List<String> requestUriList = ossMenuFunctionDAO.selectAllRequestUri();
            Set<String> requestUriSet = new HashSet<>(requestUriList);
            if (servletContext != null) {
                // 缓存到系统内存
                servletContext.setAttribute(AttributeConsts.ServletContext_AllRequireAuthorizationRequestUri, requestUriSet);
            }
            return requestUriSet;
        }
    }

    public void removeLoginAdminInfo(Integer adminId) {
        ossCacheRedisTemplate.delete(OssCacheConsts.key_LoginAdminInfo + adminId);
    }

    /**
     * 通过adminId获取LoginAdminInfo，无论用户状态都会获取到
     *
     * @param adminId
     * @param forceRefresh 是否强制刷新
     * @return
     */
    public LoginAdminInfo getLoginAdminInfo(Integer adminId, boolean forceRefresh) {
        LoginAdminInfo loginAdminInfo = null;
        String key = OssCacheConsts.key_LoginAdminInfo + adminId;
        if (!forceRefresh) {
            // 不强制刷新，尝试从缓存读取
            String json = null;
            try {
                json = ossCacheRedisTemplate.get(key);
            } catch (Exception e) {
                LogMgr.getLogger().error("OssCacheService.getLoginAdminInfo", e);
            }
            if (json != null) {
                try {
                    loginAdminInfo = JSON.parseObject(json, LoginAdminInfo.class);
                } catch (Exception e) {
                    LogMgr.getLogger().error("OssCacheService.getLoginAdminInfo", e);
                }
            }
        }
        if (loginAdminInfo == null) {
            // 没有从缓存获取或者没有获取到，则从数据库查询
            loginAdminInfo = getLoginAdminInfoFromDatabase(adminId);
            if (loginAdminInfo != null) {
                // 设置到缓存，直接设置JSON
                String loginAdminInfoJson = JSON.toJSONString(loginAdminInfo);
                // 有效期10分钟
                try {
                    ossCacheRedisTemplate.setex(key, loginAdminInfoJson.getBytes(RequestConsts.CHARSET), OssCacheConsts.SECONDS_OF_TEN_MINUTE);
                } catch (Exception e) {
                    LogMgr.getLogger().error("OssCacheService.getLoginAdminInfo", e);
                }
            } else {
                // 如果本次是强制刷新，有可能缓存中有，但是没有查缓存，而数据库中不存在，所以删除缓存
                try {
                    ossCacheRedisTemplate.delete(key);
                } catch (Exception e) {
                    LogMgr.getLogger().error("OssCacheService.getLoginAdminInfo", e);
                }
            }
        }
        return loginAdminInfo;
    }

    private LoginAdminInfo getLoginAdminInfoFromDatabase(Integer adminId) {
        LoginAdminInfo loginAdminInfo = null;
        OssAdmin admin = ossAdminDAO.selectByPrimaryKey(adminId);
        if (admin != null) {
            loginAdminInfo = new LoginAdminInfo();
            BeanUtils.copyProperties(admin, loginAdminInfo);
            Integer roleId = admin.getRoleId();
            OssRole role = ossRoleDAO.selectByPrimaryKey(roleId);
            BeanUtils.copyProperties(role, loginAdminInfo);
            loginAdminInfo.setStatus(admin.getStatus()); // 避免与role.status冲突
            // 这个角色拥有权限
            List<OssMenuFunction> allFunctionList = ossRelRoleMenuFunctionDAO.selectByRoleId(roleId);
            // 这个角色拥有权限的显示在菜单中的功能
            List<OssMenuFunction> menuFunctionList = ossRelRoleMenuFunctionDAO.selectByRoleIdAndShowInMenu(roleId);
            // 这个用户能够管理菜单
            List<MenuModuleDto> menuProjectDtoList = CommonMethod.buildMenuModuleDtoListByOssMenuFunctionList(menuFunctionList, ossMenuModuleDAO);
            loginAdminInfo.setMenuModuleDtoList(menuProjectDtoList);
            {
                Set<String> hasPermissionRequestUris = new HashSet<>(allFunctionList.size());
                for (OssMenuFunction function : allFunctionList) {
                    hasPermissionRequestUris.add(function.getRequestUri());
                    if (StringUtils.isNotBlank(function.getRelatedRequestUri())) {
                        hasPermissionRequestUris.add(function.getRelatedRequestUri());
                    }
                }
                loginAdminInfo.setHasPermissionRequestUris(hasPermissionRequestUris);
                loginAdminInfo.setAllFunctionList(allFunctionList);
            }
        }
        return loginAdminInfo;
    }


    public void removeSubjectEnable() {
        ossCacheRedisTemplate.delete(OssCacheConsts.key_DtSubjectEnable);
    }

}
