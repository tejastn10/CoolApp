import React, { FC } from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";

export const Navbar: FC = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">∘ ○ 〇 Meet and Greet 〇 ○ ∘</Typography>
    </Toolbar>
  </AppBar>
);
