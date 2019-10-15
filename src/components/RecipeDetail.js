import React, { useState, useEffect } from "react"
import RecipeList from "./RecipeList";


const RecipeDetail = (props) => {

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchRecipe() {
    let response = await fetch(`/recipes/${props.match.params.id}`);
    response = await response.json();
    setRecipe(response);
    setLoading(false);
  }

  useEffect(() => {
    fetchRecipe()
  }, []);


  if (loading) {
      return (
        <h1 className="text-white text-uppercase text-center my-4">Loading...</h1>
      )
  } else {

    const renderIngredients = recipe.ingredients.map((ingredient) => {
      return (
        <li
          key={ ingredient.id }
          className = "list-group-item d-flex justify-content-between align-items-center"
        >
          < span
            className = {`recipe-title mr-2 completed-recipe`}
            title = { ingredient.name }
          >
            { ingredient.name }
          < /span>

          < span >
            < button
              onClick = { () => this.editItem(ingredient) }
              className = "btn btn-secondary mr-2"
            >
              Edit
            < /button>

            < button
              onClick = { () => this.handleDelete(ingredient) }
              className = "btn btn-danger"
            >
              Delete
            < /button>
          < /span>
        </li>
      )
    });

    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Recipes app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <h2 className="text-uppercase text-center my-4">{ recipe.name }</h2>
              <p className="text-center">{ recipe.description }</p>
                <ul className="list-group list-group-flush">
                  { renderIngredients }
                </ul>
            </div>
          </div>
        </div>
      </main>
    );
  }
};

export default RecipeDetail;


