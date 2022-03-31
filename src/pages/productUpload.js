import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//MUI
import { useTheme } from "@mui/material/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@mui/material/MenuItem";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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

  container: {
    backgroundColor: "#fff",
  },

  pageTitle: {
    margin: "10px auto 10px auto",
  },

  textField: {
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
};

const names = [
  "Foods & Drinks",
  "Leather",
  "Handmade",
  "Fruits & Vegetables",
  "Home Garden",
  "Men",
  "Biscuits & Cake",
  "Sports",
  "Milk & Dairy",
  "Electronics",
  "Grocery",
  "Pharmaceutical",
  "Cooking",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export class productUpload extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      price: "",
      categoryTitle: "",
      loading: false,
      errors: {},
      // image: `http://firebasestorage.googleapis.com/v0/b/https://console.firebase.google.com/project/bazarano-1b9da/storage/bazarano-1b9da.appspot.com/files/o/${https://firebasestorage.googleapis.com/v0/b/bazarano-1b9da.appspot.com/o/productPictures%2F176896d6-bedd-3a05-9ef4-845300277e21?alt=media&token=28f88707-a56e-4a74-a929-af71304ea6ad}?alt=med`,
      // image: `https://firebasestorage.googleapis.com/v0/b/bazarano-1b9da.appspot.com/o/productPictures%2F176896d6-bedd-3a05-9ef4-845300277e21?alt=media&token=28f88707-a56e-4a74-a929-af71304ea6ad?alt=med`,
      image: "./logo192.png",
      response: {},
      personName: [],
      thumbImage: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });

    const newProduct = {
      title: this.state.title,
      uid: "testing001",
      price: this.state.price,
      categoryTitle: this.state.categoryTitle,
      uid: "ialikdf59873928ursdnvkldsh902358gfdkl",
      imageUrl: this.state.thumbImage,
    };
    axios
      .post("/postNewProduct", newProduct)
      .then((res) => {
        console.log(`"Product uploaded successfully">>> ${res.data.imageUrl}`);
        this.setState({
          loading: false,
          response: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          errors: err.response.data,
          loading: false,
        });
        console.log("Product Upload Error >>>> ${err}" + err);
      });
  };

  handleImageChange = (event) => {
    this.setState({
      loading: true,
    });

    const image = event.target.files[0];
    this.setState({
      image: URL.createObjectURL(image),
      thumbImage: URL.createObjectURL(image),
    });
    const formdata = new FormData();
    formdata.append("file", image, image.name);

    axios
      .post("/uploadFileToStorage", formdata)
      .then((res) => {
        this.setState({
          loading: false,
          // image: `${res.data.imageUrl}`,
          thumbImage: `${res.data.imageUrl}`,
        });
        console.log(`"image uploaded successfully">>> ${res.data.imageUrl}`);
      })
      .catch((err) => {
        this.setState({
          loading: false,
          errors: err.response.data,
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

  // const [personName, setPersonName] = React.useState([]);

  // const handleChange = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === 'string' ? value.split(',') : value,
  //   );
  // };

  render() {
    const { classes } = this.props;
    const { errors, loading, image, response, categoryTitle, personName } =
      this.state;

    return (
      <div>
        <Grid container className={classes.form}>
          <Grid item sm />
          <Grid item sm>
            <Grid item sm>
              <Typography variant="h5" align="center" gutterBottom>
                <p>Add New Product</p>
              </Typography>
              <form noValidate onSubmit={this.handleSubmit}>
                <div>
                  <img
                    src={image}
                    alt="Preview Image"
                    height="150"
                    width="150"
                  ></img>
                  <input
                    type="file"
                    id="selectPhoto"
                    hidden="hidden"
                    onChange={this.handleImageChange}
                  ></input>

                  {errors.imageUrl && (
                    <Typography variant="body2" className={classes.customError}>
                      {errors.imageUrl}
                    </Typography>
                  )}

                  <Tooltip title="Add Product Image" placement="top_right">
                    <IconButton
                      encType="multipart/formdata"
                      onClick={this.handleEditPicture}
                    >
                      <EditIcon color="primary" />
                    </IconButton>
                  </Tooltip>
                </div>

                <FormControl sx={{ m: 1, width: 400 }}>
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
                    variant="outlined"
                  />
                </FormControl>
                <FormControl sx={{ m: 1, width: 400 }}>
                  <TextField
                    id="price"
                    name="price"
                    type="number"
                    label="Price"
                    onChange={this.handleChange}
                    fullWidth
                    className={classes.textField}
                    helperText={errors.price}
                    error={errors.price ? true : false}
                    variant="outlined"
                  />
                </FormControl>

                <div>
                  <FormControl sx={{ m: 1, minWidth: 400 }}>
                    <InputLabel id="demo-multiple-name-label">
                      Category
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="categoryTitle"
                      name="categoryTitle"
                      value={categoryTitle}
                      onChange={this.handleChange}
                      helperText={errors.category}
                      error={errors.category ? true : false}
                      input={<OutlinedInput label="Name" />}
                      MenuProps={{
                        anchorOrigin: {
                          vertical: "bottom",
                          horizontal: "left",
                        },
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        getContentAnchorEl: null,
                      }}
                    >
                      {names.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          // style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <FormControl sx={{ m: 1, width: 400 }}>
                  <TextField
                    id="description"
                    name="description"
                    type="desciption"
                    label="Description"
                    onChange={this.handleChange}
                    fullWidth
                    className={classes.textField}
                    helperText={errors.description}
                    error={errors.description ? true : false}
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </FormControl>

                {response.message && (
                  <Typography variant="body2" color={"primary"}>
                    {response.message}
                  </Typography>
                )}

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={loading}
                >
                  Upload
                  {loading && (
                    <CircularProgress size={30} className={classes.progress} />
                  )}
                </Button>
              </form>
            </Grid>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(productUpload);
