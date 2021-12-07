import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect } from "react/cjs/react.development";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { deleteCategory, getCategories } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const { user, token } = isAuthenticated();

  const preLoad = () => {
    getCategories(user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  useEffect(() => {
    preLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Deleting a product
  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        toast("Category Delete Failed!!", { type: "error" });
      } else {
        toast("Category Deleted Succesfully", { type: "success" });
        preLoad();
      }
    });
  };

  const AllCategories = () => (
    <div className="categories-section">
      <h2>All Categories</h2>
      <div className="categories-container">
        {categories &&
          categories.map((category, index) => (
            <div key={index} className="category-card">
              <p className="category-name">
                <span>Category Name: </span>
                {category.name}
              </p>
              <div className="category-buttons">
                <Link
                  to={`/admin/update/category/${category._id}`}
                  className="button"
                >
                  Update
                </Link>
                <button
                  onClick={() => deleteThisCategory(category._id)}
                  className="button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      <Link to="/admin/dashboard" className="category-button">
        Back
      </Link>
    </div>
  );

  return (
    <Base
      title="Manage Categories"
      description="View and manage your categories"
    >
      {AllCategories()}
    </Base>
  );
};

export default ManageCategories;
