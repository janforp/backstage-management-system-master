package com.janita.common.oss.constant;

/**
 * Created by Summer on 16/6/13.
 */
public class ParamConsts {

    private ParamConsts() {
    }

    public static final String id = "id";
    public static final String ids = "ids";
    public static final String pageNo = "pn";
    public static final String login_callbackUrl = "callbackUrl";

    /**
     * 渠道包名
     */
    public static final String channelPackage = "channelPackage";

    /**
     * 登录账户
     */
    public static final String loginName = "loginName";

    /**
     * 密码
     */
    public static final String password = "password";

    /**
     * 页码
     */
    public static final String pageNum = "pageNum";

    public static final String pageSize = "pageSize";

    /**
     * 是否是开发者模式 0:普通,1:开发者模式
     */
    public static final String mode = "mode";

    /**
     * 开始时间
     */
    public static final String startTime = "startTime";

    /**
     * 结束时间
     */
    public static final String createTime = "createTime";

    /**
     * 创建时间
     */
    public static final String endTime = "endTime";


    /**
     * 参数名
     */
    public static final String paramKey = "paramKey";

    /**
     * 参数值
     */
    public static final String paramValue = "paramValue";

    /**
     * 状态
     */
    public static final String status = "status";

    /**
     * 排序
     */
    public static final String rank = "rank";

    /**
     * 商品Id
     */
    public static final String shopId = "shopId";

    /**
     * 用户Id
     */
    public static final String userId = "userId";

    /**
     * 用户昵称
     */
    public static final String userName = "userName";

    /**
     * 用户头像
     */
    public static final String userPhoto = "userPhoto";

    /**
     * 标题
     */
    public static final String title = "title";

    /**
     * 内容
     */
    public static final String content = "content";

    /**
     * 图片
     */
    public static final String releaseImg = "releaseImg";

    /**
     * 订单号
     */
    public static final String  orderCode = "orderCode";

    /**
     * 快递公司名称
     */
    public static final String expressName = "expressName";

    /**
     * 快递单号
     */
    public static final String expressCode = "expressCode";

    /**
     * 快递价格
     */
    public static final String expressPrice = "expressPrice";

    /**
     * 订单状态:未完成,待收货,已完成,已作废
     */
    public static final String statusDesc = "statusDesc" ;

    /**
     * 中奖码(在表中是:huode)
     */
    public static final String lotteryCode = "lotteryCode" ;

    /**
     * 获得码
     */
    public static final String allCodes = "allCodes";

    /**
     * 是否是虚拟商品
     */
    public static final String virtual = "virtual";

    /**
     * 充值手机号码
     */
    public static final String phone = "phone";

    /**
     * 话费充值金额
     */
    public static final String money = "money";

    /**
     * 日期(2016-6-26)
     */
    public static final String time = "time";


    /**
     * 支付方式的ID
     */
    public static final String payId = "id";

    /**
     * 支付方式的ID
     */
    public static final String payIds = "ids";

    /**
     * 同一商品id
     */
    public static final String sid = "sid";

    /**
     * 爬数据的网址
     */
    public static final String url = "url";

    /**
     * 平台(京东,淘宝等数据的来源平台)
     */
    public static final String site = "site";

    /**
     * 商品分类id
     */
    public static final String cateId = "cateId";



    //红包管理系统开始
    /**
     * 微信号
     */
    public static final String customerWx = "customerWx";

    /**
     * 客户ID
     */
    public static final String customerId = "customerId";
    /**
     * 客户名称
     */
    public static final String customerName = "customerName";

    /**
     * 要删除的微信号的用 & 链接的多个微信号
     */
    public static final String  wxs = "wxs";

    /**
     * 要删除的推广的用 & 链接的多个推广id
     */
    public static final String  idsStr = "idsStr";


    /**
     * 要生成的红包数量
     */
    public static final String num = "num";

    /**
     * 要生成的 大额 红包 : 8888|666|888
     */
    public static final String bigEnvelope = "bigEnvelope";

    /**
     * 各步骤的内容,个步骤用&分开
     */
    public static final String  stepsContent = "stepsContent";

    /**
     * 类型:0-普通商户,1-公众号
     */
    public static final String type = "type";

    /**
     *  用&链接的多个用户的id
     */
    public static final String customerIds = "customerIds";

    /**
     * 任务分类ID
     */
    public static final String sortId = "sortId";

    /**
     *  用&链接的多个分类的id
     */
    public static final String sortIds = "sortIds";

    /**
     * 任务ID
     */
    public static final String missionId = "missionId";

    /**
     * 用&链接的多个任务的id
     */
    public static final String missionIds = "missionIds";

    /**
     * 用&链接的多个任务的id
     */
    public static final String bannerIds = "bannerIds";
    /**
     * 任务名称
     */
    public static final String missionName = "missionName";

    /**
     * 是否热门
     */
    public static final String hot = "hot";
    /**
     * 2016-7-28 12:1:1
     */
    public static final String showStartTime = "showStartTime";

    /**
     * 2016-7-28 12:1:1
     */
    public static final String showEndTime = "showEndTime";

    /**
     * bannerId
     */
    public static final String bannerId = "bannerId";
    /**
     * 导航ID
     */
    public static final String navigationId = "navigationId";
    /**
     * 用&链接的多个导航的id
     */
    public static final String navigationIds = "navigationIds";

    /**
     * 用&链接的多个的id
     */
    public static final String discoverIds = "discoverIds";

    /**
     * discoverId
     */
    public static final String discoverId = "discoverId";

    /**
     * 用&链接的多个的id
     */
    public static final String adIds = "adIds";

    /**
     * adId
     */
    public static final String adId = "adId";

    /**
     * 用&链接的多个的id
     */
    public static final String fixIds = "fixIds";

    /**
     * fixId
     */
    public static final String fixId = "fixId";

    /**
     * 用&链接的多个的id
     */
    public static final String redIds = "redIds";

    /**
     * redId
     */
    public static final String redId = "redId";

    /**
     * 用&链接的多个的id
     */
    public static final String withdrawIds = "withdrawIds";

    /**
     * withdrawId
     */
    public static final String withdrawId = "withdrawId";

    /**
     * 提现详情id
     */
    public static final String detailId = "detailId";

    /**
     * 用&链接的多个的id
     */
    public static final String codeIds = "codeIds";

    /**
     * codeId
     */
    public static final String codeId = "codeId";


    public static final String max = "max";


    public static final String min = "min";

}
