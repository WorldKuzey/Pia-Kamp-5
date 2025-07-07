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
  Avatar,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const EmployeeTable = ({ employees, fetchEmployees }) => {
  const [openRow, setOpenRow] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  // Excel'e aktarım fonksiyonu
  const handleExportExcel = () => {
    const formattedData = employees.map((emp) => ({
      ID: emp.id || emp._id,
      Ad: emp.firstName || "-",
      Soyad: emp.lastName || "-",
      Email: emp.email || "-",
      Rol: emp.role || "-",
      Departman: emp.department || "-",
      Ünvan: emp.title || "-",
      Telefon: emp.phone || "-",
      Cinsiyet: emp.gender || "-",
      TC: emp.tc || "-",
      Maaş: emp.salary || "-",
      Adres: emp.address || "-",
      "Doğum Tarihi": emp.date_of_birth || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Çalışanlar");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "calisan_listesi.xlsx");
  };

  const updateEmployee = async (id, updatedData) => {
    try {
      const res = await fetch(`/api/employees/update_employee/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      if (!res.ok) throw new Error("Güncelleme başarısız");
      const data = await res.json();
      return data;
    } catch (error) {
      console.error("updateEmployee error:", error);
      return null;
    }
  };

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

  const handleEditOpen = (emp) => {
    setEditData(emp);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditData(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async () => {
    await updateEmployee(editData.id || editData._id, editData);
    setEditOpen(false);
    fetchEmployees();
  };

  return (
    <>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="success" onClick={handleExportExcel}>
          Excel Olarak İndir
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Fotoğraf</strong>
              </TableCell>
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
                    <TableCell>
                      <Avatar
                        src={
                          emp.imageUrl
                            ? `http://localhost:5000${emp.imageUrl}`
                            : ""
                        }
                        alt={emp.firstName}
                        sx={{ width: 40, height: 40 }}
                      />
                    </TableCell>
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
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => handleEditOpen(emp)}
                        sx={{ ml: 1 }}
                      >
                        Güncelle
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={5} style={{ padding: 0 }}>
                      <Collapse
                        in={openRow === id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box margin={2}>
                          <Typography variant="subtitle2" gutterBottom>
                            Detaylar:
                          </Typography>
                          <Stack spacing={1}>
                            <Typography variant="body2">
                              <strong>Departman:</strong>{" "}
                              {emp.department || "-"}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Ünvan:</strong> {emp.title || "-"}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Telefon:</strong> {emp.phone || "-"}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Cinsiyet:</strong> {emp.gender || "-"}
                            </Typography>
                            <Typography variant="body2">
                              <strong>TC:</strong> {emp.tc || "-"}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Maaş:</strong> {emp.salary || "-"}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Adres:</strong> {emp.address || "-"}
                            </Typography>
                            <Typography variant="body2">
                              <strong>Doğum Tarihi:</strong>{" "}
                              {emp.date_of_birth || "-"}
                            </Typography>
                            <Button
                              variant="contained"
                              color="error"
                              size="small"
                              sx={{ mt: 1, width: "100px" }}
                              onClick={() => handleDelete(id)}
                            >
                              Sil
                            </Button>
                          </Stack>
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

      <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Çalışanı Güncelle</DialogTitle>
        <DialogContent dividers>
          {editData && (
            <Stack spacing={2} mt={1}>
              <TextField
                name="firstName"
                label="İsim"
                value={editData.firstName}
                onChange={handleEditChange}
              />
              <TextField
                name="lastName"
                label="Soyisim"
                value={editData.lastName}
                onChange={handleEditChange}
              />
              <TextField
                name="email"
                label="Email"
                value={editData.email}
                onChange={handleEditChange}
              />
              <TextField
                name="phone"
                label="Telefon"
                value={editData.phone}
                onChange={handleEditChange}
              />
              <TextField
                name="department"
                label="Departman"
                value={editData.department}
                onChange={handleEditChange}
              />
              <TextField
                name="title"
                label="Ünvan"
                value={editData.title}
                onChange={handleEditChange}
              />
              <TextField
                name="salary"
                label="Maaş"
                type="number"
                value={editData.salary}
                onChange={handleEditChange}
              />
              <TextField
                name="address"
                label="Adres"
                value={editData.address}
                onChange={handleEditChange}
              />
              <TextField
                name="gender"
                label="Cinsiyet"
                select
                value={editData.gender || ""}
                onChange={handleEditChange}
              >
                <MenuItem value="MALE">Erkek</MenuItem>
                <MenuItem value="FEMALE">Kadın</MenuItem>
              </TextField>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>İptal</Button>
          <Button
            variant="contained"
            onClick={handleEditSubmit}
            color="primary"
          >
            Kaydet
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployeeTable;
