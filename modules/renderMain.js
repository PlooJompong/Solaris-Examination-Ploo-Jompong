// Import only fetchData from api.js
import { fetchData } from "./api.js";

// Export renderMain to index.js
export async function renderMain() {
  const main = document.querySelector("#main-container");
  const bodies = await fetchData();

  main.innerHTML = `
    <section class="title">
      <h1>SOLSYSTEMET</h1>
      <p>SOLARIS</p>
    </section>

  <section id="planets-container">
    ${bodies
      .map(
        (body) => `
        <div id=${body.name.toLowerCase()} class="planet">
          <p>${body.name}</p>
          <p>${body.type}</p>
          <p>${body.latinName}</p>
          <p>${body.circumference}</p>
          <p>${body.temp.day}</p>
          <p>${body.temp.night}</p>
          <p>${body.desc}</p>
          <br>
        </div>
      `,
      )
      .join("")} 
  </section >
  `;
}
