import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/genai", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GOOGLE_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: { text: prompt }
        })
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Ошибка при обращении к API" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
