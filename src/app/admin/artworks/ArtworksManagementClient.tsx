'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Star, ArrowUpDown, Download, Palette, Image as ImageIcon, X, Save } from 'lucide-react';
import { artworks, categories } from '@/data/artworks';

export function ArtworksManagementClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [artworkList, setArtworkList] = useState(artworks);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '', category: 'Paintings', medium: '', year: new Date().getFullYear().toString(),
    dimensions: '', desc: '', artistsNote: '', featured: false, imageUrl: '', thumbUrl: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => { setMounted(true); setArtworkList(artworks); }, []);

  const filteredArtworks = artworkList.filter((art) => {
    const matchesCategory = filter === 'all' || art.category.toLowerCase().replace(/\s+/g, '-') === filter;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.medium.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => { const base64 = event.target?.result as string; setImagePreview(base64); setFormData(prev => ({ ...prev, imageUrl: base64, thumbUrl: base64 })); };
      reader.readAsDataURL(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => { const base64 = event.target?.result as string; setImagePreview(base64); setFormData(prev => ({ ...prev, imageUrl: base64, thumbUrl: base64 })); };
      reader.readAsDataURL(file);
    }
  };

  const startEdit = (artwork: typeof artworks[0]) => {
    setEditingId(artwork.id);
    setFormData({ title: artwork.title, category: artwork.category, medium: artwork.medium, year: artwork.year,
      dimensions: artwork.dimensions, desc: artwork.desc, artistsNote: artwork.artistsNote || '',
      featured: artwork.featured, imageUrl: artwork.imageUrl, thumbUrl: artwork.thumbUrl });
    setImagePreview(artwork.imageUrl);
  };

  const cancelEdit = () => { setEditingId(null); setFormData({ title: '', category: 'Paintings', medium: '', year: new Date().getFullYear().toString(), dimensions: '', desc: '', artistsNote: '', featured: false, imageUrl: '', thumbUrl: '' }); setImagePreview(''); };

  const saveArtwork = async () => {
    if (!formData.title.trim() || !formData.category) return;
    const updated = editingId
      ? artworkList.map(a => a.id === editingId ? { ...a, ...formData, id: editingId } : a)
      : [...artworkList, { ...formData, id: formData.title.toLowerCase().replace(/\s+/g, '-'), order: artworkList.length + 1 }];
    setArtworkList(updated);
    cancelEdit();
  };

  const deleteArtwork = (id: string) => { if (!confirm('Delete this artwork?')) return; setArtworkList(artworkList.filter(a => a.id !== id)); };

  const moveArtwork = (id: string, direction: number) => {
    const index = artworkList.findIndex(a => a.id === id);
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= artworkList.length) return;
    const updated = [...artworkList]; [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    updated.forEach((a, i) => a.order = i + 1);
    setArtworkList(updated);
  };

  const exportData = () => { const data = JSON.stringify(artworkList, null, 2); const blob = new Blob([data], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'artworks.json'; a.click(); URL.revokeObjectURL(url); };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[var(--color-primary)] border-t-transparent rounded-full" />
      </div>
    );
  }

  const sortedArtworks = [...filteredArtworks].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border-default)] sticky top-0 z-40">
        <div className="container-custom flex items-center justify-between h-16">
          <h1 className="font-display text-xl font-semibold text-[var(--color-text)] flex items-center gap-3"><Palette size={24} className="text-[var(--color-primary)]" />Admin Panel</h1>
          <div className="flex items-center gap-4">
            <button onClick={exportData} className="btn-ghost text-sm"><Download size={16} />Export JSON</button>
            <Link href="/admin/dashboard" className="btn-ghost text-sm"><span className="hidden sm:inline">Dashboard</span></Link>
            <Link href="/api/auth/logout" className="btn-ghost text-sm">Logout</Link>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card p-6 rounded-2xl">
              <h2 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-4 flex items-center gap-2">
                {editingId ? 'Edit Artwork' : 'Add New Artwork'}
                <span className="text-[var(--text-xs)] text-[var(--color-text-muted)]">({artworkList.length} total)</span>
              </h2>
              <form onSubmit={(e) => { e.preventDefault(); saveArtwork(); }} className="space-y-4">
                <div><label className="label">Title *</label><input type="text" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} className="input-field" placeholder="Artwork title" /></div>
                <div><label className="label">Category *</label><select value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))} className="input-field">{categories.filter(c => c.id !== 'all').map(cat => <option key={cat.id} value={cat.slug}>{cat.name}</option>)}</select></div>
                <div className="grid sm:grid-cols-2 gap-4"><div><label className="label">Medium</label><input type="text" value={formData.medium} onChange={(e) => setFormData(prev => ({ ...prev, medium: e.target.value }))} className="input-field" placeholder="e.g., Acrylic on Canvas" /></div><div><label className="label">Year</label><input type="number" value={formData.year} onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))} className="input-field" min="2000" max={new Date().getFullYear() + 1} /></div></div>
                <div><label className="label">Dimensions</label><input type="text" value={formData.dimensions} onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))} className="input-field" placeholder="e.g., 24 x 18 in" /></div>
                <div><label className="label">Description</label><textarea value={formData.desc} onChange={(e) => setFormData(prev => ({ ...prev, desc: e.target.value }))} rows={3} className="input-field resize-y" placeholder="Artwork description..." /></div>
                <div><label className="label">Artist's Note (optional)</label><textarea value={formData.artistsNote} onChange={(e) => setFormData(prev => ({ ...prev, artistsNote: e.target.value }))} rows={2} className="input-field resize-y" placeholder="Behind-the-scenes story..." /></div>
                <div className="flex items-center gap-4"><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={formData.featured} onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))} className="w-4 h-4 rounded border-[var(--color-border-default)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]" /><span className="text-[var(--text-sm)] text-[var(--color-text)]">Featured in Hero/Featured section</span></label></div>
                <div><label className="label">Image (drag & drop or click)</label>
                  <div onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} className={`relative aspect-video rounded-xl border-4 border-dashed overflow-hidden cursor-pointer transition-colors ${dragActive ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/5' : 'border-[var(--color-border-default)]'}`}>
                    <input type="file" accept="image/*" onChange={handleFileSelect} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" id="image-upload" />
                    {imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" /> : <div className="flex flex-col items-center justify-center h-full p-4 text-center"><ImageIcon size={32} className="text-[var(--color-text-muted)] mb-2" /><p className="text-[var(--color-text-muted)]">Drag image here or click to browse</p><p className="text-[var(--text-xs)] text-[var(--color-text-subtle)] mt-1">JPG, PNG, WebP up to 2MB</p></div>}
                  </div>
                </div>
                <div className="flex gap-4 pt-4 border-t border-[var(--color-border-default)]">
                  {editingId ? (<><button type="submit" className="btn-primary flex-1 justify-center gap-2"><Save size={20} />Save Changes</button><button type="button" onClick={cancelEdit} className="btn-secondary"><X size={20} />Cancel</button></>) : (<button type="submit" className="btn-primary flex-1 justify-center gap-2"><Plus size={20} />Add Artwork</button>)}
                </div>
              </form>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="glass-card p-6 rounded-2xl sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
              <h2 className="font-display font-semibold text-[var(--text-h3)] text-[var(--color-text)] mb-4 flex items-center justify-between">All Artworks<span className="text-[var(--text-xs)] text-[var(--color-text-muted)] bg-[var(--color-surface-muted)] px-2 py-0.5 rounded">{artworkList.length}</span></h2>
              <div className="space-y-3">
                {sortedArtworks.map((artwork, index) => {
                    const isEditing = editingId === artwork.id;
                    const itemClass = `p-3 rounded-xl transition-all ${isEditing ? 'bg-[var(--color-primary)]/5 border border-[var(--color-primary)]' : 'hover:bg-[var(--color-surface-muted)]'}`;
                    return (
                      <motion.div key={artwork.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * index }}>
                        <div className={itemClass}>
                          <div className="flex items-start gap-3">
                          <div className="flex flex-col gap-1"><button onClick={() => moveArtwork(artwork.id, -1)} disabled={index === 0} className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] disabled:opacity-30" aria-label="Move up"><ArrowUpDown size={16} /></button><button onClick={() => moveArtwork(artwork.id, 1)} disabled={index === sortedArtworks.length - 1} className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] disabled:opacity-30" aria-label="Move down"><ArrowUpDown size={16} className="rotate-180" /></button></div>
                          <div className="relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0"><img src={artwork.thumbUrl || artwork.imageUrl} alt="" className="w-full h-full object-cover" />{artwork.featured && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[var(--color-primary)]" title="Featured" />}</div>
                          <div className="flex-1 min-w-0"><p className="font-medium text-[var(--color-text)] truncate">{artwork.title}</p><p className="text-[var(--text-xs)] text-[var(--color-text-muted)]">{artwork.category} · {artwork.year}</p></div>
                          <div className="flex items-center gap-1"><button onClick={() => startEdit(artwork)} className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] rounded" aria-label="Edit"><Edit size={14} /></button><button onClick={() => deleteArtwork(artwork.id)} className="p-1.5 text-[var(--color-text-muted)] hover:text-red-400 rounded" aria-label="Delete"><Trash2 size={14} /></button></div>
                        </div>
                      </div>
                      </motion.div>
                    );
                  })}
                {artworkList.length === 0 && <div className="text-center py-8 text-[var(--color-text-muted)]"><ImageIcon size={32} className="mx-auto mb-2 opacity-50" /><p>No artworks yet. Add your first piece!</p></div>}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}