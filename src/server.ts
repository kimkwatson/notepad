import express from "express";
import notesRouter from "./routes/notes.js";
import { initDb } from "./db/connect.js";

const app = express();
app.use(express.json());

app.use("/notes", notesRouter);

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

// initialize mongodb
const startServer = async (): Promise<void> => {
    try {
        await initDb();
        console.log('MongoDB connected');

        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server: ', error);
    }
};

startServer();