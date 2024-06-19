import React, { memo } from "react";
import { Switch } from "react-router-dom";
import PropsRoute from "../../shared/components/PropsRoute";
import useLocationBlocker from "../../shared/functions/useLocationBlocker";
import OnboardingPageOne from "./onboardingPageOne/OnboardingPageOne";
import OnboardingPageTwo from "./onboardingPageTwo/OnboardingPageTwo";

function Routing(props) {
  useLocationBlocker();
  return (
    <Switch>
      <PropsRoute path="/onboarding/pageTwo" component={OnboardingPageTwo} />
      <PropsRoute path="/" component={OnboardingPageOne} />
    </Switch>
  );
}

Routing.propTypes = {};

export default memo(Routing);
