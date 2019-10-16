import React from "react";
import Form from 'react-bootstrap/Form'

const SearchInput = (props) => {
  return (
    <div className="ml-5 mr-5">
      <Form.Control
        size="lg"
        type="text"
        placeholder="Type a recipe name"
        className="mb-5 pl-10"
        onChange={e => props.handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;