'use client';

// import './page.css';
// import styles from './page.module.css';

// import Navigation from '../../../components/Navigation/Navigation';
import Centerblock from '@/components/Centerblock/Centerblock';
// import Sidebar from '@/components/Sidebar/Sidebar';
// import Bar from '../../../components/Bar/Bar';
import { useEffect, useState } from 'react';
import { getTracks } from '@/app/services/tracks/trackApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';


export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getTracks()
      .then((res) => {
        // console.log("Название первого трека: ", res[0].name);
        setTracks(res);
        // alert('данные пришли')
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            // // Запрос был сделан, и сервер ответил кодом состояния, который выходит за пределы 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);

            setError(error.response.data);
          } else if (error.request) {
            // // Запрос был сделан, но ответ не получен
            // // `error.request`- это экземпляр XMLHttpRequest в браузере и экземпляр http.ClientRequest в node.js
            // console.log(error.request);

            setError("Отсутствует интернет. Попробуйте позже");
          } else {
            // // Произошло что-то при настройке запроса, вызвавшее ошибку
            // console.log('Error', error.message);

            setError("Неизвестная ошибка");
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);


  return (
    <>
     {/* <div className={styles.wrapper}>
       <div className={styles.container}> */}
          {/* <main className={styles.main}> */}
            {/* ТУТ БУДЕТ ОШИБКА -
          {error} */}

            {/* <Navigation /> */}
            <Centerblock playlist={tracks} isLoading={isLoading} error={error}/>
            {/* <Sidebar /> */}
          {/* </main> */}
          {/* <Bar />
          <footer className="footer"></footer> */}
      {/* </div>
    </div> */}
    </>
  );
}