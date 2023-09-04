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

function proyeccionSalarial(personaBuscada) {
    let encontrado = false;
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
            encontrado = true;
            return "La proyección salarial para el próximo año de " + element.name + " es: " + Math.round(proyeccionSalarial);
        }
    }

    if (!encontrado) {
        return "Empleado no encontrado";
    }
}

/* Primera forma de ordenar por empresa */
function ordenadoPorEmpresa(empresa) {
    let arrayEmpresas = [];
    for (let element of salarios) {
        let arrayTrabajos = element.trabajos;
        let encontrado = false;
        let arrayPersonalPorEmpleado = {};
        let arrayEmpresaPorEmpleado = [];
        for (let prop of arrayTrabajos) {
            if (encontrado == false) {
                arrayPersonalPorEmpleado.name = element.name;
                encontrado = true;
            }
            if (prop.empresa == empresa) {
                arrayEmpresaPorEmpleado.push(prop);
            }
        }
        if (arrayEmpresaPorEmpleado.length != 0) {
            arrayPersonalPorEmpleado.description = arrayEmpresaPorEmpleado;
            arrayEmpresas.push(arrayPersonalPorEmpleado);
        }
    }
    return arrayEmpresas;
}

/* Ordenamiento según Platzi */
let objetoEmpresas = {};
for (let persona of salarios) {
    for (let trabajo of persona.trabajos) {
        if (!objetoEmpresas[trabajo.empresa]) {
            objetoEmpresas[trabajo.empresa] = {};
        };
        if (!objetoEmpresas[trabajo.empresa][trabajo.year]) {
            objetoEmpresas[trabajo.empresa][trabajo.year] = [];
        };
        objetoEmpresas[trabajo.empresa][trabajo.year].push(trabajo.salario);
    };
};

function medianaPorYearporEmpresa(empresa, year) {
    /* Freelance 2021 550 */
    if (!objetoEmpresas[empresa]) {
        console.warn("La empresa que esta buscando no existe");
    } else if (!objetoEmpresas[empresa][year]) {
        const fechaActual = Date();
        const yearActual = fechaActual.getFullYear();
        if (year > yearActual) {
            console.warn("Vienes del futuro o que?");
        } else {
            console.warn("Año inválido");
        };
    } else {
        let arraySalariosEmpresas = objetoEmpresas[empresa][year];
        if (arraySalariosEmpresas.length % 2 == 0) {
            let md = (arraySalariosEmpresas[arraySalariosEmpresas.length / 2] + arraySalariosEmpresas[(arraySalariosEmpresas.length / 2) - 1]) / 2;
            return md;
        } else {
            let mdi = arraySalariosEmpresas[Math.floor(arraySalariosEmpresas.length / 2)];
            return mdi;
        };
    };
};

console.log(objetoEmpresas);

function proyeccionSalarialEmpresa(empresa) {
    let arrayPromedioSalarioAnuales = [];
    let porcentajeEntreYearAndYear = [];
    if (!objetoEmpresas[empresa]) {
        console.warn("La empresa que está buscando no existe");
    } else {
        for (let year in objetoEmpresas[empresa]) {
            let arraySalarios = objetoEmpresas[empresa][year];
            let sumaSalarios = arraySalarios.reduce((acum, actual) => acum + actual, 0);
            let promedioSalarios = sumaSalarios / arraySalarios.length;
            arrayPromedioSalarioAnuales.push(Math.round(promedioSalarios));
        };
    };
    for (let i = 1; i < arrayPromedioSalarioAnuales.length; i++) {
        let valorPasado = arrayPromedioSalarioAnuales[i-1];
        let valor = arrayPromedioSalarioAnuales[i];

        let tasaCrecimiento = ((valor - valorPasado) / valorPasado);
        let tasaCrecimientoAgregar = parseFloat(tasaCrecimiento.toFixed(2));
        porcentajeEntreYearAndYear.push(tasaCrecimientoAgregar);
    };
    let sumaPorcentajes = porcentajeEntreYearAndYear.reduce((acum, valor) => acum + valor, 0);
    let promedioPorcentajes = sumaPorcentajes / porcentajeEntreYearAndYear.length;
    let tasaAumento = parseFloat(promedioPorcentajes.toFixed(2));
    /* Proyección Salarial = Salario Actual + (Salario Actual * Tasa de Aumento) */
    let ultimoSalario = 0;
    for (let sal of arrayPromedioSalarioAnuales) {
        ultimoSalario = sal;
    }
    let proyeccionPorEmpresaAnual = ultimoSalario + (ultimoSalario * (tasaAumento));
    return "La proyección para el próximo año es de: " + Math.round(proyeccionPorEmpresaAnual);
};

/* 
    TODO: Para realizar un top, lo primero que tengo que hacer es obtener todos los salarios y luego sacar los 10 salarios más altos de cada empresa.
*/

