import React from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import UserForm from './components/UserForm'
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";
import { UserProvider } from "./components/UserContext";
import './App.css';
import Login from './components/Login';

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "light",
          primary: {
            main: "#2196f3"
          }
        }
      }),
    [prefersDarkMode]
  );
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <UserProvider>
            <Route path="/signup" exact component={UserForm} />
            <Route path="/login" exact component={Login} />
          </UserProvider>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
