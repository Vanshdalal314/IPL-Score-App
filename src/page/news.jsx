import { useEffect, useState } from "react";
import { getNews } from "../services/api";
import LoadingSpinner from "../components/ui/Loader";

export default function News() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        setNewsList(data);
      } catch (err) {
        setError("Unable to fetch news.");
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-600 text-center p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Latest Cricket News</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsList.map((newsItem, index) => (
          <div key={index} className="bg-white rounded shadow p-4 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold mb-2">{newsItem.title}</h3>
            <p className="text-gray-700 text-sm">{newsItem.description}</p>
            <a
              href={newsItem.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm mt-2 inline-block"
            >
              Read More →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}