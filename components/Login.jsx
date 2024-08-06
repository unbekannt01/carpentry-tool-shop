import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../firebase/config";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Loader from "../../src/components/Loader"
import { useSelector } from "react-redux";
import { selectURL } from "../redux/Slices/cartSlice";

const Login = () => {
  let [user, setUser] = useState({ email: "", pwd: "" });
  let [isLoading, setIsLoading] = useState(false);
  // let [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const previousURL=useSelector(selectURL)
  let redirectURL=()=>{
    if(previousURL.includes('cart')){
      navigate('/cart')
    }
    else{
      navigate('/')
    }
  }
  let loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
    signInWithEmailAndPassword(auth, user.email, user.pwd)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        let role = docSnap.data().role;
        if (role === "admin") {
          setIsLoading(false);
          toast.success("LoggedIn Successfully");
          navigate("/dash");
        } else if (role === "user") {
          setIsLoading(false);
          toast.success("LoggedIn Successfully");
          // navigate("/");
          redirectURL()
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  const provider = new GoogleAuthProvider();
  let loginusinggoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user1 = result.user;
        const docRef = doc(db, "users", user1.uid);
        await setDoc(docRef, {
          username: user1.displayName,
          email: user1.email,
          role: "role",
        });
        setIsLoading(false);
        toast.success("logged successfully");
        // navigate("/");
        redirectURL()
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  return (
    <div className="container mt-5" style={{ fontFamily: "monospace" }}>
      {isLoading && <Loader/>}
      <div className="row border shadow">
        <div className="col-4">
          <img
            src={require("../assets/login.jpg")}
            style={{ height: "550px", width: "350px" }}
            alt="Login"
          />
        </div>
        <div className="col-6 mt-4">
          <h2>Login</h2>
          <hr />
          <form onSubmit={loginUser}>
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
              {/* <span className="text-danger">{errors.emailError}</span> */}
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
              {/* <span className="text-danger">{errors.pwdError}</span> */}
            </div>
            <div className="d-grid gap-2">
              <button
                type="submit"
                class="btn"
                style={{ backgroundColor: "burlywood" }}
              >
                Login
              </button>
            </div>
          </form>
          <hr />
          <div class="d-grid gap-2">
            <button
              type="button"
              class="btn"
              style={{ backgroundColor: "burlywood" }}
              onClick={loginusinggoogle}
            >
              Login With <BsGoogle />
            </button>
          </div>
          <div className="mt-3">
            <p>
              Create account ?? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
