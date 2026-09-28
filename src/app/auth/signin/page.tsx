'use client';


import { getToken } from '@/app/services/auth/authApi';
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
      // получить токены, записать в LS
      const tokenResp = await getToken({ email, password })

      dispatch(setAccessToken(tokenResp.data.access));
      dispatch(setRefreshToken(tokenResp.data.refresh));

      setIsLoading(false);

      router.push('/music/main');

      dispatch(setUsername(email));
    } catch (error) {
      setIsLoading(false);
      if (error instanceof AxiosError) {
        if (error.response) {
          setErrorMessage(error.response.data.message || "Ошибка авторизации");
        } else if (error.request) {
          setErrorMessage("Отсутствует интернет. Попробуйте позже");
        } else {
          setErrorMessage("Неизвестная ошибка");
        }
      }
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
