  
  // Pour ajouter un événement, voici un exemple (instructions):
  /*{
    title: "Titre de l'événement", <== Titre obligatoire
    date: "2025-05-22", <== Format date : année-mois-jour ; Si pas de date mettre null et ira automatiquement dans Idées / non planifié
    organizers: [  <== Si pas d'organisateur défini supprimer cette ligne
      { name: "Pierre", linkedin: "https://www.linkedin.com/in/pierre-cartier/" },
      { name: "Mustafa", linkedin: "https://www.linkedin.com/in/moustaphatsm/" } <== Si seulement un organisateur supprimer cette ligne
    ],
    registration: "https://www.meetup.com/le-mans-school-of-ai/events/307193854/", <== Si pas de lien d'inscription supprimer cette ligne
    comment: "ATTENTION, aura lieu au Blue Zinc" <== Si pas decommentaire supplémentaire supprimer cette ligne <== dernier élément de l'événement pas de virgule
  },*/ // virgule après chaque événement

  // Exemple à copier coller
  /*{
    title: "Titre de l'événement",
    date: "2025-05-22",
    organizers: [
      { name: "Pierre", linkedin: "https://www.linkedin.com/in/pierre-cartier/" },
      { name: "Mustafa", linkedin: "https://www.linkedin.com/in/moustaphatsm/" }
    ],
    registration: "https://www.meetup.com/le-mans-school-of-ai/events/307193854/",
    comment: "ATTENTION, aura lieu au Blue Zinc"
  },*/

const events = [
  {
    title: "Titre de l'événement",
    date: "2025-09-22",
    organizers: [
      { name: "Pierre", linkedin: "https://www.linkedin.com/in/pierre-cartier/" },
      { name: "Mustafa", linkedin: "https://www.linkedin.com/in/moustaphatsm/" }
    ],
    registration: "https://www.meetup.com/le-mans-school-of-ai/events/307193854/",
    comment: "Ceci est un commentaire"
  },
  {
    title: "Lancement saison 8",
    date: "2024-09-05",
  },
  {
    title: "Introduction à l'IA - 1ère partie",
    date: "2024-09-19",
    organizers: [
      { name: "Gaëtan", linkedin: "https://www.linkedin.com/in/gaetangottis/" }
    ]
  },
  {
    title: "Introduction à l'IA - 2nde partie",
    date: "2024-10-03",
    organizers: [
      { name: "Gaëtan", linkedin: "https://www.linkedin.com/in/gaetangottis/" }
    ]
  },
  {
    title: "Brainstorming pour le sujet des 24h du code 2025",
    date: "2024-11-14",
  },
  {
    title: "RAG pour l'entreprise - 1ère partie",
    date: "2024-11-14",
    organizers: [
      { name: "Pierre", linkedin: "https://www.linkedin.com/in/pierre-cartier/" }
    ]
  },
  {
    title: "RAG et GraphRAG pour l'entreprise - 2ème partie",
    date: "2024-11-21",
    organizers: [
      { name: "Pierre", linkedin: "https://www.linkedin.com/in/pierre-cartier/" },
      { name: "Mustafa", linkedin: "https://www.linkedin.com/in/moustaphatsm/" }
    ]
  },    
  {
    title: "IA et Machine Learning",
    date: "2025-01-09",
    organizers: [
      { name: "Slava", linkedin: "https://www.linkedin.com/in/vyacheslav-efimov/" }
    ],
    comment: "Introduction à la recherche par similarité"
  },
  {
    title: "Découvrir l’IA No-code avec n8n - Retour d’expérience du Shift hackathon 2025",
    date: "2025-05-15",
    registration: "https://www.meetup.com/le-mans-school-of-ai/events/307101750/"
  },
  {
    title: "Les agents IA et function calls - Retour d’expérience des 24h code 2025",
    date: "2025-05-22",
    registration: "https://www.meetup.com/le-mans-school-of-ai/events/307193854/",
    comment: "ATTENTION, aura lieu au Blue Zinc"
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

  events.forEach(event => {
    const li = document.createElement("li");
    li.classList.add("event");

    let html = `<strong>${event.title}</strong>`;

    if (event.date) {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      const formattedDate = eventDate.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric"
      });
      html += `<br><i class="fa-solid fa-calendar"></i> Le ${formattedDate}`;
    }

    const isPast = event.date && (new Date(event.date).setHours(0,0,0,0) < new Date().setHours(0,0,0,0));

    if (event.organizers && event.organizers.length > 0) {
        html += ` -  <i class="fa-solid fa-user"></i> par `;

        const organizersHTML = event.organizers.map(org => {
        if (org.linkedin) {
            return `<a class="link-anim" href="${org.linkedin}" target="_blank">${org.name}</a>`;
        } else {
            return org.name;
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
      ideas.appendChild(li);
    } else {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      if (eventDate < today) {
        li.classList.add("event-past");
        past.appendChild(li);
      } else {
        li.classList.add("event-upcoming");
        upcoming.appendChild(li);
      }
    }
  });
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