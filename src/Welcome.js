import { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";

export default function Welcome() {
  
const [login, setLogin] = useState(true)

  useEffect(() => {
    const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
          mode: "cors",
          credentials: "include",
        },
      };

    fetch("http://api.kartmanage.in/public/api/user", config)
      .then((resp) => resp.json())
      .then((data) => console.log("data", data))
      .catch((err) => console.log(err, "error"));
      if(localStorage.getItem("access_token") === null){
        setLogin(false)
      }
  }, []);

  

  return (
    !login? <Redirect to="/" /> :
    <>
    <h1>Welcome</h1> 
    <Link to="/logout">Logout</Link>
    </>
  )  
}
