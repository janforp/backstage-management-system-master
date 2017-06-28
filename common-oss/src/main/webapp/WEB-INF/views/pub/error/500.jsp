<%@ page import="com.envolope.oss.config.Config" %>
<%@ page import="com.envolope.oss.util.support.ThrowablePrintStream" %>
<%@page pageEncoding="UTF-8" isErrorPage="true" %>
<%
    if (exception != null && Config.isDebug()) {
        ThrowablePrintStream ps = new ThrowablePrintStream();
        exception.printStackTrace(ps);
        pageContext.setAttribute("PAGE_ERROR", ps.getBuffer().toString().replace("\n", "<br/>").replace("\t", "　　"));
    }
%>
<tiles:insertTemplate template="/WEB-INF/views/base/layout/layout-default.jsp">
    <tiles:putAttribute name="title" value="500"/>
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
                    <h2>500</h2>
                    <h5 class="tl">${PAGE_ERROR}</h5>
                </div>
            </div>
        </div>
    </tiles:putAttribute>
</tiles:insertTemplate>