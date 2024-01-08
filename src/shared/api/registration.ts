import axios, { AxiosError, AxiosResponse } from 'axios';
import { Notify } from 'quasar';
import { login } from 'src/shared/api/auth';

interface Customer {
  email: string;
  password: string;
  message?: string;
}
const link = import.meta.env.VITE_REG;

export async function register(data: Customer): Promise<Customer | Error> {
  try {
    const response: AxiosResponse<Customer> = await axios({
      url: link,
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(data),
    });

    Notify.create({
      message: 'Успешная регистрация! 🥕',
      icon: 'done',
      position: 'top',
      type: 'positive',
    });

    await login(data);
    return response.data;
  } catch (error) {
    const err = <AxiosError>error;
    return err;
  }
}
