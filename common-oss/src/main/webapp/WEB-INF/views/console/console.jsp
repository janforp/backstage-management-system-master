<%@page pageEncoding="UTF-8"%>
<tiles:insertTemplate template="/WEB-INF/views/base/layout/layout-default.jsp">
	<tiles:putAttribute name="enableConsole" value="true"/>
	<tiles:putAttribute name="enableSidebar" value="true"/>
	<tiles:putAttribute name="mainArea">
		<div class="panel panel-default main-hd">
			<div class="panel-heading">欢迎使用</div>
		</div>
		<div class="main-bd">
			<div class="jumbotron jumbotron-transparent">
				<div class="container">
					<h2>&nbsp;</h2>
					<h2>欢迎回来！${ADMIN.realName} ^_^</h2>
				</div>
			</div>
		</div>
	</tiles:putAttribute>
</tiles:insertTemplate>