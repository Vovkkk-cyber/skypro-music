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

// type refreshTokenProps = {
//   refreshToken: string,
// };

type refreshTokenReturn = {
  // data: {
    access: string,
  // }
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

// export const refreshToken = (refreshToken: refreshTokenProps): Promise<refreshTokenReturn> => {
export const refreshToken = (refreshToken: string): Promise<refreshTokenReturn> => {
  return axios.post(BASE_URL + '/token/refresh/',
    {refresh: refreshToken},
    {
      headers: {
        "content-type": "application/json",
      }
    }
  );
};
