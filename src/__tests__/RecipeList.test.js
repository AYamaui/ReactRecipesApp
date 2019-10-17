import React from "react"
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { act } from "react-dom/test-utils"
import RecipeList from "../components/RecipeList"
import { BrowserRouter as Router } from 'react-router-dom';
import {wait} from "@testing-library/dom";

describe('<RecipeList />', () => {

  let container;
  let fakeRecipes;

  beforeEach(() => {
    fakeRecipes = fakeRecipes = {
      results: [
        {
          id: 1,
          name: "Test recipe",
          description: "Recipe description",
          ingredients: ["ing1", "ing2"]
        },
        {
          id: 2,
          name: "Test recipe2",
          description: "Recipe description2",
          ingredients: ["ing1"]
        }
      ]
    };

    jest.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeRecipes)
      })
    );
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  it("should render the recipes", async () => {

    await act(async () => {
      container = render(
        <Router>
          <RecipeList />
        </Router>
      );
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('/recipes/');
    expect(container.getByText(fakeRecipes.results[0].name)).toBeInTheDocument();
    expect(container.getByText(fakeRecipes.results[1].name)).toBeInTheDocument();
    expect(document.getElementsByTagName("li").length).toBe(2);

  });

  it("should delete a recipe", async () => {

    await act(async () => {
      container = render(
        <Router>
          <RecipeList/>
        </Router>
      );
    });

    fireEvent.click(container.getAllByText('Delete')[0]);

    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(global.fetch).toHaveBeenCalledWith(`/recipes/1`, {"headers":
                                                              {
                                                                "Accept": "application/json",
                                                                "Content-Type": "application/json"},
                                                                "method": "DELETE"
                                                            });
    await wait(
      () => expect(container.getAllByText('Delete').length).toBe(1)
    );
  });

  it("should open the create a recipe modal", async () => {
    await act(async () => {
      container = render(
        <Router>
          <RecipeList/>
        </Router>
      );
    });

    fireEvent.click(container.getByText('Add Recipe'));

    expect(document.querySelector('body').className).toBe('modal-open');
  });

});