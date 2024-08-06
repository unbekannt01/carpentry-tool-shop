import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaStreetView, FaUserCircle } from "react-icons/fa";
import Login from "../Login";
import { HiHome } from "react-icons/hi";
import { BiSolidAddToQueue } from "react-icons/bi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { AiOutlineFundView, AiOutlineUsergroupAdd } from "react-icons/ai";

import "./AdminSideBar.css"; // Import the CSS file

const Admin = () => {
  let role = localStorage.getItem("role");
  return (
    <>
      <div className="admin-container">
        <div id="sidebar">
          <ul className="list-items">
            <div className="title">
              Admin Panel
              <br />
              <FaUserCircle size={40} />
            </div>
            <li>
              <Link to="/dash">
                <HiHome />
                Home
              </Link>
            </li>
            <li>
              <Link to="addproduct">
                <BiSolidAddToQueue />
                Add Product
              </Link>
            </li>
            <li>
              <Link to="viewproduct">
                <AiOutlineFundView />
                View Products
              </Link>
            </li>
            <li>
              <Link to="users">
                <AiOutlineUsergroupAdd />
                Add Users
              </Link>
            </li>
            <li>
              <Link to="users">
                <FaStreetView />
                View Users
              </Link>
            </li>
            <li>
              <Link to="">
                <MdProductionQuantityLimits />
                View Orders
              </Link>
            </li>
          </ul>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Admin;
