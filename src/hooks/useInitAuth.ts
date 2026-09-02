'use client';

import { setAccessToken, setRefreshToken, setUsername } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";

export const useInitAuth = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const username = localStorage.getItem('username') || '';
    const accessToken = localStorage.getItem('accessToken') || '';
    const refreshToken = localStorage.getItem('refreshToken') || '';

    dispatch(setUsername(username));
    dispatch(setAccessToken(accessToken));
    dispatch(setRefreshToken(refreshToken));
  }, [dispatch]);
}
