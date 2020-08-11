import React, { FC } from "react";
import { Layout } from "antd";
import styled from "styled-components";

const { Header } = Layout;

const StyledHeader = styled(Header)`
  background: #1f1f1f;
  color: #fff;
  min-height: 8vh;
`;

export const Navbar: FC = () => <StyledHeader>Navbar</StyledHeader>;
