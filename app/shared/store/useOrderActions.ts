// hooks/useOrderActions.ts
import api from "../../services/api.service";
import { useOrderStore } from "./useOrderStore"
import { Alert } from 'react-native';

export const useOrderActions = () => {
  const { updateOrderStatus } = useOrderStore();

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      await api.patch(`/api/seller/orders/${orderId}/status`, {
        status: newStatus
      });
      
      updateOrderStatus(orderId, newStatus as any);
      Alert.alert('Success', 'Order status updated successfully');
    } catch (error: any) {
      console.error('Failed to update order status:', error);
      Alert.alert('Error', 'Failed to update order status');
    }
  };

  return { updateStatus };
};
