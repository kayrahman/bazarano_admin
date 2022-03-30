import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./BazarAno.css";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CreateMuiTheme from "@material-ui/core/styles/createMuiStrictModeTheme";

//components
import NavBar from "./components/navbar";

//pages
import Home from "./pages/home";
import Login from "./pages/login";
import ProductUpload from "./pages/productUpload";
import Album from "./pages/Album";

const theme = CreateMuiTheme({
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <NavBar />
            <div className="container">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productUpload" element={<ProductUpload />} />
                <Route path="/login" element={<Login />} />
                <Route path="/productList" element={<Album />} />
              </Routes>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
