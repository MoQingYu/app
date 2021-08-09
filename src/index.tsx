import React from "react";
import ReactDom from "react-dom";
import { 
  BrowserRouter as Router,
  Route 
} from "react-router-dom";
import Login from "./login";

ReactDom.render(
  <Router>
    <Route path="/" exact>
      <h1>Home</h1>
    </Route>
    <Route path="/login">
      <Login />
    </Route>
  </Router>,
  document.getElementById("root")
)