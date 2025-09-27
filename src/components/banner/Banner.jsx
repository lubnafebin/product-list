import "./Banner.css";
import banner from "./banner.webp";
export const Banner = () => {
  return (
    <div className="banner">
      <div className="banner-inner">
        <img src={banner} alt="vegetables" className="banner-img" />
        <div className="banner-content">
          <h2>Fresh Vegetables Big Offer</h2>
          <p>Get up to 50% off on organic and farm-fresh items.</p>
          <button className="shop-btn">
            Shop Now
          </button> 
        </div>
      </div>
    </div>
  );
};
