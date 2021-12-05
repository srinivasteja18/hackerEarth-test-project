import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import {
  updateProduct,
  getCategories,
  getProduct,
} from "./helper/adminapicall";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: new FormData(),
  });
  const { productId } = useParams();
  const { name, description, price, stock, categories, getRedirect, formData } =
    values;

  const preLoad = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preLoadCategories();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          stock: data.stock,
          price: data.price,
          category: data.category,
          categories: data.categories,
          formData: new FormData(),
        });
      }
    });
  };

  const preLoadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
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
    updateProduct(productId, user._id, token, formData).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
        toast("Product Update Failed", { type: "error" });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          stock: "",
          price: "",
          category: "",
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
      toast("Product Added Succesfully", { type: "success" });
      setTimeout(() => navigate("/admin/dashboard"), 4000);
    }
  };

  const productForm = () => {
    return (
      <form className="product-form">
        <h2>Update The Product</h2>
        <div className="product-form-container">
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
          <input
            className="product-form-input"
            placeholder="Product Name"
            value={name}
            type="text"
            onChange={handleChange("name")}
          />
          <br />
          <textarea
            name="Description"
            className="text-area product-form-input"
            value={description}
            placeholder="description"
            onChange={handleChange("description")}
          ></textarea>
          <br />
          <select
            onChange={handleChange("category")}
            className="product-form-input"
          >
            <option>Select</option>
            {categories &&
              categories.map((cate, index) => (
                <option key={index} value={cate._id}>
                  {cate.name}
                </option>
              ))}
          </select>
          <input
            type="number"
            className="product-form-input"
            placeholder="Price"
            value={price}
            onChange={handleChange("price")}
          />
          <br />
          <input
            type="number"
            placeholder="stock"
            className="product-form-input"
            value={stock}
            onChange={handleChange("stock")}
          />
          <button onClick={onSubmit} className="category-button btn">
            Update Product
          </button>
        </div>
        <Link className="category-button" to="/admin/dashboard">
          Back to Dashboard
        </Link>
      </form>
    );
  };

  return (
    <Base title="Update Products" description="update and customize products">
      <div className="middle-section">
        {redirectUser()}
        {productForm()}
      </div>
    </Base>
  );
};

export default UpdateProduct;
