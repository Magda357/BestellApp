
//pizza array
const menuItems= [
    { 
    "name": "Margherita",
    "price": 12.99 ,
    "description": "Tomate, Mozzarella, Basilikum" ,
    "type": "pizza" 
},  
    { 
    "name" : "Salami ",
    "price": 14.99 ,
    "description" : "Tomatensoße, Mozzarella, Salami" ,
    "type": "pizza" 
},
    { 
    "name" : "Vegetarisch ",
    "price": 13.49 ,
    "description" : "Paprika, Zucchini, Pilze, Tomaten" ,
    "type": "pizza"
    
},
    
{ 
      "name"  : "BBQ Chicken ",
    "price": 13.49 ,
    "description" : "BBQ-Soße, Hähnchen, Mais, Zwiebeln",
    "type": "pizza" 

},


{ 
    "name"  : " Meeresfrüchte",
    "price": 13.49 ,
    "description" : "Garnelen, Tintenfisch, Knoblauch, Petersilie", 
    "type": "pizza"
},

{
    "name": "Schoko-Traum",
    "price": 4.49,
    "description": "Schokoladenbiskuit, Ganache, Schokoraspeln",
    "type":"dessert"
    
  },
  {
    "name": "Erdbeer-Herz",
    "price": 4.99,
    "description": "Erdbeercreme, Keksboden, frische Erdbeeren",
     "type":"dessert"
  },
  {
    "name": "Zitronenwelle",
    "price": 3.99,
    "description": "Zitronenmousse, Baiser, Sahne",
     "type":"dessert"
  },
  {
    "name": "Haselnuss-Glück",
    "price": 4.29,
    "description": "Haselnusscreme, Nusskrokant, Kakaoboden",
     "type":"dessert"
  },
  {
    "name": "Karamell-Kuss",
    "price": 4.79,
    "description": "Karamellfüllung, Butterkeks, Karamellglasur",
     "type":"dessert"
  },



  { "name": "Mangosaft",
     "price": 3.50,
      "description": "Frisch gepresster Saft aus reifen Mangos",
       "type": "drink" 
    },
  { "name": "Kokoswasser",
     "price": 3.20, 
     "description": "Erfrischendes Wasser aus der grünen Kokosnuss",
      "type": "drink" },
  { "name": "Mate-Tee",
     "price": 2.90, 
     "description": "Koffeinhaltiger Tee aus den Blättern der Mate-Pflanze",
      "type": "drink" },
  { "name": "Passionsfrucht-Limonade",
     "price": 2.80, 
     "description": "Erfrischende Limonade mit Passionsfruchtgeschmack",
      "type": "drink" },
  { "name": "Guavennektar",
     "price": 3.10,
      "description": "Fruchtiger Nektar aus reifen Guaven",
       "type": "drink" }
];

  
function onload() { 
filterMenu('pizza')
}




  function filterMenu(type) {
      const container = document.getElementById("menuContainer");

      const filtered = menuItems.filter(item => item.type === type);

      const html = filtered.map(item => `
        <div class="menu-item">
          <h3><strong>${item.name}</strong></h3>
          <p >${item.description}</p>
          <strong  class="price">${item.price.toFixed(2)} €</strong>
          <div class="plus last"> <a href="#" onclick="warenkorb()"><img src="./assets/Favicon/plus.png" alt="" class="plus-image"> </a></div>
        </div>
        
      `).join("");

      container.innerHTML = html;
    }