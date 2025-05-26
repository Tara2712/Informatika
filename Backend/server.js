// servis.js
import express from 'express';
import cors    from 'cors';
import fs      from 'node:fs';
import csv     from 'csv-parser';

const app = express();



// CORS – dovoli klice z Vite-jevega dev-strežnika
app.use(cors({ origin: 'http://localhost:5173' }));
// če ti je v dev-u vseeno za varnost, lahko uporabiš kar app.use(cors());

app.use(express.json());                // za JSON body-je


app.post('/api/analyze', (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ error: 'text is required' });

  const keywords = text.toLowerCase().split(/\s+/);
  const matches  = [];

  fs.createReadStream('vzorec_podatkov.csv')
    .pipe(csv())
    .on('data', row => {
      const rowTxt = Object.values(row).join(' ').toLowerCase();
      if (keywords.some(k => rowTxt.includes(k))) matches.push(row);
    })
    .on('end',   () => res.json({ matches }))
    .on('error', err => res.status(500).json({ error: err.message }));
});



const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
