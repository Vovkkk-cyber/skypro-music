'use client';

import { addTrackToFavorite, deleteTrackFromFavorite } from "@/app/services/tracks/trackApi";
import { TrackType } from "@/sharedTypes/sharedTypes";
import { addLikedTracks, removeLikedTracks } from "@/store/features/trackSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { reAuth } from "@/utils/reAuth";
import { AxiosError } from "axios";
import { useState } from "react";


type returnTypeHook = {
  isLoading: boolean;
  errorMsg: string | null;
  toggleLike: () => void;
  isLike: boolean;
};


export const useLikeTrack = (track: TrackType | null): returnTypeHook => {
  const { favoriteTracks } = useAppSelector((state) => state.tracks);
  const { access, refresh } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const isLike = favoriteTracks.some((t) => t._id === track?._id);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);


  const toggleLike = async () => {
    if (!access) {
      return setErrorMsg('Нет авторизации');
    }

    const actionApi = isLike ? deleteTrackFromFavorite : addTrackToFavorite;
    const actionSlice = isLike ? removeLikedTracks : addLikedTracks;

    setIsLoading(true);
    setErrorMsg(null);

    if (track) {
      await reAuth(
        (newToken) => actionApi(newToken || access, track._id),
        refresh,
        dispatch,
      )
        .then(() => {
          dispatch(actionSlice(track));
        })
        .catch((error) => {
          if (error instanceof AxiosError) {
            if (error.response) {
              setErrorMsg(error.response.data.message);
            } else if (error.request) {
              setErrorMsg('Произошла ошибка. Попробуйте позже');
            } else {
              setErrorMsg('Неизвестная ошибка');
            }
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };


  return {
    isLoading,
    errorMsg,
    toggleLike,
    isLike,
  };
};