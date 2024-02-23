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
  </section >
    `;
}

/* Render planet from local storage/api
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

{
  /* <p>${body.name}</p> */
}
{
  /* <p>${body.type}</p> */
}
{
  /* <p>${body.latinName}</p> */
}
{
  /* <p>${body.circumference}</p> */
}
{
  /* <p>${body.temp.day}</p> */
}
{
  /* <p>${body.temp.night}</p> */
}
{
  /* <p>${body.desc}</p> */
}
{
  /* <br> */
}
