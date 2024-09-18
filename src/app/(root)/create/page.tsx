"use client";

import React, { useState } from "react";

interface TournamentFormData {
  organizationName: string;
  email: string;
  image: File | null;
  description: string;
  prizePool?: string;
  date: string;
  time: string;
  location: string;
  totalTeamMembers: number;
  joinFees: number;
  joinFeesType: string;
}

const TournamentForm: React.FC = () => {
  const [formData, setFormData] = useState<TournamentFormData>({
    organizationName: "",
    email: "",
    image: null,
    description: "",
    prizePool: "",
    date: "",
    time: "",
    location: "",
    totalTeamMembers: 0,
    joinFees: 0,
    joinFeesType: "",
  });

  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as keyof TournamentFormData]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
      setFormData({
        ...formData,
        image: file,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === 'image' && formData[key]) {
        formDataToSend.append('image', formData[key]);
      } else {
        formDataToSend.append(key, formData[key] as any);
      }
    }

    try {
      const response = await fetch("/api/save-tournament", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.url);  // Assuming data.url contains the image URL
        console.log("Tournament created successfully");
        setFormData({
          organizationName: "",
          email: "",
          image: null,
          description: "",
          prizePool: "",
          date: "",
          time: "",
          location: "",
          totalTeamMembers: 0,
          joinFees: 0,
          joinFeesType: "",
        });
      } else {
        console.error("Error creating tournament");
      }
    } catch (err) {
      console.error("Failed to submit form", err);
    }
  };

  return (
    <div className="grid grid-cols-2 place-items-center mx-auto gap-20 mt-10 p-6 bg-black shadow-md rounded-md text-cyan-50 max-w-[1200px]">
      <div className="w-full max-w-[600px]">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Tournament</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Organization Name</label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              className="p-3 rounded-md bg-stone-900 border border-stone-800"
              placeholder="Enter organization name"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="p-3 rounded-md bg-stone-900 border border-stone-800"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="p-3 rounded-md bg-stone-900 border border-stone-800"
              accept="image/*"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="p-3 rounded-md bg-stone-900 border border-stone-800"
              placeholder="Enter description"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Prize Pool (optional)</label>
            <input
              type="text"
              name="prizePool"
              value={formData.prizePool}
              onChange={handleInputChange}
              className="p-3 bg-stone-900 border border-stone-800 rounded-md"
              placeholder="Enter Prize Pool"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="p-3 rounded-md bg-stone-900 border border-stone-800"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="p-3 bg-stone-900 border border-stone-800 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="p-3 bg-stone-900 border border-stone-800 rounded-md"
              required
              placeholder="Enter Tournament Location"
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Total Team Members</label>
            <input
              type="number"
              name="totalTeamMembers"
              value={formData.totalTeamMembers}
              onChange={handleInputChange}
              className="p-3 bg-stone-900 border border-stone-800 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Join Fees</label>
            <input
              type="number"
              name="joinFees"
              value={formData.joinFees}
              onChange={handleInputChange}
              className="p-3 bg-stone-900 border border-stone-800 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Join Fees Type</label>
            <select
              name="joinFeesType"
              value={formData.joinFeesType}
              onChange={handleInputChange}
              className="p-3 bg-stone-900 border border-stone-800 rounded-md"
              required
            >
              <option value="">Select</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-green-500 text-black font-semibold rounded-md hover:bg-green-500/90 transition-colors"
          >
            Create Tournament
          </button>
        </form>
      </div>
      <div className="w-full max-w-[600px] absolute top-16 right-20 md:hidden lg:block">
        <h1 className="text-2xl font-bold mb-6 text-start">Live Preview</h1>
        <div
          style={{
            width: "45%",
            backgroundColor: "#1b1b1b",
            color: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
          }}
        >
          <h2 className="text-xl font-bold mb-4">{formData.organizationName}</h2>
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Tournament"
              className="max-w-full rounded-md mb-4"
            />
          )}
          <p className="mb-4">{formData.description}</p>
          <p className="mb-2"><strong>Date:</strong> {formData.date}</p>
          <p className="mb-2"><strong>Time:</strong> {formData.time}</p>
          <p className="mb-2"><strong>Location:</strong> {formData.location}</p>
          <p className="mb-2"><strong>Prize Pool:</strong> {formData.prizePool}</p>
          <p className="mb-2"><strong>Total Team Members:</strong> {formData.totalTeamMembers}</p>
          <p className="mb-2"><strong>Join Fees:</strong> {formData.joinFees} {formData.joinFeesType}</p>
        </div>
      </div>
    </div>
  );
};

export default TournamentForm;
