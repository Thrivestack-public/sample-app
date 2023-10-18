import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Box,
  Snackbar,
  Alert,
  Typography,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { useOnboardingFormData } from "../onboardingFormDataContext/onboardingFormDataContext";
import { textConstants } from "../../../textConstants";

const styles = (theme) => ({
  formContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    maxWidth: 400,
    margin: "auto",
  },
  successContainer: {
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(2),
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    maxWidth: 800,
    margin: "auto",
  },
  formTitle: {
    fontWeight: 600,
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "12px",
  },
});

const OrganizationOnboardingForm = (props) => {
  const { classes } = props;
  const { formData, setFormData, resetForm, onboardingMetaData } =
    useOnboardingFormData();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseErrorMessage = () => {
    setShowErrorMessage(false);
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.orgName) {
      newErrors.orgName = "Organization name is required";
    }
    if (!formData.orgType) {
      newErrors.orgType = "Organization type is required";
    }
    if (!formData.industry) {
      newErrors.industry = "Industry is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validateForm()) {
      try {
        const data = {
          ...formData,
          ...onboardingMetaData,
        };
        await localStorage.setItem("onboardingData", JSON.stringify(data));
        console.log("Data submitted successfully");

        resetForm();
        setShowSuccessMessage(true);
        localStorage.removeItem("userMetaData");

        setTimeout(() => {
          //need to get encoded URI from onboardingmetadata ui so tha i can decode and go to it.
          window.location.href =
            onboardingMetaData.returnUrl +
            "&workflowId=" +
            onboardingMetaData.workflowId +
            "&runtimeId=" +
            onboardingMetaData.runtimeId;
        }, 10000);
      } catch (error) {
        console.error("An error occurred", error);
        setErrorMessage("An error occurred", error);
        setShowErrorMessage(true);
      }
    } else {
      console.error("An error occurred");
      setErrorMessage("An error occurred");
      setShowErrorMessage(true);
    }
    setLoading(false);
  };

  if (true) {
    return (
      <Box className={classes.successContainer}>
        <Typography
          fontSize={["20px", "24px", "32px"]}
          fontWeight={600}
          color="#16A34A"
        >
          Congratulations!
        </Typography>
        <Typography
          fontSize={["16px", "20px", "24px"]}
          fontWeight={500}
          color="#16A34A"
        >
          {textConstants.ONBOARDING_PAGE_TWO_SUCCESS_TITLE}
        </Typography>
        <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
          {textConstants.ONBOARDING_PAGE_TWO_SUCCESS_DESC_ONE}
        </Typography>

        <Typography
          variant="p"
          fontWeight={600}
          fontSize={["12px", "14px", "16px"]}
        >
          {textConstants.ONBOARDING_PAGE_TWO_SUCCESS_DESC_TWO}
        </Typography>

        <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
          {textConstants.ONBOARDING_PAGE_TWO_SUCCESS_RETURN_URL}
        </Typography>

        <Typography
          variant="p"
          fontSize={["12px", "14px", "16px"]}
          color="#2563EB"
        >
          {onboardingMetaData.returnUrl +
            "&workflowId=" +
            onboardingMetaData.workflowId +
            "&runtimeId=" +
            onboardingMetaData.runtimeId}
        </Typography>
      </Box>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <Typography className={classes.formTitle}>
        Onboarding Form - Step 2
      </Typography>
      <Box className={classes.formContainer}>
        <TextField
          label="Website"
          name="website"
          type="url"
          value={formData.website}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Contact Person's Name"
          name="contactName"
          value={formData.contactName}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Contact Person's Email"
          name="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          loading={loading}
        >
          Complete Onboarding
        </Button>
        {loading && <p>Wait, you will be redirected soon.</p>}
        <Box height={40} />
        {/* Snackbar for success message */}
        <Snackbar
          open={showSuccessMessage}
          autoHideDuration={3000}
          fullWidth
          onClose={handleCloseSuccessMessage}
        >
          <Alert
            onClose={handleCloseSuccessMessage}
            severity="success"
            sx={{ width: "100%" }}
          >
            Form submitted successfully!
          </Alert>
        </Snackbar>

        {/* Snackbar for error message */}
        <Snackbar
          open={showErrorMessage}
          autoHideDuration={3000}
          onClose={handleCloseErrorMessage}
        >
          <Alert
            onClose={handleCloseErrorMessage}
            severity="error"
            sx={{ width: "100%" }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </form>
  );
};

OrganizationOnboardingForm.propTypes = {
  classes: PropTypes.object,
  theme: PropTypes.object,
  onboardingMetaData: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(
  OrganizationOnboardingForm
);
