getFetch()
async function getFetch() {

    await fetch(APIurl)
            .then(res => res.json() )
            .then(data => {


                let eventos = data.events;  // guardo mis eventos 

                const eventsPast = eventos.filter(evento => dateReturn(data.currentDate) > dateReturn(evento.date));
                const eventsFuture = eventos.filter(evento => dateReturn(data.currentDate) < dateReturn(evento.date));

                let arraySortedPast = calcPercentageAttendance(eventsPast);

                let arraySortedCapacity = calcCapacity(eventos);

                let arrayCategorysFuture = calcCategory(eventsFuture);
                let arrayCategorysPast = calcCategory(eventsPast);

                let arrayTableEvents = [];

                arrayTableEvents.push( arraySortedPast[arraySortedPast.length - 1] );
                arrayTableEvents.push( arraySortedPast[0] )
                arrayTableEvents.push( arraySortedCapacity[arraySortedCapacity.length - 1] )


                printTableEvents(arrayTableEvents, tableEvents);

                printTableCategory(arrayCategorysFuture, tableUpcomming);
                printTableCategory(arrayCategorysPast, tablePast);

                

            })
}

function printTableEvents(arrayDatos, contenedorTable) {

    let resultado = []

    arrayDatos.forEach(evento => {

        if (evento.capacity) {

            // let mayorCapacity = `${evento.name}: ${evento.capacity}`;

            resultado.push(`${evento.name}: ${evento.capacity}`);

        } else {

            resultado.push(`${evento.name} with %${evento.percentage} of assistance`)
            // percentage.push(evento)
        }
    })

    // console.log(resultado);

    let contenedorFilas = document.createElement('tr');

    resultado.forEach(elemento => {

        let filaElemento = document.createElement('td');

        filaElemento.classList.add('p-2');
        filaElemento.innerHTML = elemento;
        contenedorFilas.appendChild(filaElemento);

    })

    contenedorTable.appendChild(contenedorFilas);
}

function printTableCategory(arrayCategorias, contenedorPrint){


    arrayCategorias.forEach(arrayCategorias => {

        printTableUpcoming(gananciaTotal(arrayCategorias), contenedorPrint )

    })

}

function gananciaTotal(arrayCategorias) {

    let categorys = arrayCategorias.map(evento => evento.category);

    const [title] = Array.from(new Set(categorys) );

    const assitOrEstimate = arrayCategorias.reduce((total, evento) => evento.assistance ? total + Number(evento.assistance) : total + Number(evento.estimate), 0);
    // console.log(`Estimate Total: ${estimateTotal}`);

    const capacityTotal = arrayCategorias.reduce((total, evento) => total + Number(evento.capacity), 0);
    // console.log(`Capacidad Total: ${capacityTotal}`);

    const percentageTotal = ( assitOrEstimate * 100 ) / capacityTotal; 

    // console.log(`El total estimado de asistencia: ${ percentageTotal.toFixed(3) }%`);
    
    // const priceTotal = arrayCategorias.reduce((total, evento) => total + (evento.estimate * evento.price), 0);



    const priceTotal = arrayCategorias.reduce((total, evento) => evento.assistance ? total + (evento.assistance * evento.price) : total + (evento.estimate * evento.price), 0)


    

    
    // console.log(priceTotal/arrayCategorias.length);


    // let resultado = [title, percentageTotal.toFixed(3), priceTotal / arrayCategorias.length];
    // let resultado = [title, priceTotal / arrayCategorias.length, percentageTotal.toFixed(3)];
    let resultado = [title, `u$s ${(priceTotal / arrayCategorias.length).toFixed(2)}`, `${percentageTotal.toFixed(2)}%` ];
    // console.log(resultado);
    // return resultado2

    return resultado;

}

function printTableUpcoming(arrayCategoria, contenedorTable) {

    let contenedorFilas = document.createElement('tr');

    arrayCategoria.forEach(elemento => {

        let filaElemento = document.createElement('td');

        filaElemento.classList.add('p-2');
        filaElemento.innerHTML = elemento;

        contenedorFilas.appendChild(filaElemento);

    })

    contenedorTable.appendChild(contenedorFilas);

}