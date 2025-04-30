document.addEventListener("DOMContentLoaded", () => {
    const cartItemsDiv = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Košík je prázdný.</p>";
        totalPriceEl.textContent = "0.00";
        return;
    }

    let total = 0;
    cart.forEach(item => {
        const itemEl = document.createElement("div");
        itemEl.className = "cart-item";
        itemEl.innerHTML = `
            <div class="item-details">
                <p>${item.name}</p>
                <p class="item-price">Kč ${item.price}</p>
            </div>
            <div>
                <p>Množství: ${item.quantity}</p>
            </div>
        `;
        cartItemsDiv.appendChild(itemEl);
        total += item.price * item.quantity;
    });

    totalPriceEl.textContent = total.toFixed(2);
});

document.addEventListener("DOMContentLoaded", () => {
    const cartItemsDiv = document.getElementById("cart-items");
    const totalPriceEl = document.getElementById("total-price");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function updateCartDisplay() {
        cartItemsDiv.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = "<p>Košík je prázdný.</p>";
            totalPriceEl.textContent = "0.00";
            return;
        }

        cart.forEach((item, index) => {
            const itemEl = document.createElement("div");
            itemEl.className = "cart-item";
            itemEl.innerHTML = `
                <div class="item-details">
                    <p>${item.name}</p>
                    <p class="item-price">Kč ${item.price}</p>
                </div>
                <div>
                    <p>Množství: ${item.quantity}</p>
                    <button onclick="removeItem(${index})">Odstranit</button>
                </div>
            `;
            cartItemsDiv.appendChild(itemEl);
            total += item.price * item.quantity;
        });

        totalPriceEl.textContent = total.toFixed(2);
    }


    window.removeItem = function(index) {
        cart.splice(index, 1); // Remove item
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    }

    updateCartDisplay();
});