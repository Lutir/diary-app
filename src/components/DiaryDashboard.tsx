'use client';

import { Plus, Calendar, Edit2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import ThemeToggle from './ThemeToggle';

interface Entry {
    id: string;
    title: string;
    content: string;
    created_at: string;
}

interface DiaryDashboardProps {
    entries: Entry[];
    onCreateNew: () => void;
    onEdit: (entry: Entry) => void;
}

export default function DiaryDashboard({ entries, onCreateNew, onEdit }: DiaryDashboardProps) {
    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '3rem 1rem',
            animation: 'fadeIn 0.5s ease-out'
        }}>
            <header style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '4rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <h1 style={{
                        fontSize: '1.5rem',
                        fontWeight: '700',
                        letterSpacing: '-0.5px',
                        color: 'var(--text-color)'
                    }}>ritul's diary</h1>
                    <ThemeToggle />
                </div>

                <button
                    onClick={onCreateNew}
                    style={{
                        backgroundColor: 'var(--accent-pastel)',
                        color: '#8a5a44',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'transform 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <Plus size={24} />
                </button>
            </header>

            <div style={{ display: 'grid', gap: '2rem' }}>
                {entries.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#aaa', marginTop: '4rem' }}>
                        <p>No entries yet. Start writing!</p>
                    </div>
                ) : (
                    entries.map((entry) => (
                        <article key={entry.id} style={{
                            backgroundColor: 'var(--card-bg)',
                            padding: '2rem',
                            borderRadius: '16px',
                            boxShadow: 'var(--shadow-sm)',
                            transition: 'transform 0.2s',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                marginBottom: '1rem'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: '#aaa',
                                    fontSize: '0.85rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px'
                                }}>
                                    <Calendar size={14} />
                                    {new Date(entry.created_at).toLocaleDateString('en-US', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit(entry);
                                    }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--text-color)',
                                        opacity: 0.5,
                                        cursor: 'pointer',
                                        padding: '0.5rem'
                                    }}
                                    title="Edit Entry"
                                >
                                    <Edit2 size={16} />
                                </button>
                            </div>

                            <h2 style={{
                                fontSize: '1.8rem',
                                marginBottom: '1rem',
                                color: 'var(--text-color)',
                                fontFamily: 'var(--font-sans)',
                                fontWeight: 700
                            }}>
                                {entry.title || 'Untitled Entry'}
                            </h2>

                            <div style={{
                                color: 'var(--text-color)',
                                lineHeight: '1.8',
                                fontFamily: 'var(--font-serif)',
                                opacity: 0.9
                            }} className="markdown-content">
                                <ReactMarkdown
                                    components={{
                                        img: ({ node, ...props }) => (
                                            <img
                                                {...props}
                                                style={{
                                                    maxWidth: '100%',
                                                    borderRadius: '8px',
                                                    marginTop: '1rem',
                                                    marginBottom: '1rem'
                                                }}
                                            />
                                        )
                                    }}
                                >
                                    {entry.content}
                                </ReactMarkdown>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </div>
    );
}
