import React, { Component } from "react";
import Modal from "./components/Modal";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      viewCompleted: false,
      activeItem: {
        name: "",
        description: "",
        completed: false,
      },
      recipeList: [],
    };
  }


  componentDidMount() {
    fetch("/recipes/")
      .then(response => response.json())
      .then(data => {
        this.setState({ recipeList: data.results });
      });
  }


  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };
  handleSubmit = item => {
    this.toggle();
    alert("save" + JSON.stringify(item));
  };
  handleDelete = item => {
    alert("delete" + JSON.stringify(item));
  };
  createItem = () => {
    const item = { name: "", description: "", completed: false };
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  editItem = item => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };
  displayCompleted = status => {
    if (status) {
      return this.setState({ viewCompleted: true });
    }
    return this.setState({ viewCompleted: false });
  };
  renderTabList = () => {
    return (
      <div className="my-5 tab-list">
        <span
          onClick={() => this.displayCompleted(true)}
          className={this.state.viewCompleted ? "active" : ""}
        >
          complete
        </span>
        <span
          onClick={() => this.displayCompleted(false)}
          className={this.state.viewCompleted ? "" : "active"}
        >
          Incomplete
        </span>
      </div>
    );
  };
  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.recipeList;

    return newItems.map(recipe => (
      <li
        className = "list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className = {`recipe-title mr-2 completed-recipe`}
          title = {recipe.name}
        >
          {recipe.name}
        < /span>
        < span >
          < button
            onClick = {() => this.editItem(recipe)}
            className = "btn btn-secondary mr-2"
          >
            Edit
          < /button>

          < button
            onClick = {() => this.handleDelete(recipe)}
            className = "btn btn-danger"
          >
            Delete
          < /button>
        < /span>
      < /li>
    ));
  };
  render() {
    return (
      <main className="content">
        <h1 className="text-white text-uppercase text-center my-4">Recipes app</h1>
        <div className="row ">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="">
                <button onClick={this.createItem} className="btn btn-primary">
                  Add task
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}
export default App;