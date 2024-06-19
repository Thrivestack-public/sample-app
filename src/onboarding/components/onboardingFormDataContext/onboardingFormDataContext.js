import React, { createContext, useContext, useEffect, useState } from "react";

const onboardingFormDataContext = createContext({});

export const OnboardingFormDataContextProvider = ({ children }) => {
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

  const [metadata, setMetadata] = useState({
    userId: "",
    workflowId: "",
    runtimeId: "",
    returnUrl: "",
    env: "",
  });

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <onboardingFormDataContext.Provider
      value={{
        formData,
        setFormData,
        resetForm,
        onboardingMetaData: metadata,
        setMetadata,
      }}
    >
      {children}
    </onboardingFormDataContext.Provider>
  );
};

export const useOnboardingFormData = () =>
  useContext(onboardingFormDataContext);
