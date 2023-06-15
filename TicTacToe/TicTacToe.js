let turno = true;
let tablero;
let posicionesX = [];
let posicionesO = [];
let VictoriasO = 0;
let VictoriasX = 0;
let reinicio;
let boton;
let clasificacion;
let resultados;
let puntuacion;
let jugadorO;
let jugadorX;

//Contador
clasificacion = document.getElementsByClassName('container')[0];

resultados = document.createElement('div');

puntuacion = document.createElement('div');

jugadorX = document.createElement('div');
jugadorO = document.createElement('div');

p = document.createElement('p');
p2 = document.createElement('p');

resultados.setAttribute('class', 'resultados');

puntuacion.setAttribute('class', 'score');

jugadorO.setAttribute('class', 'jugador1');
jugadorX.setAttribute('class', 'jugador2');

resultados.textContent = 'Puntuación';

clasificacion.appendChild(resultados);

resultados.appendChild(puntuacion);

puntuacion.appendChild(jugadorX);
puntuacion.appendChild(jugadorO);

jugadorO.appendChild(p);
jugadorX.appendChild(p2);


//Tablero Juego
tablero = document.getElementsByClassName('casilla');

//Boton reinicio
reinicio = document.getElementsByClassName('fila')[1];
boton = document.createElement('button');

boton.setAttribute('class', 'reinicio');
boton.setAttribute('onclick', `ReinicioTablero()`);

boton.textContent = '¡Volver a jugar!';
reinicio.appendChild(boton);

combinacionGanadora = [
    [3, 4, 5],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

for (let i = 0; i < tablero.length; i++) {
    tablero[i].setAttribute('onclick', `pintaCasilla(${i})`);
}


function pintaCasilla(i) {

    if (turno) {
        tablero[i].textContent = 'X';
        posicionesX.push(i);
        posicionesX.sort();
        if (posicionesX.length >= 3) {
            hayGanador(posicionesX);

        }
    } else {
        tablero[i].textContent = 'O';
        posicionesO.push(i);
        posicionesO.sort();
        if (posicionesO.length >= 3) {
            hayGanador(posicionesO);

        }
    }
    tablero[i].removeAttribute('onclick');
    turno = !turno;
}


function hayGanador(posicionesXO) {

    //CombinaciónGanadora es un array con todas las combinaciones que dan resultado correcto
    for (let i = 0; i < combinacionGanadora.length; i++) {
        //Posiciones es un array con cada una de las posiciones que contiene el array
        let contador = 0;
        for (let j = 0; j < posicionesXO.length; j++) {
            if (combinacionGanadora[i].includes(posicionesXO[j])) {
                contador++;
            }
        }
        if (contador == 3) {

            //¿Quién gana? X u O
            // Si he detectado cual es la combinación ganadora, la recorro y pinto
            if (turno) {
                VictoriasX++;
                p.textContent = "Jugador X: " + VictoriasX + ' victoria ';
                alert('¡Victoria para X! Tiene en su casillero ' + VictoriasX + ' victorias');
                finalizar();


            } else {
                VictoriasO++;
                p2.textContent = "Jugador O: " + VictoriasO + ' victoria ';
                alert('¡Victoria para O! Tiene en su casillero ' + VictoriasX + ' victorias');
                finalizar();
            }

            for (let k = 0; k < combinacionGanadora[i].length; k++) {
                tablero[combinacionGanadora[i][k]].style.backgroundColor = 'grey';
            }
        }

    }

}

function ReinicioTablero() {
    for (let i = 0; i < tablero.length; i++) {
        tablero[i].textContent = ' ';
        tablero[i].setAttribute('onclick', `pintaCasilla(${i})`);
        tablero[i].style.backgroundColor = 'lightgrey';
        posicionesO = [];
        posicionesX = [];
        turno = true;
    }

}


function finalizar() {
    for (let i = 0; i < tablero.length; i++) {
        tablero[i].removeAttribute('onclick');
    }
}
