import React, { useEffect, useState } from "react";
import { getSchedule } from "../services/api";
import LoadingSpinner from "../components/ui/Loader";

export default function Schedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getSchedule();
        console.log("Fetched Schedule:", data); // Log the data for debugging
        // Ensure data is an array before setting it
        if (Array.isArray(data)) {
          setSchedule(data);
        } else {
          console.error("Expected an array, but got:", data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
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
      <h1 className="text-2xl font-bold mb-4">Match Schedule</h1>
      {schedule.length > 0 ? (
        schedule.map((match) => (
          <div key={match.match_id} className="bg-white p-4 mb-4 shadow rounded-lg">
            <h2 className="text-lg font-semibold">{match.team1_name} vs {match.team2_name}</h2>
            <p>{match.date}</p>
            <p>{match.venue}</p>
          </div>
        ))
      ) : (
        <p>No schedule available.</p>
      )}
    </div>
  );
}