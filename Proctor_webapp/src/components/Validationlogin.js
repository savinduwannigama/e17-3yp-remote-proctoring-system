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
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
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

class Validationlogin extends React.Component {
   
    
    
    constructor(props) {
    super(props);
    this.state = {
      input: {'email':'','password':''},
      errors: {'email':'','password':''},
      reqfail:'',
      failure: '',
      amount: '',
      password: '',
      weight: '',
      weightRange: '',
      showPassword: false,
      rememberMe:false

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
    this.handleMouseDownPassword =this.handleMouseDownPassword.bind(this);
    
  }
    componentDidMount() {
        let input = this.state.input;
        
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    input['email'] = rememberMe ? localStorage.getItem('user') : '';
    this.setState({ 
        input,
        rememberMe: rememberMe });
    }
    handleChange(event) {
    if(event.target.type === 'checkbox'){
        this.setState({
            rememberMe: event.target.checked
        })
        
    }
    else{
        let input = this.state.input;
        input[event.target.name] = event.target.value;
  
        this.setState({
            input
        });
    }
    
    
  }
     
   async handleSubmit(event) {
    event.preventDefault();
  
    if(this.validate()){
        let input = this.state.input;
        const semail= input["email"];
        const spw0= input["password"];
   
        const url = `http://143.244.139.140:5000/api/${this.props.path}`
        await axios.post(url, {
        email:semail,password:spw0}).then(resp => {
          console.log(resp.data);
        }).catch(error => {
        this.setState({
          reqfail:1,
          failure:error.response.data["message"]
        })
        console.log(this.state.reqfail)
        console.log(error.response)
        console.log(error.response.data["message"])

        });
        
        if(this.state.reqfail!==1){
        const rememberMe = this.state.rememberMe;
        console.log(this.state);

        localStorage.setItem('rememberMe',rememberMe);
        localStorage.setItem('user', rememberMe? this.state.input['email']: '')
        
        input = {};
        
        input["email"] = rememberMe? this.state.input['email']: '';
        input["password"] = "";
        
        
        
        
        this.props.history.push(this.props.next);
        }
        this.setState({input:input});
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
   
      
      if (input["email"]==='') {
        isValid = false;
        errors["email"] = "Please enter your email Address";
      }
  
      else if ( input["email"] !== "") {
          
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(input["email"])) {
          isValid = false;
          errors["email"] = "Please enter valid email address";
        }
      }
  
      if (input["password"]==="") {
        isValid = false;
        errors["password"] = "Please enter your password";
      }
  
      
      else if ( input["password"] !== "") {
        if(input["password"].length < 8){
            isValid = false;
            errors["password"] = "Please add at least 8 characters";
        }
        else if (input["password"].search(/[a-z]/i) < 0) {
          isValid = false;
          errors["password"] = "Password should contain at least one letter";
          
        }
        else if (input["password"].search(/[0-9]/) < 0) {
          isValid = false;
          errors["password"] ="Password should contain at least one digit";
          
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
           {this.state.reqfail && <div><p style={{color:"red",fontSize:"15px",textAlign:"center"}}>{this.state.failure}<br/>Please register using an authorized email</p></div>}
        
          <ThemeProvider theme={theme}>   
            <TextField 
            color="neutral"
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
                color="neutral"
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
       
        <FormControlLabel control={<Checkbox color="neutral" name="rememberMe" checked={this.state.rememberMe} onChange={this.handleChange} type="checkbox" />} label="Remember me" />
       
                 
         <div style={{paddingLeft:"20px",
            textAlign:"center"}}>
        
                <Button color="neutral" variant="contained" type="submit" value="Submit" size="medium" >
                    SIGN IN
                </Button>
        
        
         </div>
         </ThemeProvider>
        </Box>
        
      
    );
  }
}
  
export default withRouter(Validationlogin) ;
