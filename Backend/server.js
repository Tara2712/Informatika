require('dotenv').config();   
const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const express = require('express');
const cors    = require('cors');
const searchRouter = require('./parsanje');

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));


app.use(express.json());               
app.use('/api', searchRouter);

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



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`API listening on http://localhost:${PORT}`);
});
