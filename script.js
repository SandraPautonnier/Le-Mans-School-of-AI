// Pour ajouter un événement vous n'avez pas à vous occuper de l'ordre de la liste par rapport aux dates, 
// l'évenement s'intègrera automatiquement là où il doit se placer. 
// Voici un exemple (instructions):
/*{
  title: "Titre de l'événement", <== Titre obligatoire
  date: "2025-05-22", <== Format date : année-mois-jour ; Si pas de date mettre null et ira automatiquement dans Idées / non planifié
  organizers: ["Pierre", "Mustafa"], <== Si pas d'organisateur défini supprimer cette ligne
  registration: "https://www.meetup.com/le-mans-school-of-ai/events/307193854/", <== Si pas de lien d'inscription supprimer cette ligne
  comment: "ATTENTION, aura lieu au Blue Zinc" <== Si pas decommentaire supplémentaire supprimer cette ligne <== dernier élément de l'événement pas de virgule
},*/ // virgule après chaque événement

// Exemple à copier coller
/*{
  title: "Titre de l'événement",
  date: "2025-05-22",
  organizers: ["Pierre", "Mustafa"],
  registration: "https://www.meetup.com/le-mans-school-of-ai/events/307193854/",
  comment: "ATTENTION, aura lieu au Blue Zinc"
},*/


// Linkdin des organisateurs
const organizersDirectory = {
  "Gaëtan": "https://www.linkedin.com/in/gaetangottis/",
  "Pierre": "https://www.linkedin.com/in/pierre-cartier/",
  "Mustafa": "https://www.linkedin.com/in/moustaphatsm/",
  "Slava": "https://www.linkedin.com/in/vyacheslav-efimov/"
};

//Evenements
const events = [
  {
    title: "Introduction à l'IA",
    date: "2025-09-11",
    organizers: ["Gaëtan"],
  },
  {
    title: "NOVA",
    date: "2025-09-25",
    organizers: ["Antoine"],
  },
  {
    title: "Langchain4j",
    date: "2025-10-09",
    organizers: ["Ange"],
  },
  {
    title: "Brainstorming pour le sujet des 24h du code 2026",
    date: "2025-10-16"
  },
  {
    title: "n8n : Vient avec ton cas d'usage",
    date: "2025-11-20",
  },
  {
    title: "n8n : Préparation de cas d'usage",
    date: "2025-11-06",
    organizers: ["Pierre","Yohan"],
  },
  {
    title: "Image 2 World",
    date: "2025-12-04",
    organizers: ["Gaëtan"],
  },
  {
    title: "Un vlog de chat",
    date: "2026-01-08",
    organizers: ["Alexandre"],
  },
  {
    title: "RAG",
    date: "2026-02-05",
    organizers: ["Gaëtan"],
  },
  {
    title: "Lancement saison 9",
    date: "2025-08-28",
  },
  {
    title: "JEPA",
    date: null,
  },
  {
    title: "VEO et ce qu'on peut en faire (Jeux Vidéo)",
    date: null,
  },
  {
    title: "Analytique grâce à l'IA (en Python)",
    date: "2026-01-22",
    organizers: ["Éric"],
  },
  {
    title: "Cline",
    date: null,
  },
  {
    title: "Assistant développement code (≠ Vibe Coding)",
    date: null,
  },
  {
    title: "Explicabilité en TAL",
    date: null,
  },
  {
    title: "Hardware et edge AI",
    date: null,
  },
  {
    title: "Intégrer l'IA dans une appli web (client side)",
    date: null,
  },
  {
    title: "Retour aux bases du Machine Learning",
    date: null,
  },
  {
    title: "Génération d'images",
    date: null,
  }
];

function renderEvents(events) {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // neutraliser l'heure

  const past = document.querySelector("#past-events ul");
  const upcoming = document.querySelector("#upcoming-events ul");
  const ideas = document.querySelector("#ideas-events ul");

  // Nettoyage
  past.innerHTML = "";
  upcoming.innerHTML = "";
  ideas.innerHTML = "";

  // Séparer en 3 tableaux
  const pastEvents = [];
  const upcomingEvents = [];
  const ideaEvents = [];

  events.forEach(event => {
    if (!event.date) {
      ideaEvents.push(event);
    } else {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      if (eventDate < today) {
        pastEvents.push(event);
      } else {
        upcomingEvents.push(event);
      }
    }
  });

  // Trier : upcoming du plus proche au plus lointain
  upcomingEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  // Trier : past du plus récent au plus ancien
  pastEvents.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Fonction utilitaire pour formater la date
  function formatDate(dateString) {
    const eventDate = new Date(dateString);
    return eventDate.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }

  // Fonction utilitaire pour générer un <li>
  function createEventItem(event, isPast = false) {
    const li = document.createElement("li");
    li.classList.add("event");

    let html = `<strong>${event.title}</strong>`;

    if (event.date) {
      html += `<br><i class="fa-solid fa-calendar"></i> Le ${formatDate(event.date)}`;
    }

    if (event.organizers && event.organizers.length > 0) {
    html += ` - <i class="fa-solid fa-user"></i> par `;

      const organizersHTML = event.organizers.map(name => {
        const linkedin = organizersDirectory[name];
        if (linkedin) {
          return `<a class="link-anim" href="${linkedin}" target="_blank">${name}</a>`;
        } else {
          return name; // si pas trouvé dans la liste
        }
      }).join(" et ");

    html += organizersHTML;
  }

    if (event.comment) {
      html += `<br><p class="commentaire"><i class="fa-solid fa-circle-info"></i> ${event.comment}</p>`;
    }

    if (event.registration) {
      const btnClass = isPast ? "btn-passed" : "btn";
      html += `<button class="${btnClass}"><a href="${event.registration}" target="_blank" style="color:inherit; text-decoration:none;">S'inscrire</a></button>`;
    }

    li.innerHTML = html;

    if (!event.date) {
      li.classList.add("event-idea");
    } else if (isPast) {
      li.classList.add("event-past");
    } else {
      li.classList.add("event-upcoming");
    }

    return li;
  }

  // Injecter les listes triées dans le DOM
  upcomingEvents.forEach(ev => upcoming.appendChild(createEventItem(ev, false)));
  pastEvents.forEach(ev => past.appendChild(createEventItem(ev, true)));
  ideaEvents.forEach(ev => ideas.appendChild(createEventItem(ev)));
}

// Au chargement
document.addEventListener("DOMContentLoaded", function () {
  renderEvents(events);
});

// Mise à jour automatique toutes les heures
setInterval(() => renderEvents(events), 60 * 60 * 1000);


// Menu hamburger //

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  navMenu.classList.toggle("open");
});

// Fermer le menu après clic sur un lien
document.querySelectorAll(".nav-ul a").forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open");
    navMenu.classList.remove("open");
  });
});