const resultsBox = document.getElementById("results-box");
let APIKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdkZDIyOTM5N2RmMTAwMTRkZGRkYjgiLCJpYXQiOjE2ODU5Njc0MDEsImV4cCI6MTY4NzE3NzAwMX0.mckwiRK7J6ynTTRXJTgbianV3xObhtEMgG5VqomP1rI";
let nameField = document.getElementById("name-field");
let descriptionField = document.getElementById("desc-field");
let priceField = document.getElementById("price-field");
let brandField = document.getElementById("brand-field");
let imageUrl = document.getElementById("url-field");
let createButton = document.getElementById("create-btn");
let deleteButton = document.getElementById("delete-btn");



createButton.addEventListener("click", postSchool);
deleteButton.addEventListener("click", deleteSchool);


async function postSchool() {
    let payload = {
        "name": nameField.value,
        "description": descriptionField.value,
        "brand": brandField.value,
        "imageUrl": imageUrl.value,
        "price": priceField.value
    };
 
    await fetch('https://striveschool-api.herokuapp.com/api/product/',

        {

            method: 'POST',
            headers: { 'Authorization': APIKey, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)

        });
        
    nameField.value = "";
    descriptionField.value = "";
    priceField.value = "";
    imageUrl.value = "";
    brandField.value = "";
    
    console.log("debug1");


}
async function deleteSchool(id) {
    let response = await fetch('https://striveschool-api.herokuapp.com/api/product/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': APIKey, 'Content-Type': 'application/json'
        }


    });
}


function postTemplate(input) {
     let myId = input._id;
    let myTr = document.createElement("tr");
     myTr.setAttribute("id", input._id);
    let myName = document.createElement("td");
    myName.innerText = input.name;
    let myDesc = document.createElement("td");
    myDesc.innerText = input.description;
    let myBrand = document.createElement("td");
    myBrand.innerText = input.brand;
    let myPrice = document.createElement("td");
    myPrice.innerText = input.price;
    let myImg = document.createElement("td");
    let myImgUrl = document.createElement("img");
    myImgUrl.classList.add("img-fluid", "imgSave");
    myImgUrl.src = input.imageUrl;
    myImg.append(myImgUrl);

    const myBtns = document.createElement("td");

    const editBtn = document.createElement("a");
     editBtn.href = "prodotto.html" + "?id=" + input._id;
     editBtn.target = "_blank";
    editBtn.classList.add("btn", "btn-sm", "mx-1", "btn-primary");
    const editImg = document.createElement("i");
    editImg.classList.add("fa-solid", "fa-pencil", "me-1");
    const editTxt = document.createElement("span");
    editTxt.innerText = "Edit";
    editBtn.append(editImg, editTxt);
    editBtn.addEventListener("click", function () {
        nameField.value = input.name;
        descriptionField.value = input.description;
        priceField.value = input.price;
        imageUrl.value = input.imageUrl;
        brandField.value = input.brand;


    });
    const delBtn = document.createElement("button");
    delBtn.classList.add("btn", "btn-sm", "mx-1", "btn-danger");
    const delImg = document.createElement("i");
    delImg.classList.add("fa-solid", "fa-trash", "me-1");
    const delTxt = document.createElement("span");
    delTxt.innerText = "Delete";
    delBtn.append(delImg, delTxt);
    delBtn.addEventListener("click", function () {
        deleteSchool(input._id);
        school();

    });

    myBtns.append(editBtn, delBtn);
    myTr.append(myName, myDesc, myBrand, myPrice, myImg, myBtns);
    resultsBox.append(myTr);


}
async function school() {
    let response = await fetch('https://striveschool-api.herokuapp.com/api/product/', {
        headers: {
            'Authorization': APIKey
        }
    });
    let data = await response.json();
    console.log(data);
    resultsBox.innerHTML = "";
    data.forEach(postTemplate);
}
school();

