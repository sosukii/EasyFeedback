import axios, { AxiosResponse } from 'axios';
import { Cookies, Notify } from 'quasar';
import { useUserStore } from 'src/stores/user';

const TOKEN_KEY = 'auth_token';

export const authToken = {
  get: (): string => Cookies.get(TOKEN_KEY),
  set: (newToken: string): void => Cookies.set(TOKEN_KEY, newToken),
  remove: (): void => Cookies.remove(TOKEN_KEY),
};

export interface Customer {
  email: string;
  password: string;
}
export interface AuthResult {
  message: string;
  token: string;
  user: {
    id?: string;
    name: string;
    email: string;
  };
}
interface AuthError {
  response: {
    data: { message: string };
    status: number;
  };
}

export async function login(data: Customer): Promise<AuthResult | AuthError> {
  try {
    const link = import.meta.env.VITE_LOGIN;

    const response: AxiosResponse<AuthResult> = await axios({
      url: link,
      method: 'post',
      data: data,
    });
    Notify.create({
      message: 'Успешный вход! meow~ 🐈🐈',
      icon: 'done',
      position: 'top',
      type: 'positive',
    });

    const { token, user } = response.data;
    authToken.set(token);

    const userStore = useUserStore();
    userStore.setIsAuthenticated(true);
    userStore.setUser(user);

    return response.data;
  } catch (error: unknown) {
    const errorObj = error as AuthError;

    Notify.create({
      message: errorObj.response?.data.message,
      icon: 'warning',
      position: 'top',
      type: 'warning',
    });
    return errorObj;
  }
}

export async function getUserByToken(): Promise<
  { email: string; name: string } | AuthError
> {
  try {
    const link = import.meta.env.VITE_USERBYTOKEN;

    const response: AxiosResponse<{ email: string; name: string }> =
      await axios({
        url: link,
        method: 'get',
        headers: {
          Authorization: `Bearer ${authToken.get()}`,
        },
      });

    return response.data;
  } catch (error: unknown) {
    const errorObj = error as AuthError;

    Notify.create({
      message: errorObj.response.data.message,
      icon: 'warning',
      position: 'top',
      type: 'warning',
    });

    return errorObj;
  }
}
