package com.janita.common.oss.dao;

import com.janita.common.oss.model.OssMenuFunction;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by com.aigou.oss.MybatisCodeGenerate on 2016-06-17
 */
@Repository
public class OssMenuFunctionDAO extends BaseSqlSessionDaoSupport {
    public int deleteByPrimaryKey(Integer functionId) {
        OssMenuFunction _key = new OssMenuFunction();
        _key.setFunctionId(functionId);
        return getSqlSession().delete("oss_menu_function.deleteByPrimaryKey", _key);
    }

    public void insert(OssMenuFunction record) {
        getSqlSession().insert("oss_menu_function.insert", record);
    }

    public void insertSelective(OssMenuFunction record) {
        getSqlSession().insert("oss_menu_function.insertSelective", record);
    }

    public void insertBatch(List<OssMenuFunction> records) {
        if (records == null || records.isEmpty()) {
            return;
        }
        getSqlSession().insert("oss_menu_function.insertBatch", records);
    }

    public OssMenuFunction selectByPrimaryKey(Integer functionId) {
        OssMenuFunction _key = new OssMenuFunction();
        _key.setFunctionId(functionId);
        return getSqlSession().selectOne("oss_menu_function.selectByPrimaryKey", _key);
    }

    public int updateByPrimaryKeySelective(OssMenuFunction record) {
        return getSqlSession().update("oss_menu_function.updateByPrimaryKeySelective", record);
    }

    public int updateByPrimaryKey(OssMenuFunction record) {
        return getSqlSession().update("oss_menu_function.updateByPrimaryKey", record);
    }

    public List<String> selectAllRequestUri() {
        return getSqlSession().selectList("oss_menu_function.selectAllRequestUri");
    }

}