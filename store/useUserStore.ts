import { create } from "zustand";

interface State {
  token: string;
  userId: number;
  email: string;
  setToken: (token: string) => void;
  setUserId: (userId: number) => void;
  setEmails: (email: string) => void;
}

const useUserStore = create<State>((set) => ({
  token: "",
  userId: 0,
  email: "",
  setToken: (token: string) => set({ token }),
  setUserId: (userId: number) => set({ userId }),
  setEmails: (email: string) => set({ email }),
}));
export default useUserStore;
