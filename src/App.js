import React, {Component, useState} from "react";
import AddRecipeModal from "./components/AddRecipeModal";
import RecipeList from "./components/RecipeList";

const App = () => {

  return (

    <main className="content">
      <h1 className="text-white text-uppercase text-center my-4">Recipes app</h1>
      <div className="row ">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <ul className="list-group list-group-flush">
              { <RecipeList /> }
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default App;