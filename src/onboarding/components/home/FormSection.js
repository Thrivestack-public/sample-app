import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Typography, Card, Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import OrganizationOnboardingForm from "./OnboardingForm";
import StepStatusCard from "../StepStatusCard/StepStatusCard";

const styles = (theme) => ({
  card: {
    boxShadow: theme.shadows[4],
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    minWidth: "60%",
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(5.5),
      paddingBottom: theme.spacing(5.5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("xl")]: {
      width: "auto",
    },
  },
  wrapper: {
    position: "relative",
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2),
  },
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(12),
    minWidth: "80%",
    [theme.breakpoints.down("lg")]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(3),
    },
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important",
    },
  },
  statusCard: {
    width: "100%",
    maxWidth: "500px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "8px 16px",
    margin: "24px",
  },
  formTitle: {
    fontWeight: 600,
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "12px",
  },
});

function FormSection(props) {
  const { classes, theme } = props;

  const [metadata, setMetadata] = useState({
    userId: "",
    workflowId: "",
    runtimeId: "",
    returnUrl: "",
    env: "",
  });

  useEffect(() => {
    // Check if metadata is in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const metadataFromUrl = {
      userId: urlParams.get("userId"),
      workflowId: urlParams.get("workflowId"),
      runtimeId: urlParams.get("runtimeId"),
      returnUrl: urlParams.get("returnUrl"),
      env: urlParams.get("env"),
    };
    setMetadata(metadataFromUrl);
    localStorage.setItem(
      "userMetaData",
      JSON.stringify({
        userId: metadataFromUrl.userId,
        workflowId: metadataFromUrl.workflowId,
        runtimeId: metadataFromUrl.runtimeId,
        env: metadataFromUrl.env,
      })
    );
  }, []);

  return (
    <div className={classNames("lg-p-top", classes.wrapper)}>
      <div className={classNames("container-fluid", classes.container)}>
        <Box display="flex" justifyContent="center" className="row">
          <Card
            className={classes.card}
            data-aos-delay="200"
            data-aos="zoom-in"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              gap={"20px"}
              width={"full"}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                width="100%"
              >
                <Box mb={4} textAlign={"center"}>
                  <Typography
                    fontSize={["20px", "28px", "36px"]}
                    fontWeight={600}
                  >
                    SaaSBox Onboarding
                  </Typography>
                  <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
                    This is the onboarding page of the SaaSBox - designed to
                    illustrate the seamless integration of <br /> ThriveStack's
                    workflows with your own application.
                  </Typography>
                  <br />
                  <br />
                  <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
                    Behind the scene Thrive has already completed the following
                    steps -
                  </Typography>
                  <Box
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                  >
                    <StepStatusCard label="Authentication" status="done" />
                    <StepStatusCard
                      label="User Surge Check (Waitlist)"
                      status="done"
                    />
                  </Box>
                </Box>

                <Box>
                  <Typography className={classes.formTitle}>
                    Onboarding Form
                  </Typography>
                  <OrganizationOnboardingForm onboardingMetaData={metadata} />
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>
      </div>
    </div>
  );
}

FormSection.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(FormSection);
