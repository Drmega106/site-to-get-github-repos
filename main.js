let container = document.querySelector(".container");
let input = document.querySelector(".taskinput input");
let btn = document.querySelector(".btn");
let reposbox = document.querySelector(".repos");
let taskname = "";
let color = document.querySelectorAll(".color span");
let root = document.querySelector(":root");

if (localStorage.color) {
    root.style.setProperty("--main-color", localStorage.color)
};
if (localStorage.btncolor) {
    root.style.setProperty("--btn-color", localStorage.btncolor)
};
color.forEach((span) => {
    span.addEventListener("click", function(e) {
        addcolor(e.currentTarget.dataset.color)
        addbtncolor(e.currentTarget.dataset.btn)
            root.style.setProperty("--main-color", e.currentTarget.dataset.color);
            root.style.setProperty("--btn-color", e.currentTarget.dataset.btn);
    });
});
function addcolor (color) {
    localStorage.color = color;
};
function addbtncolor (btncolor) {
    localStorage.btncolor = btncolor;
};

if (input.value === "") {
    reposbox.innerHTML = "<span> ...your Repos will appear here <span>"
} 
btn.onclick = function () {
    if (input.value === "") {
        reposbox.innerHTML = "<span> Please type your Username. <span>"
    }else {
    let xhttp = new XMLHttpRequest;
    xhttp.open("Get", `https://api.github.com/users/${input.value}/repos`);
    xhttp.send();

    let data = "";
    let dataobj;
    xhttp.onload = function () {
        if (xhttp.status != 200) {
            reposbox.innerHTML = "<span> ....incorrect Username ! <span>"
        } else {
            reposbox.innerHTML = "";
            data = this.responseText;
            dataobj = JSON.parse(data);
            dataobj.forEach(function (repo) {
            let repodiv = document.createElement("div");
            let visitbtn = document.createElement("a");
            visitbtn.href = repo.html_url;
            visitbtn.target = "_blank"
            visitbtn.classList.add("visit");
            repodiv.classList.add("repo");
            visitbtn.innerText = "Visit";
            repodiv.innerText = repo.name;
            repodiv.appendChild(visitbtn);
            reposbox.appendChild(repodiv);
 });
};
};
};
};
