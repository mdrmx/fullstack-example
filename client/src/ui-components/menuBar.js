import { createMenuButton } from "./menu.js";

export function createMenuBar() {
  const menudiv = document.createElement("div");
  menudiv.className = "menu-div";

  const title = document.createElement("h1");
  title.className = "title";
  title.textContent = "fullstack example";

  const hamburger = createMenuButton();

  menudiv.appendChild(title);
  menudiv.appendChild(hamburger);
  return menudiv;
}
