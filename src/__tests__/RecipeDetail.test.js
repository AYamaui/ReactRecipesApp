import React from "react"
import {fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import RecipeDetail from "../components/RecipeDetail";
import {act} from "react-dom/test-utils";
import {BrowserRouter as Router} from "react-router-dom";


describe("<RecipeDetail />", () => {

  let container;
  let recipe;
  let props;

  beforeEach(() => {
    recipe = {
      name: "Pizza",
      description: "Pizza preparation...",
      ingredients: ["cheese", "tomato", "dough"]
    };

    props = {
      match: {
        params: {
          id: 1
        }
      }
    };

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(recipe)
      })
    );
  });

  it("should render the recipe details", async () => {


    await act(async () => {
      container = render(
        <Router>
          <RecipeDetail {...props} />
        </Router>
      );
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/recipes/1');

    expect(container.getByText(recipe.name)).toBeInTheDocument();
    expect(container.getByText(recipe.description)).toBeInTheDocument();
    // expect(container.getByText(recipe.ingredients[0])).toBeInTheDocument();
    // expect(container.getByText(recipe.ingredients[1])).toBeInTheDocument();
    // expect(container.getByText(recipe.ingredients[2])).toBeInTheDocument();

  });

  it("should open the edit recipe modal", async () => {
    await act(async () => {
      container = render(
        <Router>
          <RecipeDetail {...props}/>
        </Router>
      );
    });

    fireEvent.click(container.getByText('Edit'));

    expect(document.querySelector('body').className).toBe('modal-open');
  });
});
