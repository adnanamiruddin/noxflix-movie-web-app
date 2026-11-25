import { createSlice } from "@reduxjs/toolkit";

const storageKey = "themeMode";

const getInitialThemeMode = () => {
  try {
    const saved = localStorage.getItem(storageKey);
    return saved === "light" || saved === "dark" ? saved : "dark";
  } catch {
    return "dark";
  }
};

export const themeModeSlice = createSlice({
  name: "ThemeMode",
  initialState: {
    themeMode: getInitialThemeMode(),
  },
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
      try {
        localStorage.setItem(storageKey, action.payload);
      } catch {
        // storage can be unavailable (private mode), the theme still applies
      }
    },
  },
});

export const { setThemeMode } = themeModeSlice.actions;

export default themeModeSlice.reducer;
