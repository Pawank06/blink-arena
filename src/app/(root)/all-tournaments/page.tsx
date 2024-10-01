"use client";
import { TournamentCard } from "@/components/tournament-card";
import React, { useEffect, useState } from "react";

interface Tournament {
  _id: string;
  organizationName: string;
  description: string;
  prizePool: string;
  tournamentId: string;
  date: string;
  time: string;
  image: string;
  location: string;
  totalTeamMembers: number;
  joinFees: number;
  joinFeesType: string;
}

const Page = () => {
  const [data, setData] = useState<Tournament[]>([]);
  console.log(data);

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

  return (
    <div className="flex gap-10 px-10 py-10 flex-wrap">
      {data.map((tournament) => (
        <TournamentCard
          key={tournament._id}
          tournamentId={tournament.tournamentId}
          title={tournament.organizationName}
          description={tournament.description}
          image={tournament.image}
          date={tournament.date}
          time={tournament.time}
          location={tournament.location}
          prizePool={tournament.prizePool}
        />
      ))}
    </div>
  );
};

export default Page;
