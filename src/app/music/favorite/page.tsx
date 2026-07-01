'use client';

import Centerblock from '@/components/Centerblock/Centerblock';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';
import { getFavoriteTracks, refreshAccessToken } from '@/app/services/tracks/trackApi';
import { checkAccessToken } from '@/utils/helpers';


export default function FavoritePage() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [isTracksLoaded, setIsTracksLoaded] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [access, setAccess] = useState<string | null>(null);


  useEffect(() => {
    // получить данные из localStorage
    const accessToken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");
    const userId = localStorage.getItem("userId");
    let newAccessToken = "";


    const fetchFavoriteTracks = async () => {
      // проверить access token
      const isAccessTokenExpired = checkAccessToken();

      // если access token протух, то обновить его
      if (isAccessTokenExpired) {
        // console.log("Токен протух: ", isAccessTokenExpired);
        if (typeof refreshToken === "string" && typeof accessToken === "string") {
          try {
            newAccessToken = await refreshAccessToken(refreshToken);
            // console.log("Новый access token: ", newAccessToken);

            // обновить access token в LS
            localStorage.setItem("access", newAccessToken);
            // console.log("Токен обновили и записали новый в LS");


            // текущее время в секундах
            const currentTime = new Date().getTime() / 1000;

            // обновить время получения токена в LS
            localStorage.setItem("tokenGetTime", String(currentTime));


          } catch (error) {
            console.error("Ошибка при обновлении токена: ", error);
            // выйти из функции в случае ошибки
            return;
          }
        }
      }

      const accessTokenToUse = isAccessTokenExpired ? newAccessToken : accessToken;


      if (accessTokenToUse) {
        setIsLoading(true);

        try {
          const favoriteTracks = await getFavoriteTracks(accessTokenToUse);
          console.log("результат getFavoriteTracks: ", favoriteTracks);

          setTracks(favoriteTracks);
          setIsTracksLoaded(true);
        } catch (error) {
          if (error instanceof AxiosError) {
            if (error.response) {
              // // Запрос был сделан, и сервер ответил кодом состояния, который выходит за пределы 2xx
              // console.log(error.response.data);
              // console.log(error.response.status);
              // console.log(error.response.headers);

              setError(error.response.data);
            } else if (error.request) {
              // // Запрос был сделан, но ответ не получен
              // console.log(error.request);

              setError("Отсутствует интернет");
            } else {
              // // Произошло что-то при настройке запроса, вызвавшее ошибку
              // console.log('Error', error.message);

              setError("Неизвестная ошибка");
            }
          }
        }
        finally {
          setIsLoading(false);
        };
      };
    }
    fetchFavoriteTracks();
  }, []);


  return (
    <>
      <Centerblock
        categoryName="Мои треки"
        playlist={tracks}
        isLoading={isLoading}
        error={error} />
    </>
  )
}
