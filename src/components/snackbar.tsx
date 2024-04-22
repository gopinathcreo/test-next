import Button from "@mui/material/Button";
import MUISnackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";

type SnackBarProps = {
  action: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
};

export default function Snackbar({ action, isOpen, onClose }: SnackBarProps) {
  return (
    <div>
      <MUISnackbar
        open={isOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={4000}
        onClose={onClose}
        style={{ zIndex: "10000" }}
        action={action}
      />
    </div>
  );
}
