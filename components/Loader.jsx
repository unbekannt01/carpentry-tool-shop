import React from "react";
import LoaderImg from "../../src/assets/loader.gif";
import ReactDOM from "react-dom";
import './loader.css'

const Loader = () => {
  return ( ReactDOM.createPortal(
    <div className="wrapperlogo">
      <div className="loader">
        <img src={LoaderImg} alt="Loading" />
      </div>
    </div>,
    document.getElementById("loader")
  )
  );
};

export default Loader;
