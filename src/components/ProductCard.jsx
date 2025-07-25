import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    toast.success("Added to cart");
    dispatch(addCart(product));
  };

  return (
    <div className="card text-center h-100" key={product.id}>
     
      <Link to={`/product/${product.id}`}>
  <img
    src={product.image}
    className="card-img-top"
    alt={product.title}
    height="250px"
  />
</Link>

      <div className="card-body">
        <h5 className="card-title">
          {product.title.substring(0, 12)}...
        </h5>
        <p className="card-text">
          {product.description.substring(0, 90)}...
        </p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item lead">$ {product.price}</li>
      </ul>
      <div className="card-body">
        <Link to={`/product/${product.id}`} className="btn btn-dark m-1">
          Buy Now
        </Link>
        <button className="btn btn-dark m-1" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
