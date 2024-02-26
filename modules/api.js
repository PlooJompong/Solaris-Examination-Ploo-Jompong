// Base URL
const baseURL = "https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com";

// Make a POST request with baseURL to get key
// return key
async function getApiKey(url) {
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

/* Make a GET request with baseURL and key from getApiKey
 * return data
 */
async function getBodiesData(url, key) {
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

/* Fetch data after getting the key
 * Export only fetchData()
 */
export async function fetchData() {
  try {
    if (localStorage.getItem("bodies")) {
      return JSON.parse(localStorage.getItem("bodies"));
    } else {
      const key = await getApiKey(baseURL + "/keys");
      const data = await getBodiesData(baseURL + "/bodies", key);
      if (data.bodies) {
        localStorage.setItem("bodies", JSON.stringify(data.bodies));
        const bodies = JSON.parse(localStorage.getItem("bodies"));
        return bodies;
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
