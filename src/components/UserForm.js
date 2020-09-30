import { makeStyles, TextField, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getUrl } from '../utils/restClient'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));
export default () => {
  const [formValues, setFormValues] = useState({});
  const classes = useStyles();

  const createUser = async e => {
    e.preventDefault();
    const url = getUrl()
    const response = await fetch(`${url}/Account`, {
      method: "POST",
      body: JSON.stringify({
        "Name": formValues['name'],
        "Password": formValues['password'],
        "Username": formValues['username'],
        "Email": formValues['email']
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  const onChange = (field, value) => {
    const newFormValues = {
      ...formValues,
      [field]: value
    };
    setFormValues(newFormValues);
  };

  return <div style={{
    margin: "125px 500px"
  }}>
    <form className={classes.form} noValidate onSubmit={createUser}>
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
};
