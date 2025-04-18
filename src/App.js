import "./styles.css";
import Header from "./components/Header";
import HomePage from "./page/HomePage";
import LiveScore from "./page/livescore";
import Schedule from "./page/schedule";
import Teams from "./page/teams";
import News from "./page/news";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <Router>
      <Header />
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<HomePage />} />
          <Route path="/livescore" element={<LiveScore />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>
    </Router>
  );
}