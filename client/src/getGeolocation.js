//import custom modules
import { setLocation, setWeather } from "./ui.js";
import { fetchWeather } from "./api.js";

export let state = {
  latitude: null,
  longitude: null,
  temperature: null,
  humidity: null,
};

//initialise geolocation
export function initGeolocation() {
  //check for geolocation support
  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
    return;
  }

  //get current position
  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    state.latitude = latitude.toFixed(2);
    state.longitude = longitude.toFixed(2);
    //set UI elements with geolocation data with custom module function
    setLocation(latitude, longitude);

    //fetch data from our server
    try {
      const weatherData = await fetchWeather(latitude, longitude);
      const { temp, humidity } = weatherData;
      setWeather({ temp, humidity });
      state.temperature = temp;
      state.humidity = humidity;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
}
