import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="header">
      <div className="nav-helper">
        <h1>Gallery CRUD app</h1>
        <ul className="nav-list">
          <li className="product-button">
            <NavLink className="nav-link" to="/new">
              add product
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navigation;
