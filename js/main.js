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

let eventos = [...data.eventos]; // clono el array de los eventos

eventos.map((evento, index) => evento.id = index); // recorro los eventos y les agrego un ID unico

/**
 *    FUNCIONES
 */

// '2022-01-01' -> [2022,01,01]
function dateReturn(fecha) {
    let eventYear = fecha.split('-');
    return eventYear.map(date => Number(date))
}

// filtra por futuro o pasado a partir de la fecha actual
const eventsFuture = eventos.filter(evento => dateReturn(data.fechaActual) < dateReturn(evento.date));
const eventsPast = eventos.filter(evento => dateReturn(data.fechaActual) > dateReturn(evento.date));

// imprime los eventos de un array en el nodo seleccionado
function printCards(array, node, ruta) {

    node.innerHTML = '';

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
                        <a href="${ruta}?id=${event.id}" class="btn btn-cards">View more</a>
                    </div>
                </div>
            </div>`
    });

}

// imprime el evento en el nodo seleccionado
function printDetail(evento, node) {

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
                                    <p class="card-text">${assistanceOrEstimate(evento)}</p>
                                    <p class="card-text"><span class="datos-detail">Price:</span> u$s ${evento.price}</p>
                                </div>

                                <div class="col-md-5 d-flex align-items-center justify-content-center">
                                    <button class="btn btn-cards">Buy now!</button>
                                </div>
                            </div>
                        </div>
                    </div>`

}

// determina si el evento lleva la propiedad assistance o estimate
function assistanceOrEstimate(evento) {

    if ( dateReturn(data.fechaActual) > dateReturn(evento.date) ) {

        return `<span class="datos-detail">Assistance:</span> ${evento.assistance}`
        
    } else {

        return `<span class="datos-detail">Estimate:</span> ${evento.estimate}`
        
    }
}

// me guarda las categorias y elimina las repetidas de un array
function categoryReturn(array) {
    let category = array.map(event => event.category);

    return category.filter((elemento, index) => category.indexOf(elemento) === index)
}

// muestra los checkbox de un array en el nodo seleccionado
function printCheckboxs(array, node) {

    array.forEach(event => {
        node.innerHTML +=
            `<label class="pe-3"><input type="checkbox" class="checkbox">${event}</label>`
    })

}

// devuelve un string normalizado
const normalizeString = str => str.trim().toLowerCase();

// cerebro de los filtros
function filtradora(arrayCheckeado, arrayEventos, contenedorPrint, textInput, ruta) {

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

    printCards(arrayResultado, contenedorPrint, ruta);

}
