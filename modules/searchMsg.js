export function searchSuccess() {
  const searchMsg = document.querySelector("#search-msg");

  searchMsg.classList.add("hide");
}

export function searchFail() {
  const inputField = document.querySelector("#search-input");
  const searchMsg = document.querySelector("#search-msg");

  searchMsg.classList.remove("hide");
  searchMsg.textContent = `Can't find Planet: ${inputField.value}`;
}
