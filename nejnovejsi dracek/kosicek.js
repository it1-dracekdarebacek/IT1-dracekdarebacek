document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".kosik-btn");
    const cartCount = document.getElementById("cart-count");

    // cislo u kosiku
    updateCartCount();

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const productBox = button.closest(".produkt-box");
            const name = productBox.querySelector("h3").textContent;
            const price = parseFloat(productBox.getAttribute("data-price"));

            addToCart({ name, price });

            updateCartCount();
        });
    });
});

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // pokud product existuje, zvyseni kvantitu
    const existing = cart.find(item => item.name === product.name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCount = document.getElementById("cart-count");
    if (cartCount) cartCount.textContent = count;
}


