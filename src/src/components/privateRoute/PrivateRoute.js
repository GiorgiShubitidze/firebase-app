import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as routes from "../../constants/routes";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (!currentUser) {
          return <Redirect to={routes.ROOT} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
