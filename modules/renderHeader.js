// Export renderHeader to index.js
export function renderHeader() {
  const header = document.querySelector("#header-container");
  header.innerHTML = `
    <form>
      <input type="text" id="search-input" placeholder="Search Planet" list="planets"/>
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
    `;
}
