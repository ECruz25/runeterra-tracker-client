import { makeStyles, TextField, Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { getUrl } from "../utils/restClient";
import UserContext from "./UserContext";
import Cookie from "js-cookie";
import Dialog from "./Dialog";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
export default ({ history }) => {
  const [formValues, setFormValues] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const classes = useStyles();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    const id = Cookie.get("user") ? Cookie.get("user") : null;
    if (id) {
      history.push("/");
    }
  }, []);

  const login = async (e) => {
    e.preventDefault();
    const url = getUrl();
    const response = await fetch(`${url}/Account/login`, {
      method: "POST",
      body: JSON.stringify({
        Password: formValues["password"],
        Email: formValues["email"],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data && data.message) {
      setShowError(true);
      setErrorMessage({ message: data.message, title: data.title });
      debugger;
    } else {
      history.push("/");
      setUser(data);
      Cookie.set("user", data.accountid);
    }
  };

  const onChange = (field, value) => {
    const newFormValues = {
      ...formValues,
      [field]: value,
    };
    setFormValues(newFormValues);
  };

  return (
    <div
      style={{
        margin: "125px 500px",
      }}
    >
      {showError && (
        <Dialog message={errorMessage} setShow={setShowError}></Dialog>
      )}
      <form className={classes.form} noValidate onSubmit={login}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email1"
          autoFocus
          onChange={({ target: { name, value } }) => {
            onChange(name, value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={({ target: { name, value } }) => {
            onChange(name, value);
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Login
        </Button>
      </form>
    </div>
  );
};
