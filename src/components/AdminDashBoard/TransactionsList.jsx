import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';

const columns = [
  { id: 'serial', label: 'S.No', minWidth: 50 },
  { id: 'id', label: 'Id', minWidth: 100 },
  { id: 'userId', label: 'User Id', minWidth: 150 },
  { id: 'orderId', label: 'Order Id', minWidth: 150 },
  { id: 'price', label: 'Price', minWidth: 100, align: 'right', format: (value) => value.toLocaleString('en-US', { style: 'currency', currency: 'INR' }) },
  { id: 'status', label: 'Status', minWidth: 150 },
];

function createData(id, userId, orderId, price, status) {
  return { id, userId, orderId, price, status };
}

export default function TransactionsList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/payment/listpayment`); // Replace with your API endpoint
        const data = response.data;
        setRows(data.map((transaction) => createData(transaction.id, transaction.userId, transaction.orderID, transaction.price, transaction.status)));
      } catch (error) {
        console.error('Error fetching tickets data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ height: "80vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map((column) => {
                     if (column.id === 'serial') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {(page * rowsPerPage) + index + 1}
                        </TableCell>
                      );
                    } else {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
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
      />
    </Paper>
  );
}
