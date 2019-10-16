import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import AddRecipeModal from "./AddRecipeModal";
import SearchInput from "./SearchInput";
import styled, { css } from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #28A745;
  color: #28A745;
  margin: 0 1em;
  padding: 0.25em 1em;
`;


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
          console.log("Recipe deleted successfully");
          refreshRecipeListOnRemove(recipeId);
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
        </span>

        < span >
          < button
            onClick = { () => handleDelete(recipe.id) }
            className = "btn btn-danger"
          >
            Delete
          </button>
        </span>
      </li>
    )
  });

  const refreshRecipeList = (recipe) => {
    let recipes = recipeList.slice();
    recipes = recipes.concat(recipe);
    setRecipeList( recipes );
  };

  const refreshRecipeListOnRemove= (recipeId) => {
    let recipes = recipeList.slice();

    recipes = recipes.filter( (recipe) => {
      return recipe.id !== recipeId;
    });

    setRecipeList(recipes);
  };

  const handleSearch = (searchText) => {
    fetch(`/recipes/?name=${searchText}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .then(
      (response) => {
        if (response.status === 200) {
          return response.json()
        }
        else {
          console.log("An error ocurred: Check your form for errors");
        }
      }
    )
    .then((response) => {
        setRecipeList(response.results);
      }
    )
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
      <SearchInput
        handleSearch={handleSearch}
      />
      <div className="row ">
        <div className="col-md-10 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="">
              <Button onClick={openAddRecipeModal}>
                Add Recipe
              </Button>
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