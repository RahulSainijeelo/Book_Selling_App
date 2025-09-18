// shared/store/useOrderStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api.service';

interface OrderItem {
  id: string;
  bookId: string;
  book: {
    id: string;
    title: string;
    author: string;
    imageUrl?: string;
    price: number;
  };
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderNumber: string;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  totalAmount: number;
  user: {
    id: string;
    name: string;
    email: string;
  };
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface OrderState {
  orders: Order[];
  pagination: Pagination | null;
  isLoading: boolean;
  isLoadingMore: boolean;
  isRefreshing: boolean;
  error: string | null;
  
  // Actions
  setOrders: (orders: Order[]) => void;
  appendOrders: (orders: Order[]) => void;
  setPagination: (pagination: Pagination) => void;
  setIsLoading: (loading: boolean) => void;
  setIsLoadingMore: (loading: boolean) => void;
  setIsRefreshing: (refreshing: boolean) => void;
  setError: (error: string | null) => void;
  
  // API Actions
  fetchOrders: (page?: number) => Promise<void>;
  refreshOrders: () => Promise<void>;
  loadMoreOrders: () => Promise<void>;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  clearOrders: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      pagination: null,
      isLoading: false,
      isLoadingMore: false,
      isRefreshing: false,
      error: null,
      
      setOrders: (orders) => set({ orders }),
      appendOrders: (newOrders) => set((state) => ({ 
        orders: [...state.orders, ...newOrders] 
      })),
      setPagination: (pagination) => set({ pagination }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setIsLoadingMore: (isLoadingMore) => set({ isLoadingMore }),
      setIsRefreshing: (isRefreshing) => set({ isRefreshing }),
      setError: (error) => set({ error }),
      
      fetchOrders: async (page = 1) => {
        try {
          set({ isLoading: page === 1, error: null });
          
          const response = await api.get(`/api/seller/orders?page=${page}&limit=10`);
          const { orders, pagination } = response.data;
          
          if (page === 1) {
            set({ orders, pagination, isLoading: false });
          } else {
            const currentOrders = get().orders;
            set({ 
              orders: [...currentOrders, ...orders], 
              pagination, 
              isLoadingMore: false 
            });
          }
        } catch (error: any) {
          console.error('Failed to fetch orders:', error);
          set({ 
            error: error.response?.data?.message || 'Failed to fetch orders',
            isLoading: false,
            isLoadingMore: false 
          });
        }
      },
      
      refreshOrders: async () => {
        try {
          set({ isRefreshing: true, error: null });
          
          const response = await api.get('/api/seller/orders?page=1&limit=10');
          const { orders, pagination } = response.data;
          
          set({ orders, pagination, isRefreshing: false });
        } catch (error: any) {
          console.error('Failed to refresh orders:', error);
          set({ 
            error: error.response?.data?.message || 'Failed to refresh orders',
            isRefreshing: false 
          });
        }
      },
      
      loadMoreOrders: async () => {
        const { pagination, isLoadingMore } = get();
        
        if (!pagination || isLoadingMore || pagination.page >= pagination.pages) {
          return;
        }
        
        set({ isLoadingMore: true });
        await get().fetchOrders(pagination.page + 1);
      },
      
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map(order =>
            order.id === orderId ? { ...order, status } : order
          )
        }));
      },
      
      clearOrders: () => set({ 
        orders: [], 
        pagination: null, 
        error: null 
      }),
    }),
    {
      name: 'order-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Don't persist loading states
      partialize: (state) => ({
        orders: state.orders,
        pagination: state.pagination,
      }),
    }
  )
);
