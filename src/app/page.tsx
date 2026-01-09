'use client';

import { useState, useEffect } from 'react';
import LockScreen from '@/components/LockScreen';
import DiaryDashboard from '@/components/DiaryDashboard';
import EntryEditor from '@/components/EntryEditor';
import EntryReader from '@/components/EntryReader';
import { supabase } from '@/lib/supabase';

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [view, setView] = useState<'dashboard' | 'editor' | 'reader'>('dashboard');
  const [entries, setEntries] = useState<any[]>([]);
  const [activeEntry, setActiveEntry] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const unlocked = sessionStorage.getItem('diary_unlocked');
    if (unlocked === 'true') {
      setIsUnlocked(true);
      fetchEntries();
    }
  }, []);

  const fetchEntries = async () => {
    const { data, error } = await supabase
      .from('entries')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setEntries(data);
  };

  const handleUnlock = (password: string) => {
    const correctPassword = process.env.NEXT_PUBLIC_DIARY_PASSWORD;

    if (password === correctPassword) {
      setIsUnlocked(true);
      sessionStorage.setItem('diary_unlocked', 'true');
      setError('');
      fetchEntries();
    } else {
      setError('Incorrect password');
    }
  };

  const handleSaveEntry = async (title: string, content: string, id?: string) => {
    if (id) {
      // Update existing
      const { error } = await supabase
        .from('entries')
        .update({ title, content })
        .eq('id', id);

      if (error) console.error('Error updating:', error);
    } else {
      // Create new
      const { error } = await supabase
        .from('entries')
        .insert([{ title, content }]);

      if (error) console.error('Error saving:', error);
    }

    await fetchEntries();
    setActiveEntry(null);
    setView('dashboard');
  };

  const handleEdit = (entry: any) => {
    setActiveEntry(entry);
    setView('editor');
  };

  const handleView = (entry: any) => {
    setActiveEntry(entry);
    setView('reader');
  };

  const handleCreateNew = () => {
    setActiveEntry(null);
    setView('editor');
  };

  if (!isUnlocked) {
    return <LockScreen onUnlock={handleUnlock} error={error} />;
  }

  return (
    <main>
      {view === 'dashboard' ? (
        <DiaryDashboard
          entries={entries}
          onCreateNew={handleCreateNew}
          onEdit={handleEdit}
          onView={handleView}
        />
      ) : view === 'editor' ? (
        <EntryEditor
          initialData={activeEntry}
          onSave={handleSaveEntry}
          onCancel={() => setView('dashboard')}
        />
      ) : (
        <EntryReader
          entry={activeEntry}
          onBack={() => setView('dashboard')}
        />
      )}
    </main>
  );
}
