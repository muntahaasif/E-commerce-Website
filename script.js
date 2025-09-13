const productContainer = document.getElementById("productContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categoryLinks = document.querySelectorAll(".category-link");

let allProducts = [];

// Fetch Products from Fake Store API
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    allProducts = await response.json();
    displayProducts(allProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Display Products
function displayProducts(products) {
  productContainer.innerHTML = "";
  if (products.length === 0) {
    productContainer.innerHTML = `<p class="text-center text-danger">No products found!</p>`;
    return;
  }
  products.forEach(product => {
    const productCard = `
      <div class="col-md-3 mb-4">
        <div class="card h-100 shadow-sm">
          <img src="${product.image}" class="card-img-top" alt="${product.title}">
          <div class="card-body">
            <h6 class="card-title">${product.title}</h6>
            <p class="card-text text-muted">${product.category}</p>
            <p class="fw-bold">$${product.price}</p>
            <button class="btn btn-primary w-100">Add to Cart</button>
          </div>
        </div>
      </div>
    `;
    productContainer.innerHTML += productCard;
  });
}

// Search Products
function searchProducts() {
  const query = searchInput.value.toLowerCase();
  const filtered = allProducts.filter(product =>
    product.title.toLowerCase().includes(query)
  );
  displayProducts(filtered);
}

// Filter by Category
function filterByCategory(category) {
  if (category === "all") {
    displayProducts(allProducts);
  } else if (category === "cosmetics") {
    // Fake Store API doesn't have cosmetics, so let's simulate
    const cosmetics = allProducts.filter(p =>
      p.category.includes("jewelery") || p.category.includes("women")
    );
    displayProducts(cosmetics);
  } else {
    const filtered = allProducts.filter(product =>
      product.category.toLowerCase() === category.toLowerCase()
    );
    displayProducts(filtered);
  }
}

// Event Listeners
searchBtn.addEventListener("click", searchProducts);
categoryLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const category = e.target.getAttribute("data-category");
    filterByCategory(category);
  });
});

// Load Products on Page Load
fetchProducts();
