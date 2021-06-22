import React from "react";
import { Route, Redirect } from "react-router-dom";
import * as routes from "../../constants/routes";

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        const currentUser = JSON.parse(localStorage.getItem("user"));
        if (currentUser) {
          return <Redirect to={routes.HOME} />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PublicRoute;
