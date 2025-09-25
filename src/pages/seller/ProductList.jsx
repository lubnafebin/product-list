import "./ProductList.css";
import { useAppContext } from "../../context/AppContext";

export const ProductList = () => {
  const { products } = useAppContext();
  return (
    <div className="product-list-container">
      <div className="product-list-wrapper">
        <h2 className="product-list-heading">All Products</h2>
        <div className="product-list-table-wrapper">
          <table className="product-list-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th className="hide-mobile">Selling Price</th>
                <th>In Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="product-list-product-cell">
                    <div className="product-list-image-wrapper">
                      <img src={product.images[0]} alt="Product" />
                    </div>
                    <span className="product-list-name">{product.name}</span>
                  </td>
                  <td>{product.category}</td>
                  <td className="hide-mobile">${product.price}</td>
                  <td>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider"></span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
