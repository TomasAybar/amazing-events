// // UPCOMING EVENT

printCheckboxs(categoryReturn(eventsFuture), conteinerCheckboxFuture); // imprime checkbos en base a eventos

const checkboxsFuture = document.querySelectorAll('input[type="checkbox"]'); // selecciona todos los checkbox

let arrayCheckedFuture = [];
let textInputFuture = '';

checkboxsFuture.forEach(elemento => elemento.addEventListener('click', (e) => { // evento click en los checkbox y filtrado

    if (e.target.checked) {

        arrayCheckedFuture.push(e.target.parentNode.textContent);
        filtradora(arrayCheckedFuture, eventsFuture, conteinerCardsFuture, textInputFuture, rutaDetails, rutaImgHtml);

    } else {

        arrayCheckedFuture = arrayCheckedFuture.filter(elemento => elemento !== e.target.parentNode.textContent);
        filtradora(arrayCheckedFuture, eventsFuture, conteinerCardsFuture, textInputFuture, rutaDetails, rutaImgHtml);

    }
}))

inputFuture.addEventListener('keyup', (e) => { // evento keyup en el search y filtrado

    textInputFuture = e.target.value;

    filtradora(arrayCheckedFuture, eventsFuture, conteinerCardsFuture, textInputFuture, rutaDetails, rutaImgHtml);

})

filtradora(arrayCheckedFuture, eventsFuture, conteinerCardsFuture, textInputFuture, rutaDetails, rutaImgHtml);
