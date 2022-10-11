import React from "react";
import { PhotoCardProps } from "../types";
import Image from "next/image";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useAppDispatch } from "../store/hooks";
import { selectGender } from "../store/slices/currentUserSlice";

const PhotoCard: NextPage<PhotoCardProps> = ({ image, title, path }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  return (
    <div
      className={
        "w-3/12 shadow-lg rounded-lg shadow-gray-500 mx-7 hover:cursor-pointer hover:shadow-gray-600 transition-shadow duration-300"
      }
      onClick={() => {
        dispatch(selectGender(path));
        router.push(`/${path}`);
      }}
    >
      <Image
        src={image}
        alt={title}
        height={"100%"}
        width={"100%"}
        layout={"responsive"}
        className={
          "rounded-t-lg hover:opacity-70 transition-opacity duration-300"
        }
      />
      <h1
        className={
          "text-2xl rounded-b-lg text-center py-5 font-raleway transition ease-in-out duration-300 hover:text-gray-500"
        }
      >
        {title}
      </h1>
    </div>
  );
};

export default PhotoCard;
