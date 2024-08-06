import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "./CheckoutSummary";
import { CountryDropdown } from "react-country-region-selector";
import { selectShippingAddress, store_address } from "../redux/Slices/checkoutSlice";
import { useEffect } from "react";
let initialState = {
  name: "",
  address_Line1: "",
  address_Line2: "",
  mobile: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
};

const CheckoutDetails = () => {
  let [address, setAddress] = useState({ ...initialState });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let handleSubmit=(e)=>{
    e.preventDefault()
    dispatch(store_address(address))
    navigate('/checkout')
  }
  const shippingaddress=useSelector(selectShippingAddress)
  useEffect(()=>{
    setAddress({...shippingaddress})
  },[shippingaddress])
  return (
    <div className="row m-3 p-2 shadow">
      <div class="col-6">
        <h1>CheckOut Details</h1> <hr />
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div class="mb-3 col-6">
              <label for="" class="form-label">
                Recipient Name
              </label>
              <input
                type="text"
                class="form-control"
                name="name"
                placeholder="Name"
                value={address.name}
                onChange={(e) =>
                  setAddress({ ...address, name: e.target.value })
                }
              />
            </div>
            <div class="mb-3 col-6">
              <label for="" class="form-label">
                Address Line 1
              </label>
              <input
                type="text"
                class="form-control"
                name="line1"
                placeholder="Address Line 2"
                value={address.address_Line1}
                onChange={(e) =>
                  setAddress({ ...address, addrerss_Line1: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row">
            <div class="mb-3 col-6">
              <label for="" class="form-label">
                Address Line 2
              </label>
              <input
                type="text"
                class="form-control"
                name="line2"
                placeholder="Address Line 2"
                value={address.address_Line2}
                onChange={(e) =>
                  setAddress({ ...address, addrerss_Line2: e.target.value })
                }
              />
            </div>
            <div class="mb-3 col-6">
              <label for="" class="form-label">
                Mobile No.
              </label>
              <input
                type="text"
                class="form-control"
                name="mobile"
                placeholder="Mobile No"
                value={address.mobile}
                onChange={(e) =>
                  setAddress({ ...address, mobile: e.target.value })
                }
              />
            </div>
          </div>
          <div className="row">
            <div class="mb-3 col-6">
              <label for="" class="form-label">
                City
              </label>
              <input
                type="text"
                class="form-control"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
            </div>
            <div class="mb-3 col-6">
              <label for="" class="form-label">
                State
              </label>
              <input
                type="text"
                class="form-control"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />
            </div>
          </div>
          <div className="mb-3">
            <label for="" class="form-label">
              Country
            </label>
            <CountryDropdown
              class="form-control"
              valueType="short"
              value={address.country}
              onChange={(value) => setAddress({ ...address, country: value })}
            ></CountryDropdown>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">
              Pin Code
            </label>
            <input
              type="text"
              class="form-control"
              name="pincode"
              placeholder="Pin Code"
              value={address.pincode}
              onChange={(e) =>
                setAddress({ ...address, pincode: e.target.value })
              }
            />
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">
              Procced To Checkout
            </button>
          </div>
        </form>
      </div>
      <div class="col-6">
        <h1>Summary</h1>
        <hr />
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default CheckoutDetails;
