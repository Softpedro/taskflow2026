import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


type ViewMode = 'comfortable' | 'compact'
interface UiState { viewMode: ViewMode }
const initialState: UiState = { viewMode: 'comfortable' }

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setViewMode: (state, action: PayloadAction<ViewMode>) => { state.viewMode = action.payload },
    toggleViewMode: (state) => {state.viewMode = state.viewMode === 'comfortable' ? 'compact' : "comfortable"}
  }
})

export const { setViewMode, toggleViewMode } = uiSlice.actions
export default uiSlice.reducer