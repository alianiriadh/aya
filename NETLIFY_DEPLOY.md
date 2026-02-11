# Deploy to Netlify - Complete Guide

## What You Need (All Free!)

1. **Cloudinary** - for video storage (25GB free)
2. **Firebase** - for data storage (already setup!)
3. **Netlify** - for hosting website (unlimited)

---

## Step 1: Setup Cloudinary

### Create Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Click "Sign Up for Free"
3. Use your email (no credit card needed)
4. Verify email and login

### Get Your Credentials
1. From your dashboard, find **"Cloud name"** (top of page)
2. Go to Settings (gear icon) → Upload tab
3. Scroll to "Upload presets" → Click "Add upload preset"
4. Configure:
   - **Preset name:** `content_hub`
   - **Signing Mode:** Select **"Unsigned"**
   - **Folder:** `content-hub-videos`
5. Click "Save"

### Update Your Code
Open `admin.html` (around line 205) and update:

```javascript
const CLOUDINARY_CLOUD_NAME = 'your-cloud-name-here'; // From dashboard
const CLOUDINARY_UPLOAD_PRESET = 'content_hub'; // The preset you created
```

Example:
```javascript
const CLOUDINARY_CLOUD_NAME = 'dxyz123abc';
const CLOUDINARY_UPLOAD_PRESET = 'content_hub';
```

---

## Step 2: Commit Changes to GitHub

```bash
git add .
git commit -m "Update Cloudinary credentials"
git push origin master
```

---

## Step 3: Deploy to Netlify

### Option A: Via Netlify Website (Easiest)

1. Go to [netlify.com](https://netlify.com)
2. Click "Sign up" → Choose "GitHub"
3. After login, click "Add new site" → "Import an existing project"
4. Click "Deploy with GitHub"
5. Authorize Netlify to access your repos
6. Select your repository: `alianiriadh/aya`
7. Configure:
   - **Branch to deploy:** `master`
   - **Build command:** (leave empty)
   - **Publish directory:** `.` or leave empty
8. Click "Deploy site"

### Wait for Deployment
- Takes 30-60 seconds
- You'll see "Site is live" when done
- Your URL: `https://random-name-12345.netlify.app`

### Option B: Drag & Drop (Alternative)

1. Go to [netlify.com](https://netlify.com) and login
2. Click "Add new site" → "Deploy manually"
3. Drag these files into the drop zone:
   - `index.html`
   - `admin.html`
   - `user.html`
   - `styles.css`
   - `app.js`
4. Wait for deploy (30 seconds)

---

## Step 4: Test Your Site

1. Click your Netlify URL
2. Login with admin credentials
3. Go to Videos section
4. Try uploading a video
5. Video should upload to Cloudinary
6. Check if video plays on user page

---

## Optional: Custom Domain

### Change Site Name
1. In Netlify dashboard, go to "Site settings"
2. Click "Change site name"
3. Enter: `bilel-content-hub` (or any available name)
4. Your new URL: `https://bilel-content-hub.netlify.app`

### Add Custom Domain (if you have one)
1. Go to "Domain management"
2. Click "Add custom domain"
3. Follow the instructions

---

## Files Structure (Static Only)

Your deployed site includes:
```
✅ index.html         - Login page
✅ admin.html         - Admin panel
✅ user.html          - User view
✅ styles.css         - Styling
✅ app.js             - Firebase logic
✅ CLOUDINARY_SETUP.md
✅ FIREBASE_SETUP.md
```

**NOT deployed (not needed):**
```
❌ server.js          - Removed
❌ package.json       - Removed
❌ node_modules/      - Removed
```

---

## How It Works

### User Flow:
1. User visits your Netlify URL
2. Logs in (data checked in Firebase)
3. Views content (metadata from Firebase)
4. Watches videos (streamed from Cloudinary)

### Admin Flow:
1. Admin uploads video via Cloudinary widget
2. Cloudinary stores video and returns URL
3. Admin saves video metadata to Firebase
4. Users can now see and watch the video

### No Server Needed Because:
- ✅ HTML/CSS/JS served by Netlify (CDN)
- ✅ Videos stored on Cloudinary (cloud)
- ✅ Data stored on Firebase (cloud)
- ✅ Everything runs in browser (client-side)

---

## Advantages of This Setup

| Aspect | Solution | Cost | Limits |
|--------|----------|------|--------|
| Hosting | Netlify | Free | 100GB bandwidth/month |
| Videos | Cloudinary | Free | 25GB storage, 25GB bandwidth |
| Database | Firebase | Free | 50K reads/day |
| Total Cost | | **$0** | Perfect for small-medium sites |

---

## Troubleshooting

### "Cloudinary upload not working"
- Check that upload preset is **"Unsigned"**
- Verify cloud name is correct
- Check browser console for errors

### "Videos not playing"
- Cloudinary URLs should start with `https://res.cloudinary.com/`
- Check video format is supported (mp4, webm)
- Test the URL directly in browser

### "Site not updating"
- Clear browser cache
- In Netlify: "Deploys" → "Trigger deploy" → "Clear cache and deploy"

### "Firebase not working"
- Check Firebase config in `app.js`
- Verify Firestore rules allow read/write

---

## Next Steps

1. ✅ Setup Cloudinary account
2. ✅ Update credentials in admin.html
3. ✅ Push to GitHub
4. ✅ Deploy to Netlify
5. ✅ Test video upload
6. ✅ Share your site!

Your site will be live at: `https://your-site.netlify.app`

**Congratulations! You have a fully functional content hub with zero server costs!** 🎉
