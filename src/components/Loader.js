import React from 'react';

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader-container">
        <div className="cloud front">
          <span className="left-front" />
          <span className="right-front" />
        </div>
        <span className="sun sunshine" />
        <span className="sun" />
        <div className="cloud back">
          <span className="left-back" />
          <span className="right-back" />
        </div>
      </div>
    </div>
  );
}

export default Loader;
