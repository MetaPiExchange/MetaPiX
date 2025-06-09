import express from 'express';

const router = express.Router();

// Temporary mock NFT data
const mockNFTs = [
  {
    id: '1',
    title: 'Moon Pioneer',
    image: 'https://via.placeholder.com/300x300?text=Moon+Pioneer',
    creator: 'SatoshiPi',
    price: 15,
  },
  {
    id: '2',
    title: 'Solar Nova',
    image: 'https://via.placeholder.com/300x300?text=Solar+Nova',
    creator: 'PiQueen',
    price: 25,
  },
  {
    id: '3',
    title: 'Stellar Script',
    image: 'https://via.placeholder.com/300x300?text=Stellar+Script',
    creator: 'XPiDude',
    price: 12,
  },
];

router.get('/nfts', (req, res) => {
  res.status(200).json({ nfts: mockNFTs });
});

export default router;
