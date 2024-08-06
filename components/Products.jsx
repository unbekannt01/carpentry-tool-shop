import React, { useEffect } from "react";
import useFetchCollection from "../customHook/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, store_products } from "../redux/Slices/productSlice";
import ProductList from "./ProductList";

const Products = () => {
  let { data} = useFetchCollection("products");
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  useEffect(() => {
    dispatch(store_products(data));
  }, [data, dispatch]);
  return (
    <div className="container">
      <h1>Product Page</h1>
      <hr />
      <ProductList products={products} />
    </div>
  );
};

export default Products;
