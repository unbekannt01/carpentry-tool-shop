import React from "react";
import { useSelector } from "react-redux";
import { selectCartItems, selectTotalAmount } from "../redux/Slices/cartSlice";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { BsArrowLeftCircle } from "react-icons/bs";
const CheckoutSummary = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  return (
    <div>
      {cartItems.length == 0 ? (
        <Link
        to="/"
        type="button"
        class="btn mb-3"
        style={{ backgroundColor: "#C4A484" }}
      >
        <BsArrowLeftCircle /> Continue Shopping
      </Link>
      ) : (
        <div class="card shadow p-2">
          <div class="d-flex justify-content-between">
            <h5> Cart Items : </h5>
            <h5> {cartItems.length} </h5>
          </div>

          <hr />
          {cartItems.map((item, index) => (
            <div className="card p-2 mb-2">
              <div class="d-flex justify-content-between">
                <h5>Product Name : </h5>
                <h5>{item.name}</h5>
              </div>
              <div class="d-flex justify-content-between">
                <h5>Product Total Quantity : </h5>
                <h5>{item.cartQuantity}</h5>
              </div>
              <div class="d-flex justify-content-between">
                <h5>Product Unit Price : </h5>
                <h5>Rs. {item.price}</h5>
              </div>
            </div>
          ))}
          <hr />
          <div class="d-flex justify-content-between">
            <h5>Cart Total : </h5>
            <h5> Rs. {totalAmount} </h5>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutSummary;
