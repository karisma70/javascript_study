
<%@ page contentType="text/plain; charset=utf-8" %>
<%
request.setCharacterEncoding("utf-8");
String name = request.getParameter("name");
if( request.getMethod().equals("GET"))
    name = new String( name.getBytes("8859_1"), "UTF-8");
%>
Hi!! I like <%=name%>, Thanks for your kindness.


