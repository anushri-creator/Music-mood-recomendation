const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.static("public"));

app.post("/get-music", async (req, res) => {
  console.log("🔥 OpenAI API CALLED"); 

  const mood = req.body.mood;


  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: `Suggest 5 songs for a ${mood} mood` }
        ]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.json({ error: true });
  }
});

app.listen(3000, () => console.log("Server running at http://localhost:3000"));
