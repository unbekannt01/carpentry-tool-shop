import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDocument from "../customHook/useFetchDocument";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  DECREASE,
  selectCartItems,
} from "../redux/Slices/cartSlice";
import { FaRupeeSign } from "react-icons/fa"
import { BiCategory } from "react-icons/bi"
import { MdOutlineDescription } from "react-icons/md"

const ProductDetails = () => {
  const { id } = useParams();
  const { document } = useFetchDocument("products", id);
  let [product, setProduct] = useState(null);
  const cart = useSelector(selectCartItems);
  const isCartAdded = cart.findIndex((item) => item.id === id);
  const cartdata = cart.find((item) => item.id === id);
  const dispatch = useDispatch();
  useEffect(() => {
    setProduct(document);
  }, [document]);
  return (
    <div className="container mt-5">
      <h2>Product Details</h2>
      <hr />
      {product && (
        <div className="row mt-3 p-2 shadow">
          <div className="col-4">
            <img src={product.imageURL} style={{ width: "350px" }} />
          </div>
          <div class="col-1 d-flex" style={{height: '440px',color:'ThreeDDarkShadow'}}>
            <div class="vr"></div>
          </div>
          <div className="col-5 ">
            <h4 class="card-title"><img src={require("../assets/name.png")} style={{height:'20px', width:'20px'}}/> {product.name}</h4><br/>
            <p class="card-text"><FaRupeeSign/> {product.price}</p>
            <p class="card-text"><BiCategory/> {product.category}</p>
            <p class="card-text"><img src={require("../assets/brand.png")} style={{height:'20px', width:'20px'}}/> {product.brand}</p>
            <p class="card-text"><MdOutlineDescription/> {product.desc}</p>
            {isCartAdded === -1 ? (
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => dispatch(ADD_TO_CART(product))}
              >
                Add To Cart
              </button>
            ) : (
              <>
                <button
                  type="button"
                  style={{
                    backgroundColor: "#C4A484",
                    width: "20px",
                    borderColor: "#C4A484",
                  }}
                  onClick={() => dispatch(DECREASE(product))}
                >
                  -
                </button>
                <input
                  value={cartdata.cartQuantity}
                  style={{ width: "40px" }}
                  class="text-center"
                  readonly
                />
                <button
                  type="button"
                  style={{
                    backgroundColor: "#C4A484",
                    width: "20px",
                    borderColor: "#C4A484",
                  }}
                  onClick={() => dispatch(ADD_TO_CART(product))}
                >
                  +
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
