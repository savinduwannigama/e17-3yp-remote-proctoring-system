import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useHistory } from 'react-router-dom';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const history = useHistory();
  const [open, setOpen] = React.useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //setOpen(false);
    history.push('/signin')

  };

  return (
    <div>
      
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{backgroundColor:"#00666633"}}
      >
        <DialogTitle sx={{textAlign:"center"}}>{"Session has expired"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" sx={{color:"black"}}>
            Session expired!
            Please Sign in again.
            
          </DialogContentText>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{backgroundColor:"#00666633",color:"#006666"}}>Sign in</Button>
          
        </DialogActions>
      </Dialog>
    </div>
  );
}