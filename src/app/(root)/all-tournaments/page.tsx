"use client";
import React, { useEffect, useState } from "react";

interface Tournament {
  _id: string;
  organizationName: string;
  description: string;
  prizePool: string;
  date: string;
  time: string;
  location: string;
  totalTeamMembers: number;
  joinFees: number;
  joinFeesType: string;
}

const Page = () => {
  const [data, setData] = useState<Tournament[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/all-tournaments", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const result = await response.json();
        setData(result.data);
      } else {
        console.error("Error fetching tournaments");
      }
    } catch (err) {
      console.error("Failed to fetch tournaments", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   console.log(data);

  return (
    <>
      <div className="text-white">
        <h1>All Tournaments</h1>
        <ul>
          {data.length > 0 ? (
            data.map((tournament) => (
              <li key={tournament._id}>
                <h2>{tournament.organizationName}</h2>
                <p>{tournament.description}</p>
                <p>{tournament.prizePool}</p>
                <p>{tournament.date}</p>
                <p>{tournament.time}</p>
                <p>{tournament.location}</p>
                <p>{tournament.totalTeamMembers}</p>
                <p>{tournament.joinFees}</p>
                <p>{tournament.joinFeesType}</p>
              </li>
            ))
          ) : (
            <p>No tournaments available</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default Page;
