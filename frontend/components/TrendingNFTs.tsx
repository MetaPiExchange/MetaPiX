import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TrendingNFTs.scss';

interface NFT {
  id: string;
  title: string;
  creator: string;
  image: string;
  price: number;
  volume: number;
  likes: number;
  timestamp: string;
}

const TrendingNFTs: React.FC = () => {
  const [nfts, setNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const response = await axios.get('/api/nfts?sort=volume_desc&limit=10');
        setNFTs(response.data.nfts);
      } catch (error) {
        console.error('Failed to fetch NFTs', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNFTs();
  }, []);

  if (loading) return <div className="trending-nfts">Loading NFTs...</div>;

  return (
    <div className="trending-nfts">
      <h2>🔥 Trending NFTs</h2>
      <div className="nft-grid">
        {nfts.map(nft => (
          <div className="nft-card" key={nft.id}>
            <img src={nft.image} alt={nft.title} />
            <div className="nft-info">
              <h3>{nft.title}</h3>
              <p>By: {nft.creator}</p>
              <p>Price: {nft.price} PI</p>
              <p>Volume: {nft.volume}</p>
              <p>❤️ {nft.likes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNFTs;
