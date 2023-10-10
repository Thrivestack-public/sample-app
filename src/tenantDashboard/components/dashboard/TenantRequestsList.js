import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { withTheme } from "@mui/styles";
import AWS from "aws-sdk";
import useWidth from "../../../shared/functions/useWidth";
import calculateSpacing from "./calculateSpacing";

function TenantRequestsList(props) {
  const { theme } = props;
  const width = useWidth();
  const pastData =
    JSON.parse(localStorage.getItem("tenantCreationRequests")) || [];
  const [tenantCreationRequests, setTenantCreationRequests] =
    useState(pastData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem(
      "tenantCreationRequests",
      JSON.stringify(tenantCreationRequests)
    );
  }, [tenantCreationRequests]);

  // Read AWS credentials for the source queue from environment variables
  const sourceQueueConfig = {
    accessKeyId: process.env.REACT_APP_SOURCE_QUEUE_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SOURCE_QUEUE_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_SOURCE_QUEUE_AWS_REGION,
    sourceQueueUrl: process.env.REACT_APP_SOURCE_QUEUE_URL,
  };

  // Read AWS credentials for the destination queue from environment variables
  const destinationQueueConfig = {
    accessKeyId: process.env.REACT_APP_DESTINATION_QUEUE_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_DESTINATION_QUEUE_SECRET_ACCESS_KEY,
    region: process.env.REACT_APP_DESTINATION_QUEUE_AWS_REGION,
    destinationQueueUrl: process.env.REACT_APP_DESTINATION_QUEUE_URL,
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const processMessageAndSendToDestination = async (message) => {
    // Assuming the message is in JSON format
    // const dataObject = JSON.parse(message?.Body);
    const dataObject = message;

    // Extract runtimeId and workflowId from the source message
    // const { runtimeWorkflowId, workflowId } = dataObject;

    const destinationSqs = new AWS.SQS(destinationQueueConfig);

    // Add additional properties to the new message for the destination queue
    const num = getRandomInt(100);
    const newMessage = {
      runtimeWorkflowId: dataObject.runtimeWorkflowId,
      workflowId: dataObject.workflowId,
      tenantName: "newTenant" + num,
      tenantId: "newTenantId" + num,
    };

    const sendMessageParams = {
      QueueUrl: destinationQueueConfig.destinationQueueUrl,
      MessageBody: JSON.stringify(newMessage),
    };

    try {
      await destinationSqs.sendMessage(sendMessageParams).promise();
      setTenantCreationRequests((prev) =>
        prev.filter(
          (item) =>
            item.workflowId !== message.workflowId &&
            item.runtimeWorkflowId !== message.runtimeWorkflowId
        )
      );
    } catch (err) {}
  };

  const receiveAndProcessMessage = async () => {
    const sourceSqs = new AWS.SQS(sourceQueueConfig);

    try {
      const receiveMessageParams = {
        QueueUrl: sourceQueueConfig.sourceQueueUrl,
        MaxNumberOfMessages: 1,
        WaitTimeSeconds: 20, // Long polling for new messages
      };

      const data = await sourceSqs
        .receiveMessage(receiveMessageParams)
        .promise();

      if (data.Messages) {
        const message = data.Messages[0];

        //load message and parse its body and save
        const jsonres = JSON.parse(message.Body);
        setTenantCreationRequests((prev) => [...prev, jsonres]);

        // Delete the received message from the source queue after processing
        await sourceSqs
          .deleteMessage({
            QueueUrl: sourceQueueConfig.sourceQueueUrl,
            ReceiptHandle: message.ReceiptHandle,
          })
          .promise();
      }

      // Continue listening for new messages recursively
      receiveAndProcessMessage();
    } catch (err) {
      // Retry on error
      receiveAndProcessMessage();
    }
  };

  useEffect(() => {
    // Start processing messages from the source queue when the component mounts
    receiveAndProcessMessage();
  }, []);

  const onTenantRequestAccepted = async (message) => {
    try {
      setLoading(true);
      await processMessageAndSendToDestination(message);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onTenantRequestIgnore = (message) => {
    setTenantCreationRequests((prev) =>
      prev.filter(
        (item) =>
          item.workflowId === message.workflowId &&
          item.runtimeWorkflowId === message.runtimeWorkflowId
      )
    );
  };

  return (
    <div>
      <div className="container-fluid">
        <Box mb={4} mt={12} textAlign={"center"}>
          <img src="/favicon-192x192.png" alt="icon" height={100} width={100} />
          <Typography
            fontSize={["20px", "28px", "36px"]}
            fontWeight={600}
            mb={2}
          >
            Welcome to SaaSBox Tenant Dashboard
          </Typography>
          <Typography variant="p" fontSize={["12px", "14px", "16px"]}>
            This is the application tenant dashboard page of the SaaSBox -
            designed to show how tenant requests are working.
          </Typography>

          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            flexDirection={"column"}
            mt={4}
          >
            <Typography fontSize={["16px", "20px"]} fontWeight={500} mb={2}>
              Tenant Requests
            </Typography>
            <Grid container spacing={calculateSpacing(width, theme)}>
              {tenantCreationRequests.map((element) => (
                <Grid
                  item
                  xs={12}
                  data-aos="zoom-in-up"
                  alignContent={"center"}
                  justifyItems={"center"}
                >
                  <Box
                    display={"flex"}
                    width="100%"
                    justifyContent="space-between"
                    alignItems={"center"}
                    flexDirection={"column"}
                    gap={1}
                    p={2}
                    sx={{ border: "1px solid #aaa", borderRadius: 2 }}
                  >
                    <Typography variant="body1" paragraph>
                      RuntimeId: {element.runtimeWorkflowId}
                    </Typography>
                    <Typography variant="body1" paragraph>
                      WorkflowId: {element.workflowId}
                    </Typography>
                    <Box
                      display={"flex"}
                      justifyContent="space-between"
                      alignItems={"center"}
                      gap={2}
                    >
                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={loading}
                        onClick={() => onTenantRequestAccepted(element)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        fullWidth
                        disabled={loading}
                        onClick={() => onTenantRequestIgnore(element)}
                      >
                        Ignore
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </div>
    </div>
  );
}

TenantRequestsList.propTypes = {};

export default withTheme(TenantRequestsList);
