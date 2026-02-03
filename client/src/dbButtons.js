import { els } from "./ui.js";
import { submitData, fetchSubmissions } from "./api.js";
import { state } from "./getGeolocation.js";

//handle data submission
async function handleSubmit() {
  //only submit if geolocation is initialised
  if (state.latitude && state.longitude) {
    //create data payload object using state and UI values
    const payload = {
      name: els.name.value,
      lat: state.latitude,
      lon: state.longitude,
      temp: state.temperature,
      humidity: state.humidity,
    };
    try {
      console.log("Submitting data:", payload);
      await submitData(payload);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  } else {
    console.log("Geolocation not initialised. Cannot submit data.");
  }
}

//handle data retrieval
async function handleExport() {
  console.log("Exporting data...");
  try {
    const data = await fetchSubmissions();
    console.log("Submissions from server:", data);
  } catch (error) {
    console.error("Export failed:", error);
  }
}

//wire ui elements to functions
export function wireEvents() {
  els.submitBtn.addEventListener("click", handleSubmit);
  els.exportBtn.addEventListener("click", handleExport);
}
