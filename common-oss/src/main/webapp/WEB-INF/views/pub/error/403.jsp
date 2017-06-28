<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@page pageEncoding="UTF-8"%>
<tiles:insertTemplate template="/WEB-INF/views/base/layout/layout-default.jsp">
	<tiles:putAttribute name="title" value="403"/>
	<tiles:putAttribute name="enableConsole" value="true"/>
	<tiles:putAttribute name="styleArea">
	</tiles:putAttribute>
	<tiles:putAttribute name="scriptArea">
	</tiles:putAttribute>
	<tiles:putAttribute name="mainArea">
		<div class="main-bd">
			<div class="jumbotron" style="text-align: center;background-color: transparent;">
				<div class="container">
					<h2>&nbsp;</h2>
					<h2>403</h2>
				</div>
			</div>
		</div>
	</tiles:putAttribute>
</tiles:insertTemplate>
