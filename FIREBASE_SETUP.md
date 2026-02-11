# Firebase + Cloudinary Setup Guide - مركز المحتوى

## Why Firebase + Cloudinary?

- **Firebase Firestore** - Cloud database for storing articles and video metadata (FREE)
- **Cloudinary** - Free video hosting and uploads (FREE, no credit card needed!)

When an admin adds or deletes content, **all users see the changes immediately** regardless of their browser or device.

## Setup Steps (20 minutes)

### Part 1: Firebase Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `content-hub` (or your choice)
4. Disable Google Analytics (not needed)
5. Click **"Create project"**

### 2. Enable Firestore Database

1. In Firebase Console, click **"Firestore Database"** in the left menu
2. Click **"Create database"**
3. Choose **"Start in production mode"**
4. Select your region (closest to your users)
5. Click **"Enable"**

### 3. ~~Enable Firebase Storage~~ (NOT NEEDED - Using Cloudinary Instead)

**Skip Firebase Storage! We're using Cloudinary for video uploads (it's free and doesn't need a credit card).**

### 4. Set Firestore Rules (Important!)

1. Go to **"Firestore Database"** → **"Rules"** tab
2. You'll see a text editor with existing rules
3. **DELETE ALL** the existing text in the editor
4. **COPY and PASTE** this code:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anyone can read articles and videos
    match /articles/{article} {
      allow read: if true;
      allow write: if true; // Temporary - allow all writes
    }
    match /videos/{video} {
      allow read: if true;
      allow write: if true; // Temporary - allow all writes
    }
  }
}
```

5. Click **"Publish"** button at the top

### 5. Set Storage Rules (For Video Uploads)

1. Go to **"Storage"** → **"Rules"** tab (in the left menu)
2. You'll see a text editor with existing rules
3. \*~~5. Set Storage Rules~~ (NOT NEEDED - Using Cloudinary)

**Skip this step! We're not using Firebase Storage.**

---

### Part 2: Cloudinary Setup (For Video Uploads)

### 6. Create Free Cloudinary Account

4. Register app with nickname: `content-hub-app`
5. **Copy the firebaseConfig object** - it looks like this:

````javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  ap9. Get Your Firebase Config

1. Go to **Project Settings** (gear icon ⚙️ in left sidebar)
2. Scroll down to **"Your apps"** section
3. Click the **Web icon** `</>`
4. Register app with nickname: `content-hub-app`
### 10. Update app.js with Firebase Config

1. Open `app.js` file
2. Find lines 2-10 (the firebaseConfig section)
3. Replace with your actual Firebase config

### 11. Update admin.html with Cloudinary Credentials

1. Open `admin.html` file
2. Find lines ~170-172 (search for `CLOUDINARY_CLOUD_NAME`)
3. Replace:
   ```javascript
   const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME';
   const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';
````

With your actual values:

```javascript
const CLOUDINARY_CLOUD_NAME = "dxxxx1234"; // Your cloud name from step 7
const CLOUDINARY_UPLOAD_PRESET = "video_uploads"; // Your preset from step 8
```

4. Save the file

---

### Part 4: Test Everything

### 12**Folder:** Type `videos` (optional, organizes your uploads)

- **Resource type:** Select **"Video"**
- Leave other settings as default

6. Click **"Save"** at the top right
7. **Copy the preset name** (e.g., `video_uploads`)

---

### Part 3: Configure Your App

### 9. : "1:123456789:web:abcdefghijk",

};

```

### 7. Update app.js

1. Open `app.js` file in your code editor
2. Find lines 2-8 (the firebaseConfig section)
3. **Replace the placeholder values** with your actual config from step 6:
   - Replace `"YOUR_API_KEY"` with your actual apiKey
   - Replace `"YOUR_PROJECT_ID.firebaseapp.com"` with your authDomain
   - Replace `"YOUR_PROJECT_ID"` with your projectId
   - Replace `"YOUR_PROJECT_ID.appspot.com"` with your storageBucket
   - Replace `"YOUR_MESSAGING_SENDER_ID"` with your messagingSenderId
   - Replace `"YOUR_APP_ID"` with your appId
### 12. Test Your App

1. Open `index.html` in a browser
2. Login as admin (username: `admin`, password: `admin123`)
3. Go to Videos tab
4. Choose "رفع ملف فيديو" from the dropdown
5. Click "📤 اختر ملف فيديو للرفع" button
6. **Cloudinary upload widget will open** - select a video file
7. Wait for upload to complete (you'll see a green success message)
8. Fill in title, creator, category, description
9. Click "نشر الفيديو"
10. Open in another browser/incognito → Login as user
11. **You should see and play your uploaded video!**

---

## Features

✅ **Central database** - All users see the same content (Firebase)
✅ **Free video uploads** - No credit card needed (Cloudinary)
✅ **25GB storage FREE** - More than Firebase free tier!
✅ **25GB bandwidth/month** - Plenty for educational use
✅ **Professional upload widget** - Drag & drop, webcam, URL import
✅ **Automatic thumbnails** - Cloudinary generates them for you
✅ **Video optimization** - Automatic compression and streaming
✅ **Real-time updates** - Changes sync instantly
 Troubleshooting

### Content not showing?
- Check browser console (F12) for errors
- Verify Firebase config is correct in `app.js`
- Check Firestore rules allow reading/writing (Step 4)

### "Permission denied" errors?
- Update Firestore rules (Step 4)
- Make sure you clicked "Publish" after updating rules

### Video upload button does nothing?
- Check Cloudinary credentials in `admin.html` (Step 11)
- Make sure Cloud name and Upload preset are correct
- Upload preset must be **"Unsigned"** mode (Step 8)
- Check browser console (F12) for errors

### "Upload preset not found" error?
- Go back to Cloudinary → Settings → Upload → Upload presets
- Make sure preset exists and is set to **"Unsigned"**
- Copy exact preset name to `admin.html`

### Uploaded video won't play?
- Check if video uploaded successfully in Cloudinary Dashboard
- Verify video URL is correct in Firebase console
- Try different video format (MP4 is most compatible)

### Firebase not loading?
- Check internet connection
- Firebase SDK scripts are loaded in HTML files
- Open browser console to see initialization messages

---

## Security Notes

⚠️ **Current Setup (Development Mode):**
- Firestore allows anyone to read/write
- Cloudinary allows anyone to upload (via unsigned preset)

**For Production, add:**
1. Firebase Authentication
2. Restrict Firestore writes to authenticated admins
3. Use signed Cloudinary upload presets
4. Add file size and format validation

---

## Need Help?

- **Firebase Firestore:** https://firebase.google.com/docs/firestore
- **Cloudinary Docs:** https://cloudinary.com/documentation
- **Upload Widget:** https://cloudinary.com/documentation/upload_widget
- Check browser console (F12) for detailed error messages

---

## Cost Summary

| Service | Free Tier | Cost if Exceeded |
|---------|-----------|------------------|
| **Firebase Firestore** | 50K reads/day, 20K writes/day | $0.06 per 100K reads |
| **Cloudinary** | 25GB storage, 25GB bandwidth/month | $0 (stays free) |

**For educational projects:** You'll likely NEVER exceed free limits! 🎉
- Verify storageBucket is correct in `app.js`

### Firebase not loading?

- Check internet connection
- Firebase SDK scripts are loaded in HTML files
- Open browser console to see Firebase initialization message

## Security Notes

⚠️ The current setup allows anyone to write data. For production:

1. Add Firebase Authentication
2. Restrict writes to authenticated admins only
3. Keep reads public for all users
4. Limit file upload sizes and types

## Need Help?

- Firebase Firestore: https://firebase.google.com/docs/firestore
- Firebase Storage: https://firebase.google.com/docs/storage
- Check browser console (F12) for detailed error messages
```
