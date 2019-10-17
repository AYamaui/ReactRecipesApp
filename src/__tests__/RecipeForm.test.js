import React from "react"
import {fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import RecipeForm from "../components/RecipeForm";
import {wait} from "@testing-library/dom";


describe("<RecipeForm />", () => {

  let recipe;
  let handleSubmit;

  beforeEach(() => {
    recipe = {
      name: "Pizza",
      description: "Pizza preparation...",
      ingredients: ["cheese", "tomato", "dough"]
    };

    handleSubmit = jest.fn((values, actions) => {});
  });

  it("should render an empty form", () => {


    const { getByText } = render(
      <RecipeForm
        name={""}
        description={""}
        ingredients={[]}
        handleSubmit={handleSubmit}
      />
    );

    expect(getByText("Name:")).toBeInTheDocument();
    expect(getByText("Description:")).toBeInTheDocument();
    expect(getByText("Add Ingredients")).toBeInTheDocument();
    expect(document.getElementsByTagName('input').length).toBe(2);

    fireEvent.click(getByText("Add Ingredients"));

    expect(document.getElementsByTagName('input').length).toBe(3);

  });

  it("should render the form with already filled fields", () => {

    const { container, getByText } = render(
      <RecipeForm
        name={recipe.name}
        description={recipe.description}
        ingredients={recipe.ingredients}
        handleSubmit={handleSubmit}
      />
    );

    const form = container.querySelector("#recipeForm");

    expect(getByText("Name:")).toBeInTheDocument();
    expect(getByText("Description:")).toBeInTheDocument();
    expect(getByText("Add Another")).toBeInTheDocument();

    expect(container.querySelector(`input[value=${recipe.name}]`)).toBeInTheDocument();
    expect(container.querySelector(`input[value='${recipe.description}']`)).toBeInTheDocument();
    expect(container.querySelector(`input[value='${recipe.ingredients[0]}']`)).toBeInTheDocument();
    expect(container.querySelector(`input[value='${recipe.ingredients[1]}']`)).toBeInTheDocument();
    expect(container.querySelector(`input[value='${recipe.ingredients[2]}']`)).toBeInTheDocument();

    expect(document.getElementsByTagName('input').length).toBe(5);

    expect(form).toHaveFormValues({
      "name": recipe.name,
      "description": recipe.description,
      "ingredients.0": recipe.ingredients[0],
      "ingredients.1": recipe.ingredients[1],
      "ingredients.2": recipe.ingredients[2]
    })
  });

  it("should remove an ingredient from the form when click on x", () => {

    const { container, getAllByText } = render(
      <RecipeForm
        name={recipe.name}
        description={recipe.description}
        ingredients={recipe.ingredients}
        handleSubmit={handleSubmit}
      />
    );

    const form = container.querySelector("#recipeForm");
    expect(document.getElementsByTagName('input').length).toBe(5);

    fireEvent.click(getAllByText("x")[2]);

    expect(form).toHaveFormValues({
      "name": recipe.name,
      "description": recipe.description,
      "ingredients.0": recipe.ingredients[0],
      "ingredients.1": recipe.ingredients[1]
    })
  });

  it("should render an empty form", async () => {

    const { getByText } = render(
      <RecipeForm
        name={""}
        description={""}
        ingredients={[]}
        handleSubmit={handleSubmit}
      />
    );

    await wait( () => fireEvent.click(getByText("Submit")));

    expect(document.querySelector('.form-error')).toBeInTheDocument();
  });

});
