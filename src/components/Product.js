import { findByLabelText } from "@testing-library/react";
import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Button, CardActions, Grid, makeStyles } from "@material-ui/core";
//import { getStorage, ref } from "firebase/storage";
//const storage = getStorage();
// Create a child reference

const styles = (theme) => ({
  card: {
    height: "100%",
    display: "flex",
    marginBottom: 20,
    flexDirection: "column",
  },
  cardMedia: {
    padding: "56.25%",
  },

  cardContent: {
    padding: 25,
    flexGrow: 1,
  },
});

class Product extends Component {
  render() {
    const {
      classes,
      product: { thumbImageUrl, title, description, price },
    } = this.props;
    var thumb_img = thumbImageUrl;

    if (thumb_img.charAt(0) == "/") thumb_img = thumb_img.substr(1);
    if (thumb_img.charAt(thumb_img.length - 1) == "/")
      thumb_img = thumb_img.substr(0, thumb_img.length - 1);
    const thumb_uri = encodeURIComponent(thumb_img);

    const imgRef = `https://firebasestorage.googleapis.com/v0/b/bazarano-1b9da.appspot.com/o/${thumb_uri}?alt=media`;
    //const imageRef = "https://storage.googleapis.com/bazarano-1b9da.appspot.com/productPictures/86f71ec6-12e2-35a3-b48b-60c561800ec5?GoogleAccessId=firebase-adminsdk-entqv%40bazarano-1b9da.iam.gserviceaccount.com&Expires=16447017600&Signature=Do%2B7lYoJVd54MADTUfl6CwMEzNrzD86jtn6rS4g01UokGGw4Kq3fYT4IdbYrS3ub%2FkZ%2FDrgvaW1utyTgxOQoEa191JcOUwWAzwZff6WGeEJJ%2FZuOs1fanuKbuvrHzwFiy7hbmKMJZZjAFx9a8zhgInyhjWUjtTrAzmgDyM6eSp6AxdhbN8uuU4IdCPFzeG%2F2D7PSl26dFQtKFKUKnj0zJ4ZphFdGC8mjT4WKySd%2B1H4d72x3H8gcuLtt%2BqAC9YkjpFXgwX9IGh2WbLA%2FPugO%2BWpZDTyBZCfGYXc%2F%2Fiq%2FMSUheSxxRyoVbuS5k62daOT%2Fgn5ZaZpQ3XUk2To6JdEbUQ%3D%3D"

    console.log(imgRef);

    return (
      <Grid item key={1} xs={12} sm={6} md={3}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              // 16:9
              pt: "56.25%",
            }}
            image={imgRef}
            height={200}
            alt="random"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Grid>
              <Typography gutterBottom variant="h6" component="h2">
                {title}
              </Typography>
              <Typography
                gutterBottom
                variant="subtitle2"
                color="primary"
                style={{ fontWeight: 600 }}
              >
                {price} Tk
              </Typography>
            </Grid>
            <Typography variant="body2" gutterBottom>
              {description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">View</Button>
            <Button size="small">Edit</Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(Product);
