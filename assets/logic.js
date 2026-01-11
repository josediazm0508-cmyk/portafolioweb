const projects = [
  {
    name: "MyDemic",
    description: "Proyecto personal enfocado en lógica, estructura y crecimiento como programador.",
    tools: ["HTML", "CSS", "JavaScript"],
    difficulty: "Medium",
    honesty: "Proyecto antiguo, enfocado más en lógica que en diseño.",
    developmentTime: "3 meses",
    routeimg: "assets/images/projects/mydemic/",
    live: "https://mydemic.netlify.app/",
    arrayimgs: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"]
  },
  {
    name: "Aeroflow",
    description: "Aplicación para mejorar la organización personal y productividad.",
    tools: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    difficulty: "Medium",
    honesty: "Funcional, aunque el diseño es sencillo.",
    developmentTime: "1 semana",
    routeimg: "assets/images/projects/aeroflow/",
    live: "https://aeroflowjosediaz.netlify.app/",
    arrayimgs: ["1", "2", "3", "4", "5", "6", "7"]
  },
  {
    name: "Metricwave",
    description: "Panel administrativo con visualización de datos.",
    tools: ["HTML", "CSS", "JavaScript", "Charts"],
    difficulty: "Medium - Hard",
    honesty: "Buen manejo de datos, estilos mejorables.",
    developmentTime: "2 semanas",
    routeimg: "assets/images/projects/metricwave/",
    live: "https://metricwave.netlify.app/",
    arrayimgs: ["1", "2", "3", "4", "5"]
  },
  {
    name: "ShopLynx",
    description: "Tienda online con login, carrito, pagos simulados y consumo de API.",
    tools: ["HTML", "CSS", "JavaScript", "API", "LocalStorage"],
    difficulty: "Hard",
    honesty: "Proyecto complejo; la lógica destaca más que el diseño.",
    developmentTime: "3 semanas",
    routeimg: "assets/images/projects/shoplynx/",
    live: "https://shoplynx.netlify.app/",
    arrayimgs: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
  },
  {
    name: "Prints Fast Food",
    description: "Página de restaurante enfocada en UI, colores y experiencia visual.",
    tools: ["HTML", "CSS", "JavaScript"],
    difficulty: "Easy",
    honesty: "El diseño y la presentación son el punto fuerte.",
    developmentTime: "24 horas",
    routeimg: "assets/images/projects/prints/",
    live: "https://printsfastfoodpopayan.netlify.app/",
    arrayimgs: ["1", "2", "3", "4"]
  },
  {
    name: "Primocell",
    description: "Landing page comercial con enfoque visual y responsive.",
    tools: ["HTML", "CSS"],
    difficulty: "Easy",
    honesty: "Proyecto visual, simple pero bien ejecutado.",
    developmentTime: "24 horas",
    routeimg: "assets/images/projects/primocell/",
    live: "https://mockupprimocell.netlify.app/",
    arrayimgs: ["1", "2", "3", "4"]
  }
];

let translations = {};

function getNestedTranslation(obj, path) {

  return path.split('.').reduce((prev, curr) => prev && prev[curr], obj);

}

function changeLanguage(lang) {

  localStorage.setItem('preferredLanguage', lang);

  document.documentElement.lang = lang;
  
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = getNestedTranslation(translations[lang], key);
    if (translation) {
      element.textContent = translation;
    }
  });
  
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const translation = getNestedTranslation(translations[lang], key);
    if (translation) {
      element.placeholder = translation;
    }
  });
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
    }
  });
}

async function loadTranslations() {
  try {
    const response = await fetch('assets/languages/text.json');
    translations = await response.json();
    
    const savedLang = localStorage.getItem('preferredLanguage') || 'es';
    changeLanguage(savedLang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.getAttribute('data-lang');
        changeLanguage(lang);
      });
    });
  } catch (error) {
    console.error('Error cargando traducciones:', error);
  }
}

document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("year").textContent = new Date().getFullYear()
    renderProjects()
    loadTranslations()

})

function renderProjects(){

    const projectsContainer = document.getElementById("divprojects");

    projects.forEach(project => {

        const card = document.createElement("div");
        card.classList.add("project-card");

        const imageDiv = document.createElement("div");
        imageDiv.classList.add("project-image");

        const img = document.createElement("img");
        img.src = project.routeimg + "main.png";
        img.alt = project.name;

        imageDiv.appendChild(img);

        let intervalo = null;

        card.addEventListener("mouseenter", () => {

            if(intervalo) return;
            intervalo = cambioimg(project.arrayimgs, img, project.routeimg)
            imageDiv.classList.add("preview");

        })

        card.addEventListener("mouseleave", () => {

            clearInterval(intervalo);
            intervalo = null;
            img.src = project.routeimg + "main.png";
            imageDiv.classList.remove("preview")

        })

        const info = document.createElement("div");
        info.classList.add("project-info");

        const title = document.createElement("h3");
        title.textContent = project.name;

        const difficulty = document.createElement("span");
        difficulty.textContent = project.difficulty;
        difficulty.classList.add("difficulty")

        filterDifficulty(difficulty)

        title.appendChild(difficulty)

        const desc = document.createElement("p");
        desc.textContent = project.description;

        const tagsDiv = document.createElement("div");
        tagsDiv.classList.add("project-tags");

        project.tools.forEach(tool => {
            const tag = document.createElement("span");
            tag.textContent = tool;
            tagsDiv.appendChild(tag);
        });

        const extra = document.createElement("p");
        extra.textContent = `🧠 ${project.honesty} ⏱️ ${project.developmentTime}`;
        extra.classList.add("project-extra");

        // Buttons
        const buttonsDiv = document.createElement("div");
        buttonsDiv.classList.add("project-buttons");

        const liveBtn = document.createElement("button");
        liveBtn.textContent = "View Live";

        if (project.live) {
            liveBtn.onclick = () => window.open(project.live, "_blank");
        } else {
            liveBtn.disabled = true;
        }


        buttonsDiv.appendChild(liveBtn);

        info.appendChild(title);
        info.appendChild(desc);
        info.appendChild(tagsDiv);
        info.appendChild(extra);
        info.appendChild(buttonsDiv);

        card.appendChild(imageDiv);
        card.appendChild(info);

        projectsContainer.appendChild(card);
    });

}

function cambioimg(array, image, ruta) {

    let i = 0;
    image.src = ruta + array[i] + ".png";

    return setInterval(() => {
        image.src = `${ruta}${array[i]}.png`;
        i = (i + 1) % array.length;
    }, 1200);

}

function filterDifficulty(elemento){

    switch(elemento.textContent){

        case "Easy":

            elemento.classList.add("easy");
            break;

        case "Easy - Medium":

            elemento.classList.add("easy-medium");
            break;

        case "Medium":

            elemento.classList.add("medium");
            break;

        case "Medium - Hard":

            elemento.classList.add("medium-hard");
            break;

        case "Hard":

            elemento.classList.add("hard");
            break;

        case "Extreme":

            elemento.classList.add("extreme");
            break;

    }

}

document.getElementById("menuhamburguesa").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("sectionsdiv").classList.add("show");
});

document.getElementById("overlay").addEventListener("click", () => {
    document.getElementById("overlay").style.display = "none";
    document.getElementById("sectionsdiv").classList.remove("show");
});

let links = document.querySelectorAll("#sectionsdiv a")

links.forEach(l => {

    l.addEventListener("click", () => {

        document.getElementById("overlay").style.display = "none";
        document.getElementById("sectionsdiv").classList.remove("show");

    })

})

const form = document.getElementById('contact-form');
const modalSuccess = document.getElementById('modal-success');
const modalError = document.getElementById('modal-error');

function openModal(modal) {
    modal.style.display = "flex";
}

document.querySelectorAll('.modal .close').forEach(span => {
    span.addEventListener('click', () => {
        span.parentElement.parentElement.style.display = "none";
    });
});

window.addEventListener('click', (e) => {
    if(e.target.classList.contains('modal')) {
        e.target.style.display = "none";
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
    })
    .then(() => {
        form.reset();
        openModal(modalSuccess);
    })
    .catch((error) => {
        console.error(error);
        openModal(modalError);
    });
});