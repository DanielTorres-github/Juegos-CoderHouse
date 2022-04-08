/*
1) Ingresar Nombre de jugador
2) Ingresar Nombre Jugador2
3) Ingresar valor Piedra(1), Papel(2) o Tijera(3) de Jugador
4) Ingresar valor Piedra(1), Papel(2) o Tijera(3) de Jugador2
5) Comparar valores
  5.1) Si valor de jugador 1 es mayor al de Jugador 2 Y es distinto de 3, suma un punto
  5.2) Si valor de jugador 2 es mayor al de Jugador Y es distinto de 3, suma un punto
6) Volver a jugar hasta que uno tenga 3 puntos 
*/

function piedraPapelTijera() {
  const screenGame = document.getElementById("game-mode");
  function pintarJuego() {
    screenGame.innerHTML = `<div>
    <h1 class="text-center text-sky-100 text-7xl m-4" id="tituloJuego"></h1>
    <div class="text-center space-x-8 flex justify-center">
      <p class="text-white" id="desc"></p>
      <p class="text-white" id="gen"></p>
      <div></div>
    </div>
    <div>

      <div
        class="conteiner border-solid border-2 border-sky-500 rounded-md justify-between"
        id="screen-game"
      >
        <p class="text-center text-sky-100 text-lg m-2" id="oponente"></p>
        <p class="text-center text-sky-100 text-lg" id="puntajes"></p>

        <img id="userImg" src="./img/piedrapapeltijera/rock.png" alt="" />
        <div class="text-center font-bold text-2xl text-white p-4" id="msj">
          <p>Elegí una opcion</p>
        </div>
        <img id="pcImg" src="./img/piedrapapeltijera/rock.png" alt="" />

        <div class="flex justify-center" id="group-btn">
          <button
            class="border-solid border-2 border-sky-500 rounded-md m-2 hover:bg-sky-700"
            id="rock"
            type="button"
          >
            <img src="./img/piedrapapeltijera/rock.png" alt="" />
          </button>

          <button
            class="border-solid border-2 border-sky-500 rounded-md m-2 hover:bg-sky-700"
            id="paper"
            type="button"
          >
            <img src="./img/piedrapapeltijera/paper.png" alt="" />
          </button>

          <button
            class="border-solid border-2 border-sky-500 rounded-md m-2 hover:bg-sky-700"
            id="scissors"
            type="button"
          >
            <img src="./img/piedrapapeltijera/scissors.png" alt="" />
          </button>
        </div>
      </div>
</div>`;
  }
  pintarJuego();
  const rock = "rock";
  const paper = "paper";
  const scissors = "scissors";

  let ptsPJ1 = 0;
  let ptsPJ2 = 0;

  const pjName = infoUser(localStorage.getItem("UserName"), users);
  console.log(pjName);
  let bName;

  const draw = "empate";
  const win = "ganaste";
  const lost = "perdiste";

  const rival = document.getElementById("oponente");
  const puntos = document.getElementById("puntajes");
  const groupBtn = document.getElementById("group-btn");
  const btnPiedra = document.getElementById("rock");
  const btnPapel = document.getElementById("paper");
  const btnTijera = document.getElementById("scissors");
  const resultText = document.getElementById("msj");
  const userImg = document.getElementById("userImg");
  const pcImg = document.getElementById("pcImg");

  btnPiedra.addEventListener("click", () => {
    jugar(pjName, rock);
  });
  btnPapel.addEventListener("click", () => {
    jugar(pjName, paper);
  });
  btnTijera.addEventListener("click", () => {
    jugar(pjName, scissors);
  });

  function randonName() {
    let url = `http://hp-api.herokuapp.com/api/characters`;
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        bName = data[Math.floor(Math.random() * data.length)].name;
        rival.innerHTML = `Tu oponente es ${bName}`;
      });
  }
  randonName();

  function infoUser(nombre, users) {
    // Find devuelve un elemento del array
    return users.find((user) => user.name == nombre);
  }

  function parsearOpciones() {
    const numero = Math.floor(Math.random() * 3) + 1;
    switch (numero) {
      case 1:
        return rock;
      case 2:
        return paper;
      case 3:
        return scissors;
    }
  }

  function jugar(pjName, userOption) {
    userImg.src = `./img/piedrapapeltijera/${userOption}.png`;
    resultText.innerHTML = `${bName}está eligiendo...`;

    const randomOptionFunction = setInterval(() => {
      const bOption = parsearOpciones();
      pcImg.src = `./img/piedrapapeltijera/${bOption}.png`;
    }, 100);
    setTimeout(() => {
      console.log(bName);
      clearInterval(randomOptionFunction);
      const bOption = parsearOpciones();
      pcImg.src = `./img/piedrapapeltijera/${bOption}.png`;
      const result = comparar(userOption, bOption);

      switch (result) {
        case draw:
          resultText.innerHTML = "Hubo un empate";
          puntos.innerHTML = `${pjName.name} ${ptsPJ1} - ${ptsPJ2} ${bName}`;
          console.log(bOption, " Empate " + ptsPJ1 + " " + ptsPJ2);
          break;
        case win:
          resultText.innerHTML = `${pjName.name} gana :)`;
          ptsPJ1 += 1;
          puntos.innerHTML = `${pjName.name} ${ptsPJ1} - ${ptsPJ2} ${bName}`;
          console.log(bOption, " Ganaste!! " + ptsPJ1 + " " + ptsPJ2);
          break;
        case lost:
          resultText.innerHTML = `${pjName.name} pierde :(`;
          ptsPJ2 += 1;
          puntos.innerHTML = `${pjName.name} ${ptsPJ1} - ${ptsPJ2} ${bName}`;
          console.log(bOption, "  Perdiste " + ptsPJ1 + " " + ptsPJ2);
          break;
      }
      setTimeout(() => {
        if (ptsPJ1 === 3) {
          pjName.wins++;
          mantenerDatos();
          finDePartida();
          resultText.innerHTML = `${pjName.name} ganaste el partido!`;
        } else if (ptsPJ2 === 3) {
          pjName.lost++;
          mantenerDatos();
          finDePartida();
          resultText.innerHTML = `${bName} ganó el partido. ${pjName.name} perdiste :(`;
        }
      }, 500);
    }, 1000);
    resultText.innerHTML = `${bName} está eligiendo...`;
  }

  function comparar(userOption, bOption) {
    if (userOption === bOption) {
      return draw;
    } else if (userOption === rock) {
      if (bOption === scissors) return win;
      if (bOption === paper) return lost;
    } else if (userOption === paper) {
      if (bOption === rock) return win;
      if (bOption === scissors) return lost;
    } else if (userOption === scissors) {
      if (bOption === paper) return win;
      if (bOption === rock) return lost;
    }
  }
  function finDePartida() {
    const btnPlayAgain = document.createElement("button");
    btnPlayAgain.setAttribute("type", "button");
    btnPlayAgain.setAttribute(
      "class",
      "bg-blue-600 text-white p-2 rounded-md m-2"
    );
    const btnSalir = document.createElement("button");
    btnSalir.setAttribute("type", "button");
    btnSalir.setAttribute("class", "bg-blue-600 text-white p-2 rounded-md m-2");
    puntos.innerText = `
    Total partidos ganados: ${pjName.wins}\n
    Total paridos perdidos: ${pjName.lost}
    `;
    pcImg.src = "";
    userImg.src = "";
    groupBtn.innerHTML = "";
    btnPlayAgain.innerHTML = "Volver a Jugar";
    btnSalir.innerHTML = "Salir";

    groupBtn.appendChild(btnPlayAgain);
    groupBtn.appendChild(btnSalir);

    btnPlayAgain.addEventListener("click", () => {
      mostrarInfoDeJuego(dataGames[1]);
    });
    btnSalir.addEventListener("click", () => {
      screenGame.innerHTML = "";
      mostrarJuegos();
    });
  }
}
