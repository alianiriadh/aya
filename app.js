// ==================== FIREBASE CONFIGURATION ====================
// TODO: Replace with your Firebase config from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDA3h3d9EpfCRls_7vZ9uqJEFdt9cFizKM",
  authDomain: "bilel-c7943.firebaseapp.com",
  projectId: "bilel-c7943",
  storageBucket: "bilel-c7943.firebasestorage.app",
  messagingSenderId: "1025248515800",
  appId: "1:1025248515800:web:fadb5e77ff3ad0ac66e9ad",
  measurementId: "G-WHXBCRE3M8",
};

// Initialize Firebase (will be done after script loads)
let db;
let articlesCollection;
let videosCollection;

function initializeFirebase() {
  if (typeof firebase !== "undefined") {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    articlesCollection = db.collection("articles");
    videosCollection = db.collection("videos");
    console.log("Firebase initialized successfully!");
  } else {
    console.error("Firebase not loaded. Using localStorage as fallback.");
    useFallbackStorage();
  }
}

// Fallback to localStorage if Firebase fails
let usingFallback = false;
function useFallbackStorage() {
  usingFallback = true;
  if (!localStorage.getItem("articles")) {
    localStorage.setItem("articles", JSON.stringify([]));
  }
  if (!localStorage.getItem("videos")) {
    localStorage.setItem("videos", JSON.stringify([]));
  }
}

// ==================== DATA MANAGEMENT ====================

// Get articles
async function getArticles() {
  if (usingFallback) {
    try {
      return JSON.parse(localStorage.getItem("articles")) || [];
    } catch (e) {
      console.error("Error parsing articles:", e);
      return [];
    }
  }

  try {
    const snapshot = await articlesCollection.orderBy("id", "desc").get();
    return snapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error fetching articles:", e);
    return [];
  }
}

// Get videos
async function getVideos() {
  if (usingFallback) {
    try {
      return JSON.parse(localStorage.getItem("videos")) || [];
    } catch (e) {
      console.error("Error parsing videos:", e);
      return [];
    }
  }

  try {
    const snapshot = await videosCollection.orderBy("id", "desc").get();
    return snapshot.docs.map((doc) => ({ docId: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Error fetching videos:", e);
    return [];
  }
}

// Save article
async function saveArticle(article) {
  if (usingFallback) {
    const articles = JSON.parse(localStorage.getItem("articles")) || [];
    articles.push(article);
    localStorage.setItem("articles", JSON.stringify(articles));
    return;
  }

  try {
    await articlesCollection.add(article);
    console.log("Article saved successfully!");
  } catch (e) {
    console.error("Error saving article:", e);
    alert("فشل في حفظ المقال. حاول مرة أخرى.");
  }
}

// Save video
async function saveVideo(video) {
  if (usingFallback) {
    const videos = JSON.parse(localStorage.getItem("videos")) || [];
    videos.push(video);
    localStorage.setItem("videos", JSON.stringify(videos));
    return;
  }

  try {
    await videosCollection.add(video);
    console.log("Video saved successfully!");
  } catch (e) {
    console.error("Error saving video:", e);
    alert("فشل في حفظ الفيديو. حاول مرة أخرى.");
  }
}

// Update article
async function updateArticle(id, updatedArticle) {
  if (usingFallback) {
    const articles = JSON.parse(localStorage.getItem("articles")) || [];
    const index = articles.findIndex((a) => a.id === id);
    if (index !== -1) {
      articles[index] = { ...articles[index], ...updatedArticle };
      localStorage.setItem("articles", JSON.stringify(articles));
      return true;
    }
    return false;
  }

  try {
    const snapshot = await articlesCollection.where("id", "==", id).get();
    if (!snapshot.empty) {
      await snapshot.docs[0].ref.update(updatedArticle);
      return true;
    }
    return false;
  } catch (e) {
    console.error("Error updating article:", e);
    return false;
  }
}

// Update video
async function updateVideo(id, updatedVideo) {
  if (usingFallback) {
    const videos = JSON.parse(localStorage.getItem("videos")) || [];
    const index = videos.findIndex((v) => v.id === id);
    if (index !== -1) {
      videos[index] = { ...videos[index], ...updatedVideo };
      localStorage.setItem("videos", JSON.stringify(videos));
      return true;
    }
    return false;
  }

  try {
    const snapshot = await videosCollection.where("id", "==", id).get();
    if (!snapshot.empty) {
      await snapshot.docs[0].ref.update(updatedVideo);
      return true;
    }
    return false;
  } catch (e) {
    console.error("Error updating video:", e);
    return false;
  }
}

// Delete article
async function deleteArticle(id) {
  if (usingFallback) {
    const articles = JSON.parse(localStorage.getItem("articles")) || [];
    const filtered = articles.filter((a) => a.id !== id);
    localStorage.setItem("articles", JSON.stringify(filtered));
    return;
  }

  try {
    const snapshot = await articlesCollection.where("id", "==", id).get();
    if (!snapshot.empty) {
      await snapshot.docs[0].ref.delete();
      console.log("Article deleted successfully!");
    }
  } catch (e) {
    console.error("Error deleting article:", e);
    alert("فشل في حذف المقال. حاول مرة أخرى.");
  }
}

// Delete video
async function deleteVideo(id) {
  if (usingFallback) {
    const videos = JSON.parse(localStorage.getItem("videos")) || [];
    const filtered = videos.filter((v) => v.id !== id);
    localStorage.setItem("videos", JSON.stringify(filtered));
    return;
  }

  try {
    const snapshot = await videosCollection.where("id", "==", id).get();
    if (!snapshot.empty) {
      await snapshot.docs[0].ref.delete();
      console.log("Video deleted successfully!");
    }
  } catch (e) {
    console.error("Error deleting video:", e);
    alert("فشل في حذف الفيديو. حاول مرة أخرى.");
  }
}

// ==================== SAMPLE DATA ====================
// Sample data initialization removed - app starts with empty content
// Admins can add their own articles and videos

// ==================== UTILITY FUNCTIONS ====================

// Format date
function formatDate(date) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
}

// Truncate text
function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.substr(0, maxLength) + "...";
}

// Extract YouTube video ID
function extractYouTubeID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

// Extract Vimeo video ID
function extractVimeoID(url) {
  const regExp =
    /(?:www\.|player\.)?vimeo.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|video\/|)(\d+)(?:[a-zA-Z0-9_\-]+)?/i;
  const match = url.match(regExp);
  return match ? match[1] : null;
}

// Validate URL
function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// ==================== AUTHENTICATION ====================

// Check if user is authenticated
function isAuthenticated() {
  return localStorage.getItem("userRole") !== null;
}

// Get current user role
function getUserRole() {
  return localStorage.getItem("userRole");
}

// Logout user
function logout() {
  localStorage.removeItem("userRole");
  window.location.href = "index.html";
}

// ==================== EXPORT FUNCTIONS ====================
// Make functions available globally
window.getArticles = getArticles;
window.getVideos = getVideos;
window.saveArticle = saveArticle;
window.saveVideo = saveVideo;
window.updateArticle = updateArticle;
window.updateVideo = updateVideo;
window.deleteArticle = deleteArticle;
window.deleteVideo = deleteVideo;
window.formatDate = formatDate;
window.truncateText = truncateText;
window.extractYouTubeID = extractYouTubeID;
window.extractVimeoID = extractVimeoID;
window.isValidURL = isValidURL;
window.escapeHtml = escapeHtml;
window.isAuthenticated = isAuthenticated;
window.getUserRole = getUserRole;
window.logout = logout;
window.initializeFirebase = initializeFirebase;

// Wait for Firebase to load, then initialize
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(initializeFirebase, 100);
  });
} else {
  setTimeout(initializeFirebase, 100);
}

console.log("Content Hub App initialized successfully!");
