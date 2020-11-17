import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { profileRequest } from "../../../store/actions/actions";

export const Dashboard: FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(profileRequest());
  }, [dispatch]);

  return <div>Dashboard</div>;
};
