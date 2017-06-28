package com.janita.common.oss.constant;

/**
 * OSS项目的缓存key
 * Created by wuqiang on 15-8-11.
 *
 * @author wuqiang
 */
public interface OssCacheConsts extends CacheConsts {

    String key_LoginAdminInfo = "admin";
    // 所有需要授权访问的requestUri
    String key_AllRequireAuthorizationRequestUri = "AllRequireAuthorizationRequestUri";

    String key_OssMenuProject = "project_";

    String key_DtSubjectAll = "subject_all_";

    String key_DtSubjectEnable = "subject_enable_";

}
