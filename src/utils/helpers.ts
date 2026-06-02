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
  if (time < 0) {
    return `0:00`;
  }

  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : `${inputSeconds}`;

  return `${minutes}:${outputSeconds}`;
}

export const getTimePanel = (
  currentTime: number,
  totalTime: number | undefined
) => {
  if (totalTime === 0) {
    return `${formatTime(currentTime)} / ${formatTime(totalTime)}`
  };

  if (totalTime) {
    return `${formatTime(currentTime)} / ${formatTime(totalTime)}`
  }
}

// export function sortByReleaseDateAsc(arr: TrackType[]): TrackType[] {
//   return [...arr].sort((a, b) => {
//     return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
//   })
// }

// export function sortByReleaseDateDesc(arr: TrackType[]): TrackType[] {
//   return [...arr].sort((a, b) => {
//     return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
//   })
// }

export function sortByReleaseDate(arr: TrackType[], type: string): TrackType[] {
  if (type === 'Сначала новые') {
    arr = [...arr].sort((a, b) => {
      return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
    });
  } else if (type === 'Сначала старые') {
    arr = [...arr].sort((a, b) => {
      return new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
    });
  } else if (type === 'По умолчанию') {
    return arr;
  };
  return arr;
};

export function searchTracks(data: string, arr: TrackType[]): TrackType[] {
  return arr.filter((track) => track.name.toLowerCase().includes(data.toLowerCase()));
}