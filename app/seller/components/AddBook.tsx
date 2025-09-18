import React, { useState, useEffect } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { useImgBBUpload } from '../hooks/useImgBBUpload';
import styles from "./AddBookStyles"

// Updated to match your Prisma schema
interface BookFormData {
  title: string;
  author: string;
  description?: string;
  price: number;
  categoryId: string;
  imageUrl?: string;
  stock: number;
}

interface Category {
  id: string;
  name: string;
}

interface AddBookDrawerProps {
  visible: boolean;
  onClose: () => void;
  onAddBook: (book: BookFormData) => void;
  isSubmitting: boolean;
}

const categories: Category[] = [
  { id: 'd81e9dcd-5efb-4450-b4a9-493db8a4823a', name: 'Non-Fiction' },
  { id: '679b8403-fb6f-402d-9228-6391be808d9e', name: 'Science' },
  { id: '070516ba-af8a-41eb-9c95-b97061737276', name: 'History' },
  { id: 'f6b3c0f5-c83b-4096-b91e-9e9496ae32e9', name: 'Biography' },
  { id: 'e75367e9-4f3f-480a-904f-4275c5924396', name: 'Other' },
  {id:'1b9f545f-b0f2-41e7-b689-8f4dc8589937',name:'Art'},
  {id:'584d46b5-4a36-4132-84cf-1387a3df6d58',name:'Programming'},
  {id:'547b9e02-54c7-46fa-8936-eb228b290437',name:'Science Fiction'}
];

export default function AddBookDrawer({ visible, onClose, onAddBook, isSubmitting }: AddBookDrawerProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('1'); // Default to Programming
  const [uploadError, setUploadError] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { uploadImage, uploading, progress } = useImgBBUpload();

  useEffect(() => {
    if (!visible) {
      clearForm();
    }
  }, [visible]);

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setStock('');
    setCategoryId('1');
    setUploadError('');
    setFormErrors({});
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!title.trim()) {
      errors.title = 'Title is required';
    }

    if (!author.trim()) {
      errors.author = 'Author is required';
    }

    if (!price.trim()) {
      errors.price = 'Price is required';
    } else {
      const priceNum = parseFloat(price);
      if (isNaN(priceNum) || priceNum <= 0) {
        errors.price = 'Please enter a valid price greater than 0';
      }
    }

    if (!stock.trim()) {
      errors.stock = 'Stock quantity is required';
    } else {
      const stockNum = parseInt(stock);
      if (isNaN(stockNum) || stockNum < 0) {
        errors.stock = 'Please enter a valid stock quantity';
      }
    }

    if (!categoryId) {
      errors.category = 'Please select a category';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleClose = () => {
    if (!isSubmitting) {
      clearForm();
      onClose();
    }
  };

  const handleAddBook = () => {
    if (uploading || isSubmitting) return;

    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors and try again');
      return;
    }

    const bookData: BookFormData = {
      title: title.trim(),
      author: author.trim(),
      description: description.trim() || undefined,
      price: parseFloat(price),
      categoryId,
      imageUrl: imageUrl.trim() || undefined,
      stock: parseInt(stock),
    };

    onAddBook(bookData);
  };

  const selectAndUploadImage = () => {
    if (uploading || isSubmitting) return;

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
        const uri = response.assets[0].uri;
        if (uri) {
          setUploadError('');
          uploadImage(
            uri,
            // onSuccess callback
            (data: any) => {
              setImageUrl(data.url);
              Alert.alert('Success', 'Image uploaded successfully!');
            },
            // onError callback
            (error: any) => {
              setUploadError(error);
              Alert.alert('Upload Error', error);
            }
          );
        }
      }
    });
  };

  const removeImage = () => {
    if (uploading || isSubmitting) return;
    setImageUrl('');
    setUploadError('');
  };

  const selectedCategory = categories.find(cat => cat.id === categoryId);

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
              <TouchableOpacity 
                onPress={handleClose} 
                style={[styles.closeButton, (uploading || isSubmitting) && { opacity: 0.5 }]}
                disabled={uploading || isSubmitting}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
              {/* Title Input */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Book Title *</Text>
                <TextInput
                  style={[styles.input, formErrors.title && styles.inputError]}
                  placeholder="Enter book title"
                  value={title}
                  onChangeText={(text) => {
                    setTitle(text);
                    if (formErrors.title) {
                      setFormErrors(prev => ({ ...prev, title: '' }));
                    }
                  }}
                  placeholderTextColor="#999"
                  editable={!uploading && !isSubmitting}
                />
                {formErrors.title && <Text style={styles.errorText}>{formErrors.title}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Author *</Text>
                <TextInput
                  style={[styles.input, formErrors.author && styles.inputError]}
                  placeholder="Enter author name"
                  value={author}
                  onChangeText={(text) => {
                    setAuthor(text);
                    if (formErrors.author) {
                      setFormErrors(prev => ({ ...prev, author: '' }));
                    }
                  }}
                  placeholderTextColor="#999"
                  editable={!uploading && !isSubmitting}
                />
                {formErrors.author && <Text style={styles.errorText}>{formErrors.author}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Description</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Enter book description (optional)"
                  value={description}
                  onChangeText={setDescription}
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={3}
                  editable={!uploading && !isSubmitting}
                />
              </View>

              <View style={styles.row}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Price * ($)</Text>
                  <TextInput
                    style={[styles.input, formErrors.price && styles.inputError]}
                    placeholder="0.00"
                    value={price}
                    onChangeText={(text) => {
                      setPrice(text);
                      if (formErrors.price) {
                        setFormErrors(prev => ({ ...prev, price: '' }));
                      }
                    }}
                    keyboardType="decimal-pad"
                    placeholderTextColor="#999"
                    editable={!uploading && !isSubmitting}
                  />
                  {formErrors.price && <Text style={styles.errorText}>{formErrors.price}</Text>}
                </View>
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>Stock *</Text>
                  <TextInput
                    style={[styles.input, formErrors.stock && styles.inputError]}
                    placeholder="0"
                    value={stock}
                    onChangeText={(text) => {
                      setStock(text);
                      if (formErrors.stock) {
                        setFormErrors(prev => ({ ...prev, stock: '' }));
                      }
                    }}
                    keyboardType="number-pad"
                    placeholderTextColor="#999"
                    editable={!uploading && !isSubmitting}
                  />
                  {formErrors.stock && <Text style={styles.errorText}>{formErrors.stock}</Text>}
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Category *</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.categoryRow}>
                    {categories.map((cat) => (
                      <TouchableOpacity
                        key={cat.id}
                        style={[
                          styles.categoryChip,
                          categoryId === cat.id && styles.categoryChipActive
                        ]}
                        onPress={() => {
                          if (!uploading && !isSubmitting) {
                            setCategoryId(cat.id);
                            if (formErrors.category) {
                              setFormErrors(prev => ({ ...prev, category: '' }));
                            }
                          }
                        }}
                        disabled={uploading || isSubmitting}
                      >
                        <Text style={[
                          styles.categoryText,
                          categoryId === cat.id && styles.categoryTextActive
                        ]}>{cat.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
                {formErrors.category && <Text style={styles.errorText}>{formErrors.category}</Text>}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cover Image</Text>
                
                {imageUrl ? (
                  <View style={styles.imagePreviewContainer}>
                    <Image source={{ uri: imageUrl }} style={styles.imagePreview} />
                    <TouchableOpacity 
                      style={styles.removeImageButton} 
                      onPress={removeImage}
                      disabled={uploading || isSubmitting}
                    >
                      <Ionicons name="close-circle" size={24} color="#ff4757" />
                    </TouchableOpacity>
                  </View>
                ) : null}

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

                <TouchableOpacity 
                  style={[styles.uploadButton, (uploading || isSubmitting) && styles.uploadButtonDisabled]}
                  onPress={selectAndUploadImage}
                  disabled={uploading || isSubmitting}
                >
                  <Ionicons name="cloud-upload-outline" size={20} color="#fff" />
                  <Text style={styles.uploadButtonText}>
                    {uploading ? 'Uploading...' : 'Select & Upload Image'}
                  </Text>
                </TouchableOpacity>

                <View style={styles.orDivider}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.orText}>OR</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Enter image URL manually"
                  value={imageUrl}
                  onChangeText={setImageUrl}
                  placeholderTextColor="#999"
                  autoCapitalize="none"
                  editable={!uploading && !isSubmitting}
                />

                {/* Upload Error */}
                {uploadError ? (
                  <Text style={styles.errorText}>{uploadError}</Text>
                ) : null}
              </View>
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.cancelButton, (uploading || isSubmitting) && { opacity: 0.5 }]} 
                onPress={handleClose}
                disabled={uploading || isSubmitting}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.addButton, (uploading || isSubmitting) && styles.addButtonDisabled]} 
                onPress={handleAddBook}
                disabled={uploading || isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text style={styles.addButtonText}>Add Book</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}