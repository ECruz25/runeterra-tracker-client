import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "./UserContext";
import Cookie from "js-cookie";

export default function withAuth(ComponentToProtect) {
  return (props) => {
    const { user } = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
      const id = Cookie.get("user") ? Cookie.get("user") : null;
      if (id) {
        setRedirect(false);
      } else {
        setRedirect(true);
      }
    });
    if (redirect) {
      return <Redirect to="/login"></Redirect>;
    } else {
      return (
        <React.Fragment>
          <ComponentToProtect {...props} />
        </React.Fragment>
      );
    }
  };
}
