// Declarar variables globales para el audio color y circulos
var bienvenidaAudio;
var colorSeleccionado;
var circle;
// Fin


// Espera a que la página y los recursos se carguen completamente
window.addEventListener("load", function() {
    // Crea los círculos una vez que la página se haya cargado
    createMemoryGame();

    // Obtiene referencia al botón de inicio y al botón de detener
    var startButton = document.getElementById("startButton");
    var stopButton = document.getElementById("stopButton");

    // Crea el elemento de audio de bienvenida
    bienvenidaAudio = document.getElementById("bienvenidaAudio");
    bienvenidaAudio.volume = 0.3;

    // Agrega un manejador de eventos para reproducir el audio cuando se haga clic en el botón de inicio
    startButton.addEventListener("click", function() {
        startButton.style.display = "none";
        if (bienvenidaAudio) {
            bienvenidaAudio.play();
        }
    });

    // Agrega un manejador de eventos para detener los audios cuando se haga clic en el botón de detener
    stopButton.addEventListener("click", function() {
        stopAudios();
    });

}); 

// Fin inicio pagina



// Variables para activar rapido las ventanas
var game1 = document.querySelector(".game1");
var game2 = document.querySelector(".game2");
    // Inicialmente, oculta los círculos
    hideCircles();
// Inicializar el juego activando Game1 (al cargar la pagína se empieza en el juego 1)
game1.classList.add("active");
// Termina variables para activar rapido las ventanas




// Crea el boton de comenzar
var button = document.createElement("div");
button.className = "btn";
button.textContent = "Comenzar/Repetir";

button.onclick = function() {
    playGame('comenzar');
};

var container = document.querySelector(".fondo_juego");

container.appendChild(button);

// Termina crear el boton de comenzar




// Empieza funcion de las ventanas
function playGame(gameType) {
    audioElement = document.getElementById("greenAudio"); // Se inicializa un audio aleatorio para así pausarlo

    
    // Detener la reproducción de audio
    if (audioElement) {
        audioElement.pause();
        audioElement.currentTime = 0; // Reiniciar la reproducción al principio
    } else {
        console.error("Elemento de audio no encontrado");
    }


    // Desactivar ambos juegos
    game1.classList.remove("active");
    game2.classList.remove("active");

    if (gameType === 'escucha') {
        game1.classList.add("active"); 
        showCircles(); 
        button.style.display = "block";
    } else if (gameType === 'comenzar') {
        game1.classList.add("active");
        seleccionarYEliminarColorAleatorio();
    } else if (gameType === 'observa') {
        game2.classList.add("active"); 
        hideCircles(); 
        button.style.display = "none";
    }else if (gameType === 'comenzar') {
        game2.classList.add("active");
    } else {
        alert('Juego no reconocido');
    }
}
// Termina funcion de las ventanas

// EMPIEZA JUEGO 1
// EMPIEZA JUEGO 1
// EMPIEZA JUEGO 1
// EMPIEZA JUEGO 1
// EMPIEZA JUEGO 1

// Funcion para parar audios
function stopAudios() {
    var audioElements = document.querySelectorAll("audio");
    audioElements.forEach(function(audio) {
        audio.pause();
    });
}
// Fin funcion para parar audios


// Función para mostrar los círculos
function showCircles() {
    var circles = document.querySelectorAll(".green, .blue, .red, .yellow, .orange, .pink, .saddlebrown, .black, .blueviolet, .grey");
    circles.forEach(function(circle) {
        circle.style.display = "block";
    });
}
// Fin función para mostrar los círculos


// Función para ocultar los círculos
function hideCircles() {
    var circles = document.querySelectorAll(".green, .blue, .red, .yellow, .orange, .pink, .saddlebrown, .black, .blueviolet, .grey");
    circles.forEach(function(circle) {
        circle.style.display = "none";
    });
}
// Fin función para ocultar los círculos



// Crea circulos y les asigna colores diferentes
function createMemoryGame() {
    var memoryGameContainer = document.querySelector(".juego");

    var circleContainer = document.createElement("div");
    circleContainer.className = "circle-container";
    var colors = ["green", "blue", "red", "yellow", "orange", "pink", "saddlebrown", "black", "blueviolet", "grey"]; 

    for (var i = 0; i < 10; i++) {
        circle = document.createElement("div"); 
        circle.className = colors[i]; 
        circle.style.cursor = "pointer";
        circle.style.borderRadius = "50%";
        circle.style.width = "140px";
        circle.style.height = "140px";
        circle.style.backgroundColor = colors[i];

        // Agrega un evento click a cada círculo
        circle.addEventListener("click", function() {
            var clickedColor = this.getAttribute("class"); 
            borrarCircle(clickedColor, this); 
        });

        circleContainer.appendChild(circle);
    }

    memoryGameContainer.appendChild(circleContainer);
}
// Termina crear circulos y les asigna colores diferentes




// Empieza acertar color y borrarlo

//Array con los colores
var coloresDisponibles = ["green", "blue", "red", "yellow", "orange", "pink", "saddlebrown", "black", "blueviolet", "grey"];


// Función para seleccionar aleatoriamente un color
function obtenerIndiceAleatorio(array) {
    return Math.floor(Math.random() * array.length);
}

// clona la lista de colores disponibles para su selección aleatoria (se crea para modificar este valor y no el original, asi al recargar la página los audios también volverán a aparecer)
var coloresParaSeleccion = coloresDisponibles.slice();

function seleccionarYEliminarColorAleatorio() {
    if (coloresParaSeleccion.length === 0) {
        alert("Ya se han seleccionado todos los colores.");
        return;
    }

    var indiceAleatorio = obtenerIndiceAleatorio(coloresParaSeleccion);
    colorSeleccionado = coloresParaSeleccion[indiceAleatorio]; // Asigna a la variable global

    // Obtener el elemento de audio correspondiente
    var audioElement = document.getElementById(colorSeleccionado + "Audio");

    audioElement.play(); // Reproduce

    // Elimina el color seleccionado de la lista
    coloresParaSeleccion.splice(indiceAleatorio, 1);
}
// Termina acertar color y borrarlo


// Empieza funcion borrar circulos


// Agrega un evento click a cada círculo
circle.addEventListener("click", function() {
    var clickedColor = this.getAttribute("class"); // Obtén el color del atributo de clase
    borrarCircle(clickedColor, this); // Llama a borrarCircle pasando el color y el elemento del círculo
});



// Borrar circulos al acertar
function borrarCircle(color, circleElement) {
    if (color === colorSeleccionado) {
        // Verifica si el elemento del círculo coincide con el círculo que se hizo clic
        if (circleElement) {
            circleElement.style.display = "none"; // Oculta el círculo si coincide
        }
    }
}

// TERMINA JUEGO 1
// TERMINA JUEGO 1
// TERMINA JUEGO 1
// TERMINA JUEGO 1