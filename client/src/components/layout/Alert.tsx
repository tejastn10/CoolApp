import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../../store/store";
import { Alert } from "@material-ui/lab";
import { AlertState } from "../../store/@types/types";
import { makeStyles } from "@material-ui/core/styles";
import { removeAlert } from "../../store/actions/actions";

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

  const dispatch = useDispatch();

  const close = (alert: any) => {
    setTimeout(() => {
      dispatch(removeAlert(alert));
    }, 5000);
  };

  return (
    <div>
      {alertState.alerts !== null &&
        alertState.alerts.length > 0 &&
        alertState.alerts.map((alert: any) => (
          <div key={alert.id}>
            <Alert className={classes.topalert} severity={alert.alertType}>
              {alert.msg}
              {/* TODO: Change code */}
              {close(alert)} 
            </Alert>
          </div>
        ))}
    </div>
  );
};
