import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const EditWorkOrder = ({ open, handleClose, workOrder }) => {
  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [costCenter, setCostCenter] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (workOrder != null) {
      setPriority(workOrder.priority);
      setTitle(workOrder.title);
      setDescription(workOrder.description);
      setCostCenter(workOrder.costCenter);
      setStatus(workOrder.status);
    }
  }, [workOrder]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const EditWorkOrder = {
      id: workOrder.id,
      priority: parseInt(priority),
      title,
      description,
      costCenter: parseInt(costCenter),
      status,
      created: workOrder.created,
      completed: workOrder.completed,
    };

    try {
      await axios.put(
        `https://localhost:5203/api/workorders/edit/${workOrder.id}`,
        EditWorkOrder
      );
      console.log("seemed succesful");
      console.log("WorkOrder", EditWorkOrder);
    } catch (e) {
      console.log("Error submitting work order", e);
    }
    handleClose();
  };

  const handlePriorityChange = (e) => {
    const value = e.target.value;
    if (value >= 1 && value <= 4) {
      setPriority(value);
    }
  };

  const handleMarkComplete = async (e) => {
    e.preventDefault();
    const completedDT = new Date().toISOString();
    const EditWorkOrder = {
      id: workOrder.id,
      priority: parseInt(priority),
      title,
      description,
      costCenter: parseInt(costCenter),
      status,
      created: workOrder.created,
      completed: completedDT,
    };
    console.log("Look at this dateTime", completedDT);

    try {
      await axios.put(
        `https://localhost:5203/api/workorders/edit/${workOrder.id}`,
        EditWorkOrder
      );
      console.log("seemed succesful");
      console.log("WorkOrder", EditWorkOrder);
    } catch (e) {
      console.log("Error submitting work order", e);
    }
    handleClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialogue-title">Update Work Order</DialogTitle>
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
              <Box display="flex" justifyContent="space-between" width="100%">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleMarkComplete}
                >
                  Mark Completed
                </Button>
                <Box display="flex" gap={1}>
                  <Button onClick={handleClose} color="Primary">
                    Cancel{" "}
                  </Button>
                  <Button type="submit" variant="contained" color="primary">
                    Save
                  </Button>
                </Box>
              </Box>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditWorkOrder;
