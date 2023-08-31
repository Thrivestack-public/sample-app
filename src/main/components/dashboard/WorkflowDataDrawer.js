import React from "react";
import PropTypes from "prop-types";
import { Drawer, IconButton, Toolbar, Divider, Typography, Box } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import CloseIcon from "@mui/icons-material/Close";
import { JSONTree } from "react-json-tree";

const drawerWidth = 240;

const styles = {
  toolbar: {
    minWidth: drawerWidth
  }
};

function DataDrawer(props) {
  const { classes, onClose, open, title, data } = props;
  return (
    <Drawer anchor="right" open={open} variant="temporary" onClose={onClose} sx={{minWidth: '40%'}}>
      <Toolbar disableGutters className={classes.toolbar}>
        <Box
          pl={3}
          pr={3}
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
        >
          <Typography variant="h6">{title}</Typography>
          <IconButton
            onClick={onClose}
            color="primary"
            aria-label="Close DataDrawer"
            size="large">
            <CloseIcon />
          </IconButton>
        </Box>

      </Toolbar>
      <Divider />
      <Box p='20px'>

      <Typography variant="body1" color="textSecondary">
        Data :
      </Typography>
      
        <JSONTree data={data} />
      </Box>
    </Drawer>
  );
}

DataDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default withStyles(styles)(DataDrawer);
