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
} from "@mui/material";
import { withStyles } from "@mui/styles";
import { useHistory } from "react-router-dom";

const styles = (theme) => ({
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

const OrganizationOnboardingForm = (props) => {
  const { classes, onboardingMetaData } = props;
  const initialFormData = {
    orgName: "",
    orgType: "",
    industry: "",
    employeeCount: "",
    website: "",
    contactName: "",
    contactEmail: "",
    phone: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleNavigation = () => {
    history.push("/onboarding/pageTwo");
  };

  const handleCloseErrorMessage = () => {
    setShowErrorMessage(false);
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
    // e.preventDefault();
    // setLoading(true);
    // if (validateForm()) {
    console.log(formData);
    handleNavigation();
    // }
    // setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box className={classes.formContainer}>
        <TextField
          label="Organization Name"
          name="orgName"
          value={formData.orgName}
          onChange={handleInputChange}
          error={!!errors.orgName}
          helperText={errors.orgName}
          required
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Organization Type *</InputLabel>
          <Select
            label="Organization Type"
            name="orgType"
            value={formData.orgType}
            onChange={handleInputChange}
            error={!!errors.orgType}
            fullWidth
          >
            <MenuItem value="corporation">Corporation</MenuItem>
            <MenuItem value="startup">Startup</MenuItem>
            <MenuItem value="nonprofit">Nonprofit</MenuItem>
            <MenuItem value="government">Government</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel>Industry *</InputLabel>
          <Select
            label="Industry"
            name="industry"
            value={formData.industry}
            onChange={handleInputChange}
            error={!!errors.industry}
            fullWidth
          >
            <MenuItem value="it">Information Technology</MenuItem>
            <MenuItem value="healthcare">Healthcare</MenuItem>
            <MenuItem value="finance">Finance</MenuItem>
            <MenuItem value="education">Education</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Number of Employees"
          name="employeeCount"
          type="number"
          value={formData.employeeCount}
          onChange={handleInputChange}
          error={!!errors.employeeCount}
          helperText={errors.employeeCount}
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          loading={loading}
        >
          Next
        </Button>

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
