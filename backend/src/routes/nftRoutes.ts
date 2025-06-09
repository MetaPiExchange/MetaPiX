import express from 'express';

const router = express.Router();

// ✅ Sample mock NFT data (replace with DB integration later)
const mockNFTs = [
  {
    id: '1',
    title: 'Meta Genesis',
    creator: 'pioneer01',
    image: 'https://example.com/meta1.png',
    price: 12,
    volume: 120,
    likes: 220,
    timestamp: '2025-06-01T10:00:00Z',
  },
  {
    id: '2',
    title: 'Pixel Prophet',
    creator: 'artverse',
    image: 'https://example.com/meta2.png',
    price: 8,
    volume: 90,
    likes: 160,
    timestamp: '2025-06-02T09:00:00Z',
  },
  {
    id: '3',
    title: 'Chainlight',
    creator: 'piqueen',
    image: 'https://example.com/meta3.png',
    price: 18,
    volume: 210,
    likes: 310,
    timestamp: '2025-06-04T14:00:00Z',
  },
];

// ✅ GET /api/nfts — Filter, Sort, Paginate
router.get('/nfts', (req, res) => {
  const { title, creator, minPrice, maxPrice, sort, page = '1', limit = '10' } = req.query;

  let filteredNFTs = [...mockNFTs];

  // 🔍 Filtering
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

  // 🔃 Sorting
  if (sort) {
    const [field, order] = (sort as string).split('_');
    filteredNFTs.sort((a, b) => {
      const aVal = a[field];
      const bVal = b[field];

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return order === 'desc'
          ? bVal.localeCompare(aVal)
          : aVal.localeCompare(bVal);
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        return order === 'desc' ? bVal - aVal : aVal - bVal;
      }

      return 0;
    });
  }

  // 📦 Pagination
  const pageNumber = parseInt(page as string, 10);
  const pageSize = parseInt(limit as string, 10);
  const start = (pageNumber - 1) * pageSize;
  const paginatedNFTs = filteredNFTs.slice(start, start + pageSize);

  res.status(200).json({
    nfts: paginatedNFTs,
    pagination: {
      total: filteredNFTs.length,
      page: pageNumber,
      limit: pageSize,
      pages: Math.ceil(filteredNFTs.length / pageSize),
    },
  });
});

export default router;
