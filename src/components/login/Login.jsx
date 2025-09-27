import React, { useState } from "react";
import "./Login.css";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setShowUserLogin, setUser, axios, navigate } = useAppContext();

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, {
        name,
        email,
        password,
      });
      if (data.success) {
        navigate("/");
        setUser(data.user);
        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setShowUserLogin(false)}>
      <form
        onClick={(e) => e.stopPropagation()}
        className="form-container"
        onSubmit={onSubmitHandler}
      >
        <p className="form-title">
          <span className="highlight">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <div className="form-group">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              type="text"
              required
            />
          </div>
        )}

        <div className="form-group">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            type="email"
            required
          />
        </div>

        <div className="form-group">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            type="password"
            required
          />
        </div>

        {state === "register" ? (
          <p className="switch-text">
            Already have account?{" "}
            <span onClick={() => setState("login")} className="link">
              click here
            </span>
          </p>
        ) : (
          <p className="switch-text">
            Create an account?{" "}
            <span onClick={() => setState("register")} className="link">
              click here
            </span>
          </p>
        )}

        <button className="submit-btn">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};
