import React from "react";
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
          key4: "value4"
        }
      }
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
          key4: "value4"
        }
      }
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
          key4: "value4"
        }
      }
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
          key4: "value4"
        }
      }
    },
  ];

  return (
    <div>
      <div className="container-fluid">
        <Typography variant="h3" align="center" className="lg-mg-bottom">
          Features
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
