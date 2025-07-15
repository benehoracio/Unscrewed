import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "./queryClient";
import type { CartItem, Beat } from "@shared/schema";

export interface CartItemWithBeat extends CartItem {
  beat: Beat;
}

export function useCart(sessionId: string) {
  return useQuery<CartItemWithBeat[]>({
    queryKey: ["/api/cart", sessionId],
    enabled: !!sessionId,
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { sessionId: string; beatId: number; quantity?: number }) => {
      const response = await apiRequest("POST", "/api/cart", data);
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", variables.sessionId] });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { id: number; quantity: number; sessionId: string }) => {
      const response = await apiRequest("PATCH", `/api/cart/${data.id}`, { quantity: data.quantity });
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", variables.sessionId] });
    },
  });
}

export function useRemoveFromCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: { id: number; sessionId: string }) => {
      const response = await apiRequest("DELETE", `/api/cart/${data.id}`);
      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", variables.sessionId] });
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (sessionId: string) => {
      const response = await apiRequest("DELETE", `/api/cart/session/${sessionId}`);
      return response.json();
    },
    onSuccess: (_, sessionId) => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart", sessionId] });
    },
  });
}

export function generateSessionId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
