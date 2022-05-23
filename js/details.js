let eventID = location.search.split('?id=').join(''); // busca en url el ID
eventID = Number(eventID);

let eventoDetail = eventos.find(evento => Number(evento.id) === eventID); // busca dentro de los eventos el ID

printDetail(eventoDetail, conteinerCardDetail); // imprime la card que contenga el ID buscado

