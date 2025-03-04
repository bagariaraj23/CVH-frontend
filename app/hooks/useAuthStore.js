'use client';

import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
    token: null,
    setToken: (token) => set({ token }),
    setEmail: (email) => set({ email }),
    clearToken: () => set({ token: null }),
    isAuthenticated: () => !!get().token, // Now get() is properly defined
}));

export default useAuthStore;