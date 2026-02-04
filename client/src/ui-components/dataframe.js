import { createButtons } from "./dbButtons.js";
const $ = (tag) => document.createElement(tag);

export function createDataFrame() {
  const container = $("div");
  const lat = $("div");
  const lon = $("div");
  const temp = $("div");
  const hum = $("div");
  const name = $("input");
  const buttons = createButtons();

  container.id = "data-container";
  lat.id = "latitude";
  lon.id = "longitude";
  temp.id = "temperature";
  hum.id = "humidity";
  name.id = "name";
  name.placeholder = "input name";

  container.appendChild(lat);
  container.appendChild(lon);
  container.appendChild(temp);
  container.appendChild(hum);
  container.appendChild(name);
  container.appendChild(buttons);
  return container;
}
