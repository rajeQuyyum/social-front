import React, { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../socket";

const API = import.meta.env.VITE_API_URL;


export default function AdminDM() {

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
  const [loading, setLoading] = useState(false);

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

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    setLoading(true);
    await axios.put(`${API}/api/profile`, data);
    setLoading(false);
  };

  const handleImageUpload = async (e) => {
  try {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    await axios.post(
      `${API}/api/profile/upload/dmProfileImage`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

  } catch (err) {
    console.log("UPLOAD ERROR:", err);
  }
};


  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-3xl mb-6 font-bold">DM Admin Panel</h1>

      {/* IMAGE */}
      <div className="mb-6">
        <p>DM Profile Image</p>
        {data.dmProfileImage && (
          <img
            src={data.dmProfileImage}
            className="h-24 w-24 rounded-full mb-2"
            alt=""
          />
        )}
        <input type="file" onChange={handleImageUpload} />
      </div>

      {/* BASIC INFO */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <input name="dmName" value={data.dmName || ""} onChange={handleChange} placeholder="DM Name" className="input" />
        <input name="dmUsername" value={data.dmUsername || ""} onChange={handleChange} placeholder="DM Username" className="input" />
        <input name="dmFollowers" value={data.dmFollowers || ""} onChange={handleChange} placeholder="Followers" className="input" />
        <input name="dmPosts" value={data.dmPosts || ""} onChange={handleChange} placeholder="Posts" className="input" />
        <input name="dmFollowsText" value={data.dmFollowsText || ""} onChange={handleChange} placeholder="Follows Text" className="input" />
        <input name="dmFollowsText2" value={data.dmFollowsText2 || ""} onChange={handleChange} placeholder="Follows Text2" className="input" />
        <input name="dmMutualText" value={data.dmMutualText || ""} onChange={handleChange} placeholder="Mutual Text" className="input" />
      </div>

      {/* MESSAGES SECTION */}
      <h2 className="text-xl mb-4">Messages</h2>

      {data.messages?.map((msg, index) => (
        <div key={index} className="flex gap-2 mb-4">
          <input
            value={msg.text || ""}
            onChange={(e) => {
              const updated = [...data.messages];
              updated[index].text = e.target.value;
              setData({ ...data, messages: updated });
            }}
            className="input flex-1"
          />

          <button
            className="bg-red-600 px-3 rounded"
            onClick={() => {
              const updated = data.messages.filter((_, i) => i !== index);
              setData({ ...data, messages: updated });
            }}
          >
            Delete
          </button>
        </div>
      ))}

      <button
        className="bg-gray-700 px-4 py-2 rounded mb-6"
        onClick={() =>
          setData({
            ...data,
            messages: [...(data.messages || []), { text: "" }]
          })
        }
      >
        Add Message
      </button>

      {/* SAVE */}
      <div>
        <button
          onClick={handleSave}
          className="bg-blue-600 px-6 py-2 rounded"
        >
          {loading ? "Saving..." : "Save DM Changes"}
        </button>
      </div>

    </div>
  );
}
