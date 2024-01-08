import axios, { AxiosResponse } from 'axios';
import { Notify } from 'quasar';
export interface Answer {
  id: string;
  text: string;
}
interface AnswerError {
  response: {
    data: unknown;
    error: boolean;
    errorText: string;
    additionalErrors: unknown; 
    requestId: string;
  };
}
export async function sendAnswer(
  options: Answer
): Promise<object | AnswerError> {
  try {
    const link = import.meta.env.VITE_FEED;
    const wb_token = import.meta.env.VITE_WBTOKEN_WRITE;

    const response: AxiosResponse<object> = await axios({
      url: link,
      method: 'patch',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${wb_token}`,
      },
      data: JSON.stringify(options),
    });

    Notify.create({
      message: 'Ответ отправлен',
      icon: 'done',
      position: 'top',
      type: 'positive',
    });
    return response.data;
  } catch (error: unknown) {
    const errorObj = error as AnswerError;

    Notify.create(errorObj.response.errorText + ' 🙄');
    return errorObj;
  }
}
