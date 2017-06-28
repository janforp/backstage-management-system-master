<%@page pageEncoding="UTF-8"%>
<tiles:insertTemplate template="/WEB-INF/views/base/layout/layout-default.jsp">
	<tiles:putAttribute name="title" value="请登录"/>
	<tiles:putAttribute name="bodyId" value="admin_login_required"/>
	<tiles:putAttribute name="styleArea">
		<link rel="stylesheet" href="${BASE_PATH}/client/css/login${RESOURCE_MIN}.css${RESOURCE_VERSION}">
	</tiles:putAttribute>
	<tiles:putAttribute name="scriptArea">
		<script src="${BASE_PATH}/client/js/login${RESOURCE_MIN}.js${RESOURCE_VERSION}"></script>
	</tiles:putAttribute>
	<tiles:putAttribute name="mainArea">
		<div id="login-container" class="container container-fluid">
			<div id="login-panel" class="row body-box not-show">
				<form id="loginForm" extra-validate="pg.validateLoginForm" class="ajax-form v-form form-login" ajax-callback="pg.doLoginCbFn" role="form" action="${BASE_PATH}/c/page/pub/login.do" method="post">
					<div class="input-group" id="uid-input-group">
						<span class="input-group-addon input-1"><i class="glyphicon glyphicon-user"></i></span>
						<input type="text" name="uid" class="form-control input-1" value="" placeholder="${admin}" autofocus v-show-id="#uid-input-group">
					</div>
					<div class="input-group" id="pwd-input-group">
						<span class="input-group-addon input-2"><i class="glyphicon glyphicon-lock"></i></span>
						<input type="password" id="pwd" class="form-control input-2" value="" placeholder="<spring:message code='oss.loginForm.pid'/>">
					</div>
					<div class="relative" id="vcode-input-group">
						<div class="input-group">
							<span class="input-group-addon input-3"><i class="glyphicon glyphicon-envelope"></i></span>
							<input type="text" id="vcode" name="vcode" class="form-control input-3 verify-code-input" v-show-id="#vcode-input-group">
						</div>
						<img class="captcha" src="${BASE_PATH}/c/page/pub/login/captcha.png"/>
					</div>
					<div class="pt15">
						<input type="hidden" name="pid" id="pid" v-show-id="#pwd-input-group" v-event-id="#pwd">
						<input type="hidden" id="callbackUrl" value="${callbackUrl}" >
						<button class="btn btn-lg btn-success btn-block" type="submit"><spring:message code="oss.btn.login"/></button>
					</div>
				</form>
			</div>
		</div>
	</tiles:putAttribute>
</tiles:insertTemplate>
