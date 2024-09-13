"use client";

import { useState, useEffect } from "react";

// Define the structure of your tournament data
interface Tournament {
  id: string;
  name: string;
  description: string;
  // Add other fields as needed
}

export default function JoinTournament({
  params,
}: {
  params: { tournamentId: string };
}) {
  const { tournamentId } = params;

  // State for storing tournament data, loading state, and errors
  const [tournamentData, setTournamentData] = useState<Tournament | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch tournament data
    const fetchTournamentData = async () => {
      try {
        const response = await fetch(`/api/tournaments/${tournamentId}`);
        if (!response.ok) {
          throw new Error("Tournament not found");
        }
        const data: Tournament = await response.json(); // Typecast response data
        setTournamentData(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTournamentData();
  }, [tournamentId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {tournamentData ? (
        <>
          <h1>Join Tournament: {tournamentData.name}</h1>
          <p>{tournamentData.description}</p>
        </>
      ) : (
        <p>Tournament not found</p>
      )}
    </div>
  );
}
