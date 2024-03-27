import { create } from "zustand";

const userPersistenceDate = create<PersistenceData>((set, get) => ({
  recepients: [],
  subject: "",
  message: "",
  setData: (newData) => {
    set((state) => {
        console.log("eb",newData)
      return { ...state, ...newData };
    });
  },
}));

export default userPersistenceDate;
