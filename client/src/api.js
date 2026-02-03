function weatherUrl(lat, lon) {
  return `/api?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}`;
}

//common function to handle JSON responses
async function handleJson(res) {
  if (!res.ok) {
    //if response not ok
    const text = await res.text(); //read body of response and convert to text
    throw new Error(`Request failed (${res.status}): ${text}`); //throw error with status and text
  }
  return res.json(); //if ok, parse and return JSON data
}

async function handleText(res) {
  if (!res.ok) {
    //if response not ok
    const text = await res.text(); //read body of response and convert to text
    throw new Error(`Request failed (${res.status}): ${text}`); //throw error with status and text
  }
  return res.text(); //if ok, parse and return text data
}

export async function fetchWeather(lat, lon) {
  const res = await fetch(weatherUrl(lat, lon));
  return handleJson(res);
}

export async function submitData(payload) {
  const res = await fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return handleText(res);
}

export async function fetchSubmissions() {
  const res = await fetch("/submissions");
  return handleJson(res);
}
