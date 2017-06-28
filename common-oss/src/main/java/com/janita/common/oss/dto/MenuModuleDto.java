package com.janita.common.oss.dto;

import java.util.List;

/**
 * Created by wuqiang on 16-1-29.
 * <p/>
 * OssMenuFunction.hasSubmenu==1的OssMenuFunction记录
 *
 * @author wuqiang
 */
public class MenuModuleDto implements java.io.Serializable {
    // 模块ID
    private Integer moduleId;
    // 模块名称
    private String moduleName;
    // glyphicon icon，如：glyphicon-cog，则icon=cog
    private String icon;
    private List<MenuFunctionDto> subMenuFunctionList;

    public Integer getModuleId() {
        return moduleId;
    }

    public void setModuleId(Integer moduleId) {
        this.moduleId = moduleId;
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public List<MenuFunctionDto> getSubMenuFunctionList() {
        return subMenuFunctionList;
    }

    public void setSubMenuFunctionList(List<MenuFunctionDto> subMenuFunctionList) {
        this.subMenuFunctionList = subMenuFunctionList;
    }
}
