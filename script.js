window.onload = function(){
        // Fonction pour organiser les événements
        function organizeEvents() {
            const today = new Date();
            const eventsContainer = document.getElementById('events-container');
            const pastEventsContainer = document.getElementById('past-events');
            const nextEventContainer = document.getElementById('next-event');
            const futureEventsContainer = document.getElementById('future-events');
            const ideasEventsContainer = document.getElementById('ideas-events');

            const events = Array.from(eventsContainer.children);
            let nextEvent = null;
            let nextEventDate = null;

            events.forEach(event => {
                const dateStr = event.innerText.match(/\d{1,2} (janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre) \d{4}/i);
                if (dateStr) {
                    const eventDate = new Date(dateStr[0].replace(/(\d{1,2}) (\w+) (\d{4})/, '$2 $1 $3'));
                    if (eventDate < today) {
                        pastEventsContainer.appendChild(event);
                    } else if (!nextEventDate || eventDate < nextEventDate) {
                        nextEvent = event;
                        nextEventDate = eventDate;
                    } else {
                        futureEventsContainer.appendChild(event);
                    }
                } else {
                    // Si la date n'est pas définie, on considère que c'est un événement non planifié
                    ideasEventsContainer.appendChild(event);
                }
            });

            if (nextEvent) {
                nextEventContainer.appendChild(nextEvent);
            }
        }

        organizeEvents();
    };