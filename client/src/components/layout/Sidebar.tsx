import React, { FC } from "react";
import { Layout } from "antd";
import styled from "styled-components";

const { Sider } = Layout;

const StyledSider = styled(Sider)`
  background: #adadad;
  min-height: 92vh;
  min-width: 20vw;
`;

export const Sidebar: FC = () => <StyledSider>Sidebar</StyledSider>;
