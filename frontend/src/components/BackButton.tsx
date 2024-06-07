import React from 'react';
import { Link } from 'react-router-dom';
import { MdArrowBack } from "react-icons/md";

interface BackButtonProps {
  destination: string;
}

const BackButton = ({destination}: BackButtonProps) => {
  return (
    <div className= "flex cursor-grab w-[50px] h-[28px] bg-white items-center justify-center rounded-md">
      <Link to={destination}>
        <MdArrowBack/>
      </Link>
    </div>
  )
}

export default BackButton
