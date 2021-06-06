import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Welcome from "./Welcome";
import Logout from "./Logout";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <nav>
          <div>
             <Link to="/">Login</Link>
          </div>
          <div>
            <Link to="/Register">Register</Link>
          </div>
        </nav> */}
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/welcome">
            <Welcome />
          </Route>

          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
