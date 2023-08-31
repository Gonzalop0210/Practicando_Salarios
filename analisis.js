/* console.log(salarios[0]); */

/* let personaBuscada = "Julia"; */

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
                    return md;
                } else {
                    let item = (arrayDentro.length - 1) / 2;
                    let md = arrayDentro[item].salario;
                    seEncontro = true;
                    /* console.log("La mediana es: " + md); */
                    return md;
                }
            }
            break;
        }
    }

    if (seEncontro == false) {
        return "No se encontro a ningún cliente!";
    }
}

/* console.log(encontrarMedianaSalarial("Juanita")); */

/* 
Proyeccion = Salaria Actual * (Tasa Crecimiento) ** años proyectados
Tasa Crecimiento = (sueldo inicial / sueldo final) ** (1 / diferencia de años trabajados) - 1
*/

function proyeccionSalarial(personaBuscada) {
    for (let element of salarios) {
        let arrayTrabajos = element.trabajos;
        if (element.name == personaBuscada) {
            arrayTrabajos.sort((a,b) => a.year - b.year);
            let arrayporcentajeCrecimientoAnual = []
            for (let i = 1; i < arrayTrabajos.length; i++) {
                let salarioPasado = arrayTrabajos[i - 1].salario;
                let salarioNuevo = arrayTrabajos[i].salario;
                let porcentajeCrecimientoAnual = ((salarioNuevo - salarioPasado) / salarioPasado) * 100;
                arrayporcentajeCrecimientoAnual.push(porcentajeCrecimientoAnual);
            }
            let sumaTasasCrecimiento = arrayporcentajeCrecimientoAnual.reduce((acum, num) => acum + num);
            let promedioTasasCrecimiento = sumaTasasCrecimiento / arrayporcentajeCrecimientoAnual.length;
            let ultimoSalario = 0;
            for (let prop of arrayTrabajos) {
                ultimoSalario = prop.salario;
            }
            let proyeccionSalarial =ultimoSalario + (ultimoSalario * (promedioTasasCrecimiento / 100));
            return "La proyección salarial para el próximo año de " + element.name + " es: " + Math.round(proyeccionSalarial);
        }
    }
}

let persona = "Rigoberto";
console.log(proyeccionSalarial(persona));
console.log(encontrarMedianaSalarial(persona));