import "./Products.css";
import { ProductCard } from "./ProductCard";

export const ProductGrid = ({ products }) => {
  return (
    <div className="product-grid">
      {products.map((item) => (
        <ProductCard key={item.id} product={item} />
      ))}
    </div>
  );
};
