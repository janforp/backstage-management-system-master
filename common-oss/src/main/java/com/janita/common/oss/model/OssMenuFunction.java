package com.janita.common.oss.model;

/**
 * Created by com.aigou.oss.MybatisCodeGenerate on 2016-06-18
 */
public class OssMenuFunction implements java.io.Serializable {

    // Fields

    // 功能ID(主键)
    private Integer functionId;
    // 所属的模块ID
    private Integer moduleId;
    // 访问路径（不含参数，唯一）
    private String requestUri;
    // 关联的访问路径（不含参数，可空），如添加账号页面add和添加账号保存save，就只需要在add记录中的related_request_uri设置为save
    private String relatedRequestUri;
    // 当访问此功能，时要让菜单定位到的功能ID；如：当前访问“添加角色：/role/add”页面，则希望菜单自动定位到“角色列表：/role/list”这个菜单上
    private Integer focusFunctionId;
    // 功能名称
    private String functionName;
    // 功能描述
    private String functionDesc;
    // 是否出现在菜单中。1：是；0：否
    private Integer showInMenu;
    // 排序，值越小，越靠前
    private Integer orderBy;

    // Constructors

    /**
     * default constructor
     */
    public OssMenuFunction() {
    }

    /**
     * full constructor
     */
    public OssMenuFunction(Integer functionId, Integer moduleId, String requestUri, String relatedRequestUri, Integer focusFunctionId, String functionName, String functionDesc, Integer showInMenu, Integer orderBy) {
        this.functionId = functionId;
        this.moduleId = moduleId;
        this.requestUri = requestUri;
        this.relatedRequestUri = relatedRequestUri;
        this.focusFunctionId = focusFunctionId;
        this.functionName = functionName;
        this.functionDesc = functionDesc;
        this.showInMenu = showInMenu;
        this.orderBy = orderBy;
    }

    // Property accessors

    /**
     * 功能ID(主键)
     */
    public Integer getFunctionId() {
        return this.functionId;
    }

    /**
     * 功能ID(主键)
     */
    public void setFunctionId(Integer functionId) {
        this.functionId = functionId;
    }

    /**
     * 所属的模块ID
     */
    public Integer getModuleId() {
        return this.moduleId;
    }

    /**
     * 所属的模块ID
     */
    public void setModuleId(Integer moduleId) {
        this.moduleId = moduleId;
    }

    /**
     * 访问路径（不含参数，唯一）
     */
    public String getRequestUri() {
        return this.requestUri;
    }

    /**
     * 访问路径（不含参数，唯一）
     */
    public void setRequestUri(String requestUri) {
        this.requestUri = requestUri;
    }

    /**
     * 关联的访问路径（不含参数，可空），如添加账号页面add和添加账号保存save，就只需要在add记录中的related_request_uri设置为save
     */
    public String getRelatedRequestUri() {
        return this.relatedRequestUri;
    }

    /**
     * 关联的访问路径（不含参数，可空），如添加账号页面add和添加账号保存save，就只需要在add记录中的related_request_uri设置为save
     */
    public void setRelatedRequestUri(String relatedRequestUri) {
        this.relatedRequestUri = relatedRequestUri;
    }

    /**
     * 当访问此功能，时要让菜单定位到的功能ID；如：当前访问“添加角色：/role/add”页面，则希望菜单自动定位到“角色列表：/role/list”这个菜单上
     */
    public Integer getFocusFunctionId() {
        return this.focusFunctionId;
    }

    /**
     * 当访问此功能，时要让菜单定位到的功能ID；如：当前访问“添加角色：/role/add”页面，则希望菜单自动定位到“角色列表：/role/list”这个菜单上
     */
    public void setFocusFunctionId(Integer focusFunctionId) {
        this.focusFunctionId = focusFunctionId;
    }

    /**
     * 功能名称
     */
    public String getFunctionName() {
        return this.functionName;
    }

    /**
     * 功能名称
     */
    public void setFunctionName(String functionName) {
        this.functionName = functionName;
    }

    /**
     * 功能描述
     */
    public String getFunctionDesc() {
        return this.functionDesc;
    }

    /**
     * 功能描述
     */
    public void setFunctionDesc(String functionDesc) {
        this.functionDesc = functionDesc;
    }

    /**
     * 是否出现在菜单中。1：是；0：否
     */
    public Integer getShowInMenu() {
        return this.showInMenu;
    }

    /**
     * 是否出现在菜单中。1：是；0：否
     */
    public void setShowInMenu(Integer showInMenu) {
        this.showInMenu = showInMenu;
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