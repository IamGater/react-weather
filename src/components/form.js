import React from "react";

const Form = ({ weather }) => {
  return (
    <form onSubmit={weather}>
      <input type="text" name="city" placeholder="City" className="input" />
      <button className="btn">Get The Weather</button>
    </form>
  );
};

export default Form;
