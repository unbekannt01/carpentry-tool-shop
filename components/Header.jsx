import React, { useEffect, useState } from "react";
import {
  FaBoxOpen,  
  FaPenNib,
  FaShoppingCart,
  FaTools,
  FaUserAlt,
} from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { RiHomeSmileFill } from "react-icons/ri";
import { GrCircleInformation, GrGallery } from "react-icons/gr";
import { GiPowerLightning } from "react-icons/gi";
import { HiHandThumbUp } from "react-icons/hi2";
import { SiWelcometothejungle } from "react-icons/si";
import { TbLogout } from "react-icons/tb";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, LogoutUser, selectUserName, selectUserRole } from "../redux/Slices/authSlice";
import { ShowOnLogin, ShowOnLogout } from "./HiddenLinks";
import { doc, getDoc } from "firebase/firestore";
import { selectCartItems } from "../redux/Slices/cartSlice";

const Header = () => {
  const cartItems=useSelector(selectCartItems)
  const username = useSelector(selectUserName);
  const navigate = useNavigate();
  let [isLoading, setIsLoading] = useState(false);
  let dispatch = useDispatch();
  let userrole=useSelector(selectUserRole)
  let handleLogout = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setIsLoading(false);
        toast.success("LoggedOut Successfully");
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
      });
  };
  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if (user) {
        const uid = user.uid;
        const docRef=doc(db,"users",uid)
        const docSnap=await getDoc(docRef)
        dispatch(
          LoginUser({
            userID: uid,
            userEmail: docSnap.data().email,
            userRole: docSnap.data().role,
            userName: docSnap.data().username
          })
        );
      } else {
        dispatch(LogoutUser());
      }
    });
  }, [auth]);
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light">
        <div
          className="container-fluid p-2"
          style={{ backgroundColor: "#C4A484", fontFamily: "cursive" }}
        >
          <Link className="navbar-brand" href="#">
            <img
              class="rounded-circle"
              src={require("../assets/logo.jpg")}
              style={{ height: "50px", height: "50px" }}
            />
          </Link>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            <ul className="navbar-nav me-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/" aria-current="page">
                  <RiHomeSmileFill /> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/gallary">
                  <GrGallery /> Gallary
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown"
                  to="/products"
                  id="dropdownId"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <FaBoxOpen /> Products
                </Link>
                <div className="dropdown-menu" aria-labelledby="dropdownId">
                  <Link className="dropdown-item" href="#">
                    <HiHandThumbUp />
                    <FaTools /> Hand Tools
                  </Link>
                  <Link className="dropdown-item" href="#">
                    <GiPowerLightning />
                    <FaTools /> Power Tools
                  </Link>
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  <GrCircleInformation /> About Us
                </Link>
              </li>
            </ul>
            <form className="my-2 my-lg-0">
              <input
                className="form-control me-sm-2"
                type="text"
                placeholder="Search"
              />
            </form>
            <ul className="navbar-nav ">
              {userrole !="admin" &&
              <li class="nav-item">
                <Link class="nav-link" to='/cart' aria-current="page">
                  Cart
                  <FaShoppingCart size={30} />
                  <span
                    class="badge rounded-pill text-bg-success"
                    style={{ position: "relative", top: "-10px" }}
                  >
                    {cartItems.length}
                  </span>
                </Link>
              </li>
}
              <ShowOnLogin>
              <li className="nav-item">
                <Link className="nav-link" href="#">
                  Welcome {username} <SiWelcometothejungle />
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="nav-link"
                  onClick={handleLogout}
                >
                  Logout <TbLogout />
                </button>
              </li>
              </ShowOnLogin>
              <ShowOnLogout>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register <FaPenNib />
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login ">
                  Login <FaUserAlt />
                </Link>
              </li>
              </ShowOnLogout>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
