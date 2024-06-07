import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileBase64 from 'react-file-base64';
import BackButton from '../components/BackButton';
import '../styles/tailwind.css';

const CreatePlant = () => {
    const [newUser, setNewUser] = useState({
        name: '',
        age: '',
        picture: '',
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChangeBase64 = (files: any) => {
        setNewUser((prevUser) => ({ ...prevUser, picture: files.base64 }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append('picture', newUser.picture);
        formData.append('age', newUser.age);
        formData.append('name', newUser.name);

        setLoading(true);
        axios({
            method: 'post',
            url: 'http://localhost:2700/plants',
            data: formData,
            headers: { 'Content-Type': 'application/json' },
        })
            .then(() => {
                setLoading(false);
                navigate('/plants');
            })
            .catch((error) => {
                setLoading(false);
                alert('Plant creation failed. Please check console for error.');
            });
    };

    const style = {
        fontFamily: 'Indie Flower, cursive',
    };

    return (
        <div>
            <div className="absolute pt-[16px] pl-[16px]">
                <BackButton destination="/plants" />
            </div>
            <div style={style} className="text-xl bg-[#1E6A37] h-screen flex flex-col justify-center items-center">
                <div className="bg-[#2a9f50] border-[25px] border-[#2a9f50] rounded-lg">
                    <h1 className="flex justify-center text-3xl">Create Plant🪴</h1>
                    <div className="w-[600px]">
                        <form onSubmit={handleSubmit} encType="enctype='multipart/form-data">
                            <div className="flex flex-col">
                                <label>Name</label>
                                <input type="text" value={newUser.name} name="name" onChange={handleChange} />
                            </div>
                            <br />
                            <div className="flex flex-col">
                                <label>Age</label>
                                <input type="text" value={newUser.age} name="age" onChange={handleChange} />
                            </div>
                            <br />
                            <div className="mb-[5px] flex flex-col items-center">
                                <label className="mt-[5px]">Image (optional)</label>
                                <FileBase64
                                    className="text-transparent"
                                    onDone={handleChangeBase64}
                                    name="picture"
                                    id="picture"
                                />
                            </div>
                            <br />
                            <div className="w-full flex justify-center">
                                <button
                                    className="text-xl py-[3px] px-[17px] rounded-xl bg-[#9792E3]"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePlant;
