import { findByLabelText } from '@testing-library/react'
import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
//import { getStorage, ref } from "firebase/storage";
//const storage = getStorage();
// Create a child reference


const styles = {
    card :{
        display : 'flex',
        marginBottom : 20
    },
    image:{
        minWidth:200,
        minHeight : 200
    },
    content:{
        padding:25
    }
}

class Product extends Component {
  render() {
      const {classes, product:{thumbImageUrl,title}} = this.props
     var thumb_img = thumbImageUrl;
     
if (thumb_img.charAt(0) == "/") thumb_img = thumb_img.substr(1);
if (thumb_img.charAt(thumb_img.length - 1) == "/") thumb_img = thumb_img.substr(0, thumb_img.length - 1);
const thumb_uri = encodeURIComponent(thumb_img)

const imgRef = `https://firebasestorage.googleapis.com/v0/b/bazarano-1b9da.appspot.com/o/${thumb_uri}?alt=media`
     //const imageRef = "https://storage.googleapis.com/bazarano-1b9da.appspot.com/productPictures/86f71ec6-12e2-35a3-b48b-60c561800ec5?GoogleAccessId=firebase-adminsdk-entqv%40bazarano-1b9da.iam.gserviceaccount.com&Expires=16447017600&Signature=Do%2B7lYoJVd54MADTUfl6CwMEzNrzD86jtn6rS4g01UokGGw4Kq3fYT4IdbYrS3ub%2FkZ%2FDrgvaW1utyTgxOQoEa191JcOUwWAzwZff6WGeEJJ%2FZuOs1fanuKbuvrHzwFiy7hbmKMJZZjAFx9a8zhgInyhjWUjtTrAzmgDyM6eSp6AxdhbN8uuU4IdCPFzeG%2F2D7PSl26dFQtKFKUKnj0zJ4ZphFdGC8mjT4WKySd%2B1H4d72x3H8gcuLtt%2BqAC9YkjpFXgwX9IGh2WbLA%2FPugO%2BWpZDTyBZCfGYXc%2F%2Fiq%2FMSUheSxxRyoVbuS5k62daOT%2Fgn5ZaZpQ3XUk2To6JdEbUQ%3D%3D"
     
     console.log(imgRef);
    return (
      <Card className={classes.card}>
          <CardMedia
          image = {imgRef}
          title = {title}
          className = {classes.image}
          />
          <CardContent className={classes.CardContent}>
              <Typography variant='h5'>{title}</Typography>
              <Typography variant='body2' color='textSecondary'>"created at"</Typography>
          </CardContent>

      </Card>
    )
  }
}

export default withStyles(styles)(Product)
