import React, { Fragment } from "react";
import loader from "./loader.gif";

const Spinner = () => {
  return (
    <Fragment>
      <img
        src={loader}
        alt='Loading...'
        style={{ width: "400px", margin: "auto", display: "block" }}
      />
    </Fragment>
  );
};

export default Spinner;
