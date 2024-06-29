import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { getUsersData } from '../../helpers/getUserData';

const columns = [
  { id: 'serial', label: 'S.No', minWidth: 50 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 100 },
  { id: 'mobile', label: 'Mobile', minWidth: 170, align: 'right', format: (value) => value.toLocaleString('en-US') },
  { id: 'role', label: 'Role', minWidth: 170, align: 'right', format: (value) => value.toLocaleString('en-US') },
  { id: 'status', label: 'Status', minWidth: 170, align: 'right', format: (value) => value.toFixed(2) },
  { id: 'edit', label: 'Edit', minWidth: 100, align: 'center' },
];

function createData(id, name, email, mobile, role, status) {
  return { id, name, email, mobile, role, status };
}

export default function UserTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
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
      const data = await getUsersData();
      data && setRows(data.map(user => createData(user.id, user.username, user.email, user.mobile, user.role, user.status)));
    };

    fetchData();
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ height: "80vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow style={{fontSize: '20px', fontWeight:'bold'}}>
              {columns.map((column) => (
                <TableCell
                className='bold'
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
                    if (column.id === 'edit') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          <Button
                            variant="contained"
                            className="back-color text-bold"
                            onClick={() => navigate(`/users/${row.id}`)}
                          >
                            Edit
                          </Button>
                        </TableCell>
                      );
                    } else if (column.id === 'serial') {
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {page * rowsPerPage + index + 1}
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
