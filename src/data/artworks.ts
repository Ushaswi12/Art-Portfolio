import type { Artwork, Category, Collection } from '@/types';

export const artworks: Artwork[] = [
  {
    id: 'mock_post_0',
    title: 'Layering the soft sunset gradients on canvas. Simple wildflowers, messy desk, quiet afternoon.',
    category: 'Paintings',
    medium: 'Acrylic on Canvas',
    year: '2024',
    dimensions: '',
    imageUrl: '/images/instagram/sunset-meadow.jpg',
    thumbUrl: '/images/instagram/sunset-meadow.jpg',
    desc: 'Layering the soft sunset gradients on canvas. Simple wildflowers, messy desk, quiet afternoon.',
    featured: true,
    order: 1,
    available: true,
  },
  {
    id: 'mock_post_1',
    title: 'Focusing on the light in the eyes. Graphite on paper. Daily practice.',
    category: 'Sketches',
    medium: 'Graphite on Paper',
    year: '2024',
    dimensions: '',
    imageUrl: '/images/instagram/pencil-portrait-study.jpg',
    thumbUrl: '/images/instagram/pencil-portrait-study.jpg',
    desc: 'Focusing on the light in the eyes. Graphite on paper. Daily practice.',
    featured: true,
    order: 2,
    available: true,
  },
  {
    id: 'mock_post_2',
    title: 'Letting the watercolor flow where it wants. The paper does half the work.',
    category: 'Watercolor',
    medium: 'Watercolor on Paper',
    year: '2024',
    dimensions: '',
    imageUrl: '/images/instagram/watercolor-dreamscape.jpg',
    thumbUrl: '/images/instagram/watercolor-dreamscape.jpg',
    desc: 'Letting the watercolor flow where it wants. The paper does half the work.',
    featured: true,
    order: 3,
    available: true,
  },
  {
    id: 'mock_post_3',
    title: 'Hours of square knots becoming meditation. Natural dyes and cotton rope.',
    category: 'DIY Crafts',
    medium: 'Cotton Rope',
    year: '2024',
    dimensions: '',
    imageUrl: '/images/instagram/diy-macrame-wall.jpg',
    thumbUrl: '/images/instagram/diy-macrame-wall.jpg',
    desc: 'Hours of square knots becoming meditation. Natural dyes and cotton rope.',
    featured: true,
    order: 4,
    available: true,
  },
  {
    id: 'mock_post_4',
    title: 'Tiny clay mushrooms and forest spirits. Sculpture no bigger than a fingernail.',
    category: 'Mini Crafts',
    medium: 'Polymer Clay',
    year: '2024',
    dimensions: '',
    imageUrl: '/images/instagram/mini-clay-collection.jpg',
    thumbUrl: '/images/instagram/mini-clay-collection.jpg',
    desc: 'Tiny clay mushrooms and forest spirits. Sculpture no bigger than a fingernail.',
    featured: true,
    order: 5,
    available: true,
  },
  {
    id: 'mock_post_5',
    title: 'First successful stoneware firing. Love how the celadon glaze pools in the carvings.',
    category: 'Handmade Decor',
    medium: 'Stoneware, Celadon Glaze',
    year: '2024',
    dimensions: '',
    imageUrl: '/images/instagram/handmade-ceramic-vase.jpg',
    thumbUrl: '/images/instagram/handmade-ceramic-vase.jpg',
    desc: 'First successful stoneware firing. Love how the celadon glaze pools in the carvings.',
    featured: true,
    order: 6,
    available: true,
  },
  {
    id: 'mock_post_6',
    title: 'Stained underpainting to final highlights. Six hours compressed.',
    category: 'Paintings',
    medium: 'Oil on Canvas',
    year: '2024',
    dimensions: '',
    imageUrl: '/images/instagram/canvas-floral-burst.jpg',
    thumbUrl: '/images/instagram/canvas-floral-burst.jpg',
    desc: 'Stained underpainting to final highlights. Six hours compressed.',
    featured: false,
    order: 7,
    available: true,
  },
  {
    id: 'mock_post_7',
    title: 'Delicate leaves and ferns. Pressed flower techniques meet watercolor sketches.',
    category: 'Traditional Art',
    medium: 'Watercolor & Ink on Hot Press',
    year: '2024',
    dimensions: '',
    imageUrl: '/images/instagram/watercolor-botanical.jpg',
    thumbUrl: '/images/instagram/watercolor-botanical.jpg',
    desc: 'Delicate leaves and ferns. Pressed flower techniques meet watercolor sketches.',
    featured: false,
    order: 8,
    available: true,
  },
  {
    id: 'mock_post_8',
    title: 'Weeks of pressing, careful resin mixing. Preserving spring forever.',
    category: 'DIY Crafts',
    medium: 'Pressed Flowers, Resin, Wood Frame',
    year: '2024',
    dimensions: '',
    imageUrl: '/images/instagram/diy-pressed-flower.jpg',
    thumbUrl: '/images/instagram/diy-pressed-flower.jpg',
    desc: 'Weeks of pressing, careful resin mixing. Preserving spring forever.',
    featured: false,
    order: 9,
    available: true,
  },
  {
    id: 'mock_post_9',
    title: 'A tiny world in a glass dome. Microscopic trees and moss.',
    category: 'Mini Crafts',
    medium: 'Polymer Clay, Moss, LED Light, Glass Dome',
    year: '2024',
    dimensions: '',
    imageUrl: '/images/instagram/mini-diorama-forest.jpg',
    thumbUrl: '/images/instagram/mini-diorama-forest.jpg',
    desc: 'A tiny world in a glass dome. Microscopic trees and moss.',
    featured: false,
    order: 10,
    available: true,
  },
  {
    id: 'mock_post_10',
    title: 'Sunset colors, warm textures, gold leaf flakes. Abstract landscape study.',
    category: 'Canvas Paintings',
    medium: 'Acrylic & Gold Leaf on Canvas',
    year: '2024',
    dimensions: '',
    imageUrl: '/images/instagram/canvas-abstract-landscape.jpg',
    thumbUrl: '/images/instagram/canvas-abstract-landscape.jpg',
    desc: 'Sunset colors, warm textures, gold leaf flakes. Abstract landscape study.',
    featured: false,
    order: 11,
    available: true,
  },
  {
    id: 'mock_post_11',
    title: 'Stylized fanart sketch of my favorite character. Soft lighting study.',
    category: 'Fan Art',
    medium: 'Digital Illustration (Procreate)',
    year: '2024',
    dimensions: '',
    imageUrl: '/images/instagram/fanart-anime-portrait.jpg',
    thumbUrl: '/images/instagram/fanart-anime-portrait.jpg',
    desc: 'Stylized fanart sketch of my favorite character. Soft lighting study.',
    featured: false,
    order: 12,
    available: true,
  },
];

export const categories: Category[] = [
  { id: 'all', name: 'All', slug: 'all', order: 0 },
  { id: 'paintings', name: 'Paintings', slug: 'paintings', order: 1 },
  { id: 'sketches', name: 'Sketches', slug: 'sketches', order: 2 },
  { id: 'portraits', name: 'Portraits', slug: 'portraits', order: 3 },
  { id: 'traditional-art', name: 'Traditional Art', slug: 'traditional-art', order: 4 },
  { id: 'watercolor', name: 'Watercolor', slug: 'watercolor', order: 5 },
  { id: 'acrylic', name: 'Acrylic', slug: 'acrylic', order: 6 },
  { id: 'diy-crafts', name: 'DIY Crafts', slug: 'diy-crafts', order: 7 },
  { id: 'mini-crafts', name: 'Mini Crafts', slug: 'mini-crafts', order: 8 },
  { id: 'handmade-decor', name: 'Handmade Decor', slug: 'handmade-decor', order: 9 },
  { id: 'canvas-paintings', name: 'Canvas Paintings', slug: 'canvas-paintings', order: 10 },
  { id: 'fan-art', name: 'Fan Art', slug: 'fan-art', order: 11 },
];

export const collections: Collection[] = [
  {
    id: 'featured',
    title: 'Featured Collection',
    description: 'Hand-selected works that define the artistic journey.',
    coverImage: '/images/instagram/sunset-meadow.jpg',
    artworkIds: ['mock_post_0', 'mock_post_1', 'mock_post_2', 'mock_post_3', 'mock_post_4', 'mock_post_5'],
    order: 1,
  },
  {
    id: 'paintings-collection',
    title: 'Paintings',
    description: 'Expressive works in acrylic, oil, and mixed media.',
    coverImage: '/images/instagram/canvas-floral-burst.jpg',
    artworkIds: ['mock_post_0', 'mock_post_6', 'mock_post_10'],
    order: 2,
  },
  {
    id: 'works-on-paper',
    title: 'Works on Paper',
    description: 'Graphite, charcoal, watercolor, and ink studies.',
    coverImage: '/images/instagram/pencil-portrait-study.jpg',
    artworkIds: ['mock_post_1', 'mock_post_2', 'mock_post_7'],
    order: 3,
  },
  {
    id: 'craft-collection',
    title: 'Handmade Crafts',
    description: 'Macramé, ceramics, miniatures, and mixed media.',
    coverImage: '/images/instagram/diy-macrame-wall.jpg',
    artworkIds: ['mock_post_3', 'mock_post_4', 'mock_post_5', 'mock_post_8', 'mock_post_9'],
    order: 4,
  },
];

export const featuredArtworks = artworks.filter((a) => a.featured).sort((a, b) => a.order - b.order);

export const getArtworkById = (id: string): Artwork | undefined => artworks.find((a) => a.id === id);

export const getArtworksByCategory = (categoryId: string): Artwork[] => {
  if (categoryId === 'all') return artworks;
  const category = categories.find((c) => c.slug === categoryId);
  if (!category) return [];
  return artworks.filter((a) => a.category.toLowerCase().replace(/\s+/g, '-') === categoryId);
};

export const getArtworksByCollection = (collectionId: string): Artwork[] => {
  const collection = collections.find((c) => c.id === collectionId);
  if (!collection) return [];
  return collection.artworkIds.map((id) => getArtworkById(id)).filter((a): a is Artwork => a !== undefined);
};

export const getRelatedArtworks = (artworkId: string, limit = 4): Artwork[] => {
  const artwork = getArtworkById(artworkId);
  if (!artwork) return [];
  return artworks
    .filter((a) => a.id !== artworkId && a.category === artwork.category)
    .slice(0, limit);
};