package com.janita.common.oss.dto;

import com.wujie.common.taglib.IPage;

import java.util.List;

/**
 * Created by wuqiang on 16-1-30.
 *
 * @author wuqiang
 */
public class PageDto<T> implements IPage {
    private List<T> list;
    // 总共的记录数
    private long rowCount;
    // 分页大小
    private int pageSize;
    // 总页数
    private Integer pageCount;
    // 当前处在第几页，从1开始
    private int pageNo;
    // 如果没有数据，则最多显示多少行空白，默认5行
    private int maxBlankRowCount = 5;
    // 显示多少行空白行（maxBlankRowCount-list.size()）
    private Integer blankRowCount;

    public PageDto() {
    }

    public PageDto(List<T> list, int pageNo, int pageSize, long rowCount) {
        this.list = list;
        this.init(pageNo, pageSize, rowCount);
    }

    public void init(int pageNo, int pageSize, long rowCount) {
        if (pageNo < 1) {
            pageNo = 1;
        }
        if (pageSize < 0) {
            pageSize = 0;
        }
        if (rowCount < 0) {
            rowCount = 0;
        }
        Integer pageCount;
        if (pageSize != 0) {
            pageCount = (int) ((rowCount + pageSize - 1L) / pageSize);
        } else {
            pageCount = 0;
        }
        if (pageNo > pageCount) {
            // 当前页大于了总页数，则把当前页设置为最后一页
            pageNo = pageCount;
        }
        this.pageNo = pageNo;
        this.pageSize = pageSize;
        this.rowCount = rowCount;
        this.pageCount = pageCount;
    }

    public long getRowCount() {
        return rowCount;
    }

    public int getPageSize() {
        return pageSize;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    @Override
    public int getPageCount() {
        return pageCount == null ? 1 : pageCount.intValue();
    }

    @Override
    public int getPageNo() {
        return pageNo;
    }

    public int getMaxBlankRowCount() {
        return maxBlankRowCount;
    }

    public void setMaxBlankRowCount(int maxBlankRowCount) {
        if (maxBlankRowCount < 0) {
            throw new IllegalArgumentException("maxBlankRowCount should not less than 0.");
        }
        this.maxBlankRowCount = maxBlankRowCount;
    }

    /**
     * 显示多少行空白行（maxBlankRowCount-list.size()）
     *
     * @return
     */
    public int getBlankRowCount() {
        if (this.blankRowCount == null) {
            int blankRowCount = this.maxBlankRowCount;
            if (this.list != null && this.list.size() > 0) {
                if (this.pageSize < this.maxBlankRowCount) {
                    // 分页数比maxBlankRowCount小
                    blankRowCount = this.pageSize - this.list.size();
                } else {
                    blankRowCount = this.maxBlankRowCount - this.list.size();
                }
                if (blankRowCount < 0) {
                    blankRowCount = 0;
                }
            }
            this.blankRowCount = blankRowCount;
        }
        return this.blankRowCount;
    }
}
