import React, {useState} from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";


const AddRecipeModal = (props) => {
  const [recipe, setRecipe] = useState({ name: null, description: null, ingredients: []});

  const onSubmit = (recipe) => {
    console.log(recipe)
    // fetch("/recipes/", {
    //   method: "POST",
    //   headers: {
    //     "Accept": "application/json",
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(recipe)
    // })
    // .then(
    //   (response) => {
    //     if (response.status === 201) {
    //       return response.json()
    //     }
    //     else {
    //       console.log("An error ocurred: Check your form for errors");
    //     }
    //   }
    // )
    // .then((data) => {
    //     console.log("Recipe added Successfully!");
    //     props.refreshList(data);
    //   }
    // )
  };

  return (
    <Modal isOpen={props.isOpen} toggle={props.closeModal}>
      <ModalHeader toggle={props.closeModal}> Recipe </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="recipeName">Name</Label>
            <Input
              type="text"
              name="name"
              value={recipe.name}
              placeholder="Enter Recipe Name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="text"
              name="description"
              value={recipe.description}
              placeholder="Enter Recipe description"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={() => onSubmit}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  )

};
export default AddRecipeModal;