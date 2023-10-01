<%-- 
    Document   : products
    Created on : Jul 21, 2023, 1:18:29 PM
    Author     : admin
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<h1 class="text-center text-info mt-3">QUẢN LÝ NGƯỜI DÙNG</h1>

<c:url value="/users" var="action" />
<form:form method="post" action="${action}" modelAttribute="user" enctype="multipart/form-data">
    
    <form:hidden path="id" />
    <form:hidden path="avatar" />
    <form:hidden path="password" />
    <form:hidden path="active" />
    <div class="form-floating mb-3 mt-3">
        <form:input type="text" class="form-control" 
                    path="username" id="username" placeholder="Tên người dùng ..." />
        <label for="name">Tên người dùng</label>
        <form:errors path="username" element="div" cssClass="text-danger" />
    </div>
    <div class="form-floating mb-3 mt-3">
        <form:select class="form-select" id="userRole" name="userRole" path="userRole">
            <option value="ROLE_USER" ${user.userRole == 'ROLE_USER' ? 'selected' : ''}>ROLE_USER</option>
            <option value="ROLE_STORE" ${user.userRole == 'ROLE_STORE' ? 'selected' : ''}>ROLE_STORE</option>
            <option value="ROLE_ADMIN" ${user.userRole == 'ROLE_ADMIN' ? 'selected' : ''}>ROLE_ADMIN</option>
        </form:select>
        <label for="userRole" class="form-label">Vai trò:</label>
    </div>
    <div class="form-floating mb-3 mt-3">
        <form:input type="text" class="form-control" 
                    path="firstName" id="firstName" placeholder="Họ ..." />
        <label for="firstName">Họ</label>
        <form:errors path="firstName" element="div" cssClass="text-danger" />
    </div>
    <div class="form-floating mb-3 mt-3">
        <form:input type="text" class="form-control" 
                    path="lastName" id="lastName" placeholder="Tên ..." />
        <label for="lastName">Tên</label>
        <form:errors path="lastName" element="div" cssClass="text-danger" />
    </div>
        <div class="form-floating mb-3 mt-3">
        <form:input type="text" class="form-control" 
                    path="phone" id="phone" placeholder="Điện thoại ..." />
        <label for="phone">Điện thoại</label>
    </div>
    <div class="form-floating mb-3 mt-3">
        <form:input type="text" class="form-control" 
                    path="email" id="email" placeholder="Email ..." />
        <label for="email">Email</label>
        <form:errors path="email" element="div" cssClass="text-danger" />
    </div>

    <div class="form-floating mb-3 mt-3">
        <form:input type="file" class="form-control" 
                    path="file" id="file"  />
        <label for="file">Ảnh đại diện</label>
        <c:if test="${user.avatar != null}">
            <img src="${user.avatar}" width="120" />
        </c:if>
    </div>

    <div class="form-floating mb-3 mt-3">
        <button class="btn btn-info" type="submit">
            <c:choose>
                <c:when test="${user.id == null}">Thêm người dùng</c:when>
                <c:otherwise>Cập nhật người dùng</c:otherwise>
            </c:choose>
        </button>
    </div>

</form:form>
