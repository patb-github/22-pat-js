// 3.1 Handle New Product Input
const createProductForm = document.getElementById("create-product");
const dashboard = document.getElementById("dashboard");

const allProducts = []; // to simplify cart process later
let numProducts = 0;

createProductForm.addEventListener("submit", event => {
    event.preventDefault();

    const nameField = document.getElementById("product-name");
    const priceField = document.getElementById("product-price");
    const imageField = document.getElementById("image-url");

    const productName = nameField.value.trim();
    let productPrice = priceField.value.trim();
    const imageURL = imageField.value.trim();
    const errorMessage = document.getElementById("error-message");

    // Validation Process
    if (!isValidImgUrl(imageURL)) {
        errorMessage.textContent = "Error: Image URL extension must be either .jpg, .jpeg, .png, or .gif";
        return;
    }
    if (!isValidPrice(productPrice)) {
        errorMessage.textContent = "Error: Price must be a number with at most two decimal places";
        return;
    } 
    productPrice = parseFloat(productPrice);

    // Creating Product object to add to inventory to simplify cart process later
    const product = {
        id: numProducts++,
        name: productName,
        price: productPrice,
        url: imageURL
    }
    allProducts.push(product); 

    // Add product to dashboard
    addToDashboard(product);

    // Clear input fields after successful addition
    nameField.value = "";
    priceField.value = "";
    imageField.value = "";
});

// 3.2 Handle Add to Cart
const cart = [];
const addToCartForm = document.getElementById("add-to-cart");
const addToCartBtn = document.getElementById("add-to-cart-btn");

addToCartForm.addEventListener("submit", event => {
    event.preventDefault();


});

// ================== HELPER FUNCTIONS =====================

// Check that price is valid. Input is a string
function isValidPrice(price) {
    // Checks if price only contains digits with at most 2 decimal places
    // Source: https://stackoverflow.com/questions/34057595/allow-2-decimal-places-in-input-type-number
    return /^\d*(\.\d{0,2})?$/.test(price);
}

function isValidImgUrl(imageURL) {
    const input = new URL(imageURL);
    return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
}

function addToDashboard(product) {
    // dashboard.innerHTML += `
    //     <div class="product-card">
    //         <input type="checkbox" id="product-${product.id}">
    //         <img src="${product.url}" height="120" width="120">
    //         <div style="padding-left: 15px;">
    //             <h3>${product.name}</h3>
    //             <p>$${product.price.toFixed(2)}</p>
    //         </div>
    //     </div>
    // `;

    dashboard.appendChild(createProductCard(product, false));
    // Dashboard has at least 1 product now, so we can display add-to-cart button
    addToCartBtn.style.display = "inline";
}

function createProductCard(product, forCart) {
    /* TEMPLATE
        <div class="product-card">
            <input type="checkbox" id="product-${product.id}">
            <img src="${product.url}" height="120" width="120">
            <div style="padding-left: 15px;">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
            </div>
        </div>
    */
    const cardName = document.createElement("h3");
    cardName.textContent = product.name;

    const cardPrice = document.createElement("p");
    cardPrice.textContent = "$" + product.price.toFixed(2);

    const infoContainer = document.createElement("div");
    infoContainer.style.paddingLeft = "15px";
    infoContainer.appendChild(cardName);
    infoContainer.appendChild(cardPrice);

    if (forCart) ;

    const cardImg = new Image(120, 120);
    cardImg.src = product.url;

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.id = `product-${product.id}`;

    const productCard = document.createElement("div");
    productCard.className = "product-card";
    productCard.appendChild(checkbox);
    productCard.appendChild(cardImg);
    productCard.appendChild(infoContainer);
    
    return productCard; 
}