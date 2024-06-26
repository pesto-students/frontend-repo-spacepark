import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import { useUser } from "../../context/userContext";
import { getParkingSpacesData } from "../../helpers/getUserData";
import "./ParkingSpacesTable.scss";

const columns = [
  { id: "serial", label: "S.No.", minWidth: 50 },
  { id: "userId", label: "User ID", minWidth: 100 },
  { id: "serviceId", label: "Service ID", minWidth: 100 },
  { id: "location", label: "Location", minWidth: 150 },
  { id: "latitude", label: "Latitude", minWidth: 80 },
  { id: "longitude", label: "Longitude", minWidth: 80 },
  { id: "noOfSpaces", label: "No. of Spaces", minWidth: 100 },
  { id: "edit", label: "Edit", minWidth: 100, align: "center" },
];

function createData(
  serial,
  id,
  userId,
  serviceId,
  location,
  latitude,
  longitude,
  noOfSpaces
) {
  return {
    serial,
    id,
    userId,
    serviceId,
    location,
    latitude,
    longitude,
    noOfSpaces,
  };
}

export default function ParkingSpacesTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const data = await getParkingSpacesData(user.id);
        if (Array.isArray(data)) {
          setRows(
            data.map((space, index) =>
              createData(
                index + 1,
                space.id,
                space.userId,
                space.serviceId,
                space.location,
                space.latitude,
                space.longitude,
                space.noOfSpaces
              )
            )
          );
        } else {
          console.error("Data is not an array:", data);
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden" }}
      className="parking-spaces-table"
    >
      <TableContainer sx={{ height: "80vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <div className="head-row">
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    className="table-header"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </div>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  className="table-row"
                >
                  {columns.map((column) => {
                    if (column.id === "edit") {
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className="table-cell"
                        >
                          <Button
                            variant="contained"
                            className="edit-button"
                            onClick={() => navigate(`/parkingSpaces/${row.id}`)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      );
                    } else {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className="table-cell"
                        >
                          {value}
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="table-pagination"
      />
    </Paper>
  );
}
