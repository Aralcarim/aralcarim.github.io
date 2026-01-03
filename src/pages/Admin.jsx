import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../layout/Layout';
import { motion } from 'framer-motion';
import './Admin.css';

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'vaclavcinzia2025';

const categories = [
    { id: 'moments', label: 'Moments', color: '#fff3cd' },
    { id: 'friends', label: 'Friends', color: '#e7f5ff' },
    { id: 'family', label: 'Family', color: '#ffe4e6' },
];

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [photos, setPhotos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');
    const [selectedPhotos, setSelectedPhotos] = useState(new Set());
    const [bulkCategory, setBulkCategory] = useState('');

    // Check session storage on mount
    useEffect(() => {
        const auth = sessionStorage.getItem('adminAuth');
        if (auth === 'true') {
            setIsAuthenticated(true);
            loadPhotos();
        }
    }, []);

    const loadPhotos = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/admin/gallery/load');
            if (!response.ok) throw new Error('Failed to load photos');
            const data = await response.json();
            setPhotos(data);
        } catch (error) {
            console.error('Error loading photos:', error);
            setSaveStatus({ type: 'error', message: 'Failed to load photos. Is dev server running?' });
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            sessionStorage.setItem('adminAuth', 'true');
            loadPhotos();
        } else {
            setPasswordError('Incorrect password');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminAuth');
        setPassword('');
        setPhotos([]);
    };

    const savePhotos = async () => {
        setSaving(true);
        setSaveStatus(null);
        try {
            const response = await fetch('/api/admin/gallery/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ photos }),
            });
            const result = await response.json();
            if (result.success) {
                setSaveStatus({ type: 'success', message: `Saved ${result.count} photos successfully!` });
                setTimeout(() => setSaveStatus(null), 3000);
            } else {
                setSaveStatus({ type: 'error', message: result.error || 'Failed to save' });
            }
        } catch (error) {
            setSaveStatus({ type: 'error', message: 'Failed to save photos. Is dev server running?' });
        } finally {
            setSaving(false);
        }
    };

    const updatePhotoCategory = (index, newCategory) => {
        const updated = [...photos];
        updated[index].category = newCategory;
        setPhotos(updated);
    };

    const filteredPhotos = useMemo(() => {
        if (filterCategory === 'all') return photos;
        return photos.filter(p => p.category === filterCategory);
    }, [photos, filterCategory]);

    const togglePhotoSelection = (index) => {
        const newSelected = new Set(selectedPhotos);
        const actualIndex = photos.indexOf(filteredPhotos[index]);
        if (newSelected.has(actualIndex)) {
            newSelected.delete(actualIndex);
        } else {
            newSelected.add(actualIndex);
        }
        setSelectedPhotos(newSelected);
    };

    const selectAllVisible = () => {
        const newSelected = new Set(selectedPhotos);
        filteredPhotos.forEach((photo, index) => {
            newSelected.add(photos.indexOf(photo));
        });
        setSelectedPhotos(newSelected);
    };

    const clearSelection = () => {
        setSelectedPhotos(new Set());
    };

    const applyBulkCategory = () => {
        if (!bulkCategory || selectedPhotos.size === 0) return;
        const updated = [...photos];
        selectedPhotos.forEach(index => {
            updated[index].category = bulkCategory;
        });
        setPhotos(updated);
        setSelectedPhotos(new Set());
    };

    const getCategoryCounts = () => {
        const counts = { all: photos.length };
        categories.forEach(cat => {
            counts[cat.id] = photos.filter(p => p.category === cat.id).length;
        });
        return counts;
    };

    const counts = getCategoryCounts();

    // Password screen
    if (!isAuthenticated) {
        return (
            <Layout>
                <div className="admin-page">
                    <motion.div
                        className="admin-login"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1>Gallery Admin</h1>
                        <p>Enter password to continue</p>
                        <form onSubmit={handleLogin}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                autoFocus
                            />
                            {passwordError && <div className="password-error">{passwordError}</div>}
                            <button type="submit">Login</button>
                        </form>
                    </motion.div>
                </div>
            </Layout>
        );
    }

    // Main admin interface
    return (
        <Layout>
            <div className="admin-page">
                <motion.div
                    className="admin-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1>Gallery Admin</h1>
                    <p>Manage photo categories</p>
                    <button className="btn-logout" onClick={handleLogout}>Logout</button>
                </motion.div>

                {saveStatus && (
                    <motion.div
                        className={`save-status ${saveStatus.type}`}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        {saveStatus.message}
                    </motion.div>
                )}

                {loading ? (
                    <div className="loading">Loading photos...</div>
                ) : (
                    <>
                        {/* Filters and Stats */}
                        <motion.div
                            className="admin-controls"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <div className="admin-filters">
                                <button
                                    className={filterCategory === 'all' ? 'active' : ''}
                                    onClick={() => setFilterCategory('all')}
                                >
                                    All ({counts.all})
                                </button>
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        className={filterCategory === cat.id ? 'active' : ''}
                                        onClick={() => setFilterCategory(cat.id)}
                                    >
                                        {cat.label} ({counts[cat.id]})
                                    </button>
                                ))}
                            </div>

                            <div className="admin-actions">
                                <button onClick={selectAllVisible}>Select All Visible</button>
                                <button onClick={clearSelection} disabled={selectedPhotos.size === 0}>
                                    Clear Selection ({selectedPhotos.size})
                                </button>
                                {selectedPhotos.size > 0 && (
                                    <>
                                        <select
                                            value={bulkCategory}
                                            onChange={(e) => setBulkCategory(e.target.value)}
                                        >
                                            <option value="">Change selected to...</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.label}</option>
                                            ))}
                                        </select>
                                        <button
                                            className="btn-bulk-apply"
                                            onClick={applyBulkCategory}
                                            disabled={!bulkCategory}
                                        >
                                            Apply to {selectedPhotos.size} photos
                                        </button>
                                    </>
                                )}
                                <button
                                    className="btn-save"
                                    onClick={savePhotos}
                                    disabled={saving}
                                >
                                    {saving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </motion.div>

                        {/* Photo Grid */}
                        <div className="admin-photo-grid">
                            {filteredPhotos.map((photo, index) => {
                                const actualIndex = photos.indexOf(photo);
                                const isSelected = selectedPhotos.has(actualIndex);
                                return (
                                    <div
                                        key={photo.src}
                                        className={`admin-photo-item ${isSelected ? 'selected' : ''}`}
                                    >
                                        <div className="photo-checkbox">
                                            <input
                                                type="checkbox"
                                                checked={isSelected}
                                                onChange={() => togglePhotoSelection(index)}
                                            />
                                        </div>
                                        <img
                                            src={`/assets/gallery/thumbs/${photo.src}`}
                                            alt={photo.src}
                                        />
                                        <div className="photo-filename">{photo.src}</div>
                                        <select
                                            value={photo.category}
                                            onChange={(e) => updatePhotoCategory(actualIndex, e.target.value)}
                                            className="category-select"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.label}</option>
                                            ))}
                                        </select>
                                        <div
                                            className="category-badge"
                                            style={{ backgroundColor: categories.find(c => c.id === photo.category)?.color }}
                                        >
                                            {categories.find(c => c.id === photo.category)?.label}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="admin-footer">
                            <p>Total: {photos.length} photos</p>
                            <p>Showing: {filteredPhotos.length} photos</p>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
};

export default Admin;
