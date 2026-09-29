import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ReduxProvider from '@/store/ReduxProvider';
import Sidebar from './Sidebar';
import userEvent from '@testing-library/user-event';
import Centerblock from '../Centerblock/Centerblock';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { data } from '@/data';
import * as storeHooks from "@/store/store";


const mockTracks: TrackType[] = data;


// создать мок для теста
jest.spyOn(storeHooks, 'useAppSelector').mockImplementation((selectorFn: any) => {
  // создать фейковое состояние (без скелетона, чтобы сразу отобразилось 'Авторизуйтесь')
  const mockState = {
    auth: {
      username: null,
      access: null // нет авторизации
    },
    tracks: {
      fetchIsLoading: false, // состояние загрузки false
      favoriteTracks: [],
      filters: {
        authors: [],
        years: 'По умолчанию',
        genres: []
      }
    },
    theme: {
      theme: 'dark'
    }
  };
  return selectorFn(mockState as any);
});


// Мокирование useRouter из next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));


describe('Sidebar component with next/navigation', () => {
  // создать мок для router.push
  const mockPush = jest.fn();
  const mockUseRouter = require('next/navigation').useRouter;


  beforeEach(() => {
    // настроить мок перед каждым тестом
    mockUseRouter.mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    // очистить все моки после каждого теста
    jest.clearAllMocks();
  });


  test('Отображается "Авторизуйтесь" если пользователь не авторизовался', () => {
    render(
      <ReduxProvider>
        <Sidebar />
      </ReduxProvider>
    )
    expect(screen.getAllByText('Авторизуйтесь').length).toBeGreaterThan(0);
  });

  test('Не отображается кнопка выхода', () => {
    const { container } = render(
      <ReduxProvider>
        <Sidebar />
      </ReduxProvider>
    );

    const logoutButtons = container.querySelectorAll('div.sidebar__icon');

    expect(logoutButtons.length).toBe(0);
  });

  test('Отображается три карточки категорий', () => {
    const { container } = render(
      <ReduxProvider>
        <Sidebar />
      </ReduxProvider>
    );

    const sidebarItems = container.querySelectorAll('div.sidebar__item');

    expect(sidebarItems.length).toBe(3);

    for (let item of sidebarItems) {
      expect(item).toBeInTheDocument();
      expect(item).toBeVisible();
    }
  });

  test('После выбора категории "Плэйлист дня" открывается страница с корректным заголовком', async () => {
    const user = userEvent.setup();

    render(
      <ReduxProvider>
        <Sidebar />
      </ReduxProvider>
    );

    const sidebarItems = screen.getAllByRole('link');

    await user.click(sidebarItems[0]);

    render(
      <ReduxProvider>
        <Centerblock
          pagePlaylist={mockTracks}
          playlist={mockTracks}
          categoryName="Плэйлист дня"
          isLoading={false}
          error=""
          isAuthRequired={false}
        />
      </ReduxProvider>
    );


    // проверить, что отображается корректное название категории
    expect(screen.getByText('Плэйлист дня')).toBeInTheDocument();
  });
});
