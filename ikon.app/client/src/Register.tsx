import React, { useState } from 'react';
import axios from 'axios';

interface Employee {
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    title: string;
    phone: string;
}

export default function Register() {
    const [form, setForm] = useState<Employee>({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
        title: '',
        phone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/employees/register', form);
            alert('Registered successfully!');
            setForm({
                firstName: '',
                lastName: '',
                email: '',
                department: '',
                title: '',
                phone: '',
            });
        } catch (error) {
            console.error(error);
            alert('Registration failed.');
        }
    };

    return (
        <div>
            <h2>Register Employee</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                />
                <br />

                <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
                <br />

                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <br />

                <input
                    type="text"
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    placeholder="Department"
                    required
                />
                <br />

                <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Title"
                    required
                />
                <br />

                <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    required
                />
                <br />

                <button type="submit">Register</button>
            </form>
        </div>
    );
}
