import React, { useState } from "react";
import { isAuthenticated, Authenticate, signin } from "../auth/helper";
import Base from "../core/Base";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";

const Signin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    loading: "",
    didRedirect: "",
  });
  const { email, password, didRedirect } = values;
  const { user } = isAuthenticated();

  const handleChange = (field) => (e) => {
    setValues({ ...values, error: false, [field]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          Authenticate(data, () => {
            setValues({
              ...values,
              email: "",
              password: "",
              error: "",
              loading: "",
              didRedirect: true,
            });
          });
        }
      })
      .catch((err) =>
        toast("SignIn Failed, Please check your Details", { type: "error" })
      );
  };

  const performredirect = () => {
    if (didRedirect) {
      if (user && user.role === 1) {
        return navigate("/admin/dashboard");
      } else {
        console.log("COMEON");
        return navigate("/user/dashboard");
      }
    }
    if (isAuthenticated()) {
      console.log("GO GO");
      navigate("/");
    }
  };

  return (
    <Base title="Signin Page">
      <form className="auth-card">
        <h2>SignIn</h2>
        <div className="auth-helper">
          <label className="auth-labels">Email</label>
          <br />
          <input
            value={email}
            onChange={handleChange("email")}
            className="auth-inputs"
            type="email"
            required
          />
          <FaEnvelope className="auth-icons" />
        </div>

        <div className="auth-helper">
          <label className="auth-labels">Password</label>
          <br />
          <input
            value={password}
            onChange={handleChange("password")}
            className="auth-inputs"
            type="password"
            required
          />
          <RiLockPasswordFill className="auth-icons" />
        </div>

        <button onClick={onSubmit} className="auth-button">
          SignIn
        </button>
      </form>
      <p className="auth-text">
        Didn't have an account?{" "}
        <span
          onClick={() => {
            navigate("/signup");
          }}
          className="auth-span"
        >
          {" "}
          SignUp here
        </span>
      </p>
      {performredirect()}
    </Base>
  );
};
export default Signin;
