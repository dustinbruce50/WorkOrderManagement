import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
} from "@mui/material";
import axios from "axios";

const NewWorkOrder = ({ open, handleClose }) => {
  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [costCenter, setCostCenter] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newWorkOrder = {
      priority: parseInt(priority),
      title,
      description,
      costCenter: parseInt(costCenter),
      status,
      created: new Date(),
      completed: null,
    };

    try {
      await axios.post(
        "https://localhost:5203/api/workorders/create",
        newWorkOrder
      );
      console.log("seemed succesful");
      console.log("WorkOrder", newWorkOrder);
      handleClose();
    } catch (e) {
      console.log("Error submitting work order", e);
    }
  };

  const handlePriorityChange = (e) => {
    const value = e.target.value;
    if (value >= 1 && value <= 4) {
      setPriority(value);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialogue-title">
          Create New Work Order
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Priority"
              value={priority}
              onChange={handlePriorityChange}
              fullWidth
              margin="normal"
              required
              type="number"
              InputProps={{ inputProps: { min: 1, max: 4 } }}
              placeholder="Must be a number between 1 and 4"
            />
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Cost center"
              value={costCenter}
              onChange={(e) => setCostCenter(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <DialogActions>
              <Button onClick={handleClose} color="Primary">
                Cancel{" "}
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit Work Order
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewWorkOrder;
