import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import StepButton from '@mui/material/StepButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Typography from '@mui/material/Typography';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import AdminSettings from '../AdminSettings';
import Addproctor from './Addproctor';
import AddStudent from './AddStudent'

//import PropTypes from "prop-types";
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

function getSteps() {
    return ["Add Proctors", "Add Students", "Add Course", "Add Exam"];
  }
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
            <div style={{margin:"auto", border:"1px solid red",}}>
                Step 1
                <Addproctor/>
            </div>
        );
      case 1:
        return (
          <div style={{margin:"auto", border:"1px solid red",}}>
                Step 2
                <AddStudent/>
            </div>
        )
      case 2:
        return "do step 3";
      case 3:
        return "do step 4";
      default:
        return "unknown step";
    }
  }
  export default function Addexamcontent() {
    


    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const steps = getSteps();
    
    const totalSteps = () => {
      return steps.length;
    };
    const completedSteps = () => {
      return Object.keys(completed).length;
    };
    const isLastStep = () => {
      return activeStep === totalSteps() - 1;
    };
    const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
    };
    const handleNext = () => {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    };
    const handleBack = () => {
      setActiveStep(prevActiveStep => prevActiveStep - 1);
    };
    const handleStep = step => () => {
      setActiveStep(step);
    };
    const handleComplete = () => {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
    };
    const handleReset = () => {
      setActiveStep(0);
      setCompleted({});
    };
  return (
      <div>
        <Stepper nonLinear activeStep={activeStep}>
          <Step key={0}>
                <ThemeProvider theme={theme}>
              <StepButton
                icon= {<PersonAddIcon color="neutral"/>}
                onClick={handleStep(0)}
                completed={completed[0]}
              >
                Add Proctors
              </StepButton>
              </ThemeProvider>
            </Step>
            <Step key={1}>
                <ThemeProvider theme={theme}>
              <StepButton
                icon= {<GroupsIcon color="neutral"/>}
                onClick={handleStep(1)}
                completed={completed[1]}
              >
                Add Students
              </StepButton>
              </ThemeProvider>
            </Step>
            <Step key={2}>
                <ThemeProvider theme={theme}>
              <StepButton
                icon= {<SchoolIcon color="neutral"/>}
                onClick={handleStep(2)}
                completed={completed[2]}
              >
                Add Course
              </StepButton>
              </ThemeProvider>
            </Step>

            <Step key={3}>
                <ThemeProvider theme={theme}>
              <StepButton
                icon= {<UploadFileIcon color="neutral"/>}
                onClick={handleStep(3)}
                completed={completed[3]}
              >
                Schedule Exam
              </StepButton>
              </ThemeProvider>
            </Step>
          
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <div>
              All steps completed - you&apos;re finished
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
              <div>
                <Button disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  Next
                </Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    `Step ${activeStep + 1} already completed`
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleComplete}
                    >
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }