'use client';

import { ArrowLeft, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Entry {
    id: string;
    title: string;
    content: string;
    created_at: string;
}

interface EntryReaderProps {
    entry: Entry;
    onBack: () => void;
}

export default function EntryReader({ entry, onBack }: EntryReaderProps) {
    return (
        <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '3rem 1rem',
            animation: 'fadeIn 0.5s ease-out'
        }}>
            <button
                onClick={onBack}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: 'var(--text-color)',
                    background: 'none',
                    fontSize: '1rem',
                    opacity: 0.7,
                    marginBottom: '2rem',
                    cursor: 'pointer'
                }}
            >
                <ArrowLeft size={20} /> Back to Diary
            </button>

            <article>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    color: '#aaa',
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    marginBottom: '1rem'
                }}>
                    <Calendar size={14} />
                    {new Date(entry.created_at).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                </div>

                <h1 style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    marginBottom: '2rem',
                    color: 'var(--text-color)',
                    fontFamily: 'var(--font-sans)',
                    lineHeight: '1.2'
                }}>
                    {entry.title || 'Untitled Entry'}
                </h1>

                <div style={{
                    color: 'var(--text-color)',
                    lineHeight: '1.8',
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.2rem',
                    opacity: 0.9
                }} className="markdown-content">
                    <ReactMarkdown
                        components={{
                            img: ({ node, ...props }) => (
                                <img
                                    {...props}
                                    style={{
                                        maxWidth: '100%',
                                        borderRadius: '12px',
                                        marginTop: '2rem',
                                        marginBottom: '2rem',
                                        boxShadow: 'var(--shadow-md)'
                                    }}
                                />
                            )
                        }}
                    >
                        {entry.content}
                    </ReactMarkdown>
                </div>
            </article>
        </div>
    );
}
