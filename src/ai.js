export async function getRecipeFromMistral(ingredientsArr) {
  try {
    const response = await fetch("http://localhost:3000/recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ingredients: ingredientsArr
      })
    });

    const data = await response.json();
    console.log(data);

    return data.recipe || "No recipe generated.";

  } catch (err) {
    console.error(err);
    return "Sorry, I couldn't generate a recipe right now.";
  }
}