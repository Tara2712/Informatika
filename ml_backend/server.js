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
