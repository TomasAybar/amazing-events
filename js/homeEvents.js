// // HOME EVENT
getFetch();
async function getFetch() {

    viewSpiner(conteinerCardsIndex);
    
    await fetch(APIurl)
        .then(res => res.json())
        .then(data => {


            let eventos = data.events;  // guardo mis eventos 

            printCheckboxs(categoryReturn(eventos), conteinerCheckboxIndex)

            const checkboxsIndex = document.querySelectorAll('input[type="checkbox"]');

            let arrayCheckedIndex = [];
            let textInputIndex = '';

            checkboxsIndex.forEach(elemento => elemento.addEventListener('click', (e) => { // evento click en los checkbox y filtrado

                if (e.target.checked) {

                    arrayCheckedIndex.push(e.target.parentNode.textContent);
                    filtradora(arrayCheckedIndex, eventos, conteinerCardsIndex, textInputIndex, rutaIndex, rutaImgIndex);

                } else {

                    arrayCheckedIndex = arrayCheckedIndex.filter(elemento => elemento !== e.target.parentNode.textContent);
                    filtradora(arrayCheckedIndex, eventos, conteinerCardsIndex, textInputIndex, rutaIndex, rutaImgIndex);

                }
            }))

            inputIndex.addEventListener('keyup', (e) => { // evento keyup en el search y filtrado

                textInputIndex = e.target.value;

                filtradora(arrayCheckedIndex, eventos, conteinerCardsIndex, textInputIndex, rutaIndex, rutaImgIndex);

            })

            filtradora(arrayCheckedIndex, eventos, conteinerCardsIndex, textInputIndex, rutaIndex, rutaImgIndex);


        })
}


