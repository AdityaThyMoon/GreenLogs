import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import FileBase64 from 'react-file-base64';
import "../styles/tailwind.css";

const EditPlant = () => {
    const [newUser, setNewUser] = useState(
        {
            name: '',
            age: '',
            picture: '',
        }
    );

    const style = {
        fontFamily: "Indie Flower, cursive"
    };


    const [loading, setLoading] = useState(false);
    const [originalPicture, setOriginalPicture] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios({
            method: "get",
            url: `http://localhost:2700/plants/${id}`,
        })
            .then((res) => {
                setNewUser(res.data);
                setOriginalPicture(res.data.picture);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, [])
    const handleChangeBase64 = (files: any) => {
        setNewUser({ ...newUser, picture: files.base64 });
    }

    // const handleChangeBase64 = (files: any) => {
    //     setNewUser(prevUser => ({ ...prevUser, picture: files.base64 }));
    // }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("picture", newUser.picture);
        formData.append('age', newUser.age);
        formData.append('name', newUser.name);

        setLoading(true)
        axios({
            method: "put",
            url: `http://localhost:2700/plants/${id}`,
            data: formData,
            headers: { "Content-Type": "application/json" },
        })
            .then(() => {
                setLoading(false);
                navigate("/plants");
            })
            .catch((error) => {
                setLoading(false);
                alert("Error: " + error);
            });
    };
    return (
        <div>
            <div className="absolute pt-[16px] pl-[16px]">
                <BackButton destination="/plants" />
            </div>
            <div style={style} className="text-xl bg-[#1E6A37] h-screen flex flex-col justify-center items-center">
                <div className="bg-[#2a9f50] border-[25px] border-[#2a9f50] rounded-lg">
                    <h1 className="flex justify-center text-3xl">Edit Plant🪴</h1>
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
                            <div className="flex justify-start items-center h-[200px]">
                                <div className="flex flex-col items-center">
                                    <img className="max-w-[150px] max-h-[150px]" src={originalPicture} />
                                    <label className="mt-[10px]">Current Image</label>
                                </div>
                                <br />
                                <div className="flex h-[200px] ml-[360px] absolute mb-[15px] self-end flex-col justify-end items-center">
                                    <label className="mb-[20px]">Choose New Image?</label>
                                    <FileBase64
                                        className="text-transparent"
                                        onDone={handleChangeBase64}
                                        name="picture"
                                        id="picture"
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-center">
                                <button
                                    className="text-xl py-[3px] px-[17px] rounded-xl mb-[-10px] bg-[#9792E3]"
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
        

    )
}

export default EditPlant;
