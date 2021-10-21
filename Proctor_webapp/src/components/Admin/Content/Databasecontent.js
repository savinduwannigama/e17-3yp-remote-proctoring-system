import React from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import Button from '@mui/material/Button';
import StepButton from '@mui/material/StepButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { createTheme,ThemeProvider } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import Addproctor from './Addproctor';
import AddStudent from './AddStudent'
import Addcourse from './Addcourse';
import Addexam from './Addmastersheet';
import Showproctor from './ShowProctor';
import Showstudents from './ShowStudents';
import Showcourses from './ShowCourse';

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
            <div style={{margin:"auto"}}>
               <p style={{fontSize:"15px"}}></p>
                <Showproctor/>
            </div>
        );
      case 1:
        return (
          <div style={{margin:"auto"}}>
                <p style={{fontSize:"15px"}}></p>
                <Showstudents/>
            </div>
        )
      case 2:
        return (
          <div style={{margin:"auto"}}>
                <p style={{fontSize:"15px"}}></p>
               <Showcourses/>
            </div>
        )
      case 3:
        return (
          <div style={{margin:"auto"}}>
                <p style={{fontSize:"15px"}}></p>
               <Addexam/>
            </div>
        )
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
                Show/Delete Proctors
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
                Show/Delete Students
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
                Show/Delete Courses
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
                Show/Delete Exams
              </StepButton>
              </ThemeProvider>
            </Step>
          
        </Stepper>
        {getStepContent(activeStep)}
       { /*<div>
          {allStepsCompleted() ? (
            <div>
              All steps completed - you&apos;re finished
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              {getStepContent(activeStep)}
              <div>
              <ThemeProvider theme={theme}>
                <Button color="neutral" disabled={activeStep === 0} onClick={handleBack}>
                  Back
                </Button>
                <Button variant="contained" color="neutral" onClick={handleNext}>
                  Next
                </Button>
                </ThemeProvider>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    `Step ${activeStep + 1} already completed`
                  ) : (
                    <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      color="neutral"
                      onClick={handleComplete}
                    >
                      {completedSteps() === totalSteps() - 1
                        ? "Finish"
                        : "Complete Step"}
                    </Button>
                    </ThemeProvider>
                  ))}
              </div>
            </div>
          )}
                      </div>*/}
      </div>
    );
  }