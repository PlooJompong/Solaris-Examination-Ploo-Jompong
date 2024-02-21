// Export renderHeader to index.js
export function renderHeader() {
  const header = document.querySelector("#header-container");
  header.innerHTML = `
    <form>
      <input type="text" id="search-input" placeholder="Search Planet" />
      <button type="submit" id="search-btn"> Search</button>
    </form>
    `;
}
