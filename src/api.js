const jsonHeaders = { "Content-Type": "application/json" };

function weatherUrl(lat, lon) {
  return `/api?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}`;
}

async function handleJson(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed (${res.status}): ${text}`);
  }
  return res.json();
}

async function handleText(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed (${res.status}): ${text}`);
  }
  return res.text();
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
