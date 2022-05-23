// // PAST EVENT

printCheckboxs( categoryReturn(eventsPast), conteinerCheckboxPast ); // imprime checkbos en base a eventos

const checkboxsPast = document.querySelectorAll('input[type="checkbox"]'); // selecciona todos los checkbox

let arrayCheckedPast = [];
let textInputPast = '';

checkboxsPast.forEach(elemento => elemento.addEventListener('click', (e) => { // evento click en los checkbox y filtrado

    if (e.target.checked) {

        arrayCheckedPast.push(e.target.parentNode.textContent);
        filtradora(arrayCheckedPast, eventsPast, conteinerCardsPast, textInputPast, rutaDetails);

    } else {

        arrayCheckedPast = arrayCheckedPast.filter(uncheck => uncheck !== e.target.parentNode.textContent);
        filtradora(arrayCheckedPast, eventsPast, conteinerCardsPast, textInputPast, rutaDetails);

    }
}))

inputPast.addEventListener('keyup', (e) => { // evento keyup en el search y filtrado

    textInputPast = e.target.value;

    filtradora(arrayCheckedPast, eventsPast, conteinerCardsPast, textInputPast, rutaDetails);

})

filtradora(arrayCheckedPast, eventsPast, conteinerCardsPast, textInputPast, rutaDetails);