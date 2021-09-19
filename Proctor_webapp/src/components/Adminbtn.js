import * as React from 'react';
import { styled,createTheme,ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Stack from '@mui/material/Stack';

const Input = styled('input')({
  display: 'none',
});
const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      neutral: {
        main: '#006666',
        contrastText: '#fff',
      },
    },
});

export default function Adminbtn(props) {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <Input accept="image/*" id="contained-button-file" multiple type="file" />
        <ThemeProvider theme={theme}>
        <Button color="neutral" variant="contained" component="span" size="large">
            {props.btnname}
          <IconButton style={{ color:'white' }} aria-label="upload picture" component="span">
          <UploadFileIcon fontSize="large"/>
          </IconButton>
        </Button>
        </ThemeProvider>
      </label>
      <label htmlFor="icon-button-file">
        <Input accept="image/*" id="icon-button-file" type="file" />
        
      </label>
    </Stack>
  );
}
