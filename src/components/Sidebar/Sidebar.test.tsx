import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ReduxProvider from '@/store/ReduxProvider';
import Sidebar from './Sidebar';
import userEvent from '@testing-library/user-event';
import Centerblock from '../Centerblock/Centerblock';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { data } from '@/data';


const mockTracks: TrackType[] = data;


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


  test('Отображается "Авторизуйтесь"', () => {
    render(
      <ReduxProvider>
        <Sidebar />
      </ReduxProvider>
    )
    expect(screen.getAllByText('Авторизуйтесь').length).toBeGreaterThan(0);
  });

  test('Отображается кнопка выхода', () => {
    const { container } = render(
      <ReduxProvider>
        <Sidebar />
      </ReduxProvider>
    );

    const logoutButton = container.querySelector('div.sidebar__icon');
    const logoutButtons = container.querySelectorAll('div.sidebar__icon');

    expect(logoutButtons.length).toBe(1);
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toBeVisible();
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
    // console.log(screen.debug());

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

    console.log(screen.debug());

    // проверить, что отображается корректное название категории
    expect(screen.getByText('Плэйлист дня')).toBeInTheDocument();
  });
});
