import "./Footer.css";
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h3>VeggieCart</h3>
          <p>Fresh vegetables and fruits delivered to your doorstep.</p>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Shop</a>
            </li>
            <li>
              <a href="#">Offers</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Customer Service</h4>
          <ul>
            <li>
              <a href="#">FAQs</a>
            </li>
            <li>
              <a href="#">Shipping</a>
            </li>
            <li>
              <a href="#">Returns</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <p>Email: support@veggiecart.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Location: Kochi, Kerala</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 VeggieCart. All rights reserved.</p>
      </div>
    </footer>
  );
};
