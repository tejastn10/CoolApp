import React, { FC } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../store/store";
import { Alert } from "@material-ui/lab";
import { AlertState } from "../../store/@types/types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  topalert: {
    position: "fixed",
    width: "90%",
    left: "5%",
  },
}));

export const AlertComponent: FC = () => {
  const classes = useStyles();
  const alertState = useSelector<ApplicationState, AlertState>(
    (s) => s.alertState
  );

  return (
    <div>
      {alertState.alerts !== null &&
        alertState.alerts.length > 0 &&
        alertState.alerts.map((alert: any) => (
          <div key={alert.id}>
            <Alert className={classes.topalert} severity={alert.alertType}>
              {alert.msg}
            </Alert>
          </div>
        ))}
    </div>
  );
};
