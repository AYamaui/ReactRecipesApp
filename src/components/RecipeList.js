import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import AddRecipeModal from "./AddRecipeModal";


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
            onClick = { () => this.editItem(recipe) }
            className = "btn btn-secondary mr-2"
          >
            Edit
          < /button>

          < button
            onClick = { () => this.handleDelete(recipe) }
            className = "btn btn-danger"
          >
            Delete
          < /button>
        < /span>
      </li>
    )
  });

  const openAddRecipeModal = () => {
    setShowAddRecipeModal(true);
  };

  const closeAddRecipeModal = () => {
    setShowAddRecipeModal(false);
  };

  const refreshList = (recipe) => {
    console.log(recipe);
    const recipes = recipeList.slice().concat(recipe);
    setRecipeList( recipes );
  };

  return (
    <main className="content">
      <AddRecipeModal
        isOpen={showAddRecipeModal}
        closeModal={closeAddRecipeModal}
        refreshList={refreshList}

      />
      <h1 className="text-white text-uppercase text-center my-4">Recipes app</h1>
      <div className="row ">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <button className="btn btn-primary" onClick={openAddRecipeModal}>
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