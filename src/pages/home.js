import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import Product from "../components/Product";
import { Container, CssBaseline, makeStyles } from "@material-ui/core";
import { mergeClasses, withStyles } from "@material-ui/styles";

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
      <>
        <CssBaseline />
        <Container maxWidth="md" className={classes.cardGrid}>
          <Grid spacing={4}>{recentProduct}</Grid>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(home);
