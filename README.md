# Minimal Diary

A private, password-protected, pastel-themed diary application built with Next.js and Supabase.

## Features
- 🔒 **Password Protection**: Simple shared-password lock screen.
- 🎨 **Pastel UI**: A soothing, minimal interface with a **Dark Mode** toggle.
- 📝 **Rich Editor**: Write entries with Markdown support.
- 🖼️ **Image Support**: Upload images directly to your entries.
- ☁️ **Cloud Storage**: Entries and images stored securely in Supabase.

## Tech Stack
- **Framework**: Next.js (App Router)
- **Styling**: Vanilla CSS (CSS Modules) + Lucide Icons
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Font**: DM Sans + Merriweather

## Setup Guide

### 1. Clone & Install
```bash
git clone https://github.com/yourusername/minimal-diary.git
cd minimal-diary
npm install
```

### 2. Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com).
2. **Database**: Run this SQL in the SQL Editor to create the table:
   ```sql
   create table entries (
     id uuid default uuid_generate_v4() primary key,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null,
     title text,
     content text
   );
   ```
   *Note: Disable RLS for the `entries` table or set up a public policy.*

3. **Storage**:
   - Create a new Bucket named `images`.
   - Set the bucket to **Public**.
   - Add a policy to allow uploads (or leave open if just for you).

### 3. Environment Variables
Create a `.env.local` file in the root directory:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_DIARY_PASSWORD=your_secret_password
```

### 4. Run Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

## Deployment
Deploy easily to **Vercel**:
1. Push your code to GitHub.
2. Import the repo in Vercel.
3. Add the Environment Variables in the Vercel dashboard.
4. Deploy!
