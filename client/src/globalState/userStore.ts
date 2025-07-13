import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type TaskState = 'PLANNED' | 'ONGOING' | 'DONE';

export type User = {
  _id: string;
  token?: string;
  email: string;
};

interface UserState {
  user: User | null;
  actions: {
    setUser: (user: Partial<User>) => void;
    removeUser: () => void;
  };
}

export const useUserStore = create<UserState>()(
  persist(
    devtools(
      (set) => ({
        user: null,
        actions: {
          setUser: (newUser: Partial<User>) =>
            set(
              (state) => ({
                user: {
                  ...(state.user ?? {}),
                  ...newUser,
                } as User,
              }),
              false,
              'setUser'
            ),
          removeUser: () => set({ user: null }, false, 'removeUser'),
        },
      }),
      { name: 'User Store' }
    ),
    {
      name: 'programming-journal',
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export const useUser = () => useUserStore((state) => state.user);
export const useUserActions = () => useUserStore((state) => state.actions);
