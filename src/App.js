import React from 'react';
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import UserForm from './components/UserForm'
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";
import './App.css';

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
          <Route path="/signup" exact component={UserForm} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
