import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
//ICONS
import EditIcon from "@material-ui/icons/Add";
import withStyles from "@material-ui/core/styles/withStyles";
import { CircularProgress, Paper } from "@material-ui/core";

import axios from "axios";
import { mergeClasses } from "@material-ui/styles";

const styles = {
  form: {
    textAlign: "center",
  },

  pageTitle: {
    margin: "10px auto 10px auto",
  },

  textField: {
    margin: "10px auto 10px auto",
  },

  button: {
    marginTop: 20,
    marginBottom: 20,
    position: "relative",
  },

  customError: {
    color: "red",
    fontSize: "0.8",
  },

  progress: {
    position: "absolute",
  },
};

export class productUpload extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      price: "",
      categoryTitle: "",
      loading: false,
      errors: {},
      image: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const newProduct = {
      title: this.state.title,
      uid: "testing001",
      price: this.state.price,
      categoryTitle: this.state.categoryTitle,
      uid: "ialikdf59873928ursdnvkldsh902358gfdkl",
      imageUrl: this.state.image,
    };
    axios
      .post("/postNewProduct", newProduct)
      .then((res) => {
        console.log(`"Product uploaded successfully">>> ${res.data.imageUrl}`);
      })
      .catch((err) => {
        console.log("Product Upload Error >>>> ${err}" + err);
      });
  };

  handleImageChange = (event) => {
    this.setState({
      loading: true,
    });

    const image = event.target.files[0];
    const formdata = new FormData();
    formdata.append("file", image, image.name);

    axios
      .post("/uploadFileToStorage", formdata)
      .then((res) => {
        this.setState({
          loading: false,
          image: `${res.data.imageUrl}`,
        });
        console.log(`"image uploaded successfully">>> ${res.data.imageUrl}`);
      })
      .catch((err) => {
        this.setState({
          loading: false,
          // errors: err.response.data,
        });
        console.log("Error >>>> ${err}" + err);
      });

    //http://localhost:5000/bazarano-1b9da/us-central1/api/uploadSinglefile
  };

  handleEditPicture = () => {
    const fileInput = document.getElementById("selectPhoto");
    fileInput.click();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Paper className={mergeClasses.paper}>
        <div>
          <Grid container>
            <Grid item sm />
            <Grid item sm>
              <Typography variant="h3">
                <p>Product Upload</p>
              </Typography>

              <form noValidate onSubmit={this.handleSubmit}>
                <div>
                  <img
                    src="http://www.amityinternational.com/wp-content/uploads/2019/02/product-placeholder.jpg"
                    alt="This a photo of a product"
                    height="150"
                    width="150"
                  ></img>
                  <input
                    type="file"
                    id="selectPhoto"
                    hidden="hidden"
                    onChange={this.handleImageChange}
                  ></input>
                  <Tooltip title="Add Product Image" placement="top_right">
                    <IconButton
                      encType="multipart/formdata"
                      onClick={this.handleEditPicture}
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                </div>

                <TextField
                  id="title"
                  name="title"
                  type="email"
                  label="Title"
                  onChange={this.handleChange}
                  fullWidth
                  className={classes.textField}
                  helperText={errors.title}
                  error={errors.title ? true : false}
                />

                <TextField
                  id="price"
                  name="price"
                  type="price"
                  label="Price"
                  onChange={this.handleChange}
                  fullWidth
                  className={classes.textField}
                  helperText={errors.price}
                  error={errors.price ? true : false}
                />

                <TextField
                  id="category"
                  name="categoryTitle"
                  type="price"
                  label="Category"
                  onChange={this.handleChange}
                  fullWidth
                  className={classes.textField}
                  helperText={errors.category}
                  error={errors.category ? true : false}
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Upload
                </Button>
              </form>
            </Grid>
            <Grid item sm />
          </Grid>
        </div>
      </Paper>
    );
  }
}
export default withStyles(styles)(productUpload);
