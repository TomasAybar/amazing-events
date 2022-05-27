// let eventID = location.search.split('?id=').join(''); // busca en url el ID
// eventID = Number(eventID);

// let eventoDetail = eventos.find(evento => Number(evento.id) === eventID); // busca dentro de los eventos el ID

// printDetail(eventoDetail, conteinerCardDetail); // imprime la card que contenga el ID buscado
getFetch();
async function getFetch() {

    await fetch(APIurl)
            .then(res => res.json() )
            .then(data => {


                let eventos = data.events;  // guardo mis eventos 

                let eventID = location.search.split('?id=').join(''); // busca en url el ID
                // console.log(eventID);
                // eventID = Number(eventID);

                let eventoDetail = eventos.find(evento => evento._id === eventID); // busca dentro de los eventos el ID

                // console.log(eventoDetail);
                
                printDetail(eventoDetail, conteinerCardDetail, data);

            })
}