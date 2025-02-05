const tablero = document.getElementById("tablero");
const mensaje = document.getElementById("mensaje");

// Elementos de audio
const sonidoAcierto = document.getElementById("sonidoAcierto");
const sonidoError = document.getElementById("sonidoError");
const sonidoVictoria = document.getElementById("sonidoVictoria");

// Lista de imágenes (deben ser pares)
const imagenes = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNe9CZr3W7chzCps5tu8rzJAlK8RAJovjCHw&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNe9CZr3W7chzCps5tu8rzJAlK8RAJovjCHw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJLl455lBgCABHibNCwfs_ZdDD_cu_2Lx2gLZuh0qodla41Bpx_zMqsHgBnO8NlOF_U_Y&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJLl455lBgCABHibNCwfs_ZdDD_cu_2Lx2gLZuh0qodla41Bpx_zMqsHgBnO8NlOF_U_Y&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVFgaU9IL4AsSCi6dULLBiPXvt2Wz4sYiS3_wUw4w98VZkV6uZxdbwFp-OxX-hLzyp9yc&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVFgaU9IL4AsSCi6dULLBiPXvt2Wz4sYiS3_wUw4w98VZkV6uZxdbwFp-OxX-hLzyp9yc&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScN8ejk4u7lVjE9bskGqrCG5WoE1cKpu_lutgIsbNtmsPvCIpWMYVVny74tiYJ3UoWAus&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScN8ejk4u7lVjE9bskGqrCG5WoE1cKpu_lutgIsbNtmsPvCIpWMYVVny74tiYJ3UoWAus&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTezGFkEdOB_lv-rCQVb4R9tZZWYNkYMJ4wn9H7H8aMX0yhCHVXV8aBss9uLJ3oFYX_qX0&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTezGFkEdOB_lv-rCQVb4R9tZZWYNkYMJ4wn9H7H8aMX0yhCHVXV8aBss9uLJ3oFYX_qX0&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ90jsgPbkitJtVzyDRZe-e2FviYeDwnjbqgmJiSIiB4ML0DU-qWPYHYp6wj2S5lVOTY5k&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ90jsgPbkitJtVzyDRZe-e2FviYeDwnjbqgmJiSIiB4ML0DU-qWPYHYp6wj2S5lVOTY5k&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLVx9nzNRgVPUd6f3MvGtKTsVBZ0642cAzQ5FW3A2-2wggsnUKTtjMkgQkaPt9I5Lgh8&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLVx9nzNRgVPUd6f3MvGtKTsVBZ0642cAzQ5FW3A2-2wggsnUKTtjMkgQkaPt9I5Lgh8&usqp=CAU",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLMIt2OmY-S0QDSEldYhu2pTUqj63xfFOaEIAYSx-23StBwehmSJx9SRjNnZROtFqJqv8&usqp=CAU", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLMIt2OmY-S0QDSEldYhu2pTUqj63xfFOaEIAYSx-23StBwehmSJx9SRjNnZROtFqJqv8&usqp=CAU"
];

// Mezclar las imágenes
function mezclarImagenes(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Crear las cartas
function crearCartas() {
    const imagenesMezcladas = mezclarImagenes(imagenes);
    imagenesMezcladas.forEach((imagen, index) => {
        const carta = document.createElement("div");
        carta.classList.add("carta");
        carta.dataset.indice = index;
        carta.dataset.imagen = imagen;

        const img = document.createElement("img");
        img.src = imagen;
        carta.appendChild(img);

        carta.addEventListener("click", voltearCarta);
        tablero.appendChild(carta);
    });
}

// Variables para controlar el juego
let cartasVolteadas = [];
let bloqueado = false;

// Función para voltear una carta
function voltearCarta(event) {
    if (bloqueado) return;

    const carta = event.currentTarget;
    if (carta.classList.contains("volteada") || cartasVolteadas.length === 2) return;

    carta.classList.add("volteada");
    cartasVolteadas.push(carta);

    if (cartasVolteadas.length === 2) {
        verificarCoincidencia();
    }
}

// Función para verificar si las cartas coinciden
function verificarCoincidencia() {
    bloqueado = true;

    const [carta1, carta2] = cartasVolteadas;
    if (carta1.dataset.imagen === carta2.dataset.imagen) {
        // Coinciden
        sonidoAcierto.play(); // Reproduce el sonido de acierto
        cartasVolteadas = [];
        bloqueado = false;

        // Verificar si todas las cartas están volteadas
        if (document.querySelectorAll(".carta.volteada").length === imagenes.length) {
            sonidoVictoria.play(); // Reproduce el sonido de victoria
            mensaje.textContent = "¡Felicidades, ganaste!";
        }
    } else {
        // No coinciden, voltear de nuevo después de un breve retraso
        sonidoError.play(); // Reproduce el sonido de error
        setTimeout(() => {
            carta1.classList.remove("volteada");
            carta2.classList.remove("volteada");
            cartasVolteadas = [];
            bloqueado = false;
        }, 1000);
    }
}

// Iniciar el juego
crearCartas();

