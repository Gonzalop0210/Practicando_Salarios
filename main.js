let id = Number(prompt("Escribe el id del cliente"));

const arrayNombres = [
    ["Gonzalo Palma", "Hijo"],
    ["Naomy Palma", "Hija"],
    ["Rex Rexito", "Mascota"],
    ["Hernán Palma", "Papá"],
    ["Marleny Rosas", "Mamá"]
];

let encontrado = false; // Variable para controlar si se encontró una coincidencia

for (let i = 0; i < arrayNombres.length; i++) {
    if (id == i) {
        console.log(arrayNombres[i][0]);
        console.log(arrayNombres[i][1]);
        encontrado = true; // Se encontró una coincidencia, establece la variable a true
        break;
    }
}

if (!encontrado) {
    console.log("No se encontraron clientes");
}
