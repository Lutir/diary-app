'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

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
            transition: 'background-color 0.3s ease',
            animation: 'fadeIn 0.8s ease-out'
        }}>
            <form
                onSubmit={handleSubmit}
                style={{
                    width: '100%',
                    maxWidth: '320px',
                    position: 'relative'
                }}
            >
                <input
                    type="password"
                    placeholder="Enter access code"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '1rem 1.5rem',
                        fontSize: '1.1rem',
                        backgroundColor: 'transparent',
                        border: 'none',
                        borderBottom: '2px solid var(--border-color)',
                        borderRadius: '0',
                        outline: 'none',
                        textAlign: 'center',
                        color: 'var(--text-color)',
                        transition: 'border-color 0.3s ease',
                        fontFamily: 'var(--font-sans)',
                        letterSpacing: '2px'
                    }}
                    autoFocus
                />

                <button
                    type="submit"
                    style={{
                        position: 'absolute',
                        right: '0',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-color)',
                        opacity: password ? 1 : 0,
                        cursor: password ? 'pointer' : 'default',
                        transition: 'opacity 0.3s ease',
                        padding: '0.5rem'
                    }}
                    disabled={!password}
                >
                    <ArrowRight size={20} />
                </button>

                {error && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '0',
                        width: '100%',
                        textAlign: 'center',
                        marginTop: '1rem',
                        color: 'var(--error-color)',
                        fontSize: '0.85rem',
                        animation: 'fadeIn 0.3s ease'
                    }}>
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
}
