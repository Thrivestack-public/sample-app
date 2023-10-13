export const textConstants = {
  ONBOARDING_PAGE_ONE_TITLE: "SaaSBox Onboarding",
  ONBOARDING_PAGE_ONE_DESCRIPTION_ONE:
    "This is the onboarding page of the SaaSBox - designed to illustrate the seamless integration of ThriveStack's workflows with your own application.",
  ONBOARDING_PAGE_ONE_DESCRIPTION_TWO:
    "Behind the scene ThriveStack has already completed the following steps -",

  ONBOARDING_PAGE_TWO_TITLE: "SaaSBox Onboarding",
  ONBOARDING_PAGE_TWO_DESCRIPTION_ONE:
    "This is the onboarding page of the SaaSBox - designed to illustrate the seamless integration of ThriveStack's workflows with your own application.",
  ONBOARDING_PAGE_TWO_DESCRIPTION_TWO:
    "Once you submit ThriveStack will proceed to complete the following steps -",
  ONBOARDING_PAGE_TWO_LIST_ITEM_ONE: "Enrichment",
  ONBOARDING_PAGE_TWO_LIST_ITEM_TWO: "Associate App Role",
  ONBOARDING_PAGE_TWO_LIST_ITEM_THREE: "Associate App Pricing",
  ONBOARDING_PAGE_TWO_LIST_ITEM_FOUR: "Tenant Creation Request",

  ONBOARDING_PAGE_TWO_SUCCESS_TITLE:
    "Congratulations! EndUser has successfully finished the onboarding process!",
  ONBOARDING_PAGE_TWO_SUCCESS_DESC_ONE:
    "Upon the successful completion of onboarding by the end user, they will be automatically redirected to the return URL. This redirection allows ThriveStack to proceed with the subsequent steps in the signup workflow.",
  ONBOARDING_PAGE_TWO_SUCCESS_DESC_TWO: "Wait! You will be redirected soon!",
  ONBOARDING_PAGE_TWO_SUCCESS_RETURN_URL: "Return Url is as following -",

  HOME_PAGE_TITLE: "Welcome to SaaSBox Application Home",
  HOME_PAGE_DESC_ONE:
    "This is the application home page of the SaaSBox - designed to illustrate the seamless integration of ThriveStack's workflows with your own application.",
  HOME_PAGE_DESC_TWO:
    "Once the end user arrives on this page, all the necessary steps will have been executed, and we will have gathered and stored the data throughout the entire process, allowing you to access and view it.",
  HOME_PAGE_DATA_CARD_TITLE: "User Data",
  HOME_PAGE_DATA_CARD_TEXT:
    "All user data collected during signup will be displayed here.",

  TENANT_LIST_PAGE_TITLE: "Welcome to SaaSBox Tenant Dashboard",
  TENANT_LIST_PAGE_DESC:
    "This is the application tenant dashboard page of the SaaSBox - designed to show how tenant requests are working.",
};

export const signupStepsData = [
  {
    step: "1. Authentication Token",
    text: "Thrivestack has done authentication through your authentication provider and securely stored the authentication token in cookies at the domain level.",
  },
  {
    step: "2. User Surge Check",
    text: "ThriveStack has reviewed the user limit that you configured within the waitlist user node settings.",
  },
  {
    step: "3. Onboarding",
    text: "Upon completing the user surge check, ThriveStack guided the end user to initiate the Saasbox onboarding process via the redirect URL configured by SaasBox (SaasBuilder) in the onboarding node settings in the workflow builder. After successfully onboarding the end user, Saasbox subsequently directs them back to the designated returnUrl.",
  },
  {
    step: "4. User Enrichment",
    text: "ThriveStack subsequently performed data enrichment based on the enrichment fields configured by SaasBox (SaasBuilder) within the enrichment node settings, enhancing the user's information. The enriched data is then securely stored within the SaasBox CRM.",
  },
  {
    step: "5. Associate Role and Pricing",
    text: "ThriveStack has also allocated a default role and pricing based on the settings defined by SaasBox (SaasBuilder) in the Associate App Role and Associate App Pricing configurations.",
  },
  {
    step: "6. Tenant Surge Check",
    text: "ThriveStack has also checked the tenant limit that you configured within the waitlist user node settings.",
  },
  {
    step: "7. Tenant Creation and Acknowledgement",
    text: "ThriveStack initiated a tenant creation request, retrieved the tenant information from the tenant acknowledgment queue, and securely stored it for further processing.",
  },
  {
    step: "8. Notify End User",
    text: "In the signup workflow, ThriveStack also communicated the successful account creation to the user through the email service provider specified in the Notify Node settings.",
  },
  {
    step: "9. Redirect End User",
    text: "Towards the end, ThriveStack directed the user to the Saasbox application, specifically to the redirect URL configured by SaasBuilder within the Redirect Node settings of the signup workflow.",
  },
];

export const onboardingPageOneStepsData = [
  {
    step: "1. Authentication Token",
    status: "done",
    text: "Thrivestack has done authentication through your authentication provider and securely stored the authentication token in cookies at the domain level.",
  },
  {
    step: "2. User Surge Check",
    status: "done",
    text: "ThriveStack has reviewed the user limit that you configured within the waitlist user node settings.",
  },
];
