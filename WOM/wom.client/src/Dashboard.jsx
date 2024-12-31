import React from "react";
import { useEffect, useState, onClick } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TableContainer,
  Button,
  TableSortLabel,
  Box,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NewWorkOrder from "./NewWorkOrder";
import axios from "axios";
import EditWorkOrder from "./EditWorkOrder";

const Dashboard = () => {
  const [openNew, setOpenNew] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [workOrders, setWorkOrders] = useState([]);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [searchQuery, setSearchQuery] = useState("");
  const [showActive, setShowActive] = useState(true);

  const fetchWorkOrders = async () => {
    try {
      const response = await axios.get(
        "https://localhost:5203/api/workorders/getall"
      );
      console.log("Fetch Complete");
      console.log(response);
      setWorkOrders(response.data);
    } catch (e) {
      console.log("fetch went wrong", e);
    }
  };

  useEffect(() => {
    fetchWorkOrders();
    console.log("Work Orders", workOrders);
  }, []);

  const handleOpenNewForm = () => {
    setOpenNew(true);
  };

  const handleCloseNewForm = () => {
    setOpenNew(false);
    fetchWorkOrders();
  };

  const handleOpenEditForm = (workOrder) => {
    setSelectedWorkOrder(workOrder);
    setOpenEdit(true);
  };

  const handleCloseEditForm = () => {
    setOpenEdit(false);
    setSelectedWorkOrder(null);
    fetchWorkOrders();
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const filteredWorkOrders = workOrders.filter((workOrder) =>
    Object.values(workOrder).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedWorkOrders = filteredWorkOrders
    .filter((workOrder) => (showActive ? !workOrder.completed : workOrder.completed))
    .slice()
    .sort((a, b) => {
      if (orderBy === "created" || orderBy === "completed") {
        return (
          (order === "asc" ? 1 : -1) *
          (new Date(a[orderBy]) - new Date(b[orderBy]))
        );
      }
      if (a[orderBy] < b[orderBy]) return order === "asc" ? -1 : 1;
      if (a[orderBy] > b[orderBy]) return order === "asc" ? 1 : -1;
      return 0;
  });

  const handlSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <Container sx={{ mt: 0 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Button color='inherit' onClick={() => setShowActive(true)}>Active WorkOrders</Button>
            <Button color='inherit' onClick={()=> setShowActive(false)}>Show Completed Work Orders</Button>
          </Toolbar>
        </AppBar>
        <Typography variant="" gutterbottom="true">
          <h4>Work Order Dashboard</h4>
        </Typography>
        <TableContainer component={Paper} elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "id"}
                    direction={orderBy === "id" ? order : "asc"}
                    onClick={() => handleRequestSort("id")}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "priority"}
                    direction={orderBy === "priority" ? order : "asc"}
                    onClick={() => handleRequestSort("priority")}
                  >
                    Priority
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "costCenter"}
                    direction={orderBy === "costCenter" ? order : "asc"}
                    onClick={() => handleRequestSort("costCenter")}
                  >
                    Cost Center
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={orderBy === "title" ? order : "asc"}
                    onClick={() => handleRequestSort("title")}
                  >
                    Title
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "description"}
                    direction={orderBy === "description" ? order : "asc"}
                    onClick={() => handleRequestSort("description")}
                  >
                    Description
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "status"}
                    direction={orderBy === "status" ? order : "asc"}
                    onClick={() => handleRequestSort("status")}
                  >
                    Status
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "created"}
                    direction={orderBy === "created" ? order : "asc"}
                    onClick={() => handleRequestSort("created")}
                  >
                    Created
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel
                    active={orderBy === "completed"}
                    direction={orderBy === "completed" ? order : "asc"}
                    onClick={() => handleRequestSort("completed")}
                  >
                    Completed
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedWorkOrders.map((workOrder) => (
                <TableRow
                  key={workOrder.id}
                  onClick={() => handleOpenEditForm(workOrder)}
                >
                  <TableCell>{workOrder.id}</TableCell>
                  <TableCell>{workOrder.priority}</TableCell>
                  <TableCell>{workOrder.costCenter}</TableCell>
                  <TableCell>{workOrder.title}</TableCell>
                  <TableCell>{workOrder.description}</TableCell>
                  <TableCell>{workOrder.Status}</TableCell>
                  <TableCell>
                    {new Date(workOrder.created).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {workOrder.completed
                      ? new Date(workOrder.completed).toLocaleString()
                      : "N/A"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
        </TableContainer>
        
      </Container>
      <Container>
      <Box display="flex" justifyContent="flext-start" mt={2}>
            <TextField
              label="Search"
              value={searchQuery}
              onChange={handlSearchChange}
              variant="outlined"
              size="small"
              sx={{backgroundColor: 'white'}}
            />
          </Box>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpenNewForm}
          sx={{mt:-10}}
        >
          Add New Work Order
        </Button>
        <NewWorkOrder open={openNew} handleClose={handleCloseNewForm} />
        <EditWorkOrder
          open={openEdit}
          handleClose={handleCloseEditForm}
          workOrder={selectedWorkOrder}
        />
      </Container>
    </>
  );
};

export default Dashboard;
