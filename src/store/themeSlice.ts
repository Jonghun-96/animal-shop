import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  darkMode: localStorage.getItem('theme') === 'dark'
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => { 
      state.darkMode = !state.darkMode; 

      const newTheme = state.darkMode ? 'dark' : 'light';

      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-bs-theme', newTheme);
    },
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;

      const newTheme = state.darkMode ? 'dark' : 'light';

      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-bs-theme', newTheme);
    }

  }
});

export const { toggleDarkMode } = themeSlice.actions;
export default themeSlice.reducer;