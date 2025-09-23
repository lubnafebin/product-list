import "./Products.css";
import { ProductCard } from "./ProductCard";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";

export const ProductGrid = ({ products }) => {
  const { searchQuery } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);
  return (
    <div className="product-grid" id="product-section">
      {filteredProducts.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};
