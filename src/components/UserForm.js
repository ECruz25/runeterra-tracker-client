import { makeStyles, TextField, Button, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getUrl } from "../utils/restClient";
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
export default () => {
  const [formValues, setFormValues] = useState({});
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const classes = useStyles();

  const createUser = async (e) => {
    e.preventDefault();
    if (checkAllValuesEntered()) {
      const url = getUrl();
      await fetch(`${url}/Account`, {
        method: "POST",
        body: JSON.stringify({
          Name: formValues["name"],
          Password: formValues["password"],
          Username: formValues["username"],
          Email: formValues["email"],
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      setShowError(true);
      setErrorMessage({
        message: "Check values you have entered",
        title: "Missing values",
      });
    }
  };

  const checkAllValuesEntered = () => {
    return (
      formValues &&
      formValues["name"] &&
      formValues["password"] &&
      formValues["username"] &&
      formValues["email"]
    );
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
      <div style={{ textAlign: "center" }}>
        <Typography component="h1" variant="h5">
          Legends Of Runeterra Tracker
        </Typography>
        <Typography component="h1" variant="h6">
          Sign Up
        </Typography>
      </div>
      {showError && (
        <Dialog message={errorMessage} setShow={setShowError}></Dialog>
      )}
      <form className={classes.form} onSubmit={createUser}>
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
          id="name"
          label="Name"
          name="name"
          autoComplete="name1"
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
          id="username"
          label="LOR Username"
          name="username"
          autoComplete="username1"
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
          Create
        </Button>
      </form>
    </div>
  );
};
