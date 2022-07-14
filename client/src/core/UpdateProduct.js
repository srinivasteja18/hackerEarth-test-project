import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../core/Base";
import { updateProduct, getProduct } from "./helper/productApiCalls";

const UpdateProduct = ({ match }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    description: "",
    photo: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: new FormData(),
  });
  const { productId } = useParams();
  const { name, description, getRedirect, formData } = values;

  const preLoad = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preLoad(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (field) => (e) => {
    const value = field === "photo" ? e.target.files[0] : e.target.value;
    formData.set(field, value);
    setValues({ ...values, error: false, getRedirect: false, [field]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true, getRedirect: false });
    updateProduct(productId, formData).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
        toast("Product Update Failed", { type: "error" });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          loading: false,
          createdProduct: data.name,
          photo: "",
          getRedirect: true,
        });
      }
    });
  };

  const redirectUser = () => {
    if (getRedirect) {
      toast("Product edited Succesfully", { type: "success" });
      setTimeout(() => navigate("/"), 4000);
    }
  };

  const productForm = () => {
    return (
      <form className="product-form">
        <h2>Update The Product</h2>
        <div className="product-form-container">
          <div className="container-image">
            <img src={`/photo/${productId}`} alt="product" />
          </div>
          <input
            className="product-form-image-input"
            id="product-image"
            type="file"
            name="image"
            placeholder="Choose a file"
            accept="image"
            onChange={handleChange("photo")}
          />
          <br />
          <label>name:</label>
          <input
            className="product-form-input"
            placeholder="Product Name"
            value={name}
            type="text"
            onChange={handleChange("name")}
          />
          <br />
          <label>description</label>
          <textarea
            name="Description"
            className="text-area product-form-input"
            value={description}
            placeholder="description"
            onChange={handleChange("description")}
          ></textarea>
          <br />
          <button onClick={onSubmit} className="category-button btn">
            Edit details
          </button>
        </div>
        <Link className="category-button" to="/">
          Back to Dashboard
        </Link>
      </form>
    );
  };

  return (
    <Base title="Edit your Product details">
      <div className="middle-section">
        {redirectUser()}
        {productForm()}
      </div>
    </Base>
  );
};

export default UpdateProduct;
