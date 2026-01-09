'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';

interface LockScreenProps {
    onUnlock: (password: string) => void;
    error?: string;
}

export default function LockScreen({ onUnlock, error }: LockScreenProps) {
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUnlock(password);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: 'var(--bg-color)',
            padding: '1rem'
        }}>
            <div style={{
                backgroundColor: 'var(--card-bg)',
                padding: '2.5rem',
                borderRadius: '24px',
                boxShadow: 'var(--shadow-md)',
                width: '100%',
                maxWidth: '400px',
                textAlign: 'center'
            }}>
                <div style={{
                    backgroundColor: 'var(--primary-pastel)',
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto',
                    color: '#fff'
                }}>
                    <Lock size={32} />
                </div>

                <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-color)' }}>My Secret Diary</h1>
                <p style={{ marginBottom: '2rem', color: '#888', fontSize: '0.9rem' }}>
                    Please enter the password to access.
                </p>

                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            width: '100%',
                            marginBottom: '1rem',
                            fontSize: '1rem'
                        }}
                        autoFocus
                    />

                    {error && (
                        <p style={{ color: 'var(--error-color)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            backgroundColor: 'var(--secondary-pastel)',
                            color: '#5a4a75',
                            fontWeight: '600',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            transition: 'opacity 0.2s'
                        }}
                    >
                        Unlock
                    </button>
                </form>
            </div>
        </div>
    );
}
