import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../styles/tailwind.css";

const ShowPlant = () => {
    const [plant, setPlant] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:2700/plants/${id}`,
        })
            .then((res) => {
                setPlant(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    return (
        <div className="bg-[#2a9f50]">
            <div className="absolute pt-[16px] pl-[16px]">
                <BackButton destination="/plants" />
            </div>
            <div className="flex justify-center items-center h-screen">
                <table className="border-collapse border border-gray-400">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2">ID</th>
                            <th className="border px-4 py-2">Picture</th>
                            <th className="border px-4 py-2">Name</th>
                            <th className="border px-4 py-2">Age</th>
                            <th className="border px-4 py-2">Created At</th>
                            <th className="border px-4 py-2">Updated At</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2 text-center">{plant._id}</td>
                            <td className="border px-4 py-2 text-center">
                                {plant.picture ? (
                                    <img className="h-44" src={plant.picture} alt={plant.name} />
                                ) : (
                                    <p>No Image</p>
                                )}
                            </td>
                            <td className="border px-4 py-2 text-center">{plant.name}</td>
                            <td className="border px-4 py-2 text-center">{plant.age}</td>
                            <td className="border px-4 py-2 text-center">{plant.createdAt}</td>
                            <td className="border px-4 py-2 text-center">{plant.updatedAt}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ShowPlant;
