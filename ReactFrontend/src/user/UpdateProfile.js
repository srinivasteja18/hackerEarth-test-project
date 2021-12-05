import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getUserById, updateUser } from "./helper/userapicalls";

export default function MyOrders() {
  const { user, token } = isAuthenticated();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    lastname: "",
    email: "",
  });
  const { name, lastname, email } = values;

  const preLoad = () => {
    getUserById(user._id, token).then((data) => {
      if (data.error) {
        toast(data.error, { type: "error" });
      } else {
        setValues({
          ...values,
          name: data.name,
          lastname: data.lastname,
          email: data.email,
        });
      }
    });
  };

  useEffect(() => {
    preLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlechange = (field) => (e) => {
    setValues({ ...values, [field]: e.target.value });
  };

  const onSubmit = () => {
    setValues({ ...values });
    updateUser(user._id, token, values).then((data) => {
      if (data.error) {
        toast(data.error, { type: "error" });
      } else {
        setValues({
          ...values,
          name: "",
          lastname: "",
          email: "",
        });
        toast("Profile Updated Successfully!!", { type: "success" });
        navigate("/user/dashboard");
      }
    });
  };

  const updateForm = () => (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-inputs-div">
          <label>FirstName</label>
          <br />
          <input
            value={name}
            onChange={handlechange("name")}
            className="profile-input"
            type="text"
            required
          />
        </div>
        <div>
          <label>LastName</label>
          <br />
          <input
            value={lastname}
            onChange={handlechange("lastname")}
            className="profile-input"
            type="text"
            required
          />
        </div>
        <div className="profile-email">
          <label>Email ID</label>
          <br />
          <input
            value={email}
            onChange={handlechange("email")}
            className="profile-input"
            type="email"
            required
          />
        </div>
        <div>
          <button onClick={onSubmit} className="category-button">
            Update
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <Base title="Profile" description="Edit your personal Information">
      {updateForm()}
    </Base>
  );
}
