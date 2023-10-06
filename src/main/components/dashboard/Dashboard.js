import React, { Fragment } from "react";
import { Box, Typography } from "@mui/material";

function Dashboard(props) {
  return (
    <Fragment>
      <Box mb={4} textAlign={"center"}>
        <img src="/favicon-192x192.png" alt="icon" height={100} width={100} />
        <Typography fontSize={["20px", "28px", "36px"]} fontWeight={600} mb={2}>
          Welcome to SaaSBox Application Home
        </Typography>
        <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
          This is the application home page of the SaaSBox - designed to
          illustrate the seamless integration of <br /> ThriveStack's workflows
          with your own application.
        </Typography>
        <Box mt={4} maxWidth={"600px"} marginX={"auto"}>
          <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
            Once the end user arrives on this page, all the necessary steps will
            have been executed, and we will have gathered and stored the data
            throughout the entire process, allowing you to access and view it.
          </Typography>
        </Box>
      </Box>
    </Fragment>
  );
}

Dashboard.propTypes = {};

export default Dashboard;
