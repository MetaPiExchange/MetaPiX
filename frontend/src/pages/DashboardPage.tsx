import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DashboardPage.scss';

interface User {
  uid: string;
  username: string;
  walletAddress?: string;
}

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('/api/users/me', { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        console.error('Error fetching user:', err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Welcome to your Dashboard</h2>
      {user ? (
        <div className="user-info">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Wallet:</strong> {user.walletAddress || 'Not linked'}</p>
        </div>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

export default DashboardPage;
