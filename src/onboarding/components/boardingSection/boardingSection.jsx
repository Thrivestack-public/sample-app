import React, { Fragment } from 'react'
import { Grid, Box } from '@mui/material';
import OnboardingPageOne from '../onboardingPageOne/OnboardingPageOne';
import OnboardingPageTwo from '../onboardingPageTwo/OnboardingPageTwo';
import { useOnboardingFormData } from "../onboardingFormDataContext/onboardingFormDataContext";
import WorkFlowHeading from '../workFlowHeading/workFlowHeading';
import WorkFlowStepper from '../workFlowStepper/workFlowStepper';
function boardingSection(props) {
  const {currentPage} = useOnboardingFormData();
  return (
    <Fragment>
    <Box sx={{ flexGrow: 1, height: '100vh' }}>
      <Grid container spacing={0} style={{ height: '100%', paddingTop:'2vh'}}>
        <Grid item xs={6} style={{ display: 'flex', paddingTop:'12vh', paddingLeft:'1vw',backgroundColor:'#e2e8f040' }}>
          <Box>
            <WorkFlowHeading />
            <WorkFlowStepper />
          </Box>
        </Grid>
        <Grid item xs={6} style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'start'}}>
          <Box>
            { currentPage === 1 && <OnboardingPageOne /> }
            { currentPage === 2 && <OnboardingPageTwo /> }
          </Box>
        </Grid>
      </Grid>
    </Box>
    </Fragment>
  );
};


boardingSection.propTypes = {};

export default boardingSection;