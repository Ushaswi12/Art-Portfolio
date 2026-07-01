'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye, Star, ArrowUpDown, Download, Palette, Image as ImageIcon, X, Save, Loader2 } from 'lucide-react';
import { categories } from '@/data/artworks';
import type { Artwork } from '@/types';

export function ArtworksManagementClient() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [artworkList, setArtworkList] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '', category: 'Paintings', medium: '', year: new Date().getFullYear().toString(),
    dimensions: '', desc: '', artistsNote: '', featured: false, imageUrl: '', thumbUrl: '', instagramUrl: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const [dragActive, setDragActive] = useState(false);

  // Load artworks from the API on mount
  const fetchArtworks = useCallback(async () => {
    try {
      const res = await fetch('/api/artworks');
      if (!res.ok) throw new Error('Failed to fetch');
      const data: Artwork[] = await res.json();
      setArtworkList(data);
    } catch (err) {
      console.error('Could not load artworks:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { setMounted(true); fetchArtworks(); }, [fetchArtworks]);

  const filteredArtworks = artworkList.filter((art) => {
    const matchesCategory = filter === 'all' || art.category.toLowerCase().replace(/\s+/g, '-') === filter;
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         art.medium.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const uploadFile = async (file: File) => {
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    try {
      setSaving(true);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setImagePreview(data.url);
      setFormData(prev => ({ ...prev, imageUrl: data.url, thumbUrl: data.url }));
    } catch (err) {
      console.error('Upload error:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation(); setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      uploadFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      uploadFile(file);
    }
  };

  const startEdit = (artwork: Artwork) => {
    setEditingId(artwork.id);
    setFormData({ title: artwork.title, category: artwork.category, medium: artwork.medium, year: artwork.year,
      dimensions: artwork.dimensions, desc: artwork.desc, artistsNote: artwork.artistsNote || '',
      featured: artwork.featured, imageUrl: artwork.imageUrl, thumbUrl: artwork.thumbUrl, instagramUrl: artwork.instagramUrl || '' });
    setImagePreview(artwork.imageUrl);
  };

  const cancelEdit = () => { setEditingId(null); setFormData({ title: '', category: 'Paintings', medium: '', year: new Date().getFullYear().toString(), dimensions: '', desc: '', artistsNote: '', featured: false, imageUrl: '', thumbUrl: '', instagramUrl: '' }); setImagePreview(''); };

  const saveArtwork = async () => {
    if (!formData.title.trim() || !formData.category) return;
    setSaving(true);
    try {
      if (editingId) {
        // Update existing artwork
        const res = await fetch(`/api/artworks/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Update failed');
        const updated: Artwork = await res.json();
        setArtworkList(prev => prev.map(a => a.id === editingId ? updated : a));
      } else {
        // Create new artwork
        const res = await fetch('/api/artworks', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (!res.ok) throw new Error('Create failed');
        const created: Artwork = await res.json();
        setArtworkList(prev => [...prev, created]);
      }
      cancelEdit();
    } catch (err) {
      console.error('saveArtwork error:', err);
      alert('Failed to save artwork. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const deleteArtwork = async (id: string) => {
    if (!confirm('Delete this artwork? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/artworks/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      setArtworkList(prev => prev.filter(a => a.id !== id));
    } catch (err) {
      console.error('deleteArtwork error:', err);
      alert('Failed to delete artwork. Please try again.');
    }
  };

  const moveArtwork = async (id: string, direction: number) => {
    const index = artworkList.findIndex(a => a.id === id);
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= artworkList.length) return;
    const updated = [...artworkList];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    updated.forEach((a, i) => (a.order = i + 1));
    setArtworkList(updated);
    // Persist reorder to API
    try {
      await fetch('/api/artworks/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: updated.map(a => a.id) }),
      });
    } catch (err) {
      console.error('reorder error:', err);
    }
  };

  const exportData = () => { const data = JSON.stringify(artworkList, null, 2); const blob = new Blob([data], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'artworks.json'; a.click(); URL.revokeObjectURL(url); };

  if (!mounted || loading) {
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
                {/* Auto-Import from Instagram link */}
                <div className="p-4 rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 mb-6">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-2">Auto-Import from Instagram</h3>
                  <div className="flex gap-2">
                    <input 
                      type="url" 
                      placeholder="Paste Instagram post or reel link..." 
                      className="input-field flex-1"
                      id="insta-import-url"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        const input = document.getElementById('insta-import-url') as HTMLInputElement;
                        const url = input?.value?.trim();
                        if (!url) {
                          alert('Please paste an Instagram link first.');
                          return;
                        }
                        try {
                          setSaving(true);
                          const res = await fetch(`/api/admin/fetch-instagram-post?url=${encodeURIComponent(url)}`);
                          if (!res.ok) {
                            const err = await res.json();
                            throw new Error(err.error || 'Failed to fetch details');
                          }
                          const data = await res.json();
                          setFormData({
                            title: data.title,
                            category: data.category,
                            medium: data.medium,
                            year: data.year,
                            dimensions: data.dimensions,
                            desc: data.desc,
                            artistsNote: data.artistsNote,
                            featured: formData.featured,
                            imageUrl: data.imageUrl,
                            thumbUrl: data.thumbUrl,
                            instagramUrl: data.instagramUrl || url,
                          });
                          setImagePreview(data.imageUrl);
                          alert('Details imported successfully!');
                        } catch (err: any) {
                          console.error('Import error:', err);
                          alert(`Error: ${err.message}`);
                        } finally {
                          setSaving(false);
                        }
                      }}
                      disabled={saving}
                      className="btn-secondary whitespace-nowrap text-sm cursor-pointer"
                    >
                      Import Details
                    </button>
                  </div>
                  <p className="text-[10px] text-[var(--color-text-muted)] mt-1.5">
                    Will automatically extract description, year, category classification, and connect cover/post images.
                  </p>
                </div>

                <div><label className="label">Title *</label><input type="text" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} className="input-field" placeholder="Artwork title" /></div>
                <div><label className="label">Category *</label><select value={formData.category} onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))} className="input-field">{categories.filter(c => c.id !== 'all').map(cat => <option key={cat.id} value={cat.slug}>{cat.name}</option>)}</select></div>
                <div className="grid sm:grid-cols-2 gap-4"><div><label className="label">Medium</label><input type="text" value={formData.medium} onChange={(e) => setFormData(prev => ({ ...prev, medium: e.target.value }))} className="input-field" placeholder="e.g., Acrylic on Canvas" /></div><div><label className="label">Year</label><input type="number" value={formData.year} onChange={(e) => setFormData(prev => ({ ...prev, year: e.target.value }))} className="input-field" min="2000" max={new Date().getFullYear() + 1} /></div></div>
                <div className="grid sm:grid-cols-2 gap-4"><div><label className="label">Dimensions</label><input type="text" value={formData.dimensions} onChange={(e) => setFormData(prev => ({ ...prev, dimensions: e.target.value }))} className="input-field" placeholder="e.g., 24 x 18 in" /></div><div><label className="label">Instagram Post Link</label><input type="url" value={formData.instagramUrl} onChange={(e) => setFormData(prev => ({ ...prev, instagramUrl: e.target.value }))} className="input-field" placeholder="https://instagram.com/p/..." /></div></div>
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
                  {editingId ? (<><button type="submit" disabled={saving} className="btn-primary flex-1 justify-center gap-2">{saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}{saving ? 'Saving…' : 'Save Changes'}</button><button type="button" onClick={cancelEdit} className="btn-secondary"><X size={20} />Cancel</button></>) : (<button type="submit" disabled={saving} className="btn-primary flex-1 justify-center gap-2">{saving ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} />}{saving ? 'Adding…' : 'Add Artwork'}</button>)}
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