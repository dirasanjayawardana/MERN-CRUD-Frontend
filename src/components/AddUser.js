import React, {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const navigate = useNavigate();

    const saveUser = async(e) => {
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/users', {
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
            <form onSubmit={saveUser}>
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
                <button type='submit'>Save</button>
            </form>
        </div>
    )
}

export default AddUser
