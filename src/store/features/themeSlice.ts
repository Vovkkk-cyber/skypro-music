import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type ThemeMode = 'light' | 'dark';

type initialStateType = {
  theme: ThemeMode;
};

const initialState: initialStateType = {
  theme: 'dark',
};


const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      const newTheme = action.payload;
      state.theme = newTheme;

      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);

        const root = document.documentElement;
        root.classList.remove('dark', 'light');
        root.classList.add(newTheme);
      }
    },
  }
});

export const { setTheme } = themeSlice.actions;
export const themeSliceReducer = themeSlice.reducer;
