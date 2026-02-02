import { els } from "./ui.js";
import { submitData } from "./api.js";

//handle data submission
async function handleSubmit() {
  //only submit if geolocation is initialised
  if (els.latitude.textContent && els.longitude.textContent) {
    const payload = {
      name: els.name.value,
      lat: parseFloat(els.latitude.textContent.split(": ")[1]),
      lon: parseFloat(els.longitude.textContent.split(": ")[1]),
      temp: parseFloat(els.temperature.textContent.split(": ")[1]),
      humidity: parseFloat(els.humidity.textContent.split(": ")[1]),
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
}

//wire ui elements to functions
export function wireEvents() {
  els.submitBtn.addEventListener("click", handleSubmit);
  els.exportBtn.addEventListener("click", handleExport);
}
