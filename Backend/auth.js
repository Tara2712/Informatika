const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
require("dotenv").config();


router.post("/login", async (req, res) => {
  const { ADMIN_EMAIL, ADMIN_PWHASH, JWT_SECRET } = process.env;
  const { email, password } = req.body || {};
  if (email !== ADMIN_EMAIL) return res.status(401).json({ msg: "Napaka" });
  const ok = await bcrypt.compare(password, ADMIN_PWHASH);
  if (!ok) return res.status(401).json({ msg: "Napaka" });
  const token = jwt.sign({ sub: "admin", email }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

module.exports = { authRouter: () => router, verifyToken };

