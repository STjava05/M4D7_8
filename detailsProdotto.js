let APIKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdkZDIyOTM5N2RmMTAwMTRkZGRkYjgiLCJpYXQiOjE2ODU5Njc0MDEsImV4cCI6MTY4NzE3NzAwMX0.mckwiRK7J6ynTTRXJTgbianV3xObhtEMgG5VqomP1rI";
let nameField = document.getElementById("name-field");
let descriptionField = document.getElementById("desc-field");
let priceField = document.getElementById("price-field");
let brandField = document.getElementById("brand-field");
let imageUrl = document.getElementById("url-field");
let editBtn = document.getElementById("edit-btn");

let ulrParams = new URLSearchParams(window.location.search);
let id = ulrParams.get('id');

 ;

async function detailProduct(id) {
    let response = await fetch('https://striveschool-api.herokuapp.com/api/product/' + id ,{ headers: { Authorization: APIKey } });
    let data = await response.json();
    nameField.value = data.name;
    console.log(data)
    descriptionField.value = data.description;
    priceField.value = data.price;
    imageUrl.value = data.imageUrl;
    brandField.value = data.brand;

   editBtn.addEventListener("click",async function(){
   await editProduct(id);
    window.location.href = "index1.html";
   })
   
}
async function editProduct(id) {
    if (nameField.value && descriptionField.value && priceField.value && imageUrl.value && brandField.value) {
        let newPayload = {
            "name": nameField.value,
            "description": descriptionField.value,
            "brand": brandField.value,
            "imageUrl": imageUrl.value,
            "price": priceField.value
        };
        await fetch('https://striveschool-api.herokuapp.com/api/product/' + id, {
            method: 'PUT',
            headers: {
                'Authorization': APIKey, 'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPayload)
        });

    } else {
        alert("Please fill all the fields")
    }
}

detailProduct(id);