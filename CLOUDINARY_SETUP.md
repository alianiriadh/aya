# Cloudinary Setup Guide

## Why Cloudinary?

✅ **25GB free storage**
✅ **Videos stored permanently** (never deleted)
✅ **No server needed** (cloud-based)
✅ **Fast global CDN**
✅ **No credit card required** for free tier

---

## Step 1: Create Free Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Click "Sign Up for Free"
3. Fill in your details (no credit card needed)
4. Verify your email
5. You'll be taken to your dashboard

---

## Step 2: Get Your Credentials

From your Cloudinary Dashboard:

### Cloud Name

- Look at the top of the dashboard
- You'll see: **"Cloud name: xyz123"**
- Copy this name

### Create Upload Preset

1. Go to Settings (gear icon) → Upload tab
2. Scroll down to "Upload presets"
3. Click "Add upload preset"
4. Configure:
   - **Preset name:** `content_hub_videos` (or any name)
   - **Signing Mode:** `Unsigned`
   - **Folder:** `content-hub-videos`
   - **Resource type:** `Video`
5. Click "Save"
6. Copy the **preset name**

---

## Step 3: Update Your Code

Open `admin.html` and find line ~213, update these values:

```javascript
const CLOUDINARY_CLOUD_NAME = "YOUR_CLOUD_NAME"; // Replace with your cloud name
const CLOUDINARY_UPLOAD_PRESET = "content_hub_videos"; // Your upload preset name
```

For example:

```javascript
const CLOUDINARY_CLOUD_NAME = "dxyz123abc";
const CLOUDINARY_UPLOAD_PRESET = "content_hub_videos";
```

---

## Step 4: Test Upload

1. Open your application
2. Go to admin panel
3. Select "رفع ملف فيديو" (File upload)
4. Click "اختر فيديو من جهازك"
5. Upload a test video
6. Video will be stored on Cloudinary (permanent!)

---

## Step 5: Deploy to Render

Now that videos are stored on Cloudinary (not your server), you can use **Render's free tier** without worrying about storage!

1. Go to [render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Select your `aya` repository
5. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
6. Click "Create Web Service"

Your app URL: `https://your-app.onrender.com`

---

## Free Tier Limits

Cloudinary Free Tier includes:

- ✅ 25GB storage
- ✅ 25GB bandwidth/month
- ✅ 10,000 transformations/month
- ✅ Unlimited video uploads

**This is more than enough for a content hub!**

---

## Troubleshooting

### "Upload widget not appearing"

- Make sure you saved the upload preset as **"Unsigned"**
- Check browser console for errors
- Verify cloud name and preset name are correct

### "Upload failed"

- Check that upload preset is **unsigned**
- Verify folder name matches preset configuration
- Check file size (free tier has limits per upload)

### "Video not playing"

- Cloudinary URLs are permanent and work everywhere
- Make sure the URL starts with `https://res.cloudinary.com/`

---

## What's Next?

1. ✅ Create Cloudinary account
2. ✅ Update admin.html with your credentials
3. ✅ Test video upload locally
4. ✅ Commit and push to GitHub
5. ✅ Deploy to Render.com
6. ✅ Enjoy permanent video storage!

---

## Benefits of This Solution

| Feature    | Your Server           | Cloudinary    |
| ---------- | --------------------- | ------------- |
| Storage    | ❌ Deleted on restart | ✅ Permanent  |
| Size Limit | 500MB                 | 25GB total    |
| Bandwidth  | Limited               | 25GB/month    |
| CDN        | No                    | ✅ Global CDN |
| Cost       | Free (Render)         | Free (25GB)   |

**Winner:** Cloudinary! 🎉
