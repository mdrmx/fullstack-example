//shorthand function to get element by ID
const $ = (id) => document.getElementById(id);

//cache references to frequently used DOM elements
//exporting els object containing references to DOM elements
//the $ function is a shorthand for document.getElementById
export const els = {
  get latitude() {
    return $("latitude");
  },
  get longitude() {
    return $("longitude");
  },
  get temperature() {
    return $("temperature");
  },
  get humidity() {
    return $("humidity");
  },
  get name() {
    return $("name");
  },
  get submitBtn() {
    return $("submit-btn");
  },
  get exportBtn() {
    return $("export-btn");
  },
};

//functions to update UI elements
export function setLocation(lat, lon) {
  els.latitude.textContent = `Latitude: ${lat.toFixed(2)}°`;
  els.longitude.textContent = `Longitude: ${lon.toFixed(2)}°`;
}

export function setWeather({ temp, humidity }) {
  els.temperature.textContent = `Temperature: ${temp}°C`;
  els.humidity.textContent = `Humidity: ${humidity}%`;
}
//function to get the value of the name input field
export function getName() {
  return els.name.value;
}
