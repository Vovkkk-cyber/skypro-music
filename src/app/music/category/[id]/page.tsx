'use client';

import { useParams } from "next/navigation";
// import './page.css';
// import styles from './page.module.css';

// import Navigation from '@/components/Navigation/Navigation';
import Centerblock from '@/components/Centerblock/Centerblock';
// import Sidebar from '@/components/Sidebar/Sidebar';
// import Bar from '@/components/Bar/Bar';
import { useEffect, useState } from 'react';
import { getTracks, getCategoryTracks } from '@/app/services/tracks/trackApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';


type CategoryType = {
  items: number[],
  name: string
}


export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  // console.log("id из params: ", params.id);


  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [isTracksLoaded, setIsTracksLoaded] = useState(false);
  const [categoryTracks, setCategoryTracks] = useState<TrackType[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    getTracks()
      .then((res) => {
        // console.log("Название первого трека: ", res[0].name);
        setTracks(res);
        // alert('данные пришли')
        setIsTracksLoaded(true);
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

            setError("Отсутствует интеренет");
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

  useEffect(() => {
    if (isTracksLoaded) {
      getCategoryTracks(params.id)
        .then((res: CategoryType) => {
          // console.log("params.id: ", params.id);
          console.log("результат запроса категории: ", res);

          const itemsId = res.items;
          // console.log("id треков категории: ", itemsId);

          // console.log("Название категории:", res.name);
          setCategoryName(res.name);

          const filteredTracks = tracks.filter((track) => itemsId.includes(track._id));
          // console.log("Отфильтрованные треки: ", filteredTracks);

          setCategoryTracks(filteredTracks);
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

              setError("Отсутствует интеренет");
            } else {
              // // Произошло что-то при настройке запроса, вызвавшее ошибку
              // console.log('Error', error.message);

              setError("Неизвестная ошибка");
            }
          }
        });
    }
  }, [tracks, isTracksLoaded, params.id]);



  return (
    <>
      {/* <h1>Категория {params.id}</h1> */}

      {/* <div className={styles.wrapper}>
        <div className={styles.container}> */}
      {/* <main className={styles.main}> */}
      {/* ТУТ БУДЕТ ОШИБКА -
            {error} */}
      {/* <Navigation /> */}
      <Centerblock categoryName={categoryName} playlist={categoryTracks} isLoading={isLoading} error={error}/>
      {/* <Sidebar /> */}
      {/* </main> */}
      {/* <Bar />
          <footer className="footer"></footer> */}
      {/* </div>
      </div> */}
    </>
  )
}
