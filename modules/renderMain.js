// Import only fetchData from api.js
import { fetchData } from "./api.js";

const main = document.querySelector("#main-container");

/* Export renderMain to index.js
 * Check if selected planet data exists in local storage
 * render planet's info if it does or else render every planet
 */
export async function renderMain() {
  const bodies = await fetchData();
  const selectedPlanetData = localStorage.getItem("selectedPlanet");

  if (selectedPlanetData) {
    const selectedPlanet = JSON.parse(selectedPlanetData);
    main.innerHTML = generateInfoHTML(selectedPlanet);
    attachCloseBtn();
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
  }
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
  main.addEventListener("click", (event) => {
    if (event.target.classList.contains("planet")) {
      const clickedPlanet = event.target;
      const planetName = clickedPlanet.id;

      const clickedBody = JSON.parse(localStorage.getItem("bodies")).find(
        (body) => body.name.toLowerCase() === planetName,
      );

      if (clickedBody) {
        main.innerHTML = generateInfoHTML(clickedBody);
        localStorage.setItem("selectedPlanet", JSON.stringify(clickedBody));
        attachCloseBtn();
      } else {
        console.log("Body not found for planet:", planetName);
      }
    }
  });
}

/* Attach close button after the info is rendered */
function attachCloseBtn() {
  const closeBtn = document.querySelector("#close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeInfo);
  } else {
    console.warn("No close button found");
  }
}

/* remove selected planet from local storage and render main */
function closeInfo() {
  localStorage.removeItem("selectedPlanet");
  renderMain();
}

/* Generate info html
 * if the selected planet is Solen change to km to jorden
 */
function generateInfoHTML(body) {
  const bodiesArray = JSON.parse(localStorage.getItem("bodies"));
  const parseString = bodiesArray[3]?.distance || "";
  const distanceText =
    body.name === "Solen"
      ? `<p>KM FRÅN JORDEN</p>
       <p class="info-font gap-tb">${parseString}</p>`
      : `<p>KM FRÅN SOLEN</p>
       <p class="info-font gap-tb">${body.distance}</p>`;

  return `
    <div id="info-container">
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
        <div class="info-1">
          <p>OMKRETS</p>
          <p class="info-font gap-tb">${body.circumference} km</p>
          <p>DAY TEMPERATUR</p>
          <p class="info-font gap-tb">${body.temp.day} C</p>
        </div>
        <div class="info-2">
          ${distanceText} 
          <p>NIGHT TEMPERATUR</p>
          <p class="info-font gap-tb">${body.temp.night} C</p>
        </div>
      </div>
      <div class="line"></div>
    </div>
  `;
}
