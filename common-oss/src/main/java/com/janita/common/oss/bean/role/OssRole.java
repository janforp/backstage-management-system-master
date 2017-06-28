package com.janita.common.oss.bean.role;

/**
 * Created by com.aigou.oss.MybatisCodeGenerate on 2016-06-18
 */
public class OssRole implements java.io.Serializable {

    // Fields

    // 角色ID，主键，自增长ID
    private Integer roleId;
    // 角色名
    private String roleName;
    // 角色描述
    private String roleDesc;
    // 更新时间，UNIX_TIMESTAMP()*1000或System.currentTimeMillis()
    private Long updateTimeMs;
    // 创建时间，UNIX_TIMESTAMP()*1000或System.currentTimeMillis()
    private Long createTimeMs;

    // Constructors

    /**
     * default constructor
     */
    public OssRole() {
    }

    /**
     * full constructor
     */
    public OssRole(String roleName, String roleDesc, Long updateTimeMs, Long createTimeMs) {
        this.roleName = roleName;
        this.roleDesc = roleDesc;
        this.updateTimeMs = updateTimeMs;
        this.createTimeMs = createTimeMs;
    }

    // Property accessors

    /**
     * 角色ID，主键，自增长ID
     */
    public Integer getRoleId() {
        return this.roleId;
    }

    /**
     * 角色ID，主键，自增长ID
     */
    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    /**
     * 角色名
     */
    public String getRoleName() {
        return this.roleName;
    }

    /**
     * 角色名
     */
    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }

    /**
     * 角色描述
     */
    public String getRoleDesc() {
        return this.roleDesc;
    }

    /**
     * 角色描述
     */
    public void setRoleDesc(String roleDesc) {
        this.roleDesc = roleDesc;
    }

    /**
     * 更新时间，UNIX_TIMESTAMP()*1000或System.currentTimeMillis()
     */
    public Long getUpdateTimeMs() {
        return this.updateTimeMs;
    }

    /**
     * 更新时间，UNIX_TIMESTAMP()*1000或System.currentTimeMillis()
     */
    public void setUpdateTimeMs(Long updateTimeMs) {
        this.updateTimeMs = updateTimeMs;
    }

    /**
     * 创建时间，UNIX_TIMESTAMP()*1000或System.currentTimeMillis()
     */
    public Long getCreateTimeMs() {
        return this.createTimeMs;
    }

    /**
     * 创建时间，UNIX_TIMESTAMP()*1000或System.currentTimeMillis()
     */
    public void setCreateTimeMs(Long createTimeMs) {
        this.createTimeMs = createTimeMs;
    }

}