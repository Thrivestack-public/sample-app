import React, { memo, useCallback, useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "@mui/styles/withStyles";
import Routing from "./Routing";
import smoothScrollTop from "../../shared/functions/smoothScrollTop";
import NavBar from "../../onboarding/components/navigation/NavBar";

const styles = (theme) => ({
  main: {
    // marginLeft: theme.spacing(9),
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
    },
  },
});

function Main(props) {
  const { classes } = props;
  const [selectedTab, setSelectedTab] = useState(null);

  // const [loading, setIsLoading] = useState(true);
  // const [userDetails, setUserDetails] = useState();
  // const [userData, setUserData] = useState(null);
  // const [sqsMessages, setSqsMessages] = useState([]);

  return (
    <Fragment>
      <NavBar selectedTab={selectedTab} />
      <main className={classNames(classes.main)}>
        <Routing />
      </main>
    </Fragment>
  );
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(memo(Main));
