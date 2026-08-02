// ===============================
// AL SAYYED WEBSITE APP
// Part 1
// ===============================

// Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update Cart Counter
function updateCartCount() {
  const count = document.getElementById("cart-count");

  if (!count) return;

  let total = 0;

  cart.forEach(item => {
    total += item.quantity;
  });

  count.textContent = total;
}

// Banner Slider
const banners = [
  "banner1.jpg",
  "banner2.jpg",
  "banner3.jpg"
];

let currentBanner = 0;

function startBannerSlider() {

  const banner = document.getElementById("banner");

  if (!banner) return;

  setInterval(() => {

    currentBanner++;

    if (currentBanner >= banners.length) {
      currentBanner = 0;
    }

    banner.src = banners[currentBanner];

  }, 3000);

}

// Load Products
function loadProducts() {

  const container = document.getElementById("featuredProducts");

  if (!container) return;

  container.innerHTML = "";

  products.forEach(product => {

    container.innerHTML += `

    <div class="card">

      <img src="${product.image}" alt="${product.name}">

      <h3>${product.name}</h3>

      <p>₹${product.price}</p>

      <button onclick="addToCart(${product.id})">
        Add To Cart
      </button>

    </div>

    `;

  });

}

// Search Products
function searchProducts() {

  const input = document.getElementById("search");

  if (!input) return;

  const keyword = input.value.toLowerCase();

  const container = document.getElementById("featuredProducts");

  if (!container) return;

  container.innerHTML = "";

  products
    .filter(product =>
      product.name.toLowerCase().includes(keyword)
    )
    .forEach(product => {

      container.innerHTML += `

      <div class="card">

        <img src="${product.image}" alt="${product.name}">

        <h3>${product.name}</h3>

        <p>₹${product.price}</p>

        <button onclick="addToCart(${product.id})">
          Add To Cart
        </button>

      </div>

      `;

    });

}
function filterCategory(category){

    const container = document.getElementById("featuredProducts");

    if(!container) return;

    container.innerHTML = "";

    const filtered = products.filter(product => product.category === category);

    filtered.forEach(product => {

        container.innerHTML += `
        <div class="card">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>₹${product.price}</p>
            <button onclick="addToCart(${product.id})">
                Add To Cart
            </button>
        </div>
        `;

    });

}
// ===============================
// Add To Cart
// ===============================

function addToCart(id){

    const product = products.find(p => p.id === id);

    if(!product) return;

    const existing = cart.find(item => item.id === id);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({
            ...product,
            quantity:1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(product.name + " added to cart");

}

// ===============================
// Load Cart
// ===============================

function loadCart(){

    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");

    if(!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";

    if(cart.length===0){

        cartItems.innerHTML="<p>Your cart is empty.</p>";

        cartTotal.innerHTML="₹0";

        return;

    }

    let total=0;

    cart.forEach((item,index)=>{

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <h3>${item.name}</h3>

            <p>₹${item.price}</p>

            <div>

            <button onclick="changeQty(${index},-1)">-</button>

            <strong>${item.quantity}</strong>

            <button onclick="changeQty(${index},1)">+</button>

            <button onclick="removeItem(${index})">Remove</button>

            </div>

        </div>

        `;

    });

    cartTotal.innerHTML="Grand Total : ₹"+total;

}

// ===============================
// Change Quantity
// ===============================

function changeQty(index,value){

    cart[index].quantity += value;

    if(cart[index].quantity<=0){

        cart.splice(index,1);

    }

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCartCount();

    loadCart();

}

// ===============================
// Remove Item
// ===============================

function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart",JSON.stringify(cart));

    updateCartCount();

    loadCart();

}
// ===============================
// CHECKOUT
// ===============================

function loadCheckout() {

    const items = document.getElementById("checkoutItems");
    const total = document.getElementById("checkoutTotal");

    if (!items || !total) return;

    items.innerHTML = "";

    let grandTotal = 0;

    cart.forEach(item => {

        grandTotal += item.price * item.quantity;

        items.innerHTML += `
        <p>
        ${item.name} × ${item.quantity}
        - ₹${item.price * item.quantity}
        </p>
        `;

    });

    total.innerHTML = "Grand Total : ₹" + grandTotal;

}

// ===============================
// WHATSAPP ORDER
// ===============================

function placeOrder() {

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!name || !phone || !address) {
        alert("Please fill all details.");
        return;
    }

    let text =
`🛍️ *AL SAYYED ORDER*

👤 Name: ${name}
📞 Phone: ${phone}
📍 Address: ${address}

🛒 Products:
`;

    let grandTotal = 0;

    cart.forEach(item => {

        text += `• ${item.name} × ${item.quantity} = ₹${item.price * item.quantity}\n`;

        grandTotal += item.price * item.quantity;

    });

    text += `\n💰 Total: ₹${grandTotal}`;

    window.open(
        "https://wa.me/918433660173?text=" +
        encodeURIComponent(text),
        "_blank"
    );

}
// ===============================
// INITIALIZE WEBSITE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    if (typeof products !== "undefined") {
        loadProducts();
    }

    if (document.getElementById("cartItems")) {
        loadCart();
    }

    if (document.getElementById("checkoutItems")) {
        loadCheckout();
    }

    if (document.getElementById("banner")) {
        startBannerSlider();
    }

    const search = document.getElementById("search");

    if (search) {
        search.addEventListener("keyup", searchProducts);
    }

});