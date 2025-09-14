import React, { useState } from 'react';
import { View, TouchableOpacity, Text, Image, Alert, StyleSheet } from 'react-native';
import { uploadImageToImgBB } from '../../services/imgbb.service';
import { launchImageLibrary, ImageLibraryOptions, Asset } from 'react-native-image-picker';

const styles = StyleSheet.create({
  container: {
    // ...your styles...
  },
  uploadButton: {
    // ...your styles...
  },
  uploadButtonText: {
    // ...your styles...
  },
  preview: {
    width: 120,
    height: 180,
    marginTop: 10,
  },
});

const AddBookScreen: React.FC = () => {
  const [bookCoverUrl, setBookCoverUrl] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);

  const selectAndUploadImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 1200,
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage || 'Unknown error');
        return;
      }

      const asset: Asset | undefined = response.assets && response.assets[0];
      if (!asset || !asset.uri) {
        Alert.alert('Error', 'No image selected');
        return;
      }

      setUploading(true);

      try {
        const uploadResult = await uploadImageToImgBB(asset.uri);

        if (uploadResult.success) {
          setBookCoverUrl(uploadResult.data?.url);
          Alert.alert('Success', 'Image uploaded successfully!');
        } else {
          Alert.alert('Error', uploadResult.error);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to upload image');
      } finally {
        setUploading(false);
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Your form fields */}

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={selectAndUploadImage}
        disabled={uploading}
      >
        <Text style={styles.uploadButtonText}>
          {uploading ? 'Uploading...' : 'Upload Book Cover'}
        </Text>
      </TouchableOpacity>

      {bookCoverUrl !== '' && (
        <Image source={{ uri: bookCoverUrl }} style={styles.preview} />
      )}
    </View>
  );
};

export default AddBookScreen;
