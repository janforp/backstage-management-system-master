package com.janita.common.oss.model;

/**
 * Created by com.aigou.oss.MybatisCodeGenerate on 2016-06-18
 */
public class OssMenuModule implements java.io.Serializable {

    // Fields

    // 模块ID
    private Integer moduleId;
    // 模块名称
    private String moduleName;
    // glyphicon icon，如：glyphicon-cog，则icon=cog
    private String icon;
    // 排序，值越小，越靠前
    private Integer orderBy;

    // Constructors

    /**
     * default constructor
     */
    public OssMenuModule() {
    }

    /**
     * full constructor
     */
    public OssMenuModule(Integer moduleId, String moduleName, String icon, Integer orderBy) {
        this.moduleId = moduleId;
        this.moduleName = moduleName;
        this.icon = icon;
        this.orderBy = orderBy;
    }

    // Property accessors

    /**
     * 模块ID
     */
    public Integer getModuleId() {
        return this.moduleId;
    }

    /**
     * 模块ID
     */
    public void setModuleId(Integer moduleId) {
        this.moduleId = moduleId;
    }

    /**
     * 模块名称
     */
    public String getModuleName() {
        return this.moduleName;
    }

    /**
     * 模块名称
     */
    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    /**
     * glyphicon icon，如：glyphicon-cog，则icon=cog
     */
    public String getIcon() {
        return this.icon;
    }

    /**
     * glyphicon icon，如：glyphicon-cog，则icon=cog
     */
    public void setIcon(String icon) {
        this.icon = icon;
    }

    /**
     * 排序，值越小，越靠前
     */
    public Integer getOrderBy() {
        return this.orderBy;
    }

    /**
     * 排序，值越小，越靠前
     */
    public void setOrderBy(Integer orderBy) {
        this.orderBy = orderBy;
    }

}