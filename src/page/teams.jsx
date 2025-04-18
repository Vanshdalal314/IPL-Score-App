import React, { useEffect, useState } from "react";
import { getTeams } from "../services/api";
import LoadingSpinner from "../components/ui/Loader";

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getTeams();
        setTeams(data);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
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
      <h1 className="text-2xl font-bold mb-4">Teams</h1>
      <div className="grid grid-cols-2 gap-4">
        {teams.map((team) => (
          <div key={team.id} className="bg-white p-4 shadow rounded-lg flex items-center gap-4">
            <img src={team.flag} alt={team.name} className="w-10 h-10" />
            <p className="text-lg font-medium">{team.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
