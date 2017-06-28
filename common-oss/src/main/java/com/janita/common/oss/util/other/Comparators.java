package com.janita.common.oss.util.other;


import com.janita.common.oss.model.OssMenuFunction;
import com.janita.common.oss.model.OssMenuModule;

import java.util.Comparator;

/**
 * Created by wuqiang on 16-1-29.
 *
 * @author wuqiang
 */
public class Comparators {

    private Comparators() {
    }

    /**
     * OssMenuModule按照orderBy ASC排序
     */
    public static final Comparator<? super OssMenuModule> OssMenuModule_orderBy_asc = new Comparator<OssMenuModule>() {
        @Override
        public int compare(OssMenuModule o1, OssMenuModule o2) {
            if (o1.getOrderBy() == null || o2.getOrderBy() == null) {
                return 0;
            }
            if (o1.getOrderBy() > o2.getOrderBy()) {
                return 1;
            } else if (o1.getOrderBy() < o2.getOrderBy()) {
                return -1;
            } else {
                return 0;
            }
        }
    };

    /**
     * OssMenuFunction按照orderBy ASC排序
     */
    public static final Comparator<? super OssMenuFunction> OssMenuFunction_orderBy_asc = new Comparator<OssMenuFunction>() {
        @Override
        public int compare(OssMenuFunction o1, OssMenuFunction o2) {
            if (o1.getOrderBy() == null || o2.getOrderBy() == null) {
                return 0;
            }
            if (o1.getOrderBy() > o2.getOrderBy()) {
                return 1;
            } else if (o1.getOrderBy() < o2.getOrderBy()) {
                return -1;
            } else {
                return 0;
            }
        }
    };

}
