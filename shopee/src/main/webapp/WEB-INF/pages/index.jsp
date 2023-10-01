<%-- 
    Document   : index
    Created on : Jul 7, 2023, 1:08:19 PM
    Author     : admin
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<c:url value="/" var="action" />
<section class="container">
    <h1 class="text-center text-info mt-3">DANH SÁCH NGƯỜI DÙNG</h1>
    <div class="d-flex  align-items-center my-3">
        <a href="<c:url value="/users" />" class="btn btn-info">Thêm người dùng</a>
        <div class="d-flex ms-auto gap-2">
            <form class="d-flex flex-fill gap-2" action="${action}">
                <select name="role" class="form-select form-control" aria-label="Default select example">
                    <option value="" selected>Vai trò</option>
                    <option value="ROLE_ADMIN">ROLE_ADMIN</option>
                    <option value="ROLE_STORE">ROLE_STORE</option>
                    <option value="ROLE_USER">ROLE_USER</option>
                </select>
                <select name="status" class="form-select form-control" aria-label="Default select example">
                    <option value="" selected>Trạng thái</option>
                    <option value=true >Hoạt động</option>
                    <option value=false >Khoá</option>
                </select>
                <input style="min-width: 200px;" class="form-control me-2" type="text" name="kw" placeholder="Nhập tên người dùng ...">
                <button class="btn btn-primary" type="submit">Tìm</button>
            </form>
        </div>
    </div>

    <c:if test="${counter > 1}">
        <ul class="pagination mt-1">
            <li class="page-item"><a class="page-link" href="<c:url value="/" />">Tất cả</a></li>
                <c:forEach begin="1" end="${counter}" var="i">
                    <c:url value="/" var="pageUrl">
                        <c:param name="page" value="${i}"></c:param>
                    </c:url>
                <li class="page-item"><a class="page-link" href="${pageUrl}">${i}</a></li>
                </c:forEach>
        </ul>
    </c:if>

    <table class="table table-hover table-striped">
        <thead>
            <tr class="text-center">
                <th>Ảnh đại diện</th>
                <th>Tên người dùng</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Họ</th>
                <th>Tên</th>
                <th>Hành động</th>
            </tr>
        </thead>
        <tbody>
            <c:forEach items="${users}" var="u">
                <tr class="text-center">
                    <td>
                        <img src="${u.avatar}" alt="${u.lastName}" width="120" />
                    </td>
                    <td>${u.username}</td>
                    <td>${u.userRole}</td>

                    <c:choose>
                        <c:when test="${u.active == true}">
                            <td>Hoạt động</td>
                        </c:when>
                        <c:otherwise>
                            <td>Khoá</td>
                        </c:otherwise>
                    </c:choose>

                    <td>${u.firstName}</td>
                    <td>${u.lastName}</td>
                    <td>
                        <c:url value="/users/${u.username}" var="apiAction" />
                        <a href="<c:url value="/users/${u.username}" />" class="btn btn-success">Cập nhật</a>
                        <button class="btn btn-info" onclick="updateUserByAdmin('${apiAction}', 'reset')">Đặt lại mật khẩu</button>
                        <button class="btn btn-danger" onclick="updateUserByAdmin('${apiAction}', 'block')">${u.active == true ? "Khoá": "Mở"}</button>
                    </td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
</section>

<script src="<c:url value="/js/main.js" />"></script>