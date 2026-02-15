import React, { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../socket";

import { CiImageOn, CiVideoOn } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoCallOutline, IoChevronBack, IoMicOutline } from "react-icons/io5";
import { MdCameraAlt } from "react-icons/md";

const API = import.meta.env.VITE_API_URL;


export default function InstagramM() {

  const emptyData = {
    dmProfileImage: "",
    dmName: "",
    dmUsername: "",
    dmFollowers: "",
    dmPosts: "",
    dmFollowsText: "",
    dmMutualText: "",
     dmFollowsText2: "",
    messages: []
  };

  const [data, setData] = useState(emptyData);

  useEffect(() => {

    if (!socket.connected) socket.connect();

    fetchData();

    socket.on("profileUpdated", (updated) => {
      setData(prev => ({
        ...prev,
        ...updated
      }));
    });

    return () => {
      socket.off("profileUpdated");
    };

  }, []);

  const fetchData = async () => {
    const res = await axios.get(`${API}/api/profile`);
    if (res.data) {
      setData(prev => ({
        ...prev,
        ...res.data
      }));
    }
  };

  return (
    <section className="w-112.5 m-auto bg-black min-h-screen">

      {/* HEADER */}
      <div className="border-b flex items-center gap-4 p-4">
        <IoChevronBack className="text-white text-2xl" />

        {data.dmProfileImage && (
          <img
            className="h-10 w-10 rounded-full"
            src={data.dmProfileImage}
            alt=""
          />
        )}

        <div className="flex flex-col">
          <h1 className="text-white">{data.dmName}</h1>
          <h2 className="text-sm text-gray-500">{data.dmUsername}</h2>
        </div>

        <IoCallOutline className="text-white text-2xl ml-auto" />
        <CiVideoOn className="text-white text-2xl" />
      </div>

      {/* PROFILE SECTION */}
      <div className="flex flex-col items-center mt-6 w-87.5 m-auto justify-center">
        {data.dmProfileImage && (
          <img
            className="h-15 w-15 rounded-full"
            src={data.dmProfileImage}
            alt=""
          />
        )}

        <h1 className="text-white mt-2">{data.dmName}</h1>
        <h2 className="text-gray-500 text-sm">{data.dmUsername}</h2>

        <h1 className="text-gray-500 text-sm">
          {data.dmFollowers} followers · {data.dmPosts} posts
        </h1>

        <h1 className="text-gray-500 text-sm">{data.dmFollowsText}</h1>
            <h1 className="text-gray-500 text-sm">{data.dmFollowsText2}</h1>
        <h1 className="text-gray-500 text-sm">{data.dmMutualText}</h1>

        <h1 className="text-white bg-gray-900 py-1.5 rounded-md px-3 mt-2">
          View profile
        </h1>
      </div>

      {/* MESSAGES */}
      <div className="px-4 mt-8">
        {data.messages?.map((msg, index) => (
          <div key={index} className="flex gap-2 mb-6">
            {data.dmProfileImage && (
              <img
                className="h-8.75 w-8.75 rounded-full"
                src={data.dmProfileImage}
                alt=""
              />
            )}
            <h1 className="text-white bg-gray-800 py-1 px-3 rounded-md">
              {msg.text}
            </h1>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <div className="bg-gray-800 flex items-center rounded-xl mt-80 p-2">
        <MdCameraAlt className="text-black bg-white rounded-full w-8 h-8 px-2" />
        <input
          className="bg-transparent text-white outline-none px-2 flex-1"
          placeholder="Message..."
        />
        <IoMicOutline className="text-white text-2xl" />
        <CiImageOn className="text-white text-2xl ml-2" />
        <IoIosAddCircleOutline className="text-white text-xl ml-2" />
      </div>

    </section>
  );
}
