import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { FaEnvelope } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";

const AdminDashBoard = () => {
  const {
    user: { name, email },
  } = isAuthenticated();

  const dashBoardLeft = () => {
    return (
      <div className="admin-left">
        <h2>User Navigation</h2>
        <ul className="admin-list">
          <li className="admin-item">
            <Link className="admin-link" to="/user/update">
              Update Profile
            </Link>
          </li>
          <li className="admin-item">
            <Link className="admin-link" to="/user/orders">
              My Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const dashBoardRight = () => {
    return (
      <div className="admin-right">
        <h2>User Information</h2>
        <ul className="admin-info-list">
          <li className="admin-info-item">
            <BsFillPersonFill className="info" />
            {name}
          </li>
          <li className="admin-info-item">
            <FaEnvelope className="info" />
            {email}
          </li>
          <li className="admin-info-item">
            <p className="admin-info">
              <span className="admin-span-2">User Info</span>
            </p>
          </li>
        </ul>
      </div>
    );
  };
  return (
    <Base title="User DashBoard" description="Welcome! view your profile here">
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
