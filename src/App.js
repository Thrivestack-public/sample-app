import React, { Fragment, Suspense, lazy } from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  CssBaseline,
} from "@mui/material";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import Pace from "./shared/components/Pace";

const DashboardComponent = lazy(() => import("./main/components/Main"));
const OnboardingComponent = lazy(() => import("./onboarding/components/Main"));
const TenantAdminComponent = lazy(() =>
  import("./tenantDashboard/components/Main")
);

function App() {
  return (
    <BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <Pace color={theme.palette.primary.light} />
          <Suspense fallback={<Fragment />}>
            <Switch>
              <Route path="/onboarding">
                <OnboardingComponent />
              </Route>
              <Route path="/">
                <TenantAdminComponent />
              </Route>
              {/* This will be a private route once we start getting token from redirection */}
              <Route path="/home">
                <DashboardComponent />
              </Route>
            </Switch>
          </Suspense>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
}

export default App;
