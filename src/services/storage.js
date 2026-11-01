import { supabase } from '../lib/supabase';

export const storageService = {
  /**
   * Upload an image to Supabase Storage bucket (e.g., 'recipes' or 'avatars')
   */
  async uploadImage(bucket, path, fileBlob) {
    try {
      const { data, error } = await supabase.storage.from(bucket).upload(path, fileBlob, {
        upsert: true,
      });
      if (error) throw error;
      const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(path);
      return { url: publicUrlData.publicUrl, error: null };
    } catch (error) {
      return { url: null, error: error.message || 'Image upload failed' };
    }
  },

  /**
   * Remove an image from storage
   */
  async removeImage(bucket, paths) {
    try {
      const { error } = await supabase.storage.from(bucket).remove(paths);
      if (error) throw error;
      return { success: true, error: null };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

export default storageService;

