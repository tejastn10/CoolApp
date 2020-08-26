import React, { FC } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";

export const Routes: FC = () => (
  <div>
    <Navbar />
    <Sidebar />
    Content
  </div>
);
