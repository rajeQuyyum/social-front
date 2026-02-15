import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const API = import.meta.env.VITE_API_URL;



const socket = io(API, {
  transports: ["websocket"],
  withCredentials: true
});

export default function AdminProfile() {

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
    postImage: "",
    threadsName: "",
    facebookName: "",
    displayName: ""
  };

  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProfile();

    socket.on("profileUpdated", (data) => {
      setProfile({
        ...emptyProfile,
        ...data
      });
    });

    return () => {
      socket.off("profileUpdated");
    };
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${API}/api/profile`);
      if (res.data) {
        setProfile({
          ...emptyProfile,
          ...res.data
        });
      }
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  const handleChange = (e) => {
    setProfile(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await axios.put(`${API}/api/profile`, profile);
      setLoading(false);
    } catch (err) {
      console.log("Save Error:", err);
      setLoading(false);
    }
  };

  const handleImageUpload = async (e, field) => {
    try {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      await axios.post(
        `${API}/api/profile/upload/${field}`,
        formData
      );
    } catch (err) {
      console.log("Upload Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl mb-6 font-bold">Admin Profile Panel</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <input name="username" value={profile.username} onChange={handleChange} placeholder="Username" className="input" />
        <input
  name="displayName"
  value={profile.displayName}
  onChange={handleChange}
  placeholder="Display Name (under header)"
  className="input"
/>

        <input name="category" value={profile.category} onChange={handleChange} placeholder="Category" className="input" />
        <input name="posts" value={profile.posts} onChange={handleChange} placeholder="Posts" className="input" />
        <input name="followers" value={profile.followers} onChange={handleChange} placeholder="Followers" className="input" />
        <input name="following" value={profile.following} onChange={handleChange} placeholder="Following" className="input" />
        <input name="website" value={profile.website} onChange={handleChange} placeholder="Website" className="input" />
      </div>

      <div className="flex flex-col gap-3 mb-8">
        <textarea name="bioLine1" value={profile.bioLine1} onChange={handleChange} placeholder="Bio Line 1" className="input" />
        <textarea name="bioLine2" value={profile.bioLine2} onChange={handleChange} placeholder="Bio Line 2" className="input" />
        <textarea name="bioLine3" value={profile.bioLine3} onChange={handleChange} placeholder="Bio Line 3" className="input" />
      </div>

      <input
  name="threadsName"
  value={profile.threadsName}
  onChange={handleChange}
  placeholder="Threads Name"
  className="input"
/>

<input
  name="facebookName"
  value={profile.facebookName}
  onChange={handleChange}
  placeholder="Facebook Name"
  className="input"
/>


      <button
        onClick={handleSave}
        className="bg-blue-600 px-6 py-2 rounded-md mb-10"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>

      <h2 className="text-xl mb-4 font-semibold">Images</h2>

      <div className="md:grid grid-cols-3 flex-col gap-8">
        <div>
          <p>Profile Image</p>
          {profile.profileImage && (
            <img src={profile.profileImage} alt="" className="h-24 w-24 rounded-full mb-2" />
          )}
          <input type="file" onChange={(e) => handleImageUpload(e, "profileImage")} />
        </div>

        <div>
          <p>Highlight Image</p>
          {profile.highlightImage && (
            <img src={profile.highlightImage} alt="" className="h-24 mb-2" />
          )}
          <input type="file" onChange={(e) => handleImageUpload(e, "highlightImage")} />
        </div>

        <div>
          <p>Post Image</p>
          {profile.postImage && (
            <img src={profile.postImage} alt="" className="h-24 mb-2" />
          )}
          <input type="file" onChange={(e) => handleImageUpload(e, "postImage")} />
        </div>
      </div>
    </div>
  );
}
