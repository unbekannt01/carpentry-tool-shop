import React, { useState } from "react";
import Loader from "../assets/spinner.jpg";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectUserEmail, selectUserID } from "../redux/Slices/authSlice";
import { selectCartItems, selectTotalAmount } from "../redux/Slices/cartSlice";
import { selectShippingAddress } from "../redux/Slices/checkoutSlice";
import { useEffect } from "react";
import CheckoutSummary from "./CheckoutSummary";
import { toast } from "react-toastify";

const CheckoutForm = () => {
  let [message, setMessage] = useState(null);
  let [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectUserEmail);
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectTotalAmount);
  const shippingAddress = useSelector(selectShippingAddress);

  useEffect(() => {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
  }, [stripe]);
  let handleSubmit=async(e)=>{
    e.preventDefault()
    setMessage(null)
    setIsLoading(true)
    await stripe.confirmPayment({
      elements,
      confirmParams:{return_url:"http://localhost:3000/checkout-success"},
      redirect:"if_required"
    }).then(result=>{
      if(result.error){
        toast.error(result.error)
        setMessage(result.error)
        return
      }
      if(result.paymentIntent){
        if(result.paymentIntent.status=="Succeeded"){
          setIsLoading(false)
          toast.success("Payment Done")
          navigate('/checkout-success')
          //Save Order
        }
      }
    })
  }
  return <div className="container shadow mt-5 p-3">
    <form onSubmit={handleSubmit}>
    <div className="row">
      <div className="col-6">
        <h2>Checkout Summary</h2><hr/>
        <CheckoutSummary/>
      </div>
      <div className="col-6">
        <h2>Stripe Checkout</h2><hr/>
        <PaymentElement id="payment-element"></PaymentElement>
        <div class="d-grid gap-2">
              <button type="submit" name="" id="" class="mt-3 btn btn-primary">
                {isLoading ? 
                  <img src={Loader} alt="Loading" style={{width:'50px'}} />
                :
                <>(Pay Now)</>
                }
                </button>
              </div>
      </div>
    </div>
    </form>
  </div>;
};

export default CheckoutForm;
