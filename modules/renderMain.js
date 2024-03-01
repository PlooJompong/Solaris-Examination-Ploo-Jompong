// Import only fetchData from api.js
import { fetchData } from "./api.js";
import { searchFail, searchSuccess } from "./searchMsg.js";

const main = document.querySelector("#main-container");

/* Export renderMain to index.js
 * Check if selected planet data exists in loal storage
 * render planet's info if it does or else render every planet
 */
export async function renderMain() {
  const bodies = await fetchData();
  const selectedPlanetData = localStorage.getItem("selectedPlanet");

  if (selectedPlanetData) {
    const selectedPlanet = JSON.parse(selectedPlanetData);
    main.innerHTML = generateInfoHTML(selectedPlanet);
    attachCloseBtn();
    localStorage.removeItem("selectedPlanet");
    searchPlanet();
  } else {
    main.innerHTML = `
    <section class="title">
      <h1>SOLSYSTEMET</h1>
      <p>SOLARIS</p>
    </section>

    <section id="planets-container">
      ${bodies.map((body) => renderPlanet(body)).join("")}
    </section>
  `;
    renderInfo();
    searchPlanet();
  }
}

// Get bodies from local storage
function getBodiesFromLocalStorage() {
  const bodies = JSON.parse(localStorage.getItem("bodies"));
  return bodies;
}

/* Check if inputField.value existing in any body.name
 * if found run generateInfoHTML(foundBody)
 */
function searchPlanet() {
  const inputField = document.querySelector("#search-input");
  const searchBtn = document.querySelector("#search-btn");
  const searchMsg = document.querySelector("#search-msg");

  searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (inputField.value !== "") {
      const foundBody = getBodiesFromLocalStorage().find(
        (body) =>
          body.name.toLowerCase() === inputField.value.trim().toLowerCase(),
      );
      if (foundBody) {
        searchSuccess();
        main.innerHTML = generateInfoHTML(foundBody);
        localStorage.setItem("selectedPlanet", JSON.stringify(foundBody));
        attachCloseBtn();
      } else {
        searchFail();
      }
    } else {
      searchMsg.classList.remove("hide");
      searchMsg.textContent = "The input is empty!";
    }
  });
}

/* Get planet from local storage/api
 * if body.name === "Saturnus" add line to planet
 * add classes depending on planet's name
 */
function renderPlanet(body) {
  const div = document.createElement("div");
  const span = document.createElement("span");
  const saturnusLine = document.createElement("div");

  if (body.name === "Saturnus") {
    saturnusLine.id = "saturnus-line";
    div.appendChild(saturnusLine);
    div.classList.add("planet", "medium");
  } else if (["Merkurius", "Venus", "Jorden", "Mars"].includes(body.name)) {
    div.classList.add("planet", "small");
  } else if (["Jupiter", "Uranus", "Neptunus"].includes(body.name)) {
    div.classList.add("planet", "medium");
  } else {
    div.classList.add("planet", "big");
  }

  div.id = body.name.toLowerCase();
  span.classList.add("planet-name", "hidden");
  span.textContent = body.name;
  div.appendChild(span);
  return div.outerHTML;
}

/* Check if clicked element has .planet class
 * save clicked planet.id as clickedPlanet and check if it matches with body.name
 * render html for the clicked planet
 */
function renderInfo() {
  const inputField = document.querySelector("#search-input");
  main.addEventListener("click", (event) => {
    if (event.target.classList.contains("planet")) {
      const clickedPlanet = event.target;
      const planetName = clickedPlanet.id.toLowerCase();

      const clickedBody = getBodiesFromLocalStorage().find(
        (body) => body.name.toLowerCase() === planetName,
      );

      if (clickedBody) {
        main.innerHTML = generateInfoHTML(clickedBody);
        localStorage.setItem("selectedPlanet", JSON.stringify(clickedBody));
        attachCloseBtn();
        searchSuccess();
        inputField.value = "";
      } else {
        console.log("Body not found for planet:", planetName);
      }
    }
  });
}

// Attach close button after the info is rendered //
function attachCloseBtn() {
  const closeBtn = document.querySelector("#close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeInfo);
  } else {
    console.warn("No close button found");
  }
}

// Remove selected planet from local storage and run renderMain()
function closeInfo() {
  const inputField = document.querySelector("#search-input");
  localStorage.removeItem("selectedPlanet");
  renderMain();
  searchSuccess();
  inputField.value = "";
}

/* Render html to display selected planet info
 * if the selected planet is solen change distance to km to jorden
 */
function generateInfoHTML(body) {
  const bodiesArray = getBodiesFromLocalStorage();
  const parseString = bodiesArray[3]?.distance || "";
  const distanceText =
    body.name === "Solen"
      ? `<p>KM FRÅN JORDEN</p>
       <p class="info-font gap-tb">${parseString.toLocaleString()}</p>`
      : `<p>KM FRÅN SOLEN</p>
       <p class="info-font gap-tb">${body.distance.toLocaleString()}</p>`;

  const saturnusLine =
    body.name === "Saturnus" ? `<div class="saturnus-line"></div>` : "";

  return `
    <div class="show-planet" id="${body.name.toLowerCase()}-select">${saturnusLine}</div>
    <section id="info-container">
      <div class="header-close">
        <h1 class="header">${body.name.toUpperCase()}</h1>
        <div id="close-btn">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      <p class="latin-name">${body.latinName}</p>
      <p class="description">${body.desc}</p>
      <div class="line"></div>
      <div class="info-parent">
        <div class="info">
          <p>OMKRETS</p>
          <p class="info-font gap-tb">${body.circumference.toLocaleString()} km</p >
          <p>DAY TEMPERATUR</p>
          <p class="info-font gap-tb">${body.temp.day} C</p>
        </div >
        <div class="info">
          ${distanceText}
          <p>NIGHT TEMPERATUR</p>
          <p class="info-font gap-tb">${body.temp.night} C</p>
        </div>
      </div>
      <div class="line"></div>
      <div class="info">
        <p>TYPE</p>
        <p class="info-font gap-tb">${body.type.toUpperCase()}</p>
      </div>
    </section >
  `;
}
