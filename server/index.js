import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const CHAT_CONTEXT = `Ты — эксперт по проекту AgroCredit Scoring. Твоя задача — отвечать на вопросы пользователей о проекте, используя только информацию, описанную ниже. Не придумывай лишнего и не выходи за рамки описанного функционала.

Информация о проекте:

Цель проекта: помочь банкам и микрофинансовым организациям оценивать кредитоспособность фермеров, снижать риски и делать финансирование прозрачным и доступным.

Функции:

Анализ финансовых данных фермеров

Оценка истории урожайности

Учет климатических и региональных рисков

Генерация скорингового балла

Персональные рекомендации по кредиту

Технологии: Python, FastAPI, AI-модели для прогнозирования урожайности и финансовой устойчивости.

Текущий статус: Prototype

Следующие шаги: запуск мобильной версии, расширение функционала на разные культуры и регионы, улучшение точности AI-алгоритмов.

Правила ответов:

Отвечай кратко и понятно, избегая сложных терминов, если это не требуется.

При вопросе о функциях или пользе проекта объясняй, как проект решает проблему и какие преимущества даёт.

При вопросах о технологиях указывай, какие инструменты и AI используются.

Если вопрос выходит за рамки описанного функционала или статуса проекта, честно скажи, что такой информации нет.`;

app.post("/chat", async (req, res) => {
    try {
        const { message } = req.body;
        const apiKey = process.env.GOOGLE_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ reply: "Server Error: API Key not configured" });
        }

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: CHAT_CONTEXT + "\n\nUser Question: " + message
                        }]
                    }]
                })
            }
        );

        const data = await response.json();

        if (data.candidates && data.candidates[0].content) {
            const botReply = data.candidates[0].content.parts[0].text;
            res.json({ reply: botReply });
        } else {
            console.error("Gemini API Error:", JSON.stringify(data, null, 2));
            res.status(500).json({ reply: "Извините, произошла ошибка при получении ответа от AI." });
        }

    } catch (err) {
        console.error("Server Error:", err);
        res.status(500).json({ reply: "Ошибка сервера." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
