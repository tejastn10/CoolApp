import React, { FC } from "react";
import { Layout } from "antd";
import { Navbar } from "../components/layout/Navbar";
import { Sidebar } from "../components/layout/Sidebar";

const { Content } = Layout;

export const Routes: FC = () => (
  <Layout>
    <Navbar />
    <Layout>
      <Sidebar />
      <Content>Content</Content>
    </Layout>
  </Layout>
);
