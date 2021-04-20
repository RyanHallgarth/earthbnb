import { React, useState } from "react";

const Search = ({ searchLocations }) => {
  const [text, setText] = useState("");

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    searchLocations(text);
    setText("");
  };
  return (
    <div>
      <form onSubmit={onSubmit} id='search'>
        <input
          type='text'
          name='text'
          placeholder='Find Rentals..'
          value={text}
          onChange={onChange}
        />
        <input type='submit' value='Search' />
      </form>
    </div>
  );
};

export default Search;
