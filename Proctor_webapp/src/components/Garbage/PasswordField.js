import * as React from 'react';


import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Portalbtn from './Portalbtn';


  
export default function BasicTextFields(props) {
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    
      const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
  return (
      <>
    
      
      <TextField
        id="input-with-icon-textfield" 
        label="Password"  
        type={values.showPassword ? 'text' : 'password'} 
        value={values.password} 
        onChange={handleChange('password')}
        autoComplete="current-password"  
        placeholder="Enter your password"
        size="small"
        InputProps={{
          endAdornment:(
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ?  <Visibility />:<VisibilityOff /> }
                </IconButton>
              </InputAdornment>
          )
        }}
      
      />
    
     
    </>
  );
}