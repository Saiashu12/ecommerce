// components/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [variant, setVariant] = useState("");
  const [loading, setLoading] = useState(true);

  // Fake variants
  const variants = ["Small", "Medium", "Large"];

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${id}`);
      const data = await res.json();
      setProduct({ ...data, available: data.rating.count > 100 }); // fake out-of-stock logic
      setVariant(variants[0]);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.available) {
      dispatch(addCart(product));
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="container my-5 px-4">
      <div className="row g-5">
        <div className="col-md-6 text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center">
          <h3>{product.title}</h3>
          <h4 className="text-success">${product.price}</h4>
          <p>{product.description}</p>

          <div className="mb-3">
            <label htmlFor="variantSelect" className="form-label fw-bold">
              Variant
            </label>
            <select
              className="form-select"
              id="variantSelect"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
            >
              {variants.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          {product.available ? (
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
          ) : (
            <button className="btn btn-secondary" disabled>
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
