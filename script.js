
let APIKey = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDdkZDIyOTM5N2RmMTAwMTRkZGRkYjgiLCJpYXQiOjE2ODU5Njc0MDEsImV4cCI6MTY4NzE3NzAwMX0.mckwiRK7J6ynTTRXJTgbianV3xObhtEMgG5VqomP1rI";
// Ottiene il riferimento all'elemento HTML con id "products"
let produit = document.getElementById("products");

// Funzione asincrona per ottenere i prodotti dalla API
async function school() {

    try {
        // Effettua una richiesta GET per ottenere i prodotti dalla API
        let response = await fetch("https://striveschool-api.herokuapp.com/api/product/", { headers: { Authorization: APIKey } });
        let data = await response.json();
        console.log(data);
        // Itera su ogni elemento (prodotto) ottenuto
        data.forEach(element => {
            getProduct(element);
        });


    }
    catch (err) {
        console.log(err);
    }

}
// Chiama la funzione school() per ottenere i prodotti dalla API e visualizzarli
school();

// Funzione per creare un elemento card per il prodotto
function getProduct(element) {
    // Crea gli elementi HTML per la card del prodotto
    let card = document.createElement("div");
    card.classList.add("card", "m-2");
    card.style.maxWidth = "16rem";
    let img = document.createElement("img");

    img.src = element.imageUrl;
    let cardBody = document.createElement("div");
    cardBody.classList.add("p-2", "card-body");
    let cardName = document.createElement("h5");
    cardName.innerText = element.name;
    let cardDescription = document.createElement("p");
    cardDescription.classList.add("card-text");
    cardDescription.innerText = element.description;
    let priceBox = document.createElement("div");
    let cardPrice = document.createElement("span");
    cardPrice.classList.add("card-price");
    cardPrice.innerText = element.price;
    let price$ = document.createElement("span");
    price$.innerText = "$ ";
    let brand = document.createElement("p");
    brand.classList.add("card-brand");
    brand.innerText = element.brand;
    let cardButton = document.createElement("button");
    priceBox.append(price$, cardPrice);
    cardBody.append(cardName, cardDescription, priceBox, brand, cardButton);
    card.append(img, cardBody);
     // Aggiunge la card del prodotto all'elemento HTML con id "products"
    produit.appendChild(card);



}
