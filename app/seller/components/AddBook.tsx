import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { useImgBBUpload } from '../hooks/useImgBBUpload';

interface Book {
  title: string;
  author: string;
  price: number;
  coverUrl: string;
  stock: number;
  category: string;
}

interface AddBookDrawerProps {
  visible: boolean;
  onClose: () => void;
  onAddBook: (book: Book) => void;
}

const categories = ['Fiction', 'Non-Fiction', 'Programming', 'Science', 'History', 'Biography', 'Other'];

export default function AddBookDrawer({ visible, onClose, onAddBook }: AddBookDrawerProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('Programming');
  const [uploadError, setUploadError] = useState('');

  // Use the ImgBB upload hook
  const { uploadImage, uploading, progress } = useImgBBUpload();

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setPrice('');
    setCoverUrl('');
    setStock('');
    setCategory('Programming');
    setUploadError('');
  };

  const handleClose = () => {
    clearForm();
    onClose();
  };

  const handleAddBook = () => {
    if (!title.trim() || !author.trim() || !price.trim() || !stock.trim()) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    const priceNum = parseFloat(price);
    const stockNum = parseInt(stock);

    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    if (isNaN(stockNum) || stockNum < 0) {
      Alert.alert('Error', 'Please enter a valid stock quantity');
      return;
    }

    const newBook: Book = {
      title: title.trim(),
      author: author.trim(),
      price: priceNum,
      coverUrl: coverUrl.trim() || 'https://via.placeholder.com/300x400?text=No+Image',
      stock: stockNum,
      category,
    };

    onAddBook(newBook);
    clearForm();
  };

  const selectAndUploadImage = () => {
    const options = {
      mediaType: 'photo' as const,
      quality: 0.8,
      maxWidth: 800,
      maxHeight: 1200,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel || response.errorMessage) {
        return;
      }

      if (response.assets && response.assets[0]) {
        const imageUri = response.assets[0].uri;
        if (imageUri) {
          setUploadError('');
          uploadImage(
            imageUri,
            // onSuccess callback
            (data:any) => {
              setCoverUrl(data.url);
              Alert.alert('Success', 'Image uploaded successfully!');
            },
            // onError callback
            (error:any) => {
              setUploadError(error);
              Alert.alert('Upload Error', error);
            }
          );
        }
      }
    });
  };

  const removeImage = () => {
    setCoverUrl('');
    setUploadError('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={handleClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.drawer}>
            <View style={styles.handle} />
            
            <View style={styles.header}>
              <Text style={styles.title}>Add New Book</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
              {/* Title Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Book Title *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter book title"
                  value={title}
                  onChangeText={setTitle}
                  placeholderTextColor="#999"
                />
              </View>

              {/* Author Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Author *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter author name"
                  value={author}
                  onChangeText={setAuthor}
                  placeholderTextColor="#999"
                />
              </View>

              {/* Price and Stock Row */}
              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Price *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0.00"
                    value={price}
                    onChangeText={setPrice}
                    keyboardType="decimal-pad"
                    placeholderTextColor="#999"
                  />
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>Stock *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    value={stock}
                    onChangeText={setStock}
                    keyboardType="number-pad"
                    placeholderTextColor="#999"
                  />
                </View>
              </View>

              {/* Category Selection */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Category</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.categoryRow}>
                    {categories.map((cat) => (
                      <TouchableOpacity
                        key={cat}
                        style={[
                          styles.categoryChip,
                          category === cat && styles.categoryChipActive
                        ]}
                        onPress={() => setCategory(cat)}
                      >
                        <Text style={[
                          styles.categoryText,
                          category === cat && styles.categoryTextActive
                        ]}>{cat}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* Image Upload Section */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cover Image</Text>
                
                {/* Image Preview */}
                {coverUrl ? (
                  <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: coverUrl }} style={styles.imagePreview} />
                    <TouchableOpacity 
                      style={styles.removeImageButton} 
                      onPress={removeImage}
                    >
                      <Ionicons name="close-circle" size={24} color="#ff4757" />
                    </TouchableOpacity>
                  </View>
                ) : null}

                {/* Upload Progress Bar */}
                {uploading && (
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[styles.progressFill, { width: `${progress}%` }]} 
                      />
                    </View>
                    <Text style={styles.progressText}>{progress}%</Text>
                  </View>
                )}

                {/* Upload Button */}
                <TouchableOpacity 
                  style={[styles.uploadButton, uploading && styles.uploadButtonDisabled]}
                  onPress={selectAndUploadImage}
                  disabled={uploading}
                >
                  <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
                  <Text style={styles.uploadButtonText}>
                    {uploading ? 'Uploading...' : 'Select & Upload Image'}
                  </Text>
                </TouchableOpacity>

                {/* Manual URL Input */}
                <View style={styles.orDivider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.orText}>OR</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Enter image URL manually"
                  value={coverUrl}
                  onChangeText={setCoverUrl}
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                />

                {/* Upload Error */}
                {uploadError ? (
                  <Text style={styles.errorText}>{uploadError}</Text>
                ) : null}
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.addButton, uploading && styles.addButtonDisabled]} 
                onPress={handleAddBook}
                disabled={uploading}
              >
                <Text style={styles.addButtonText}>Add Book</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  drawer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '85%',
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  closeButton: {
    padding: 4,
  },
  form: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  row: {
    flexDirection: 'row',
  },
  categoryRow: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  categoryChip: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  categoryChipActive: {
    backgroundColor: '#6200ea',
    borderColor: '#6200ea',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  // Image Upload Styles
  imagePreviewContainer: {
    alignSelf: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  imagePreview: {
    width: 120,
    height: 160,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#e9ecef',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6200ea',
  },
  progressText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6200ea',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  uploadButtonDisabled: {
    opacity: 0.6,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  orDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e9ecef',
  },
  orText: {
    marginHorizontal: 16,
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  errorText: {
    marginTop: 8,
    fontSize: 14,
    color: '#ff4757',
    textAlign: 'center',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 20,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  addButton: {
    flex: 1,
    backgroundColor: '#6200ea',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.6,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});
