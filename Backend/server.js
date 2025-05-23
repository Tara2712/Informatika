// server.js  (ES-module sintaksa)
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

 const app   = express();
 const PORT  = process.env.PORT || 5000;
 const __dir = path.dirname(fileURLToPath(import.meta.url));


const IS_PROD       = process.env.NODE_ENV === 'production';
const FRONTEND_DIST = path.join(__dir, '..', 'Frontend', 'dist');
const FRONTEND_SRC  = path.join(__dir, '..', 'Frontend', 'src');


app.get('/api/index', (_, res) => {
  res.sendFile(path.join(IS_PROD ? FRONTEND_DIST : FRONTEND_SRC, 'index.html'));
});

app.use(express.static(IS_PROD ? FRONTEND_DIST : FRONTEND_SRC));


app.listen(PORT, () =>
  console.log(`🚀  Listening on http://localhost:${PORT}`)
);
