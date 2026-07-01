'use client';


import { authUser, getToken } from '@/app/services/auth/authApi';
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { setAccessToken, setRefreshToken, setUsername } from '@/store/features/authSlice';


export default function Signin() {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setIsLoading(false);
      return setErrorMessage('Заполните все поля');
    };

    setIsLoading(true);

    try {
      // авторизоваться
      const authResp = await authUser({ email, password })
      // console.log("authResp: ", authResp);
      // console.log("email: ", authResp.data.email);
      // console.log("username: ", authResp.data.username);
      // console.log("_id: ", authResp.data._id);
      // localStorage.setItem("userId", String(authResp.data._id));

      // получить время получения токена в секундах и записать в LS
      const tokenGetTime = String(new Date().getTime() / 1000);
      // console.log("время получения токена в секундах: ", tokenGetTime);
      localStorage.setItem("tokenGetTime", tokenGetTime);

      // получить токены, записать в LS
      const tokenResp = await getToken({ email, password })

      // localStorage.setItem("access", tokenResp.data.access);
      // localStorage.setItem("refresh", tokenResp.data.refresh);

      dispatch(setAccessToken(tokenResp.data.access));
      dispatch(setRefreshToken(tokenResp.data.refresh));


      setIsLoading(false);

      // открыть главную страницу
      router.push('/music/main');

      dispatch(setUsername(email));

      // return tokenResp;
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (error.response) {
          // // Запрос был сделан, и сервер ответил кодом состояния, который, выходит за пределы 2xx
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
          setErrorMessage(error.response.data.message || "Ошибка авторизации");
        } else if (error.request) {
          // // Запрос был сделан, но ответ не получен
          // console.log(error.request);
          setErrorMessage("Отсутствует интернет. Попробуйте позже");
        } else {
          // // Произошло что-то при настройке запроса, вызвавшее ошибку
          // console.log('Error', error.message);
          setErrorMessage("Неизвестная ошибка");
        }
      }
      // console.log("error: ", error);
    }
  };


  return (
    <>
      <a href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </a>
      <input
        className={styles.modal__input}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
        value={email}
      />
      <input
        className={classNames(styles.modal__input)}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
        value={password}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnEnter}>
        Войти
      </button>
      <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
        Зарегистрироваться
      </Link>
    </>
  );
}
