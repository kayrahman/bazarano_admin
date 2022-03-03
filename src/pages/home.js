import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Product from "../components/Product"

class home extends Component {
  state = {
    products : null
  }
  componentDidMount(){
    axios.get('./products')
    .then( res => {
      console.log(res.data)
      this.setState({
         products : res.data
      })
    })
    .catch(err => console.log(err));
  }
  render() {
    let recentProduct = this.state.products ? 
    (this.state.products.map(product => <Product product = {product}/>)) : <p>Loading..</p>
    return (
      <Grid container>
        <Grid item sm={8} xs={12}>
          {recentProduct}
          </Grid>
          </Grid>
    )
  }
}

export default home
