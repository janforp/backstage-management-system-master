package com.janita.common.oss.bean.role;

/**
 * Created by com.aigou.oss.MybatisCodeGenerate on 2016-06-18
 */
public class OssRelRoleMenuFunction implements java.io.Serializable {

    // Fields

    // 角色ID
    private Integer roleId;
    // 功能ID
    private Integer functionId;

    // Constructors

    /**
     * default constructor
     */
    public OssRelRoleMenuFunction() {
    }

    /**
     * full constructor
     */
    public OssRelRoleMenuFunction(Integer roleId, Integer functionId) {
        this.roleId = roleId;
        this.functionId = functionId;
    }

    // Property accessors

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
     * 功能ID
     */
    public Integer getFunctionId() {
        return this.functionId;
    }

    /**
     * 功能ID
     */
    public void setFunctionId(Integer functionId) {
        this.functionId = functionId;
    }

}