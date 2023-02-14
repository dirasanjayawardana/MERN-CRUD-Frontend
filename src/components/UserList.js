import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState();

    const getUsers = async () => {
        const res = await axios.get('http://localhost:5000/users');
        setUsers(res.data)
    }
    useEffect(() => {
        getUsers();
    }, []);

    // console.log(users);

    const deleteUser = async (id) => {
        try{
            await axios.delete(`http://localhost:5000/users/${id}`)
            getUsers();
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <Link to="/add">Add New User</Link>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((item, index) => {
                        return (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.gender}</td>
                                <td>
                                    <Link to={`/edit/${item._id}`}><button>Edit</button></Link>

                                    <button onClick={() => deleteUser(item._id)}>Delete</button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
        </div>
    )
}

export default UserList
