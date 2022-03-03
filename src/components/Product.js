import { findByLabelText } from '@testing-library/react'
import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

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
    return (
      <Card className={classes.card}>
          <CardMedia
          image = "gs://bazarano-1b9da.appspot.com/productPictures/019a5ec4-85fe-3947-8ced-1d35e9674ea2"
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
