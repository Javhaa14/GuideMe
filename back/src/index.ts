import express, { json } from "express";
import dotenv from "dotenv";

import cors from "cors";

const app = express();

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
app.listen(9999, () => {
  console.log("running at  http://localhost:9999/");
});
