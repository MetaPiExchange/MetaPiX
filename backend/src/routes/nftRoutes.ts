import express from 'express';

const router = express.Router();

// Mock data: Individual NFTs
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

// Mock data: Trending NFT collections
const trendingCollections = [
  {
    id: 'c1',
    name: 'Pixel Pi Pioneers',
    volume: 4800,
    items: 120,
    image: 'https://via.placeholder.com/300x300?text=Pixel+Pi+Pioneers',
  },
  {
    id: 'c2',
    name: 'Astral Archives',
    volume: 3300,
    items: 87,
    image: 'https://via.placeholder.com/300x300?text=Astral+Archives',
  },
  {
    id: 'c3',
    name: 'Chain Chimps',
    volume: 2750,
    items: 60,
    image: 'https://via.placeholder.com/300x300?text=Chain+Chimps',
  },
];

// GET /api/nfts - Optional query filtering
router.get('/nfts', (req, res) => {
  const { title, creator, minPrice, maxPrice } = req.query;

  let filteredNFTs = [...mockNFTs];

  if (title) {
    filteredNFTs = filteredNFTs.filter(nft =>
      nft.title.toLowerCase().includes((title as string).toLowerCase())
    );
  }

  if (creator) {
    filteredNFTs = filteredNFTs.filter(nft =>
      nft.creator.toLowerCase().includes((creator as string).toLowerCase())
    );
  }

  if (minPrice) {
    filteredNFTs = filteredNFTs.filter(nft =>
      nft.price >= parseFloat(minPrice as string)
    );
  }

  if (maxPrice) {
    filteredNFTs = filteredNFTs.filter(nft =>
      nft.price <= parseFloat(maxPrice as string)
    );
  }

  res.status(200).json({ nfts: filteredNFTs });
});
// GET /api/nfts/trending - Return trending collections
router.get('/nfts/trending', (req, res) => {
  res.status(200).json({ collections: trendingCollections });
});

export default router;
