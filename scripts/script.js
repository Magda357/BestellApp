const basketItems = [];

import { menuItems } from "./db.js";

function filterMenu(type) {
  const container = document.getElementById("menuContainer");

  const filtered = menuItems.filter((item) => item.type === type);

  if (filtered.length === 0) {
    container.innerHTML = "<p>Keine Elemente gefunden.</p>";
    return;
  }

  const html = filtered.map((item) => menuItemplace(item)).join("");
  container.innerHTML = html;

  document.querySelectorAll(".menu-item").forEach((div) => {
    div.addEventListener("click", () => {
      const name = div.getAttribute("data-name");
      addToBasket(name);
    });
  });
}

function menuItemplace(item) {
  return `
    <div class="menu-item" data-name="${item.name}">
      <h3><strong>${item.name}</strong></h3>
      <p>${item.description}</p>
      <strong class="price">${item.price.toFixed(2)} €</strong>
      <div class="plus-last">
        <img src="./assets/Favicon/plus.png" alt="" class="plus-image">
      </div>
    </div>
  `;
}

function addToBasket(name) {
  const item = menuItems.find((i) => i.name.trim() === name.trim());
  if (!item) return;

  const existingItem = basketItems.find((i) => i.name === item.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    basketItems.push({ ...item, quantity: 1 });
  }

  renderBasket();
  saveBasketToStorage();
}

function renderBasket() {
  const basket = document.getElementById("basket");
  const mobileBasket = document.getElementById("mobileBasketContent");

  if (basketItems.length === 0) {
    basket.innerHTML = "<p>Der Warenkorb ist leer.</p>";
    mobileBasket.innerHTML = "<p>Der Warenkorb ist leer.</p>";
    return;
  }

  let html = "<ul>";
  let subtotal = 0;
  basketItems.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    html += template(item, itemTotal);
  });
  html += "</ul><div id='hr'></div><div>Lieferung ab 50€ kostenlos</div>";
  const delivery = 5.99;
  const deliveryCost = subtotal < 50 ? delivery : 0;
  const total = subtotal + deliveryCost;

  html += basketValue(subtotal, deliveryCost, total);
  basket.innerHTML = html;
  mobileBasket.innerHTML = html;
}

function template(item, itemTotal) {
  return `
      <li>
        ${item.name} - ${item.price.toFixed(2)}€ x ${
    item.quantity
  } = ${itemTotal.toFixed(2)}€
        <button onclick="decreaseQuantity('${item.name}')">➖</button>
        <button onclick="increaseQuantity('${item.name}')">➕</button>
        <button onclick="removeFromBasket('${item.name}')">🗑️</button>
      </li>
    `;
}

function basketValue(subtotal, deliveryCost, total) {
  let html = `<p><strong>Gesamt: ${total.toFixed(2)}€</strong></p>`;
  if (deliveryCost > 0) {
    html += `<p>Enthält Lieferkosten: 5.99 €</p>`;
  }
  html += `<button class="bestellung-button" onclick="bestellung()">Bestellen</button>`;
  return html;
}

function increaseQuantity(name) {
  const item = basketItems.find((i) => i.name === name);
  if (item) {
    item.quantity += 1;
    renderBasket();
    saveBasketToStorage();
  }
}

function decreaseQuantity(name) {
  const index = basketItems.findIndex((i) => i.name === name);
  if (index > -1) {
    basketItems[index].quantity -= 1;
    if (basketItems[index].quantity <= 0) {
      basketItems.splice(index, 1);
    }
    renderBasket();
    saveBasketToStorage();
  }
}

function removeFromBasket(name) {
  const index = basketItems.findIndex((i) => i.name === name);
  if (index > -1) {
    basketItems.splice(index, 1);
    renderBasket();
    saveBasketToStorage();
  }
}

// Сохранение / загрузка
function saveBasketToStorage() {
  localStorage.setItem("basket", JSON.stringify(basketItems));
}

function loadBasketFromStorage() {
  const stored = localStorage.getItem("basket");
  if (stored) {
    basketItems.length = 0;
    JSON.parse(stored).forEach((item) => basketItems.push(item));
    renderBasket();
  }
}

// Заказ
function bestellung() {
  alert("Deine Bestellung wird bearbeitet...");
  basketItems.length = 0;
  renderBasket();
  saveBasketToStorage();
}

// Переключение мобильной корзины
function toggleMobileBasket() {
  const mobileBasket = document.getElementById("mobileBasket");
  mobileBasket.classList.toggle("hidden");
  mobileBasket.classList.toggle("visible");
}

// Обработка кнопок фильтрации (только pizza, dessert, getränk)
function initFilterButtons() {
  document.querySelectorAll("[data-type]").forEach((btn) => {
    const type = btn.getAttribute("data-type");
    if (["pizza", "dessert", "drink"].includes(type)) {
      btn.addEventListener("click", () => {
        filterMenu(type);
      });
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  loadBasketFromStorage();
  initFilterButtons();
  filterMenu("pizza");
});

window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;
window.removeFromBasket = removeFromBasket;
window.bestellung = bestellung;
window.toggleMobileBasket = toggleMobileBasket;
