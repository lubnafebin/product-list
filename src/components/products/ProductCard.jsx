import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import "./Products.css";
import { useAppContext } from "../../context/AppContext";
export const ProductCard = ({ product }) => {
  const { addToCart } = useAppContext();
  const rating = 4.5;
  return (
    <div className="product-card">
      <img src={product.image} alt="product" className="product-img" />
      <p className="product-category">{product.category}</p>
      <h3 className="product-name">{product.name}</h3>
      <div className="rating">
        {rating >= 1 ? <FaStar color="gold" /> : <FaRegStar color="gold" />}
        {rating >= 2 ? <FaStar color="gold" /> : <FaRegStar color="gold" />}
        {rating >= 3 ? <FaStar color="gold" /> : <FaRegStar color="gold" />}
        {rating >= 4 ? <FaStar color="gold" /> : <FaRegStar color="gold" />}
        {rating >= 4.5 ? (
          <FaStarHalfAlt color="gold" />
        ) : (
          <FaRegStar color="gold" />
        )}
      </div>
      <p className="product-price">
        <span className="old-price">₹{product.price + 20}</span>₹{product.price}
      </p>
      <button className="add-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};
