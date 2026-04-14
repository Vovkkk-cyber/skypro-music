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