
const selectList = document.querySelectorAll(".select");

Array.from(selectList).forEach(item => {

    item.onchange = async (e) => {

        const target = e.target.id;

        const data = {
            storeId: selectList[0].value,
            year: selectList[1].value,
            quarter: selectList[2].value,
            month: selectList[3].value
        };



        if (target == 'month') {
            data.quarter = -1;
        }
        if (target == 'quarter') {
            data.month = -1;
        }

        let endpoint = "http://localhost:8081/shopee/stats/get-stats/";
        endpoint += `?storeId=${data.storeId != -1 ? data.storeId : ''}`;
        if (data.year != -1)
            endpoint += `&year=${data.year}`;
        if (data.quarter != -1)
            endpoint += `&quarter=${data.quarter}`;
        if (data.month != -1)
            endpoint += `&month=${data.month}`;
        const response = await fetch(endpoint);
        const resData = await response.json();
        const html = resData.map(item => {
            return `
                <tr>
                    <th scope="row">${item[0].id}</th>
                    <td>${item[0].lastName} ${item[0].firstName}</td>
                    <td>${item[1]}</td>
                    <td>${item[2]}</td>
                </tr>
                `
        });
        document.querySelector(".table-body").innerHTML = html.join('')

    };

});