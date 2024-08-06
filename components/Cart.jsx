import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CLEAR_CART,
  DECREASE,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectTotalAmount,
} from "../redux/Slices/cartSlice";
import { BsArrowLeftCircle, BsArrowLeftRight, BsTrash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/Slices/authSlice";
const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const isLoggedIn=useSelector(selectIsLoggedIn)
  const dispatch = useDispatch();
  const navigate=useNavigate()
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
  });

  let url=window.location.href
  let handleCheckout=()=>{
    if(isLoggedIn){
      navigate('/checkout-details')
    }
    else{
      dispatch(SAVE_URL(url))
      navigate('/login')
    }
  }
  return (
    <div className="container mt-5">
      <Link
        to="/"
        type="button"
        class="btn mb-3"
        style={{ backgroundColor: "#C4A484" }}
      >
        <BsArrowLeftCircle /> Continue Shopping
      </Link>
      <div class="card">
        <div class="card-header">
          <h1>My Cart</h1>
        </div>
        <div class="card-body shadow">
          <div class="table-responsive">
            <table class="table table-bordered table-striped">
              <thead>
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length == 0 && (
                  <tr>
                    <td colSpan={7}>No Products In Cart</td>
                  </tr>
                )}
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td scope="row">{index + 1}</td>
                    <td>{item.name}</td>
                    <td>
                      <img src={item.imageURL} style={{ width: "50px" }} />
                    </td>
                    <td>{item.price}</td>
                    <td>
                      <button
                        type="button"
                        style={{
                          backgroundColor: "#C4A484",
                          width: "20px",
                          borderColor: "#C4A484",
                        }}
                        onClick={() => dispatch(DECREASE(item))}
                      >
                        -
                      </button>
                      <input
                        value={item.cartQuantity}
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
                        onClick={() => dispatch(ADD_TO_CART(item))}
                      >
                        +
                      </button>
                    </td>
                    <td>{item.price * item.cartQuantity}</td>
                    <td>
                      <button
                        type="button"
                        class="btn btn-danger"
                        onClick={() => dispatch(REMOVE_FROM_CART(index))}
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="row">
            <div className="col-4">
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => dispatch(CLEAR_CART())}
              >
                Clear Cart
              </button>
            </div>
            <div className="col-3 offset-5">
              <h4>
                Total : <span className="float-end">Rs. {totalAmount}</span>
              </h4>
              <hr />
              <div class="d-grid gap-2">
                <button type="button" class="btn btn-warning" onClick={handleCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
