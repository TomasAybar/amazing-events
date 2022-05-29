getFetch()
async function getFetch() {

    await fetch(APIurl)
            .then(res => res.json() )
            .then(data => {

                let eventos = data.events;  // guardo mis eventos 

                const eventsPast = eventos.filter(evento => dateReturn(data.currentDate) > dateReturn(evento.date));
                const eventsFuture = eventos.filter(evento => dateReturn(data.currentDate) < dateReturn(evento.date));

                let arrayCategorysFuture = calcCategory(eventsFuture);
                let arrayCategorysPast = calcCategory(eventsPast);

                let arrayTableEvents = [];
                arrayTableEvents.push( calcPercentageAttendance(eventsPast)[0] );
                arrayTableEvents.push( calcPercentageAttendance(eventsPast)[1] );
                arrayTableEvents.push( capacityMax(eventos) )

                // console.log(arrayTableEvents);

                printTableEvents(arrayTableEvents, tableEvents);
                printTableCategory(arrayCategorysFuture, tableUpcomming);
                printTableCategory(arrayCategorysPast, tablePast);

            })
}
