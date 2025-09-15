import { useState } from 'react';
import { uploadImageToImgBB } from '../../services/imgbb.service';

export const useImgBBUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImage = async (imageUri:any, onSuccess:any, onError:any) => {
    setUploading(true);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const result = await uploadImageToImgBB(imageUri);
      
      clearInterval(progressInterval);
      setProgress(100);

      if (result.success) {
        onSuccess?.(result.data);
      } else {
        onError?.(result.error);
      }
    } catch (error:any) {
      onError?.(error.message);
    } finally {
      setUploading(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  return {
    uploadImage,
    uploading,
    progress
  };
};
