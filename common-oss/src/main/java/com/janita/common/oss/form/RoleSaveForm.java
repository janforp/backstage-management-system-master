package com.janita.common.oss.form;

import java.util.List;

/**
 * Created by wuqiang on 16-2-2.
 *
 * @author wuqiang
 */
public class RoleSaveForm {
    private String name;
    private String desc;
    private List<Integer> functionIds;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public List<Integer> getFunctionIds() {
        return functionIds;
    }

    public void setFunctionIds(List<Integer> functionIds) {
        this.functionIds = functionIds;
    }
}
