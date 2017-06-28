package com.janita.common.oss.dao;

import com.janita.common.oss.bean.role.OssRole;
import com.janita.common.oss.dto.OssRolePageDto;
import com.janita.common.oss.dto.PageDto;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by com.aigou.oss.MybatisCodeGenerate on 2016-06-17
 */
@Repository
public class OssRoleDAO extends BaseSqlSessionDaoSupport {
    public int deleteByPrimaryKey(Integer roleId) {
        OssRole _key = new OssRole();
        _key.setRoleId(roleId);
        return getSqlSession().delete("oss_role.deleteByPrimaryKey", _key);
    }

    public void insert(OssRole record) {
        getSqlSession().insert("oss_role.insert", record);
    }

    public void insertSelective(OssRole record) {
        getSqlSession().insert("oss_role.insertSelective", record);
    }

    public void insertBatch(List<OssRole> records) {
        if (records == null || records.isEmpty()) {
            return;
        }
        getSqlSession().insert("oss_role.insertBatch", records);
    }

    public OssRole selectByPrimaryKey(Integer roleId) {
        OssRole _key = new OssRole();
        _key.setRoleId(roleId);
        return getSqlSession().selectOne("oss_role.selectByPrimaryKey", _key);
    }

    public int updateByPrimaryKeySelective(OssRole record) {
        return getSqlSession().update("oss_role.updateByPrimaryKeySelective", record);
    }

    public int updateByPrimaryKey(OssRole record) {
        return getSqlSession().update("oss_role.updateByPrimaryKey", record);
    }

    // 返回的pageDto.list是List<OssRolePageDto>
    public PageDto selectByPage(int pageNo, int pageSize) {
        PageDto page = new PageDto();
        Long rowCount = getSqlSession().selectOne("oss_role.selectCount");
        if (rowCount == null) {
            rowCount = 0L;
        }
        page.init(pageNo, pageSize, rowCount);
        pageNo = page.getPageNo();// 有可能pageNo超过了允许的范围，所以使用PageDto计算过的结果
        List<OssRolePageDto> list;
        if (rowCount <= 0) {
            list = new ArrayList<>(0);
        } else {
            Map<String, Object> param = new HashMap<>(2);
            param.put("start", (pageNo - 1) * pageSize);
            param.put("pageSize", pageSize);
            list = getSqlSession().selectList("oss_role.selectByPage", param);
        }
        page.setList(list);
        return page;
    }

    public List<OssRole> selectAll() {
        return getSqlSession().selectList("oss_role.selectAll");
    }

}