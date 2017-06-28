package com.janita.common.oss.dao;

import com.janita.common.oss.model.OssMenuModule;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by com.aigou.oss.MybatisCodeGenerate on 2016-06-17
 */
@Repository
public class OssMenuModuleDAO extends BaseSqlSessionDaoSupport {
    public int deleteByPrimaryKey(Integer moduleId) {
        OssMenuModule _key = new OssMenuModule();
        _key.setModuleId(moduleId);
        return getSqlSession().delete("oss_menu_module.deleteByPrimaryKey", _key);
    }

    public void insert(OssMenuModule record) {
        getSqlSession().insert("oss_menu_module.insert", record);
    }

    public void insertSelective(OssMenuModule record) {
        getSqlSession().insert("oss_menu_module.insertSelective", record);
    }

    public void insertBatch(List<OssMenuModule> records) {
        if (records == null || records.isEmpty()) {
            return;
        }
        getSqlSession().insert("oss_menu_module.insertBatch", records);
    }

    public OssMenuModule selectByPrimaryKey(Integer moduleId) {
        OssMenuModule _key = new OssMenuModule();
        _key.setModuleId(moduleId);
        return getSqlSession().selectOne("oss_menu_module.selectByPrimaryKey", _key);
    }

    public int updateByPrimaryKeySelective(OssMenuModule record) {
        return getSqlSession().update("oss_menu_module.updateByPrimaryKeySelective", record);
    }

    public int updateByPrimaryKey(OssMenuModule record) {
        return getSqlSession().update("oss_menu_module.updateByPrimaryKey", record);
    }

    public List<OssMenuModule> selectByModuleIds(List<Integer> moduleIdList) {
        if (moduleIdList == null || moduleIdList.isEmpty()) {
            return new ArrayList<>(0);
        }
        return getSqlSession().selectList("oss_menu_module.selectByModuleIds", moduleIdList);
    }
}