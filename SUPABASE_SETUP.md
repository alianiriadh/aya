# Supabase Setup - Complete Guide

## Why Supabase?
✅ **1GB file storage** (free)
✅ **500MB database** (free)
✅ **50MB per video** (can be increased)
✅ **No credit card required**
✅ **Works with static sites**

---

## Step 1: Create Supabase Account

1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub (or email)
4. Create a new organization (free)
5. Create a new project:
   - **Project name:** `content-hub`
   - **Database password:** (choose a strong password - save it!)
   - **Region:** Choose closest to you
   - Click "Create new project"
6. Wait 2-3 minutes for setup

---

## Step 2: Get Your Credentials

From your Supabase dashboard:

### Project URL & API Key
1. Click on your project
2. Go to "Settings" (gear icon) → "API"
3. Copy these values:
   - **Project URL:** `https://xyz123.supabase.co`
   - **anon public key:** `eyJhbG...` (long key)

### Update Your Code
Open `supabase-app.js` (lines 3-4) and update:

```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

---

## Step 3: Create Database Tables

1. In Supabase dashboard, go to "SQL Editor"
2. Click "New query"
3. Paste this SQL code:

```sql
-- Create articles table
CREATE TABLE articles (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create videos table
CREATE TABLE videos (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  creator TEXT NOT NULL,
  category TEXT NOT NULL,
  url TEXT NOT NULL,
  thumbnail TEXT,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  isUploaded BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Allow all operations (for development)
CREATE POLICY "Enable all for articles" ON articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for videos" ON videos FOR ALL USING (true) WITH CHECK (true);
```

4. Click "Run" (or press F5)
5. You should see "Success. No rows returned"

---

## Step 4: Create Storage Bucket

1. Go to "Storage" in sidebar
2. Click "Create a new bucket"
3. Configure:
   - **Name:** `videos`
   - **Public bucket:** ✅ Check this (videos need to be public)
   - **File size limit:** `52428800` (50MB in bytes, or higher if you want)
4. Click "Create bucket"

### Set Storage Policies
1. Click on the `videos` bucket
2. Go to "Policies" tab
3. Click "New policy"
4. Select "For full customization"
5. **Policy name:** `Public Access`
6. **Policy definition:** Select "SELECT" operation
7. Paste this in the USING expression:
   ```sql
   true
   ```
8. Click "Review" → "Save policy"
9. Repeat for INSERT, UPDATE (use same `true` expression)

---

## Step 5: Update index.html

Open `index.html` and replace the script tag with:

```html
<script src="supabase-app.js"></script>
```

---

## Step 6: Test Locally

1. Open `index.html` in browser
2. Login with admin credentials
3. Try uploading a video
4. Check if it appears in user view

---

## Step 7: Deploy to Netlify

1. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Switch to Supabase"
   git push origin master
   ```

2. Go to [netlify.com](https://netlify.com)
3. Deploy your site (same as before)

---

## File Size Limits

### Default: 50MB per file

### To Increase (up to 5GB):
1. Go to "Storage" → "Settings"
2. Under "Upload file size limit"
3. Change from 50MB to desired size (max 5GB for free tier)
4. Click "Save"

**Note:** Higher file sizes use more storage quota (1GB total for free tier)

---

## Free Tier Limits

| Resource | Limit |
|----------|-------|
| Database | 500MB |
| File Storage | 1GB |
| Bandwidth | 2GB/month |
| API Requests | Unlimited |

**This is perfect for a content hub with 10-20 videos!**

---

## Troubleshooting

### "Failed to upload video"
- Check storage bucket is public
- Verify storage policies allow INSERT
- Check file size is under limit

### "Cannot save article/video"
- Check database policies allow INSERT
- Verify tables are created correctly
- Check browser console for errors

### "Videos not displaying"
- Verify bucket is public
- Check video URL in browser
- Ensure video format is supported (mp4, webm)

---

## Advantages Over Firebase + Cloudinary

| Feature | Supabase | Firebase + Cloudinary |
|---------|----------|----------------------|
| Setup | 1 service | 2 services |
| Storage | 1GB | 25GB (Cloudinary) |
| File Size | 50MB-5GB | 100MB (Cloudinary) |
| Database | ✅ Included | ✅ Firebase |
| Credit Card | ❌ Not needed | ❌ Not needed |
| Complexity | ⭐ Simple | ⭐⭐ More complex |

---

## Next Steps

1. ✅ Create Supabase account
2. ✅ Update credentials in supabase-app.js
3. ✅ Create database tables
4. ✅ Create storage bucket
5. ✅ Test locally
6. ✅ Deploy to Netlify

Your site will work with **one free service** instead of two! 🎉
