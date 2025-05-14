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
filterMenu('pizza'); //Երբ էջը բացվում է, այս ֆունկցիան ցույց է տալիս միայն պիցցաները։

}
  function filterMenu(type) {
  const container = document.getElementById("menuContainer"); //Այս ֆունկցիան վերցնում է ապրանքների ամբողջական ցուցակը 

  const filtered = menuItems.filter(item => item.type === type);//և թողնում միայն այն ապրանքները, որոնք համապատասխանում են տրված տեսակի (pizza, dessert, drink)։

  const html = filtered.map((item, index) => `
    <div class="menu-item">
    <a href="#" onclick="warenKorb('${item.name}')"> 
      <h3><strong>${item.name}</strong></h3>
      <p>${item.description}</p>
      <strong class="price">${item.price.toFixed(2)} €</strong>
      <div class="plus last">
        
          <img src="./assets/Favicon/plus.png" alt="" class="plus-image">
        
      </div>
      </a>
    </div>
  `).join("");

  container.innerHTML = html;
}

function warenKorb(name) {
  const item = menuItems.find(i => i.name.trim() === name.trim());//որոնում ենք ամբողջ մենյուում այն ապրանքը, որի անունը համընկնում է տրված անվան հետ։
  if (!item) return;

  const existingItem = basketItems.find(i => i.name === item.name); //Ստուգում ենք՝ արդյո՞ք ապրանքը արդեն զամբյուղում կա։
  if (existingItem) {
    existingItem.quantity += 1; //Եթե կա՝ Քանակը 1-ով ավելացնում ենք։
  } else {
    basketItems.push({ ...item, quantity: 1 }); //Ավելացնում ենք նոր ապրանք՝ quantity: 1 հատկությամբ։
  }

  renderBasket(); // Թարմացնում ենք զամբյուղի ցուցադրումը։
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
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    html += `
      
        ${item.name} - ${item.price.toFixed(2)}€ x ${item.quantity} = ${itemTotal.toFixed(2)}€
        <li><button onclick="decreaseQuantity('${item.name}')">➖</button>
        <button onclick="increaseQuantity('${item.name}')">➕</button>
        <button onclick="removeFromBasket('${item.name}')">🗑️</button>
      </li>
    `;
  });

  html += "</ul>";
  html  += `<span id="hr"></span> `;
  html += `<p><strong>Total: ${total.toFixed(2)}€</strong></p>`;
  basket.innerHTML = html;
}

function increaseQuantity(name) {
  const item = basketItems.find(i => i.name === name);
  if (item) {
    item.quantity += 1;
    renderBasket();
  }
}

function decreaseQuantity(name) {
  const index = basketItems.findIndex(i => i.name === name);
  if (index > -1) {
    basketItems[index].quantity -= 1;
    if (basketItems[index].quantity <= 0) {
      basketItems.splice(index, 1); // Ջնջում է, եթե քանակը 0-ից պակաս է
    }
    renderBasket();
  }
}

function removeFromBasket(name) {
  const index = basketItems.findIndex(i => i.name === name);
  if (index > -1) {
    basketItems.splice(index, 1);
    renderBasket();
  }
}

