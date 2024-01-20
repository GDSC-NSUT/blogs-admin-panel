import { create } from "zustand";

const globalStore = create((set) => ({
    isLeftSidbarOpen: false,
    setIsLeftSidebarOpen: (val) => set({ isLeftSidbarOpen: val }),
}));

export default globalStore;
