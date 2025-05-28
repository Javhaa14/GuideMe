import express, { json } from "express";
import dotenv from "dotenv";

import cors from "cors";

const app = express();
const port = process.env.PORT || 9999;

app.use(json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello");
});
app.listen(port, () => {
  console.log(`running at  http://localhost:${port}/`);
});
