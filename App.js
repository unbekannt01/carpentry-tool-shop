import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Register from "./components/Register";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import Gallary from "./components/Gallary";
import Admin from "./components/Admin/Admin";
import AddProduct from "./components/Admin/AddProduct";
import ViewProduct from "./components/Admin/ViewProduct";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import CheckoutDetails from "./components/CheckoutDetails";
import Checkout from "./components/Checkout";
import CheckoutSuccess from "./components/CheckoutSuccess";

function App() {
  return (
    <>
      <ToastContainer autoClose={2000} />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/gallary" element={<Gallary />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dash" element={<Admin />}>
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="viewproduct" element={<ViewProduct />} />
          <Route path="editproduct/:id" element={<AddProduct />} />
        </Route>
        <Route path="productdetails/:id" element={<ProductDetails />} />
        <Route path="checkout-details" element={<CheckoutDetails/>}/>
        <Route path="checkout-success" element={<CheckoutSuccess/>}/>
        <Route path="/cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout/>}/>
      </Routes>
    </>
  );
}

export default App;
