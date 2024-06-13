import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function ServicesTable() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/services`);
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Serial No.</TableCell>
            <TableCell>Services</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>User ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {services.map((service, index) => (
            <React.Fragment key={service.id}>
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  {Array.isArray(service.services) && service.services.length > 0 ? (
                    service.services.map((item, i) => (
                      <div key={i} className="d-flex p-2">
                        <div>{item.service + "-\t "}</div>
                        <div>{" "+item.price}</div>
                      </div>
                    ))
                  ) : (
                    <div className='p-2'>No services</div>
                  )}
                </TableCell>
                <TableCell>{service.createdAt}</TableCell>
                <TableCell>{service.updatedAt}</TableCell>
                <TableCell>{service.userId}</TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ServicesTable;
