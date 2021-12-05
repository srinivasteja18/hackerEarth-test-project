import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";

const AdminDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const dashBoardLeft = () => {
    return (
      <div className="admin-left">
        <h2>Admin Navigation</h2>
        <ul className="admin-list">
          <li className="admin-item">
            <Link className="admin-link" to="/admin/category/create">
              Create Categories
            </Link>
          </li>
          <li className="admin-item">
            <Link className="admin-link" to="/admin/categories">
              Manage Categories
            </Link>
          </li>
          <li className="admin-item">
            <Link className="admin-link" to="/admin/product/create">
              Create products
            </Link>
          </li>
          <li className="admin-item">
            <Link className="admin-link" to="/admin/orders">
              Manage Orders
            </Link>
          </li>
          <li className="admin-item">
            <Link className="admin-link" to="/admin/products">
              Manage products
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const dashBoardRight = () => {
    return (
      <div className="admin-right">
        <h2>Admin Information</h2>
        <ul className="admin-info-list">
          <li className="admin-info-item">
            <p className="admin-info">
              <span className="admin-span">Name:</span> {name}
            </p>
          </li>
          <li className="admin-info-item">
            <p className="admin-info">
              <span className="admin-span">Email:</span> {email}
            </p>
          </li>
          <li className="admin-info-item">
            <p className="admin-info">
              <span className="admin-span-2">Admin Info</span>
            </p>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base
      title="AdminDashBoard"
      description="Welcome! Manage your Products and Categories"
    >
      <div className="middle-section">
        <div className="admin-card">
          {dashBoardLeft()}
          {dashBoardRight()}
        </div>
      </div>
    </Base>
  );
};

export default AdminDashBoard;
