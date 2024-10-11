import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function Navigation() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" className="bg-[#003dff]">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OpenFaktura
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
