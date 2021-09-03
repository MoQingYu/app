import React from "react";
import ReactDom from "react-dom";
import { 
  BrowserRouter as Router,
  Route,
  Switch 
} from "react-router-dom";
import { createBrowserHistory } from "history"
import Login from "./pages/login";
import LayoutBasic from "./layout";

const history = createBrowserHistory();

ReactDom.render(
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/">
        <LayoutBasic />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
)