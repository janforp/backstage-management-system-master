package com.janita.common.oss.util.other;


import com.janita.common.oss.model.OssMenuFunction;
import com.wujie.common.utils.FieldGetter;

/**
 * Created by wuqiang on 15-10-19.
 *
 * @author wuqiang
 */
public class FieldGetters {
    private FieldGetters() {
    }

    // OssMenuFunction.getModuleId();
    public static final FieldGetter<Integer, OssMenuFunction> OssMenuFunction_moduleId_getter = new FieldGetter<Integer, OssMenuFunction>() {
        public Integer get(OssMenuFunction bean) {
            return bean.getModuleId();
        }
    };

    // OssMenuFunction.getFunctionId();
    public static final FieldGetter<Integer, OssMenuFunction> OssMenuFunction_functionId_getter = new FieldGetter<Integer, OssMenuFunction>() {
        public Integer get(OssMenuFunction bean) {
            return bean.getFunctionId();
        }
    };

    // OssMenuFunction.getRequestUri();
    public static final FieldGetter<String, OssMenuFunction> OssMenuFunction_requestUri_getter = new FieldGetter<String, OssMenuFunction>() {
        public String get(OssMenuFunction bean) {
            return bean.getRequestUri();
        }
    };

    // OssMenuFunction.getRelatedRequestUri();
    public static final FieldGetter<String, OssMenuFunction> OssMenuFunction_relatedRequestUri_getter = new FieldGetter<String, OssMenuFunction>() {
        public String get(OssMenuFunction bean) {
            return bean.getRelatedRequestUri();
        }
    };


}


