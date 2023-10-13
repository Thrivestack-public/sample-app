import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Typography, Card, Box, Divider } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import OrganizationOnboardingForm from "./OnboardingForm";
import StepStatusCard from "../StepStatusCard/StepStatusCard";
import { textConstants } from "../../../textConstants";

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
  stepText: {
    fontWeight: 500,
    fontSize: "16px",
    [theme.breakpoints.down("md")]: {
      fontSize: "14px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "12px",
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
                    {textConstants.ONBOARDING_PAGE_TWO_TITLE}
                  </Typography>
                  <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
                    {textConstants.ONBOARDING_PAGE_TWO_DESCRIPTION_ONE}
                  </Typography>
                  <br />
                  <br />
                  <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
                    {textConstants.ONBOARDING_PAGE_TWO_DESCRIPTION_TWO}
                  </Typography>
                  <br />
                  <br />
                  <Typography className={classes.stepText}>
                    {textConstants.ONBOARDING_PAGE_TWO_LIST_ITEM_ONE}
                  </Typography>
                  <Typography className={classes.stepText}>
                    {textConstants.ONBOARDING_PAGE_TWO_LIST_ITEM_TWO}
                  </Typography>
                  <Typography className={classes.stepText}>
                    {textConstants.ONBOARDING_PAGE_TWO_LIST_ITEM_THREE}
                  </Typography>
                  <Typography className={classes.stepText}>
                    {textConstants.ONBOARDING_PAGE_TWO_LIST_ITEM_FOUR}
                  </Typography>
                </Box>
                <Divider />

                <Box mt={2}>
                  <Typography className={classes.formTitle}>
                    Onboarding Form - Step 2
                  </Typography>
                  <OrganizationOnboardingForm />
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
