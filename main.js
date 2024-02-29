AFRAME.registerComponent("markerhandler", {
  init: function () {
    this.el.addEventListener("markerFound", (event) => {
      // Muestra la ventana emergente con la información específica para cada tipo
      showInfoPopup(parseInt(event.target.getAttribute("value")));
      
      // Recupera el ID del marcador
      const markerValue = parseInt(event.target.getAttribute("value"));
      
      // Reproduce el sonido ambiente correspondiente al marcador encontrado
      const sound = document.getElementById(`ambiente${markerValue}`);
      if (sound) {
        sound.components.sound.playSound();
      }
    });

    this.el.addEventListener("markerLost", () => {
      // Oculta la ventana emergente
      closeInfoPopup();
      closeRecipesPopup();

      // Pausa todos los sonidos ambiente cuando se pierde el marcador
      const allSounds = document.querySelectorAll("a-sound");
      allSounds.forEach((sound) => {
        sound.components.sound.stopSound();
      });
    });
  },
});





function showInfoPopup(markerType) {

  const buttonTexts = {
    0: "Recetas",
    1: "Recetas",
    2: "Recetas",
    3: "Recetas",
    4: "Recetas",
    5: "Recomendados",
  };


  // Obtener la información específica para el tipo de marcador
  const infoData = {
    0: {
      title: "PERA",
      description:
        "Peras frescas, seleccionadas con cuidado para ofrecerte calidad y sabor incomparables",
      imageUrl: "assets/pera.jpg",
      precio: "4000 Kg",
    },
    1: {
      title: "MANZANA",
      description:
        "¡Añade un toque de frescura a tu canasta con nuestras manzanas irresistibles!",
      imageUrl: "assets/manzana.jpg",
      precio: "3000 Kg",
    },
    2: {
      title: "BRÓCOLI",
      description:
        "Brócoli fresco y nutritivo, ideal para añadir un toque verde y saludable a tus comidas. Con su textura tierna y su sabor vibrante",
      imageUrl: "assets/brocoli.jpg",
      precio: "1200 Kg",
    },
    3: {
      title: "NUTELLA",
      description:
        "Esta deliciosa crema de avellanas y cacao ofrece un placer cremoso y dulce que transformará tus desayunos y meriendas.",
      imageUrl: "assets/nutella.jpg",
      precio: "5500 U",
    },
    4: {
      title: "PEZ",
      description:
        "Pez fresco y delicioso. ¡Una explosión de sabor en cada bocado!",
      imageUrl: "assets/pescado.jpg",
      precio: "20000 x Kg",
    },
    5: {
      title: "Lavadora",
      description:
        "Lavadora eficiente y confiable, diseñada para simplificar tu rutina de lavado diaria. Con características avanzadas y un rendimiento excepcional, esta lavadora asegura resultados impecables en cada carga.",
      imageUrl: "assets/lavadora.jpg",
      precio: "1'500000 U",
    },
  };

  // Obtener la información específica del tipo de marcador
  const info = infoData[markerType];

  // Obtener el texto para el botón "Recetas" según el tipo de marcador
  const buttonText = buttonTexts[markerType];

  // Crear un elemento de ventana emergente
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

  // Agregar contenido a la ventana emergente utilizando la información específica del tipo
  popup.innerHTML = `
    <h2 style="margin-left: 10px;">${info.title}</h2>
    <p style="margin-left: 10px;">${info.description}</p>
    <p style="margin-left: 10px;"><b>${info.precio}</b></p>
    <img src="${info.imageUrl}" style="width: 100%; max-width: 300px; height: 200px;" />
    <button class="btn btn-primary btn-lg" onclick="showRecipes(${markerType})">${buttonText}</button>
    <button class="btn btn-secondary btn-lg" onclick="closeInfoPopup()">Cerrar</button>
   `;

  // Agregar la ventana emergente al cuerpo del documento
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

  const markerData = {
    idMarker: markerType,
    nombre: info.title,
    precio: info.precio,
    descripcion: info.description,
    tipo: "Recetas", 
  };


  fetch('http://localhost:8080/productos/agregar', {
    method: 'POST',
    headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(markerData),
  })
  .then(response => response.json())
  .then(data => {
    showResponse(data);
    alert(response);
  })
  .catch(error => {
    alert(error);
  });
  
  // Cerrar la ventana de información antes de mostrar las recetas
  closeInfoPopup();

  // Define las recetas específicas para cada tipo de marcador
  const recipesData = {
    0: ["Ensalada de pera y espinacas", "Batido de pera y jengibre"],
    1: ["Ensalada de manzana y nueces", "Batido de manzana y canela"],
    2: ["Ensalada de brócoli y aguacate", "Sopa de brócoli cremosa"],
    3: ["Tostadas con crema de avellanas", "Crepes de nutella con plátano"],
    4: ["Salmón al horno con hierbas","Pescado a la parrilla con salsa de mango y aguacate"],
    5: ["Clasificar la ropa","No sobrecargar","Utilizar el detergente adecuado"],
  };

  // Obtener las recetas específicas del tipo de marcador
  const recipes = recipesData[markerType];

  // Crear un elemento de ventana emergente para las recetas
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
  recipesPopup.classList.add("shadow"); // Aplica una sombra con Bootstrap

  // Generar el contenido de las recetas
  let recipesContent = `<h2 style="text-align: center; font-weight: bold;">${titleText}</h2>`;
  recipesContent += `<p style="text-align: justify;">`;
  recipes.forEach((recipe) => {
    recipesContent += `${recipe}<br>`;
  });
  recipesContent += `</p>`;
  recipesContent += `<button class="btn btn-secondary btn-lg d-block mx-auto mt-3" onclick="closeRecipesPopup()">Cerrar</button>`;

  // Agregar el contenido al popup de recetas
  recipesPopup.innerHTML = recipesContent;

  // Agregar la ventana emergente de recetas al cuerpo del documento
  document.body.appendChild(recipesPopup);

  // Agregar una clase al cuerpo para indicar que está abierta la ventana emergente
  document.body.classList.add("popup-open");
}

function closeInfoPopup() {
  // Eliminar la ventana emergente al hacer clic en el botón "Cerrar"
  const popup = document.getElementById("infoPopup");
  if (popup) {
    popup.remove();
  }

  document.body.classList.remove("popup-open");
}

function closeRecipesPopup() {
  // Eliminar la ventana emergente de recetas al hacer clic en el botón "Cerrar"
  const recipesPopup = document.getElementById("recipesPopup");
  if (recipesPopup) {
    recipesPopup.remove();
  }

  document.body.classList.remove("popup-open");
}
