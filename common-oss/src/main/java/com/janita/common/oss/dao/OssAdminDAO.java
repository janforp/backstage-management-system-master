package com.janita.common.oss.dao;

import com.janita.common.oss.bean.role.OssAdmin;
import com.janita.common.oss.dto.OssAccountPageDto;
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
public class OssAdminDAO extends BaseSqlSessionDaoSupport {
    public int deleteByPrimaryKey(Integer adminId) {
        OssAdmin _key = new OssAdmin();
        _key.setAdminId(adminId);
        return getSqlSession().delete("oss_admin.deleteByPrimaryKey", _key);
    }

    public void insert(OssAdmin record) {
        getSqlSession().insert("oss_admin.insert", record);
    }

    public void insertSelective(OssAdmin record) {
        getSqlSession().insert("oss_admin.insertSelective", record);
    }

    public void insertBatch(List<OssAdmin> records) {
        if (records == null || records.isEmpty()) {
            return;
        }
        getSqlSession().insert("oss_admin.insertBatch", records);
    }

    public OssAdmin selectByPrimaryKey(Integer adminId) {
        OssAdmin _key = new OssAdmin();
        _key.setAdminId(adminId);
        return getSqlSession().selectOne("oss_admin.selectByPrimaryKey", _key);
    }

    public int updateByPrimaryKeySelective(OssAdmin record) {
        return getSqlSession().update("oss_admin.updateByPrimaryKeySelective", record);
    }

    public int updateByPrimaryKey(OssAdmin record) {
        return getSqlSession().update("oss_admin.updateByPrimaryKey", record);
    }

    /**
     * 用于登录查询的
     *
     * @param loginName
     * @return
     */
    public OssAdmin selectByLoginName(String loginName) {
        return getSqlSession().selectOne("oss_admin.selectByLoginName", loginName);
    }

    /**
     * 用于登录查询的
     *
     * @param cellphone
     * @return
     */
    public OssAdmin selectByCellphone(String cellphone) {
        return getSqlSession().selectOne("oss_admin.selectByCellphone", cellphone);
    }

    /**
     * 用于登录查询的
     *
     * @param email
     * @return
     */
    public OssAdmin selectByEmail(String email) {
        return getSqlSession().selectOne("oss_admin.selectByEmail", email);
    }

    public int selectCountByRoleId(Integer roleId) {
        Integer count = getSqlSession().selectOne("oss_admin.selectCountByRoleId", roleId);
        return count == null ? 0 : count;
    }

    public OssAdmin selectByAdminId(Integer adminId) {
        return getSqlSession().selectOne("oss_admin.selectByAdminId", adminId);
    }

    // 返回的pageDto.list是List<OssRolePageDto>
    public PageDto selectByPage(int pageNo, int pageSize) {
        PageDto page = new PageDto();
        Long rowCount = getSqlSession().selectOne("oss_admin.selectCount");
        if (rowCount == null) {
            rowCount = 0L;
        }
        page.init(pageNo, pageSize, rowCount);
        pageNo = page.getPageNo();// 有可能pageNo超过了允许的范围，所以使用PageDto计算过的结果
        List<OssAccountPageDto> list;
        if (rowCount <= 0) {
            list = new ArrayList<>(0);
        } else {
            Map<String, Object> param = new HashMap<>(2);
            param.put("start", (pageNo - 1) * pageSize);
            param.put("pageSize", pageSize);
            list = getSqlSession().selectList("oss_admin.selectByPage", param);
        }
        page.setList(list);
        return page;
    }

}