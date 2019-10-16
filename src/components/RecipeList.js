import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import AddRecipeModal from "./AddRecipeModal";
import EditRecipeModal from "./EditRecipeModal";


const RecipeList = () => {

  const [recipeList, setRecipeList] = useState([]);
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);

  async function fetchRecipes() {

    let response = await fetch('/recipes/');
    response = await response.json();
    setRecipeList(response.results);
  }

  useEffect(() => {
    fetchRecipes()
  }, []);

  const openAddRecipeModal = () => {
    setShowAddRecipeModal(true);
  };

  const closeAddRecipeModal = () => {
    setShowAddRecipeModal(false);
  };

  const handleDelete = (recipeId) => {
    fetch(`/recipes/${recipeId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(
      (response) => {
        if (response.status === 204) {
          return response.json()
        } else {
          console.log("An error ocurred: Check your form for errors");
        }
      }
    )
  };

  const listItems = recipeList.map((recipe) => {
    return (
      <li
        key={ recipe.id }
        className = "list-group-item d-flex justify-content-between align-items-center"
      >
        < span
          className = {`recipe-title mr-2 completed-recipe`}
          title = { recipe.name }
        >
          <Link
            to={`/detail/${recipe.id}`}
            className="title">
              { recipe.name }
          </Link>
        < /span>

        < span >
          < button
            onClick = { () => handleDelete(recipe.id) }
            className = "btn btn-danger"
          >
            Delete
          < /button>
        < /span>
      </li>
    )
  });

  const refreshRecipeList = (recipe, action = "create") => {
    let recipes = recipeList.slice();

    if (action === "create") {
      recipes = recipes.concat(recipe);
    } else if (action === "update") {
      console.log(recipe);
    } else {
      delete recipes[recipe];
    }
    setRecipeList( recipes );
  };

  return (
    <main className="content">
      <AddRecipeModal
        isOpen={showAddRecipeModal}
        closeModal={closeAddRecipeModal}
        refreshRecipeList={refreshRecipeList}
        closeAddRecipeModal={closeAddRecipeModal}

      />
      <h1 className="text-white text-uppercase text-center my-4">Recipes app</h1>
      <div className="row ">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <button color="success" className="btn btn-primary" onClick={openAddRecipeModal}>
                Add Recipe
              </button>
            </div>
            <ul className="list-group list-group-flush">
              { listItems }
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
};

export default RecipeList;