import { TrackType } from "@/sharedTypes/sharedTypes";


export function getUniqueValuesByKey(
  arr: TrackType[],
  key: keyof TrackType,
): string[] {
  // используем Set для хранения уникальных значений
  const uniqueValues = new Set<string>();

  // проходим по каждому объекту в массиве
  arr.forEach((item) => {
    const value = item[key];

    // если value - массив строк
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) {
          uniqueValues.add(v);
        }
      });
    }

    // если value - строка
    else if (typeof value === 'string') {
      uniqueValues.add(value);
    }
  });

  // преобразовываем Set обратно в массив и возвращаем
  return Array.from(uniqueValues);
}

export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : `${inputSeconds}`;

  return `${minutes}:${outputSeconds}`;
}

export const getTimePanel = (
  currentTime: number,
  totalTime: number | undefined
) => {
  if (totalTime) {
    return `${formatTime(currentTime)} / ${formatTime(totalTime)}`
  }
}

export const checkAccessToken = ():boolean => {
  // время жизни access токена в секундах
  const tokenLifetime = 200;

  const tokenGetTime = parseInt(localStorage.getItem("tokenGetTime") || "0", 10);
  // console.log("Время получения токена из LS в проверке токена: ", tokenGetTime);

  // текущее время в секундах
  const currentTime = new Date().getTime() / 1000;
  // console.log("время получения токена в секундах: ", tokenGetTime);

  const isAccessTokenExpired = Math.round(currentTime - tokenGetTime) >= tokenLifetime;
  // console.log("Разница времени получения токена и текущего времени в секундах в проверке токена: ", Math.round(currentTime - tokenGetTime));
  // console.log("Access токен истёк? в проверке токена: ", isAccessTokenExpired);

  return isAccessTokenExpired;
}