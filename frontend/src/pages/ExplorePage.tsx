import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ExplorePage.scss';

interface NFT {
  id: string;
  title: string;
  image: string;
  creator: string;
  price: number;
}

const ExplorePage = () => {
  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    const fetchNFTs = async () => {
      try {
        const res = await axios.get('/api/nfts'); // Your backend route
        setNfts(res.data.nfts);
      } catch (err) {
        console.error('Failed to fetch NFTs', err);
      }
    };

    fetchNFTs();
  }, []);

  return (
    <div className="explore-container">
      <h2>Explore NFTs</h2>
      <div className="nft-grid">
        {nfts.map(nft => (
          <div className="nft-card" key={nft.id}>
            <img src={nft.image} alt={nft.title} className="nft-image" />
            <h3>{nft.title}</h3>
            <p>Creator: {nft.creator}</p>
            <p>Price: {nft.price} PI</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExplorePage;
