
function updateUserByAdmin(path, type) {
    if (confirm("Bạn chắc chắn muốn thực hiện hành động này?") === true) {
        fetch(`${path}/${type}`, {
            method: "PATCH"
        }).then(res => {
            if (res.status === 200)
                location.reload();
            else
                alert("Something wrong!!!");
        });
    }
}