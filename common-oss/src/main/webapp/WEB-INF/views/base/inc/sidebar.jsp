<%@page pageEncoding="UTF-8"%>
<%@page trimDirectiveWhitespaces="true" %>
	<div id="dashboard-menu" class="sidebar">
		<ul class="list-group sidebar-body">
			<c:if test="${ADMIN!=null}">
				<c:forEach items="${ADMIN.menuModuleDtoList}" var="md" varStatus="sta">
					<li class="parent-menu-box ${md.moduleId==FOCUS_MODULE_ID?'opened':'closed'}${f:size(MENU)==(sta.index+1)?' last':''}">
						<div class="parent-menu-title list-group-item unselectable">
							<i class="right-icon glyphicon glyphicon-chevron-${md.moduleId==FOCUS_MODULE_ID?'up':'down'}"></i>
							<i class="glyphicon glyphicon-${md.icon} left-icon"></i>${md.moduleName}
						</div>
						<ul class="sub-menu-group list-group">
							<c:forEach items="${md.subMenuFunctionList}" var="sm">
								<li id="menu-${sm.functionId}" class="list-group-item${sm.functionId==FOCUS_FUNCTION_ID?' active':''}">
									<a href="${BASE_PATH}${sm.requestUri}" class="unselectable">${sm.functionName}</a>
								</li>
							</c:forEach>
						</ul>
					</li>
				</c:forEach>
			</c:if>
		</ul>
	</div>