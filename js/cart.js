const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cart-items");
const emptyText = document.getElementById("empty-cart");
const checkoutSection = document.getElementById("checkout-section");
const checkoutBtn = document.querySelector(".checkout-btn");

let subtotal = 0;
let itemCount = 0;

if (cartItems.length === 0) {
  emptyText.style.display = "block";
  checkoutSection.style.display = "none";
  checkoutBtn.style.display = "none";
} else {
  emptyText.style.display = "none";
  checkoutSection.style.display = "block";
  checkoutBtn.style.display = "block";
  cartItems.forEach((item, index) => {
    const product = products.find(p => p.id === item.id);
    if (product) {
      subtotal += product.price * item.quantity;
      itemCount += item.quantity;
      cartContainer.innerHTML += `
        <article class="cart-item">
          <img src="${product.image}" alt="${product.name}">
          <div class="item-details">
            <h4>${product.name}</h4>
            <p class="item-meta">Category: ${product.category} | Item ID: #${product.id}</p>
          </div>
          <div class="item-actions">
            <div class="quantity-controls">
              <button class="qty-btn decrease-btn" onclick="decreaseItem(${item.id})" title="Decrease Quantity">-</button>
              <label>Qty: <span>${item.quantity}</span></label>
              <button class="qty-btn increase-btn" onclick="increaseItem(${item.id})" title="Increase Quantity">+</button>
            </div>
            <p class="item-price">₹${product.price * item.quantity}</p>
            <button class="remove-btn" onclick="removeItem(${item.id})" title="Remove All">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </article>`;
    }
  });
}

const shipping = subtotal === 0 || subtotal > 1500 ? 0 : 100;
const discount = 0;
const total = subtotal + shipping - discount;

document.getElementById("item-count").innerText = itemCount;
document.getElementById("subtotal").innerText = `₹${subtotal}`;
document.getElementById("shipping").innerText = `₹${shipping}`;
document.getElementById("discount").innerText = `-₹${discount}`;
document.getElementById("total").innerText = `₹${total}`;
document.getElementById("pay-btn").innerText = `Pay ₹${total} Now`;

function decreaseItem(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemIndex = cart.findIndex(item => item.id === id);
  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      cart.splice(itemIndex, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
}

function increaseItem(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemIndex = cart.findIndex(item => item.id === id);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  }
}

function removeItem(id) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const newCart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(newCart));
  location.reload();
}
