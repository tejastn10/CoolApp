import React, { FC } from "react";
import { Grid } from "@material-ui/core";

import { Navbar } from "../components/layout/Navbar";

export const Routes: FC = () => (
  <Grid container direction="column">
    <Grid item>
      <Navbar />
    </Grid>
    <Grid item container>
      Content
    </Grid>
  </Grid>
);
