import React, { useState } from 'react';
import axios from 'axios';
import {
    Box,
    TextField,
    Select,
    MenuItem,
    Button,
    FormControl,
    InputLabel,
} from "@mui/material";

const EmployeeFilterForm = ({ onFilter }) => {
    const [gender, setGender] = useState('');
    const [department, setDepartment] = useState('');
    const [role, setRole] = useState('');
    const [title, setTitle] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();

        const params = {};
        if (gender) params.gender = gender;
        if (department) params.department = department;
        if (role) params.role = role;
        if (title) params.title = title;

        try {
            const response = await axios.get("http://localhost:5000/api/employees/summaries/filter", { params });
            onFilter(response.data);
        } catch (error) {
            console.error("Filtreleme hatası:", error);
        }
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                alignItems: "center",
                mb: 3,
            }}
        >
            <FormControl sx={{ minWidth: 150 }}>
                <InputLabel id="gender-label">Cinsiyet</InputLabel>
                <Select
                    labelId="gender-label"
                    value={gender}
                    label="Cinsiyet"
                    onChange={(e) => setGender(e.target.value)}
                >
                    <MenuItem value="">Tümü</MenuItem>
                    <MenuItem value="MALE">Erkek</MenuItem>
                    <MenuItem value="FEMALE">Kadın</MenuItem>
                </Select>
            </FormControl>

            <TextField
                label="Departman"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            />

            <FormControl sx={{ minWidth: 150 }}>
                <InputLabel id="role-label">Rol</InputLabel>
                <Select
                    labelId="role-label"
                    value={role}
                    label="Rol"
                    onChange={(e) => setRole(e.target.value)}
                >
                    <MenuItem value="">Tümü</MenuItem>
                    <MenuItem value="HR">HR</MenuItem>
                    <MenuItem value="employee">Çalışan</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Ünvan"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ textTransform: "none" }}
            >
                FİLTRELE
            </Button>
        </Box>
        /*<form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Cinsiyet</option>
                <option value="MALE">Erkek</option>
                <option value="FEMALE">Kadın</option>
            </select>

            <input
                type="text"
                placeholder="Departman"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
            />
            <input
                type="text"
                placeholder="Rol"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            />
            <input
                type="text"
                placeholder="Ünvan"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <button type="submit">Filtrele</button>
        </form>*/
    );
};

export default EmployeeFilterForm;
