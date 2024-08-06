import React from "react";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../redux/Slices/cartSlice";
import { Link } from "react-router-dom";
import { BiCategory} from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";

const ProductItem = (product) => {
  const dispatch = useDispatch();
  let addtocart = () => {
    dispatch(ADD_TO_CART(product));
  };
  // const props={width:400, height: 250, zoomwith:500, img:{imageURL}}
  return (
    <div class="card col-3 m-2">
      <Link to={`/productdetails/${product.id}`}>
        <img
          class="card-img-top"
          src={product.imageURL}
          style={{ height: "220px" }}
          alt="Title"
        />
      </Link>
      <div class="card-body">
        <h4 class="card-text">
          <img
            src={require("../assets/name.png")}
            style={{ height: "20px", width: "20px" }}
          />{" "}
          {product.name}
        </h4>
        <p class="card-text">
          <FaRupeeSign /> {product.price}
        </p>
        <p class="card-text">
          <BiCategory /> {product.category}
        </p>
        <p class="card-text">
          <img
            src={require("../assets/brand.png")}
            style={{ height: "20px", width: "20px" }}
          />{""}
          {product.brand}
        </p>
        <p class="card-text">
          <MdOutlineDescription /> {product.desc}
        </p>
      </div>
      <div className="class-footer mb-2">
        <button type="button" class="btn" onClick={addtocart} style={{backgroundColor:'#C4A484'}}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
