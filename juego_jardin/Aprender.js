
var colorSeleccionado;
var circle;

// Espera a que la página y los recursos se carguen completamente
window.addEventListener("load", function() {
    // Crea los círculos una vez que la página se haya cargado
    createColorGame();

    // Obtiene referencia al botón de detener
    var stopButton = document.getElementById("stopButton");

    // Agrega un manejador de eventos para detener los audios cuando se haga clic en el botón de detener
    stopButton.addEventListener("click", function() {
        stopAudios();
    });

}); 

// Fin inicio pagina

// Variables para activar rápidamente las ventanas
var game1 = document.querySelector(".game1");
var game2 = document.querySelector(".game2");
// Inicialmente, oculta los círculos
hideCircles();
// Inicializar el juego activando Game1 (al cargar la página se empieza en el juego 1)
game1.classList.add("active");
// Termina variables para activar rápidamente las ventanas

// Crea el botón de comenzar
var button = document.createElement("div");
button.className = "btn";
button.textContent = "Comenzar/Repetir";

button.onclick = function() {
    playGame('comenzar');
};

var container = document.querySelector(".fondo_juego");

container.appendChild(button);

// Termina crear el botón de comenzar

// Empieza funcion de las ventanas
function playGame(gameType) {
    // Detener la reproducción de audio
    stopAudios();

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
    } else {
        alert('Juego no reconocido');
    }
}
// Termina funcion de las ventanas

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
    var circles = document.querySelectorAll(".circle");
    circles.forEach(function(circle) {
        circle.style.display = "block";
    });
}
// Fin función para mostrar los círculos

// Función para ocultar los círculos
function hideCircles() {
    var circles = document.querySelectorAll(".circle");
    circles.forEach(function(circle) {
        circle.style.display = "none";
    });
}
// Fin función para ocultar los círculos

// Crea círculos y les asigna colores diferentes
function createColorGame() {
    var colorGameContainer = document.querySelector(".juego");

    var circleContainer = document.createElement("div");
    circleContainer.className = "circle-container";
    var colors = ["green", "blue", "red", "yellow", "orange", "pink", "saddlebrown", "black", "blueviolet", "grey"]; 

    for (var i = 0; i < 10; i++) {
        circle = document.createElement("div"); 
        circle.className = "circle " + colors[i]; 
        circle.style.cursor = "pointer";
        circle.style.borderRadius = "50%";
        circle.style.width = "140px";
        circle.style.height = "140px";
        circle.style.backgroundColor = colors[i];

        // Agrega un evento click a cada círculo
        circle.addEventListener("click", function() {
            var clickedColor = this.getAttribute("class"); 
            playColorAudio(clickedColor.split(' ')[1]); 
        });

        circleContainer.appendChild(circle);
    }

    colorGameContainer.appendChild(circleContainer);
}

// Función para reproducir el audio correspondiente al color
function playColorAudio(color) {
    // Obtiene el elemento de audio correspondiente al color
    var audioElement = document.getElementById(color + "Audio");

    if (audioElement) {
        audioElement.play();
    }
}

