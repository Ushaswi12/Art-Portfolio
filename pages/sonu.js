'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Lock, Unlock, Settings, Image as LucideImage, Plus, Trash2, GripVertical, Save, X, LogOut, Download } from 'lucide-react';
import Image from 'next/image';

const ADMIN_PASSWORD = 'ushaswi2024';
const STORAGE_KEY = 'ushaswi_admin_auth';
const ARTWORKS_KEY = 'ushaswi_admin_artworks';

const defaultArtworks = [
  {
    id: 'sunset-meadow',
    title: 'Sunset Meadow',
    category: 'Paintings',
    medium: 'Acrylic on Canvas',
    year: '2024',
    dimensions: '24 x 18 in',
    imageUrl: '/images/sunset-meadow.jpg',
    thumbUrl: '/images/sunset-meadow-thumb.jpg',
    desc: 'Vibrant acrylic landscape capturing wildflowers dancing in golden hour light. Layered impasto technique creates depth and movement in the meadow grass.',
    artistsNote: 'Painted en plein air during spring. The color shifts as the sun moved were incredible to witness.',
    featured: true,
    order: 1,
  },
  {
    id: 'pencil-portrait-study',
    title: 'Portrait Study No. 7',
    category: 'Sketches',
    medium: 'Graphite on Paper',
    year: '2024',
    dimensions: '11 x 14 in',
    imageUrl: '/images/pencil-portrait-study.jpg',
    thumbUrl: '/images/pencil-portrait-study-thumb.jpg',
    desc: 'Delicate graphite study exploring light and shadow on the human face. Cross-hatching technique builds form through patient layering.',
    artistsNote: 'Part of my daily sketch practice. This model had such expressive eyes—tried to capture that quiet intensity.',
    featured: true,
    order: 2,
  },
  {
    id: 'watercolor-dreamscape',
    title: 'Dreamscape',
    category: 'Traditional Art',
    medium: 'Watercolor on Cold Press',
    year: '2024',
    dimensions: '15 x 20 in',
    imageUrl: '/images/watercolor-dreamscape.jpg',
    thumbUrl: '/images/watercolor-dreamscape-thumb.jpg',
    desc: 'Ethereal watercolor blending wet-on-wet washes with detailed dry-brush work. The piece flows between abstraction and suggestion.',
    artistsNote: 'Watercolor teaches you to let go of control. The happy accidents became the best parts.',
    featured: true,
    order: 3,
  },
  {
    id: 'diy-macrame-wall',
    title: 'Woven Horizons',
    category: 'DIY Crafts',
    medium: 'Cotton Rope, Driftwood, Natural Dyes',
    year: '2024',
    dimensions: '18 x 24 in',
    imageUrl: '/images/diy-macrame-wall.jpg',
    thumbUrl: '/images/diy-macrame-wall-thumb.jpg',
    desc: 'Large-scale macramé wall hanging with hand-dyed gradient fibers. Traditional knotting techniques meet contemporary color theory.',
    artistsNote: 'First large macramé piece. My fingers were sore for days but the meditative rhythm was worth it.',
    featured: false,
    order: 4,
  },
  {
    id: 'mini-clay-collection',
    title: 'Tiny Treasures',
    category: 'Mini Crafts',
    medium: 'Polymer Clay, Acrylic Paint',
    year: '2024',
    dimensions: 'Various (1-3 in each)',
    imageUrl: '/images/mini-clay-collection.jpg',
    thumbUrl: '/images/mini-clay-collection-thumb.jpg',
    desc: 'Collection of miniature hand-sculpted figurines—mushrooms, cottages, forest creatures. Each piece baked and hand-painted with microscopic detail.',
    artistsNote: 'Made these for a craft fair. People couldn\'t believe they were handmade at this scale.',
    featured: true,
    order: 5,
  },
  {
    id: 'handmade-ceramic-vase',
    title: 'Earth & Fire Vessel',
    category: 'Handmade Decor',
    medium: 'Stoneware, Celadon Glaze',
    year: '2023',
    dimensions: '10 x 8 in',
    imageUrl: '/images/handmade-ceramic-vase.jpg',
    thumbUrl: '/images/handmade-ceramic-vase-thumb.jpg',
    desc: 'Wheel-thrown stoneware vase with hand-carved surface decoration. Celadon glaze pools beautifully in the carved lines.',
    artistsNote: 'First successful celadon firing. The glaze chemistry is fickle but when it works, it\'s magic.',
    featured: false,
    order: 6,
  },
  {
    id: 'canvas-floral-burst',
    title: 'Floral Burst',
    category: 'Canvas Paintings',
    medium: 'Oil on Canvas',
    year: '2024',
    dimensions: '30 x 40 in',
    imageUrl: '/images/canvas-floral-burst.jpg',
    thumbUrl: '/images/canvas-floral-burst-thumb.jpg',
    desc: 'Expressive oil painting of peonies in full bloom. Thick impasto strokes capture the lush texture of petals and the play of light.',
    artistsNote: 'Painted from life in my garden. The flowers wilted halfway through but the memory stayed fresh.',
    featured: true,
    order: 7,
  },
  {
    id: 'fanart-studio-ghibli',
    title: 'Spirited Away Tribute',
    category: 'Fan Art',
    medium: 'Digital Illustration (Procreate)',
    year: '2023',
    dimensions: '3000 x 4000 px',
    imageUrl: '/images/fanart-studio-ghibli.jpg',
    thumbUrl: '/images/fanart-studio-ghibli-thumb.jpg',
    desc: 'Personal tribute to Studio Ghibli\'s masterpiece. Chihiro stands at the bathhouse entrance, rendered in soft painterly digital brushwork.',
    artistsNote: 'Ghibli films shaped my artistic soul. This was a love letter to Miyazaki\'s world.',
    featured: false,
    order: 8,
  },
  {
    id: 'charcoal-figure-study',
    title: 'Seated Figure',
    category: 'Sketches',
    medium: 'Charcoal on Toned Paper',
    year: '2024',
    dimensions: '18 x 24 in',
    imageUrl: '/images/charcoal-figure-study.jpg',
    thumbUrl: '/images/charcoal-figure-study-thumb.jpg',
    desc: 'Life drawing session capture—gestural charcoal marks finding form through shadow. White chalk highlights lift the figure from the mid-tone paper.',
    artistsNote: '3-hour pose. The model\'s stillness was remarkable. Charcoal dust everywhere by the end.',
    featured: false,
    order: 9,
  },
  {
    id: 'portrait-grandmother',
    title: 'Amma\'s Hands',
    category: 'Portraits',
    medium: 'Oil on Linen',
    year: '2024',
    dimensions: '16 x 20 in',
    imageUrl: '/images/portrait-grandmother.jpg',
    thumbUrl: '/images/portrait-grandmother-thumb.jpg',
    desc: 'Intimate portrait of my grandmother\'s hands—wrinkled, weathered, beautiful. Each line tells a story of decades of care and creation.',
    artistsNote: 'Most personal piece I\'ve made. She cried when she saw it. So did I.',
    featured: true,
    order: 10,
  },
  {
    id: 'watercolor-botanical',
    title: 'Monstera Study',
    category: 'Traditional Art',
    medium: 'Watercolor & Ink on Hot Press',
    year: '2024',
    dimensions: '12 x 16 in',
    imageUrl: '/images/watercolor-botanical.jpg',
    thumbUrl: '/images/watercolor-botanical-thumb.jpg',
    desc: 'Botanical illustration combining precise ink linework with luminous watercolor washes. Scientific accuracy meets artistic interpretation.',
    artistsNote: 'From my plant parent phase. Drawing plants teaches you to really *see* structure.',
    featured: false,
    order: 11,
  },
  {
    id: 'diy-pressed-flower',
    title: 'Pressed Meadow',
    category: 'DIY Crafts',
    medium: 'Pressed Flowers, Resin, Wood Frame',
    year: '2023',
    dimensions: '12 x 12 in',
    imageUrl: '/images/diy-pressed-flower.jpg',
    thumbUrl: '/images/diy-pressed-flower-thumb.jpg',
    desc: 'Real flowers and leaves pressed for weeks, then arranged in resin. Preserves the ephemeral beauty of spring forever.',
    artistsNote: 'Collected these on morning walks. Each flower has a memory attached.',
    featured: false,
    order: 12,
  },
  {
    id: 'mini-diorama-forest',
    title: 'Enchanted Grove',
    category: 'Mini Crafts',
    medium: 'Polymer Clay, Moss, LED Light, Glass Dome',
    year: '2024',
    dimensions: '4 x 4 x 6 in',
    imageUrl: '/images/mini-diorama-forest.jpg',
    thumbUrl: '/images/mini-diorama-forest-thumb.jpg',
    desc: 'Tiny illuminated forest scene under glass. Hand-sculpted mushrooms, ferns, and a winding path with a working warm LED light.',
    artistsNote: 'The tiny LED was a nightmare to wire but the glow makes it feel alive.',
    featured: false,
    order: 13,
  },
  {
    id: 'handmade-woven-basket',
    title: 'Heritage Weave',
    category: 'Handmade Decor',
    medium: 'Rattan, Natural Fibers, Leather Handles',
    year: '2023',
    dimensions: '14 x 10 x 8 in',
    imageUrl: '/images/handmade-woven-basket.jpg',
    thumbUrl: '/images/handmade-woven-basket-thumb.jpg',
    desc: 'Traditional basket weaving technique learned from local artisans. Functional art—beautiful enough to display, sturdy enough to use.',
    artistsNote: 'Spent a weekend with a master weaver in Kerala. My hands still remember the rhythm.',
    featured: false,
    order: 14,
  },
  {
    id: 'canvas-abstract-landscape',
    title: 'Horizon Lines',
    category: 'Canvas Paintings',
    medium: 'Acrylic & Gold Leaf on Canvas',
    year: '2024',
    dimensions: '36 x 48 in',
    imageUrl: '/images/canvas-abstract-landscape.jpg',
    thumbUrl: '/images/canvas-abstract-landscape-thumb.jpg',
    desc: 'Abstracted landscape with layered atmospheric perspective. Gold leaf catches light differently throughout the day, changing the piece\'s mood.',
    artistsNote: 'First time using gold leaf. It\'s terrifyingly delicate but the luminosity is unmatched.',
    featured: false,
    order: 15,
  },
  {
    id: 'fanart-anime-portrait',
    title: 'Demon Slayer - Nezuko',
    category: 'Fan Art',
    medium: 'Digital Painting (Photoshop)',
    year: '2023',
    dimensions: '2500 x 3500 px',
    imageUrl: '/images/fanart-anime-portrait.jpg',
    thumbUrl: '/images/fanart-anime-portrait-thumb.jpg',
    desc: 'Nezuko Kamado in a quiet moment, bamboo muzzle glowing softly. Focus on the contrast between her demon nature and gentle humanity.',
    artistsNote: 'Drew this during a marathon rewatch. The bamboo texture took forever but was so satisfying.',
    featured: false,
    order: 16,
  },
];

const categories = [
  'Paintings', 'Sketches', 'Portraits', 'Traditional Art', 
  'Watercolor', 'Acrylic', 'DIY Crafts', 'Mini Crafts', 
  'Handmade Decor', 'Canvas Paintings', 'Fan Art'
];

export default function AdminPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [artworks, setArtworks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Paintings',
    medium: '',
    year: new Date().getFullYear().toString(),
    dimensions: '',
    desc: '',
    artistsNote: '',
    featured: false,
    imageUrl: '',
    thumbUrl: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') {
      setAuthenticated(true);
    }
    setCheckingAuth(false);
  }, []);

  useEffect(() => {
    if (authenticated) {
      const saved = localStorage.getItem(ARTWORKS_KEY);
      if (saved) {
        try {
          setArtworks(JSON.parse(saved));
        } catch {
          setArtworks(defaultArtworks);
          localStorage.setItem(ARTWORKS_KEY, JSON.stringify(defaultArtworks));
        }
      } else {
        setArtworks(defaultArtworks);
        localStorage.setItem(ARTWORKS_KEY, JSON.stringify(defaultArtworks));
      }
    }
  }, [authenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, 'true');
      setAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthenticated(false);
    setEditingId(null);
  };

  const saveArtworks = (updated) => {
    localStorage.setItem(ARTWORKS_KEY, JSON.stringify(updated));
    setArtworks(updated);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        setImagePreview(base64);
        if (editingId) {
          setFormData(prev => ({ ...prev, imageUrl: base64, thumbUrl: base64 }));
        } else {
          setFormData(prev => ({ ...prev, imageUrl: base64, thumbUrl: base64 }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target.result;
        setImagePreview(base64);
        setFormData(prev => ({ ...prev, imageUrl: base64, thumbUrl: base64 }));
      };
      reader.readAsDataURL(file);
    }
  };

  const startEdit = (artwork) => {
    setEditingId(artwork.id);
    setFormData({
      title: artwork.title,
      category: artwork.category,
      medium: artwork.medium,
      year: artwork.year,
      dimensions: artwork.dimensions,
      desc: artwork.desc,
      artistsNote: artwork.artistsNote,
      featured: artwork.featured,
      imageUrl: artwork.imageUrl,
      thumbUrl: artwork.thumbUrl,
    });
    setImagePreview(artwork.imageUrl);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Paintings',
      medium: '',
      year: new Date().getFullYear().toString(),
      dimensions: '',
      desc: '',
      artistsNote: '',
      featured: false,
      imageUrl: '',
      thumbUrl: '',
    });
    setImagePreview('');
  };

  const saveArtwork = () => {
    if (!formData.title.trim() || !formData.category) return;
    
    setLoading(true);
    
    const updated = editingId 
      ? artworks.map(a => a.id === editingId ? { ...a, ...formData, id: editingId } : a)
      : [...artworks, { ...formData, id: formData.title.toLowerCase().replace(/\s+/g, '-'), order: artworks.length + 1 }];
    
    saveArtworks(updated);
    cancelEdit();
    setLoading(false);
  };

  const deleteArtwork = (id) => {
    if (!confirm('Delete this artwork?')) return;
    saveArtworks(artworks.filter(a => a.id !== id));
  };

  const moveArtwork = (id, direction) => {
    const index = artworks.findIndex(a => a.id === id);
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= artworks.length) return;
    
    const updated = [...artworks];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    updated.forEach((a, i) => a.order = i + 1);
    saveArtworks(updated);
  };

  const exportData = () => {
    const data = JSON.stringify(artworks, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'artworks.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 text-primary-accent animate-spin" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md brutal-card p-8"
        >
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl font-bold text-text mb-2">Admin Access</h1>
            <p className="text-text-muted">Enter password to manage portfolio</p>
          </div>
          
          <form onSubmit={handleLogin}>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm mb-4 text-center"
              >
                {error}
              </motion.p>
            )}
            
            <div className="relative mb-6">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="input-field pr-12"
                autoFocus
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            
            <button
              type="submit"
              className="btn-primary w-full justify-center gap-2"
            >
              <Unlock size={20} />
              Access Admin Panel
            </button>
          </form>
          
          <p className="text-center text-caption text-text-subtle mt-6">
            This page is hidden. Bookmark <code className="bg-surface-elevated px-1.5 py-0.5 rounded-none text-xs border-brutal border-border">/sonu</code> for access.
          </p>
        </motion.div>
      </div>
    );
  }

  const sortedArtworks = [...artworks].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="container-custom flex items-center justify-between h-16">
          <h1 className="font-heading text-xl font-bold text-text flex items-center gap-3">
            <Settings size={24} className="text-primary-accent" />
            Admin Panel — Ushaswi Potlapally
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={exportData}
              className="btn-ghost text-sm"
            >
              <Save size={16} />
              Export JSON
            </button>
            <button
              onClick={handleLogout}
              className="btn-ghost text-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="brutal-card p-6">
              <h2 className="font-heading text-lg font-bold text-text mb-4 flex items-center gap-2">
                {editingId ? 'Edit Artwork' : 'Add New Artwork'}
                <span className="text-caption text-text-muted">({artworks.length} total)</span>
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="input-field"
                    placeholder="Artwork title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="input-field"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">Medium</label>
                    <input
                      type="text"
                      value={formData.medium}
                      onChange={(e) => setFormData(prev => ({ ...prev, medium: e.target.value }))}
                      className="input-field"
                      placeholder="e.g., Acrylic on Canvas"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">Year</label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))}
                      className="input-field"
                      min="2000"
                      max={new Date().getFullYear() + 1}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Dimensions</label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))}
                    className="input-field"
                    placeholder="e.g., 24 x 18 in"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Description</label>
                  <textarea
                    value={formData.desc}
                    onChange={(e) => setFormData(prev => ({ ...prev, desc: e.target.value }))}
                    rows={3}
                    className="input-field resize-y"
                    placeholder="Artwork description for gallery..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Artist's Note (optional)</label>
                  <textarea
                    value={formData.artistsNote}
                    onChange={(e) => setFormData(prev => ({ ...prev, artistsNote: e.target.value }))}
                    rows={2}
                    className="input-field resize-y"
                    placeholder="Behind-the-scenes story..."
                  />
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                      className="w-4 h-4 rounded-none border-brutal border-border text-primary-accent focus:ring-primary-accent"
                    />
                    <span className="text-sm text-text">Featured in Hero/Featured section</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">Image (drag & drop or click)</label>
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={`relative aspect-video rounded-none border-4 border-dashed ${
                      dragActive ? 'border-primary-accent bg-primary-accent/5' : 'border-border'
                    } overflow-hidden cursor-pointer transition-colors`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="image-upload"
                    />
                    {imagePreview ? (
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                        sizes="100%"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                        <LucideImage size={32} className="text-text-muted mb-2" />
                        <p className="text-text-muted">Drag image here or click to browse</p>
                        <p className="text-caption text-text-subtle mt-1">JPG, PNG, WebP up to 2MB</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-border">
                  {editingId ? (
                    <>
                      <button
                        onClick={saveArtwork}
                        disabled={loading || !formData.title.trim()}
                        className="btn-primary flex-1 justify-center gap-2"
                      >
                        {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                        Save Changes
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="btn-secondary"
                      >
                        <X size={20} />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={saveArtwork}
                      disabled={loading || !formData.title.trim()}
                      className="btn-primary flex-1 justify-center gap-2"
                    >
                      {loading ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}
                      Add Artwork
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="brutal-card p-6 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              <h2 className="font-heading text-lg font-bold text-text mb-4 flex items-center justify-between">
                All Artworks
                <span className="text-caption text-text-muted bg-surface-elevated px-2 py-0.5 rounded-none border-brutal border-border">
                  {artworks.length}
                </span>
              </h2>
              
              <div className="space-y-3">
                {sortedArtworks.map((artwork, index) => (
                  <motion.div
                    key={artwork.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    className={`p-3 rounded-none transition-all ${
                      editingId === artwork.id 
                        ? 'bg-primary-accent/5 border-brutal border-primary-accent' 
                        : 'hover:bg-surface-elevated'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveArtwork(artwork.id, -1)}
                          disabled={index === 0}
                          className="p-1 text-text-muted hover:text-primary-accent disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Move up"
                        >
                          <GripVertical size={16} />
                        </button>
                        <button
                          onClick={() => moveArtwork(artwork.id, 1)}
                          disabled={index === sortedArtworks.length - 1}
                          className="p-1 text-text-muted hover:text-primary-accent disabled:opacity-30 disabled:cursor-not-allowed"
                          aria-label="Move down"
                        >
                          <GripVertical size={16} />
                        </button>
                      </div>
                      
                      <div className="relative w-16 h-12 rounded-none overflow-hidden flex-shrink-0 brutal-card">
                        <Image
                          src={artwork.thumbUrl || artwork.imageUrl}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                        {artwork.featured && (
                          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary-accent" title="Featured" />
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-text truncate">{artwork.title}</p>
                        <p className="text-xs text-text-muted">{artwork.category} · {artwork.year}</p>
                      </div>
                      
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => startEdit(artwork)}
                          className="p-1.5 text-text-muted hover:text-primary-accent rounded-none hover:bg-surface-elevated transition-colors"
                          aria-label="Edit"
                        >
                          <Settings size={14} />
                        </button>
                        <button
                          onClick={() => deleteArtwork(artwork.id)}
                          className="p-1.5 text-text-muted hover:text-red-400 rounded-none hover:bg-surface-elevated transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {artworks.length === 0 && (
                  <div className="text-center py-8 text-text-muted">
                    <LucideImage size={32} className="mx-auto mb-2 opacity-50" />
                    <p>No artworks yet. Add your first piece!</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}