// SEARCH FUNCTION
const searchInput = document.getElementById("input");

searchInput.addEventListener("keyup", () => {
  const searchValue = searchInput.value.toLowerCase().trim();
  const categories = document.querySelectorAll(".category");

  categories.forEach(category => {
    let hasVisibleProduct = false;
    const products = category.querySelectorAll(".product-card");

    products.forEach(product => {
      const name = product.querySelector("h4").innerText.toLowerCase();
      const categoryName = product.getAttribute('data-category').toLowerCase();

      // Show product if category matches or name includes search
      if (categoryName === searchValue || name.includes(searchValue)) {
        product.style.display = "block";
        hasVisibleProduct = true;
      } else {
        product.style.display = "none";
      }
    });

    // Hide entire category if no products match
    category.style.display = hasVisibleProduct ? "block" : "none";
  });
});


// ADD TO CART
document.querySelectorAll(".add-cart").forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    const id = parseInt(btn.getAttribute('data-id'));
    const product = products.find(p => p.id === id);
    if (!product) return;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    // Show alert
    const alert = document.getElementById('cart-alert');
    alert.style.display = 'block';
    setTimeout(() => {
      alert.style.display = 'none';
    }, 3000);
  });
});

// COMPARE
document.addEventListener("DOMContentLoaded", () => {
  let compare = JSON.parse(localStorage.getItem("compare")) || [];
  document.querySelectorAll(".compare-checkbox").forEach((box, index) => {
    const product = products[index];
    if (compare.some(p => p.id === product.id)) {
      box.checked = true;
    }
    box.addEventListener("change", (event) => {
      event.preventDefault();
      let compare = JSON.parse(localStorage.getItem("compare")) || [];
      if (box.checked) {
        if (compare.length >= 4) {
          alert("Only 4 products allowed in compare list");
          box.checked = false;
          return;
        }
        if (compare.length > 0 && compare[0].category !== product.category) {
          alert("You can only compare products from the same category");
          box.checked = false;
          return;
        }
        compare.push(product);
      } else {
        compare = compare.filter(p => p.id !== product.id);
      }
      localStorage.setItem("compare", JSON.stringify(compare));
    });
  });
});

// LOGIN/REGISTER MODAL
const modal = document.getElementById("auth-modal");
const loginBtn = document.getElementById("login-btn");
const closeBtn = document.querySelector(".close");
const showRegister = document.getElementById("show-register");
const showLogin = document.getElementById("show-login");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
  loginBtn.innerHTML = '<i class="fa-solid fa-sign-out-alt"></i> Logout';
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    location.reload();
  });
} else {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  showRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });

  showLogin.addEventListener("click", (e) => {
    e.preventDefault();
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });

  // Handle Register
  document.getElementById("register").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(u => u.email === email)) {
      alert("User already exists!");
      return;
    }
    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Please login.");
    registerForm.style.display = "none";
    loginForm.style.display = "block";
  });

  // Handle Login
  document.getElementById("login").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert(`Welcome, ${user.name}!`);
      modal.style.display = "none";
      location.reload(); // to update button
    } else {
      alert("Invalid credentials!");
    }
  });
}
