import axios from "axios";
import { BASE_URL } from "../constants";


type authUserProps = {
  email: string,
  password: string
};

type authUserReturn = {
  data: {
    email: string,
    username: string,
    _id: number | string
  }
};

type regUserProps = {
  email: string,
  username: string,
  password: string,
  passwordConfirmed: string
};

type regUserReturn = {
  message: string,
  result: {
    username: string,
    email: string,
    _id: number | string
  },
  success: true
};

type getTokenProps = {
  email: string,
  password: string,
};

type getTokenReturn = {
  data: {
    access: string,
    refresh: string
  }
};


export const authUser = (data: authUserProps): Promise<authUserReturn> => {
  return axios.post(BASE_URL + '/user/login/',
    data,
    {
      headers: {
        "content-type": "application/json",
      }
    }
  );
};

export const regUser = (data: regUserProps): Promise<regUserReturn> => {
  return axios.post(BASE_URL + '/user/signup/',
    data,
    {
      headers: {
        "content-type": "application/json",
      }
    }
  );
};

export const getToken = (data: getTokenProps): Promise<getTokenReturn> => {
  return axios.post(BASE_URL + '/user/token/',
    data,
    {
      headers: {
        "content-type": "application/json",
      }
    }
  );
};

export const refreshAccessToken = async (userRefreshToken: string): Promise<string> => {
  try {
    const resp = await axios.post(BASE_URL + '/user/token/refresh/',
      { refresh: userRefreshToken },
      {
        headers: {
          "content-type": "application/json",
        }
      }
    )
    // console.log("Результат обновления токена: ", resp);
    // console.log("Новый access token: ", resp.data.access);

    return resp.data.access
  } catch (error) {
    console.error("Ошибка при обновлении токена: ", error);
    throw error;
  }
}
