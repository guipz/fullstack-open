import express from "express";

const PORT = 3001;
const app = express();

app.get("/hello", (_req, res) => {
  return res.send("Hello Full Stack!");
});

app.listen(PORT, () => console.log(`Server started in port ${PORT}`));
