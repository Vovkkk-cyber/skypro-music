import { refreshAccessToken } from "@/app/services/auth/authApi";
import { setAccessToken } from "@/store/features/authSlice";
import { AppDispatch } from "@/store/store";
import { AxiosError } from "axios";


export const reAuth = async <T>(
  apiFunction: (access: string) => Promise<T>,
  refresh: string,
  dispatch: AppDispatch,
): Promise<T> => {
  try {
    // Пытаемся выполнить запрос
    return await apiFunction('');
  } catch (error) {
    const axiosError = error as AxiosError;

    // Если ошибка 401, обновляем токен и повторяем запрос
    if (axiosError.response?.status === 401) {
      try {
        const newAccessToken = await refreshAccessToken(refresh); // Обновляем токен
        // console.log("newAccessToken: ", newAccessToken);
        // dispatch(setAccessToken(newAccessToken.access));
        dispatch(setAccessToken(newAccessToken));
        // Повторяем исходный запрос
        // return await apiFunction(newAccessToken.access);
        return await apiFunction(newAccessToken);
      } catch (refreshError) {
        // Если обновление токена не удалось, пробрасываем ошибку
        throw refreshError;
      }
    }

    // Если ошибка не 401, пробрасываем её
    console.log(error);
    throw error;
  }
};


  // // ПРИМЕР ИСПОЛЬЗОВАНИЯ
  // const refreshToken = useAppSelector((state) => state.auth.refresh);
  // const accessToken = useAppSelector((state) => state.auth.access);
  // const logout = async() => {// добавляем async
  //   dispatch(clearUser());
  //   router.push("/auth/signin");

  //   const resp = await reAuth(
  //     // ((newAccessToken) => getTracks(newAccessToken || accessToken)),// getFavoriteTracks(newAccessToken || accessToken, id и какие ещё нужно параметры)), передаём колбэк функцию, а которой вызываем нужную функцию и передаём в них новый токен или существующий, если он ещё не потух. Если не протух, то выплняется первый try
  //     ((newAccessToken) => getFavoriteTracks(newAccessToken || accessToken)),
  //     // ((newAccessToken) => getTracks()),
  //     refreshToken, // из Redux берём
  //     dispatch // из Redux берём
    // )
  // };
