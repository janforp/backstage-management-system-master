package com.janita.common.oss.util.el;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.wujie.common.utils.HtmlUtil;
import org.apache.commons.lang.StringUtils;

import java.lang.reflect.Array;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;

/**
 * El方法
 *
 * @author wu-qiang
 */
public class ElBase {

    public static String FMT_yyyy_MM_dd = "yyyy-MM-dd";
    public static String FMT_yyyy_MM_dd_HH_mm = "yyyy-MM-dd HH:mm";
    public static String FMT_yyyy_MM_dd_HH_mm_ss = "yyyy-MM-dd HH:mm:ss";
    public static String FMT_HH_mm_ss_SSS = "HH:mm:ss.SSS";

    /**
     * @param arrayOrListOrString 如果是数组的话，只支持对象数组
     * @param val
     * @return
     */
    public static boolean contains(Object arrayOrListOrString, Object val) {
        if (arrayOrListOrString == null) {
            // 对象为null，是空的
            return false;
        } else {
            if (arrayOrListOrString instanceof Collection) {
                return ((Collection<?>) arrayOrListOrString).contains(val);
            } else if (arrayOrListOrString instanceof String) {
                if (val == null) {
                    return false;
                }
                return ((String) arrayOrListOrString).contains(val.toString());
            } else if (arrayOrListOrString.getClass().isArray()) {
                Object[] objectArray = (Object[]) arrayOrListOrString;
                for (Object o : objectArray) {
                    if (o.equals(val)) {
                        return true;
                    }
                }
                return false;
            } else {
                // 其他对象
                return false;
            }
        }
    }

    /**
     * 此方法服务于EL表达式<br>
     * 判断字符串 isEmpty<br>
     * 判断Collection isEmpty<br>
     * 判断数组isEmpty
     *
     * @param obj
     * @return
     */
    public static boolean isEmpty(Object obj) {
        if (obj == null) {
            // 对象为null，是空的
            return true;
        } else {
            if (obj instanceof String) {
                return StringUtils.isBlank((String) obj);
            } else if (obj instanceof Collection) {
                return ((Collection<?>) obj).isEmpty();
            } else if (obj.getClass().isArray()) {
                return Array.getLength(obj) == 0;
            } else {
                // 其他对象，不为空，则不是空的
                return false;
            }
        }
    }

    /**
     * 此方法服务于EL表达式<br>
     * 判断字符串 isNotEmpty<br>
     * 判断Collection isNotEmpty<br>
     * 判断数组isNotEmpty
     *
     * @param obj
     * @return
     */
    public static boolean isNotEmpty(Object obj) {
        return !isEmpty(obj);
    }

    /**
     * 此方法服务于EL表达式<br>
     * 取得字符串 长度<br>
     * 取得Collection 大小<br>
     * 取得数组大小<br>
     * 其他对象返回-1
     *
     * @param obj
     * @return
     */
    public static int size(Object obj) {
        if (obj == null) {
            // 对象为null，是空的
            return 0;
        } else {
            if (obj instanceof String) {
                return ((String) obj).length();
            } else if (obj instanceof Collection) {
                return ((Collection<?>) obj).size();
            } else if (obj.getClass().isArray()) {
                return Array.getLength(obj);
            }
            // 其他对象，不为空，则不是空的
            return 0;
        }
    }

    /**
     * HTML转码
     *
     * @param src
     * @return
     */
    public static String htmlEscape(String src) {
        if (src == null) {
            return "";
        }
        return HtmlUtil.htmlEscape(src);
    }

    /**
     * 格式化毫秒时间戳，输出到秒
     *
     * @param timestampInMs
     * @return
     */
    public static String fmtTime(Long timestampInMs) {
        if (timestampInMs == null) {
            return "";
        }
        return new SimpleDateFormat(ElBase.FMT_yyyy_MM_dd_HH_mm_ss).format(new Date(timestampInMs));
    }


    /**
     * 格式化10位的毫秒时间戳，输出到秒
     *
     * @param timestampInMs
     * @return
     */
    public static String fmt10Time(Integer timestampInMs) {
        if (timestampInMs == null) {
            return "";
        }
        long time = Long.valueOf(timestampInMs);

        return new SimpleDateFormat(ElBase.FMT_yyyy_MM_dd_HH_mm_ss).format(new Date(time*1000));
    }

    /**
     * 格式化毫秒时间戳，输出到分钟
     *
     * @param timestampInMs
     * @return
     */
    public static String fmtMinute(Long timestampInMs) {
        if (timestampInMs == null) {
            return "";
        }
        return new SimpleDateFormat(ElBase.FMT_yyyy_MM_dd_HH_mm).format(new Date(timestampInMs));
    }

    /**
     * 格式化毫秒时间戳，输出到日
     *
     * @param timestampInMs
     * @return
     */
    public static String fmtDay(Long timestampInMs) {
        if (timestampInMs == null) {
            return "";
        }
        return new SimpleDateFormat(ElBase.FMT_yyyy_MM_dd).format(new Date(timestampInMs));
    }

    /**
     * 转化成JSON
     *
     * @param obj
     * @return
     */
    public static String json(Object obj) {
        return JSON.toJSONString(obj, SerializerFeature.DisableCircularReferenceDetect);
    }

    // 100
    private static final BigDecimal ONE_HUNDRED = new BigDecimal(100);

    /**
     * 把单位为分的价格转换成元，保留2位小数
     *
     * @param price
     * @return
     */
    public static String roundPrice(Integer price) {
        if (price == null || price == 0) {
            return "0.00";
        }
        return new BigDecimal(price).divide(ONE_HUNDRED, 2, RoundingMode.HALF_UP).toString();
    }

    /**
     * 获取10位时间戳
     *
     * @param time yyyy-MM-dd HH:mm:ss
     * @return
     * @throws ParseException
     */
    public static String get10Timestamp(String time) throws Exception {

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(FMT_yyyy_MM_dd_HH_mm_ss);
        Date date = simpleDateFormat.parse(time);
        long timeStamp = date.getTime() / 1000;

        return String.valueOf(timeStamp);

    }

    /**
     * 获取10位带小数时间戳
     *
     * @param time yyyy-MM-dd HH:mm:ss
     * @return
     * @throws ParseException
     */
    public static String get10PointTimestamp(String time) throws Exception {

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(FMT_yyyy_MM_dd_HH_mm_ss);
        Date date = simpleDateFormat.parse(time);
        long timeStamp = date.getTime();

        return String.format("%.3f", (double)(timeStamp/1000.0));

    }

    /**
     * 获取13位时间戳
     *
     * @param time yyyy-MM-dd HH:mm:ss
     * @return
     * @throws ParseException
     */
    public static String get13Timestamp(String time) throws Exception {

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat(FMT_yyyy_MM_dd_HH_mm_ss);
        Date date = simpleDateFormat.parse(time);
        long timeStamp = date.getTime();

        return String.valueOf(timeStamp);

    }

    /**
     * 格式化毫秒时间戳，输出时分秒
     *
     * @param timestampInMs
     * @return
     */
    public static String fmtHMSS(Long timestampInMs) {
        if (timestampInMs == null) {
            return "";
        }
        return new SimpleDateFormat(ElBase.FMT_HH_mm_ss_SSS).format(new Date(timestampInMs));
    }


}
