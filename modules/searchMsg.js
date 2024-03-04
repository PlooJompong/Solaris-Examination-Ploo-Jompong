// Export two functions to renderMain.js

// Hide element with id="search-msg" if search success
export function searchSuccess() {
  const searchMsg = document.querySelector("#search-msg");

  searchMsg.classList.add("hide");
}

// Show element with id="search-msg" if search fail
export function searchFail() {
  const inputField = document.querySelector("#search-input");
  const searchMsg = document.querySelector("#search-msg");

  searchMsg.classList.remove("hide");
  searchMsg.textContent = `Can't find Planet: ${inputField.value}`;
}
