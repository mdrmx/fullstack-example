function handleMenuClick(event) {
  const menuBtn = event.currentTarget;
  const isHamburger = menuBtn.textContent === "\u2630";
  const menuPanel = document.querySelector(".menu-panel");

  menuBtn.textContent = isHamburger ? "\u2715" : "\u2630";

  if (menuPanel) {
    menuPanel.style.display = isHamburger ? "block" : "none";
  }
}

/////// export function for creating the menu ///////

export function createMenuButton() {
  const menuBtn = document.createElement("div");
  menuBtn.className = "menu-btn";
  menuBtn.textContent = "\u2630";

  menuBtn.addEventListener("click", handleMenuClick);

  return menuBtn;
}

export function createMenuPanel() {
  const menuItems = ["Home", "Gallery", "About", "Contact"];
  const menupanel = document.createElement("div");
  menupanel.className = "menu-panel";
  menupanel.style.display = "none";

  for (const item of menuItems) {
    const menuItem = document.createElement("div");
    menuItem.className = "menu-item";
    menuItem.textContent = item;
    menupanel.appendChild(menuItem);
  }

  return menupanel;
}
