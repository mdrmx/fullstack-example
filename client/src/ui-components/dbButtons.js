import { els } from "../ui.js";
import { submitData, fetchSubmissions } from "../api.js";
import { state } from "../getGeolocation.js";

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
      const response = await submitData(payload);
      console.log(response);
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

// //wire ui elements to functions
// function wireEvents([submitBtn, exportBtn]) {}

export function createButtons() {
  const container = document.createElement("div");
  const submitBtn = document.createElement("button");
  const exportBtn = document.createElement("button");

  container.id = "button-container";

  submitBtn.className = "button";
  submitBtn.id = "submit-btn";
  submitBtn.textContent = "submit";

  exportBtn.className = "button";
  exportBtn.id = "export-btn";
  exportBtn.textContent = "load database";

  submitBtn.addEventListener("click", handleSubmit);
  exportBtn.addEventListener("click", handleExport);

  container.appendChild(submitBtn);
  container.appendChild(exportBtn);

  return container;
}
