require('dotenv').config();  
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5100;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

app.use(express.json());

app.post("/api/isci", async (req, res) => {
  const { query, min_similarity } = req.body;

  try {
    const response = await axios.post("http://localhost:8000/search", {
      query,
      min_similarity: min_similarity ?? 0.3,
    });
    res.json(response.data);
  } catch (error) {
    console.error("error calling ML API: ", error.message);
    res.status(500).json({ error: "failed to fetch data from ML API" });
  }
});

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ msg: 'Manjkajoča polja' });
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash  = process.env.ADMIN_PWHASH;
  if (email !== adminEmail) return res.status(401).json({ msg: 'Napačni podatki' });
  const ok = await bcrypt.compare(password, adminHash);
  if (!ok) return res.status(401).json({ msg: 'Napačni podatki' });
  const token = jwt.sign({ sub: 'admin', email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
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
          podobnost: row.podobnost,
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
