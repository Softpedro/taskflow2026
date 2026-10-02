import type { Priority } from "@/types"
import { create } from "zustand"

interface FilterState {
  priority: Priority | 'all'
  search: string;
  setPriority: (p: Priority | 'all') => void
  setSearch: (s: string) => void
}

export const useFilters = create<FilterState>((set) => ({
  priority: 'all',
  search: '',
  setPriority: (priority) => set({ priority }),
  setSearch: (search) => set({ search })
}))