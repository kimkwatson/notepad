import express from "express";
import notesRouter from "./routes/notes.js";

const app = express();
app.use(express.json());

app.use("/notes", notesRouter);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});