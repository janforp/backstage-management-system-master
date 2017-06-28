<%@page pageEncoding="UTF-8"%>
<%@page trimDirectiveWhitespaces="true" %>
<%--BEGIN toast-tips--%>
<div id="global-toast" style="display: none;">
    <div class="weui_mask_transparent"></div>
    <div class="weui_toast">
        <i class="weui_icon_toast"></i>
        <p class="weui_toast_content">&nbsp;</p>
    </div>
</div>
<div id="global-toast-loading" class="weui_loading_toast" style="display: none;">
    <div class="weui_mask_transparent"></div>
    <div class="weui_toast">
        <div class="weui_loading">
            <div class="weui_loading_leaf weui_loading_leaf_0"></div>
            <div class="weui_loading_leaf weui_loading_leaf_1"></div>
            <div class="weui_loading_leaf weui_loading_leaf_2"></div>
            <div class="weui_loading_leaf weui_loading_leaf_3"></div>
            <div class="weui_loading_leaf weui_loading_leaf_4"></div>
            <div class="weui_loading_leaf weui_loading_leaf_5"></div>
            <div class="weui_loading_leaf weui_loading_leaf_6"></div>
            <div class="weui_loading_leaf weui_loading_leaf_7"></div>
            <div class="weui_loading_leaf weui_loading_leaf_8"></div>
            <div class="weui_loading_leaf weui_loading_leaf_9"></div>
            <div class="weui_loading_leaf weui_loading_leaf_10"></div>
            <div class="weui_loading_leaf weui_loading_leaf_11"></div>
        </div>
        <p class="weui_toast_content"><spring:message code="process.loading"/></p>
    </div>
</div>
<%--END toast-tips--%>
<%--<!--BEGIN confirm-->--%>
<div id="global-dialog-confirm" class="weui_dialog_confirm" style="display: none;">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">&nbsp;</strong></div>
        <div class="weui_dialog_bd">&nbsp;</div>
        <div class="weui_dialog_ft">
            <a href="javascript:;" class="weui_btn_dialog default btn_dialog_cancel"><spring:message code="btn.cancel"/></a>
            <a href="javascript:;" class="weui_btn_dialog primary btn_dialog_ok"><spring:message code="btn.ok"/></a>
        </div>
    </div>
</div>
<%--<!--END confirm-->--%>
<%--<!--BEGIN alert-->--%>
<div id="global-dialog-alert" class="weui_dialog_alert" style="display: none;">
    <div class="weui_mask"></div>
    <div class="weui_dialog">
        <div class="weui_dialog_hd"><strong class="weui_dialog_title">&nbsp;</strong></div>
        <div class="weui_dialog_bd">&nbsp;</div>
        <div class="weui_dialog_ft">
            <a href="javascript:;" class="weui_btn_dialog primary"><spring:message code="btn.ok"/></a>
        </div>
    </div>
</div>
<%--<!--END alert-->--%>