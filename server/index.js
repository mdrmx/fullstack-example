import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import Database from "better-sqlite3";

const app = express();
const port = 3000;

dotenv.config();

app.use(express.static("public"));

//database setup
const options = { verbose: console.log }; //log all queries to console
const db = new Database("foobar.db", options); //open (or create) database file
db.pragma("journal_mode = WAL"); //enable WAL mode for better concurrency

// Ensure submissions table exists before inserts so we don't get errors this creates a schema if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS submissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lat REAL NOT NULL,
    lon REAL NOT NULL,
    temp REAL,
    humidity REAL,
    name TEXT,
    image BLOB,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// add image column to existing databases that predate it
const columns = db.prepare("PRAGMA table_info(submissions)").all();
if (!columns.some((col) => col.name === "image")) {
  db.exec("ALTER TABLE submissions ADD COLUMN image BLOB");
}

const API_KEY = process.env.API_KEY; //get API key from environment variables

// get route for fetching weather data from OpenWeatherMap API based on lat and lon query parameters
app.get("/api", async (req, res) => {
  console.log("Received request with query:", req.query);
  //destructure latitude and longitude from query parameters
  const { latitude, longitude } = req.query;

  //construct URL for OpenWeatherMap API usiging lat, lon, units=metric and API key
  const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

  //server side fetch to OpenWeatherMap API
  try {
    const response = await fetch(url);
    const result = await response.json();
    const { humidity, temp } = result.current; //extract humidity and temperature from response
    const data = { humidity, temp }; //create result object

    res.send(data); //send the JSON response back to client
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//post route for receiving data from client and logging it to database
app.post("/submit", express.json(), (req, res) => {
  const data = req.body;
  console.log("Received data:", data);
  const imageValue =
    Array.isArray(data.img) ? JSON.stringify(data.img)
    : typeof data.img === "string" ? data.img
    : null;
  // Insert data into the database
  const stmt = db.prepare(
    "INSERT INTO submissions (lat, lon, temp, humidity, name, image) VALUES (?, ?, ?, ?, ?, ?)",
  );
  stmt.run(data.lat, data.lon, data.temp, data.humidity, data.name, imageValue);
  res.status(200).send("Data received and stored");
});

//get route for fetch data from database
app.get("/submissions", (req, res) => {
  const stmt = db.prepare("SELECT * FROM submissions");
  const submissions = stmt.all();
  res.json(submissions);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
