import React, { FC, useEffect } from "react";
import { authRequest } from "../../../store/actions/actions";

export const Dashboard: FC = () => {
  useEffect(() => {
    authRequest();
  }, []);

  return <div>Dashboard</div>;
};
