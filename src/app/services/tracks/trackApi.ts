'use client';


import axios from "axios";
import { BASE_URL } from "../constants";
import { TrackType, CategoryType, FavoriteType } from "@/sharedTypes/sharedTypes";
import { toast } from 'react-toastify';


export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all/')
    .then((res) => {
      return res.data.data;
    });
}

export const getCategoryTracks = (trackId: string): Promise<CategoryType> => {
  return axios(BASE_URL + `/catalog/selection/${trackId}/`)
    .then((res) => {
      return res.data.data;
    })
}

export const getFavoriteTracks = async (access: string): Promise<FavoriteType> => {
  try {
    const resp = await axios.get(BASE_URL + `/catalog/track/favorite/all/`, {
      headers: {
        Authorization: `Bearer ${access}`,
      }
    });
    return resp.data.data;
  } catch (error) {
    toast.error("Ошибка при получении треков 'Избранное'");
    throw error;
  }
}

export const addTrackToFavorite = async (accessToken: string, trackId: number) => {
  try {
    const resp = await axios.post(BASE_URL + `/catalog/track/${trackId}/favorite/`, {}, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    return resp.data;
  } catch (error) {
    toast.error("Ошибка при добавлении трека в избранное");
    throw error;
  }
}

export const deleteTrackFromFavorite = async (accessToken: string, trackId: number) => {
  try {
    const resp = await axios.delete(BASE_URL + `/catalog/track/${trackId}/favorite/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    });
    return resp.data;
  } catch (error) {
    toast.error("Ошибка при удалении трека из избранного");
    throw error;
  }
}
