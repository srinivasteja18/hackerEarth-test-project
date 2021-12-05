import React, { useState } from "react";
import { signup } from "../auth/helper";
import Base from "../core/Base";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";

const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password } = values;

  const handleChanges = (field) => (e) => {
    setValues({ ...values, error: false, [field]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
          toast(data.error, { type: "error" });
        } else {
          setValues({
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
          toast("Signup Successful, Please signin", { type: "success" });
          navigate("/signin");
        }
      })
      .catch((err) => console.log("Error in SignUp", err));
  };
  const signupForm = () => (
    <form className="auth-card">
      <h2>SignUp</h2>
      <div className="auth-helper">
        <label className="auth-labels">Name</label>
        <br />
        <input
          onChange={handleChanges("name")}
          className="auth-inputs prfl"
          type="text"
          required
          value={name}
        />
        <BsFillPersonFill className="auth-icons" />
      </div>
      <div className="auth-helper">
        <label className="auth-labels">Email</label>
        <br />
        <input
          onChange={handleChanges("email")}
          className="auth-inputs"
          type="email"
          required
          value={email}
        />
        <FaEnvelope className="auth-icons" />
      </div>
      <div className="auth-helper">
        <label className="auth-labels">Password</label>
        <br />
        <input
          onChange={handleChanges("password")}
          className="auth-inputs"
          type="password"
          required
          value={password}
        />
        <RiLockPasswordFill className="auth-icons" />
      </div>

      <button onClick={onSubmit} className="auth-button">
        SignUp
      </button>
    </form>
  );

  return (
    <Base title="Signup Page" className="body">
      {signupForm()}
      <p className="auth-text">
        Already an User?{" "}
        <span
          onClick={() => {
            navigate("/signin");
          }}
          className="auth-span"
        >
          {" "}
          SignIn here
        </span>
      </p>
    </Base>
  );
};
export default Signup;
