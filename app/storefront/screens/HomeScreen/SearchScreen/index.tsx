import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StatusBar,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { mockBooks } from '..';
import styles from './styles';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  coverUrl: string;
  rating: number;
  category: string;
}

const searchSuggestions = [
  'React Native',
  'JavaScript',
  'Clean Code',
  'Programming',
  'Fiction',
  'History',
];

const recentSearches = [
  'Clean Code',
  'React Native in Action',
  'The Great Gatsby',
];

export default function SearchScreen() {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<TextInput>(null);

  useEffect(() => {
    // Auto focus on search input when screen opens
    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 0) {
      setIsSearching(true);
      // Simulate API call delay
      setTimeout(() => {
        // Mock search results (replace with actual API call)
        const results = mockBooks.filter(
          book => 
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase()) ||
            book.category.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(results);
        setIsSearching(false);
      }, 300);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  const SearchResultItem = ({ book }: { book: Book }) => (
    <TouchableOpacity style={styles.resultItem} activeOpacity={0.8}>
      <Image source={{ uri: book.coverUrl }} style={styles.resultImage} />
      <View style={styles.resultInfo}>
        <Text style={styles.resultTitle} numberOfLines={2}>{book.title}</Text>
        <Text style={styles.resultAuthor}>by {book.author}</Text>
        <View style={styles.resultFooter}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={styles.rating}>{book.rating}</Text>
          </View>
          <Text style={styles.price}>${book.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const SuggestionItem = ({ text, onPress }: { text: string; onPress: () => void }) => (
    <TouchableOpacity style={styles.suggestionItem} onPress={onPress}>
      <Ionicons name="search" size={16} color="#666" />
      <Text style={styles.suggestionText}>{text}</Text>
      <Ionicons name="arrow-up-outline" size={16} color="#999" />
    </TouchableOpacity>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        {/* Search Header */}
        <View style={styles.searchHeader}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          
          <View style={styles.searchInputContainer}>
            <Ionicons name="search" size={20} color="#999" />
            <TextInput
              ref={searchInputRef}
              style={styles.searchInput}
              placeholder="Search books, authors..."
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor="#999"
              autoFocus={true}
              returnKeyType="search"
              onSubmitEditing={() => handleSearch(searchQuery)}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Search Content */}
        <View style={styles.content}>
          {searchQuery.length === 0 ? (
            // No search query - show suggestions and recent searches
            <View>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>
                {recentSearches.map((search, index) => (
                  <SuggestionItem 
                    key={index} 
                    text={search} 
                    onPress={() => handleSearch(search)}
                  />
                ))}
              </View>
              
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Popular Searches</Text>
                {searchSuggestions.map((suggestion, index) => (
                  <SuggestionItem 
                    key={index} 
                    text={suggestion} 
                    onPress={() => handleSearch(suggestion)}
                  />
                ))}
              </View>
            </View>
          ) : isSearching ? (
            // Loading state
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Searching...</Text>
            </View>
          ) : searchResults.length > 0 ? (
            // Search results
            <View>
              <Text style={styles.resultsCount}>
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
              </Text>
              <FlatList
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <SearchResultItem book={item} />}
                showsVerticalScrollIndicator={false}
              />
            </View>
          ) : (
            // No results
            <View style={styles.noResultsContainer}>
              <Ionicons name="search" size={64} color="#ccc" />
              <Text style={styles.noResultsTitle}>No results found</Text>
              <Text style={styles.noResultsText}>
                Try searching for something else or check your spelling
              </Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
}