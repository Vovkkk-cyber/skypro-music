/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
// export default function Signup () {
//   return (
//     <h1>Регистрация</h1>
//   )
// }

'use client';


import { regUser } from '@/app/services/auth/authApi';
import styles from './signup.module.css';
import Link from 'next/link';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmed, setPasswordConfirmed] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();


  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onCnangeConfirmPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirmed(e.target.value);
  };

  const onSubmit = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    setErrorMessage('');

    if (!email.trim() || !username.trim() || !password.trim() || !passwordConfirmed.trim()) {
      return setErrorMessage('Заполните все поля');
    };

    if (password.trim() !== passwordConfirmed.trim()) {
      return setErrorMessage('Пароли не совпадают. Проверьте данные');
    };

    setIsLoading(true);

    try {
      const res = await regUser({ email, username, password, passwordConfirmed })
      // .then((res) => {
        // console.log("Ответ после регистрации: ", res);

        setIsLoading(false);
        
        router.push('/auth/signin');
        // })
      }   
      catch(error) {
        setIsLoading(false);
        if (error instanceof AxiosError) {
          if (error.response) {
            setErrorMessage(error.response.data.message);
          } else if (error.request) {
            setErrorMessage("Отсутствует интернет. Попробуйте позже");
          } else {
            setErrorMessage("Неизвестная ошибка");
          }
        }
        // console.log("error: ", error);
      }
    // .finally(() => {
    //   setIsLoading(false);

    //   router.push('/auth/signin');
    // })
  };


  return (
    <>
      {/* <div className={styles.wrapper}>
                <div className={styles.containerEnter}>
                    <div className={styles.modal__block}>
                        <form className={styles.modal__form}> */}
      <Link href="/music/main">
        <div className={styles.modal__logo}>
          <img src="/img/logo_modal.png" alt="logo" />
        </div>
      </Link>
      <input
        className={styles.modal__input}
        type="text"
        name="login"
        placeholder="Почта"
        onChange={onChangeEmail}
      />
      <input
        className={styles.modal__input}
        type="text"
        name="username"
        placeholder="Имя пользователя"
        onChange={onChangeUsername}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Пароль"
        onChange={onChangePassword}
      />
      <input
        className={styles.modal__input}
        type="password"
        name="password"
        placeholder="Повторите пароль"
        onChange={onCnangeConfirmPassword}
      />
      <div className={styles.errorContainer}>{errorMessage}</div>
      <button
        disabled={isLoading}
        onClick={onSubmit}
        className={styles.modal__btnSignupEnt}
      >
        Зарегистрироваться
      </button>
      {/* </form>
                    </div>
                </div>
            </div> */}
    </>
  );
}
