import React from "react";
import { PhotoCardProps } from "../types";
import Image from "next/image";

const PhotoCard: React.FC<PhotoCardProps> = ({ image, style, title }) => {
  return (
    <div className={`w-3/12 shadow-lg rounded-lg shadow-gray-500 ${style}`}>
      <Image
        src={image}
        alt={"test"}
        height={"100%"}
        width={"100%"}
        layout={"responsive"}
        className={"rounded-t-lg"}
      />
      <h1
        className={
          "text-2xl text-gray-200 rounded-b-lg bg-black text-center py-5"
        }
      >
        {title}
      </h1>
    </div>
  );
};

export default PhotoCard;
