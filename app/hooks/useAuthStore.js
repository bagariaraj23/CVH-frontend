'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set, get) => ({
            token: null,
            email: null,
            user: null,

            setToken: (token) => set({ token }),
            setEmail: (email) => set({ email }),
            setUser: (user) => set({ user }),

            updateUser: (updatedFields) =>
                set((state) => ({
                    user: { ...state.user, ...updatedFields },
                    email: updatedFields.email || state.email, // Ensure email is updated
                })),

            clearToken: () => set({ token: null, email: null, user: null }),

            isAuthenticated: () => !!get().token,
        }),
        {
            name: 'auth-storage', // Storage key in localStorage
            getStorage: () => localStorage, // Use localStorage for persistence
        }
    )
);

export default useAuthStore;