import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Typography, Card, Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import useMediaQuery from "@mui/material/useMediaQuery";
import OrganizationOnboardingForm from "./OnboardingForm";

const styles = (theme) => ({
  card: {
    boxShadow: theme.shadows[4],
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
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
            <div className={classNames(classes.containerFix, "container")}>
              <Box display="flex" justifyContent="space-between" gap={"20px"}>
                <Grid item xs={12} md={5}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    height="100%"
                  >
                    <Box mb={4} textAlign={"center"}>
                      <Typography variant={"h4"}>Welcome To SaaSBox</Typography>
                      <Typography variant="p" fontSize={"12px"} mt={"12px"}>
                        Please enter the following details to complete the
                        process.
                      </Typography>
                    </Box>
                    <Box>
                      <OrganizationOnboardingForm
                        onboardingMetaData={metadata}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Box>
            </div>
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
