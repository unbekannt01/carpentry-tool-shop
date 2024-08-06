import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./progress.css";
import { toast } from "react-toastify";
import { db, storage } from "../../firebase/config";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import { selectProducts } from "../../redux/Slices/productSlice";

let initialState = {
  id: "",
  name: "",
  price: "",
  countInStock: "",
  brand: "",
  imageURL: "",
  desc: "",
  category: "",
};
let categories = ["Power Tools", "Hand Tools"];
const AddProduct = () => {
  const { id } = useParams();
  let [product, setProduct] = useState({ ...initialState });
  let [uploadProgress, setUploadProgress] = useState(0);
  let [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  let products = useSelector(selectProducts);
  let productEdit = products.find((item) => item.id == id);
  useEffect(() => {
    if (id) {
      setProduct({ ...productEdit });
    } else {
      setProduct({ ...initialState });
    }
  }, [id]);
  let handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  let handleImage = (e) => {
    let file = e.target.files[0];
    const storageref = ref(storage, `carpentry-tool/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageref, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => toast.error(error.message),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((url) => setProduct({ ...product, imageURL: url }))
          .catch((error) => console.log(error.message));
      }
    );
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    if (!id) {
      setIsLoading(true);
      try {
        addDoc(collection(db, "products"), {
          name: product.name,
          price: product.price,
          imageURL: product.imageURL,
          category: product.category,
          desc: product.desc,
          brand: product.brand,
          countInStock: product.countInStock,
          createdAt: Timestamp.now().toDate(),
        });
        setIsLoading(false);
        toast.success("Product Added");
        navigate("/dash/viewproduct");
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
    } else {
      setIsLoading(true);
      try {
        if(productEdit.imageURL != product.imageURL){
          let sRef=ref(storage,productEdit.imageURL)
          deleteObject(sRef )
        }
        setDoc(doc(db, "products", id), {
          name: product.name,
          price: product.price,
          imageURL: product.imageURL,
          category: product.category,
          desc: product.desc,
          brand: product.brand,
          countInStock: product.countInStock,
          createdAt: productEdit.createdAt,
          updatedAt: Timestamp.now().toDate(),
        });
        setIsLoading(false);
        toast.success("Product Updated");
        navigate("/dash/viewproduct");
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
    }
  };
  return (
    <div className="card shadow p-2">
      {isLoading && <Loader />}
      <h1>{id ? "Edit" : "Add"} Products</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div class="mb-3 col-6">
            <label for="" class="form-label">
              Product Name
            </label>
            <input
              type="text"
              class="form-control"
              name="name"
              placeholder="Name Of the Product "
              value={product.name}
              onChange={handleChange}
            />
          </div>
          <div class="mb-3 col-6">
            <label for="" class="form-label">
              Product Price
            </label>
            <input
              type="text"
              class="form-control"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div class="mb-3 col-6">
            <label for="" class="form-label">
              Product Brand
            </label>
            <input
              type="text"
              class="form-control"
              name="brand"
              placeholder="Brand"
              value={product.brand}
              onChange={handleChange}
            />
          </div>
          <div class="mb-3 col-6">
            <label for="" class="form-label">
              Count In Stock
            </label>
            <input
              type="number"
              class="form-control"
              name="countInStock"
              placeholder="Stock"
              value={product.countInStock}
              onChange={handleChange}
            />
          </div>
          {uploadProgress == 0 ? null : (
            <div className="progress">
              <div
                className="progress-bar"
                style={{ width: `${uploadProgress}%` }}
              >
                {uploadProgress < 100
                  ? `Uploading ${uploadProgress}%`
                  : `Uploaded ${uploadProgress}%`}
              </div>
            </div>
          )}
          <div class="mb-3 mt-2">
            <label for="" class="form-label">
              Product Image
            </label>
            <input
              type="file"
              class="form-control"
              name="imageURL"
              accept="image/*"
              onChange={handleImage}
            />
          </div>
          {id && (
            <img
              src={productEdit.imageURL}
              style={{ height: "140px", width: "150px" }}
            />
          )}
          <div class="mb-3">
            <label for="" class="form-label">
              Select Category
            </label>
            <select
              class="form-select"
              name="category"
              onChange={handleChange}
              value={product.category}
            >
              <option selected disabled>
                Select one
              </option>
              {categories.map((c, index) => (
                <option key={index}>{c}</option>
              ))}
            </select>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">
              Product Description
            </label>
            <textarea
              class="form-control"
              name="desc"
              placeholder="Description"
              value={product.desc}
              onChange={handleChange}
            />
          </div>
          <div class="d-grid gap-2">
            <button
              type="submit"
              class="btn"
              style={{ backgroundColor: "#C4A484" }}
            >
              Save Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
