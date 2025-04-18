import React, { useEffect, useState } from "react";
import { getLiveMatches } from "../services/api";
import LoadingSpinner from "../components/ui/Loader";

export default function LiveScore() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const data = await getLiveMatches();
        setMatches(data);
      } finally {
        setLoading(false);
      }
    };
    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Live Matches</h1>
      {matches.map((match) => (
        <div key={match.match_id} className="bg-white p-4 mb-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold">{match.team1_name} vs {match.team2_name}</h2>
          <p>{match.match_status}</p>
        </div>
      ))}
    </div>
  );
}
