const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "moonshotai/kimi-k2-instruct-0905",
        messages: [
          { role: "system", content: "You are an AI agent." },
          { role: "user", content: userMessage }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get("/", (req, res) => {
  res.send("OpenClaw Agent Running 🚀");
});

app.listen(3000, () => console.log("Server started"));
