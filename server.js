import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

console.log("HF token:", process.env.HF_ACCESS_TOKEN);

app.post("/recipe", async (req, res) => {
  const { ingredients } = req.body;

  const prompt = `You are a helpful assistant that suggests a recipe from these ingredients: ${ingredients.join(
    ", "
  )}.`;

  try {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-R1",
          messages: [
            { role: "system", content: "Eres un asistente de recetas." },
            { role: "user", content: prompt },
          ],
          max_tokens: 300,
        }),
      }
    );

    const data = await response.json();
    console.log("HF response:", data);

    if (!response.ok) {
      console.error("HF returned error:", data);
      return res.status(response.status).json({ error: data });
    }

let recipeText = "No recipe generated";

if (data?.choices?.length > 0) {
  const firstChoice = data.choices[0];
  if (firstChoice.message?.content) {
    recipeText = firstChoice.message.content;
  } else if (firstChoice.text) {
    recipeText = firstChoice.text;
  }
}

recipeText = recipeText.replace(/<think>\s*/gi, "").trim();

res.json({ recipe: recipeText }); 
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Error generating recipe" });
  }
});

app.listen(3000, () =>
  console.log("Server running on port 3000 (chat completions API)")
);