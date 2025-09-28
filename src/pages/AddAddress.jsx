import React, { useEffect, useState } from "react";
import "./AddAddress.css";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    type={type}
    placeholder={placeholder}
    onChange={handleChange}
    name={name}
    value={address[name]}
    required
    style={{ padding: "5px", outline: "none" }}
  />
);

export const AddAddress = () => {
  const { axios, user, navigate } = useAppContext();
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/address/add", { address });
      if (data.success) {
        toast.success(data.message);
        navigate("/cart");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    if(!user){
        navigate('/cart')
    }
  },[])
  return (
    <div className="address-container">
      <p className="address-title">
        Add Shipping <span>Address</span>
      </p>
      <div>
        <form onSubmit={onSubmitHandler}>
          <div className="form-row">
            <InputField
              handleChange={handleChange}
              address={address}
              name="firstName"
              type="text"
              placeholder="First Name"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="lastName"
              type="text"
              placeholder="Last Name"
            />
          </div>
          <InputField
            handleChange={handleChange}
            address={address}
            name="email"
            type="email"
            placeholder="Email"
          />
          <InputField
            handleChange={handleChange}
            address={address}
            name="street"
            type="text"
            placeholder="Street"
          />
          <div className="form-row">
            <InputField
              handleChange={handleChange}
              address={address}
              name="city"
              type="text"
              placeholder="City"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="state"
              type="text"
              placeholder="State"
            />
          </div>
          <div className="form-row">
            <InputField
              handleChange={handleChange}
              address={address}
              name="zipcode"
              type="number"
              placeholder="Zipcode"
            />
            <InputField
              handleChange={handleChange}
              address={address}
              name="country"
              type="text"
              placeholder="Country"
            />
          </div>
          <InputField
            handleChange={handleChange}
            address={address}
            name="phone"
            type="number"
            placeholder="Phone"
          />
          <button className="save-button">Save</button>
        </form>
      </div>
    </div>
  );
};
