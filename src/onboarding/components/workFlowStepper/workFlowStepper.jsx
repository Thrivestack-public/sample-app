import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import StepConnector from '@mui/material/StepConnector';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Card, CardHeader, CardContent, styled } from '@mui/material';
import { textConstants } from "../../../textConstants";
import { Grid, Container } from '@mui/material';
import './workFlowStepper.css';
import { ArcherContainer, ArcherElement } from "react-archer";
import {useOnboardingFormData} from "../onboardingFormDataContext/onboardingFormDataContext";
import JsonViewerModal from './modalComponent';
import fetchData from '../../../Api/viewSharedData';


const GroupedStepContent = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2)
}));

function workFlowStepper(props) {
  const { classes } = props;
  const { pageStepCounter, stepCompleted } = useOnboardingFormData();
  console.log("StepCompleted", stepCompleted);
  const workflowRuntimeId = 'e0439307-a74d-4f4d-92d0-99f7ad9eece4';
  const [stepId, setStepId] = useState('');
  const [viewSharedDataJson, setViewSharedDataJson] = useState({"progress": "loading data.."}); 
  const steps = [
    {
      label: 'Authenticate',
      description: ``,
    },
    {
      label: 'Enrich Users and Accounts',
      description:
        '',
    },
    {
      label: 'Check Waitlist',
      description: ``,
    },
    {
      label: 'Onboarding Redirect',
      description: ''
    },
    {
      label: 'Apply Pricing Plan',
      description: ''
    },
    {
      label: 'Provision tenant Request',
      description: ''
    },
    {
      label: 'Store Leads',
      description: ''
    },
    {
      label: 'Send Enduser Welcome Link',
      description: ''
    },
    {
      label:'Redirect',
      description:''
    }

  ]
  const groupsteps = [

    {
      label: 'Provision tenant',
      steps: []
    },
    {
      label: 'Product Home',
      steps: [],
      icon: <img src="/home.png" alt="icon" height={30} width={30} />,
    }
  ];
  const viewSharedData = (stepId) => (
    <div
      style={{
        color: "blue",
        fontSize: "12px",
        position: "relative",
        top: '-1.3em',
        borderBottom: '1px solid blue',
        textAlign: "center",
        width: "9em"
      }}
      onClick={() => {setStepId(stepId); setIsModalOpen(true)}}
    >
      View Shared Data
    </div>
  );
  const acknowledgeData = (
    <div
      style={{
        color: "black",
        fontSize: "12px",
        marginTop: "-3px",

      }}
    >
      Acknowledge
    </div>
  );
  const redirectData = (
    <div
      style={{
        fontSize: "12px",
        padding: "3%, 5%",
        textAlign: "center",
        backgroundColor: "#F8FAFC"
      }}
    >
      Redirect
    </div>
  );

  let leftToRightArrowRelation = {
    targetId: "id_of_target",
    sourceId: "id_of_source",
    top: "0px",
    targetAnchor: "left",
    sourceAnchor: "right",
    style: {
      lineStyle: 'straight'
    },
    label: null
  }
  let rightToLeftArrowRelation = {
    ...leftToRightArrowRelation, targetAnchor: "right", sourceAnchor: "left",
    style: { lineStyle: 'straight', 'strokeDasharray': '5,5' }
  };
 
  const firstArrowRelation = { ...leftToRightArrowRelation, label: viewSharedData('onboarding'), targetId: 'firstArrowTarget', sourceId: 'firstArrowSource', top: '270px' };
  const thirdArrowRelation = { ...leftToRightArrowRelation, label: viewSharedData('tenant_creation'), targetId: 'thirdArrowTarget', sourceId: 'thirdArrowSource', top: '395px' };
  const fivethArrowRelation = { ...leftToRightArrowRelation, label: <div>{viewSharedData('product_redirect')} {redirectData}</div>, targetId: 'fifthArrowTarget', sourceId: 'fifthArrowSource', top: '585px' };
  const leftToRightArrowRelations = [firstArrowRelation, thirdArrowRelation, fivethArrowRelation,];

  const secondArrowRelation = { ...rightToLeftArrowRelation, label: acknowledgeData, targetId: 'secondArrowTarget', sourceId: 'secondArrowSource', top: '285px' };
  const fourthArrowRelation = { ...rightToLeftArrowRelation, label: acknowledgeData, targetId: 'fourthArrowTarget', sourceId: 'fourthArrowSource', top: '410px' };
  const rightToLeftArrowRelations = [secondArrowRelation, fourthArrowRelation];

  const [activeUserStep, setActiveUserStep] = React.useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activeSubStep, setActiveSubStep] = useState(0);

  const step_default_img = "/steps_default.png";
  const step_in_progress_img = "/step_in_progress.png";
  const step_complete_img = "/step_complete.png";

  const [additionalStyleApplied, setAdditionalStyleApplied] = useState(true);

  

  const handleNext = () => {
    setActiveUserStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveUserStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveUserStep(0);
  };


  const handleBackGroup = () => {
    if (activeSubStep > 0) {
      setActiveSubStep(prevSubStep => prevSubStep - 1);
    } else if (activeStep > 0) {
      setActiveStep(prevStep => prevStep - 1);
      setActiveSubStep(groupsteps[activeStep - 1].steps.length - 1);
    }
  };

  const handleResetGroup = () => {
    setActiveStep(0);
    setActiveSubStep(0);
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);


  useEffect(async () => {
    const apiResponse = await fetchData(workflowRuntimeId, stepId);
    setViewSharedDataJson(apiResponse);
  }, [stepId]);

  return (
    <ArcherContainer strokeColor="#ccc" strokeWidth={1}>
      <JsonViewerModal isOpen={isModalOpen} onClose={closeModal} json={viewSharedDataJson} />
      <Grid container columns={{ md: 12 }} spacing={2} sx={{ marginTop: '2vh', paddingLeft: '1.5vw' }}>

        <Grid md="5">
          <Card style={{ position: 'relative' }}>
            {
              leftToRightArrowRelations.map((arrowRelation) => (
                <ArcherElement id={arrowRelation.sourceId} relations={[arrowRelation]}>
                  <div style={{ position: 'absolute', top: arrowRelation.top, left: '100%', right: '0' }}></div>
                </ArcherElement>
              ))
            }
            {
              rightToLeftArrowRelations.map((arrowRelation) => (
                <ArcherElement id={arrowRelation.targetId}>
                  <div style={{ position: 'absolute', top: arrowRelation.top, right: '0', left: '100%' }}></div>
                </ArcherElement>
              ))
            }
            <Typography
              variant="p"
              fontWeight={500}
              paddingBottom={"1vh"}
              paddingTop={"2vh"} justifyContent={'center'} display={"flex"}
              backgroundColor="#F8FAFC"
              fontSize={["12px", "14px", "16px"]}
            >
              <img src="/thrive.png"></img>
            </Typography>
            <Typography
              variant="p"
              fontWeight={500}
              justifyContent={'center'} display={"flex"}
              fontSize={["8px", "10px", "12px"]}
            >
              {textConstants.WORKFLOW_STEPPER_SUBTITLE}
            </Typography>

            <CardContent>

              <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={stepCompleted} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label} sx={{ color: 'green' }}>
                      <StepLabel

                        StepIconProps={{
                          classes: {
                            active: 'StepperIconRoot',
                            completed: 'StepperIconCompleted',
                          }
                        }}
                      >
                        {step.label}   <img src="/Vector.png"></img>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {activeUserStep === steps.length && (
                  <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                      Reset
                    </Button>
                  </Paper>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid md="3">
        </Grid>
        <Grid md="4">
          <Paper elevation={3} style={{ maxWidth: '600px', margin: 'auto', position: 'relative' }}>
            {
              rightToLeftArrowRelations.map((arrowRelation) => (
                <ArcherElement id={arrowRelation.sourceId} relations={[arrowRelation]}>
                  <div style={{ position: 'absolute', top: arrowRelation.top, left: '0', right: '100%' }}></div>
                </ArcherElement>
              ))
            }
            {
              leftToRightArrowRelations.map((arrowRelation) => (
                <ArcherElement id={arrowRelation.targetId}>
                  <div style={{ position: 'absolute', top: arrowRelation.top, left: '0', right: '100%' }}></div>
                </ArcherElement>
              ))
            }
            <Typography
              variant="p"
              fontWeight={500}
              paddingBottom={"1vh"}
              paddingTop={"2vh"} justifyContent={'center'} display={"flex"}
              backgroundColor="#F8FAFC"
              fontSize={["12px", "14px", "14px"]}> <img src="/acme.png" style={{ height: '2vw', padding: '0% 1%', marginTop: '-1%' }}></img> {textConstants.WORKFLOW_STEPPER_TITLE_TWO}</Typography>
            <Stepper activeStep={activeStep} orientation="vertical" style={{ paddingBottom: '27px', marginTop: '1vw' }} sx={{ color: '#334155' }}>
              <div className={'default-box'}>
              <Step index={0}>
                <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#334155', marginBottom: '0vw' } }} icon={<img src="/account_circle.png" style={{ height: '2vw', padding: '0% 1%', marginTop: '-1%' }}></img>}>End User</StepLabel>
              </Step>
              </div>
              <div className='default-box' style={{ height: '125px' }}>
                <StepConnector classes={{root: 'line-parent', line: 'full-lines'}}/>
              </div>
              <div className={`default-box ${(pageStepCounter >= 1 && pageStepCounter < 3) ? 'arrow-box' : 'color-box'}`} id="onboarding-box">
                <span style={{ fontSize: '16px', fontWeight: '400', color: '#cfad56' }}>Onboarding</span>
                <Step index={0}>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#334155', borderColor: 'transparent' } }}
                  icon={<img src={pageStepCounter > 1 ? step_complete_img : (pageStepCounter == 1 ? step_in_progress_img : step_default_img)} style={{ height: '2vw', padding: '0% 1%', marginTop: '-1%' }}></img>}>Step 1</StepLabel>
                </Step>
                <Step>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#334155' } }}
                    icon={<img src={pageStepCounter > 2 ? step_complete_img : (pageStepCounter == 2 ? step_in_progress_img : step_default_img)} style={{ height: '2vw', padding: '0% 1%', marginTop: '-1%' }}></img>}>Step 2</StepLabel>
                </Step>
              </div>
              <div className='default-box' style={{ height: '15px' }}>
                <StepConnector classes={{root: 'line-parent', line: 'full-lines'}}/>
              </div>
              <div className={`default-box ${(pageStepCounter >= 3) ? 'arrow-box' : 'color-box'}`} id="provision-box">
                <Step index={0}>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#334155' } }}
                    icon={<img src={pageStepCounter > 3 ? step_complete_img : (pageStepCounter == 3 ? step_in_progress_img : step_default_img)} style={{ height: '2vw', padding: '0% 1%', marginTop: '-1%' }}></img>}>Provision tenant </StepLabel>
                </Step>
              </div>
              <div className='default-box' style={{ height: '140px' }}>
              <StepConnector classes={{root: 'line-parent', line: 'full-lines'}}/>
              </div>
              <div className={'default-box color-box'} id="home-box">
              <Step sx={{ color: 'green' }} index={0}>
                <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#334155' } }}
                  icon={<img src="/home.png" style={{ height: '2vw', padding: '0% 1%', marginTop: '-1%' }}></img>} >Product Home  </StepLabel>
              </Step>
              </div>
            </Stepper>
          </Paper>
        </Grid>

      </Grid>
    </ArcherContainer>
    //   </Container>
  )
}

export default workFlowStepper