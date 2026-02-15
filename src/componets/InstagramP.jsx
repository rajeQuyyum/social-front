import React, { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../socket";

import { AiOutlineAppstore, AiOutlineLink } from "react-icons/ai";
import { BsThreads } from "react-icons/bs";
import { FaRepeat } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { IoMdAdd } from "react-icons/io";
import { IoPersonAddOutline } from "react-icons/io5";
import { LuSquarePlay } from "react-icons/lu";
import { PiSealCheckFill } from "react-icons/pi";
import { RiFacebookCircleFill, RiFolderUserFill } from "react-icons/ri";

const API = import.meta.env.VITE_API_URL;


export default function InstagramP() {

  const emptyProfile = {
    username: "",
    category: "",
    bioLine1: "",
    bioLine2: "",
    bioLine3: "",
    website: "",
    posts: "",
    followers: "",
    following: "",
    profileImage: "",
    highlightImage: "",
    postImage: ""
  };

  const [profile, setProfile] = useState(emptyProfile);

  useEffect(() => {

    // Connect once
    if (!socket.connected) {
      socket.connect();
    }

    fetchProfile();

    socket.on("profileUpdated", (data) => {
      setProfile(prev => ({
        ...prev,
        ...data
      }));
    });

    return () => {
      socket.off("profileUpdated");
    };

  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API}/api/profile`);
      if (res.data) {
        setProfile(prev => ({
          ...prev,
          ...res.data
        }));
      }
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  return (
    <section className="w-111 m-auto bg-black min-h-screen">

      <div className="text-white flex justify-between items-center mb-5 p-4">
        <IoMdAdd className="text-2xl" />

        <div className="flex items-center gap-1">
          <h1 className="text-lg">{profile.username}</h1>
          <PiSealCheckFill className="text-lg text-blue-500" />
        </div>

        <div className="flex gap-3 items-center">
          <BsThreads className="text-lg" />
          <HiBars3 className="text-2xl" />
        </div>
      </div>

      <h1 className="text-white pl-28 text-sm">
  {profile.displayName}
</h1>


      <div className="text-white justify-between items-center px-8 flex mt-">

        {profile.profileImage ? (
          <img
            className="h-20 w-20 rounded-full object-cover"
            src={profile.profileImage}
            alt="profile"
          />
        ) : (
          <div className="h-20 w-20 rounded-full bg-gray-700" />
        )}

        <div>
          <h1>{profile.posts}</h1>
          <h1>posts</h1>
        </div>

        <div>
          <h1>{profile.followers}</h1>
          <h1>followers</h1>
        </div>

        <div>
          <h1>{profile.following}</h1>
          <h1>following</h1>
        </div>
      </div>

      <div className="text-white flex flex-col gap-1 text-xs px-8 mt-4">
        <h1 className="text-gray-400 font-light">
          {profile.category}
        </h1>
        <h1>{profile.bioLine1}</h1>
        <h1>{profile.bioLine2}</h1>
        <h1>{profile.bioLine3}</h1>

        {profile.website && (
          <div className="flex items-center gap-1 mt-2">
            <AiOutlineLink className="text-blue-400 text-lg" />
            <a
              href={profile.website}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400"
            >
              {profile.website}
            </a>
          </div>
        )}
      </div>

     <div className="text-white flex items-center justify-center gap-2.5 w-87.5 mb-5 pr-18">
  <BsThreads />
  <h1>{profile.threadsName}</h1>

  <RiFacebookCircleFill />
  <h1>{profile.facebookName}</h1>
</div>


      <div className="flex text-white items-center justify-center gap-2 mt-4">
        <h1 className="bg-gray-800 px-6 py-1 rounded-md">
          Edit profile
        </h1>
        <h1 className="bg-gray-800 px-6 py-1 rounded-md">
          Share profile
        </h1>
        <IoPersonAddOutline className="bg-gray-800 px-2 text-2xl py-1 rounded-md" />
      </div>

      <div className="flex gap-2 items-center px-8 mt-6">
        <IoMdAdd className="text-3xl text-white" />
        {profile.highlightImage && (
          <img
            className="w-75 object-cover"
            src={profile.highlightImage}
            alt="highlight"
          />
        )}
      </div>

      <div className="text-white flex justify-between px-8 mt-6">
        <AiOutlineAppstore />
        <LuSquarePlay />
        <FaRepeat />
        <RiFolderUserFill />
      </div>

      <div className="mt-4 ">
        {profile.postImage && (
          <img
            className="w-full object-cover"
            src={profile.postImage}
            alt="post"
          />
        )}
      </div>

    </section>
  );
}
