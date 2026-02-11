# Uploadcare Setup - Complete Guide

## Why Uploadcare?
✅ **5GB per file** (10x more than most free services!)
✅ **3GB storage** total (free)
✅ **No credit card required**
✅ **Simple widget** - no complex coding
✅ **Works with Supabase** for database

---

## Step 1: Create Uploadcare Account

1. Go to [uploadcare.com](https://uploadcare.com)
2. Click "Start for free"
3. Sign up with email (no credit card needed)
4. Verify your email

---

## Step 2: Get Your Public Key

1. After login, go to dashboard
2. Click on your project (or create new one)
3. Go to "Settings" → "API keys"
4. Copy your **Public key** (starts with a random string)

---

## Step 3: Update Your Code

Open `admin.html` (around line 203) and update:

```javascript
const UPLOADCARE_PUBLIC_KEY = 'your-public-key-here';
```

Also update the widget in HTML (around line 145):
```html
data-public-key="your-public-key-here"
```

---

## Step 4: Setup Supabase Database

You still need Supabase for storing article/video metadata (not the files).

### Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Create a free account
3. Create a new project

### Get Credentials
1. Go to "Settings" → "API"
2. Copy **Project URL** and **anon public key**

### Update supabase-app.js
```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';
```

### Create Database Tables
1. Go to "SQL Editor"
2. Run this SQL:

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

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Allow all operations
CREATE POLICY "Enable all for articles" ON articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for videos" ON videos FOR ALL USING (true) WITH CHECK (true);
```

---

## Step 5: Test Locally

1. Open `admin.html` in browser
2. Go to Videos section
3. Select "رفع ملف فيديو"
4. Click the upload widget
5. Upload a video (up to 5GB!)
6. Video should upload to Uploadcare

---

## Step 6: Deploy to Netlify

```bash
git add .
git commit -m "Use Uploadcare for video uploads"
git push origin master
```

Then deploy to Netlify as usual.

---

## How It Works

**Your Stack:**
- **Netlify** → Hosts your website (HTML/CSS/JS)
- **Uploadcare** → Stores videos (up to 5GB per file)
- **Supabase** → Stores metadata (article/video info)

**User uploads video:**
1. Click upload widget → Opens Uploadcare dialog
2. Select video file → Uploads to Uploadcare CDN
3. Get video URL → Save to Supabase database
4. Users watch video → Streamed from Uploadcare

---

## Free Tier Limits

### Uploadcare Free
| Feature | Limit |
|---------|-------|
| Storage | 3GB |
| File Size | **5GB per file** |
| Bandwidth | 10GB/month |
| Files | Unlimited |

### Supabase Free
| Feature | Limit |
|---------|-------|
| Database | 500MB |
| API Requests | Unlimited |

**Combined:** Perfect for 5-10 large videos!

---

## Advantages

| Feature | Uploadcare | Supabase | Cloudinary |
|---------|-----------|----------|------------|
| File Size | **5GB** | 50MB-5GB | 100MB |
| Storage | 3GB | 1GB | 25GB |
| Setup | ⭐ Easiest | ⭐⭐ Medium | ⭐⭐ Medium |
| Widget | ✅ Built-in | ❌ Manual | ✅ Built-in |
| Credit Card | ❌ No | ❌ No | ❌ No |

**Winner:** Uploadcare for large files! 🎉

---

## Troubleshooting

### "Widget not showing"
- Check public key is correct
- Verify widget script is loaded
- Check browser console for errors

### "Upload failed"
- Check file size is under 5GB
- Verify public key is active
- Try different file format

### "Video not playing"
- Uploadcare URLs are permanent
- Check URL starts with `https://ucarecdn.com/`
- Test URL directly in browser

---

## Next Steps

1. ✅ Create Uploadcare account
2. ✅ Get public key
3. ✅ Update admin.html
4. ✅ Setup Supabase for database
5. ✅ Test video upload
6. ✅ Deploy to Netlify

**You can now upload videos up to 5GB - perfect for long content!** 🎉
