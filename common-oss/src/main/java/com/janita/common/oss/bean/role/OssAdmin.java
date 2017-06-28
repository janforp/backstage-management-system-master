package com.janita.common.oss.bean.role;

/**
 * Created by com.aigou.oss.MybatisCodeGenerate on 2016-06-18
 */
public class OssAdmin implements java.io.Serializable {

    // Fields

    // 管理员ID，主键，自增长ID
    private Integer adminId;
    // 角色ID
    private Integer roleId;
    // 姓名
    private String realName;
    // 登录名；唯一／非空
    private String loginName;
    // 登录密码
    private String loginPwd;
    // 登录手机；唯一／可空
    private String cellphone;
    // 登录邮箱；唯一／可空
    private String email;
    // 头像文件名
    private String portrait;
    // 0：禁用；1：正常
    private Integer status;
    // 更新时间，UNIX_TIMESTAMP()*1000或System.currentTimeMillis()
    private Long updateTimeMs;
    // 创建时间，UNIX_TIMESTAMP()*1000或System.currentTimeMillis()
    private Long createTimeMs;

    // Constructors

    /**
     * default constructor
     */
    public OssAdmin() {
    }

    /**
     * full constructor
     */
    public OssAdmin(Integer roleId, String realName, String loginName, String loginPwd, String cellphone, String email, String portrait, Integer status, Long updateTimeMs, Long createTimeMs) {
        this.roleId = roleId;
        this.realName = realName;
        this.loginName = loginName;
        this.loginPwd = loginPwd;
        this.cellphone = cellphone;
        this.email = email;
        this.portrait = portrait;
        this.status = status;
        this.updateTimeMs = updateTimeMs;
        this.createTimeMs = createTimeMs;
    }

    // Property accessors

    /**
     * 管理员ID，主键，自增长ID
     */
    public Integer getAdminId() {
        return this.adminId;
    }

    /**
     * 管理员ID，主键，自增长ID
     */
    public void setAdminId(Integer adminId) {
        this.adminId = adminId;
    }

    /**
     * 角色ID
     */
    public Integer getRoleId() {
        return this.roleId;
    }

    /**
     * 角色ID
     */
    public void setRoleId(Integer roleId) {
        this.roleId = roleId;
    }

    /**
     * 姓名
     */
    public String getRealName() {
        return this.realName;
    }

    /**
     * 姓名
     */
    public void setRealName(String realName) {
        this.realName = realName;
    }

    /**
     * 登录名；唯一／非空
     */
    public String getLoginName() {
        return this.loginName;
    }

    /**
     * 登录名；唯一／非空
     */
    public void setLoginName(String loginName) {
        this.loginName = loginName;
    }

    /**
     * 登录密码
     */
    public String getLoginPwd() {
        return this.loginPwd;
    }

    /**
     * 登录密码
     */
    public void setLoginPwd(String loginPwd) {
        this.loginPwd = loginPwd;
    }

    /**
     * 登录手机；唯一／可空
     */
    public String getCellphone() {
        return this.cellphone;
    }

    /**
     * 登录手机；唯一／可空
     */
    public void setCellphone(String cellphone) {
        this.cellphone = cellphone;
    }

    /**
     * 登录邮箱；唯一／可空
     */
    public String getEmail() {
        return this.email;
    }

    /**
     * 登录邮箱；唯一／可空
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * 头像文件名
     */
    public String getPortrait() {
        return this.portrait;
    }

    /**
     * 头像文件名
     */
    public void setPortrait(String portrait) {
        this.portrait = portrait;
    }

    /**
     * 0：禁用；1：正常
     */
    public Integer getStatus() {
        return this.status;
    }

    /**
     * 0：禁用；1：正常
     */
    public void setStatus(Integer status) {
        this.status = status;
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