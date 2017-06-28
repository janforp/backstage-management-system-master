<%@page pageEncoding="UTF-8"%>
<div id="modal-iframe-box" aria-labelledby="modal-iframe-box-title" class="modal-iframe-box modal fade" tabindex="-1" role="dialog" aria-hidden="true">
	<%-- 发生JS异常后的对话框 --%>
	<div class="modal-dialog modal-sm">
	  <div class="modal-content">
		<div class="modal-header" style="display: none;">
		  <%-- 头部标题 --%>
		  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		  <h4 class="modal-title" id="modal-iframe-box-title"></h4>
		</div><%-- /.modal-header --%>
		<div class="modal-body">
			<div class="loading-box"><div class="u-mask-msg-inner"><div class="u-mask-msg-text tc fs12"><spring:message code="process.loading"/></div></div></div>
			<%-- 对话框的主体内容 --%>
			<iframe class="modal-iframe" style="display:none;" src="about:blank" frameborder="no"></iframe>
		</div><%-- /.modal-body --%>
	  </div><%-- /.modal-content --%>
	</div><%-- /.modal-dialog --%>
</div>
<div id="modal-confirm" aria-labelledby="modal-confirm-title" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog modal-sm">
	  <div class="modal-content">
		<div class="modal-body">
			<h4 class="modal-title" id="modal-confirm-title"><i style="color:#d9534f;" class="glyphicon glyphicon-question-sign"></i> <span class="confirm-msg"></span></h4>
		</div><%-- /.modal-body --%>
		<div class="modal-footer">
			<button type="button" class="btn btn-default btn-sm do-cancel" data-dismiss="modal"><spring:message code="btn.cancel"/></button>
			<button type="button" class="btn btn-danger btn-sm do-confirm auto-focus-btn" data-dismiss="modal"><spring:message code="btn.ok"/></button>
		</div><%-- /.modal-footer --%>
	  </div><%-- /.modal-content --%>
	</div><%-- /.modal-dialog --%>
</div>
<div id="modal-alert" aria-labelledby="modal-alert-title" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog modal-sm">
	  <div class="modal-content">
		<div class="modal-body">
			<h4 class="modal-title" id="modalAlertTitle">&nbsp;</h4>
		</div><%-- /.modal-body --%>
		<div class="modal-footer">
			<button type="button" class="btn btn-success auto-focus-btn" data-dismiss="modal"><spring:message code="btn.ok"/></button>
		</div><%-- /.modal-footer --%>
	  </div><%-- /.modal-content --%>
	</div><%-- /.modal-dialog --%>
</div>
<div id="modal-js-exception" aria-labelledby="modal-js-exception-title" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
	<div class="modal-dialog modal-sm">
	  <div class="modal-content">
		<div class="modal-header">
		  <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
		  <h4 class="modal-title" id="modal-js-exception-title"><spring:message code="common.error.js.exception"/></h4>
		</div><%-- /.modal-header --%>
		<div class="modal-body">
		</div><%-- /.modal-body --%>
		<div class="modal-footer">
			<button type="button" class="btn btn-default btn-sm auto-focus-btn" data-dismiss="modal"><spring:message code="btn.close"/></button>
		</div><%-- /.modal-footer --%>
	  </div><%-- /.modal-content --%>
	</div><%-- /.modal-dialog --%>
</div>
