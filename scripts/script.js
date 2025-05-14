const basketItems= [];

const menuItems= [
    { 
    "name": "Margherita",
    "price": 12.99 ,
    "description": "Tomate, Mozzarella, Basilikum" ,
    "type": "pizza" ,
    "index" : 0
},  
    { 
    "name" : "Salami ",
    "price": 14.99 ,
    "description" : "Tomatensoße, Mozzarella, Salami" ,
    "type": "pizza" ,
    "index" : 1
},
    { 
    "name" : "Vegetarisch ",
    "price": 13.49 ,
    "description" : "Paprika, Zucchini, Pilze, Tomaten" ,
    "type": "pizza",
    "index" : 2
    
},
    
{ 
      "name"  : "BBQ Chicken ",
    "price": 13.49 ,
    "description" : "BBQ-Soße, Hähnchen, Mais, Zwiebeln",
    "type": "pizza" ,
    "index" : 3

},


{ 
    "name"  : " Meeresfrüchte",
    "price": 13.49 ,
    "description" : "Garnelen, Tintenfisch, Knoblauch, Petersilie", 
    "type": "pizza",
    "index" : 4
},

{
    "name": "Schoko-Traum",
    "price": 4.49,
    "description": "Schokoladenbiskuit, Ganache, Schokoraspeln",
    "type":"dessert",
    "index" : 5
    
  },
  {
    "name": "Erdbeer-Herz",
    "price": 4.99,
    "description": "Erdbeercreme, Keksboden, frische Erdbeeren",
     "type":"dessert",
     "index" : 6
  },
  {
    "name": "Zitronenwelle",
    "price": 3.99,
    "description": "Zitronenmousse, Baiser, Sahne",
     "type":"dessert",
     "index" : 7
  },
  {
    "name": "Haselnuss-Glück",
    "price": 4.29,
    "description": "Haselnusscreme, Nusskrokant, Kakaoboden",
     "type":"dessert",
     "index" : 8
  },
  {
    "name": "Karamell-Kuss",
    "price": 4.79,
    "description": "Karamellfüllung, Butterkeks, Karamellglasur",
     "type":"dessert",
     "index" : 9
  },



  { "name": "Mangosaft",
     "price": 3.50,
      "description": "Frisch gepresster Saft aus reifen Mangos",
       "type": "drink" ,
       "index" : 10
    },

  { "name": "Kokoswasser",
     "price": 3.20, 
     "description": "Erfrischendes Wasser aus der grünen Kokosnuss",
      "type": "drink",
      "index" : 11
     },

  { "name": "Mate-Tee",
     "price": 2.90, 
     "description": "Koffeinhaltiger Tee aus den Blättern der Mate-Pflanze",
      "type": "drink" ,
      "index" : 12
  },
  { "name": "Passionsfrucht-Limonade",
     "price": 2.80, 
     "description": "Erfrischende Limonade mit Passionsfruchtgeschmack",
      "type": "drink" ,
    "index" : 13},
  { "name": "Guavennektar",
     "price": 3.10,
      "description": "Fruchtiger Nektar aus reifen Guaven",
       "type": "drink",
      "index" : 14 }
];

  


function onload() { 
filterMenu('pizza');
}
  function filterMenu(type) {
  const container = document.getElementById("menuContainer");

  const filtered = menuItems.filter(item => item.type === type);

  const html = filtered.map((item, index) => `
    <div class="menu-item">
      <h3><strong>${item.name}</strong></h3>
      <p>${item.description}</p>
      <strong class="price">${item.price.toFixed(2)} €</strong>
      <div class="plus last">
        <a href="#" onclick="warenKorb('${item.name}')">
          <img src="./assets/Favicon/plus.png" alt="" class="plus-image">
        </a>
      </div>
    </div>
  `).join("");

  container.innerHTML = html;
}

function warenKorb(name) {
  const item = menuItems.find(i => i.name.trim() === name.trim());
  if (item) {
    basketItems.push(item);
    renderBasket();
  }
}

function renderBasket() {
  const basket = document.getElementById("basket");

  if (basketItems.length === 0) {
    basket.innerHTML = "<p>Basket is empty.</p>";
    return;
  }

  let html = "<ul>";
  let total = 0;
  basketItems.forEach(item => {
    html += `<li>${item.name} - ${item.price.toFixed(2)}€</li>`;
    total += item.price;
  });

  html += "</ul>";

  html += `<p><strong>Gesamt: ${total.toFixed(2)}€</strong></p>`;
  basket.innerHTML = html;
}