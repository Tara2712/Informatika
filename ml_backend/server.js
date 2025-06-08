require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const activeTokens = new Set();


const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization || "";
  const token = auth.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Manjkajoč žeton" });
  req.token = token;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ msg: "Neveljaven žeton" });
    if (!activeTokens.has(decoded.jti))
      return res.status(401).json({ msg: "Odjavljen žeton" });
    req.user = decoded;
    next();
  });
};

const app = express();
const PORT = process.env.PORT || 5100;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.post("/api/isci", verifyToken, async (req, res) => {
  const { query, min_similarity } = req.body;

  try {
    const response = await axios.post("http://localhost:8000/search", {
      query,
      min_similarity: min_similarity ?? 0.3,
    },
    { headers: { 
      Authorization: `Bearer ${req.token}` 
    } 
  });
    res.json(response.data);
  } catch (error) {
    const status = error.response?.status || error.code || '???';
  console.error('ML API error:', status, error.message);

 // Če je težava v avtentikaciji (401), jo posreduj naprej,
  // da bo front-end vedel, da je potekel / neveljaven žeton
  if (error.response?.status === 401) {
    return res.status(401).json({ msg: 'Neveljaven ali potekel žeton (ML API)' });
  }

  // Če ML API sploh ni dosegljiv (ECONNREFUSED)
  if (error.code === 'ECONNREFUSED') {
    return res.status(503).json({ msg: 'ML storitev (port 8000) ni dosegljiva' });
  }

  res.status(500).json({ error: 'Napaka pri klicu ML API' });
}
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password)
    return res.status(400).json({ msg: "Manjkajoča polja" });
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminHash = process.env.ADMIN_PWHASH;
  if (email !== adminEmail)
    return res.status(401).json({ msg: "Napačni podatki" });
  const ok = await bcrypt.compare(password, adminHash);
  if (!ok) return res.status(401).json({ msg: "Napačni podatki" });
  const jti = uuidv4();
  const token = jwt.sign({ sub: "admin", email, jti }, process.env.JWT_SECRET);
  activeTokens.add(jti);
  res.json({ token });
});

app.post("/auth/logout", verifyToken, (req, res) => {
  activeTokens.delete(req.user.jti); 
  res.json({ msg: "Odjava uspešna" });
});


app.listen(PORT, () => {
  console.log(`✅ backend runna na http://localhost:${PORT}`);
});

const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

const CSV_FILE_PATH = path.join(
  __dirname,
  "..",
  "shared_data",
  "df_no_nan_img.csv"
); // .. <- "idi gor en directory"

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
