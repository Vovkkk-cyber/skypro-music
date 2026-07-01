

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { data } from "@/data";
import { TrackType } from "@/sharedTypes/sharedTypes";
import ReduxProvider from '@/store/ReduxProvider';
import Track from './Track';
import { formatTime } from '@/utils/helpers';
import userEvent from '@testing-library/user-event';


const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0];

// Мокирование useRouter из next/navigation
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));


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


describe('PlaylistTrack component', () => {
  test('Рендеринг данных трека', () => {
    render(
      <ReduxProvider>
        <Track track={mockTrack} playlist={mockTracks} />
      </ReduxProvider>
    )
    expect(screen.getAllByText('Chase').length).toBeGreaterThan(0);
    expect(screen.getAllByText(mockTrack.name).length).toBeGreaterThan(0);
    expect(screen.getAllByText(mockTrack.author).length).toBeGreaterThan(0);
    expect(screen.getAllByText(mockTrack.album).length).toBeGreaterThan(0);
    expect(screen.getAllByText(formatTime(mockTrack.duration_in_seconds)).length).toBeGreaterThan(0);
  });

  test('После клика по треку отображается иконка, что трек выбран', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <ReduxProvider>
        <Track track={mockTrack} playlist={mockTracks} />
      </ReduxProvider>
    );

    const trackTitle = container.querySelector('div.track__title');

    if (trackTitle) {
      await user.click(trackTitle);

      const selectedTrackIcon = container.querySelector('svg.track__selected');

      expect(selectedTrackIcon).toBeInTheDocument();
      expect(selectedTrackIcon).toBeVisible();
    } else {
      throw new Error('Названий треков не обнаружено');
    }
  });

  test('Без авторизации не ставится лайк', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <ReduxProvider>
        <Track track={mockTrack} playlist={mockTracks} />
      </ReduxProvider>
    );

    const likeButton = container.querySelector('svg.track__timeSvg > use');

    if (likeButton) {
      await user.click(likeButton);

      expect(likeButton).toHaveAttribute('xlink:href', '/img/icon/sprite.svg#icon-like');
      expect(likeButton).not.toHaveAttribute('xlink:href', '/img/icon/sprite.svg#icon-like-active');
    } else {
      throw new Error('Названий треков не обнаружено');
    }
  });
});