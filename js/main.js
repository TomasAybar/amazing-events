/**
 *    DOM
 */

// Contenedores de las cards
const conteinerCardsIndex = document.querySelector('#contenedor-cards-home');
const conteinerCardsFuture = document.querySelector('#contenedor-cards-future');
const conteinerCardsPast = document.querySelector('#contenedor-cards-past');
const conteinerCardDetail = document.querySelector('#container-card-detail');

// Contenedores de checkbox
const conteinerCheckboxIndex = document.querySelector('#contenedor-input-index');
const conteinerCheckboxFuture = document.querySelector('#contenedor-checkbox-future');
const conteinerCheckboxPast = document.querySelector('#contenedor-checkbox-past');

// inputs
const btnSearchIndex = document.querySelector('#btn-search-index');
const inputIndex = document.querySelector('#input-index');
const inputFuture = document.querySelector('#input-future');
const inputPast = document.querySelector('#input-past');

// href details
const rutaIndex = 'html/details.html';
const rutaDetails = 'details.html';

// href not-found
const rutaImgIndex = 'assets/img/not-found.gif';
const rutaImgHtml = '../assets/img/not-found.gif';

// ruta api
const APIurl = 'https://amazing-events.herokuapp.com/api/events';

// tables
const tableEvents = document.querySelector('#table-events');
const tableUpcomming = document.querySelector('#table-upcomming');
const tablePast = document.querySelector('#table-past');


/**
 *    FUNCIONES
 */


/**
 * 
 * @param {'2022-01-01'} fecha 
 * @returns [2022,01,01]
 */
function dateReturn(fecha) {
    let eventYear = fecha.split('-');
    return eventYear.map(date => Number(date))
}

/**
 * 
 * @param {array de eventos} array 
 * @param {nodo donde se van a imprimir las cards} node 
 * @param {ruta del ID} rutaID 
 * @param {ruta de la imagen not-found} rutaImg 
 */
function printCards(array, node, rutaID, rutaImg) {

    node.innerHTML = '';

    if ( array.length !== 0 ) {
        
        array.forEach(event => {
    
            node.innerHTML +=
                `<div class="card col-4" style="width: 18rem;">
                    <img src="${event.image}" class="card-img-top" alt="${event.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">${event.description}</p>
                        <p class="card-text card-text-date" style="margin-top: auto;">${event.date}</p>
            
                        <div class="d-flex justify-content-evenly align-items-center" style="margin-top: auto;">
                            <p class="mb-0">u$s ${event.price}</p>
                            <a href="${rutaID}?id=${event._id}" class="btn btn-cards">View more</a>
                        </div>
                    </div>
                </div>`
        });

    } else {
        node.innerHTML = 
            `<div>
                <p class="fs-2">🚫 No search results 🚫</p>
                <img src="${rutaImg}" alt="not found">
            </div>`
        }

}

/**
 * 
 * @param {objeto que contiene un evento} evento 
 * @param {nodo donde se va a imprimir la card} node 
 * @param {variable donde se encuentre la base de datos} data 
 */
function printDetail(evento, node, data) {

    node.innerHTML = '';

    node.innerHTML =
                    `<div class="col-md-6 text-center">
                        <img src="${evento.image}" alt="fotografia evento" class="img-fluid rounded-start">
                    </div>
                    
                    <div class="col-md-6">
                        <div class="card-body text-center">
                            <h5 class="fs-3 card-title">${evento.name}</h5>
                            <p class="card-text">${evento.description}</p>
                            <div class="text-start ps-5 row">
                                <div class="col-md-7 mb-3">
                                    <p class="card-text"><span class="datos-detail">Date:</span> ${evento.date}</p>
                                    <p class="card-text"><span class="datos-detail">Place:</span> ${evento.place}</p>
                                    <p class="card-text"><span class="datos-detail">Capacity:</span> ${evento.capacity}</p>
                                    <p class="card-text">${assistanceOrEstimate(data, evento)}</p>
                                    <p class="card-text"><span class="datos-detail">Price:</span> u$s ${evento.price}</p>
                                </div>

                                <div class="col-md-5 d-flex align-items-center justify-content-center">
                                    <button class="btn btn-cards">Buy now!</button>
                                </div>
                            </div>
                        </div>
                    </div>`

}

/**
 * 
 * @param {variable donde se encuentre la base de datos} data 
 * @param {objeto que contiene un evento} evento 
 * @returns span de con el dato de assitance o estimate
 */
function assistanceOrEstimate(data, evento) {
    
    if (dateReturn(data.currentDate) > dateReturn(evento.date) ) {

        return `<span class="datos-detail">Assistance:</span> ${evento.assistance}`
        
    } else {

        return `<span class="datos-detail">Estimate:</span> ${evento.estimate}`
        
    }
}

/**
 * 
 * @param {array de eventos} array 
 * @returns array de categorias sin que contenga repetidas
 */
function categoryReturn(array) {
    let category = array.map(event => event.category);

    return category.filter((elemento, index) => category.indexOf(elemento) === index)
}

/**
 * 
 * @param {array de eventos} array 
 * @param {nodo donde se van a imprimir los checkbox} node 
 */
function printCheckboxs(array, node) {

    array.forEach(event => {
        node.innerHTML +=
            `<label class="pe-3"><input type="checkbox" class="checkbox">${event}</label>`
    })

}

/**
 * 
 * @param {string} str 
 * @returns el mismo string eliminando espacios laterales y en minuscula
 */
const normalizeString = str => str.trim().toLowerCase();

// cerebro de los filtros
function filtradora(arrayCheckeado, arrayEventos, contenedorPrint, textInput, rutaID, rutaImg) {

    let arrayResultado = [];

    if (arrayCheckeado.length > 0 && textInput !== '') {

        arrayCheckeado.map(categoria => {

            arrayResultado.push(...arrayEventos.filter(event => event.name.toLowerCase().includes(normalizeString(textInput)) && event.category === categoria))
        })

        // console.log('tengo eventos checkeados y texto en mi buscador');

    } else if (arrayCheckeado.length > 0 && textInput === '') { // OK

        arrayCheckeado.map(categoria => {

            arrayResultado.push(...arrayEventos.filter(event => event.category === categoria));

            // console.log('tengo solamente elementos checkeados, no toque el buscador');

        })

    } else if (arrayCheckeado.length == 0 && textInput !== '') { // OK

        arrayResultado.push(...arrayEventos.filter(event => event.name.toLowerCase().includes( normalizeString(textInput) ) ))

    } else {
        arrayResultado.push(...arrayEventos); // OK
        // console.log('pagina por default');
    }

    printCards(arrayResultado, contenedorPrint, rutaID, rutaImg);

}

/**
 * 
 * @param {array de eventos} arrayEvents 
 * @returns array con el % de asistencia max y minimo
 */
function calcPercentageAttendance(arrayEvents) {

    let arrayResultado = []

    arrayEvents.forEach(evento => {

        let resultado = (evento.assistance * 100) / evento.capacity;

        arrayResultado.push({ name: evento.name, percentage: resultado, id: evento._id })

    })


    arrayResultado.sort((a, b) => b.percentage - a.percentage);

    return [ arrayResultado[0], arrayResultado[arrayResultado.length - 1] ]

}

/**
 * 
 * @param {array de eventos} arrayEvents 
 * @returns evento de mayor capacidad
 */
function capacityMax(arrayEvents) {

    let arrayResultado = [];

    arrayEvents.forEach(evento => {

        arrayResultado.push({ name: evento.name, capacity: evento.capacity, id: evento._id })

    })
    arrayResultado.sort((a, b) => b.capacity - a.capacity);
    // console.log(arrayResultado);
    return arrayResultado[0];
}

/**
 * 
 * @param {array de eventos} arrayEvents 
 * @returns array que dentro, tengo arrays agrupados respecto a su categoria
 */
function calcCategory(arrayEvents) {

    let arrayCategorys = categoryReturn(arrayEvents);
    let arrayResultado = [];

    arrayCategorys.forEach(categoria => {

        arrayResultado.push(arrayEvents.filter(evento => evento.category === categoria));

    })

    return arrayResultado;
}

/**
 * 
 * @param {[assit%high, assit%low, capacity max]} arrayDatos 
 * @param {contenedor donde se va a imprimir la fila creada} contenedorTable 
 */
function printTableEvents(arrayDatos, contenedorTable) {

    let resultado = []

    arrayDatos.forEach(evento => evento.capacity ?
        resultado.push(`${evento.name}: ${evento.capacity}`) :
        resultado.push(`${evento.name} with ${evento.percentage}% of assistance`))

    printTable(resultado, contenedorTable);
}

/**
 * 
 * @param {array de eventos futuros o pasados agrupados por categorias} arrayCategorias 
 * @param {contenedor donde se van a imprimir las filas creadas} contenedorPrint 
 */
function printTableCategory(arrayCategorias, contenedorPrint) {

    arrayCategorias.forEach(arrayCategoria => {

        printTable(calcTableCategory(arrayCategoria), contenedorPrint)

    })

}

/**
 * 
 * @param {array con eventos de la misma categoria} arrayCategorias 
 * @returns [titulo, ganancia estimada, % de asistencia]
 */
function calcTableCategory(arrayCategorias) {

    let categorys = arrayCategorias.map(evento => evento.category);

    const [title] = Array.from(new Set(categorys));

    const assitOrEstimate = arrayCategorias.reduce((total, evento) => evento.assistance ? total + Number(evento.assistance) : total + Number(evento.estimate), 0);

    const capacityTotal = arrayCategorias.reduce((total, evento) => total + Number(evento.capacity), 0);

    const percentageTotal = (assitOrEstimate * 100) / capacityTotal;

    const priceTotal = arrayCategorias.reduce((total, evento) => evento.assistance ? total + (evento.assistance * evento.price) : total + (evento.estimate * evento.price), 0)

    let resultado = [title, `u$s ${(priceTotal / arrayCategorias.length).toFixed(2)}`, `${percentageTotal.toFixed(2)}%`];

    return resultado;

}

/**
 * 
 * @param {[titulo, ganancia estimada, % de asistencia]} arrayCategoria 
 * @param {contenedor donde se va a imprimir la fila creada} contenedorTable 
 */
function printTable(arrayCategoria, contenedorTable) {

    let contenedorFilas = document.createElement('tr');

    arrayCategoria.forEach(elemento => {

        let filaElemento = document.createElement('td');

        filaElemento.classList.add('p-2');
        filaElemento.innerHTML = elemento;

        contenedorFilas.appendChild(filaElemento);

    })

    contenedorTable.appendChild(contenedorFilas);

}