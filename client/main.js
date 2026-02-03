//import custom modules
import { initGeolocation } from "./src/getGeolocation.js";
import { wireEvents } from "./src/dbButtons.js";

//main programme function
function init() {
  wireEvents();
  initGeolocation();
}

init();
