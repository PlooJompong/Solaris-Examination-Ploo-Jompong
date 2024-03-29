// Export renderHeader to index.js
const header = document.querySelector("#header-container");

export function renderHeader() {
  header.innerHTML = `
    <form>
      <input type="text" id="search-input" placeholder="Search Planet" list="planets" maxlength="15"/>
        <datalist id="planets">
          <option value="Solen">
          <option value="Merkurius">
          <option value="Venus">
          <option value="Jorden">
          <option value="Mars">
          <option value="Jupiter">
          <option value="Saturnus">
          <option value="Uranus">
          <option value="Neptunus">
        </datalist>
      <button type="submit" id="search-btn">Search</button>
    </form>
    <p id="search-msg" class="hide"></p>
    `;
}
