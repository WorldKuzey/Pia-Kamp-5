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
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Tooltip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";

const ProjectsTable = ({ projects, employees, fetchProjects, updateProject, deleteProject }) => {
  const [openRow, setOpenRow] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [membersOpen, setMembersOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showEditMemberForm, setShowEditMemberForm] = useState(false);
  const [newEditMember, setNewEditMember] = useState({ employeeId: "" });

  const getStatusColor = (status) => {
    switch (status) {
      case "ACTIVE":
        return "success";
      case "COMPLETED":
        return "primary";
      case "CANCELLED":
        return "error";
      case "ON_HOLD":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "ACTIVE":
        return "Aktif";
      case "COMPLETED":
        return "Tamamlandı";
      case "CANCELLED":
        return "İptal Edildi";
      case "ON_HOLD":
        return "Beklemede";
      default:
        return status;
    }
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(emp => emp.id === employeeId || emp._id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : "Bilinmeyen";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("tr-TR");
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Bu projeyi silmek istiyor musunuz?");
    if (!confirm) return;

    const result = await deleteProject(id);
    if (!result.success) {
      alert(`Silme hatası: ${result.error}`);
    }
  };

  const handleEditOpen = (project) => {
    setEditData(project);
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
    const result = await updateProject(editData.id, editData);
    if (result.success) {
      setEditOpen(false);
    } else {
      alert(`Güncelleme hatası: ${result.error}`);
    }
  };

  const toggleDetails = (id) => {
    setOpenRow((prev) => (prev === id ? null : id));
  };

  const handleMembersOpen = (project) => {
    setSelectedProject(project);
    setMembersOpen(true);
  };

  function getEditAvailableEmployees() {
    if (!editData || !editData.members) return employees;
    const addedIds = editData.members.map(m => m.employeeId);
    return employees.filter(emp => !addedIds.includes(emp.id || emp._id));
  }

  function getEmployeeTitle(employeeId) {
    const emp = employees.find(e => e.id === employeeId || e._id === employeeId);
    return emp ? emp.title || emp.role || "-" : "-";
  }

  function handleEditAddMember() {
    if (!newEditMember.employeeId) return;
    if (!editData) return;
    // Prevent duplicates
    if (editData.members.some(m => m.employeeId === newEditMember.employeeId)) return;
    const emp = employees.find(e => e.id === newEditMember.employeeId || e._id === newEditMember.employeeId);
    const roleInProject = emp ? emp.title || emp.role || "-" : "-";
    const updated = {
      ...editData,
      members: [...(editData.members || []), { employeeId: newEditMember.employeeId, roleInProject }],
    };
    setEditData(updated);
    setNewEditMember({ employeeId: "" });
    setShowEditMemberForm(false);
  }

  function handleEditRemoveMember(index) {
    if (!editData) return;
    const updated = {
      ...editData,
      members: editData.members.filter((_, i) => i !== index),
    };
    setEditData(updated);
  }

  return (
    <>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Proje Adı</strong>
              </TableCell>
              <TableCell>
                <strong>Durum</strong>
              </TableCell>
              <TableCell>
                <strong>Proje Yöneticisi</strong>
              </TableCell>
              <TableCell>
                <strong>Başlangıç Tarihi</strong>
              </TableCell>
              <TableCell>
                <strong>Bitiş Tarihi</strong>
              </TableCell>
              <TableCell>
                <strong>İşlemler</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="textSecondary">
                    Henüz proje bulunmuyor. Yeni proje eklemek için yukarıdaki butonu kullanın.
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => {
              const id = project.id || project._id;
              return (
                <React.Fragment key={id}>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {project.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getStatusText(project.status)}
                        color={getStatusColor(project.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {getEmployeeName(project.projectManagerId)}
                    </TableCell>
                    <TableCell>{formatDate(project.startDate)}</TableCell>
                    <TableCell>{formatDate(project.endDate)}</TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        color="primary"
                        size="small"
                        onClick={() => toggleDetails(id)}
                      >
                        {openRow === id ? "Gizle" : "Detay"}
                      </Button>
                      <Tooltip title="Üyeleri Görüntüle">
                        <IconButton
                          size="small"
                          onClick={() => handleMembersOpen(project)}
                          color="info"
                        >
                          <PersonIcon />
                        </IconButton>
                      </Tooltip>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        onClick={() => handleEditOpen(project)}
                        sx={{ ml: 1 }}
                      >
                        <EditIcon fontSize="small" />
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(id)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon fontSize="small" />
                      </Button>
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell colSpan={6} style={{ padding: 0 }}>
                      <Collapse
                        in={openRow === id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box margin={2}>
                          <Typography variant="subtitle2" gutterBottom>
                            Proje Detayları:
                          </Typography>
                          <Typography variant="body2" paragraph>
                            <strong>Açıklama:</strong> {project.description || "Açıklama yok"}
                          </Typography>
                          <Typography variant="body2" paragraph>
                            <strong>Üye Sayısı:</strong> {project.members?.length || 0} kişi
                          </Typography>
                          {project.members && project.members.length > 0 && (
                            <Box mt={2}>
                              <Typography variant="subtitle2">Üyeler:</Typography>
                              <ul style={{ margin: 0, paddingLeft: 20 }}>
                                {project.members.map((member, idx) => (
                                  <li key={idx} style={{ marginBottom: 4 }}>
                                    {getEmployeeName(member.employeeId)}
                                    {" - "}
                                    <strong>{getEmployeeTitle(member.employeeId)}</strong>
                                  </li>
                                ))}
                              </ul>
                            </Box>
                          )}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              );
            }))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="md" fullWidth>
        <DialogTitle>Proje Düzenle</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            <TextField
              label="Proje Adı"
              name="name"
              value={editData?.name || ""}
              onChange={handleEditChange}
              fullWidth
            />
            <TextField
              label="Açıklama"
              name="description"
              value={editData?.description || ""}
              onChange={handleEditChange}
              multiline
              rows={3}
              fullWidth
            />
            <TextField
              select
              label="Durum"
              name="status"
              value={editData?.status || ""}
              onChange={handleEditChange}
              fullWidth
            >
              <MenuItem value="ACTIVE">Aktif</MenuItem>
              <MenuItem value="COMPLETED">Tamamlandı</MenuItem>
              <MenuItem value="CANCELLED">İptal Edildi</MenuItem>
              <MenuItem value="ON_HOLD">Beklemede</MenuItem>
            </TextField>
            <TextField
              label="Başlangıç Tarihi"
              name="startDate"
              type="date"
              value={editData?.startDate || ""}
              onChange={handleEditChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Bitiş Tarihi"
              name="endDate"
              type="date"
              value={editData?.endDate || ""}
              onChange={handleEditChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              select
              label="Proje Yöneticisi"
              name="projectManagerId"
              value={editData?.projectManagerId || ""}
              onChange={handleEditChange}
              fullWidth
            >
              {employees.map((emp) => (
                <MenuItem key={emp.id || emp._id} value={emp.id || emp._id}>
                  {emp.firstName} {emp.lastName} - {emp.title}
                </MenuItem>
              ))}
            </TextField>
            {/* Member Management Section */}
            <Divider sx={{ my: 2 }} />
            <Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Proje Üyeleri</Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setShowEditMemberForm(true)}
                  disabled={getEditAvailableEmployees().length === 0}
                >
                  Üye Ekle
                </Button>
              </Box>
              {editData?.members?.length > 0 ? (
                <List>
                  {editData.members.map((member, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={getEmployeeName(member.employeeId)}
                        secondary={`Rol: ${getEmployeeTitle(member.employeeId)}`}
                      />
                      <IconButton edge="end" onClick={() => handleEditRemoveMember(index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Henüz üye eklenmemiş.
                </Typography>
              )}
              {/* Add Member Inline Form */}
              {showEditMemberForm && (
                <Box sx={{ border: "1px solid #ddd", borderRadius: 1, p: 2, mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Yeni Üye Ekle
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <TextField
                      select
                      label="Çalışan"
                      value={newEditMember.employeeId}
                      onChange={e => setNewEditMember({ employeeId: e.target.value })}
                      fullWidth
                    >
                      {getEditAvailableEmployees().map((emp) => (
                        <MenuItem key={emp.id || emp._id} value={emp.id || emp._id}>
                          {emp.firstName} {emp.lastName} - {emp.title}
                        </MenuItem>
                      ))}
                    </TextField>
                    <Button
                      variant="contained"
                      onClick={handleEditAddMember}
                      disabled={!newEditMember.employeeId}
                    >
                      Ekle
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setShowEditMemberForm(false)}
                    >
                      İptal
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>İptal</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Güncelle
          </Button>
        </DialogActions>
      </Dialog>

      {/* Members Dialog */}
      <Dialog open={membersOpen} onClose={() => setMembersOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Proje Üyeleri - {selectedProject?.name}
        </DialogTitle>
        <DialogContent>
          {selectedProject?.members?.length > 0 ? (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Çalışan</strong></TableCell>
                    <TableCell><strong>Rol</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedProject.members.map((member, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {getEmployeeName(member.employeeId)}
                      </TableCell>
                      <TableCell>
                        <Chip label={getEmployeeTitle(member.employeeId)} size="small" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography variant="body2" color="textSecondary">
              Bu projede henüz üye bulunmuyor.
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMembersOpen(false)}>Kapat</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProjectsTable; 