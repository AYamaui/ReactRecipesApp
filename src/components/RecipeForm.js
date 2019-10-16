import React from "react"
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { ModalBody, ModalFooter, Button } from "reactstrap";


const RecipeForm = (props) => {

  const validateIngredient = (value) => {
    let error;
    if (value === "") {
      error = "The ingredient cannot be empty"
    }
    return error
  };

  const validateName = (value) => {
    let error;
    if (value === "") {
      error = "The recipe name cannot be empty"
    }
    return error
  };

  return (
    <Formik
      initialValues={
        {
          name: props.name,
          description: props.description,
          ingredients: props.ingredients
        }
      }
      onSubmit={ (values, actions) => {props.handleSubmit(values, actions)} }
      validate={ (values, props) => {
          let errors = {};
          if (values.ingredients.length === 0) {
            errors.ingredients = "The ingredients list cannot be empty"
          }
          return errors
        }
      }
    >
      {
        ( {values, isSubmitting, handleChange, setFieldValue} ) => (
          <Form id="recipe-form">
            <ModalBody>
              <div className="form-divider">
                <span className="form-lbl"> Name: </span>
                {
                  <React.Fragment>
                    <Field type="text" name="name" validate={validateName} />
                    <ErrorMessage name="name" component="div" className="form-error text-danger" />
                  </React.Fragment>
                }
              </div>
              <div className="form-divider">
                <span className="form-lbl"> Description: </span>
                  {
                    <React.Fragment>
                      <Field type="text" name="description" />
                      <ErrorMessage name="description" component="div" className="form-error text-danger"/>
                    </React.Fragment>
                  }
              </div>
              <div className="form-divider">
                <React.Fragment>
                  <ErrorMessage name="ingredients" component="div" className="form-error text-danger" />
                  <FieldArray name="ingredients">
                    { (arrayHelpers) => {
                      return (
                        <div>
                          { (values.ingredients && values.ingredients.length > 0) ? (
                            <React.Fragment>
                              <div className="form-divider">
                                <span className="form-lbl"> Ingredients </span>
                              </div>
                              {
                                values.ingredients.map((ingredient, idx) => {
                                  return (
                                    <div key={idx}>
                                      <Field type="text"
                                          name={ `ingredients.${idx}` }
                                          className="ingredient"
                                          validate={validateIngredient}
                                      />
                                      <button type="button" onClick={() => arrayHelpers.remove(idx, "")} > x </button>
                                      <ErrorMessage
                                        name={ `ingredients.${idx}` }
                                        component="div"
                                        className="form-error text-danger"
                                      />
                                    </div>
                                  )
                                })
                              }
                              <div className="form-divider">
                                <button  type="button" onClick={() => arrayHelpers.push("")} > Add Another </button>
                              </div>
                            </React.Fragment>
                            )
                            :
                            (
                              <div className="form-divider">
                                <button  type="button" onClick={() => arrayHelpers.push("")}> Add Ingredients </button>
                              </div>
                            )
                          }
                        </div>
                      );
                    }}
                  </FieldArray>
                </React.Fragment>
              </div>
            </ModalBody>
            <ModalFooter>
             {(
              <Button color="success" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
              )}
            </ModalFooter>
          </Form>
        )
      }
    </Formik>
  )
};

export default RecipeForm;