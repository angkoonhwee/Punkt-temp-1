//jshint esversion:8
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Main from "./pages/main/Main";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Progress from "./pages/progress/Progress";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import ForgotPassword from "./pages/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
import ExplorePage from "./pages/explore/ExplorePage";

function App() {
  const { user } = useContext(UserContext);
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {user ? <Redirect to="/main" /> : <Home />}
        </Route>
        <Route path="/login" exact>
          {user ? <Redirect to="/main" /> : <Login />}
          {/* <Login /> */}
        </Route>
        <Route path="/signup" exact>
          {/* {user ? <Redirect to="/main" /> : <Signup />} */}
          <Signup />
        </Route>
        <Route path="/main" exact>
          <Main />
        </Route>
        <Route path="/explore">
          <ExplorePage />
        </Route>
        <Route path="/profile/:username">
          <Main />
        </Route>
        <Route path="/progress" exact>
          <Progress />
        </Route>
        <Route path="/progress/:username">
          <Progress />
        </Route>
        <Route path="/forgot-password">
          <ForgotPassword />
        </Route>
        <Route path="/reset-password">
          <ResetPassword />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
