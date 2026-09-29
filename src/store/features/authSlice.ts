import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type initialStateType = {
  username: string,
  access: string,
  refresh: string
}

const initialState: initialStateType = {
  username: '',
  access: '',
  refresh: ''
};


const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      localStorage.setItem('username', action.payload);
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.access = action.payload;
      localStorage.setItem('accessToken', action.payload);
    },
    setRefreshToken: (state, action: PayloadAction<string>) => {
      state.refresh = action.payload;
      localStorage.setItem('refreshToken', action.payload);
    },
    clearUser: (state) => {
      state.username = '';
      state.access = '';
      state.refresh = '';
      localStorage.removeItem('username');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  }
});


export const { setUsername, setAccessToken, setRefreshToken, clearUser } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;