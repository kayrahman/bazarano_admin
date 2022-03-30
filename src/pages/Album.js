import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Product from "../components/Product";
import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const useStyles = makeStyles((theme) => ({}));

const styles = (theme) => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    padding: "20px 0",
  },
});

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center">
//       {/* {"Copyright"} */}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

//const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
//const products = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

class home extends Component {
  state = {
    products: null,
  };
  componentDidMount() {
    axios
      .get("./products")
      .then((res) => {
        console.log(res.data);
        this.setState({
          products: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { classes } = this.props;
    let recentProduct = this.state.products ? (
      this.state.products.map((product) => <Product product={product} />)
    ) : (
      <p>Loading..</p>
    );
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <main>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {recentProduct}
            </Grid>
          </Container>
        </main>
        {/* Footer */}
        <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
          <Typography variant="h6" align="center" gutterBottom>
            Footer
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="text.secondary"
            component="p"
          >
            Something here to give the footer a purpose!
          </Typography>
        </Box>
        {/* End footer */}
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(home);
