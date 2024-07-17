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

  const [currentPage, setCurrentPage] = useState(1);
  const [pageStepCounter, setPageStepCounter] = useState(1);
  const [stepCompleted, setStepCompleted] = useState(3);
  return (
    <onboardingFormDataContext.Provider
      value={{
        formData,
        setFormData,
        resetForm,
        onboardingMetaData: metadata,
        setMetadata,
        currentPage,
        setCurrentPage,
        pageStepCounter,
        setPageStepCounter,
        stepCompleted,
        setStepCompleted
      }}
    >
      {children}
    </onboardingFormDataContext.Provider>
  );
};

export const useOnboardingFormData = () =>
  useContext(onboardingFormDataContext);
