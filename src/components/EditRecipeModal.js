import React, {useState} from "react";
import RecipeForm from "./RecipeForm";
import {
  Modal,
  ModalHeader,
} from "reactstrap";


const EditRecipeModal = (props) => {
  const [recipe, setRecipe] = useState(props.recipe);

  const formatIngredients = (ingredients) => {

    return ingredients.map((ingredient) => {
      return (
        { "name": ingredient }
      )
    });
  };

  const handleSubmit = (values, actions) => {
    values.ingredients = formatIngredients(values.ingredients);

    fetch(`/recipes/${recipe.id}/`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
    .then(
      (response) => {
        if (response.status === 200) {
          console.log("The recipe was updated successfully");
          return response.json()
        }
        else {
          console.log("An error ocurred: Check your form for errors");
        }
      }
    )
    .then((recipe) => {
        setRecipe(recipe);
        props.refreshIngredientsList(recipe);
        props.closeModal();
      }
    )
  };

  if (recipe) {

    return (
      <Modal
        isOpen={props.isOpen}
        toggle={props.closeModal
      }>
        <ModalHeader toggle={props.closeModal}> Recipe </ModalHeader>
        <RecipeForm
          name={recipe.name}
          description={recipe.description}
          ingredients={recipe.ingredients.map((ing) => { return(ing.name)})}
          handleSubmit={handleSubmit}
        />
      </Modal>
    )
  } else {
    return (<React.Fragment></React.Fragment>)
  }

};
export default EditRecipeModal;