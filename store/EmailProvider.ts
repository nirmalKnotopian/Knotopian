import { create } from "zustand";

const useEmailProvider = create<UserEmailProvider>((set, get) => ({
  setResponses(r) {
    set((state) => ({
      ...state,
      responses: r,
    }));
  },
  responses: [],
}));

export default useEmailProvider;
