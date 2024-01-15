import { create } from "zustand";

const useAuthStore = create<AuthStore>((set, get) => ({
  user: {
    email: "",
    id: "",
    isloggedin: false,
    name: "",
  },
  setisloggedinFalse() {
    set((state) => ({ ...state, user: { ...state.user, isloggedin: false } }));
  },
  setisloggedinTrue() {
    set((state) => ({ ...state, user: { ...state.user, isloggedin: true } }));
  },
  setuserAuth(u) {
    set((state) => ({ ...state, user: u }));
  },
}));

export default useAuthStore;
