import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
// import CancelIcon from "@mui/icons-material/Cancel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { withTheme } from "@mui/styles";
import useWidth from "../../../shared/functions/useWidth";
import WorkflowStatusCard from "./WorkflowStatusCard";
import calculateSpacing from "./calculateSpacing";
import StepStatusCard from "../StepStatusCard/StepStatusCard";

function WorkflowStatusArea(props) {
  const { theme } = props;
  const width = useWidth();
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const [userData, setUserData] = useState({});
  const [userOnboardingData, setUserOnboardingData] = useState({});

  const getUserData = async () => {
    let data = localStorage.getItem("onboardingData");
    data = JSON.parse("onboardingData");
    if (data) {
      setUserOnboardingData(data);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const data = [
    {
      step: "1. Authentication Token",
      status: "done",
      text: "Thrivestack has done authentication through your authentication provider and securely stored the authentication token in cookies at the domain level.",
      data: {
        data: {},
      },
    },
    {
      step: "2. User Surge Check",
      status: "done",
      text: "ThriveStack has reviewed the user limit that you configured within the waitlist user node settings.",
      data: {
        data: {},
      },
    },
    {
      step: "3. Onboarding",
      status: "done",
      text: "Upon completing the user surge check, ThriveStack guided the end user to initiate the Saasbox onboarding process via the redirect URL configured by SaasBox (SaasBuilder) in the onboarding node settings in the workflow builder. After successfully onboarding the end user, Saasbox subsequently directs them back to the designated returnUrl.",
      data: userOnboardingData || {
        data: {},
      },
    },
    {
      step: "4. User Enrichment",
      status: "done",
      text: "ThriveStack subsequently performed data enrichment based on the enrichment fields configured by SaasBox (SaasBuilder) within the enrichment node settings, enhancing the user's information. The enriched data is then securely stored within the SaasBox CRM.",
      data: userData.userEnrichmentData || {
        data: {},
      },
    },
    {
      step: "5. Associate Role and Pricing",
      status: "done",
      text: "ThriveStack has also allocated a default role and pricing based on the settings defined by SaasBox (SaasBuilder) in the Associate App Role and Associate App Pricing configurations.",
      data: userData.appRoleData || {
        data: {},
      },
    },
    {
      step: "6. Tenant Surge Check",
      status: "done",
      text: "ThriveStack has also checked the tenant limit that you configured within the waitlist user node settings.",
      data: {
        data: {},
      },
    },
    {
      step: "7. Tenant Creation and Acknowledgement",
      status: "done",
      text: "ThriveStack initiated a tenant creation request, retrieved the tenant information from the tenant acknowledgment queue, and securely stored it for further processing.",
      data: {
        data: {},
      },
    },
    {
      step: "8. Notify End User",
      status: "done",
      text: "In the signup workflow, ThriveStack also communicated the successful account creation to the user through the email service provider specified in the Notify Node settings.",
      data: {
        data: {},
      },
    },
    {
      step: "9. Redirect End User",
      status: "done",
      text: "Towards the end, ThriveStack directed the user to the Saasbox application, specifically to the redirect URL configured by SaasBuilder within the Redirect Node settings of the signup workflow.",
      data: {
        data: {},
      },
    },
  ];

  return (
    <div>
      <div className="container-fluid">
        <Box mb={4} textAlign={"center"}>
          {/* <img src="/favicon-192x192.png" alt="icon" height={100} width={100} />
          <Typography
            fontSize={["20px", "28px", "36px"]}
            fontWeight={600}
            mb={2}
          >
            Welcome to SaaSBox Application
          </Typography>
          <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
            This is the application dashboard page of the SaaSBox - designed to
            illustrate the seamless integration of <br /> ThriveStack's
            workflows with your own application.
          </Typography>
          <Box mt={4} maxWidth={"600px"} marginX={"auto"}>
            <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
              Once the end user arrives on this page, all the necessary steps
              will have been executed, and we will have gathered and stored the
              data throughout the entire process, allowing you to access and
              view it.
            </Typography>
          </Box> */}

          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            mt={2}
          >
            <Grid container spacing={calculateSpacing(width, theme)}>
              {data.map((element) => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  xl={4}
                  data-aos="zoom-in-up"
                  data-aos-delay={
                    (isWidthUpMd ? element.mdDelay : element.smDelay) || "0"
                  }
                  key={element.headline}
                  alignContent={"center"}
                  justifyItems={"center"}
                >
                  <StepStatusCard
                    label={element.step}
                    status={element.status}
                    isShowButtonVisible
                    data={element.data}
                    text={element.text}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
        <Box className="container-fluid" display={"none"}>
          <Grid container spacing={calculateSpacing(width, theme)}>
            {data.map((element) => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={
                  (isWidthUpMd ? element.mdDelay : element.smDelay) || "0"
                }
                key={element.headline}
              >
                <WorkflowStatusCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.step}
                  text={element.text}
                  status={element.status}
                  data={element.data}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </div>
  );
}

WorkflowStatusArea.propTypes = {};

export default withTheme(WorkflowStatusArea);
