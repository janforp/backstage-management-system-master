package com.janita.common.oss.util;

import com.janita.common.oss.constant.AttributeConsts;
import com.janita.common.oss.constant.BaseConsts;
import com.janita.common.oss.constant.RequestConsts;
import com.janita.common.oss.constant.SizeConsts;
import com.janita.common.oss.dao.OssMenuModuleDAO;
import com.janita.common.oss.dto.MenuFunctionDto;
import com.janita.common.oss.dto.MenuModuleDto;
import com.janita.common.oss.model.OssMenuFunction;
import com.janita.common.oss.model.OssMenuModule;
import com.janita.common.oss.util.other.FieldGetters;
import com.janita.common.oss.vo.LoginAdminInfo;
import com.wujie.common.beanutil.BeanUtils;
import com.wujie.common.utils.WJCollections;
import com.wujie.common.validation.ValidationUtil;
import org.apache.commons.fileupload.disk.DiskFileItem;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.servlet.support.RequestContext;
import com.janita.common.oss.util.other.Comparators;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.awt.image.BufferedImage;
import java.io.File;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by wuqiang on 16-1-28.
 *
 * @author wuqiang
 */
public class CommonMethod {

    private CommonMethod() {
    }

    /**
     * do not change
     */
    private static final String ADMIN_SALT = "E7wWSOaz2E8o";

    /**
     * 密码加密(md5+salt)
     *
     * @param passwordSrc 密码原文
     */
    public static String encyptPasswordSrc(String passwordSrc) {
        return encyptPasswordMd5(MD5Encryption.byte2String(MD5Encryption.encryptMsg(passwordSrc)));
    }

    /**
     * 密码加密(md5+salt)
     *
     * @param passwordByMd5 密码md5密文
     */
    public static String encyptPasswordMd5(String passwordByMd5) {
        byte[] encryptBytes = MD5Encryption.encryptMsg(ADMIN_SALT + passwordByMd5.toUpperCase());
        return MD5Encryption.byte2String(encryptBytes).toLowerCase();
    }

    /**
     * 是否是有效的URL
     *
     * @param url
     * @return
     */
    public static boolean isValidUrl(String url) {
        return ValidationUtil.match("^([hH][tT][tT][pP]([sS]?):\\/\\/\\S+)$", url);
    }

    /**
     * 是否是有效的email
     *
     * @param email
     * @return
     */
    public static boolean isValidEmail(String email) {
        return ValidationUtil.match("^([a-zA-Z0-9\\.\\_\\-])+@([a-zA-Z0-9\\_\\-])+((\\.[a-zA-Z0-9\\_\\-]{1,6}){1,2})$", email);
    }

    public static final String default_china_cellphone = "^1[3578]\\d{9}$";
    // 验证国内手机号是否合法
    private static Pattern pattern_china_cellphone = Pattern.compile(default_china_cellphone);

    public static void _init_pattern_china_cellphone(String regexChinaCellphone) {
        if (regexChinaCellphone != null && regexChinaCellphone.length() > 0) {
            pattern_china_cellphone = Pattern.compile(regexChinaCellphone);
        }
    }

    /**
     * 是否是有效的手机号
     *
     * @param cellphone
     * @return
     */
    public static boolean isValidCellphone(String cellphone) {
        if (cellphone == null) {
            return false;
        }
        Matcher matcher = pattern_china_cellphone.matcher(cellphone);
        return matcher.matches();
    }

    /**
     * 验证手机号（isValidCellphone这个方法完成）以及，修正手机号数据，用户有可能输入 8613812345678/+8613812345678/(86)13812345678，需要剔除掉“+”，“(”，“)”，“86”
     */
    public static String validateAndFixedCellphone(String cellphoneString) {
        if (cellphoneString == null) {
            return null;
        }
        cellphoneString = cellphoneString.replace("+", "").replace("(", "").replace(")", "");
        if (cellphoneString.startsWith("86")) {
            cellphoneString = cellphoneString.substring(2).trim();
        }
        cellphoneString = cellphoneString.trim();
        if (!isValidCellphone(cellphoneString)) {
            // 手机号验证未通过
            return null;
        }
        return cellphoneString;
    }

    /**
     * 判断是否是ajax请求（如果是iframe异步提交，如果带有ajax标记参数，则也返回true）
     *
     * @param request
     * @return
     */
    public static boolean isAjaxRequest(HttpServletRequest request) {
        String xRequestedWith = request.getHeader("X-Requested-With");
        if (xRequestedWith != null && "XMLHttpRequest".equalsIgnoreCase(xRequestedWith)) {
            return true;
        } else {
            // 尝试查找是否有 iframe模拟ajax标志参数
            String ajaxParamValue = request.getParameter(RequestConsts.IFRAME_AJAX_MARK_PARAM_NAME);
            return "1".equals(ajaxParamValue);
        }
    }


    /**
     * 保存管理员登录后的会话对象到session
     *
     * @param session
     * @param loginAdminInfo
     */
    public static void setAdminLoginSession(HttpSession session, LoginAdminInfo loginAdminInfo) {
        session.setAttribute(AttributeConsts.SESSION_ADMIN, loginAdminInfo);
        session.setAttribute(AttributeConsts.SESSION_ADMIN_ID, loginAdminInfo != null ? loginAdminInfo.getAdminId() : null);
    }

    public static Integer getAdminIdSession(HttpSession session) {
        Object loginAdminIdObj = session.getAttribute(AttributeConsts.SESSION_ADMIN_ID);
        if (loginAdminIdObj == null) {
            return null;
        }
        if (loginAdminIdObj instanceof Integer) {
            return (Integer) loginAdminIdObj;
        } else {
            session.setAttribute(AttributeConsts.SESSION_ADMIN_ID, null);
            return null;
        }
    }

    /**
     * 获取管理员登录后的会话对象
     *
     * @param session
     * @return
     */
    public static LoginAdminInfo getAdminLoginSession(HttpSession session) {
        Object loginAdminInfoObj = session.getAttribute(AttributeConsts.SESSION_ADMIN);
        if (loginAdminInfoObj == null) {
            return null;
        }
        if (loginAdminInfoObj instanceof LoginAdminInfo) {
            return (LoginAdminInfo) loginAdminInfoObj;
        } else {
            // 错误的回话对象，则删除掉
            session.setAttribute(AttributeConsts.SESSION_ADMIN, null);
            return null;
        }
    }

    public static List<MenuModuleDto> buildMenuModuleDtoListByOssMenuFunctionList(List<OssMenuFunction> functionList, OssMenuModuleDAO ossMenuModuleDAO) {

        List<MenuModuleDto> menuModuleDtoList = new ArrayList<>();

        if (functionList != null && functionList.size() > 0) {

            // 把这个角色的所有功能按moduleId分组
            Map<Integer, List<OssMenuFunction>> moduleSubFunctionListMap = WJCollections.groupBy(functionList, FieldGetters.OssMenuFunction_moduleId_getter);

            // 这个角色拥有权限的模块
            List<OssMenuModule> menuModuleList = ossMenuModuleDAO.selectByModuleIds(new ArrayList<Integer>(moduleSubFunctionListMap.keySet()));

            for (OssMenuModule module : menuModuleList) {

                MenuModuleDto moduleDto = new MenuModuleDto();
                BeanUtils.copyProperties(module, moduleDto);

                // 为MenuModuleDto构造subMenuFunctionList
                List<OssMenuFunction> subFunctionList = moduleSubFunctionListMap.get(module.getModuleId());
                Collections.sort(subFunctionList, Comparators.OssMenuFunction_orderBy_asc);// 对功能排序
                List<MenuFunctionDto> subMenuFunctionList = new ArrayList<>(subFunctionList.size());
                for (OssMenuFunction function : subFunctionList) {
                    MenuFunctionDto functionDto = new MenuFunctionDto();
                    BeanUtils.copyProperties(function, functionDto);
                    subMenuFunctionList.add(functionDto);
                }
                moduleDto.setSubMenuFunctionList(subMenuFunctionList);

                menuModuleDtoList.add(moduleDto);
            }

        }

        return menuModuleDtoList;
    }

    /**
     * 获取requestUri，同时会去除contextPath（会把多条连续的/替换成一条/）
     *
     * @param requestUri
     * @param contextPath
     * @return
     */
    public static String getFixedRequestUri(String requestUri, String contextPath) {
        String requestUriLower = requestUri.toLowerCase();
        if (requestUriLower.startsWith("http://")) {
            requestUri = requestUri.substring(requestUriLower.indexOf("/", requestUriLower.indexOf("http://") + "http://".length()));
        } else if (requestUriLower.startsWith("https://")) {
            requestUri = requestUri.substring(requestUriLower.indexOf("/", requestUriLower.indexOf("https://") + "https://".length()));
        }
        while (requestUri.contains("//")) {
            requestUri = requestUri.replace("//", "/");
        }
        if (contextPath != null && contextPath.length() > 0) {
            requestUri = requestUri.substring(requestUri.indexOf(contextPath) + contextPath.length());
        }
        return requestUri;
    }

    /**
     * 验证图片是否符合规则　宽度大于1300 并且比例为16:9
     *
     * @param multipartFile
     * @param requestContext
     * @return
     */
    public static String verificationImage(MultipartFile multipartFile, RequestContext requestContext) {
        try {
            CommonsMultipartFile commonsMultipartFile = (CommonsMultipartFile) multipartFile;
            DiskFileItem diskFileItem = (DiskFileItem) commonsMultipartFile.getFileItem();
            String path = diskFileItem.getStoreLocation().getPath();
            BufferedImage image = ImageIO.read(new File(path));
            int w = image.getWidth();
            int h = image.getHeight();
            if (w < 1600) {
                return JsonUtil.buildError(requestContext.getMessage("oss.error.img.width.min"));
            }
            BigDecimal r = new BigDecimal(w).divide(new BigDecimal(h), 2, BigDecimal.ROUND_HALF_UP);
            if (r.floatValue() > SizeConsts.MAX_POSTER_RATIO || r.floatValue() < SizeConsts.MIN_POSTER_RATIO) {
                return JsonUtil.buildError(requestContext.getMessage("oss.error.img.ratio"));
            }
        } catch (Exception e) {
            return JsonUtil.buildError(requestContext.getMessage("oss.error.img.not.distinguish"));
        }
        return null;
    }

    /**
     * 把字符串转换成分为单位的
     *
     * @param price
     * @return
     */
    public static Integer str2money(String price) {
        return new BigDecimal(price).multiply(new BigDecimal(100)).intValue();
    }

    /**
     * 换取到秒的格式字符时间
     *
     * @return
     */
    public static String getTime() {
        return new SimpleDateFormat(BaseConsts.FMT_yyyy_MM_dd_HH_mm_ss).format(new Date());
    }

    /**
     * 返回最大值
     * @param a
     * @param b
     * @return
     */
    public static int getMaxValue(int a, int b) {
        if(a >= b){
            return a;
        }
        return b;
    }

    /**
     * 返回最小值
     * @param a
     * @param b
     * @return
     */
    public static int getMinValue(int a, int b) {
        if(a <= b){
            return a;
        }
        return b;
    }

}
