const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Hello from Backend v1/v2!" });
});

app.post("/login", (req, res) => {
  const token = jwt.sign({ user: "admin" }, "secret", { expiresIn: "1h" });
  res.json({ token });
});

app.get("/secure", (req, res) => {
  const token = req.headers.authorization;
  try {
    jwt.verify(token, "secret");
    res.json({ message: "Secure data" });
  } catch {
    res.status(401).send("Unauthorized");
  }
});

app.listen(3000, () => console.log("Backend running"));
