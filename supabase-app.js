// Supabase Configuration
// Sign up at supabase.com and get your project credentials
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // Replace with your project URL
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // Replace with your anon key

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Initialize app
async function initializeApp() {
  console.log('Supabase initialized');
}

initializeApp();

// ==================== ARTICLES FUNCTIONS ====================

async function getArticles() {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting articles:', error);
    return [];
  }
}

async function saveArticle(article) {
  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select();
    
    if (error) throw error;
    console.log('Article saved:', data);
    return true;
  } catch (error) {
    console.error('Error saving article:', error);
    alert('فشل في حفظ المقال');
    return false;
  }
}

async function deleteArticle(id) {
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    console.log('Article deleted:', id);
    return true;
  } catch (error) {
    console.error('Error deleting article:', error);
    return false;
  }
}

// ==================== VIDEOS FUNCTIONS ====================

async function getVideos() {
  try {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error getting videos:', error);
    return [];
  }
}

async function saveVideo(video) {
  try {
    const { data, error } = await supabase
      .from('videos')
      .insert([video])
      .select();
    
    if (error) throw error;
    console.log('Video saved:', data);
    return true;
  } catch (error) {
    console.error('Error saving video:', error);
    alert('فشل في حفظ الفيديو');
    return false;
  }
}

async function deleteVideo(id) {
  try {
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    console.log('Video deleted:', id);
    return true;
  } catch (error) {
    console.error('Error deleting video:', error);
    return false;
  }
}

// ==================== FILE UPLOAD ====================

async function uploadVideoToSupabase(file) {
  try {
    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `videos/${fileName}`;

    // Upload file
    const { data, error } = await supabase.storage
      .from('videos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('videos')
      .getPublicUrl(filePath);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Upload error:', error);
    throw error;
  }
}
