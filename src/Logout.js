import { Link } from "react-router-dom";
import React, { useEffect } from "react";

function Logout() {
  useEffect(() => {
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.removeItem("access_token"),
        mode: "cors",
        credentials: "include",
      },
    };
    fetch("http://api.kartmanage.in/public/api/user/logout", config)
      .then((resp) => resp.json())
      .then((data) => console.log("data", data))
      .catch((err) => console.log(err, "error"));
  }, []);
  return (
    <>
      <p>you have been logged off</p>
      <Link to="/">Login</Link>
    </>
  );
}

export default Logout;
