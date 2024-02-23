// Import only fetchData from api.js
import { fetchData } from "./api.js";

const main = document.querySelector("#main-container");

// Export renderMain to index.js
export async function renderMain() {
  const bodies = await fetchData();

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

/* Get planet from local storage/api
 * if body.name === "Saturnus" add line to planet
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

/* Get bodies from local storage and
 * check if planet.id matches with body.name then
 * render info for that planet
 */
function renderInfo() {
  const planets = document.querySelectorAll(".planet");
  const bodies = JSON.parse(localStorage.getItem("bodies"));

  planets.forEach((planet) => {
    planet.addEventListener("click", () => {
      const planetName = planet.id;

      const clickedBody = bodies.find(
        (body) => body.name.toLowerCase() === planetName,
      );
      if (clickedBody) {
        main.innerHTML = generateInfoHTML(clickedBody);
      } else {
        console.log("Body not found for planet:", planetName);
      }
    });
  });
}

/* Generate HTML to display seleted planet */
function generateInfoHTML(body) {
  return `
    <div id="info-container">
      <h1 class="header">${body.name.toUpperCase()}</h1>
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
          <p>KM FRÅN SOLEN</p>
          <p class="info-font gap-tb">${body.distance}</p>
          <p>NIGHT TEMPERATUR</p>
          <p class="info-font gap-tb">${body.temp.night} C</p>
        </div>
      </div>
      <div class="line"></div>
    </div>
  `;
}
