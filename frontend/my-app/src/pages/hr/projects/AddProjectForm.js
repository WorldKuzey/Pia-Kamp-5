import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  Typography,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const AddProjectForm = ({ employees, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "ACTIVE",
    startDate: "",
    endDate: "",
    projectManagerId: "",
    members: [],
  });

  const [showMemberForm, setShowMemberForm] = useState(false);
  const [newMember, setNewMember] = useState({
    employeeId: "",
    roleInProject: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.projectManagerId) {
      alert("Proje adı ve proje yöneticisi zorunludur!");
      return;
    }
    
    // Validate dates
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (startDate > endDate) {
        alert("Başlangıç tarihi bitiş tarihinden sonra olamaz!");
        return;
      }
    }
    
    onSubmit(formData);
  };

  const addMember = () => {
    if (!newMember.employeeId || !newMember.roleInProject) {
      alert("Çalışan ve rol seçimi zorunludur!");
      return;
    }

    // Check if employee is already added
    const isAlreadyAdded = formData.members.some(
      (member) => member.employeeId === newMember.employeeId
    );

    if (isAlreadyAdded) {
      alert("Bu çalışan zaten projeye eklenmiş!");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, { ...newMember }],
    }));

    setNewMember({ employeeId: "", roleInProject: "" });
    setShowMemberForm(false);
  };

  const removeMember = (employeeId) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((member) => member.employeeId !== employeeId),
    }));
  };

  const getEmployeeName = (employeeId) => {
    const employee = employees.find(
      (emp) => emp.id === employeeId || emp._id === employeeId
    );
    return employee ? `${employee.firstName} ${employee.lastName}` : "Bilinmeyen";
  };

  const getAvailableEmployees = () => {
    const addedEmployeeIds = formData.members.map((member) => member.employeeId);
    return employees.filter(
      (emp) => !addedEmployeeIds.includes(emp.id || emp._id)
    );
  };

  return (
    <Dialog open={true} onClose={onCancel} maxWidth="md" fullWidth>
      <DialogTitle>Yeni Proje Ekle</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Proje Adı *"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              label="Açıklama"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />

            <TextField
              select
              label="Durum *"
              name="status"
              value={formData.status}
              onChange={handleChange}
              fullWidth
              required
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
              value={formData.startDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              label="Bitiş Tarihi"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />

            <TextField
              select
              label="Proje Yöneticisi *"
              name="projectManagerId"
              value={formData.projectManagerId}
              onChange={handleChange}
              fullWidth
              required
            >
              {employees.map((emp) => (
                <MenuItem key={emp.id || emp._id} value={emp.id || emp._id}>
                  {emp.firstName} {emp.lastName} - {emp.title}
                </MenuItem>
              ))}
            </TextField>

            <Divider sx={{ my: 2 }} />

            <Box>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="h6">Proje Üyeleri</Typography>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setShowMemberForm(true)}
                  disabled={getAvailableEmployees().length === 0}
                >
                  Üye Ekle
                </Button>
              </Box>

              {formData.members.length > 0 ? (
                <List>
                  {formData.members.map((member, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={getEmployeeName(member.employeeId)}
                        secondary={`Rol: ${member.roleInProject}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => removeMember(member.employeeId)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Henüz üye eklenmemiş.
                </Typography>
              )}
            </Box>

            {/* Add Member Dialog */}
            {showMemberForm && (
              <Box
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 1,
                  p: 2,
                  mt: 2,
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Yeni Üye Ekle
                </Typography>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <TextField
                    select
                    label="Çalışan"
                    value={newMember.employeeId}
                    onChange={(e) =>
                      setNewMember((prev) => ({
                        ...prev,
                        employeeId: e.target.value,
                      }))
                    }
                    fullWidth
                  >
                    {getAvailableEmployees().map((emp) => (
                      <MenuItem key={emp.id || emp._id} value={emp.id || emp._id}>
                        {emp.firstName} {emp.lastName} - {emp.title}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Rol"
                    value={newMember.roleInProject}
                    onChange={(e) =>
                      setNewMember((prev) => ({
                        ...prev,
                        roleInProject: e.target.value,
                      }))
                    }
                    fullWidth
                  >
                    <MenuItem value="Developer">Developer</MenuItem>
                    <MenuItem value="Tester">Tester</MenuItem>
                    <MenuItem value="Team Lead">Team Lead</MenuItem>
                    <MenuItem value="Designer">Designer</MenuItem>
                    <MenuItem value="Analyst">Analyst</MenuItem>
                    <MenuItem value="Manager">Manager</MenuItem>
                  </TextField>

                  <Button
                    variant="contained"
                    onClick={addMember}
                    disabled={!newMember.employeeId || !newMember.roleInProject}
                  >
                    Ekle
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => setShowMemberForm(false)}
                  >
                    İptal
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel}>İptal</Button>
          <Button type="submit" variant="contained">
            Proje Oluştur
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddProjectForm; 