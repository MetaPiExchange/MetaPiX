import React, { useEffect, useState } from 'react';
import './CreatorLeaderboard.scss';

type Creator = {
  id: string;
  name: string;
  avatarUrl: string;
  totalSales: number;
};

const CreatorLeaderboard = () => {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    // Replace with your backend API once it's connected
    const fetchCreators = async () => {
      const res = await fetch('/api/creators/leaderboard');
      const data = await res.json();
      setCreators(data);
    };

    fetchCreators();
  }, []);

  return (
    <section className="creator-leaderboard">
      <h2>🏆 Top Creators</h2>
      <ul>
        {creators.map((creator, index) => (
          <li key={creator.id} className="creator-card">
            <span className="rank">#{index + 1}</span>
            <img src={creator.avatarUrl} alt={creator.name} className="avatar" />
            <div className="info">
              <strong>{creator.name}</strong>
              <p>{creator.totalSales} PI</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default CreatorLeaderboard;
