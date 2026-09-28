import styles from './playlistTracks.module.css';
import Track from '../Track/Track';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { useAppSelector } from '@/store/store';
import { useEffect, useState, useRef } from 'react';
import Skeleton from "react-loading-skeleton";
import trackStyles from '../Track/Track.module.css';
import { toast } from 'react-toastify';


type PlaylistTracksProp = {
  playlist: TrackType[],
  isLoading: boolean,
  error: string,
  isAuthRequired: boolean
}


export default function Tracks({ playlist, isLoading, error, isAuthRequired }: PlaylistTracksProp) {
  const isAccessToken = useAppSelector((state) => state.auth.access);

  const [mounted, setMounted] = useState(false);

  const lastErrorRef = useRef<string | null>(null);


  useEffect(() => {
    if (!isAccessToken && isAuthRequired) {
      toast.error("Авторизуйтесь чтобы посмотреть избранные треки", {
        toastId: "auth-error",
      });
    }

    if (error && error !== lastErrorRef.current) {
      toast.error(error);
      lastErrorRef.current = error;
    }
  }, [isAccessToken, isAuthRequired, error]);

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) {
    return <div className={styles.content__playlist} />;
  };

  return (
    <div className={styles.content__playlist}>
      {
        !isAccessToken && isAuthRequired ?
          null
          :
          error ?
            null
            :
            isLoading ?
              <>
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className={trackStyles.playlist__item}>
                    <div className={trackStyles.playlist__track}>
                      {/* трек */}
                      <div className={trackStyles.track__title}>
                        <div className={trackStyles.track__titleImage}>
                          <Skeleton width={51} height={51} />
                        </div>
                        <div style={{ width: '80%' }}>
                          <Skeleton width="100%" height={20} />
                        </div>
                      </div>

                      {/* исполнитель */}
                      <div className={trackStyles.track__author}>
                        <div style={{ flex: '1' }}>
                          <Skeleton width="70%" height={20} />
                        </div>
                      </div>

                      {/* альбом */}
                      <div className={trackStyles.track__album}>
                        <Skeleton width="70%" height={20} />
                      </div>

                      {/* лайк и время */}
                      <div className={trackStyles.track__time}>
                        <Skeleton width={20} height={20} circle style={{ marginRight: '10px' }} />
                        <Skeleton width={30} height={20} />
                      </div>
                    </div>
                  </div>
                ))}
              </>
              :
              !playlist.length ?
                <div className={styles.messageContainer}>Треки не найдены</div>
                :
                playlist.map((track) =>
                  <Track
                    key={track._id}
                    track={track}
                    playlist={playlist}
                  />
                )}
    </div>
  )
}
