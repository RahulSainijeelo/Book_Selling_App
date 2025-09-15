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
import styles from "./AddBookStyles"
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