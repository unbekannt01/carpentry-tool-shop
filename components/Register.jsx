import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import Loader from "../../src/components/Loader"
let initialState = {
  username: "",
  mobile: "",
  email: "",
  pwd: "",
  cpwd: "",
};

const Register = () => {
  let [user, setUser] = useState({ ...initialState });
  let [isLoading, setIsLoading] = useState(false);
  let [errors, setErrors] = useState({});

  const navigate = useNavigate();

  let registerUser = (e) => {
    e.preventDefault();

    let mobilePattern = /^\+91\d{10}$/;
    let emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9]+.[a-zA-Z]{2,3}$/;
    let pwdPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    if (user.mobile === "") {
      setErrors({ ...errors, mobileError: "Mobile Number is required" });
    } else if (!mobilePattern.test(user.mobile)) {
      setErrors({ ...errors, mobileError: "Invalid Mobile Number" });
    } else if (user.email === "") {
      setErrors({ ...errors, emailError: "Email is required" });
    } else if (!emailPattern.test(user.email)) {
      setErrors({ ...errors, emailError: "Invalid Email" });
    } else if (user.pwd === "") {
      setErrors({ ...errors, pwdError: "Password is required" });
    } else if (!pwdPattern.test(user.pwd)) {
      setErrors({ ...errors, pwdError: "Password in Wrong Format" });
    // } else if (user.pwd !== user.pwd) {
    //   setErrors({ ...errors, passworderror: "password not match" });
    } else {
      setErrors({ ...errors, mobileError: "" });
      setErrors({ ...errors, emailerror: "" });
      setErrors({ ...errors, pwdError: "" });

      setIsLoading(true);
      createUserWithEmailAndPassword(auth, user.email, user.pwd, user.mobile)
        .then(async (userCredential) => {
          const user1 = userCredential.user;

          const docRef = doc(db, "users", user1.uid);
          let { username, mobile, email, pwd } = user;
          let role = "user";
          await setDoc(docRef, { username, mobile, email, pwd, role , createdAt: Timestamp.now().toDate() });
 
          setIsLoading(false);
          toast.success("Registered successfully");
          navigate("/login");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="container mt-5" style={{ fontFamily: "monospace" }}>
      {isLoading && <Loader/>}
      <div className="row border shadow">
        <div className="col-4">
          <img
            src={require("../assets/register.jpeg")}
            style={{ height: "550px", width: "350px" }}
            alt="Login"
          />
        </div>
        <div className="col-6 mt-4">
          <h2>Registration</h2>
          <hr />
          <form onSubmit={registerUser}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder=""
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                autoFocus
              />
              <label htmlFor="formId1">Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                name="mobile"
                placeholder=""
                value={user.mobile}
                onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              />
              <label htmlFor="formId1">Mobile No.</label>
              <span className="text-danger">{errors.mobileError}</span>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder=""
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <label htmlFor="formId1">Email</label>
              <span className="text-danger">{errors.emailError}</span>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                name="pwd"
                placeholder=""
                value={user.pwd}
                onChange={(e) => setUser({ ...user, pwd: e.target.value })}
              />
              <label htmlFor="formId1">Password</label>
              <span className="text-danger">{errors.pwdError}</span>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                name="cpwd"
                placeholder=""
                value={user.cpwd}
                onChange={(e) => setUser({ ...user, cpwd: e.target.value })}
              />
              <label htmlFor="formId1">Confirm Password</label>
              <span className="text-danger">{errors.cpwdError}</span>
            </div>
            <button type="submit" className="btn btn-primary">
              Register
            </button>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
