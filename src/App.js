import "./App.css";
import { Switch, Route } from "react-router-dom";
import * as routes from "./src/constants/routes";
import Login from "./src/screens/login/Login";
import PrivateRoute from "./src/components/privateRoute/PrivateRoute";
import Home from "./src/screens/home/Home";
import PublicRoute from "./src/components/publicRoute/PublicRoute";

const App = () => {
  return (
    <Switch>
      <PrivateRoute component={Home} path={routes.HOME} />
      <PublicRoute component={Login} path={routes.ROOT} />
    </Switch>
  );
};

export default App;
