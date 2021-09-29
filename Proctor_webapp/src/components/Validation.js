import React from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#0971f1',
        darker: '#053e85',
      },
      neutral: {
        main: '#006666',
        contrastText: '#fff',
      },
    },
});

class Validation extends React.Component {
   
    
    
    constructor() {
    super();
    this.state = {
      input: {},
      errors: {},
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword =this.handleMouseDownPassword.bind(this);
    
  }
     
    handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
  
    this.setState({
      input
    });
  }
     
    handleSubmit(event) {
    event.preventDefault();
  
    if(this.validate()){
        console.log(this.state);
  
        let input = {};
        
        input["email"] = "";
        input["password"] = "";
        input["confirm_password"] = "";
        this.setState({input:input});
  
        
        this.props.history.push('/signin');
    }
  }
    

    handleClickShowPassword () {
    this.setState({
        showPassword: !this.state.showPassword,
    })
     
    };

    handleMouseDownPassword  (event) {
        event.preventDefault();
    };
  
  validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;
   
      
      if (!input["email"]) {
        isValid = false;
        errors["email"] = "Please enter your email Address.";
      }
  
      if (typeof input["email"] !== "undefined") {
          
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(input["email"])) {
          isValid = false;
          errors["email"] = "Please enter valid email address.";
        }
      }
  
      if (!input["password"]) {
        isValid = false;
        errors["password"] = "Please enter your password.";
      }
  
      if (!input["confirm_password"]) {
        isValid = false;
        errors["confirm_password"] = "Please enter your confirm password.";
      }
  
      if (typeof input["password"] !== "undefined") {
        if(input["password"].length < 6){
            isValid = false;
            errors["password"] = "Please add at least 6 charachter.";
        }
      }
  
      if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {
          
        if (input["password"] !== input["confirm_password"]) {
          isValid = false;
          errors["password"] = "Passwords don't match.";
          errors["confirm_password"] = "Passwords don't match."
        }
      }
  
      this.setState({
        errors: errors
      });
  
      return isValid;
  }
     
  render() {
    return (
      
        <Box
              component="form"
              sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
              onSubmit={this.handleSubmit}
        >
          
            <TextField 
            
            id="outlined-basic" 
            label="Email" 
            variant="outlined" 
            name="email"
            value={this.state.input.email}
            placeholder="Enter your email" 
            size="small" 
            autoComplete='on'
            onChange={this.handleChange}
            
            {...(this.state.errors.email && {error:true,helperText:this.state.errors.email})}
            />
          
            <TextField
                id="input-with-icon-textfield" 
                label="Password" 
                type={this.state.showPassword ? 'text' : 'password'} 
                name="password" 
                value={this.state.input.password} 
                onChange={this.handleChange}
                autoComplete="current-password"  
                placeholder="Enter your password"
                
                size="small"
                InputProps={{
                  endAdornment:(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                          edge="end"
                        >
                          {this.state.showPassword ?  <Visibility />:<VisibilityOff /> }
                        </IconButton>
                      </InputAdornment>
                  )
                }}
                {...(this.state.errors.password && {error:true,helperText:this.state.errors.password})}
      
      />            
            <TextField
                id="input-with-icon-textfield" 
                label="Password"  
                type={this.state.showPassword ? 'text' : 'password'} 
                name="confirm_password" 
                value={this.state.input.confirm_password}
                onChange={this.handleChange}
                autoComplete="current-password"  
                placeholder="Enter your password"
                
                size="small"
                InputProps={{
                  endAdornment:(
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                          edge="end"
                        >
                          {this.state.showPassword ?  <Visibility />:<VisibilityOff /> }
                        </IconButton>
                      </InputAdornment>
                  )
                }}
                {...(this.state.errors.confirm_password && {error:true,helperText:this.state.errors.confirm_password})}
      
      />
                 
         <div style={{paddingLeft:"20px",
             textAlign:"center"}}>
        <ThemeProvider theme={theme}>
                <Button color="neutral" variant="contained" type="submit" value="Submit" size="medium" >
                    REGISTER
                </Button>
        </ThemeProvider>
         <br/>
         </div>
        </Box>
        
      
    );
  }
}
  
export default withRouter(Validation) ;