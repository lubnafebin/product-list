import "./Navbar.css"
export const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <img src="" alt="logo" className="logo" />
        <input type="text" placeholder="Search items" />
        <button>Search</button>
        <i>
          <span>Cart</span>
        </i>
        <span>Login</span>
      </div>
    </>
  );
};
