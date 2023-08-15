const $btn_promediar = document.querySelector('#btn_promediar');
const $btn_siguiente = document.querySelector('#btn_siguiente');
const $input = document.querySelector('#num_input');
const $text = document.querySelector('.text');

$input.addEventListener("input", function(event) {
    const $valorInput = event.target.value;
    let $valorNumerico = $valorInput.replace(/[^0-9]/g, '');
    if($valorNumerico > 20) {
        alert("La nota máxima es 20");
    } else if ($valorNumerico < 0) {
        alert("La nota mínima es 0");
    }
    $valorNumerico = Math.min(20, Math.max(0, $valorNumerico));
    event.target.value = $valorNumerico;
});

let $clickCount = 0;
const arrayNotas = [];

$text.textContent = "Ingrese su nota actitudinal: ";

$btn_siguiente.addEventListener("click", function(){
    let $getInputNumber = Number($input.value);
    if ($clickCount == 0) {
        arrayNotas.push($getInputNumber);
        $input.value = "";
        $text.textContent = "Ingrese la nota de su trabajo: ";
    } else if ($clickCount == 1) {
        arrayNotas.push($getInputNumber);
        $input.value = "";
        $text.textContent = "Ingrese su nota final: ";
    } else if ($clickCount == 2) {
        arrayNotas.push($getInputNumber);
        $text.textContent = "Todas las notas ingresadas satisfactoriamente";
        $btn_siguiente.disabled = true;
        $btn_siguiente.classList.add("button_disabled");
        $input.style.display = "none";
    }
    $clickCount++;
});

const $respuesta = document.querySelector(".respuesta");
const $text_respuesta = document.querySelector(".text_respuesta");
const $icon = document.querySelector(".icon");
const $container_respuesta = document.querySelector(".container_respuesta_icon");

$btn_promediar.addEventListener("click", function() {
    let suma = 0;
    arrayNotas.forEach(function(numeros) {
        suma += numeros;
    });
    let $promedioFinal = Math.round(suma / arrayNotas.length);
    if ($promedioFinal >= 0 && $promedioFinal <= 10) {
        let $notaFinal = $respuesta.textContent = $promedioFinal;
        $text_respuesta.textContent = "Promedio final: " + $notaFinal;
        $icon.classList.add("fa-regular");
        $icon.classList.add("fa-face-sad-cry")
        $text_respuesta.style.color = "#C41717";
        $icon.style.color = "#C41717";
    } else if ($promedioFinal >= 11 && $promedioFinal <= 14) {
        let $notaFinal = $respuesta.textContent = $promedioFinal;
        $text_respuesta.textContent = "Promedio final: " + $notaFinal;
        $icon.classList.add("fa-regular");
        $icon.classList.add("fa-face-meh");
        $text_respuesta.style.color = "#02BD27";
        $icon.style.color = "#02BD27";
    } else if ($promedioFinal >= 15 && $promedioFinal <= 20) {
        let $notaFinal = $respuesta.textContent = $promedioFinal;
        $text_respuesta.textContent = "Promedio final: " + $notaFinal;
        $icon.classList.add("fa-regular");
        $icon.classList.add("fa-face-smile-wink");
        $text_respuesta.style.color = "#1000D1";
        $icon.style.color = "#1000D1";
    }
    $container_respuesta.classList.remove("ocultar");
});