import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalAmount } from "../redux/Slices/cartSlice";
import { selectUserEmail } from "../redux/Slices/authSlice";
import { selectShippingAddress } from "../redux/Slices/checkoutSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51NmeWQSGvueMW3iqCnUCtxChN5VOqBcXpl8NMDoVhgGsfMOiGA7d7zJUVvjLcMG31vcdHM9LZOY0VGrjhFOSvy8z00oTIaQDbr"
);

const Checkout = () => {
  const [message, setMessage] = useState("Initializing checkout");
  const [clientSecret, setClientSecret] = useState("");

  const totalAmount = useSelector(selectTotalAmount);
  const userEmail = useSelector(selectUserEmail);
  const shippingAddress = useSelector(selectShippingAddress);
  const description = "Carpentry Tool Shop";

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:2000/payment", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        amount: totalAmount,
        email: userEmail,
        shipping: shippingAddress,
        description: description,
      }),
    })
      .then((res) => {
        return res.json().then((data) => {
            console.log(data.clientSecret)
          setClientSecret(data.clientSecret);
        });
      })
      .catch((error) => {
        console.log(error);
        setMessage("Failed To Initialize Checkout");
        toast.error("Something Went Wrong");
      });
  }, []);
  const apperance = { theme: "stripe" };
  const options = { clientSecret, apperance };
  return (
    <div className="container">
      {!clientSecret && <h3>{message}</h3>}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;
