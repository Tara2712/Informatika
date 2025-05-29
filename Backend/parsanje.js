const express = require('express');
const fs      = require('node:fs');
const csv     = require('csv-parser');

const router = express.Router();

router.post('/parsanje', (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'query is required' });
  }

  const keywords = query.toLowerCase().split(/\s+/);
  const matches  = [];

  fs.createReadStream('vzorec_podatkov.csv')
    .pipe(csv({ separator: ',' }))          
    .on('data', row => {
      const rowText = Object.values(row).join(' ').toLowerCase();

      if (keywords.some(k => rowText.includes(k))) {
        matches.push({
          id:       row.SR             ?? '',
          naziv:    row.NAZIV_SR       ?? '',
          opis:     row.OPIS           ?? '',
          dolgOpis: row.DOLGI_OPIS_X   ?? ''
        });
      }
    })
    .on('end',   () => res.json({ matches }))
    .on('error', err => res.status(500).json({ error: err.message }));
});

module.exports = router;
