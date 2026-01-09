'use client';

import { useState, useRef } from 'react';
import { Save, X, Image as ImageIcon, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface EntryEditorProps {
    initialData?: { id?: string; title: string; content: string };
    onSave: (title: string, content: string, id?: string) => Promise<void>;
    onCancel: () => void;
}

export default function EntryEditor({ initialData, onSave, onCancel }: EntryEditorProps) {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = async () => {
        if (!title.trim() && !content.trim()) return;

        setIsSaving(true);
        await onSave(title, content, initialData?.id);
        setIsSaving(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);

            // Insert markdown image syntax at cursor position or end
            const imageMarkdown = `\n![${file.name}](${data.publicUrl})\n`;
            setContent(prev => prev + imageMarkdown);

        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Make sure you created the "images" bucket in Supabase!');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem 1rem',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            animation: 'fadeIn 0.3s ease-out'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '2rem'
            }}>
                <button
                    onClick={onCancel}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-color)',
                        background: 'none',
                        fontSize: '1rem',
                        opacity: 0.7
                    }}
                >
                    <X size={20} /> Cancel
                </button>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            backgroundColor: 'var(--card-bg)',
                            color: 'var(--text-color)',
                            padding: '0.6rem 1.2rem',
                            borderRadius: '20px',
                            fontWeight: '600',
                            border: '1px solid var(--border-color)',
                            cursor: isUploading ? 'wait' : 'pointer'
                        }}
                    >
                        {isUploading ? <Upload size={18} className="animate-spin" /> : <ImageIcon size={18} />}
                        {isUploading ? 'Uploading...' : 'Add Image'}
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            backgroundColor: 'var(--primary-pastel)',
                            color: '#2d5a45',
                            padding: '0.6rem 1.2rem',
                            borderRadius: '20px',
                            fontWeight: '600',
                            opacity: isSaving ? 0.7 : 1
                        }}
                    >
                        <Save size={18} />
                        {isSaving ? 'Saving...' : 'Save Entry'}
                    </button>
                </div>
            </div>

            <input
                type="text"
                placeholder="Dear Diary..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    border: 'none',
                    background: 'transparent',
                    marginBottom: '1.5rem',
                    width: '100%',
                    color: 'var(--text-color)',
                    outline: 'none',
                    padding: 0,
                    fontFamily: 'var(--font-sans)'
                }}
            />

            <textarea
                placeholder="Today I felt..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    resize: 'none',
                    fontSize: '1.2rem',
                    lineHeight: '1.8',
                    fontFamily: 'var(--font-serif)',
                    color: 'var(--text-color)',
                    outline: 'none',
                    padding: 0
                }}
                autoFocus
            />
        </div>
    );
}
