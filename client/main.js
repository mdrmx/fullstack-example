//import custom modules
import { initGeolocation } from "./src/getGeolocation.js";
import { createMenuBar } from "./src/ui-components/menuBar.js";
import { createMenuPanel } from "./src/ui-components/menu.js";
import { createDataFrame } from "./src/ui-components/dataframe.js";

//main programme function
function init() {
  const app = document.getElementById("app");
  const menu = createMenuBar();
  const menuPanel = createMenuPanel();
  const data = createDataFrame();

  app.appendChild(menu);
  app.appendChild(menuPanel);
  app.appendChild(data);

  initGeolocation();
}

init();
