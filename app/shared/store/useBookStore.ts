import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api.service';

interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  isApproved: boolean;
  price: number;
  categoryId: string;
  category: {
    id: string;
    name: string;
  };
  imageUrl?: string;
  rating: number;
  stock: number;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface BookState {
  books: Book[];
  pagination: Pagination | null;
  isLoading: boolean;
  isLoadingMore: boolean;
  isRefreshing: boolean;
  error: string | null;
  
  // Actions
  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  appendBooks: (books: Book[]) => void;
  setPagination: (pagination: Pagination) => void;
  setIsLoading: (loading: boolean) => void;
  setIsLoadingMore: (loading: boolean) => void;
  setIsRefreshing: (refreshing: boolean) => void;
  setError: (error: string | null) => void;
  
  // API Actions
  fetchBooks: (page?: number) => Promise<void>;
  refreshBooks: () => Promise<void>;
  loadMoreBooks: () => Promise<void>;
  clearBooks: () => void;
}

export const useBookStore = create<BookState>()(
  persist(
    (set, get) => ({
      books: [],
      pagination: null,
      isLoading: false,
      isLoadingMore: false,
      isRefreshing: false,
      error: null,
      
      setBooks: (books) => set({ books }),
      addBook: (book) => set((state) => ({ books: [book, ...state.books] })),
      appendBooks: (newBooks) => set((state) => ({ 
        books: [...state.books, ...newBooks] 
      })),
      setPagination: (pagination) => set({ pagination }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setIsLoadingMore: (isLoadingMore) => set({ isLoadingMore }),
      setIsRefreshing: (isRefreshing) => set({ isRefreshing }),
      setError: (error) => set({ error }),
      
      fetchBooks: async (page = 1) => {
        try {
          set({ isLoading: page === 1, error: null });
          
          const response = await api.get(`/api/seller/books?page=${page}&limit=10`);
          const { books, pagination } = response.data;
          
          if (page === 1) {
            set({ books, pagination, isLoading: false });
          } else {
            const currentBooks = get().books;
            set({ 
              books: [...currentBooks, ...books], 
              pagination, 
              isLoadingMore: false 
            });
          }
        } catch (error: any) {
          console.error('Failed to fetch books:', error);
          set({ 
            error: error.response?.data?.message || 'Failed to fetch books',
            isLoading: false,
            isLoadingMore: false 
          });
        }
      },
      
      refreshBooks: async () => {
        try {
          set({ isRefreshing: true, error: null });
          
          const response = await api.get('/api/seller/books?page=1&limit=10');
          const { books, pagination } = response.data;
          
          set({ books, pagination, isRefreshing: false });
        } catch (error: any) {
          console.error('Failed to refresh books:', error);
          set({ 
            error: error.response?.data?.message || 'Failed to refresh books',
            isRefreshing: false 
          });
        }
      },
      
      loadMoreBooks: async () => {
        const { pagination, isLoadingMore } = get();
        
        if (!pagination || isLoadingMore || pagination.page >= pagination.pages) {
          return;
        }
        
        set({ isLoadingMore: true });
        await get().fetchBooks(pagination.page + 1);
      },
      
      clearBooks: () => set({ 
        books: [], 
        pagination: null, 
        error: null 
      }),
    }),
    {
      name: 'book-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Don't persist loading states
      partialize: (state) => ({
        books: state.books,
        pagination: state.pagination,
      }),
    }
  )
);
