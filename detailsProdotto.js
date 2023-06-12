let APIKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdkZDIyOTM5N2RmMTAwMTRkZGRkYjgiLCJpYXQiOjE2ODU5Njc0MDEsImV4cCI6MTY4NzE3NzAwMX0.mckwiRK7J6ynTTRXJTgbianV3xObhtEMgG5VqomP1rI";
let nameField = document.getElementById("name-field");
let descriptionField = document.getElementById("desc-field");
let priceField = document.getElementById("price-field");
let brandField = document.getElementById("brand-field");
let imageUrl = document.getElementById("url-field");
let editBtn = document.getElementById("edit-btn");
// Ottenere i parametri dalla query string nell'URL
let ulrParams = new URLSearchParams(window.location.search);
let id = ulrParams.get('id');

 ;
// Funzione asincrona per ottenere i dettagli di un prodotto
async function detailProduct(id) {
    // Effettua una richiesta GET per ottenere i dettagli del prodotto con l'ID specificato
    let response = await fetch('https://striveschool-api.herokuapp.com/api/product/' + id ,{ headers: { Authorization: APIKey } });
    let data = await response.json();

    // Imposta i valori dei campi del modulo con i dati ottenuti dalla API
    nameField.value = data.name;
    console.log(data)
    descriptionField.value = data.description;
    priceField.value = data.price;
    imageUrl.value = data.imageUrl;
    brandField.value = data.brand;
// Aggiunge un listener al pulsante di modifica
   editBtn.addEventListener("click",async function(){
   await editProduct(id);
    window.location.href = "index1.html";
   })
   
}
// Funzione asincrona per modificare un prodotto
async function editProduct(id) {
    if (nameField.value && descriptionField.value && priceField.value && imageUrl.value && brandField.value) {
         // Crea il payload con i nuovi valori dei campi del modulo
        let newPayload = {
            "name": nameField.value,
            "description": descriptionField.value,
            "brand": brandField.value,
            "imageUrl": imageUrl.value,
            "price": priceField.value
        };
        // Effettua una richiesta PUT per aggiornare il prodotto con il nuovo payload
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
// Chiama la funzione detailProduct() per ottenere i dettagli del prodotto con l'ID specificato
detailProduct(id);