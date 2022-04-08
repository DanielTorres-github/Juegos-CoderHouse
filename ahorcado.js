/*
0. Se elige palabra al azar
1. Ingresar una letra 
2. Revisar si la letra se encuentra en la palabra
3. Dar devolucion de la letra 
4. Repetir hasta que haya 7 errores 
*/
// function mostrarInfo() {
//   console.log("Vidas: ", vidas);
//   console.log("Letras ingresadas ", letrasIngresadas);
//   console.log("Letras correctas ", letrasCorrectas);
// }

// function chequearPalabra(letraJugador, palabraIngresada) {
//   if (letrasIngresadas.includes(letraJugador)) {
//     console.log("Letra ya ingresada");
//   } else if (palabraIngresada.includes(letraJugador)) {
//     for (i = 0; i <= palabraIngresada.length; i++) {
//       if (palabraIngresada[i] == letraJugador) {
//         letrasCorrectas[i] = letraJugador;
//         aciertos++;
//       }
//     }
//   } else {
//     letrasIngresadas.push(letraJugador);
//     vidas = vidas - 1;
//   }
// }

// function ahorcado(palabraIngresada) {
//   let letraJugador = prompt(
//     `La palabra tiene ${palabraIngresada.length} letras\n
//     ${jugador1} Ingrese una letra`
//   ).toLowerCase();
//   chequearPalabra(letraJugador, palabraIngresada);
//   if (vidas == 0) {
//     console.log(`${jugador1} PERDISTE!! GANA ${jugador2}`);
//   }
//   mostrarInfo();
// }

// const jugador1 = prompt("Ingrese Nombre Jugador 1");
// const jugador2 = prompt("Ingrese Nombre Jugador 2");
// const palabra = prompt(
//   `${jugador2} Ingrese una palabra para que adivine ${jugador1}`
// ).toLowerCase();
// let vidas = 6;
// let aciertos = 0;
// const palabraArray = [...palabra];
// const letrasIngresadas = [];
// const letrasCorrectas = [];

// while (vidas != 0) {
//   ahorcado(palabraArray);
//   if (palabraArray.length == aciertos) {
//     console.log(`${jugador1} GANASTE!! `);
//     break;
//   }
// }

// palabraRandom();
// setTimeout(()=>{
//   console.log(palabra)
// },1000)
const abc = "abcdefghijklmnñopqrstuvwxyz";
const abcArray = [...abc];
let palabra;
let palabraArray = [];
const letrasCorrectas = [];
let faltas = 0;
let cuadroLetras;
let pjName;

const maxvidas = 6;
const screenGame = document.getElementById("game-mode");

function hangman() {
  faltas = 0;
  pjName = infoUser(localStorage.getItem("UserName"), users);

  screenGame.innerHTML = `
  <div>
  <h1 class="text-center text-sky-100 text-7xl m-4" id="tituloJuego"></h1>
  <div class="text-center space-x-8 flex justify-center">
    <p class="text-white" id="desc"></p>
    <p class="text-white" id="gen"></p>
    <div></div>
  </div>
  <div>
    <div
      class="conteiner border-solid border-2 border-sky-500 rounded-md justify-between mb-4"
      id="screen-game"
    >
      <div class="text-center text-sky-100 text-lg align-middle m-4">Intento <span id="fallos">${faltas}</span> de <span id="vidas"></span></div>
      <div class="flex justify-center align-middle" style="height:282px" id="imgContainer"><img id="hangImg" src="./img/ahorcado/0.png"></div>
      <div class=" flex justify-center text-center font-bold text-2xl text-white p-4" id="msj">
      </div>

      <div class=" flex flex-wrap justify-center" id="group-btn">
      </div>
    </div>
  </div>`;

  const vidas = document.getElementById("vidas");
  vidas.innerText = `${maxvidas}`;

  const palabraHide = document.getElementById("msj");

  function palabraRandom() {
    palabraHide.innerHTML = "Eligiendo palabra...";
    let url = `https://palabras-aleatorias-public-api.herokuapp.com/random`;
    return fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        palabra = data.body.Word;
        palabraArray = [...palabra];
        palabraArray.forEach(() => {
          letrasCorrectas.push("");
        });
        console.log(letrasCorrectas);
      });
  }

  palabraRandom().then(() => {
    palabraHide.innerHTML = "";
    palabraArray.forEach((element) => {
      const span = document.createElement("span");
      span.innerHTML = `
          <span
            class="text-center font-bold text-white p-4 border-b-4 m-2"
            style="width:100%; heigth:25px"
          >
            <span class="letraWord${element}" style="visibility:hidden">${element}</span>
          </span>
        `;
      palabraHide.appendChild(span);
    });
    console.log(palabra);
    console.log(palabraArray);
  });
  generarTeclado();
}

function infoUser(nombre, users) {
  // Find devuelve un elemento del array
  return users.find((user) => user.name == nombre);
}

function desactivarBtn(letra, color) {
  const btnMalo = document.querySelector(`.btnLetra${letra}`);
  console.log("desactivar");
  btnMalo.setAttribute(
    "class",
    `btnLetra bg-${color}-500 text-white rounded-md p-4 m-2 disabled`
  );
  btnMalo.removeAttribute("onClick");
}

function mostrarLetraCorrecta(letra) {
  document.querySelectorAll(`.letraWord${letra}`).forEach((element) => {
    element.removeAttribute("style");
  });
}

function compararPalabra(letra, array) {
  if (array.includes(letra)) {
    for (i = 0; i <= array.length; i++) {
      if (array[i] == letra) {
        letrasCorrectas[i] = letra;
        console.log(letrasCorrectas);
      }
    }
  }
  if (JSON.stringify(letrasCorrectas) === JSON.stringify(palabraArray)) {
    pjName.wins++;
    mantenerDatos();
    terminarJuego("GANASTE");
  }
}

function generarTeclado() {
  cuadroLetras = document.getElementById("group-btn");

  abcArray.forEach((element) => {
    const div = document.createElement("button");
    div.setAttribute(
      "class",
      `btnLetra${element} bg-blue-600 text-white rounded-md p-4 m-2 hover:bg-violet-400`
    );
    div.setAttribute("onClick", `chequearLetra('${element}')`);
    div.innerHTML = `${element}`;
    cuadroLetras.appendChild(div);
  });
}

function terminarJuego(resultado) {
  const msj = document.getElementById("msj");
  const imgContainer = document.getElementById("imgContainer");
  imgContainer.setAttribute(
    "class",
    "text-center text-sky-100 text-lg align-middle m-4"
  );
  imgContainer.innerText = `${resultado}`;
  cuadroLetras.innerHTML = "";

  const btnPlayAgain = document.createElement("button");
  btnPlayAgain.setAttribute("type", "button");
  btnPlayAgain.setAttribute(
    "class",
    "bg-blue-600 text-white p-2 rounded-md m-2"
  );
  const btnSalir = document.createElement("button");
  btnSalir.setAttribute("type", "button");
  btnSalir.setAttribute("class", "bg-blue-600 text-white p-2 rounded-md m-2");
  msj.innerText = `
    Total partidos ganados: ${pjName.wins}\n
    Total paridos perdidos: ${pjName.lost}
    `;
  btnPlayAgain.innerHTML = "Volver a Jugar";
  btnSalir.innerHTML = "Salir";

  cuadroLetras.appendChild(btnPlayAgain);
  cuadroLetras.appendChild(btnSalir);

  btnPlayAgain.addEventListener("click", () => {
    imgContainer.innerHTML = `<img id="hangImg" src="./img/ahorcado/0.png"></img>`;
    mostrarInfoDeJuego(dataGames[0]);
  });
  btnSalir.addEventListener("click", () => {
    screenGame.innerHTML = "";
    mostrarJuegos();
  });
}

function chequearLetra(letra) {
  console.log(letra);

  const errorres = document.getElementById("fallos");

  if (palabraArray.includes(letra)) {
    console.log("tengo");
    mostrarLetraCorrecta(letra);
    desactivarBtn(letra, "green");
    compararPalabra(letra, palabraArray);
  } else {
    console.log("notengo");
    desactivarBtn(letra, "red");
    faltas += 1;
    errorres.innerText = `${faltas}`;
    console.log(faltas);
    const img = document.getElementById("hangImg");
    img.src = `./img/ahorcado/${faltas}.png`;
    if (faltas === maxvidas) {
      pjName.lost++;
      mantenerDatos();
      terminarJuego("PERDISTE");
    }
  }
}
