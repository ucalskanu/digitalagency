const products = [
  {
    id: 1,
    name: "Design Package",
    price: 260,
    description: "Our Design Package is tailored to give your brand a creative edge across social media platforms. Here's what you'll get. 10 Static Social Media Posts: Professionally designed posts to engage and inspire your audience. 2 Reel Videos (15 Seconds): Eye-catching, short-form videos perfect for Instagram and TikTok. 1 Customized Design: A unique graphic designed to meet your specific needs, whether for promotions, banners, or other creative projects.",
    image: "../assets/product1.jpg"  },
  {
    id: 2,
    name: "Unique Website Design",
    price: 120,
    description: "Our Unique Website Design Package is designed to help your brand stand out with a fresh, modern look. You’ll receive a one-of-a-kind custom design tailored to your brand’s vision, with a responsive layout optimized for all devices. The intuitive, user-friendly navigation ensures a seamless browsing experience, while the SEO-friendly structure helps improve your search engine rankings. We also provide clean content integration to make your website both functional and visually appealing, giving your brand the creative edge it deserves.",
    image: "../assets/product2.jpg"  },
  {
    id: 3,
    name: "Social Media Package",
    price: 340,
    description: "Our Unique Social Media Package is designed to elevate your brand’s presence across various platforms with eye-catching content. You’ll receive 10 professionally designed static posts that engage and inspire your audience, along with 2 dynamic 15-second reel videos, perfect for Instagram and TikTok. Additionally, we’ll provide a customized graphic tailored to your specific needs, whether it's for promotions, banners, or any other creative project. This comprehensive package ensures your brand maintains a consistent and compelling presence on social media.",
    image: "../assets/product3.jpg"  }
];

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Sepete ürün ekleme
function addToCart(id, name, price) {
  const existingItem = cartItems.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ id, name, price, quantity: 1 });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  alert(`${name} added to cart!`);
}

// Ürün detaylarını yükleme
function loadProductDetails() {
  const productId = getProductIdFromURL();
  const product = products.find(p => p.id === productId);

  if (product) {
    document.getElementById("product-title").innerText = product.name;
    document.getElementById("product-description").innerText = product.description;
    document.getElementById("product-price").innerText = `$${product.price}`;
    document.getElementById("product-image").src = product.image;
    document.getElementById("add-to-cart-btn").onclick = () => addToCart(product.id, product.name, product.price);
  } else {
    document.querySelector(".product-detail").innerHTML = "<p>Product not found.</p>";
  }
}

// Sepet sayfasındaki ürünleri yükleme
function loadCartItems() {
  const cartContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("total-price");

  cartContainer.innerHTML = "";
  let total = 0;

  cartItems.forEach(item => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <h3>${item.name}</h3>
      <p>Price: $${item.price}</p>
      <p>Quantity: ${item.quantity}</p>
      <button onclick="removeFromCart(${item.id})">Remove</button>
    `;
    cartContainer.appendChild(cartItem);
    total += item.price * item.quantity;
  });

  totalContainer.innerText = `Total: $${total}`;
}

// Sepetten ürün silme
function removeFromCart(id) {
  cartItems = cartItems.filter(item => item.id !== id);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  loadCartItems();
}

// URL'den ürün ID'sini alma
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}

// Ürün detay ve sepet yükleme
if (window.location.pathname.includes("product.html")) {
  loadProductDetails();
}

if (window.location.pathname.includes("shopping.html")) {
  loadCartItems();
}
