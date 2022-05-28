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

                // console.log(arrayCategorysPast);
                // console.log(arrayCategorysFuture);
                // console.log(arraySortedPast);
                // console.log(arraySortedCapacity);

                // console.log(arraySortedPast[arraySortedPast.length - 1]); //mayor porcentaje
                // console.log(arraySortedPast[0]);                          //menor porcentaje

                // console.log(arraySortedCapacity[arraySortedCapacity.length - 1]) // mayor capacidad

                let arrayTableEvents = [];

                arrayTableEvents.push( arraySortedPast[arraySortedPast.length - 1] );
                arrayTableEvents.push( arraySortedPast[0] )
                arrayTableEvents.push( arraySortedCapacity[arraySortedCapacity.length - 1] )

                console.log(arrayTableEvents);

                printTableEvents(arrayTableEvents, tableEvents);

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

        let filaElmento = document.createElement('td');

        filaElmento.classList.add('p-2');
        filaElmento.innerHTML = elemento;
        contenedorFilas.appendChild(filaElmento);

    })

    contenedorTable.appendChild(contenedorFilas);
}