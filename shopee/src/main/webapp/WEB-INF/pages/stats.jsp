<%-- 
    Document   : products
    Created on : Jul 21, 2023, 1:18:29 PM
    Author     : admin
--%>

<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<h1 class="text-center text-info mt-3">THỐNG KÊ CỬA HÀNG</h1>

<form class="d-flex gap-4" >
    <select class="form-select select " id="store" name="category">
        <option value="-1">Chọn cửa hàng</option>
        <c:forEach items="${stores}" var="s">
            <option value="${s[0]}">${s[2]} ${s[1]}</option>
        </c:forEach>
    </select>
    <select id="year" class="form-select select">
        <option value="-1">Chọn năm</option>
        <option value="2023">2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
    </select>
    <select id="quarter" class="form-select select">
        <option value="-1">Chọn quý</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
    </select>
    <select id="month" class="form-select select">
        <option value="-1">Chọn tháng</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
    </select>
</form>

<table class="table mt-4">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Cửa hàng</th>
            <th scope="col">Tổng số sản phẩm</th>
            <th scope="col">Số sản phẩm đã bán</th>
        </tr>
    </thead>
    <tbody class="table-body">
        
    </tbody>
</table>

<script src="<c:url value="/js/stats.js" />"></script>

