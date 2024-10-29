import { create } from "zustand";

export const enum Tabs {
  Users = "Users",
  User = "User",
  Request = "Request", // New tab
}

type SidebarStore = {
  currentTab: Tabs;
  updateTab: (newTab: Tabs) => void;
};

export const useTabs = create<SidebarStore>((set) => ({
  currentTab: Tabs.Users,
  updateTab: (newTab: Tabs) => set((state) => ({ currentTab: newTab })),
}));
