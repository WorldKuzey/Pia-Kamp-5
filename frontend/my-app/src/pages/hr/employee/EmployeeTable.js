// src/pages/hr/employee/EmployeeTable.js

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Collapse,
  Typography,
  Box,
} from "@mui/material";

const EmployeeTable = ({ employees, fetchEmployees }) => {
  const [openRow, setOpenRow] = useState(null);

  const handleDelete = async (id) => {
    const confirm = window.confirm("Bu çalışanı silmek istiyor musunuz?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/employees/delete/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchEmployees();
      } else {
        console.error("Silme başarısız");
      }
    } catch (err) {
      console.error("Silme hatası:", err);
    }
  };

  const toggleDetails = (id) => {
    setOpenRow((prev) => (prev === id ? null : id));
  };

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Ad</strong>
            </TableCell>
            <TableCell>
              <strong>Email</strong>
            </TableCell>
            <TableCell>
              <strong>Rol</strong>
            </TableCell>
            <TableCell>
              <strong>İşlem</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((emp) => {
            const id = emp.id || emp._id;
            return (
              <React.Fragment key={id}>
                <TableRow>
                  <TableCell>{emp.firstName || "-"}</TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.role}</TableCell>
                  <TableCell>
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      onClick={() => toggleDetails(id)}
                    >
                      {openRow === id ? "Gizle" : "Detay"}
                    </Button>
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={4}
                  >
                    <Collapse in={openRow === id} timeout="auto" unmountOnExit>
                      <Box margin={2}>
                        <Typography variant="subtitle2" gutterBottom>
                          Detaylar:
                        </Typography>
                        <Typography variant="body2">
                          <strong>Departman:</strong> {emp.department || "-"}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Ünvan:</strong> {emp.title || "-"}
                        </Typography>
                        <Typography variant="body2">
                          <strong>Telefon:</strong> {emp.phone || "-"}
                        </Typography>
                        <Button
                          variant="contained"
                          color="error"
                          size="small"
                          sx={{ mt: 1 }}
                          onClick={() => handleDelete(id)}
                        >
                          Sil
                        </Button>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;
