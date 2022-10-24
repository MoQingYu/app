import React from "react";
import ReactDom from "react-dom";
import { 
  BrowserRouter as Router,
  Route,
  Switch 
} from "react-router-dom";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history"
import Login from "./pages/login";
import Register from "./pages/register";
import LayoutBasic from "./layout";
import configStore from "./store";

const store = configStore();
const history = createBrowserHistory();

ReactDom.render(
  <Router history={history}>
    <Switch>
      <Route path="/signin" component={Login}/>
      <Route path="/signup" component={Register}/>
      <Route path="/">
        <Provider store={store}>
          <LayoutBasic />
        </Provider>
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
)