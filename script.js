// 3.1 Handle New Product Input
const createProductForm = document.getElementById("create-product");
const dashboard = document.getElementById("dashboard");

const allProducts = []; // to simplify cart process later
let idCounter = 0;

createProductForm.addEventListener("submit", event => {
    event.preventDefault();

    const nameField = document.getElementById("product-name");
    const priceField = document.getElementById("product-price");
    const imageField = document.getElementById("image-url");

    const productName = nameField.value.trim();
    let productPrice = priceField.value.trim();
    const imageURL = imageField.value.trim();
    const errorMessage = document.getElementById("error-message-create");

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
        id: idCounter++,
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

// 3.2 & 3.3 Handle User Selection + Add to Cart
let cart = [];
const addToCartForm = document.getElementById("add-to-cart");
const addToCartBtn = document.getElementById("add-to-cart-btn");
const cartDisplay = document.getElementById("cart");

addToCartForm.addEventListener("submit", event => {
    event.preventDefault();
    cart = []; // Reset cart to match the selected items

    // Add checked items into cart array
    for (let i = 0; i < allProducts.length; i++) {
        if (document.getElementById(`product-${i}`).checked) {
            cart.push(allProducts[i]);
        }
    }

    renderCart(cart);
});

// 3.3
const calculateTotalBtn = document.getElementById("calculate-total-btn");
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
    dashboard.appendChild(createProductCard(product, false));
    // Dashboard has at least 1 product now, so we can display add-to-cart button
    addToCartBtn.style.display = "inline";
}

function renderCart(cartArray) {
    const errorMessage = document.getElementById("error-message-cart");
    if (cartArray.length === 0) {
        errorMessage.textContent = "Please select at least 1 product.";
        return
    }
    else errorMessage.textContent = "";

    cartDisplay.innerHTML = ""; 
    for (const item of cartArray) cartDisplay.appendChild(createProductCard(item, true));

    calculateTotalBtn.style.display = "block";
}

function removeFromCart(event) {
    const indexToDelete = parseInt(event.target.id.substring(5));
    cart = cart.filter(product => product.id !== indexToDelete);     

    // Avoid conflict with renderCart array length check
    if (cart.length === 0) {
        cartDisplay.innerHTML = ""; 
        calculateTotalBtn.style.display = "none";
        return;
    }

    renderCart(cart);
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
    infoContainer.append(cardName, cardPrice);
    infoContainer.appendChild(cardPrice);

    if (forCart) {
        const removBtn = document.createElement("button");
        removBtn.className = "remove-btn";
        removBtn.textContent = "Remove";
        removBtn.setAttribute("type", "button");
        removBtn.id = `cart-${product.id}`;
        removBtn.addEventListener("click", removeFromCart);
        infoContainer.appendChild(removBtn);
    }

    const cardImg = new Image(120, 120);
    cardImg.src = product.url;

    const productCard = document.createElement("div");
    productCard.className = "product-card";

    if (!forCart) {
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        checkbox.id = `product-${product.id}`;
        productCard.appendChild(checkbox);
    }

    productCard.appendChild(cardImg);
    productCard.appendChild(infoContainer);
    
    return productCard; 
}