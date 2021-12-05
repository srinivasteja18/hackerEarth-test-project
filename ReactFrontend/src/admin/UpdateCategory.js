import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "../auth/helper/index";
import Base from "../core/Base";
import { getCategory, updateOneCategory } from "./helper/adminapicall";

const UpdateCategory = () => {
  const [name, setName] = useState("");
  const { categoryId } = useParams();
  const { user, token } = isAuthenticated();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setName(e.target.value);
  };
  const preLoadCategory = (categoryId) => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setName(data.name);
      }
    });
  };

  useEffect(() => {
    preLoadCategory(categoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setName(name);
    updateOneCategory(categoryId, user._id, token, { name }).then((data) => {
      if (data.error) {
        return toast(data.error, { type: "error" });
      } else {
        setName("");
        toast("Catgeory updated Succefully", { type: "success" });
        navigate("/admin/categories");
      }
    });
  };

  const categoryForm = () => {
    return (
      <div className="middle-section">
        <div className="catgeory-section">
          <form className="category-form">
            <p className="category-label">Update Category</p>
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
                Update
              </button>
            </span>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Update Catgeory" description="Update the category below">
      {categoryForm()}
    </Base>
  );
};

export default UpdateCategory;
