import { data, myData } from '@/data';
import { formatTime, getTimePanel, getUniqueValuesByKey, searchTracks, sortByReleaseDate } from './helpers';


describe('formatTime', () => {
  it('Обрабатывает 0 секунд', () => {
    expect(formatTime(0)).toBe('0:00');
  });
  it('Форматирует время меньше 1 минуты', () => {
    expect(formatTime(35)).toBe('0:35');
  });
  it('Добавление 0 если секунд меньше 10', () => {
    expect(formatTime(61)).toBe('1:01');
  });
  it('Обрабатывает 1 минуту', () => {
    expect(formatTime(60)).toBe('1:00');
  });
  it('Обрабатывает время от 1 до 2 минут', () => {
    expect(formatTime(119)).toBe('1:59');
  });
  it('Обрабатывает 2 минуты', () => {
    expect(formatTime(120)).toBe('2:00');
  });
  it('Обрабатывает 59 минут 59 секунд', () => {
    expect(formatTime(3599)).toBe('59:59');
  });
  it('Обрабатывает 60 минут', () => {
    expect(formatTime(3600)).toBe('60:00');
  });
  it('Обрабатывает отрицательные значения', () => {
    expect(formatTime(-3)).toBe('0:00');
  });
  it('Обрабатывает большие значения', () => {
    expect(formatTime(6321)).toBe('105:21');
  });
});

describe('getTimePanel', () => {
  it('Обрабатывает нулевое время трека', () => {
    expect(getTimePanel(0, 0)).toBe('0:00 / 0:00');
  });
  it('Обрабатывает нулевое текущее время трека', () => {
    expect(getTimePanel(0, 65)).toBe('0:00 / 1:05');
  });
  it('Обрабатывает окончание трека', () => {
    expect(getTimePanel(65, 65)).toBe('1:05 / 1:05');
  });
  it('Обрабатывает текущее время трека', () => {
    expect(getTimePanel(65, 85)).toBe('1:05 / 1:25');
  });
  it('Обрабатывает общее время трека "undefined"', () => {
    expect(getTimePanel(65, undefined)).toBeUndefined;
  });
  it('Обрабатывает большие значения', () => {
    expect(getTimePanel(4236, 5632)).toBe('70:36 / 93:52');
  });
});

describe('getUniqueValuesByKey', () => {
  it('Возвращает массив уникальных авторов', () => {
    expect(getUniqueValuesByKey(data, 'author')).toStrictEqual(["Alexander Nakarada", "Frank Schroter", "Kevin Macleod", "Mixkit", "-", "Waltz Piano", "Winniethemoog"]);
  });
  it('Возвращает массив уникальных жанров', () => {
    expect(getUniqueValuesByKey(data, 'genre')).toStrictEqual(["Классическая музыка", "Неклассическая музыка", "Популярная музыка", "Рок музыка"]);
  });
});

describe('sortByReleaseDate', () => {
  it('Возвращает отсортированный по убыванию массив', () => {
    expect(sortByReleaseDate(myData, 'Сначала новые')).toStrictEqual([
      {
        "_id": 10,
        "album": "Sneaky Snitch",
        "author": "Kevin Macleod",
        "duration_in_seconds": 136,
        "genre": [
          "Популярная музыка",
        ],
        "logo": null,
        "name": "Sneaky Snitch",
        "release_date": "2022-04-16",
        "staredUser": [],
        "track_file": "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Kevin_Macleod_-_Sneaky_Snitch.mp3",
      },
      {
        "_id": 9,
        "album": "Open Sea epic",
        "author": "Frank Schroter",
        "duration_in_seconds": 141,
        "genre": [
          "Классическая музыка",
          "Неклассическая музыка",
        ],
        "logo": null,
        "name": "Open Sea epic",
        "release_date": "2019-06-12",
        "staredUser": [],
        "track_file": "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Frank_Schroter_-_Open_Sea_epic.mp3",
      },
      {
        "_id": 8,
        "album": "Chase",
        "author": "Alexander Nakarada",
        "duration_in_seconds": 128,
        "genre": [
          "Классическая музыка",
        ],
        "logo": null,
        "name": "Chase",
        "release_date": "2005-06-11",
        "staredUser": [],
        "track_file": "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Alexander_Nakarada_-_Chase.mp3",
      },
      {
        "_id": 16,
        "album": "Background Sensible",
        "author": "Waltz Piano",
        "duration_in_seconds": 136,
        "genre": [
          "Классическая музыка",
        ],
        "logo": null,
        "name": "Background Sensible",
        "release_date": "2003-05-12",
        "staredUser": [],
        "track_file": "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Waltz_Piano_-_Background_Sensible.mp3",
      },
    ]);
  });
  it('Возвращает отсортированный по возрастанию массив', () => {
    expect(sortByReleaseDate(myData, 'Сначала старые')).toStrictEqual([
      {
        "_id": 16,
        "album": "Background Sensible",
        "author": "Waltz Piano",
        "duration_in_seconds": 136,
        "genre": [
          "Классическая музыка",
        ],
        "logo": null,
        "name": "Background Sensible",
        "release_date": "2003-05-12",
        "staredUser": [],
        "track_file": "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Waltz_Piano_-_Background_Sensible.mp3",
      },
      {
        "_id": 8,
        "album": "Chase",
        "author": "Alexander Nakarada",
        "duration_in_seconds": 128,
        "genre": [
          "Классическая музыка",
        ],
        "logo": null,
        "name": "Chase",
        "release_date": "2005-06-11",
        "staredUser": [],
        "track_file": "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Alexander_Nakarada_-_Chase.mp3",
      },
      {
        "_id": 9,
        "album": "Open Sea epic",
        "author": "Frank Schroter",
        "duration_in_seconds": 141,
        "genre": [
          "Классическая музыка",
          "Неклассическая музыка",
        ],
        "logo": null,
        "name": "Open Sea epic",
        "release_date": "2019-06-12",
        "staredUser": [],
        "track_file": "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Frank_Schroter_-_Open_Sea_epic.mp3",
      },
      {
        "_id": 10,
        "album": "Sneaky Snitch",
        "author": "Kevin Macleod",
        "duration_in_seconds": 136,
        "genre": [
          "Популярная музыка",
        ],
        "logo": null,
        "name": "Sneaky Snitch",
        "release_date": "2022-04-16",
        "staredUser": [],
        "track_file": "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Kevin_Macleod_-_Sneaky_Snitch.mp3",
      },
    ]);
  });
  it('Возвращает отсортированный по умолчанию массив', () => {
    expect(sortByReleaseDate(myData, 'По умолчанию')).toStrictEqual([
      {
        _id: 16,
        name: 'Background Sensible',
        author: 'Waltz Piano',
        release_date: '2003-05-12',
        genre: ['Классическая музыка'],
        duration_in_seconds: 136,
        album: 'Background Sensible',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Waltz_Piano_-_Background_Sensible.mp3',
        staredUser: [],
      },
      {
        _id: 8,
        name: 'Chase',
        author: 'Alexander Nakarada',
        release_date: '2005-06-11',
        genre: ['Классическая музыка'],
        duration_in_seconds: 128,
        album: 'Chase',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Alexander_Nakarada_-_Chase.mp3',
        staredUser: [],
      },
      {
        _id: 10,
        name: 'Sneaky Snitch',
        author: 'Kevin Macleod',
        release_date: '2022-04-16',
        genre: ['Популярная музыка'],
        duration_in_seconds: 136,
        album: 'Sneaky Snitch',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Kevin_Macleod_-_Sneaky_Snitch.mp3',
        staredUser: [],
      },
      {
        _id: 9,
        name: 'Open Sea epic',
        author: 'Frank Schroter',
        release_date: '2019-06-12',
        genre: ['Классическая музыка', 'Неклассическая музыка'],
        duration_in_seconds: 141,
        album: 'Open Sea epic',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Frank_Schroter_-_Open_Sea_epic.mp3',
        staredUser: [],
      },
    ]);
  });
});

describe('searchTracks', () => {
  it('Находит треки по введённому значению в соответствии с регистром', () => {
    expect(searchTracks('Ma', data)).toEqual(expect.arrayContaining([
      expect.objectContaining({
        _id: 14,
        name: 'The March OF The Final Battle',
        author: '-',
        release_date: '2011-11-02',
        genre: ['Классическая музыка'],
        duration_in_seconds: 135,
        album: 'The March OF The Final Battle',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/musiclfiles_-_The_March_Of_The_Final_Battle.mp3',
        staredUser: [],
      }),
      expect.objectContaining({
        _id: 17,
        name: 'Cinematic',
        author: 'Winniethemoog',
        release_date: '2004-10-01',
        genre: ['Классическая музыка'],
        duration_in_seconds: 109,
        album: 'Cinematic',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Winniethemoog_-_Action_Sport_Breakbeat.mp3',
        staredUser: [],
      }),
    ]));
  });

  it('Находит треки по введённому значению без учёта регистра: маленькие буквы', () => {
    expect(searchTracks('ma', data)).toEqual(expect.arrayContaining([
      expect.objectContaining({
        _id: 14,
        name: 'The March OF The Final Battle',
        author: '-',
        release_date: '2011-11-02',
        genre: ['Классическая музыка'],
        duration_in_seconds: 135,
        album: 'The March OF The Final Battle',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/musiclfiles_-_The_March_Of_The_Final_Battle.mp3',
        staredUser: [],
      }),
      expect.objectContaining({
        _id: 17,
        name: 'Cinematic',
        author: 'Winniethemoog',
        release_date: '2004-10-01',
        genre: ['Классическая музыка'],
        duration_in_seconds: 109,
        album: 'Cinematic',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Winniethemoog_-_Action_Sport_Breakbeat.mp3',
        staredUser: [],
      }),
    ]));
  });

  it('Находит треки по введённому значению без учёта регистра: большие буквы', () => {
    expect(searchTracks('MA', data)).toEqual(expect.arrayContaining([
      expect.objectContaining({
        _id: 14,
        name: 'The March OF The Final Battle',
        author: '-',
        release_date: '2011-11-02',
        genre: ['Классическая музыка'],
        duration_in_seconds: 135,
        album: 'The March OF The Final Battle',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/musiclfiles_-_The_March_Of_The_Final_Battle.mp3',
        staredUser: [],
      }),
      expect.objectContaining({
        _id: 17,
        name: 'Cinematic',
        author: 'Winniethemoog',
        release_date: '2004-10-01',
        genre: ['Классическая музыка'],
        duration_in_seconds: 109,
        album: 'Cinematic',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Winniethemoog_-_Action_Sport_Breakbeat.mp3',
        staredUser: [],
      }),
    ]));
  });

  it('Находит треки по цифрам', () => {
    expect(searchTracks('4', data)).toStrictEqual([
      {
        _id: 7,
        name: 'Song № 4',
        author: 'Alexander Nakarada',
        release_date: '2005-06-11',
        genre: ['Классическая музыка'],
        duration_in_seconds: 128,
        album: 'Chase',
        logo: null,
        track_file:
          'https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Alexander_Nakarada_-_Chase.mp3',
        staredUser: [],
      },
    ]);
  });

  it.skip('Находит треки по латинице', () => {

  });

  it.skip('Находит треки по кириллице', () => {

  });

  it.skip('Находит треки по спецсимволам', () => {

  });
});