import "./ProductList.css";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export const ProductList = () => {
  const { products, axios, fetchProducts } = useAppContext();

  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post("/api/product/stock", { id, inStock });
      if (data) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="product-list-container">
      <div className="product-list-wrapper">
        <h2 className="product-list-heading">All Products</h2>
        <div className="product-list-table-wrapper">
          <div className="table-responsive">
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
                  <tr key={product._id}>
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
                        <input
                          onChange={() =>
                            toggleStock(product._id, !product.inStock)
                          }
                          checked={product.inStock}
                          type="checkbox"
                        />
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
    </div>
  );
};
