import { React, useState } from "react";
import { useHistory } from "react-router-dom";
import "../../Search.css";

const Search = ({ searchLocations }) => {
  const history = useHistory();
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchLocations(text);
    setText("");
    history.push("/search", { from: "Home" });
  };
  return (
    <div className='search'>
      <form onSubmit={onSubmit} className='form' id='search'>
        <input
          type='text'
          name='text'
          placeholder='Find Rentals..'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
    </div>
  );
};

export default Search;
