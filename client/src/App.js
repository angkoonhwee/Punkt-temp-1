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
        </Route>
        <Route path="/signup" exact>
          {user ? <Redirect to="/main" /> : <Signup />}
        </Route>
        <Route path="/main" exact>
          <Main />
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
      </Switch>
    </Router>
  );
}

export default App;
