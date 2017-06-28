<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <tiles:importAttribute name="enableEditor" scope="page" ignore="true"/>
    <tiles:importAttribute name="enableSidebar" scope="page" ignore="true"/>
    <tiles:importAttribute name="enableConsole" scope="page" ignore="true"/>
    <tiles:importAttribute name="bodyId" scope="page" ignore="true"/>
    <tiles:importAttribute name="title" scope="page" ignore="true"/>
    <tiles:insertTemplate template="../inc/meta.jsp" />
    <title><c:if test="${title==null}"><spring:message code='title.console.home'/></c:if><c:if test="${title!=null}">${title}</c:if></title>
    <tiles:insertTemplate template="../inc/bootstrap-css.jsp" />
    <c:if test="${enableEditor=='true'}">
        <tiles:insertTemplate template="../inc/htmleditor-css.jsp" />
    </c:if>
    <c:if test="${enableConsole=='true'}">
        <link rel="stylesheet" href="${BASE_PATH}/client/css/console${RESOURCE_MIN}.css${RESOURCE_VERSION}">
    </c:if>
    <tiles:getAsString name="styleArea" ignore="true"/>
</head>
<body<c:if test="${f:isNotEmpty(bodyId)}"> id="${bodyId}"</c:if>>
<tiles:insertTemplate template="../inc/navbar.jsp" />
<c:choose>
    <c:when test="${enableSidebar=='true'}">
        <%-- 登录后的页面 --%>
        <div id="body-container" class="container container-fluid">
            <div class="row body-box">
                <tiles:insertTemplate template="../inc/sidebar.jsp" />
                <div id="dashboard-main" class="main">
                    <tiles:getAsString name="mainArea" ignore="true"/>
                </div>
            </div>
        </div>
    </c:when>
    <c:otherwise>
        <tiles:getAsString name="mainArea" ignore="true"/>
    </c:otherwise>
</c:choose>
<%-- 模态窗口代码存放处 --%>
<%-- 存放模版代码的区域 --%>
<div class="template-code">
    <tiles:getAsString name="templateArea" ignore="true"/>
</div>
<tiles:getAsString name="modalArea" ignore="true"/>
<tiles:insertTemplate template="../inc/global-modal.jsp" />
<%--<tiles:insertTemplate template="../inc/footer.jsp" />--%>
<tiles:insertTemplate template="../inc/bootstrap-js.jsp" />
<c:if test="${enableEditor=='true'}">
    <tiles:insertTemplate template="../inc/htmleditor-js.jsp" />
</c:if>
<tiles:insertTemplate template="../inc/pageInit.jsp" />
<c:if test="${enableConsole=='true'}">
    <script src="${BASE_PATH}/client/js/console${RESOURCE_MIN}.js${RESOURCE_VERSION}"></script>
</c:if>
<tiles:getAsString name="scriptArea" ignore="true"/>
</body>
</html>