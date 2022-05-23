// // HOME EVENT

printCheckboxs(categoryReturn(eventos), conteinerCheckboxIndex); // imprime checkbos en base a eventos

const checkboxsIndex = document.querySelectorAll('input[type="checkbox"]'); // selecciona todos los checkbox

let arrayCheckedIndex = [];
let textInputIndex = '';

checkboxsIndex.forEach(elemento => elemento.addEventListener('click', (e) => { // evento click en los checkbox y filtrado

    if (e.target.checked) {

        arrayCheckedIndex.push(e.target.parentNode.textContent);
        filtradora(arrayCheckedIndex, eventos, conteinerCardsIndex, textInputIndex, rutaIndex);

    } else {

        arrayCheckedIndex = arrayCheckedIndex.filter(elemento => elemento !== e.target.parentNode.textContent);
        filtradora(arrayCheckedIndex, eventos, conteinerCardsIndex, textInputIndex, rutaIndex);

    }
}))

inputIndex.addEventListener('keyup', (e) => { // evento keyup en el search y filtrado

    textInputIndex = e.target.value;

    filtradora(arrayCheckedIndex, eventos, conteinerCardsIndex, textInputIndex, rutaIndex);

})

filtradora(arrayCheckedIndex, eventos, conteinerCardsIndex, textInputIndex, rutaIndex);


