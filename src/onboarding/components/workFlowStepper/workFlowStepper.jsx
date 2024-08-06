import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector from '@mui/material/StepConnector';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Card, CardContent } from '@mui/material';
import { textConstants } from "../../../textConstants";
import { Grid } from '@mui/material';
import { ArcherContainer, ArcherElement } from "react-archer";
import { useOnboardingFormData } from "../onboardingFormDataContext/onboardingFormDataContext";
import JsonViewerModal from './modalComponent';
import PreviewModal from './previewModalComponent';
import fetchData from '../../../Api/viewSharedData';
import { useLocation } from 'react-router-dom';
import './workFlowStepper.css';
import validateAuthOTPData from '../../../Api/validateAuthOTPData'



function workFlowStepper(props) {

  const location = useLocation();
  const currentPath = location.pathname;
  const isFinalPage = currentPath.endsWith("/final");
  const queryParams = new URLSearchParams(location.search);
  const workflowRuntimeId = queryParams.get('runtimeId');
  const authOTP = queryParams.get('authOTP');
  console.log("workflowRuntimeId", workflowRuntimeId);

  if(workflowRuntimeId && workflowRuntimeId!==""){
    localStorage.setItem("workflowRuntimeId",workflowRuntimeId)
  }

  const { pageStepCounter, stepCompleted, setCurrentPage, setPageStepCounter, setStepCompleted } = useOnboardingFormData();
  if (isFinalPage) {
    setCurrentPage(3);
    setStepCompleted(11);
    setPageStepCounter(4);
  }

  console.log("StepCompleted", stepCompleted);
  const [stepId, setStepId] = useState('');
  const [viewSharedDataJson, setViewSharedDataJson] = useState({ "progress": "loading data.." });
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
      label: 'Redirect',
      description: ''
    }

  ]

  const viewSharedData = (stepId) => (
    <div
      style={{
        color: "blue",
        fontSize: "12px",
        position: "relative",
        top: '-1.3em',
        textDecoration: 'underline',
        textAlign: "center",
        width: "9em",
        cursor: 'pointer'
      }}
      onClick={() => { setStepId(stepId); setIsModalOpen(true) }}
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

  const [activeStep, setActiveStep] = useState(0);

  const step_default_img = "/steps_default.png";
  const step_in_progress_img = "/step_in_progress.png";
  const step_complete_img = "/step_complete.png";


  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const [isPrevModalOpen, setIsPrevModalOpen] = useState(false);
  const closePrevModel = () => setIsPrevModalOpen(false);


  useEffect(async () => {
    if(authOTP){
      const validateOTP = await validateAuthOTPData(authOTP || "")
      setViewSharedDataJson(validateOTP);
    }
  }, [authOTP]);
  
  useEffect(async () => {
      const wrId = localStorage.getItem("workflowRuntimeId") || ""
      const apiResponse = await fetchData(wrId, stepId);
      setViewSharedDataJson(apiResponse);  
  }, [stepId]);

  return (
    <ArcherContainer strokeColor="#ccc" strokeWidth={1}>
      <JsonViewerModal isOpen={isModalOpen} onClose={closeModal} json1={viewSharedDataJson} />

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
                  {isFinalPage && <div style={{ left: '10%', position: 'relative' }}>
                    <Step
                      completed={true}
                      index={0}
                    >
                      <StepLabel
                        onClick={() => { setIsPrevModalOpen(true) }}
                        StepIconProps={{
                          classes: {
                            active: 'StepperIconRoot',
                            completed: 'StepperIconCompleted',
                          }
                        }}
                      >
                        <span style={{ color: isFinalPage ? 'blue' : 'black' }} className="stepper-link" >Notify end users</span> <img src="/Vector.png"></img>
                      </StepLabel>
                    </Step>
                    <Step
                      completed={true}
                      index={0}
                    >
                      <StepLabel style={{ color: 'blue' }}
                        StepIconProps={{
                          classes: {
                            active: 'StepperIconRoot',
                            completed: 'StepperIconCompleted',
                          }
                        }}
                        completed={true}
                        index={0}
                        onClick={() => { setIsPrevModalOpen(true) }}
                      >
                        <span className="stepper-link" style={{ color: isFinalPage ? 'blue' : 'black' }}>Notify Acme GTM team</span><img src="/Vector.png"></img>
                      </StepLabel>
                      <PreviewModal isOpen={isPrevModalOpen} onClose={closePrevModel} />
                    </Step>
                  </div>}
                </Stepper>
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
                <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
              </div>
              <div className={`default-box ${(pageStepCounter == 1 || pageStepCounter == 2) ? 'arrow-box' : 'color-box'}`} id="onboarding-box">
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
                <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
              </div>
              <div className={`default-box ${(pageStepCounter == 3) ? 'arrow-box' : 'color-box'}`} id="provision-box">
                <Step index={0}>
                  <StepLabel sx={{ '& .MuiStepLabel-label': { color: '#334155' } }}
                    icon={<img src={(pageStepCounter == 4) ? step_complete_img : (pageStepCounter == 3 ? step_in_progress_img : step_default_img)} style={{ height: '2vw', padding: '0% 1%', marginTop: '-1%' }}></img>}>Provision tenant </StepLabel>
                </Step>
              </div>
              <div className='default-box' style={{ height: '140px' }}>
                <StepConnector classes={{ root: 'line-parent', line: 'full-lines' }} />
              </div>
              <div className={`default-box ${(pageStepCounter >= 4) ? 'arrow-box' : 'color-box'}`} id="home-box">
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

  )
}

export default workFlowStepper