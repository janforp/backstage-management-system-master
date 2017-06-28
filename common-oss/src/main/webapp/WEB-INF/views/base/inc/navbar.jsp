<%@page pageEncoding="UTF-8"%>
<%@page trimDirectiveWhitespaces="true" %>
	<div id="header" class="navbar navbar-default navbar-wx navbar-static-top min-container" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="${BASE_PATH}/" style="padding:5px 5px;">
            <img src="${BASE_PATH}/client/img/logo.png">
            <span> <spring:message code='title.console.home_project'/></span>
            <span style="font-size: 20px;"> | </span><spring:message code='title.console.home'/>
          </a>
        </div>
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav navbar-right">
        	<c:if test="${ADMIN!=null}">
        	<%--<c:if test="${ADMIN.portrait!=null}">--%>
            <%--<li><a href="${BASE_PATH}/a/sys/admin-info" class="navbar-headimg"><img width="40" class="border-radius-3" src="${ADMIN.portrait}"></a></li>--%>
            <%--</c:if>--%>
            <li><a href="javascript:void(0)">${ADMIN.realName}</a></li>
            <li><a href="javascript:void(0)">|</a></li>
            <li><a href="javascript:void(0)" id="doLogout"><spring:message code="btn.logout"/></a></li>
        	</c:if>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </div>