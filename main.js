AFRAME.registerComponent("markerhandler", {
  init: function () {
    // El evento 'markerFound' se dispara cuando se detecta el marcador
    this.el.addEventListener("markerFound", (event) => {
      // Muestra la ventana emergente con la información específica para cada tipo
      showInfoPopup(event.target.getAttribute("value"));
    });

    this.el.addEventListener("markerLost", () => {
      // Oculta la ventana emergente
      closeInfoPopup();
    });
  },
});

function showInfoPopup(markerType) {
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
    // Puedes agregar más tipos aquí según sea necesario
  };

  // Obtener la información específica del tipo de marcador
  const info = infoData[markerType];

  // Crear un elemento de ventana emergente
  const popup = document.createElement("div");
  popup.id = "infoPopup";
  popup.style.position = "fixed";
  popup.style.bottom = "0";
  popup.style.left = "50%";
  popup.style.transform = "translateX(-50%)";
  popup.style.width = "100%";
  popup.style.backgroundColor = "white";
  popup.style.padding = "20px";
  popup.style.border = "2px solid black";

  // Agregar contenido a la ventana emergente utilizando la información específica del tipo
  popup.innerHTML = `
    <h2 style="margin-left: 10px;">${info.title}</h2>
    <p style="margin-left: 10px;">${info.description}</p>
    <p style="margin-left: 10px;"><b>${info.precio}</b></p>
    <img src="${info.imageUrl}" style="width: 100%; max-width: 300px; height: 200px;" />
    <button style="margin-left: 10px;" onclick="showAlert()">Recetas</button>
    <button style="margin-left: 10px;" onclick="closeInfoPopup()">Cerrar</button>
  `;

  // Agregar la ventana emergente al cuerpo del documento
  document.body.appendChild(popup);
  document.body.classList.add("popup-open");
}

function showAlert(){
  alert("Hola, estas son las recetas")
}

function closeInfoPopup() {
  // Eliminar la ventana emergente al hacer clic en el botón "Cerrar"
  const popup = document.getElementById("infoPopup");
  if (popup) {
    popup.remove();
  }

  document.body.classList.remove("popup-open");
}