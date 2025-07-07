import React, { useEffect } from "react";
import {
  Box,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Stack,
  Button,
} from "@mui/material";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import useSeeLeaves from "./useSeeLeaves";

const statusColors = {
  APPROVED: "success",
  PENDING: "warning",
  REJECTED: "error",
};

const SeeLeavesForm = () => {
  const { leaves, fetchLeaves, changeLeaveStatus, setFilter, filter } =
    useSeeLeaves();

  const userId = localStorage.getItem("userId");

  const leaveTypeMap = {
    ANNUAL_LEAVE: "Yıllık İzin",
    SICK_LEAVE: "Hastalık İzni",
    MARRIAGE_LEAVE: "Evlilik İzni",
    FATHER_LEAVE: "Babalık İzni",
  };

  const leaveStatusMap = {
    APPROVED: "ONAYLANDI",
    PENDING: "BEKLEMEDE",
    REJECTED: "REDDEDİLDİ",
  };

  useEffect(() => {
    fetchLeaves();
  }, [filter.status]);

  const handleUpdateStatus = async (id, newStatus, approverId) => {
    await changeLeaveStatus(id, newStatus, approverId);
    await fetchLeaves();
  };

  const handleExportExcel = () => {
    const formattedData = leaves.map((leave) => ({
      "Ad Soyad": `${leave.employeeFirstName} ${leave.employeeLastName}`,
      "İzin Türü": leaveTypeMap[leave.leaveType] || leave.leaveType,
      Başlangıç: leave.startDate || "-",
      Bitiş: leave.endDate || "-",
      Gün: leave.days || "-",
      Durum: leaveStatusMap[leave.status] || leave.status,
      Açıklama: leave.reason || "-",
      Onaylayan: `${leave.approvedByFirstName || ""} ${
        leave.approvedByLastName || ""
      }`.trim(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "İzin Talepleri");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(blob, "izin_talepleri.xlsx");
  };

  return (
    <Box component={Paper} sx={{ p: 4, borderRadius: 2 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold">
          Çalışan İzinleri
        </Typography>

        <Button variant="contained" color="success" onClick={handleExportExcel}>
          Excel'e Aktar
        </Button>
      </Box>

      <Box sx={{ maxWidth: 200, mb: 3 }}>
        <TextField
          label="Durum"
          select
          fullWidth
          variant="outlined"
          size="small"
          value={filter.status}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, status: e.target.value }))
          }
        >
          <MenuItem value="">Tüm Durumlar</MenuItem>
          <MenuItem value="PENDING">Beklemede</MenuItem>
          <MenuItem value="APPROVED">Onaylandı</MenuItem>
          <MenuItem value="REJECTED">Reddedildi</MenuItem>
        </TextField>
      </Box>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Ad-Soyad</TableCell>
              <TableCell>İzin Türü</TableCell>
              <TableCell>Başlangıç</TableCell>
              <TableCell>Bitiş</TableCell>
              <TableCell>Gün</TableCell>
              <TableCell>Durum</TableCell>
              <TableCell>Açıklama</TableCell>
              <TableCell>İşlem</TableCell>
              <TableCell>Onaylayan Kişi</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>
                  {leave.employeeFirstName} {leave.employeeLastName}
                </TableCell>
                <TableCell>
                  {leaveTypeMap[leave.leaveType] || leave.leaveType}
                </TableCell>
                <TableCell>{leave.startDate || "-"}</TableCell>
                <TableCell>{leave.endDate || "-"}</TableCell>
                <TableCell>{leave.days || "-"}</TableCell>
                <TableCell>
                  <Chip
                    label={leaveStatusMap[leave.status] || leave.status}
                    color={statusColors[leave.status] || "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{leave.reason || "-"}</TableCell>
                <TableCell>
                  {leave.status === "PENDING" && (
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() =>
                          handleUpdateStatus(leave.id, "APPROVED", userId)
                        }
                      >
                        Onayla
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() =>
                          handleUpdateStatus(leave.id, "REJECTED", userId)
                        }
                      >
                        Reddet
                      </Button>
                    </Stack>
                  )}
                </TableCell>
                <TableCell>
                  {leave.approvedByFirstName} {leave.approvedByLastName}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SeeLeavesForm;
