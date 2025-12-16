document.addEventListener("DOMContentLoaded", () => {
  const compareItems = JSON.parse(localStorage.getItem("compare")) || [];
  const comparisonSection = document.getElementById("comparison-section");

  if (compareItems.length === 0) {
    comparisonSection.innerHTML = `
      <div class="no-compare-card">
        <i class="fa-solid fa-exchange-alt"></i>
        <h2>No Items to Compare</h2>
        <p>Add products from the shop to compare them side by side.</p>
        <a href="index.html" class="shop-link">Go to Shop</a>
      </div>
    `;
  } else {
    // Generate dynamic table
    let tableHTML = `
      <div id="compare-table-container">
        <table class="comparison-table">
          <thead>
            <tr class="product-header">
              <th>Feature</th>
    `;

    compareItems.forEach(item => {
      tableHTML += `
        <th>
          <div class="product-info-cell">
            <img src="${item.image}" alt="${item.name}">
            <h4>${item.name}</h4>
            <p class="price">₹${item.price}</p>
            <button class="remove-btn" onclick="removeFromCompare(${item.id})">Remove</button>
          </div>
        </th>
      `;
    });

    tableHTML += `
            </tr>
          </thead>
          <tbody>
            <tr class="static-row">
              <td>Category</td>
    `;

    compareItems.forEach(() => {
      tableHTML += `<td>${compareItems[0].category}</td>`;
    });

    tableHTML += `
            </tr>
            <tr class="static-row">
              <td>Price</td>
    `;

    compareItems.forEach(item => {
      tableHTML += `<td>₹${item.price}</td>`;
    });

    tableHTML += `
            </tr>
            <tr class="feature-row">
              <td>Actions</td>
    `;

    compareItems.forEach(item => {
      tableHTML += `<td><button class="add-to-cart-btn" onclick="addToCart(${item.id})">Add to Cart</button></td>`;
    });

    tableHTML += `
            </tr>
          </tbody>
        </table>
      </div>
    `;

    comparisonSection.innerHTML = tableHTML;
  }
});

function removeFromCompare(id) {
  let compareItems = JSON.parse(localStorage.getItem("compare")) || [];
  compareItems = compareItems.filter(item => item.id !== id);
  localStorage.setItem("compare", JSON.stringify(compareItems));
  location.reload();
}

function addToCart(id) {
  // Assuming products array is available, or fetch from localStorage
  const product = JSON.parse(localStorage.getItem("compare")).find(p => p.id === id);
  if (!product) return;
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart!");
}
