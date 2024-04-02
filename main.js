import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
        import {
          getFirestore,
          collection,
          addDoc,
        } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";


AFRAME.registerComponent("markerhandler", {
  init: function () {
    this.el.addEventListener("markerFound", (event) => {
      showInfoPopup(parseInt(event.target.getAttribute("value")));
      
      const markerValue = parseInt(event.target.getAttribute("value"));
      
      const sound = document.getElementById(`ambiente${markerValue}`);
      if (sound) {
        sound.components.sound.playSound();
      }
    });

    this.el.addEventListener("markerLost", () => {
      closeInfoPopup();
      closeRecipesPopup();

      const allSounds = document.querySelectorAll("a-sound");
      allSounds.forEach((sound) => {
        sound.components.sound.stopSound();
      });
    });
  },
});


const firebaseConfig = {
  apiKey: "AIzaSyAoI5oQyAWizz9QMrEKxfgrp7PpsxWUULA",
  authDomain: "softcomputo-agro.firebaseapp.com",
  projectId: "softcomputo-agro",
  storageBucket: "softcomputo-agro.appspot.com",
  messagingSenderId: "812027506529",
  appId: "1:812027506529:web:7bc43a3bf1617ec7275f20",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);





async function showInfoPopup(markerType) {
  const buttonTexts = {
    0: "Recetas",
    1: "Recetas",
    2: "Recetas",
    3: "Recetas",
    4: "Recetas",
    5: "Recomendados",
  };

  const infoData = {
    0: {
      title: "PERA",
      description: "Peras frescas, seleccionadas con cuidado para ofrecerte calidad y sabor incomparables",
      imageUrl: "assets/pera.jpg",
      precio: "4000 Kg",
    },
    1: {
      title: "MANZANA",
      description: "¡Añade un toque de frescura a tu canasta con nuestras manzanas irresistibles!",
      imageUrl: "assets/manzana.jpg",
      precio: "3000 Kg",
    },
    2: {
      title: "BRÓCOLI",
      description: "Brócoli fresco y nutritivo, ideal para añadir un toque verde y saludable a tus comidas. Con su textura tierna y su sabor vibrante",
      imageUrl: "assets/brocoli.jpg",
      precio: "1200 Kg",
    },
    3: {
      title: "NUTELLA",
      description: "Esta deliciosa crema de avellanas y cacao ofrece un placer cremoso y dulce que transformará tus desayunos y meriendas.",
      imageUrl: "assets/nutella.jpg",
      precio: "5500 U",
    },
    4: {
      title: "PEZ",
      description: "Pez fresco y delicioso. ¡Una explosión de sabor en cada bocado!",
      imageUrl: "assets/pescado.jpg",
      precio: "20000 x Kg",
    },
    5: {
      title: "Lavadora",
      description: "Lavadora eficiente y confiable, diseñada para simplificar tu rutina de lavado diaria. Con características avanzadas y un rendimiento excepcional, esta lavadora asegura resultados impecables en cada carga.",
      imageUrl: "assets/lavadora.jpg",
      precio: "1'500000 U",
    },
  };

  const info = infoData[markerType];

  const markerData = {
    nombre: info.title,
    descripcion: info.description,
    precio: info.precio,
    cantidad: markerType,
    tipo: "Recetas", 
  };
  
  try {
    await addDoc(collection(db, "productos"), data);
    console.log("Datos enviados a Firestore correctamente");
    alert("Pedido enviado correctamente");
  } catch (error) {
    console.error("Error al enviar datos a Firestore:", error);
    alert("Ocurrió un error al enviar los datos a Firestore.");
  }
  
  const buttonText = buttonTexts[markerType];

  const popup = document.createElement("div");
  popup.id = "infoPopup";
  popup.classList.add("container", "rounded", "shadow", "p-4", "mt-5");
  popup.style.position = "fixed";
  popup.style.bottom = "0";
  popup.style.left = "50%";
  popup.style.transform = "translateX(-50%)";
  popup.style.width = "100%";
  popup.style.backgroundColor = "white";
  popup.style.borderRadius = "20px";

  popup.innerHTML = `
    <h2 style="margin-left: 10px;">${info.title}</h2>
    <p style="margin-left: 10px;">${info.description}</p>
    <p style="margin-left: 10px;"><b>${info.precio}</b></p>
    <img src="${info.imageUrl}" style="width: 100%; max-width: 300px; height: 200px;" />
    <button class="btn btn-primary btn-lg" onclick="showRecipes(${markerType})">${buttonText}</button>
    <button class="btn btn-secondary btn-lg" onclick="closeInfoPopup()">Cerrar</button>
   `;

  document.body.appendChild(popup);
  document.body.classList.add("popup-open");
}

function showRecipes(markerType) {

  const titleTexts = {
    0: "Recetas",
    1: "Recetas",
    2: "Recetas",
    3: "Recetas",
    4: "Recetas",
    5: "Recomendados",
  };


  const titleText = titleTexts[markerType];

  
  closeInfoPopup();

  const recipesData = {
    0: ["Ensalada de pera y espinacas", "Batido de pera y jengibre"],
    1: ["Ensalada de manzana y nueces", "Batido de manzana y canela"],
    2: ["Ensalada de brócoli y aguacate", "Sopa de brócoli cremosa"],
    3: ["Tostadas con crema de avellanas", "Crepes de nutella con plátano"],
    4: ["Salmón al horno con hierbas","Pescado a la parrilla con salsa de mango y aguacate"],
    5: ["Clasificar la ropa","No sobrecargar","Utilizar el detergente adecuado"],
  };

  const recipes = recipesData[markerType];

  const recipesPopup = document.createElement("div");
  recipesPopup.id = "recipesPopup";
  recipesPopup.style.position = "fixed";
  recipesPopup.style.top = "50%";
  recipesPopup.style.left = "50%";
  recipesPopup.style.transform = "translate(-50%, -50%)";
  recipesPopup.style.width = "70%";
  recipesPopup.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  recipesPopup.style.padding = "20px";
  recipesPopup.style.borderRadius = "10px";
  recipesPopup.classList.add("shadow"); 

  let recipesContent = `<h2 style="text-align: center; font-weight: bold;">${titleText}</h2>`;
  recipesContent += `<p style="text-align: justify;">`;
  recipes.forEach((recipe) => {
    recipesContent += `${recipe}<br>`;
  });
  recipesContent += `</p>`;
  recipesContent += `<button class="btn btn-secondary btn-lg d-block mx-auto mt-3" onclick="closeRecipesPopup()">Cerrar</button>`;

  recipesPopup.innerHTML = recipesContent;

  document.body.appendChild(recipesPopup);

  document.body.classList.add("popup-open");
}

function closeInfoPopup() {
  const popup = document.getElementById("infoPopup");
  if (popup) {
    popup.remove();
  }

  document.body.classList.remove("popup-open");
}

function closeRecipesPopup() {
  const recipesPopup = document.getElementById("recipesPopup");
  if (recipesPopup) {
    recipesPopup.remove();
  }

  document.body.classList.remove("popup-open");
}
