import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Typography, Card, Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import WaveBorder from "../../../shared/components/WaveBorder";
import useMediaQuery from "@mui/material/useMediaQuery";
import OrganizationOnboardingForm from "./OnboardingForm";

const styles = (theme) => ({
  extraLargeButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
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
  image: {
    maxWidth: "100%",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
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
  waveBorder: {
    paddingTop: theme.spacing(4),
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(4),
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 400,
    margin: "auto",
  },
});

function FormSection(props) {
  const { classes, theme } = props;
  const isWidthUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  const [metadata, setMetadata] = useState({
    userId: "",
    workflowId: "",
    runtimeId: "",
    returnUrl: "",
    env: "",
  });

  const [isParamsExist, setIsParamsExist] = useState(false);

  useEffect(() => {
    // Check if metadata is in the URL
    const urlParams = new URLSearchParams(window.location.search);
    console.log("urlParams", urlParams);
    if (
      // urlParams.get('userId') &&
      // urlParams.get("workflowId") &&
      // urlParams.get("runtimeId") &&
      // urlParams.get("returnUrl")
      // urlParams.get('env')
      true
    ) {
      const metadataFromUrl = {
        userId: urlParams.get("userId"),
        workflowId: urlParams.get("workflowId"),
        runtimeId: urlParams.get("runtimeId"),
        returnUrl: urlParams.get("returnUrl"),
        env: urlParams.get("env"),
      };
      console.log("urlParams", "urlParams", metadataFromUrl);

      setMetadata(metadataFromUrl);
      setIsParamsExist(true);
    } else {
      setIsParamsExist(false);
    }
  }, []);

  return (
    <Fragment>
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
                      {isParamsExist ? (
                        <Box mb={4}>
                          <Typography variant={isWidthUpLg ? "h3" : "h4"}>
                            Revolutionizing Saas Products
                          </Typography>
                        </Box>
                      ) : (
                        <Box mb={4} width={"full"} maxWidth={400}>
                          <Typography
                            variant={isWidthUpLg ? "h1" : "h2"}
                            fontWeight={700}
                          >
                            404
                          </Typography>
                          <Typography variant={isWidthUpLg ? "h5" : "p"}>
                            Page Not Found
                          </Typography>
                        </Box>
                      )}
                      <Box>
                        {isParamsExist ? (
                          <OrganizationOnboardingForm
                            onboardingMetaData={metadata}
                          />
                        ) : null}
                      </Box>
                    </Box>
                  </Grid>
                </Box>
              </div>
            </Card>
          </Box>
        </div>
      </div>
      <WaveBorder
        upperColor={theme.palette.secondary.main}
        lowerColor="#FFFFFF"
        className={classes.waveBorder}
        animationNegativeDelay={2}
      />
    </Fragment>
  );
}

FormSection.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(FormSection);
