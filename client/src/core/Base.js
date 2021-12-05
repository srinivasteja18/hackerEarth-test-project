import React from "react";
import Navigation from "./Navigation";

const Base = ({ title = "Homepage", description = "Welcome", children }) => {
  return (
    <div className="main-page">
      <Navigation />
      <div className="base-section">
        <div className="base-header">
          <h1 className="base-header-title">{title}</h1>
          <p className="base-header-desciption">{description}</p>
        </div>
        {children}
      </div>
      <div className="footer">
        <h4>Designed by @srinivasteja18</h4>
      </div>
    </div>
  );
};

export default Base;
