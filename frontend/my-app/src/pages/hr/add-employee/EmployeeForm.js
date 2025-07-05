import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Alert,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import useAddEmployee from "./useAddEmployee";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    department: "",
    title: "",
    phone: "",
    gender: "",
    tc: "",
    salary: "",
    address: "",
    date_of_birth: "",
    email: "",
    password: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const { addEmp } = useAddEmployee();

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "date_of_birth" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
      const [y, m, d] = value.split("-");
      newValue = `${d}/${m}/${y}`;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
    setError("");
    setSuccessMsg("");
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const validateForm = () => {
    const nameRegex = /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/;
    const numberRegex = /^[0-9]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(formData.firstName))
      return "İsim sadece harf içermelidir.";
    if (!nameRegex.test(formData.lastName))
      return "Soyisim sadece harf içermelidir.";
    if (!numberRegex.test(formData.tc) || formData.tc.length !== 11)
      return "TC kimlik numarası 11 haneli olmalıdır.";
    if (
      !numberRegex.test(formData.phone) ||
      formData.phone.length < 10 ||
      formData.phone.length > 11
    )
      return "Telefon numarası geçersiz.";
    if (!numberRegex.test(formData.salary) || Number(formData.salary) > 1000000)
      return "Maaş 1.000.000 TL'den büyük olamaz.";
    if (!emailRegex.test(formData.email))
      return "Geçerli bir e-posta adresi giriniz.";
    if (formData.password.length < 6)
      return "Şifre en az 6 karakter olmalıdır.";
    if (!formData.date_of_birth) return "Doğum tarihi boş bırakılamaz.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const success = await addEmp(formData, imageFile);

    if (success) {
      setFormData({
        firstName: "",
        lastName: "",
        department: "",
        title: "",
        phone: "",
        gender: "",
        tc: "",
        salary: "",
        address: "",
        date_of_birth: "",
        email: "",
        password: "",
      });
      setImageFile(null);
      setError("");
      setSuccessMsg("Çalışan başarıyla eklendi.");
    } else {
      setError("Kayıt sırasında hata oluştu.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 700, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Çalışan Ekle
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}
      {successMsg && <Alert severity="success">{successMsg}</Alert>}

      <Box component="form" onSubmit={handleSubmit} mt={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="İsim"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Soyisim"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Departman"
              name="department"
              value={formData.department}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Ünvan"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Telefon"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="TC"
              name="tc"
              value={formData.tc}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Maaş"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Adres"
              name="address"
              value={formData.address}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              name="date_of_birth"
              label="Doğum Tarihi"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Cinsiyet"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">Seçiniz</MenuItem>
              <MenuItem value="MALE">Erkek</MenuItem>
              <MenuItem value="FEMALE">Kadın</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <Button variant="outlined" component="label">
              Fotoğraf Yükle
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {imageFile && (
              <Typography variant="body2">{imageFile.name}</Typography>
            )}
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
              type="email"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Şifre"
              name="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
              type="password"
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Kaydet
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default EmployeeForm;
