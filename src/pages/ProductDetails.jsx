import { useEffect, useState } from "react";
import "./ProductDetails.css";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";

export const ProductDetails = () => {
  const { navigate, addToCart, products } = useAppContext();
  const { id } = useParams();
  const product = products.find((item) => item._id === id);
  const [thumbnail, setThumbnail] = useState(null);
  const rating = 4;

  useEffect(() => {
    if (product?.images?.length) {
      setThumbnail(product.images[0]);
    }
  }, [product]);

  return (
    product && (
      <div className="product-details">
        {/* Breadcrumb */}
        <p className="breadcrumb">
          <Link to={"/"}>Home</Link> / <Link to={"/products"}>Products</Link> /{" "}
          <span>{product.category}</span> /{" "}
          <span className="active">{product.name}</span>
        </p>

        <div className="details-container">
          {/* Left: Images */}
          <div className="images">
            <div className="thumbnails">
              {product.images.map((img, i) => (
                <div
                  key={i}
                  className={`thumb ${thumbnail === img ? "active" : ""}`}
                  onClick={() => setThumbnail(img)}
                >
                  <img src={img} alt={`Thumbnail ${i}`} />
                </div>
              ))}
            </div>

            <div className="main-image">
              <img src={thumbnail} alt="Selected" />
            </div>
          </div>

          {/* Right: Info */}
          <div className="info">
            <h1 className="title">{product.name}</h1>

            {/* Rating */}
            <div className="rating">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <span key={i} className={i < rating ? "star filled" : "star"}>
                    ★
                  </span>
                ))}
              <p>({rating})</p>
            </div>

            {/* Price */}
            <div className="price-section">
              <p className="old-price">MRP: ${product.price}</p>
              <p className="offer-price">MRP: ₹{product.price + 20}</p>
              <span className="tax-note">(inclusive of all taxes)</span>
            </div>

            {/* Description */}
            <p className="about">About Product</p>
            <ul className="desc-list">
              {product.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="actions">
              <button
                onClick={() => addToCart(product)}
                className="btn secondary"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product);
                  navigate("/cart");
                }}
                className="btn primary"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
