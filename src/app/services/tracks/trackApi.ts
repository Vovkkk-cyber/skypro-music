'use client';

import axios from "axios";
import { BASE_URL } from "../constants";
import { TrackType, CategoryType, FavoriteType } from "@/sharedTypes/sharedTypes";


export const getTracks = (): Promise<TrackType[]> => {
  return axios(BASE_URL + '/catalog/track/all/')
    .then((res) => {
      // console.log(res.data.data);
      return res.data.data;
    });
}

export const getCategoryTracks = (trackId: string): Promise<CategoryType> => {
  return axios(BASE_URL + `/catalog/selection/${trackId}/`)
    .then((res) => {
      // console.log(res.data.data);
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
    // console.log("resp в getFavoriteTracks: ", resp.data.data);
    return resp.data.data;
  } catch (error) {
    console.error("Ошибка при получении треков 'Избранное': ", error);
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
    // console.log("Лайкнули трек");
    // console.log("resp в addTrackToFavorite: ", resp.data);
    return resp.data;
    // return resp;
  } catch (error) {
    console.error("Ошибка при добавлении трека в избранное: ", error);
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
    // console.log("Сняли лайк с трека трек");
    // console.log("resp в deleteTrackFromFavorite: ", resp.data);
    return resp.data;
  } catch (error) {
    console.error("Ошибка при удалении трека из избранного: ", error);
    throw error;
  }
}
