"use client";

import React, { useState } from "react";

interface TournamentFormData {
  organizationName: string;
  email: string;
  image: string;
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
    image: "",
    description: "",
    prizePool: "",
    date: "",
    time: "",
    location: "",
    totalTeamMembers: 0,
    joinFees: 0,
    joinFeesType: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/tournaments/saveTournament", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Tournament created successfully");
        setFormData({
          organizationName: "",
          email: "",
          image: "",
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
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-black shadow-md rounded-md text-cyan-50">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Tournament</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label className="mb-2 font-semibold ">Organization Name</label>
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
          <label className="mb-2 font-semibold">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="p-3 rounded-md bg-stone-900 border border-stone-800"
            placeholder="Enter image URL"
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
          <label className="mb-2 font-semibold ">Time</label>
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
          className="w-full p-3 bg-white text-black font-semibold rounded-md hover:bg-white/90 transition-colors"
        >
          Create Tournament
        </button>
      </form>
    </div>
  );
};

export default TournamentForm;
