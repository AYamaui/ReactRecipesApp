import React from "react";
import RecipeForm from "./RecipeForm";
import {
  Modal,
  ModalHeader,
} from "reactstrap";


const AddRecipeModal = (props) => {

  const formatIngredients = (ingredients) => {

    return ingredients.map((ingredient) => {
      return (
        { "name": ingredient }
      )
    })
  };

  const handleSubmit = (values, actions) => {
    values.ingredients = formatIngredients(values.ingredients);

    fetch("/recipes/", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
    .then(
      (response) => {
        if (response.status === 201) {
          return response.json()
        }
        else {
          console.log("An error ocurred: Check your form for errors");
        }
      }
    )
    .then((recipe) => {
        console.log("Recipe added Successfully!");
        console.log(recipe);
        props.refreshRecipeList(recipe);
        props.closeAddRecipeModal();
        actions.setSubmitting(false);
      }
    )
  };

  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.closeAddRecipeModal
    }>
      <ModalHeader toggle={props.closeAddRecipeModal}> Recipe </ModalHeader>
      <RecipeForm
        name={""}
        description={""}
        ingredients={[]}
        handleSubmit={handleSubmit}
      />
    </Modal>
  )

};
export default AddRecipeModal;