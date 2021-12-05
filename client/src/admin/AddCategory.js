import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { createCatgeory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");

  const { user, token } = isAuthenticated();

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createCatgeory(user._id, token, { name }).then((data) => {
      if (data.error) {
        return toast(data.error, { type: "warning" });
      } else {
        return toast("Catgeory added Succefully", { type: "success" });
      }
    });
  };

  const categoryForm = () => {
    return (
      <div className="middle-section">
        <div className="catgeory-section">
          <form className="category-form">
            <p className="category-label">Add Category</p>
            <input
              className="category-input"
              type="text"
              placeholder="For Ex: Summer"
              onChange={handleChange}
              value={name}
            ></input>
            <br />
            <span>
              <Link to="/admin/dashboard" className="category-button">
                Back
              </Link>
              <button onClick={onSubmit} className="category-button">
                ADD
              </button>
            </span>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Create Catgeory" description="Add more categories below">
      {categoryForm()}
    </Base>
  );
};
export default AddCategory;
