/* console.log(salarios[0].name);
 */
/* let personaBuscada = "Julia";
 */
function encontrarMedianaSalarial(personaBuscada) {
    let seEncontro = false;
    for (let i = 0; i < salarios.length; i++) {
        if (personaBuscada == salarios[i].name) {
            let arrayDentro = salarios[i].trabajos;

            for (let i = 0; i < arrayDentro.length; i++) {
                if (arrayDentro.length % 2 == 0) {
                    let item = arrayDentro.length / 2;
                    let item2 = item + 1;
                    let md = (arrayDentro[item - 1].salario + arrayDentro[item2 - 1].salario) / 2;
                    seEncontro = true;
                    /* console.log("La mediana es: " + md); */
                    return "La mediana es: " + md;
                } else {
                    let item = (arrayDentro.length - 1) / 2;
                    let md = arrayDentro[item].salario;
                    seEncontro = true;
                    /* console.log("La mediana es: " + md); */
                    return "La mediana es: " + md;
                }
            }
            break;
        }
    }

    if (seEncontro == false) {
        return "No se encontro a ningún cliente!";
    }
}

console.log(encontrarMedianaSalarial("Julia"));

/* 
Proyeccion = Salaria Actual * (Tasa Crecimiento) ** años proyectados
Tasa Crecimiento = (sueldo inicial / sueldo final) ** (1 / diferencia de años trabajados) - 1
*/