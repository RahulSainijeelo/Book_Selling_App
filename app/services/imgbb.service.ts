const IMGBB_API_KEY = '2413af01d1b72a7042fc18840202f42b';
const IMGBB_UPLOAD_URL = `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`;

export const uploadImageToImgBB = async (imageUri:any) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'book-cover.jpg',
    });

    const response = await fetch(IMGBB_UPLOAD_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        data: {
          url: result.data.url,
          displayUrl: result.data.display_url,
          deleteUrl: result.data.delete_url,
          thumbUrl: result.data.thumb?.url,
        }
      };
    } else {
      throw new Error(result.error?.message || 'Upload failed');
    }
  } catch (error:any) {
    return {
      success: false,
      error: error.message
    };
  }
};