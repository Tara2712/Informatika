const express = require('express');
const cors    = require('cors');
const searchRouter = require('./parsanje');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));


app.use(express.json());               
app.use('/api', searchRouter);




const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
