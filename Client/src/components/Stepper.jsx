import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

export default function HorizontalStepper({ steps, step, onClick }) {
  return (
    <Box sx={{ width: "100%", paddingTop: "10px" }}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label, i) => (
          <Step key={i}>
            <StepLabel onClick={() => onClick(label.id)}>
              {label.text}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
