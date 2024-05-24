// 3.1 Handle New Product Input
const createProductForm = document.getElementById("create-product");
const dashboard = document.getElementById("dashboard");

const allProducts = []; // to simplify cart process later
const cart = [];
let numProducts = 0;

createProductForm.addEventListener("submit", event => {
    event.preventDefault();

    const productName = document.getElementById("product-name").value.trim();
    let productPrice = document.getElementById("product-price").value.trim();
    const imageURL = document.getElementById("image-url").value.trim();
    const errorMessage = document.getElementById("error-message");

    // Validation Process
    if (!isValidImgUrl(imageURL)) {
        errorMessage.textContent = "Error: Image URL extension must be either .jpg, .jpeg, .png, or .gif";
        return;
    }
    if (!isValidPrice(productPrice)) {
        errorMessage.textContent = "Error: Price must be a number with at most two decimal places";
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
});

// ================== HELPER FUNCTIONS =====================

// Check that price is valid. Input is a string
function isValidPrice(price) {
    // Checks if price only contains digits with at most 2 decimal places
    return /^\d*(\.\d{0,2})?$/.test(price);
}

function isValidImgUrl(imageURL) {
    const input = new URL(imageURL);
    return /\.(jpg|jpeg|png|gif)$/.test(input.pathname);
}

function addToDashboard(product) {
    dashboard.innerHTML += `
        <div class="product-card">
            <input type="checkbox" id="product-${product.id}">
            <img src="${product.url}" height="120" width="120">
            <div style="padding-left: 15px;">
                <h3>${product.name}</h3>
                <p>${product.price}</p>
            </div>
        </div>
    `;
}