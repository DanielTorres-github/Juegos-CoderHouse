const dataGames = [
  {
    name: "Ahorcado",
    description: "Trata de descubrir la palabra en menos de 6 intentos.",
    jugar: ()=> hangman(),
    genero: "estrategia",
    jugadores: "individual",
  },
  {
    name: "Piedra Papel o Tijera",
    description: "Trata de vencer a la maquina al mejor de 3! Es muy buena!",
    genero: "adivinanza",
    jugadores: "multijugador",
    jugar: () => piedraPapelTijera(),
  },
];

const menu = document.getElementById("menu");
const loginBtn = document.getElementById("loginBtn");
const contenedorLoginBtn = document.getElementById("loginContainer");
loginBtn.addEventListener("click", async () => {
  precargarDatos();
  loguearUser();
});

async function loguearUser() {
  const today = new Date();

  const { value: text } = await Swal.fire({
    input: "textarea",
    inputLabel: "Ingresar Nombre",
    inputPlaceholder: "Type your message here...",
    inputAttributes: {
      "aria-label": "Type your message here",
    },
    showCancelButton: true,
  });

  if (text) {
    menu.innerHTML = ``;
    Swal.fire(`Bienvenido ${text}\n elegí un juego`);
    if (usuarioExiste(text, users)) {
      localStorage.setItem("UserName", text);
    } else {
      const altaUser = {
        name: text,
        wins: 0,
        lost: 0,
        lastDatePlay: `${today.getDate()}-${
          today.getMonth() + 1
        }-${today.getFullYear()}`,
        estado: "true",
      };
      users.push(altaUser);
      localStorage.setItem("UserName", text);
      mantenerDatos();
    }
    modificarBtningreso();
    mostrarJuegos();
  } else if (text == "") {
    swal.fire("Ingrese nombre para poder jugar");
  }
}

// some devuelve true o false
function usuarioExiste(userInput, users) {
  return users.some((user) => userInput === user.name);
}

function mantenerDatos() {
  localStorage.setItem("Usuarios", JSON.stringify(users));
}

function precargarDatos() {
  if (localStorage.getItem("Usuarios") !== null) {
    users = JSON.parse(localStorage.getItem("Usuarios"));
  }
  // return (datosDeUsers = localStorage.getItem("Usuarios") ?? users);
}
function modificarBtningreso() {
  contenedorLoginBtn.setAttribute("class", "flex justify-end p-2");
  loginBtn.removeAttribute("style");
  loginBtn.setAttribute(
    "class",
    "bg-red-600 text-white rounded-md p-2 mt-2 mr-14"
  );
  loginBtn.textContent = "Cambiar de Usuario";
  loginBtn.addEventListener("click", () => {
    console.log("cambiar");
    menu.innerHTML = "";
    const screenGame = document.getElementById("game-mode");
    screenGame.innerHTML = "";
    mostrarJuegos();
  });
}

function mostrarInfoDeJuego(game) {
  game.jugar();
  const titulo = document.getElementById("tituloJuego");
  const desc = document.getElementById("desc");
  const genero = document.getElementById("gen");
  titulo.textContent = game.name;
  desc.textContent = game.description;
  genero.textContent = `Genero: ${game.genero}`;
}
function mostrarJuegos() {
  // -------------------boton del ahorcado------------------------
  const btnAhorcado = document.createElement("button");
  btnAhorcado.setAttribute("class", "bg-blue-600 text-white p-2 rounded-md");
  btnAhorcado.textContent = "Ahorcado";
  // --------------------------------------------------------------

  // ---------------boton de piedra papel o tijera------------------------
  const btnPPT = document.createElement("button");
  btnPPT.setAttribute("class", "bg-blue-600 text-white p-2 rounded-md");
  btnPPT.textContent = "Piedra papel o tijera";
  // -----------------------------------------------------------------

  //--------Generar los botones en pantalla---------------------
  menu.appendChild(btnAhorcado);
  menu.appendChild(btnPPT);
  //-------------------------------------------------------

  //----------------Eventos de botones-------------------
  btnPPT.addEventListener("click", () => {
    menu.removeChild(btnAhorcado);
    menu.removeChild(btnPPT);
    mostrarInfoDeJuego(dataGames[1]);
  });

  btnAhorcado.addEventListener("click", () => {
    menu.removeChild(btnAhorcado);
    menu.removeChild(btnPPT);
    mostrarInfoDeJuego(dataGames[0]);
  });
}
