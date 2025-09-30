import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import "./Loading.css";
import { useEffect } from "react";
export const Loading = () => {
  const { navigate } = useAppContext();
  let { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get("next");

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 5000);
    }
  }, [nextUrl, navigate]);
  return (
    <div class="loading">
      <div class="spinner"></div>
    </div>
  );
};
