import React, { FC } from "react";
import { useSelector } from "react-redux";
import { ApplicationState } from "../../store/store";
import { Alert } from "@material-ui/lab";

export const AlertComponent: FC = () => {
  const alerts: any = useSelector<ApplicationState>((s) => s.alertState);
  if (alerts === null || alerts === undefined) {
    return <></>;
  }
  return (
    <div>
      {alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert: any) => (
          <div key={alert.id}>
            <Alert severity={alert.alertType}>{alert.msg}</Alert>
          </div>
        ))}
    </div>
  );
};
