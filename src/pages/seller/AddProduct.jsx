import { useState } from "react";
import "./AddProduct.css";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
export const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const { axios } = useAppContext();

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      const productData = {
        name,
        description: description.slice("\n"),
        category,
        price,
        offerPrice,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(productData));
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const { data } = await axios.post("/api/product/add", formData);
      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        setCategory("");
        setPrice("");
        setOfferPrice("");
        setFiles([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error .message);
    }
  };

  const categories = [
    { name: "Electronics" },
    { name: "Clothing" },
    { name: "Accessories" },
  ];
  return (
    <div className="add-product-container">
      <form onSubmit={onSubmitHandler} className="add-product-form">
        {/* Product Images */}
        <div className="form-group">
          <label className="form-label">Product Image</label>
          <div className="image-upload-container">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <label
                  key={index}
                  htmlFor={`image${index}`}
                  className="image-label"
                >
                  <input
                    onChange={(e) => {
                      const updatedFiles = [...files];
                      updatedFiles[index] = e.target.files[0];
                      setFiles(updatedFiles);
                    }}
                    accept="image/*"
                    type="file"
                    id={`image${index}`}
                    hidden
                  />
                  <img
                    src={
                      files[index]
                        ? URL.createObjectURL(files[index])
                        : "https://imgs.search.brave.com/9BRtpaeHsuBf-5ajeO4NtWTJfenE--Iu2rJhztzDZv0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE1LzI4LzM2Lzc3/LzM2MF9GXzE1Mjgz/Njc3MzZfS2laNTk0/dUZ4QnlaVHZWQkw1/QjhhcHpCTE1mMGNm/RmQuanBn"
                    }
                    alt="uploadArea"
                    className="upload-image"
                  />
                </label>
              ))}
          </div>
        </div>

        {/* Product Name */}
        <div className="form-group">
          <label className="form-label" htmlFor="product-name">
            Product Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="product-name"
            type="text"
            placeholder="Type here"
            className="form-input"
            required
          />
        </div>

        {/* Product Description */}
        <div className="form-group">
          <label className="form-label" htmlFor="product-description">
            Product Description
          </label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="product-description"
            rows={4}
            placeholder="Type here"
            className="form-textarea"
          />
        </div>

        {/* Category */}
        <div className="form-group">
          <label className="form-label" htmlFor="category">
            Category
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            id="category"
            className="form-select"
          >
            <option value="">Select Category</option>
            {categories.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price & Offer */}
        <div className="price-container">
          <div className="price-group">
            <label className="form-label" htmlFor="product-price">
              Product Price
            </label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              id="product-price"
              type="number"
              placeholder="0"
              className="form-input"
              required
            />
          </div>

          <div className="price-group">
            <label className="form-label" htmlFor="offer-price">
              Offer Price
            </label>
            <input
              onChange={(e) => setOfferPrice(e.target.value)}
              value={offerPrice}
              id="offer-price"
              type="number"
              placeholder="0"
              className="form-input"
              required
            />
          </div>
        </div>

        <button type="submit" className="add-button">
          ADD
        </button>
      </form>
    </div>
  );
};
