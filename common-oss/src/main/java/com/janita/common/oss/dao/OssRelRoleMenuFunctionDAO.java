package com.janita.common.oss.dao;

import com.janita.common.oss.bean.role.OssRelRoleMenuFunction;
import com.janita.common.oss.model.OssMenuFunction;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by com.aigou.oss.MybatisCodeGenerate on 2016-06-17
 */
@Repository
public class OssRelRoleMenuFunctionDAO extends BaseSqlSessionDaoSupport {
    public int deleteByPrimaryKey(Integer roleId, Integer functionId) {
        OssRelRoleMenuFunction _key = new OssRelRoleMenuFunction();
        _key.setRoleId(roleId);
        _key.setFunctionId(functionId);
        return getSqlSession().delete("oss_rel_role_menu_function.deleteByPrimaryKey", _key);
    }

    public void insert(OssRelRoleMenuFunction record) {
        getSqlSession().insert("oss_rel_role_menu_function.insert", record);
    }

    public void insertSelective(OssRelRoleMenuFunction record) {
        getSqlSession().insert("oss_rel_role_menu_function.insertSelective", record);
    }

    public void insertBatch(List<OssRelRoleMenuFunction> records) {
        if (records == null || records.isEmpty()) {
            return;
        }
        getSqlSession().insert("oss_rel_role_menu_function.insertBatch", records);
    }

    public OssRelRoleMenuFunction selectByPrimaryKey(Integer roleId, Integer functionId) {
        OssRelRoleMenuFunction _key = new OssRelRoleMenuFunction();
        _key.setRoleId(roleId);
        _key.setFunctionId(functionId);
        return getSqlSession().selectOne("oss_rel_role_menu_function.selectByPrimaryKey", _key);
    }

    public int updateByPrimaryKeySelective(OssRelRoleMenuFunction record) {
        return getSqlSession().update("oss_rel_role_menu_function.updateByPrimaryKeySelective", record);
    }

    public int updateByPrimaryKey(OssRelRoleMenuFunction record) {
        return getSqlSession().update("oss_rel_role_menu_function.updateByPrimaryKey", record);
    }


    public List<OssMenuFunction> selectByRoleId(Integer roleId) {
        return getSqlSession().selectList("oss_rel_role_menu_function.selectByRoleId", roleId);
    }


    public List<Integer> selectFunctionIdByRoleId(Integer roleId) {
        return getSqlSession().selectList("oss_rel_role_menu_function.selectFunctionIdByRoleId", roleId);
    }

    public List<OssMenuFunction> selectByRoleIdAndShowInMenu(Integer roleId) {
        return getSqlSession().selectList("oss_rel_role_menu_function.selectByRoleIdAndShowInMenu", roleId);
    }

    public int deleteByRoleId(Integer roleId) {
        return getSqlSession().update("oss_rel_role_menu_function.deleteByRoleId", roleId);
    }

    public int deleteByRoleIds(List<Integer> roleIds) {
        if (roleIds == null || roleIds.isEmpty()) {
            return 0;
        }
        return getSqlSession().update("oss_rel_role_menu_function.deleteByRoleIds", roleIds);
    }

}