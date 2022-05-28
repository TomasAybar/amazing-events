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


            })
}

