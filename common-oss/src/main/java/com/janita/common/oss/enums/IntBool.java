package com.janita.common.oss.enums;

/**
 * 各种int字段的是、否
 *
 * @author wuqiang
 * @usage IntBool.TRUE.val/IntBool.FALSE.val
 */
public enum IntBool {
    /**
     * fales:否
     */
    FALSE(0),
    /**
     * true:是
     */
    TRUE(1);

    // 值
    public final Integer val;

    private IntBool(Integer val) {
        this.val = val;
    }

}