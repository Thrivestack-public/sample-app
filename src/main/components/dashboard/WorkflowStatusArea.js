import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
// import CancelIcon from "@mui/icons-material/Cancel";
import useMediaQuery from "@mui/material/useMediaQuery";
import { withTheme } from "@mui/styles";
import useWidth from "../../../shared/functions/useWidth";
import CheckCircle from "@mui/icons-material/CheckCircle";
import WorkflowStatusCard from "./WorkflowStatusCard";
import calculateSpacing from "./calculateSpacing";

const iconSize = 30;

function WorkflowStatusArea(props) {
  const { theme } = props;
  const width = useWidth();
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));
  const [userData, setUserData] = useState({});
  const userMetaDataStr = localStorage.getItem("userMetaData");
  // const userMetaData = userMetaDataStr ? JSON.parse(userMetaDataStr) : {};

  const userMetaData = {
    userId: "1234",
    workflowId: "648b79b3-2d7b-4baf-81b6-c52215f52349",
  };

  const getUserData = async () => {
    const res = await fetch(
      `https://gekzy1vnk3.execute-api.us-east-1.amazonaws.com/default/saasbox-dev-thrivestack-lambda-function-ef05c78b?userId=${userMetaData.userId}&workflowId=${userMetaData.workflowId}`
    )
      .then((res) => res.json())
      .catch((error) => {
        console.log("something went wrong");
      });

    console.log("response res", res);
    setUserData(res.data);
  };
  useEffect(() => {
    if (userMetaData.userId && userMetaData.workflowId) {
      console.log("hellooo");
      getUserData();
    }
  }, []);

  const data = [
    {
      color: "#00C853",
      icon: <CheckCircle style={{ fontSize: iconSize }} />,
      step: "Onboarding",
      status: "done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: {
        key1: "value1",
        key2: "value2",
        key3: {
          key4: "value4",
        },
      },
    },
    {
      color: "#00C853",
      icon: <CheckCircle style={{ fontSize: iconSize }} />,
      step: "User Enrichment",
      status: "done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: {
        key1: "value1",
        key2: "value2",
        key3: {
          key4: "value4",
        },
      },
    },
    {
      color: "#00C853",
      icon: <CheckCircle style={{ fontSize: iconSize }} />,
      step: "Associate App Role",
      status: "done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: {
        key1: "value1",
        key2: "value2",
        key3: {
          key4: "value4",
        },
      },
    },
    {
      color: "#00C853",
      icon: <CheckCircle style={{ fontSize: iconSize }} />,
      step: "Associate App Pricing",
      status: "done",
      text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
      data: {
        key1: "value1",
        key2: "value2",
        key3: {
          key4: "value4",
        },
      },
    },
  ];

  return (
    <div>
      <div className="container-fluid">
        <Typography variant="h4" align="center" className="lg-mg-bottom">
          User Details
        </Typography>
        <div className="container-fluid">
          <Grid container spacing={calculateSpacing(width, theme)}>
            {data.map((element) => (
              <Grid
                item
                xs={6}
                md={4}
                data-aos="zoom-in-up"
                data-aos-delay={
                  (isWidthUpMd ? element.mdDelay : element.smDelay) || "0"
                }
                key={element.headline}
              >
                <WorkflowStatusCard
                  Icon={element.icon}
                  color={element.color}
                  headline={element.step}
                  text={element.text}
                  status={element.status}
                  data={element.data}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
}

WorkflowStatusArea.propTypes = {};

export default withTheme(WorkflowStatusArea);
