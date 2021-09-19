import React from 'react'
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
const Portalbtn = (props) => {
    const history = useHistory();
    return (
        <ThemeProvider theme={theme}>
                <Button color="neutral" variant="contained" type="submit" size="large" onClick={() => history.push(props.property)}>
                    {props.btname}
                </Button>
        </ThemeProvider>
    )
}
export default Portalbtn
