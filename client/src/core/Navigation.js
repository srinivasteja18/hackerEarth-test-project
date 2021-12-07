import React from "react";
import { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated, signout } from "../auth/helper";

const Navigation = () => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="nav-helper">
        <h1>ShopingSpace</h1>
        <ul className="nav-list">
          <li className="nav-item">
            <NavLink
              style={({ isActive }) => {
                if (isActive) return { color: "gray" };
                else return { color: "white" };
              }}
              className="nav-link"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              style={({ isActive }) => {
                if (isActive) return { color: "gray" };
                else return { color: "white" };
              }}
              className="nav-link"
              to="/cart"
            >
              Cart
            </NavLink>
          </li>

          {isAuthenticated() && isAuthenticated().user.role === 0 && (
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => {
                  if (isActive) return { color: "gray" };
                  else return { color: "white" };
                }}
                className="nav-link"
                to="/user/dashboard"
              >
                U DashBoard
              </NavLink>
            </li>
          )}

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => {
                  if (isActive) return { color: "gray" };
                  else return { color: "white" };
                }}
                className="nav-link"
                to="/admin/dashboard"
              >
                A DashBoard
              </NavLink>
            </li>
          )}

          {isAuthenticated() ? (
            <li className="nav-item">
              <span
                style={{ color: "white", cursor: "pointer" }}
                className="nav-link"
                onClick={() => {
                  signout(() => {
                    toast("Signout Successful!!", { type: "success" });
                    navigate("/");
                  });
                }}
              >
                {" "}
                SignOut
              </span>
            </li>
          ) : (
            <Fragment>
              <li className="nav-item">
                <NavLink
                  style={({ isActive }) => {
                    if (isActive) return { color: "gray" };
                    else return { color: "white" };
                  }}
                  className="nav-link"
                  to="/signup"
                >
                  SignUp
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  style={({ isActive }) => {
                    if (isActive) return { color: "gray" };
                    else return { color: "white" };
                  }}
                  className="nav-link"
                  to="/signin"
                >
                  SignIn
                </NavLink>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Navigation;
