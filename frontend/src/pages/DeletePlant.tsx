import React, { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BackButton from '../components/BackButton';
import "../styles/tailwind.css";

const DeletePlant = () => {
  const [newUser, setNewUser] = useState(
    {
      name: '',
      age: '',
      picture: '',
    }
  );


  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var formData = new FormData();
    formData.append("picture", newUser.picture);
    formData.append('age', newUser.age);
    formData.append('name', newUser.name);

    axios({
      method: "delete",
      url: `http://localhost:2700/plants/${id}`,
      data: formData,
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        navigate("/plants");
      })
      .catch((error) => {
        alert("Error: " + error);
      });
  };
  return (
    <div>
      <div className="absolute pt-[16px] pl-[16px]">
        <BackButton destination="/plants" />
      </div>
      <div className="h-screen flex justify-center items-center">
        <form className="border-[50px] border-[#2a9f50] flex flex-col bg-[#2a9f50] justify-center items-center" onSubmit={handleSubmit} encType="enctype='multipart/form-data">
          <h1 className="text-xl">Are you sure you want to delete this plant?</h1>
          <button className="text-lg mt-[30px] px-[4px] rounded-xl flex justify-center items-center bg-red-500 w-[150px] h-[40px]" type="submit">Yes, delete</button>
        </form>
      </div>
    </div>
  )
}

export default DeletePlant;
