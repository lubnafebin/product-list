import "./Products.css"
export const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt="product" className="product-img" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">${product.price}</p>
      <button className="add-btn">Add to Cart</button>
    </div>
  );
};
