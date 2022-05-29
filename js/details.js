
getFetch();
async function getFetch() {

    await fetch(APIurl)
            .then(res => res.json() )
            .then(data => {

                let eventos = data.events;  // guardo mis eventos 

                let eventID = location.search.split('?id=').join(''); // busca en url el ID

                let eventoDetail = eventos.find(evento => evento._id === eventID); // busca dentro de los eventos el ID

                printDetail(eventoDetail, conteinerCardDetail, data);

            })
}