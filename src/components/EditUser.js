import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const navigate = useNavigate();
    const {id} = useParams();

    const getUsersById = async () => {
        try{
            const res = await axios.get(`http://localhost:5000/users/${id}`);
            setName(res.data.name)
            setEmail(res.data.email)
            setGender(res.data.gender)
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getUsersById();
    }, [])

    const updateUser = async(e) => {
        e.preventDefault();
        try{
            await axios.patch(`http://localhost:5000/users/${id}`, {
                name,
                email,
                gender
            });
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div>
            <form onSubmit={updateUser}>
                <input 
                type="text" 
                placeholder='Name' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                /><br />

                <input 
                type="text" 
                placeholder='Email' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                /><br />


                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>

                <br />
                <button type='submit'>Update</button>
            </form>
        </div>
    )
}

export default EditUser
