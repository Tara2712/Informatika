const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5100;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.post("/api/isci", async (req, res) => {
  const { query, min_similarity } = req.body;

  try {
    const response = await axios.post("http://localhost:8000/search", {
      query,
      min_similarity: min_similarity ?? 0.5,
    });
    res.json(response.data);
  } catch (error) {
    console.error("error calling ML API: ", error.message);
    res.status(500).json({ error: "failed to fetch data from ML API" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ backend runna na http://localhost:${PORT}`);
});

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const CSV_FILE_PATH = path.join(__dirname, "data", "df_no_nan_img.csv");

app.get("/api/sr/:sr", async (req, res) => {
  const srToFind = req.params.sr;
  const results = [];

  fs.createReadStream(CSV_FILE_PATH)
    .pipe(csv())
    .on("data", (row) => {
      if (row.SR === srToFind) {
        results.push({
          id: row.SR,
          naziv: row.NAZIV_SR,
          datum: row.DATUM_NASTANKA_SR,
          status: row.STATUS,
          worklogId: row.WORKLOGID,
          opis: row.OPIS,
          dolgOpis: row.DOLGI_OPIS_X,
        });
      }
    })
    .on("end", () => {
      res.json({ results });
    })
    .on("error", (err) => {
      console.error("Error reading CSV:", err.message);
      res.status(500).json({ error: "Failed to read CSV" });
    });
});
