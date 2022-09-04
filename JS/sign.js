// Sign In Page
BTN.addEventListener('click', () => {
    if (In.value === "") {
        alert("Enter Your Name Please");
        anchor.href = "#";
    }
    else {
        localStorage.setItem('name', In.value);
        anchor.href = "snake.html";
    }
})
In.addEventListener('keydown', (e) => {
    if (e.keyCode == '13') {
        localStorage.setItem('hiscore', 0)
        anchor.click();
    }
})
BTN.addEventListener('click', () => {
    localStorage.setItem('hiscore', 0)
    anchor.click();
})
BTN_N.addEventListener('click',()=>{
    localStorage.clear();
    location.reload();
});
let N = localStorage.getItem('name');
let table_row = "";
let jsonarr = [];
let H = localStorage.getItem('hiscore');
if (localStorage.getItem('jsonitems') == null) {
    if (N != "null" && N != null) {
        jsonarr.push([N, H]);
    }
    N = localStorage.setItem('name', "null");
    localStorage.setItem('jsonitems', JSON.stringify(jsonarr));
}
else {
    json = localStorage.getItem('jsonitems');
    jsonarr = JSON.parse(json);
    if (N != "null" && N != null) {
        jsonarr.push([N, H]);
    }
    N = localStorage.setItem('name', "null");
    localStorage.setItem('jsonitems', JSON.stringify(jsonarr));
}
jsonarr.forEach((element, index) => {
    let str = `<tr class=\"row\">
                    <td class=\"tab\">${index + 1}</td>
                    <td class=\"tab\">${element[0]}</td>
                    <td class=\"tab\">${element[1]}</td>
                    </tr>`
    table_row += str;
    tbody.innerHTML = table_row;
});
if (jsonarr.length > 0){
    thd.style.visibility = "visible";
}
if (jsonarr.length > 7 ) {
    alert('List storage full \n Clear List to Add more data');
}