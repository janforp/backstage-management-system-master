package com.janita.common.oss.dto;

/**
 * Created by wuqiang on 16-1-29.
 * <p/>
 * OssMenuFunction.hasSubmenu==0的OssMenuFunction记录
 *
 * @author wuqiang
 */
public class MenuFunctionDto implements java.io.Serializable {
    // 功能ID(主键)
    private Integer functionId;
    // 所属的模块ID
    private Integer moduleId;
    // 访问路径（不含参数）；has_submenu=1时，此项为空字符串
    private String requestUri;
    // 功能名称
    private String functionName;
    // 功能描述
    private String functionDesc;

    public Integer getFunctionId() {
        return functionId;
    }

    public void setFunctionId(Integer functionId) {
        this.functionId = functionId;
    }

    public Integer getModuleId() {
        return moduleId;
    }

    public void setModuleId(Integer moduleId) {
        this.moduleId = moduleId;
    }

    public String getRequestUri() {
        return requestUri;
    }

    public void setRequestUri(String requestUri) {
        this.requestUri = requestUri;
    }

    public String getFunctionName() {
        return functionName;
    }

    public void setFunctionName(String functionName) {
        this.functionName = functionName;
    }

    public String getFunctionDesc() {
        return functionDesc;
    }

    public void setFunctionDesc(String functionDesc) {
        this.functionDesc = functionDesc;
    }
}
