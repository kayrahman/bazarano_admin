import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'


const styles = {
  form : {
    textAlign : 'center'
  },

pageTitle :{
  margin : '10px auto 10px auto'
},

textField : {
  margin : '10px auto 10px auto'
},

button : {
 marginTop : 20
}

}

class login extends Component {

  constructor(){
    super();
    this.state = {
        email : '',
        password : '',
        loading : false,
        errors : {}
    }
  }

  handleSubmit = (event) =>{
      console.log('hi')
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }


  render() {
    const {classes} = this.props
    return (
     <Grid container className = {classes.form}>
        <Grid item sm/>
        <Grid item sm>
        <Typography variant="h3" className = {classes.pageTitle}>
          <p>Login</p>
        </Typography>
      
        <form noValidate onSubmit={this.handleSubmit}>
      
        <TextField id='email' name = 'email' type = 'email' label = 'Email' className={classes.textField}
        value={this.state.email} onChange = {this.handleChange} fullWidth/> 
        
         <TextField id='password' name = 'password' type = 'password' label = 'Password' className={classes.textField}
        value={this.state.password} onChange = {this.handleChange} fullWidth/> 
         
         <Button type = 'submit'  variant='contained'
         color='primary'
          className = {classes.button}
        > Login </Button> 
         

        </form>

        </Grid>
        <Grid item sm/>

       </Grid>
    )
  }
}

login.propTypes = {
  classes : PropTypes.object.isRequired
} 
export default withStyles(styles)(login)
