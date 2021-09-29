import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
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
export default function Emailfield(props) {
    const history = useHistory();
    const [validate,setValid] = React.useState({
        validate: false,
    })
    
    const [values, setValues] = React.useState({
        email: '',
        
    });
    const [error, setError] = React.useState({
        error:''
    });
    const handleChange=(event) => {
        /*let temp ={...error}
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        */
        const {name,value} = event.target
        setValues({ ...values, [name]: value });
        /*temp.error = re.test(values.email) ? "" : "Enter a valid email"
        console.log(values.email);
        setError({
            ...temp
        })
        console.log(error.error)*/
    };
    const handleClick =()=>{
        let temp ={...error}
        const re = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        temp.error =  (/$^|.+@.+..+/).test(values.email) ? "" : "Enter a valid email"
        setError({
            ...temp
        })
        if(error.error!=="Enter a valid email"){
            
            setValid({validate:true})
            console.log(validate.validate)
        }
        
    }
    const handleSubmit=()=>{
        
        if(validate.validate){
            history.push("/signin")
        }
    }
    
    return (
        <>
            <TextField 
            
            id="outlined-basic" 
            label="Email" 
            variant="outlined" 
            name="email"
            value = {values.email}
            placeholder="Enter your email" 
            size="small" 
            autoComplete='on'
            onChange={handleChange}
            onBlur={handleClick}
            {...(error.error && {error:true,helperText:error.error})}
            />

            <ThemeProvider theme={theme}>
                <Button color="neutral" variant="contained" type="button" size={props.size} onClick={handleSubmit}>
                    {props.btname}
                </Button>
            </ThemeProvider>
        </>
    )
}
