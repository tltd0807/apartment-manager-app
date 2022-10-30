import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// auto redirect user to home page if page not found
const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/");
    }, 5000);
  }, []);

  return <h1>Page Not Found and page will automatic comback home page</h1>;
};

export default NotFound;
