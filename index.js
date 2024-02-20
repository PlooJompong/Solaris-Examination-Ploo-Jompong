const baseURL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com";

const planetsContainer = document.querySelector("#planets-container");

fetchData();

// Make a POST request with baseURL to get key
// return key
async function getKey(url) {
  try {
    let response = await fetch(url, {
      method: "POST",
    });

    if (response.ok) {
      let data = await response.json();
      return data.key;
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Make a GET request with baseURL and key from getKey(url) function
// return data
async function getData(url, key) {
  try {
    let response = await fetch(url, {
      method: "GET",
      headers: { "x-zocom": `${key}` },
    });

    if (response.ok) {
      let data = await response.json();
      return data;
    } else {
      console.error("Error:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

// Fetch data after getting the key
async function fetchData() {
  try {
    const key = await getKey(baseURL + "/keys");
    const data = await getData(baseURL + "/bodies", key);
    data.bodies.forEach((body) => {
      // displayBody(body);
      console.log(body);
    });
  } catch (error) {
    console.error("Error:", error);
  }
}

// Create p tag for each element
function createParagraph(text) {
  const p = document.createElement("p");
  p.innerHTML = text;
  return p;
}

// Display data
function displayBody(body) {
  container.appendChild(createParagraph(`Type: ${body.type}`));
  container.appendChild(createParagraph(`Name: ${body.name}`));
  container.appendChild(createParagraph(`Latin Name: ${body.latinName}`));
  container.appendChild(
    createParagraph(`Circumference: ${body.circumference}`),
  );
  container.appendChild(
    createParagraph(`Temperature (Day): ${body.temp.day} °C`),
  );
  container.appendChild(
    createParagraph(`Temperature (Night): ${body.temp.night} °C`),
  );
  container.appendChild(createParagraph(`Description: ${body.desc}`));
}
