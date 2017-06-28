<%@ page import="com.envolope.oss.consts.AttributeConsts" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script type="text/javascript">
$(document).ready(function(){
	<c:if test="${f:isNotEmpty(SUCCESS_MSG)}">
	util.tips.suc("${SUCCESS_MSG}");
	</c:if>
<%
try{
	String errorMsgList = (String) request.getAttribute(AttributeConsts.ERROR_MSG);
	if(errorMsgList!=null && errorMsgList.length()>0){
        out.println("\ttips.err("+ com.alibaba.fastjson.JSON.toJSONString(errorMsgList)+");");
	}
}catch(Exception e){
}
%>
});
</script>
