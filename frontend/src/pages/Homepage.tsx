import React, { useEffect, useState } from 'react';
import axios from "axios";
import CreatePlant from './CreatePlant';
import { Link } from "react-router-dom";
import { MdAddCircleOutline, MdChangeCircle, MdInfoOutline, MdInfo, MdEdit, MdAddCircle, MdOutlineDelete, MdOutlineInfo, MdOutlineEdit, MdOutlineAddBox } from "react-icons/md";
import FileBase64 from 'react-file-base64';

const Homepage = () => {
    const [plants, setPlants] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:2700/plants",
        })
            .then((res) => {
                setPlants(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    return (
        <div className="h-screen bg-[#2a9f50] flex flex-col">
            <div className="text-white flex flex-col items-center">
                <div className="flex justify-between items-center px-2 py-3 w-full">
                    <h2 className="text-3xl text-white">🪴</h2>
                    <h1 className="text-4xl text-white">GreenLogs</h1>
                    <Link className="" to="/plants/create">
                        <MdOutlineAddBox size={35} className="text-[#1BE7FF] text-4xl rounded-full" />
                    </Link>
                </div>
                <table className="w-full border border-collapse rounded-xl">
                    <thead className="border">
                        <tr>
                            <th className="border px-4 py-2 text-white">Name</th>
                            <th className="border max-w-0 text-white">Age</th>
                            <th className="border px-4 py-2 text-white">Picture</th>
                            <th className="border px-4 py-2 text-white">Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plants.map((plant) => (
                            <tr key={plant._id} className="border">
                                <td className="border text-center w-[400px] pl-4 px-4 py-2">{plant.name}</td>
                                <td className="border text-center px-1 py-2">{plant.age}</td>
                                {plant.picture ? (
                                    <td className="flex justify-center py-2"><img className="h-44" src={plant.picture} alt={plant.name} /></td>
                                ) : (
                                    <h2></h2> // placeholder 
                                )}
                                <td className="border pl-4 py-2 w-[300px]">
                                    <div className="flex justify-center">
                                        <Link to={`/plants/${plant._id}`}>
                                            <MdOutlineInfo size={35} className="text-blue-600" />
                                        </Link>
                                        <Link to={`/plants/${plant._id}/edit`}>
                                            <MdOutlineEdit size={35} className="text-yellow-500" />
                                        </Link>
                                        <Link to={`/plants/${plant._id}/delete`}>
                                            <MdOutlineDelete size={35} className="text-red-700" />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Homepage;
