import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Table } from 'react-bootstrap';
import Header from "../../components/Header";
import { registerAPI, adminGetAllUsers, adminDeleteUser } from '../../utils/ApiRequest'; // adjust the path as needed
import './AdminHome.css'

const AdminHome = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(adminGetAllUsers);
            console.log(res.data.users);
            
            setUsers(res.data.users);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            const deleteUrl = adminDeleteUser.replace(':id', id);
            await axios.delete(deleteUrl);
            setUsers(users.filter(user => user.id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(registerAPI, newUser);
            setUsers([...users, res.data.users]); // Adjust according to your backend's response shape
            setNewUser({ name: '', email: '', password: '' });
            fetchUsers();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
        <Header />
        <div className="container mt-5">
            <h2>Admin Dashboard</h2>
            <h4>All Users</h4>
            <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Table striped bordered hover>
                    <thead className="table-header">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => user && (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
                                    <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>


            <h4>Add New User</h4>
            <Form className='adminform' onSubmit={handleAddUser}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} required />
                </Form.Group>
                <Button type="submit" variant="primary">Add User</Button>
            </Form>
        </div>
        </>
    );
};

export default AdminHome;
