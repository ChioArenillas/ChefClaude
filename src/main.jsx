import React from 'react'

export default function Main() {
    const ingredients= ["Chicken", "Oregano", "Tomatoes"]
    const ingredientsList= ingredients.map( ingredient =>  <li key={ingredient}>{ingredient}</li>)

    function handlerSubmit(event){
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const newIngredient = formData.get("ingredient")
        ingredients.push(newIngredient) 
        console.log(ingredients)
    }
    
  return (
    <main>
      <form className='add-ingredient-form '>
        <input type="text" name='ingredient' placeholder='e.g. oregano' />
        <button onSubmit={handlerSubmit}> Add ingredient</button>
      </form>
      <ul>
        {ingredientsList}
      </ul>
    </main>
  )
}
